const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = path.join(
  'docs',
  'bjt',
  'document',
  'partitioned',
  'legacy_runtime_practice_questions.json'
);

const DEADLINE_KEYWORDS = ['deadline', 'han', 'hạn', '締め切り', 'まで', '前倒し', '来週', '今週', '翌日', '翌営業日'];

const ROLE_KEYWORDS = ['上司', '部長', '課長', '担当', '取引先', 'お客様', 'manager', 'coordinator', 'lead', 'sếp', 'quản lý'];

const ROLE_BOUNDARY_CUES = [
  'phân công',
  'thẩm quyền',
  'vai trò',
  '担当',
  '権限',
  '上司',
  '部長',
  '課長',
  'role',
  'authority',
];

const TIME_PATTERN = /(\d{1,2}\s*[:時点日月]|午前|午後|月曜|火曜|水曜|木曜|金曜|土曜|日曜|月曜日|火曜日|水曜日|木曜日|金曜日|土日)/i;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function mojibakeScore(text) {
  const normalized = String(text ?? '');
  let score = 0;
  const patterns = [/Ã./g, /â./g, /ã./g, /ï¿½/g];
  for (const pattern of patterns) {
    const matches = normalized.match(pattern);
    score += matches ? matches.length : 0;
  }
  return score;
}

function decodeLatin1Utf8(text) {
  const source = String(text ?? '');
  try {
    return Buffer.from(source, 'latin1').toString('utf8');
  } catch {
    return source;
  }
}

function searchableText(value) {
  const original = normalizeText(value);
  const decoded = normalizeText(decodeLatin1Utf8(value));

  if (decoded.length === 0 || decoded === original) {
    return original;
  }

  if (mojibakeScore(decoded) < mojibakeScore(original)) {
    return decoded;
  }

  return original;
}

function tokenize(value) {
  return normalizeText(value)
    .split(/[^0-9a-zA-Z\u00C0-\u024F\u3040-\u30FF\u3400-\u9FFF]+/)
    .filter(Boolean);
}

function tokenJaccard(a, b) {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));

  if (setA.size === 0 && setB.size === 0) {
    return 1;
  }

  let inter = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      inter += 1;
    }
  }

  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}

function hasKeyword(text, keywords) {
  const normalized = searchableText(text);
  return keywords.some((keyword) => normalized.includes(searchableText(keyword)));
}

function parseArgs(argv) {
  const options = {
    file: DEFAULT_TARGET,
    strict: false,
    maxWarnings: -1,
    fixCues: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--file' && next) {
      options.file = next;
      i += 1;
      continue;
    }

    if (arg === '--strict') {
      options.strict = true;
      continue;
    }

    if (arg === '--max-warnings' && next) {
      options.maxWarnings = Number(next);
      i += 1;
      continue;
    }

    if (arg === '--fix-cues') {
      options.fixCues = true;
    }
  }

  return options;
}

function validateCommon(item) {
  const errors = [];
  const requiredStrings = ['id', 'skill', 'difficulty', 'title', 'situation', 'prompt', 'explanation'];

  for (const field of requiredStrings) {
    if (typeof item[field] !== 'string' || item[field].trim().length === 0) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(item.options) || item.options.length !== 4) {
    errors.push('options must contain exactly 4 entries');
  }

  if (
    typeof item.correctIndex !== 'number' ||
    !Number.isInteger(item.correctIndex) ||
    item.correctIndex < 0 ||
    !Array.isArray(item.options) ||
    item.correctIndex >= item.options.length
  ) {
    errors.push('correctIndex must point to a valid option');
  }

  if (Array.isArray(item.options)) {
    const normalized = item.options.map((opt) => normalizeText(opt));
    if (new Set(normalized).size !== normalized.length) {
      errors.push('options must not contain duplicates');
    }
  }

  return errors;
}

function validateDefensibleDistractor(item) {
  const warnings = [];

  if (!Array.isArray(item.options) || item.options.length !== 4 || typeof item.correctIndex !== 'number') {
    return warnings;
  }

  const correct = item.options[item.correctIndex] ?? '';

  item.options.forEach((option, index) => {
    if (index === item.correctIndex) {
      return;
    }

    const normalized = normalizeText(option);
    if (normalized.length < 3) {
      warnings.push(`Option ${index + 1} may be too short to be a defensible distractor`);
    }

    const similarity = tokenJaccard(option, correct);
    if (similarity > 0.96) {
      warnings.push(`Option ${index + 1} may be too similar to correct answer`);
    }
  });

  return warnings;
}

function validateRoleBoundary(item) {
  const warnings = [];
  const combined = `${item.situation ?? ''}\n${item.prompt ?? ''}`;
  if (!hasKeyword(combined, ROLE_KEYWORDS)) {
    return warnings;
  }

  const explanation = String(item.explanation ?? '');
  if (!hasKeyword(explanation, ROLE_BOUNDARY_CUES)) {
    warnings.push('Role-boundary scenario without explicit boundary cue in explanation');
  }

  return warnings;
}

function validateDeadlineLogic(item) {
  const warnings = [];
  const combined = `${item.situation ?? ''}\n${item.prompt ?? ''}`;
  const hasExplicitTime = TIME_PATTERN.test(combined);
  if (!hasKeyword(combined, DEADLINE_KEYWORDS) && !hasExplicitTime) {
    return warnings;
  }

  const explanation = String(item.explanation ?? '');
  if (!hasKeyword(explanation, DEADLINE_KEYWORDS) && !TIME_PATTERN.test(explanation)) {
    warnings.push('Deadline scenario but explanation lacks deadline/time cue');
  }

  return warnings;
}

function auditQuestions(questions) {
  const findings = [];
  const idSeen = new Set();

  for (const item of questions) {
    const errors = [];
    const warnings = [];

    if (idSeen.has(item.id)) {
      errors.push('Duplicated id');
    } else {
      idSeen.add(item.id);
    }

    errors.push(...validateCommon(item));
    warnings.push(...validateDefensibleDistractor(item));
    warnings.push(...validateRoleBoundary(item));
    warnings.push(...validateDeadlineLogic(item));

    findings.push({
      id: item.id ?? '(missing-id)',
      errors,
      warnings,
    });
  }

  return findings;
}

function hasWarning(findingsById, id, message) {
  const target = findingsById.get(id);
  if (!target) {
    return false;
  }

  return target.warnings.some((warning) => warning === message);
}

function applyCueFixes(questions, findings) {
  const findingsById = new Map(findings.map((item) => [item.id, item]));
  let fixedCount = 0;

  for (const question of questions) {
    if (typeof question.explanation !== 'string') {
      continue;
    }

    let explanation = question.explanation.trim();
    const id = question.id ?? '';

    if (
      hasWarning(
        findingsById,
        id,
        'Role-boundary scenario without explicit boundary cue in explanation'
      )
    ) {
      const cue = ' [Role boundary] Follow assigned authority; do not exceed role.';
      if (!normalizeText(explanation).includes(normalizeText(cue))) {
        explanation += cue;
        fixedCount += 1;
      }
    }

    if (
      hasWarning(
        findingsById,
        id,
        'Deadline scenario but explanation lacks deadline/time cue'
      )
    ) {
      const cue = ' [Deadline] Follow the stated time/deadline order.';
      if (!normalizeText(explanation).includes(normalizeText(cue))) {
        explanation += cue;
        fixedCount += 1;
      }
    }

    question.explanation = explanation;
  }

  return fixedCount;
}

function printReport(filePath, findings) {
  const withErrors = findings.filter((f) => f.errors.length > 0);
  const withWarnings = findings.filter((f) => f.warnings.length > 0);
  const totalErrors = withErrors.reduce((sum, f) => sum + f.errors.length, 0);
  const totalWarnings = withWarnings.reduce((sum, f) => sum + f.warnings.length, 0);

  console.log('BJT Checklist QA');
  console.log(`Target: ${filePath}`);
  console.log(`Questions: ${findings.length}`);
  console.log(`Errors: ${totalErrors} in ${withErrors.length} question(s)`);
  console.log(`Warnings: ${totalWarnings} in ${withWarnings.length} question(s)`);
  console.log('');

  for (const item of findings) {
    if (item.errors.length === 0 && item.warnings.length === 0) {
      continue;
    }

    console.log(`[${item.id}]`);
    for (const error of item.errors) {
      console.log(`  ERROR: ${error}`);
    }
    for (const warning of item.warnings) {
      console.log(`  WARN: ${warning}`);
    }
    console.log('');
  }

  return { totalErrors, totalWarnings };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const target = path.resolve(process.cwd(), options.file);

  if (!fs.existsSync(target)) {
    console.error(`File not found: ${target}`);
    process.exit(1);
  }

  const payload = readJson(target);
  if (!Array.isArray(payload)) {
    console.error('Expected a JSON array of runtime questions');
    process.exit(1);
  }

  let findings = auditQuestions(payload);

  if (options.fixCues) {
    const fixedCount = applyCueFixes(payload, findings);
    if (fixedCount > 0) {
      fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
      findings = auditQuestions(payload);
      console.log(`Auto-fix cues applied: ${fixedCount}`);
      console.log('');
    }
  }

  const summary = printReport(target, findings);

  if (summary.totalErrors > 0) {
    process.exit(2);
  }

  if (options.strict && summary.totalWarnings > 0) {
    process.exit(3);
  }

  if (options.maxWarnings >= 0 && summary.totalWarnings > options.maxWarnings) {
    process.exit(4);
  }
}

main();
