// Translation service — Japanese → Vietnamese via the Claude API.
//
// Model: claude-haiku-4-5 (cheapest capable tier; ~2-3 JPY per article).
// Called over raw HTTP against the Messages API, matching how the rest of
// this app talks to its backends (services/contentLoader/remote.ts,
// services/furigana.ts) rather than pulling in the Node-oriented SDK.
//
// The API key is read from EXPO_PUBLIC_ANTHROPIC_API_KEY. Create + fund a key
// at https://console.anthropic.com. As with the Yahoo key, this ships in the
// bundle — acceptable for the experimental, flag-gated owner tool; move to a
// Supabase Edge Function proxy before any public release.

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5';
const ANTHROPIC_VERSION = '2023-06-01';
const REQUEST_TIMEOUT_MS = 30000;

const SYSTEM_PROMPT =
  'Bạn là trợ lý dịch báo và văn bản tiếng Nhật sang tiếng Việt cho người Việt sống ở Nhật. ' +
  'Dịch tự nhiên, dễ hiểu, giữ đúng nghĩa và sắc thái. Giữ nguyên số liệu, tên riêng, ngày tháng. ' +
  'Chỉ trả về bản dịch tiếng Việt, không thêm lời dẫn hay giải thích.';

// Serialize to JSON with all non-ASCII escaped as \uXXXX — see furigana.ts:
// React Native on iOS mis-encodes a raw UTF-8 request body, so we send pure
// ASCII (valid JSON; the server decodes the escapes back).
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

interface ClaudeResponse {
  content?: Array<{ type: string; text?: string }>;
  stop_reason?: string;
  error?: { message?: string };
}

/**
 * Translate Japanese text to Vietnamese. Throws on configuration or
 * network/API errors so the screen can show a clear message.
 */
export async function translateToVietnamese(text: string): Promise<string> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error('not-configured');
  }
  const trimmed = text.trim();
  if (!trimmed) return '';

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
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: trimmed }],
      }),
      signal: controller.signal,
    });

    const json = (await res.json()) as ClaudeResponse;
    if (!res.ok) {
      throw new Error(json.error?.message || `Claude API trả lỗi HTTP ${res.status}`);
    }
    if (json.stop_reason === 'refusal') {
      throw new Error('Yêu cầu bị từ chối vì lý do an toàn.');
    }
    const out = (json.content ?? [])
      .filter((b) => b.type === 'text' && b.text)
      .map((b) => b.text)
      .join('')
      .trim();
    if (!out) {
      throw new Error('Không nhận được bản dịch.');
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
}
