import { splitJapaneseSentences } from '../utils/translationSentences';
import { callAnthropicProxy, isAnthropicProxyConfigured } from './anthropicProxy';

const MODEL = 'claude-haiku-4-5';

const SINGLE_TEXT_SYSTEM_PROMPT =
  'Translate Japanese text into natural Vietnamese for Vietnamese learners living in Japan. ' +
  'Keep names, dates, and numbers accurate. Return only the translated text, with no markdown or explanation.';

const SENTENCE_JSON_SYSTEM_PROMPT =
  'Translate Japanese sentences into natural Vietnamese for Vietnamese learners living in Japan. ' +
  'Return valid JSON only, with no markdown or explanation. Output an array of objects with keys ' +
  '{"source": original Japanese sentence, "translation": Vietnamese translation}. ' +
  'Keep the order of the input sentences. Preserve names, dates, and numbers accurately.';

export function isTranslateConfigured(): boolean {
  return isAnthropicProxyConfigured();
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
  const json = await callAnthropicProxy({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: JSON.stringify(userContent) }],
  });
  return extractClaudeText(json);
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
