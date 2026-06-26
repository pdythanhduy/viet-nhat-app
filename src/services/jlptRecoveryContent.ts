import { getAnthropicApiKey } from './translate';
import { readCache, stableHash, toAsciiJson, writeCache, extractJson } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import type {
  JlptLevel,
  RecoveryDayContent,
  RecoveryQuizItem,
  RecoveryReviewItem,
  RecoveryVocabCard,
  RecoveryExampleTag,
} from './jlptRecoveryTypes';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 90000;

export interface RecoveryDayInfo {
  theme: string;
  vocabTopic: string;
  kind?: 'normal' | 'review' | 'test';
}

export interface RecoveryContentSource {
  level: JlptLevel;
  day: number;
  getDayInfo: (day: number) => RecoveryDayInfo | undefined;
  seeds?: Record<number, RecoveryDayContent>;
}

export function isRecoveryContentConfigured(): boolean {
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

function buildVocabSystemPrompt(level: JlptLevel): string {
  const config = getJlptRecoveryLevelConfig(level);
  return (
    `Ban la gia su tieng Nhat cho nguoi Viet cap ${level}. ` +
    `Muon soan tu vung dung cho ${config.explanationTone} learners. ` +
    'Chi tra JSON thuan, moi item phai co cac truong: ' +
    '{"jp": "...", "acc": "[0]", "meta": "...", "mean": "...", "nu": "...", ' +
    '"syn": "...", "ant": "...", "col": "...", "use": "...", "mis": "...", ' +
    '"note": "...", "ex": [["D","..."],["B","..."]]}'
  );
}

function buildQuizSystemPrompt(level: JlptLevel): string {
  return (
    `Ban la gia su ra quiz cho JLPT ${level}. ` +
    'Chi tra JSON thuan, moi item co {"q":"...","o":["...","..."],"a":0}. ' +
    'Cau hoi phai tap trung vao nghia, trich tu, sac thai, va cach dung.'
  );
}

interface RawVocab {
  jp?: unknown;
  acc?: unknown;
  meta?: unknown;
  mean?: unknown;
  nu?: unknown;
  syn?: unknown;
  ant?: unknown;
  col?: unknown;
  use?: unknown;
  mis?: unknown;
  note?: unknown;
  ex?: unknown;
}

function parseVocabBatch(raw: string, startIndex: number): RecoveryVocabCard[] {
  const parsed = extractJson(raw);
  if (!Array.isArray(parsed)) throw new Error('Vocab JSON khong phai mang.');
  return parsed
    .map((item, i): RecoveryVocabCard => {
      const r = item as RawVocab;
      const ex: [RecoveryExampleTag, string][] = Array.isArray(r.ex)
        ? r.ex
            .map((e): [RecoveryExampleTag, string] => {
              const tag = Array.isArray(e) ? coerce(e[0]).toUpperCase() : '';
              const sentence = Array.isArray(e) ? coerce(e[1]) : '';
              const resolved: RecoveryExampleTag = tag === 'B' || tag === 'N' ? tag : 'D';
              return [resolved, sentence];
            })
            .filter((e) => e[1])
        : [];
      return {
        id: `VOC${String(startIndex + i + 1).padStart(4, '0')}`,
        jp: coerce(r.jp),
        acc: coerce(r.acc),
        meta: coerce(r.meta),
        mean: coerce(r.mean),
        nu: coerce(r.nu),
        syn: coerce(r.syn) || '—',
        ant: coerce(r.ant) || '—',
        col: coerce(r.col),
        use: coerce(r.use),
        mis: coerce(r.mis),
        note: coerce(r.note),
        ex,
      };
    })
    .filter((v) => v.jp && v.mean);
}

function parseQuiz(raw: string): RecoveryQuizItem[] {
  const parsed = extractJson(raw);
  if (!Array.isArray(parsed)) throw new Error('Quiz JSON khong phai mang.');
  return parsed
    .map((item): RecoveryQuizItem => {
      const r = item as { q?: unknown; o?: unknown; a?: unknown };
      const o = Array.isArray(r.o) ? r.o.map(coerce).filter(Boolean) : [];
      const a = typeof r.a === 'number' && r.a >= 0 && r.a < o.length ? r.a : 0;
      return { q: coerce(r.q), o, a };
    })
    .filter((q) => q.q && q.o.length >= 2);
}

function cacheKey(level: JlptLevel, day: number, promptVersion: string): string {
  return `jlpt_daycontent:${level}:d${day}:p${promptVersion}`;
}

export async function getRecoveryDayContent(source: RecoveryContentSource): Promise<RecoveryDayContent> {
  const config = getJlptRecoveryLevelConfig(source.level);

  const seed = source.seeds?.[source.day];
  if (seed) return seed;

  const dayInfo = source.getDayInfo(source.day);
  if (!dayInfo) throw new Error(`Khong co du lieu cho Day ${source.day}.`);

  const key = cacheKey(source.level, source.day, config.promptVersion);
  const cached = await readCache<RecoveryDayContent>(key, config.contentSchemaVersion);
  if (cached?.data?.vocab?.length) return cached.data;

  const vocab: RecoveryVocabCard[] = [];
  for (let batch = 0; batch < config.vocabBatchCount; batch++) {
    const raw = await callClaude(
      buildVocabSystemPrompt(source.level),
      {
        level: source.level,
        day: source.day,
        theme: dayInfo.theme,
        topic: dayInfo.vocabTopic,
        count: config.vocabCardsPerBatch,
        avoid: vocab.map((v) => v.jp),
      },
      8000,
    );
    vocab.push(...parseVocabBatch(raw, vocab.length));
  }
  if (vocab.length === 0) throw new Error('Khong sinh duoc tu vung.');

  const quizRaw = await callClaude(
    buildQuizSystemPrompt(source.level),
    {
      level: source.level,
      day: source.day,
      theme: dayInfo.theme,
      words: vocab.slice(0, 30).map((v) => v.jp),
      count: config.quizCount,
    },
    4096,
  );
  const quiz = parseQuiz(quizRaw);
  const content: RecoveryDayContent = { level: source.level, day: source.day, vocab, quiz };

  await writeCache(key, content, config.contentSchemaVersion);
  return content;
}

export async function hasReadyRecoveryDayContent(source: RecoveryContentSource): Promise<boolean> {
  const config = getJlptRecoveryLevelConfig(source.level);
  if (source.seeds?.[source.day]) return true;
  try {
    const cached = await readCache<RecoveryDayContent>(
      cacheKey(source.level, source.day, config.promptVersion),
      config.contentSchemaVersion,
    );
    return Boolean(cached?.data?.vocab?.length);
  } catch {
    return false;
  }
}

export function getRecoveryDayContentCacheKey(level: JlptLevel, day: number): string {
  return cacheKey(level, day, getJlptRecoveryLevelConfig(level).promptVersion);
}

export function getRecoveryDayContentHash(level: JlptLevel, day: number, topic: string): string {
  return stableHash(`${level}:${day}:${topic}`);
}
