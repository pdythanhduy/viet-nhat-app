// News feeds — reads public RSS from Vietnamese and Japanese news sites.
// We only keep title / thumbnail / short summary / link; the full article
// always opens on the publisher's site (Vietnamese) or in the Furigana reader
// (Japanese, which fetches the text on demand).
//
// No API key or backend: the phone fetches the RSS directly.

export type NewsLang = 'vi' | 'ja';

export interface NewsFeed {
  id: string;
  lang: NewsLang;
  source: string;
  label: string;
  url: string;
}

export interface NewsItem {
  id: string;
  title: string;
  // Where to send the reader: the publisher's page (vi) or the article page
  // the Furigana reader should fetch (ja).
  link: string;
  source: string;
  publishedAt: number | null;
  summary: string | null;
  imageUrl: string | null;
}

export const NEWS_FEEDS: readonly NewsFeed[] = [
  { id: 'dantri', lang: 'vi', source: 'Dân trí', label: 'Dân trí', url: 'https://dantri.com.vn/rss/home.rss' },
  { id: '24h', lang: 'vi', source: '24h', label: '24h', url: 'https://cdn.24h.com.vn/upload/rss/tintuctrongngay.rss' },
  { id: 'vnexpress', lang: 'vi', source: 'VnExpress', label: 'VnExpress', url: 'https://vnexpress.net/rss/tin-moi-nhat.rss' },
  { id: 'yahoo-top', lang: 'ja', source: 'Yahoo!ニュース', label: '主要', url: 'https://news.yahoo.co.jp/rss/topics/top-picks.xml' },
  { id: 'yahoo-domestic', lang: 'ja', source: 'Yahoo!ニュース', label: '国内', url: 'https://news.yahoo.co.jp/rss/topics/domestic.xml' },
  { id: 'yahoo-world', lang: 'ja', source: 'Yahoo!ニュース', label: '国際', url: 'https://news.yahoo.co.jp/rss/topics/world.xml' },
  { id: 'yahoo-business', lang: 'ja', source: 'Yahoo!ニュース', label: '経済', url: 'https://news.yahoo.co.jp/rss/topics/business.xml' },
  { id: 'yahoo-it', lang: 'ja', source: 'Yahoo!ニュース', label: 'IT', url: 'https://news.yahoo.co.jp/rss/topics/it.xml' },
];

const REQUEST_TIMEOUT_MS = 12000;
const MAX_ITEMS = 40;

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_m, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d: string) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function unwrapCdata(s: string): string {
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return m ? m[1] : s;
}

function getTag(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i');
  const m = block.match(re);
  if (!m) return null;
  const raw = m[1].trim();
  if (!raw) return null;
  // CDATA content is already literal; plain text still has XML entities.
  return /^<!\[CDATA\[/.test(raw) ? unwrapCdata(raw).trim() : decodeEntities(raw);
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function firstImage(block: string, description: string | null): string | null {
  const enclosure = block.match(/<enclosure[^>]*\surl=["']([^"']+)["'][^>]*>/i);
  if (enclosure && /image|\.(jpe?g|png|webp)/i.test(enclosure[0])) return decodeEntities(enclosure[1]);
  const media = block.match(/<media:(?:content|thumbnail)[^>]*\surl=["']([^"']+)["']/i);
  if (media) return decodeEntities(media[1]);
  if (description) {
    const img = description.match(/<img[^>]*\ssrc=["']([^"']+)["']/i);
    if (img) return decodeEntities(img[1]);
  }
  return null;
}

// Yahoo!ニュース topic feeds link to a short "pickup" page. The <comments>
// URL is /articles/<id>/comments, and dropping "/comments" gives the actual
// article page with the full text — much better to read with furigana.
function resolveLink(feed: NewsFeed, link: string, block: string): string {
  if (feed.lang !== 'ja') return link;
  const comments = getTag(block, 'comments');
  const m = comments?.match(/^(https:\/\/news\.yahoo\.co\.jp\/articles\/[0-9a-f]+)\/comments/i);
  return m ? m[1] : link.replace(/\?source=rss$/, '');
}

export function parseRss(xml: string, feed: NewsFeed): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const items: NewsItem[] = [];
  for (const block of blocks) {
    const title = getTag(block, 'title');
    const rawLink = getTag(block, 'link');
    if (!title || !rawLink) continue;

    const rawDesc = getTag(block, 'description');
    const summaryText = rawDesc ? stripHtml(rawDesc) : '';
    const pub = getTag(block, 'pubDate');
    const ts = pub ? Date.parse(pub) : NaN;
    const link = resolveLink(feed, rawLink, block);

    items.push({
      id: `${feed.id}:${link}`,
      title: stripHtml(title),
      link,
      source: feed.source,
      publishedAt: Number.isNaN(ts) ? null : ts,
      summary: summaryText || null,
      imageUrl: firstImage(block, rawDesc),
    });
    if (items.length >= MAX_ITEMS) break;
  }
  return items;
}

export async function fetchFeed(feed: NewsFeed): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(feed.url, {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseRss(await res.text(), feed);
    if (items.length === 0) throw new Error('empty');
    return items;
  } finally {
    clearTimeout(timer);
  }
}

export function formatTimeAgo(ts: number | null, now: number = Date.now()): string {
  if (ts === null) return '';
  const min = Math.max(0, Math.round((now - ts) / 60000));
  if (min < 1) return 'Vừa xong';
  if (min < 60) return `${min} phút trước`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} giờ trước`;
  return `${Math.round(hr / 24)} ngày trước`;
}
