import { splitJapaneseSentences } from '../utils/translationSentences';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 30000;

const SINGLE_TEXT_SYSTEM_PROMPT =
  'Translate Japanese text into natural Vietnamese for Vietnamese learners living in Japan. ' +
  'Keep names, dates, and numbers accurate. Return only the translated text, with no markdown or explanation.';

const SENTENCE_JSON_SYSTEM_PROMPT =
  'Translate Japanese sentences into natural Vietnamese for Vietnamese learners living in Japan. ' +
  'Return valid JSON only, with no markdown or explanation. Output an array of objects with keys ' +
  '{"source": original Japanese sentence, "translation": Vietnamese translation}. ' +
  'Keep the order of the input sentences. Preserve names, dates, and numbers accurately.';

function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : '\\u' + code.toString(16).padStart(4, '0');
  }
  return out;
}

export function getAnthropicApiKey(): string | undefined {
  return process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
}

export function isTranslateConfigured(): boolean {
  return Boolean(getAnthropicApiKey());
}

type ClaudeResponse = {
  content?: Array<{ type: string; text?: string }>;
  stop_reason?: string;
  error?: { message?: string };
};

export type VietnameseSentenceTranslation = {
  source: string;
  translation: string;
};

function extractClaudeText(json: ClaudeResponse): string {
  if (json.stop_reason === 'refusal') {
    throw new Error('Translation request was refused.');
  }

  const out = (json.content ?? [])
    .filter((block) => block.type === 'text' && block.text)
    .map((block) => block.text)
    .join('')
    .trim();

  if (!out) {
    throw new Error('No translation returned.');
  }
  return out;
}

async function callClaude(
  system: string,
  userContent: unknown,
  maxTokens: number
): Promise<string> {
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
        messages: [{ role: 'user', content: JSON.stringify(userContent) }],
      }),
      signal: controller.signal,
    });

    const json = (await res.json()) as ClaudeResponse;
    if (!res.ok) {
      throw new Error(json.error?.message || `Claude API returned HTTP ${res.status}`);
    }
    return extractClaudeText(json);
  } finally {
    clearTimeout(timer);
  }
}

function parseSentenceArray(raw: string, fallbackSources: string[]): VietnameseSentenceTranslation[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error('Claude JSON was not an array.');
  }

  return parsed
    .map((item, index): VietnameseSentenceTranslation => {
      const record = item as Record<string, unknown>;
      const source =
        typeof record.source === 'string' && record.source.trim()
          ? record.source.trim()
          : fallbackSources[index] ?? '';
      const translation =
        typeof record.translation === 'string' && record.translation.trim()
          ? record.translation.trim()
          : '';
      return { source, translation };
    })
    .filter((item) => item.source && item.translation);
}

async function translateSentencesIndividually(
  sentences: string[]
): Promise<VietnameseSentenceTranslation[]> {
  const results = await Promise.all(
    sentences.map(async (source) => ({
      source,
      translation: (await translateToVietnamese(source)).trim(),
    }))
  );

  return results.filter((item) => item.source && item.translation);
}

export async function translateToVietnamese(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return callClaude(SINGLE_TEXT_SYSTEM_PROMPT, trimmed, 4096);
}

export async function translateJapaneseSentencesToVietnamese(
  text: string
): Promise<VietnameseSentenceTranslation[]> {
  const sentences = splitJapaneseSentences(text).slice(0, 80);
  if (sentences.length === 0) return [];

  try {
    const raw = await callClaude(SENTENCE_JSON_SYSTEM_PROMPT, { sentences }, 4096);
    const parsed = parseSentenceArray(raw, sentences);
    if (parsed.length === sentences.length) {
      return parsed;
    }

    const translatedBySource = new Map(parsed.map((item) => [item.source, item.translation]));
    const missing = sentences.filter((sentence) => !translatedBySource.has(sentence));
    if (missing.length === 0) {
      return sentences
        .map((source) => ({ source, translation: translatedBySource.get(source) ?? '' }))
        .filter((item) => item.translation);
    }

    const fallbackTranslated = await translateSentencesIndividually(missing);
    for (const item of fallbackTranslated) {
      translatedBySource.set(item.source, item.translation);
    }

    return sentences
      .map((source) => ({ source, translation: translatedBySource.get(source) ?? '' }))
      .filter((item) => item.translation);
  } catch {
    return translateSentencesIndividually(sentences);
  }
}
