// N2 Recovery — Stage 2: AI-generated lesson content for a Day.
//
// Given a Day's grammar patterns (from the static curriculum), ask Claude to
// produce a Vietnamese explanation + Japanese examples for each pattern.
// Cached in AsyncStorage per (day + patterns hash) so re-opening costs no
// tokens. Same Claude/raw-HTTP + ASCII-body approach as translate.ts /
// smartTranslation.ts (the ASCII body avoids the iOS UTF-8 send bug).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnthropicApiKey } from './translate';
import { getN2Day } from '../constants/n2RecoveryCurriculum';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 40000;
const CACHE_PREFIX = 'n2_lesson_v1:';

export interface N2Example {
  jp: string;
  vn: string;
}

export interface N2GrammarItem {
  pattern: string;
  meaning: string; // VN: nghĩa / diễn đạt gì
  usage: string; // VN: cách dùng / cách nối
  examples: N2Example[];
}

export interface N2Lesson {
  day: number;
  grammar: N2GrammarItem[];
}

export function isLessonConfigured(): boolean {
  return Boolean(getAnthropicApiKey());
}

function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : '\\u' + code.toString(16).padStart(4, '0');
  }
  return out;
}

function stableHash(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function coerceString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const a = text.indexOf('[');
    const b = text.lastIndexOf(']');
    if (a >= 0 && b > a) return JSON.parse(text.slice(a, b + 1));
    const c = text.indexOf('{');
    const d = text.lastIndexOf('}');
    if (c >= 0 && d > c) return JSON.parse(text.slice(c, d + 1));
    throw new Error('Claude không trả về JSON.');
  }
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
    if (!res.ok) {
      throw new Error(json.error?.message || `Claude API lỗi HTTP ${res.status}`);
    }
    const text = (json.content ?? [])
      .filter((b) => b.type === 'text' && b.text)
      .map((b) => b.text)
      .join('')
      .trim();
    if (!text) throw new Error('Claude trả về rỗng.');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

const SYSTEM_PROMPT =
  'Bạn là giáo viên tiếng Nhật cho người Việt đã có trình độ N2 nhưng lâu không dùng, ' +
  'đang lấy lại năng lực để dùng trong công ty Nhật. Giải thích ngữ pháp NGẮN GỌN, thực dụng, ' +
  'tiếng Việt dễ hiểu; ví dụ tự nhiên, ưu tiên ngữ cảnh đời sống/công việc ở Nhật. ' +
  'Chỉ trả về JSON thuần (không markdown, không ```), là một MẢNG các object: ' +
  '{"pattern": mẫu ngữ pháp, "meaning": nghĩa/diễn đạt gì (tiếng Việt), ' +
  '"usage": cách dùng và cách nối (tiếng Việt, ngắn), ' +
  '"examples": [{"jp": câu tiếng Nhật, "vn": dịch tiếng Việt}, ...] (2 ví dụ mỗi mẫu)}. ' +
  'Giữ đúng thứ tự mẫu được đưa vào.';

function cacheKey(day: number, patterns: string[]): string {
  return `${CACHE_PREFIX}d${day}:${stableHash(patterns.join('|'))}`;
}

function parseLesson(day: number, raw: string, patterns: string[]): N2Lesson {
  const parsed = extractJson(raw);
  if (!Array.isArray(parsed)) throw new Error('Claude JSON không phải mảng.');
  const grammar: N2GrammarItem[] = parsed.map((item, i) => {
    const r = item as Record<string, unknown>;
    const examples = Array.isArray(r.examples)
      ? r.examples
          .map((e) => {
            const er = e as Record<string, unknown>;
            return { jp: coerceString(er.jp), vn: coerceString(er.vn) };
          })
          .filter((e) => e.jp || e.vn)
      : [];
    return {
      pattern: coerceString(r.pattern) || patterns[i] || '',
      meaning: coerceString(r.meaning),
      usage: coerceString(r.usage),
      examples,
    };
  });
  if (grammar.length === 0) throw new Error('Không có nội dung ngữ pháp.');
  return { day, grammar };
}

/**
 * Generate (or load from cache) the grammar lesson for a Day. Throws on
 * config/network/API errors so the screen can show a clear message.
 */
export async function generateN2Lesson(day: number): Promise<N2Lesson> {
  const info = getN2Day(day);
  if (!info) throw new Error(`Không có Day ${day}.`);
  const patterns = info.grammar;
  const key = cacheKey(day, patterns);

  try {
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached) as N2Lesson;
      if (parsed.grammar?.length) return parsed;
    }
  } catch {
    // ignore cache read errors
  }

  const raw = await callClaude(
    SYSTEM_PROMPT,
    { day, theme: info.theme, patterns },
    4096
  );
  const lesson = parseLesson(day, raw, patterns);

  try {
    await AsyncStorage.setItem(key, JSON.stringify(lesson));
  } catch {
    // best-effort cache
  }
  return lesson;
}

/** Whether a cached lesson already exists for this day (no network). */
export async function hasCachedLesson(day: number): Promise<boolean> {
  const info = getN2Day(day);
  if (!info) return false;
  try {
    const v = await AsyncStorage.getItem(cacheKey(day, info.grammar));
    return Boolean(v);
  } catch {
    return false;
  }
}
