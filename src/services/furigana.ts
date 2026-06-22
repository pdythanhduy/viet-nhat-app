// Furigana service — adds hiragana readings to Japanese text so the owner
// can read newspapers more easily. Powers the experimental Furigana reader
// (gated by the `furiganaReader` feature flag + reachable from the Lab).
//
// Engine: Yahoo! Japan ルビ振り (Furigana) API V2. It segments mixed
// kanji/kana text into words and returns the reading per word, which lets
// us render proper ruby (hiragana above the kanji) instead of flattening
// everything to hiragana.
//
//   POST https://jlp.yahooapis.jp/jsonrpc
//   Header  User-Agent: Yahoo AppID: <client id>
//   Body    JSON-RPC { method: jlp.furiganaservice.furigana, params:{ q, grade } }
//
// The Yahoo Client ID (アプリケーションID) is read from
// EXPO_PUBLIC_YAHOO_APPID. Register one at https://developer.yahoo.co.jp/.

const ENDPOINT = 'https://jlp.yahooapis.jp/jsonrpc';
// Yahoo caps the whole request at 4KB. Because we serialize non-ASCII as
// \uXXXX, chunk by serialized request bytes rather than source characters.
const MAX_REQUEST_BYTES = 3800;
const REQUEST_TIMEOUT_MS = 8000;

export interface FuriganaToken {
  surface: string;
  // Hiragana reading to show above `surface`, or null when none is needed
  // (kana, punctuation, digits — anything whose reading equals its surface).
  reading: string | null;
}

export function getYahooAppId(): string | undefined {
  return process.env.EXPO_PUBLIC_YAHOO_APPID;
}

export function isFuriganaConfigured(): boolean {
  return Boolean(getYahooAppId());
}

interface YahooWord {
  surface: string;
  furigana?: string;
  roman?: string;
  subword?: YahooWord[];
}

function expandYahooWord(word: YahooWord): FuriganaToken[] {
  if (word.subword && word.subword.length > 0) {
    return word.subword.flatMap((child) => expandYahooWord(child));
  }

  return [
    {
      surface: word.surface,
      reading: needsReading(word.surface, word.furigana),
    },
  ];
}

// Serialize to JSON with every non-ASCII char escaped as \uXXXX, so the
// request body is pure ASCII. React Native on iOS mis-encodes a raw UTF-8
// JSON body here (Yahoo then reads `q` as empty → -32602 "Invalid params");
// an all-ASCII body sidesteps that — the bytes are unambiguous on every
// platform, and Yahoo decodes the \uXXXX escapes back to the original text.
function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : '\\u' + code.toString(16).padStart(4, '0');
  }
  return out;
}

function buildRequestBody(q: string): string {
  return toAsciiJson({
    id: '1',
    jsonrpc: '2.0',
    method: 'jlp.furiganaservice.furigana',
    // grade:1 = assume only grade-1 kanji are known -> add furigana to
    // essentially every kanji, which is what a learner reading news wants.
    params: { q, grade: 1 },
  });
}

function fitsRequestLimit(q: string): boolean {
  // buildRequestBody returns ASCII only, so JS string length equals byte length.
  return buildRequestBody(q).length <= MAX_REQUEST_BYTES;
}

function needsReading(surface: string, furigana?: string): string | null {
  if (!furigana) return null;
  // No ruby when the reading is identical to the surface (pure-kana words,
  // punctuation, spaces, ASCII).
  if (furigana === surface) return null;
  return furigana;
}

function normalizeForYahoo(text: string): string {
  const normalized = typeof text.normalize === 'function' ? text.normalize('NFKC') : text;
  let cleaned = normalized
    .replace(/[\u200b-\u200d\ufeff]/g, '')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/[\u2018\u2019\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201f]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\ufffd/g, '')
    .replace(/\r\n?/g, '\n');

  let out = '';
  for (const char of cleaned) {
    const code = char.codePointAt(0) ?? 0;
    const keep =
      char === '\n' ||
      char === '\t' ||
      (code >= 0x20 && code <= 0x7e) ||
      (code >= 0x3000 && code <= 0x303f) ||
      (code >= 0x3040 && code <= 0x30ff) ||
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0xff66 && code <= 0xff9f);

    out += keep ? char : ' ';
  }

  return out.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function hasJapaneseText(text: string): boolean {
  return /[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/.test(text);
}

function splitIntoChunks(text: string): string[] {
  const chunks: string[] = [];
  let current = '';
  // Split on line breaks first so we never cut a word mid-reading.
  for (const line of text.split(/(\n)/)) {
    if (!line) continue;
    const next = current + line;
    if (current && !fitsRequestLimit(next)) {
      chunks.push(current);
      current = '';
    }
    // A single line longer than the limit: hard-slice it by code point.
    if (!fitsRequestLimit(line)) {
      let oversizedChunk = '';
      for (const char of line) {
        const oversizedNext = oversizedChunk + char;
        if (oversizedChunk && !fitsRequestLimit(oversizedNext)) {
          chunks.push(oversizedChunk);
          oversizedChunk = char;
        } else {
          oversizedChunk = oversizedNext;
        }
      }
      current = oversizedChunk;
    } else {
      current += line;
    }
  }
  if (current) chunks.push(current);
  // Drop blank-only chunks; Yahoo rejects effectively empty `q` values.
  return chunks.filter((c) => c.trim().length > 0);
}

async function fetchChunk(q: string, appId: string): Promise<FuriganaToken[]> {
  // Yahoo rejects an empty `q` with JSON-RPC -32602 "Invalid params" — never
  // send one (e.g. a blank line that survived chunking).
  if (!q) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    // Auth via the `appid` query param rather than the `User-Agent: Yahoo
    // AppID: …` header — React Native overrides/strips User-Agent, which made
    // the header method unreliable on device. Query-param auth works with any
    // User-Agent.
    const body = buildRequestBody(q);
    const res = await fetch(`${ENDPOINT}?appid=${encodeURIComponent(appId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      signal: controller.signal,
    });

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '');
      console.warn(`[furigana] HTTP ${res.status}: ${bodyText.slice(0, 200)}`);
      throw new Error(`Yahoo API trả lỗi HTTP ${res.status}`);
    }
    const json = (await res.json()) as {
      result?: { word?: YahooWord[] };
      error?: { message?: string };
    };
    if (json.error) {
      console.warn(`[furigana] JSON-RPC error: ${JSON.stringify(json.error)}`);
      throw new Error(json.error.message || 'Yahoo API báo lỗi.');
    }
    const words = json.result?.word ?? [];
    return words.flatMap((w) => expandYahooWord(w));
  } finally {
    clearTimeout(timer);
  }
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Config / auth failures won't fix themselves on retry — surface them.
function isFatal(message: string): boolean {
  return (
    message === 'not-configured' ||
    /\b(401|403)\b/.test(message) ||
    /Forbidden|Authentication/i.test(message)
  );
}

// One chunk, with retries. Yahoo intermittently returns "Invalid params"
// (-32602) for a perfectly valid chunk — a transient/rate hiccup, not a real
// content problem — so a long article (many chunks) almost always hit it on
// at least one chunk before. Retry a couple times with backoff.
async function fetchChunkResilient(q: string, appId: string): Promise<FuriganaToken[]> {
  let lastErr: Error | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await fetchChunk(q, appId);
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      if (isFatal(lastErr.message)) throw lastErr;
      await delay(300 * (attempt + 1));
    }
  }
  throw lastErr ?? new Error('Yahoo API lỗi.');
}

/**
 * Convert Japanese text into furigana tokens. Throws only on configuration /
 * auth failures. Transient per-chunk failures degrade gracefully: the failed
 * fragment is shown as plain text (no furigana) so a long article never fails
 * wholesale just because one chunk hiccuped.
 */
export async function fetchFurigana(text: string): Promise<FuriganaToken[]> {
  const appId = getYahooAppId();
  if (!appId) {
    throw new Error('not-configured');
  }
  const trimmed = text.trim();
  if (!trimmed) return [];

  const normalized = normalizeForYahoo(trimmed);
  if (!normalized) return [{ surface: trimmed, reading: null }];

  const chunks = splitIntoChunks(normalized);
  const out: FuriganaToken[] = [];
  let succeeded = 0;
  let lastErr: Error | null = null;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (!hasJapaneseText(chunk)) {
      out.push({ surface: chunk, reading: null });
      continue;
    }
    try {
      out.push(...(await fetchChunkResilient(chunk, appId)));
      succeeded++;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.warn(`[furigana] chunk ${i} failed (len=${chunk.length}): ${err.message}`);
      if (isFatal(err.message)) throw err; // auth/config — no point continuing
      lastErr = err;
      // Keep the text readable: render this fragment without furigana.
      out.push({ surface: chunk, reading: null });
    }
    if (i < chunks.length - 1) await delay(80); // gentle pacing between chunks
  }

  // Every chunk failed (and none were fatal) — surface the error.
  if (succeeded === 0 && lastErr) throw lastErr;
  return out;
}
