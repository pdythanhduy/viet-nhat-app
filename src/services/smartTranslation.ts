import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnthropicApiKey } from './translate';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 30000;
const WORD_CACHE_PREFIX = 'smart_translation_word_v2:';
const SENTENCE_STUDY_CACHE_PREFIX = 'smart_translation_sentence_v2:';

export type SmartSentenceTranslation = {
  source: string;
  translation: string;
};

export type SmartWordExplanation = {
  surface: string;
  reading?: string;
  meaning: string;
  sentenceTranslation: string;
  note?: string;
};

export type SmartSentenceVocabularyItem = {
  surface: string;
  reading?: string;
  meaning: string;
};

export type SmartSentenceStudyExplanation = {
  source: string;
  translation: string;
  summary: string;
  grammarNote: string;
  learningTip?: string;
  vocabulary: SmartSentenceVocabularyItem[];
};

export type ExplainSelectionInput = {
  surface: string;
  reading?: string | null;
  sentence: string;
};

type ClaudeResponse = {
  content?: Array<{ type: string; text?: string }>;
  stop_reason?: string;
  error?: { message?: string };
};

async function readClaudeResponse(res: Response): Promise<ClaudeResponse> {
  const body = await res.text();
  try {
    return JSON.parse(body) as ClaudeResponse;
  } catch {
    const preview = body.trim().replace(/\s+/g, ' ').slice(0, 120);
    throw new Error(
      preview
        ? `Claude API returned a non-JSON response: ${preview}`
        : 'Claude API returned an empty non-JSON response.'
    );
  }
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

async function callClaude(system: string, user: unknown, maxTokens: number): Promise<string> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error('not-configured');
  }

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

    const json = await readClaudeResponse(res);
    if (!res.ok) {
      throw new Error(json.error?.message || `Claude API returned HTTP ${res.status}`);
    }
    const text = (json.content ?? [])
      .filter((block) => block.type === 'text' && block.text)
      .map((block) => block.text)
      .join('')
      .trim();
    if (!text) {
      throw new Error('Claude returned an empty response.');
    }
    return text;
  } finally {
    clearTimeout(timer);
  }
}

function tryParseJson(text: string): { ok: true; value: unknown } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false };
  }
}

function extractJson(text: string): unknown {
  const direct = tryParseJson(text);
  if (direct.ok) return direct.value;

  const candidates: string[] = [];
  const arrayStart = text.indexOf('[');
  const arrayEnd = text.lastIndexOf(']');
  if (arrayStart >= 0 && arrayEnd > arrayStart) {
    candidates.push(text.slice(arrayStart, arrayEnd + 1));
  }

  const objectStart = text.indexOf('{');
  const objectEnd = text.lastIndexOf('}');
  if (objectStart >= 0 && objectEnd > objectStart) {
    candidates.push(text.slice(objectStart, objectEnd + 1));
  }

  for (const candidate of candidates) {
    const parsed = tryParseJson(candidate);
    if (parsed.ok) return parsed.value;
  }

  throw new Error('Claude did not return valid JSON.');
}

function coerceString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function stableHash(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function normalizeExplainInput(input: ExplainSelectionInput): ExplainSelectionInput {
  return {
    surface: input.surface.trim(),
    reading: input.reading?.trim() || undefined,
    sentence: input.sentence.trim(),
  };
}

function cleanModelText(text: string): string {
  return text
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .trim();
}

function coerceWordExplanation(
  parsed: unknown,
  input: ExplainSelectionInput
): SmartWordExplanation | null {
  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  const meaning = coerceString(record.meaning);
  const sentenceTranslation = coerceString(record.sentenceTranslation);
  if (!meaning || !sentenceTranslation) {
    return null;
  }

  return {
    surface: coerceString(record.surface) || input.surface,
    reading: coerceString(record.reading) || input.reading || undefined,
    meaning,
    sentenceTranslation,
    note: coerceString(record.note) || undefined,
  };
}

function fallbackWordExplanation(raw: string, input: ExplainSelectionInput): SmartWordExplanation {
  const cleaned = cleanModelText(raw);
  if (!cleaned) {
    throw new Error('Claude returned an empty response.');
  }

  return {
    surface: input.surface,
    reading: input.reading || undefined,
    meaning: cleaned,
    sentenceTranslation: input.sentence,
    note:
      'Ph\u1ea3n h\u1ed3i kh\u00f4ng \u0111\u00fang JSON; app \u0111ang hi\u1ec3n th\u1ecb n\u1ed9i dung th\u00f4.',
  };
}

function wordCacheKey(input: ExplainSelectionInput): string {
  return `${WORD_CACHE_PREFIX}${stableHash(JSON.stringify(normalizeExplainInput(input)))}`;
}

type SentenceStudyInput = {
  source: string;
  translation: string;
};

function normalizeSentenceStudyInput(input: SentenceStudyInput): SentenceStudyInput {
  return {
    source: input.source.trim(),
    translation: input.translation.trim(),
  };
}

function sentenceStudyCacheKey(input: SentenceStudyInput): string {
  return `${SENTENCE_STUDY_CACHE_PREFIX}${stableHash(
    JSON.stringify(normalizeSentenceStudyInput(input))
  )}`;
}

function coerceSentenceStudyExplanation(
  parsed: unknown,
  input: SentenceStudyInput
): SmartSentenceStudyExplanation | null {
  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  const summary = coerceString(record.summary);
  const grammarNote = coerceString(record.grammarNote);
  // Only bail if there's essentially nothing usable; a missing grammarNote
  // alone shouldn't drop us into the raw-text fallback.
  if (!summary && !grammarNote) {
    return null;
  }

  const vocabulary: SmartSentenceVocabularyItem[] = Array.isArray(record.vocabulary)
    ? record.vocabulary.flatMap((item) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
        const entry = item as Record<string, unknown>;
        const surface = coerceString(entry.surface);
        const meaning = coerceString(entry.meaning);
        if (!surface || !meaning) return [];
        return [
          {
            surface,
            reading: coerceString(entry.reading) || undefined,
            meaning,
          },
        ];
      })
    : [];

  return {
    source: coerceString(record.source) || input.source,
    translation: coerceString(record.translation) || input.translation,
    summary: summary || coerceString(record.translation) || input.translation,
    grammarNote: grammarNote || '—',
    learningTip: coerceString(record.learningTip) || undefined,
    vocabulary,
  };
}

// Pull a JSON string value by key even from malformed JSON, so a slightly
// broken response still renders clean fields instead of dumping the raw text
// (which would show "source"/"summary"/\u2026 keys in the UI).
function extractJsonStringField(raw: string, key: string): string {
  const match = raw.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!match) return '';
  try {
    return (JSON.parse(`"${match[1]}"`) as string).trim();
  } catch {
    return match[1].trim();
  }
}

function fallbackSentenceStudyExplanation(
  raw: string,
  input: SentenceStudyInput
): SmartSentenceStudyExplanation {
  // Best-effort: recover the intended fields from a near-JSON response.
  const summary = extractJsonStringField(raw, 'summary');
  const grammarNote = extractJsonStringField(raw, 'grammarNote');
  const learningTip = extractJsonStringField(raw, 'learningTip');
  const translation = extractJsonStringField(raw, 'translation') || input.translation;

  if (summary || grammarNote) {
    return {
      source: input.source,
      translation,
      summary: summary || translation,
      grammarNote: grammarNote || '\u2014',
      learningTip: learningTip || undefined,
      vocabulary: [],
    };
  }

  // No extractable fields. If the model answered in plain prose (not JSON),
  // that prose IS a usable explanation \u2014 show it. Only suppress the raw text
  // when it looks like broken JSON (which would leak "source"/"summary" keys).
  const cleaned = cleanModelText(raw);
  const looksLikeJson = /[{}]|"\s*(?:source|summary|translation|grammarNote|vocabulary)\s*"/.test(
    cleaned
  );
  if (cleaned && !looksLikeJson) {
    return {
      source: input.source,
      translation: input.translation,
      summary: cleaned,
      grammarNote: '\u2014',
      learningTip: undefined,
      vocabulary: [],
    };
  }

  // Broken/empty JSON \u2014 show a clean message, never the raw keys.
  return {
    source: input.source,
    translation: input.translation,
    summary: input.translation || 'Ch\u01b0a t\u1ea1o \u0111\u01b0\u1ee3c gi\u1ea3i th\u00edch cho c\u00e2u n\u00e0y.',
    grammarNote: 'B\u1ea5m \u201cGi\u1ea3i th\u00edch\u201d l\u1ea1i \u0111\u1ec3 th\u1eed t\u1ea1o l\u1ea1i n\u1ed9i dung.',
    learningTip: undefined,
    vocabulary: [],
  };
}

async function readCachedSentenceStudy(
  input: SentenceStudyInput
): Promise<SmartSentenceStudyExplanation | null> {
  try {
    const raw = await AsyncStorage.getItem(sentenceStudyCacheKey(input));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SmartSentenceStudyExplanation;
    if (parsed.source && parsed.translation && parsed.summary && parsed.grammarNote) {
      return parsed;
    }
  } catch {
    // Cache failures should never block study mode.
  }
  return null;
}

async function writeCachedSentenceStudy(
  input: SentenceStudyInput,
  result: SmartSentenceStudyExplanation
): Promise<void> {
  try {
    await AsyncStorage.setItem(sentenceStudyCacheKey(input), JSON.stringify(result));
  } catch {
    // Best-effort cache.
  }
}

async function readCachedWordExplanation(
  input: ExplainSelectionInput
): Promise<SmartWordExplanation | null> {
  try {
    const raw = await AsyncStorage.getItem(wordCacheKey(input));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SmartWordExplanation;
    if (parsed.surface && parsed.meaning && parsed.sentenceTranslation) {
      return parsed;
    }
  } catch {
    // Cache failures should never block lookup.
  }
  return null;
}

async function writeCachedWordExplanation(
  input: ExplainSelectionInput,
  result: SmartWordExplanation
): Promise<void> {
  try {
    await AsyncStorage.setItem(wordCacheKey(input), JSON.stringify(result));
  } catch {
    // Best-effort cache.
  }
}

export function splitJapaneseSentences(text: string): string[] {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const pieces = normalized.match(/[^\n\u3002\uff01\uff1f!?]+[\u3002\uff01\uff1f!?]?|\n+/g) ?? [normalized];
  return pieces.map((piece) => piece.trim()).filter(Boolean);
}

export function getSentenceAtOffset(text: string, offset: number): string {
  const boundedOffset = Math.max(0, Math.min(offset, Math.max(0, text.length - 1)));
  const marks = ['\u3002', '\uff01', '\uff1f', '!', '?', '\n'];
  const left = Math.max(...marks.map((mark) => text.lastIndexOf(mark, boundedOffset - 1)));
  const candidates = marks
    .map((mark) => text.indexOf(mark, boundedOffset))
    .filter((index) => index >= 0);
  const right = candidates.length > 0 ? Math.min(...candidates) + 1 : text.length;

  return text.slice(left + 1, right).trim() || text.trim();
}

export function getArticleExcerpt(text: string, offset: number, radius = 260): string {
  const start = Math.max(0, offset - radius);
  const end = Math.min(text.length, offset + radius);
  return text.slice(start, end).trim();
}

export async function translateSentencesSmart(text: string): Promise<SmartSentenceTranslation[]> {
  const sentences = splitJapaneseSentences(text).slice(0, 80);
  if (sentences.length === 0) return [];

  const raw = await callClaude(
    'You translate Japanese news text for Vietnamese learners. Return valid JSON only. Start with [ and end with ]. Do not include prose, markdown, code fences, comments, or explanations. Output an array with objects: {"source": original Japanese sentence, "translation": natural Vietnamese translation}. Keep names, dates, and numbers accurate.',
    { sentences },
    4096
  );
  const parsed = extractJson(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('Claude JSON was not an array.');
  }

  return parsed
    .map((item, index) => {
      const record = item as Record<string, unknown>;
      return {
        source: coerceString(record.source) || sentences[index] || '',
        translation: coerceString(record.translation),
      };
    })
    .filter((item) => item.source && item.translation);
}

export async function explainJapaneseSelection(
  input: ExplainSelectionInput
): Promise<SmartWordExplanation> {
  const compactInput = normalizeExplainInput(input);
  const cached = await readCachedWordExplanation(compactInput);
  if (cached) return cached;

  const raw = await callClaude(
    'You explain Japanese words for Vietnamese learners using the sentence context. Return valid JSON only. Start with { and end with }. Do not include prose, markdown, code fences, comments, or explanations. Output one object: {"surface": selected word, "reading": kana reading if known, "meaning": Vietnamese meaning in this sentence, "sentenceTranslation": Vietnamese translation of the whole sentence, "note": short grammar/usage note if useful}. If the selected text is punctuation or not meaningful, explain that briefly in Vietnamese.',
    compactInput,
    800
  );
  let result: SmartWordExplanation | null = null;
  try {
    result = coerceWordExplanation(extractJson(raw), compactInput);
  } catch {
    result = null;
  }
  result ??= fallbackWordExplanation(raw, compactInput);

  await writeCachedWordExplanation(compactInput, result);
  return result;
}

export async function explainJapaneseSentenceForStudy(
  input: SentenceStudyInput
): Promise<SmartSentenceStudyExplanation> {
  const compactInput = normalizeSentenceStudyInput(input);
  const cached = await readCachedSentenceStudy(compactInput);
  if (cached) return cached;

  const raw = await callClaude(
    'You are a Japanese teacher for Vietnamese learners. Return valid JSON only. Start with { and end with }. Do not include prose, markdown, code fences, comments, or explanations. Output one object with keys: {"source": original Japanese sentence, "translation": Vietnamese translation, "summary": short Vietnamese meaning in context, "grammarNote": short explanation of the grammar or structure, "learningTip": optional study tip in Vietnamese, "vocabulary": array of up to 5 objects with keys {"surface": word or phrase, "reading": kana reading if helpful, "meaning": Vietnamese meaning}}. Keep the answer concise, practical, and educational.',
    compactInput,
    2000
  );

  let result: SmartSentenceStudyExplanation | null = null;
  try {
    result = coerceSentenceStudyExplanation(extractJson(raw), compactInput);
  } catch {
    result = null;
  }
  result ??= fallbackSentenceStudyExplanation(raw, compactInput);

  await writeCachedSentenceStudy(compactInput, result);
  return result;
}
