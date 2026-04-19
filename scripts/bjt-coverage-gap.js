const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = path.join(
  'docs',
  'bjt',
  'document',
  'partitioned',
  'legacy_runtime_practice_questions.json'
);

const DEFAULT_OUT = path.join('docs', 'bjt', 'document', 'content-roadmap.md');

const LEVELS = ['J5', 'J4', 'J3', 'J2', 'J1', 'J1+'];

const TOPIC_RULES = [
  { topic: 'email', keywords: ['email', 'mail', '件名', 'メール'] },
  { topic: 'meeting', keywords: ['meeting', '会議', '打ち合わせ', 'mtg'] },
  { topic: 'phone', keywords: ['phone', '電話', 'call'] },
  { topic: 'schedule', keywords: ['schedule', '締め切り', 'deadline', '日程', '時'] },
  { topic: 'reporting', keywords: ['report', '報告', '進捗', '実績'] },
  { topic: 'customer', keywords: ['customer', 'client', '取引先', 'お客様'] },
  { topic: 'compliance', keywords: ['compliance', '規定', '規則', 'policy', '内部'] },
  { topic: 'legal', keywords: ['legal', '法務', '契約', '開示'] },
  { topic: 'finance', keywords: ['cost', 'budget', '経費', '精算', '予算'] },
  { topic: 'incident', keywords: ['incident', '障害', '事故', 'trouble'] },
];

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function parseArgs(argv) {
  const options = {
    file: DEFAULT_TARGET,
    out: DEFAULT_OUT,
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
    }
  }

  return options;
}

function detectTopics(item) {
  const text = normalize(`${item.title ?? ''} ${item.situation ?? ''} ${item.prompt ?? ''}`);
  const hits = [];
  for (const rule of TOPIC_RULES) {
    if (rule.keywords.some((k) => text.includes(normalize(k)))) {
      hits.push(rule.topic);
    }
  }
  return hits.length > 0 ? hits : ['other'];
}

function buildMatrix(items) {
  const matrix = {};
  for (const level of LEVELS) {
    matrix[level] = {};
    for (const rule of TOPIC_RULES) {
      matrix[level][rule.topic] = 0;
    }
    matrix[level].other = 0;
  }

  for (const item of items) {
    const level = LEVELS.includes(item.level) ? item.level : 'J3';
    const topics = detectTopics(item);
    for (const topic of topics) {
      if (matrix[level][topic] === undefined) {
        matrix[level][topic] = 0;
      }
      matrix[level][topic] += 1;
    }
  }

  return matrix;
}

function targetMin(level, topic) {
  const core = ['email', 'meeting', 'phone', 'schedule', 'reporting', 'customer'];
  const advanced = ['compliance', 'legal', 'finance', 'incident'];
  if (core.includes(topic)) return 2;
  if (advanced.includes(topic)) return ['J2', 'J1', 'J1+'].includes(level) ? 2 : 1;
  return 1;
}

function buildGapList(matrix) {
  const gaps = [];
  for (const level of LEVELS) {
    for (const topic of Object.keys(matrix[level])) {
      if (topic === 'other') continue;
      const count = matrix[level][topic];
      const min = targetMin(level, topic);
      if (count < min) {
        gaps.push({ level, topic, current: count, target: min, missing: min - count });
      }
    }
  }
  return gaps;
}

function roadmapMarkdown(filePath, matrix, gaps) {
  const lines = [];
  lines.push('# BJT Content Roadmap');
  lines.push('');
  lines.push(`Source: \`${filePath}\``);
  lines.push(`Updated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Coverage Matrix');
  lines.push('');
  for (const level of LEVELS) {
    lines.push(`### ${level}`);
    for (const topic of Object.keys(matrix[level])) {
      lines.push(`- ${topic}: ${matrix[level][topic]}`);
    }
    lines.push('');
  }

  lines.push('## Priority Gaps');
  lines.push('');
  if (gaps.length === 0) {
    lines.push('- No gap found with current target thresholds.');
  } else {
    for (const gap of gaps) {
      lines.push(
        `- ${gap.level} / ${gap.topic}: current=${gap.current}, target=${gap.target}, missing=${gap.missing}`
      );
    }
  }
  lines.push('');
  lines.push('## Suggested Next Batch');
  lines.push('');
  lines.push('- Batch A: J3/J2 schedule + reporting edge cases (deadline collision, escalation timing).');
  lines.push('- Batch B: J2/J1 compliance + legal disclosure (role boundary under pressure).');
  lines.push('- Batch C: J5/J4 customer phone/email basics with stronger distractors.');
  lines.push('');
  lines.push('## QA Flow');
  lines.push('');
  lines.push('1. Generate draft items by batch/topic.');
  lines.push('2. Run `npm run bjt:qa-checklist` and `npm run bjt:distractor-audit`.');
  lines.push('3. Fix issues, then enforce `npm run bjt:qa-checklist:gate`.');
  lines.push('');
  return lines.join('\n');
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const input = path.resolve(process.cwd(), options.file);
  const output = path.resolve(process.cwd(), options.out);

  if (!fs.existsSync(input)) {
    console.error(`File not found: ${input}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  if (!Array.isArray(payload)) {
    console.error('Expected a JSON array');
    process.exit(1);
  }

  const matrix = buildMatrix(payload);
  const gaps = buildGapList(matrix);
  const markdown = roadmapMarkdown(input, matrix, gaps);

  fs.writeFileSync(output, `${markdown}\n`, 'utf8');
  console.log(`Wrote coverage roadmap: ${output}`);
  console.log(`Gap count: ${gaps.length}`);
}

main();

