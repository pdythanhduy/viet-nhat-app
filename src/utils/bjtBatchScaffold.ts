import { BjtAuthoringLevel } from '../types/content';

export interface BjtBatchScaffoldInput {
  id: string;
  level: BjtAuthoringLevel;
  label: string;
}

export function buildBjtRawBatchTemplate(): string {
  return '[\n]\n';
}

export function buildBjtReviewedBatchTemplate(): string {
  return '[\n]\n';
}

export function buildBjtReviewNoteTemplate(input: BjtBatchScaffoldInput): string {
  return [
    `# ${input.label} Review`,
    '',
    `- Batch id: \`${input.id}\``,
    `- Level: \`${input.level}\``,
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

export function buildBjtRuntimePreviewTemplate(input: BjtBatchScaffoldInput): string {
  return [
    `# ${input.label} Runtime Preview`,
    '',
    `- Batch id: \`${input.id}\``,
    `- Level: \`${input.level}\``,
    '- Runtime items: pending transform',
    '',
  ].join('\n');
}

export function buildBjtClaudePromptTemplate(input: BjtBatchScaffoldInput): string {
  return [
    'You are helping generate original BJT-style practice data for a learning app.',
    '',
    `Task: create 12 original items for level ${input.level}.`,
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
    `  "level": "${input.level}",`,
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
    'Quality rules:',
    '- Vary scenarios across email, meetings, reporting, phone, and schedule changes when possible.',
    '- Japanese must sound natural for workplace communication.',
    '- Distractors must be plausible but still clearly wrong.',
    '- Self-check schema validity, answer uniqueness, explanation alignment, and level consistency before returning.',
    '',
  ].join('\n');
}
