// Article reader — fetch the main text of a news URL so the Furigana tool
// can paste a link instead of raw text.
//
// Engine: Jina Reader (https://r.jina.ai/<url>) — a free hosted service that
// fetches a page (JS-rendered included) and returns clean article text, no
// API key required. Tradeoff: the URL is sent to a third party (r.jina.ai).
//
// We strip the lightweight markdown Jina returns down to plain text so the
// downstream furigana / translation steps get clean Japanese.

const READER_BASE = 'https://r.jina.ai/';
const REQUEST_TIMEOUT_MS = 15000;

function looksLikeUrl(s: string): boolean {
  return /^https?:\/\/\S+$/i.test(s.trim());
}

export { looksLikeUrl };

// Trim the markdown Jina emits (headings, links, images, emphasis) to plain
// text. Conservative — only removes obvious syntax, keeps Japanese intact.
function stripMarkdown(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → keep label
    .replace(/^#{1,6}\s+/gm, '') // headings
    .replace(/^\s{0,3}[-*+]\s+/gm, '') // bullet markers
    .replace(/[*_`>]/g, '') // emphasis / code / quote marks
    .replace(/\n{3,}/g, '\n\n') // collapse blank runs
    .trim();
}

export async function fetchArticleText(url: string): Promise<string> {
  if (!looksLikeUrl(url)) {
    throw new Error('Link không hợp lệ (phải bắt đầu bằng http:// hoặc https://).');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${READER_BASE}${url.trim()}`, {
      method: 'GET',
      headers: {
        // Ask Jina for plain text rather than full markdown when possible.
        'X-Return-Format': 'text',
        Accept: 'text/plain',
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Không lấy được nội dung (HTTP ${res.status}).`);
    }
    const body = await res.text();
    const text = stripMarkdown(body);
    if (!text) {
      throw new Error('Trang không có nội dung đọc được.');
    }
    return text;
  } finally {
    clearTimeout(timer);
  }
}
