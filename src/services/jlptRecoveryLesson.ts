import { getAnthropicApiKey } from './translate';
import { extractJson, readCache, stableHash, toAsciiJson, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import type { JlptLevel, RecoveryLesson } from './jlptRecoveryTypes';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 40000;

export interface RecoveryLessonSource {
  level: JlptLevel;
  day: number;
  theme: string;
  patterns: string[];
}

export function isRecoveryLessonConfigured(): boolean {
  return Boolean(getAnthropicApiKey());
}

function coerce(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

async function callClaude(system: string, user: unknown, maxTokens: number): Promise<string> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) throw new Error('not-configured');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'content-type': 'application/json',
      },
      body: toAsciiJson({
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: JSON.stringify(user) }],
      }),
      signal: controller.signal,
    });
    const json = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
      error?: { message?: string };
    };
    if (!res.ok) throw new Error(json.error?.message || `Claude API HTTP ${res.status}`);
    const text = (json.content ?? [])
      .filter((b) => b.type === 'text' && b.text)
      .map((b) => b.text)
      .join('')
      .trim();
    if (!text) throw new Error('Claude returned an empty response.');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

const SYSTEM_PROMPT = (
  level: JlptLevel,
  explanationTone: string,
) =>
  `Ban la gia su JLPT ${level}. ` +
  `Giai thich ngan gon, ro nghia, tone ${explanationTone}. ` +
  'Chi tra JSON thuan, moi object co {"pattern":"...","meaning":"...","usage":"...","examples":[{"jp":"...","vn":"..."}, ...]}. ' +
  'Mo ta cach dung va y nghia bang tieng Viet.';

function cacheKey(level: JlptLevel, day: number, patterns: string[], promptVersion: string): string {
  return `jlpt_lesson:${level}:d${day}:p${promptVersion}:${stableHash(patterns.join('|'))}`;
}

function parseLesson(level: JlptLevel, day: number, raw: string, patterns: string[]): RecoveryLesson {
  const parsed = extractJson(raw);
  if (!Array.isArray(parsed)) throw new Error('Lesson JSON khong phai mang.');
  const grammar = parsed.map((item, i) => {
    const r = item as Record<string, unknown>;
    const examples = Array.isArray(r.examples)
      ? r.examples
          .map((e) => {
            const er = e as Record<string, unknown>;
            return { jp: coerce(er.jp), vn: coerce(er.vn) };
          })
          .filter((e) => e.jp || e.vn)
      : [];
    return {
      pattern: coerce(r.pattern) || patterns[i] || '',
      meaning: coerce(r.meaning),
      usage: coerce(r.usage),
      examples,
    };
  });
  if (grammar.length === 0) throw new Error('Khong co noi dung ngu phap.');
  return { level, day, grammar };
}

export async function getRecoveryLesson(source: RecoveryLessonSource): Promise<RecoveryLesson> {
  const config = getJlptRecoveryLevelConfig(source.level);
  const key = cacheKey(source.level, source.day, source.patterns, config.promptVersion);

  const cached = await readCache<RecoveryLesson>(key, config.lessonSchemaVersion);
  if (cached?.data?.grammar?.length) return cached.data;

  const raw = await callClaude(
    SYSTEM_PROMPT(source.level, config.explanationTone),
    {
      level: source.level,
      day: source.day,
      theme: source.theme,
      patterns: source.patterns.slice(0, config.lessonItemCount),
    },
    4096,
  );
  const lesson = parseLesson(source.level, source.day, raw, source.patterns);
  await writeCache(key, lesson, config.lessonSchemaVersion);
  return lesson;
}

export async function hasCachedRecoveryLesson(source: RecoveryLessonSource): Promise<boolean> {
  const config = getJlptRecoveryLevelConfig(source.level);
  try {
    const cached = await readCache<RecoveryLesson>(
      cacheKey(source.level, source.day, source.patterns, config.promptVersion),
      config.lessonSchemaVersion,
    );
    return Boolean(cached?.data?.grammar?.length);
  } catch {
    return false;
  }
}
