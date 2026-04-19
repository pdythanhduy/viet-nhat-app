const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'docs', 'bjt', 'document', 'BJT_50_MOCK_EXAMS_V2.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function parseArgs(argv) {
  const options = {
    examId: '',
    limit: 3,
    out: '',
    escapeUnicode: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--exam' && next) {
      options.examId = next;
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

  if (!Number.isFinite(options.limit) || options.limit <= 0) {
    throw new Error(`Invalid --limit value: ${options.limit}`);
  }

  return options;
}

function summarizeExams(exams) {
  const levels = {};
  const parts = {};
  const uniqueQuestions = new Set();

  for (const exam of exams) {
    for (const question of exam.questions ?? []) {
      levels[question.level] = (levels[question.level] ?? 0) + 1;
      parts[question.part] = (parts[question.part] ?? 0) + 1;
      uniqueQuestions.add(
        JSON.stringify([
          question.part,
          question.level,
          question.passage_jp,
          question.question_jp,
          question.answer,
        ])
      );
    }
  }

  return {
    levels,
    parts,
    uniqueQuestions: uniqueQuestions.size,
  };
}

function buildReport(data, options) {
  const exams = data.exams ?? [];
  const filtered = options.examId
    ? exams.filter((exam) => exam.exam_id === options.examId)
    : exams;

  if (filtered.length === 0) {
    throw new Error(`No exams matched --exam ${options.examId}`);
  }

  const summary = summarizeExams(filtered);
  const lines = [];

  lines.push(`BJT mock V2 audit | exams=${filtered.length}`);
  lines.push(`Source: docs/bjt/document/BJT_50_MOCK_EXAMS_V2.json`);
  lines.push(`Meta title: ${data.meta?.title ?? 'unknown'}`);
  lines.push(`Meta version: ${data.meta?.version ?? 'unknown'}`);
  lines.push(`Level summary: ${JSON.stringify(summary.levels)}`);
  lines.push(`Part summary: ${JSON.stringify(summary.parts)}`);
  lines.push(`Unique question signatures: ${summary.uniqueQuestions}`);
  lines.push('');

  for (const exam of filtered.slice(0, options.limit)) {
    lines.push(`[${exam.exam_id}] ${exam.title}`);
    lines.push(`questions=${exam.total_questions} | time=${exam.time_limit_minutes} min | parts=${JSON.stringify(exam.parts)}`);

    for (const question of exam.questions.slice(0, 4)) {
      lines.push(`- ${question.id} | part=${question.part} | level=${question.level} | answer=${question.answer}`);
      lines.push(`  q=${question.question_jp}`);
    }

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
  const data = readJson(sourcePath);
  writeOrPrintReport(buildReport(data, options), options);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error(
    'Usage: node scripts/bjt-audit-mock-v2.js [--exam BJT_MOCK_01] [--limit 3] [--out docs/bjt/document/mock-v2-audit.txt] [--escape-unicode]'
  );
  process.exit(1);
}
