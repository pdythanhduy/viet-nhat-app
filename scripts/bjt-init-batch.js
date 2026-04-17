const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFileIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function buildReviewNoteTemplate({ id, level, label }) {
  return [
    `# ${label} Review`,
    '',
    `- Batch id: \`${id}\``,
    `- Level: \`${level}\``,
    '- Status: pending review',
    '',
    '## Review Notes',
    '',
    '- Keep:',
    '- Revise:',
    '- Reject:',
    '',
    '## Risks To Check',
    '',
    '- Hidden authority assumptions',
    '- More than one plausible correct answer',
    '- Explanation not aligned with `correctIndex`',
    '- Japanese wording that sounds unnatural in workplace context',
    '',
  ].join('\n');
}

function buildRuntimePreviewTemplate({ id, level, label }) {
  return [
    `# ${label} Runtime Preview`,
    '',
    `- Batch id: \`${id}\``,
    `- Level: \`${level}\``,
    '- Runtime items: pending transform',
    '',
  ].join('\n');
}

function buildClaudePromptTemplate({ level }) {
  return [
    'You are helping generate original BJT-style practice data for a learning app.',
    '',
    `Task: create 12 original items for level ${level}.`,
    '',
    'Hard constraints:',
    '- These are NOT official BJT questions.',
    '- Do not copy or paraphrase official sample questions.',
    '- Use realistic Japanese workplace situations only.',
    '- Keep one clearly defensible correct answer per item.',
    '- Do not rely on hidden authority assumptions.',
    '- Output valid JSON array only.',
    '',
    'Schema per item:',
    '{',
    '  "id": "level_skill_001",',
    `  "level": "${level}",`,
    '  "skill": "listening" | "listening-reading" | "reading",',
    '  "difficulty": "basic" | "intermediate" | "advanced",',
    '  "business_topic": "email" | "meeting" | "phone" | "reporting" | "schedule" | "memo" | "announcement",',
    '  "situation": "...",',
    '  "prompt": "...",',
    '  "options": ["...", "...", "...", "..."],',
    '  "correctIndex": 0,',
    '  "explanation_vi": "...",',
    '  "vocabulary": ["...", "..."],',
    '  "grammar_points": ["...", "..."],',
    '  "action_focus": "...",',
    '  "level_reason": "...",',
    '  "why_not_lower_level": "...",',
    '  "why_not_higher_level": "..."',
    '}',
    '',
  ].join('\n');
}

function main() {
  const [id, level, ...labelParts] = process.argv.slice(2);
  const label = labelParts.join(' ').trim();

  if (!id || !level || !label) {
    console.error('Usage: node scripts/bjt-init-batch.js <id> <level> <label>');
    process.exit(1);
  }

  const cwd = process.cwd();
  const rawDir = path.join(cwd, 'docs', 'bjt', 'raw');
  const reviewedDir = path.join(cwd, 'docs', 'bjt', 'reviewed');
  const reviewsDir = path.join(cwd, 'docs', 'bjt', 'reviews');

  ensureDir(rawDir);
  ensureDir(reviewedDir);
  ensureDir(reviewsDir);

  const rawFile = path.join(rawDir, `${id}.raw.json`);
  const reviewedFile = path.join(reviewedDir, `${id}.reviewed.json`);
  const reviewNoteFile = path.join(reviewsDir, `${id}.review.md`);
  const runtimePreviewFile = path.join(reviewsDir, `${id}.runtime-preview.md`);
  const promptFile = path.join(reviewsDir, `${id}.claude-prompt.md`);

  const created = [];
  if (writeFileIfMissing(rawFile, '[\n]\n')) created.push(path.relative(cwd, rawFile));
  if (writeFileIfMissing(reviewedFile, '[\n]\n')) created.push(path.relative(cwd, reviewedFile));
  if (writeFileIfMissing(reviewNoteFile, buildReviewNoteTemplate({ id, level, label }))) {
    created.push(path.relative(cwd, reviewNoteFile));
  }
  if (writeFileIfMissing(runtimePreviewFile, buildRuntimePreviewTemplate({ id, level, label }))) {
    created.push(path.relative(cwd, runtimePreviewFile));
  }
  if (writeFileIfMissing(promptFile, buildClaudePromptTemplate({ level }))) {
    created.push(path.relative(cwd, promptFile));
  }

  console.log(`Initialized BJT batch scaffold for ${id} (${level})`);
  if (created.length > 0) {
    console.log('Created files:');
    for (const file of created) {
      console.log(`- ${file}`);
    }
  } else {
    console.log('No files created because all scaffold files already exist.');
  }
}

main();
