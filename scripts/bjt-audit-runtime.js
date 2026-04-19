const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const partitionedDir = path.join(repoRoot, 'docs', 'bjt', 'document', 'partitioned');

const sources = {
  questions: path.join(partitionedDir, 'legacy_runtime_practice_questions.json'),
  vocabulary: path.join(partitionedDir, 'legacy_runtime_vocabulary.json'),
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function parseArgs(argv) {
  const options = {
    bank: 'questions',
    level: 'all',
    skill: 'all',
    theme: 'all',
    id: '',
    limit: 5,
    out: '',
    escapeUnicode: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--bank' && next) {
      options.bank = next;
      index += 1;
      continue;
    }

    if (arg === '--level' && next) {
      options.level = next;
      index += 1;
      continue;
    }

    if (arg === '--skill' && next) {
      options.skill = next;
      index += 1;
      continue;
    }

    if (arg === '--theme' && next) {
      options.theme = next;
      index += 1;
      continue;
    }

    if (arg === '--id' && next) {
      options.id = next.toLowerCase();
      index += 1;
      continue;
    }

    if (arg === '--limit' && next) {
      options.limit = Number(next);
      index += 1;
      continue;
    }

    if (arg === '--out' && next) {
      options.out = next;
      index += 1;
      continue;
    }

    if (arg === '--escape-unicode') {
      options.escapeUnicode = true;
    }
  }

  if (!sources[options.bank]) {
    throw new Error(`Unsupported bank: ${options.bank}`);
  }

  if (!Number.isFinite(options.limit) || options.limit <= 0) {
    throw new Error(`Invalid --limit value: ${options.limit}`);
  }

  return options;
}

function filterVocabulary(items, options) {
  return items.filter((item) => {
    if (options.level !== 'all' && item.level !== options.level) {
      return false;
    }

    if (options.theme !== 'all' && item.theme !== options.theme) {
      return false;
    }

    if (options.id && !item.id.toLowerCase().includes(options.id)) {
      return false;
    }

    return true;
  });
}

function filterQuestions(items, options) {
  return items.filter((item) => {
    if (options.level !== 'all' && item.level !== options.level) {
      return false;
    }

    if (options.skill !== 'all' && item.skill !== options.skill) {
      return false;
    }

    if (options.id && !item.id.toLowerCase().includes(options.id)) {
      return false;
    }

    return true;
  });
}

function summarizeQuestions(items) {
  const byLevel = {};
  const bySkill = {};

  for (const item of items) {
    byLevel[item.level] = (byLevel[item.level] ?? 0) + 1;
    bySkill[item.skill] = (bySkill[item.skill] ?? 0) + 1;
  }

  return { byLevel, bySkill };
}

function summarizeVocabulary(items) {
  const byLevel = {};
  const byTheme = {};

  for (const item of items) {
    byLevel[item.level ?? 'unknown'] = (byLevel[item.level ?? 'unknown'] ?? 0) + 1;
    byTheme[item.theme] = (byTheme[item.theme] ?? 0) + 1;
  }

  return { byLevel, byTheme };
}

function buildVocabularyReport(items, options) {
  const filtered = filterVocabulary(items, options);
  const summary = summarizeVocabulary(filtered);
  const lines = [];

  lines.push(`BJT runtime audit | bank=vocabulary | total=${filtered.length}`);
  lines.push(`Filters: level=${options.level}, theme=${options.theme}, id=${options.id || 'all'}`);
  lines.push(`Level summary: ${JSON.stringify(summary.byLevel)}`);
  lines.push(`Theme summary: ${JSON.stringify(summary.byTheme)}`);
  lines.push('');

  for (const item of filtered.slice(0, options.limit)) {
    lines.push(`[${item.id}] ${item.jp} | ${item.reading} | ${item.vn}`);
    lines.push(`theme=${item.theme}${item.level ? ` | level=${item.level}` : ''}`);
    lines.push(`example=${item.exampleJp}`);
    lines.push(`example_vi=${item.exampleVn}`);
    if (item.note) {
      lines.push(`note=${item.note}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function buildQuestionsReport(items, options) {
  const filtered = filterQuestions(items, options);
  const summary = summarizeQuestions(filtered);
  const lines = [];

  lines.push(`BJT runtime audit | bank=questions | total=${filtered.length}`);
  lines.push(`Filters: level=${options.level}, skill=${options.skill}, id=${options.id || 'all'}`);
  lines.push(`Level summary: ${JSON.stringify(summary.byLevel)}`);
  lines.push(`Skill summary: ${JSON.stringify(summary.bySkill)}`);
  lines.push('');

  for (const item of filtered.slice(0, options.limit)) {
    lines.push(`[${item.id}] ${item.title}`);
    lines.push(`level=${item.level} | skill=${item.skill} | difficulty=${item.difficulty}`);
    lines.push(`prompt=${item.prompt}`);
    lines.push(`situation=${item.situation.slice(0, 220)}${item.situation.length > 220 ? '...' : ''}`);
    lines.push(`correct=${item.correctIndex + 1}/${item.options.length}`);
    lines.push(`explanation=${item.explanation.slice(0, 220)}${item.explanation.length > 220 ? '...' : ''}`);
    lines.push('');
  }

  return lines.join('\n');
}

function writeOrPrintReport(report, options) {
  const finalReport = options.escapeUnicode
    ? JSON.stringify(report).slice(1, -1).replace(/\\n/g, '\n')
    : report;

  if (options.out) {
    const target = path.resolve(process.cwd(), options.out);
    fs.writeFileSync(target, finalReport + '\n', 'utf8');
    console.log(`Wrote UTF-8 report to ${path.relative(process.cwd(), target)}`);
    return;
  }

  console.log(finalReport);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const items = readJson(sources[options.bank]);

  if (options.bank === 'vocabulary') {
    writeOrPrintReport(buildVocabularyReport(items, options), options);
    return;
  }

  writeOrPrintReport(buildQuestionsReport(items, options), options);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error(
    'Usage: node scripts/bjt-audit-runtime.js --bank <questions|vocabulary> [--level J3] [--skill reading] [--theme email] [--id deadline] [--limit 5] [--out docs/bjt/report.txt] [--escape-unicode]'
  );
  process.exit(1);
}
