const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = path.join(
  'docs',
  'bjt',
  'document',
  'partitioned',
  'legacy_runtime_practice_questions.json'
);

const ROLE_CUE_PATTERN = /\s*\[Role boundary\]\s*Follow assigned authority; do not exceed role\./gi;
const DEADLINE_CUE_PATTERN = /\s*\[Deadline\]\s*Follow the stated time\/deadline order\./gi;

const ROLE_SENTENCE = ' Can xu ly dung pham vi tham quyen theo vai tro duoc giao.';
const DEADLINE_SENTENCE = ' Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.';

function parseArgs(argv) {
  const options = {
    file: DEFAULT_TARGET,
    write: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--file' && next) {
      options.file = next;
      i += 1;
      continue;
    }

    if (arg === '--write') {
      options.write = true;
    }
  }

  return options;
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').replace(/\s+\./g, '.').trim();
}

function appendOnce(base, sentence, anchor) {
  if (base.toLowerCase().includes(anchor.toLowerCase())) {
    return base;
  }
  return `${base}${sentence}`;
}

function cleanupExplanation(text) {
  const original = String(text ?? '');
  let output = original;
  let changed = false;

  if (ROLE_CUE_PATTERN.test(output)) {
    output = output.replace(ROLE_CUE_PATTERN, '');
    output = appendOnce(output, ROLE_SENTENCE, 'tham quyen');
    changed = true;
  }

  if (DEADLINE_CUE_PATTERN.test(output)) {
    output = output.replace(DEADLINE_CUE_PATTERN, '');
    output = appendOnce(output, DEADLINE_SENTENCE, 'deadline');
    changed = true;
  }

  const normalized = normalizeWhitespace(output);
  if (normalized !== output) {
    output = normalized;
    changed = true;
  }

  return { output, changed };
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

  let changedCount = 0;

  for (const item of payload) {
    if (typeof item.explanation !== 'string') {
      continue;
    }

    const { output, changed } = cleanupExplanation(item.explanation);
    if (changed) {
      item.explanation = output;
      changedCount += 1;
    }
  }

  if (options.write && changedCount > 0) {
    fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  }

  console.log(`Explanation cleanup | file=${target}`);
  console.log(`Changed items: ${changedCount}`);
  console.log(`Mode: ${options.write ? 'write' : 'dry-run'}`);
}

main();

