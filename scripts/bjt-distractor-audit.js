const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = path.join(
  'docs',
  'bjt',
  'document',
  'partitioned',
  'legacy_runtime_practice_questions.json'
);

function parseArgs(argv) {
  const options = {
    file: DEFAULT_TARGET,
    out: '',
    aggressive: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--file' && next) {
      options.file = next;
      i += 1;
      continue;
    }

    if (arg === '--out' && next) {
      options.out = next;
      i += 1;
      continue;
    }

    if (arg === '--aggressive') {
      options.aggressive = true;
    }
  }

  return options;
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalize(value)
    .split(/[^0-9a-zA-Z\u00C0-\u024F\u3040-\u30FF\u3400-\u9FFF]+/)
    .filter(Boolean);
}

function hasJapanese(value) {
  return /[\u3040-\u30FF\u3400-\u9FFF]/.test(String(value ?? ''));
}

function cjkBigrams(value) {
  const chars = String(value ?? '')
    .match(/[\u3040-\u30FF\u3400-\u9FFF]/g);
  if (!chars || chars.length < 2) return [];
  const grams = [];
  for (let i = 0; i < chars.length - 1; i += 1) {
    grams.push(`${chars[i]}${chars[i + 1]}`);
  }
  return grams;
}

function tokenSet(value) {
  const set = new Set();
  for (const token of tokenize(value)) {
    if (token.length >= 2) {
      set.add(token);
    }
  }
  for (const gram of cjkBigrams(value)) {
    set.add(gram);
  }
  return set;
}

function jaccard(a, b) {
  const setA = tokenSet(a);
  const setB = tokenSet(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  let inter = 0;
  for (const token of setA) {
    if (setB.has(token)) inter += 1;
  }
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}

function auditQuestion(item, options) {
  const findings = [];
  if (!Array.isArray(item.options) || item.options.length !== 4) {
    findings.push({ severity: 'error', code: 'options_count', message: 'Expected 4 options' });
    return findings;
  }

  const correct = item.options[item.correctIndex] ?? '';
  const contextText = `${item.situation ?? ''} ${item.prompt ?? ''} ${item.action_focus ?? ''} ${item.business_topic ?? ''}`.trim();
  const contextTokens = tokenSet(contextText);

  const normalizedOptions = item.options.map((opt) => normalize(opt));
  if (new Set(normalizedOptions).size !== normalizedOptions.length) {
    findings.push({ severity: 'error', code: 'duplicate_option', message: 'Duplicate options detected' });
  }

  item.options.forEach((option, idx) => {
    if (idx === item.correctIndex) return;

    const optionLabel = `option_${idx + 1}`;
    const len = normalize(option).length;
    if (len < 4) {
      findings.push({
        severity: 'warn',
        code: 'short_distractor',
        message: `${optionLabel} is too short`,
      });
    }

    const sim = jaccard(option, correct);
    if (sim > 0.88) {
      findings.push({
        severity: 'error',
        code: 'near_duplicate_correct',
        message: `${optionLabel} is too similar to correct answer`,
      });
    } else if (sim > 0.82) {
      findings.push({
        severity: 'warn',
        code: 'too_similar_correct',
        message: `${optionLabel} may be too close to correct answer`,
      });
    }

    if (options.aggressive) {
      const optionTokens = tokenSet(option);
      let overlap = 0;
      for (const t of optionTokens) {
        if (contextTokens.has(t)) overlap += 1;
      }
      const contextSim = jaccard(option, contextText);
      const likelyFalsePositive = hasJapanese(option) && optionTokens.size <= 3;
      if (overlap === 0 && contextSim < 0.015 && !likelyFalsePositive) {
        findings.push({
          severity: 'warn',
          code: 'weak_context_anchor',
          message: `${optionLabel} may be weakly anchored to context`,
        });
      }
    }
  });

  return findings;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const target = path.resolve(process.cwd(), options.file);

  if (!fs.existsSync(target)) {
    console.error(`File not found: ${target}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, ''));
  if (!Array.isArray(payload)) {
    console.error('Expected a JSON array');
    process.exit(1);
  }

  const report = [];
  let errorCount = 0;
  let warnCount = 0;
  const byLevel = {};

  for (const item of payload) {
    const findings = auditQuestion(item, options);
    if (findings.length === 0) continue;

    report.push({ id: item.id, level: item.level ?? 'unknown', findings });

    if (!byLevel[item.level ?? 'unknown']) {
      byLevel[item.level ?? 'unknown'] = { errors: 0, warns: 0 };
    }

    for (const finding of findings) {
      if (finding.severity === 'error') {
        errorCount += 1;
        byLevel[item.level ?? 'unknown'].errors += 1;
      } else {
        warnCount += 1;
        byLevel[item.level ?? 'unknown'].warns += 1;
      }
    }
  }

  const summary = {
    file: target,
    mode: options.aggressive ? 'aggressive' : 'conservative',
    questions: payload.length,
    flaggedQuestions: report.length,
    errors: errorCount,
    warnings: warnCount,
    byLevel,
    report,
  };

  if (options.out) {
    const outPath = path.resolve(process.cwd(), options.out);
    fs.writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
    console.log(`Wrote distractor report: ${outPath}`);
  } else {
    console.log(`Distractor audit | questions=${summary.questions} | flagged=${summary.flaggedQuestions}`);
    console.log(`Errors=${summary.errors} Warnings=${summary.warnings}`);
    console.log(`By level: ${JSON.stringify(summary.byLevel)}`);
  }

  process.exit(errorCount > 0 ? 2 : 0);
}

main();
