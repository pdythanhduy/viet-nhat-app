// JLPT content generation — pure, Node-safe core.
//
// This module contains the Claude prompts + parsing + generation calls with NO
// React Native / AsyncStorage / expo imports, so it can run in two places:
//   1. The app's on-device generation path (jlptRecoveryContent/Lesson.ts).
//   2. The offline generation script (scripts/generate-jlpt-content.ts), which
//      pre-generates all content once so public users never call Claude with
//      the owner's key.
//
// Keep this file free of RN/expo imports.

import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import type {
  JlptLevel,
  RecoveryDayContent,
  RecoveryExampleTag,
  RecoveryLesson,
  RecoveryQuizItem,
  RecoveryVocabCard,
} from './jlptRecoveryTypes';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const DEFAULT_TIMEOUT_MS = 90000;

// --- pure helpers ----------------------------------------------------------

// iOS has a UTF-8 send bug on some payloads; escaping non-ASCII to \uXXXX in the
// request body avoids it. (Harmless in Node too.)
export function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : `\\u${code.toString(16).padStart(4, '0')}`;
  }
  return out;
}

export function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const a = text.indexOf('[');
    const b = text.lastIndexOf(']');
    if (a >= 0 && b > a) return JSON.parse(text.slice(a, b + 1));
    const c = text.indexOf('{');
    const d = text.lastIndexOf('}');
    if (c >= 0 && d > c) return JSON.parse(text.slice(c, d + 1));
    throw new Error('Claude khong tra ve JSON hop le.');
  }
}

function coerce(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// --- Claude call -----------------------------------------------------------

export interface ClaudeOptions {
  apiKey: string;
  model?: string;
  timeoutMs?: number;
}

async function callClaude(
  opts: ClaudeOptions,
  system: string,
  user: unknown,
  maxTokens: number,
): Promise<string> {
  if (!opts.apiKey) throw new Error('not-configured');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'x-api-key': opts.apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'content-type': 'application/json',
      },
      body: toAsciiJson({
        model: opts.model ?? DEFAULT_MODEL,
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

// --- prompts ---------------------------------------------------------------

export function buildVocabSystemPrompt(level: JlptLevel): string {
  const config = getJlptRecoveryLevelConfig(level);
  return (
    `Ban la gia su tieng Nhat cho nguoi Viet cap ${level}. ` +
    `Muon soan tu vung dung cho ${config.explanationTone} learners. ` +
    'Chi tra JSON thuan (khong markdown), MANG cac object dung khoa: ' +
    '{"jp": tu kem cach doc trong ngoac vd 私（わたし）, "acc": pitch accent vd [0], ' +
    '"meta": "Nx | loai tu | do pho bien" (tieng Viet/ky hieu, khong chen chu Han le), ' +
    '"mean": nghia tieng Viet, ' +
    '"nu": sac thai/cach dung ngan bang tieng Viet (KHONG ghi lai cach doc), ' +
    '"syn": tu dong nghia, "ant": tu trai nghia (— neu khong co), ' +
    '"col": collocation, "use": muc do dung, "mis": loi nguoi Viet hay mac, "note": ghi chu ngan, ' +
    '"ex": 2 vi du, MOI vi du la [tag, CAU TIENG NHAT] voi tag thuoc {D,B,N} (Daily/Business/News). ' +
    'CA HAI cau deu HOAN TOAN bang tieng Nhat — TUYET DOI khong dich sang tieng Viet trong "ex". ' +
    'Vi du dung: "ex": [["D","明日は休みです。"],["B","会議は3時からです。"]] }'
  );
}

export function buildQuizSystemPrompt(level: JlptLevel): string {
  return (
    `Ban la gia su ra quiz cho JLPT ${level}. ` +
    'Chi tra JSON thuan, moi item co {"q":"...","o":["...","..."],"a":0}. ' +
    'Cau hoi phai tap trung vao nghia, trich tu, sac thai, va cach dung.'
  );
}

export function buildLessonSystemPrompt(level: JlptLevel, explanationTone: string): string {
  return (
    `Ban la gia su JLPT ${level}. ` +
    `Giai thich ngan gon, ro nghia, tone ${explanationTone}. ` +
    'Chi tra JSON thuan, moi object co {"pattern":"...","meaning":"...","usage":"...","examples":[{"jp":"...","vn":"..."}, ...]}. ' +
    'Mo ta cach dung va y nghia bang tieng Viet.'
  );
}

// --- parsing ---------------------------------------------------------------

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

export function parseVocabBatch(raw: string, startIndex: number): RecoveryVocabCard[] {
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

export function parseQuiz(raw: string): RecoveryQuizItem[] {
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

export function parseLesson(
  level: JlptLevel,
  day: number,
  raw: string,
  patterns: string[],
): RecoveryLesson {
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

// --- generation ------------------------------------------------------------

export interface DayContentParams {
  level: JlptLevel;
  day: number;
  theme: string;
  vocabTopic: string;
}

export async function generateRecoveryDayContent(
  opts: ClaudeOptions,
  params: DayContentParams,
): Promise<RecoveryDayContent> {
  const config = getJlptRecoveryLevelConfig(params.level);

  const vocab: RecoveryVocabCard[] = [];
  for (let batch = 0; batch < config.vocabBatchCount; batch++) {
    const raw = await callClaude(
      // Larger batches (e.g. N3 27/batch) overflow 8000 tokens and truncate the
      // JSON; give generous headroom + a longer timeout (Haiku supports 64K out).
      { ...opts, timeoutMs: opts.timeoutMs ?? 180000 },
      buildVocabSystemPrompt(params.level),
      {
        level: params.level,
        day: params.day,
        theme: params.theme,
        topic: params.vocabTopic,
        count: config.vocabCardsPerBatch,
        avoid: vocab.map((v) => v.jp),
      },
      16000,
    );
    vocab.push(...parseVocabBatch(raw, vocab.length));
  }
  if (vocab.length === 0) throw new Error('Khong sinh duoc tu vung.');

  const quizRaw = await callClaude(
    opts,
    buildQuizSystemPrompt(params.level),
    {
      level: params.level,
      day: params.day,
      theme: params.theme,
      words: vocab.slice(0, 30).map((v) => v.jp),
      count: config.quizCount,
    },
    4096,
  );
  const quiz = parseQuiz(quizRaw);
  return { level: params.level, day: params.day, vocab, quiz };
}

export interface LessonParams {
  level: JlptLevel;
  day: number;
  theme: string;
  patterns: string[];
}

export async function generateRecoveryLesson(
  opts: ClaudeOptions,
  params: LessonParams,
): Promise<RecoveryLesson> {
  const config = getJlptRecoveryLevelConfig(params.level);
  const raw = await callClaude(
    { ...opts, timeoutMs: opts.timeoutMs ?? 40000 },
    buildLessonSystemPrompt(params.level, config.explanationTone),
    {
      level: params.level,
      day: params.day,
      theme: params.theme,
      patterns: params.patterns.slice(0, config.lessonItemCount),
    },
    4096,
  );
  return parseLesson(params.level, params.day, raw, params.patterns);
}
