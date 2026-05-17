// Hỏi Cẩm Nang — Phase 1 retrieval helper.
//
// Pure retrieval over the existing searchIndex. No LLM, no network call.
// Given a free-text Vietnamese question, returns:
//   - a short synthesized answer drawn from cited guides' doNow / deadline / faq
//   - up to 3 source cards (existing SearchResultItem shape)
//   - relevant keyTerms (glossary) and counterPhrases when the cited guides have them
//   - a confidence flag so the screen can swap to "not sure" framing when retrieval is weak.
//
// Safety: every synthesized line is verbatim from app content. If retrieval
// is empty / low-confidence, the caller renders a "không chắc, đây là bài
// liên quan" fallback instead of inventing an answer.

import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { searchAppContent, SearchResultItem } from './searchIndex';
import type {
  AdminGuide,
  AdminGuideKeyTerm,
  CounterPhrase,
} from '../types/content';

export type ChatConfidence = 'high' | 'medium' | 'low';

export interface ChatRetrievalResult {
  /** One-line opener + 1–3 short bullets, all pulled verbatim from cited guides. */
  answer: string;
  /** Per-bullet provenance so the UI can attach a "Xem bài gốc" link. */
  bullets: ChatAnswerBullet[];
  /** Top 1–3 source guides for the source-card row. */
  sources: SearchResultItem[];
  /** Glossary terms from any cited guide whose Japanese / reading / VN gloss matches the query. */
  glossary: GlossaryHit[];
  /** Counter phrases from cited guides that the user can copy at a counter. */
  counterPhrases: CounterPhraseHit[];
  confidence: ChatConfidence;
}

export interface ChatAnswerBullet {
  text: string;
  guideId: string;
  guideTitle: string;
}

export interface GlossaryHit extends AdminGuideKeyTerm {
  guideId: string;
  guideTitle: string;
}

export interface CounterPhraseHit extends CounterPhrase {
  guideId: string;
  guideTitle: string;
}

// Same NFD + đ→d + lowercase as searchIndex.normalizeText — duplicated here
// so this helper doesn't reach into searchIndex's private functions.
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

// Strip **bold** markers so the synthesized answer reads cleanly as plain
// text in a chat bubble. RichText still parses bold when the user opens
// the cited guide.
function stripBold(value: string): string {
  return value.replace(/\*\*([^*]+)\*\*/g, '$1');
}

// Short bullet ≤ ~140 chars so the chat answer stays glance-able. We try to
// cut at the first sentence boundary, then fall back to a hard truncate.
function trimToBullet(raw: string, maxLen = 140): string {
  const cleaned = stripBold(raw).replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  const stop = cleaned.slice(0, maxLen).lastIndexOf('. ');
  if (stop > 40) return cleaned.slice(0, stop + 1);
  return cleaned.slice(0, maxLen - 1).trimEnd() + '…';
}

// Token-level retrieval score on top of searchAppContent. Title-only matches
// are the strongest "this question is about X" signal we have.
function retrievalConfidence(
  query: string,
  topResults: SearchResultItem[],
): ChatConfidence {
  if (topResults.length === 0) return 'low';
  const nQuery = normalize(query);
  if (!nQuery) return 'low';

  const topTitle = normalize(topResults[0].title);
  const titleHit =
    topTitle === nQuery ||
    topTitle.startsWith(nQuery) ||
    topTitle.includes(nQuery);

  if (titleHit) return 'high';
  if (topResults.length >= 2) return 'medium';
  return 'low';
}

// Find glossary terms inside cited guides that the user's query references —
// either by the kanji/kana term itself or by the Vietnamese gloss / hiragana
// reading. Matched terms surface as a "Từ cần biết" panel.
function findGlossaryHits(
  cited: AdminGuide[],
  nQuery: string,
): GlossaryHit[] {
  if (!nQuery) return [];
  const hits: GlossaryHit[] = [];
  const seen = new Set<string>();

  for (const guide of cited) {
    if (!guide.keyTerms) continue;
    for (const kt of guide.keyTerms) {
      const haystacks = [
        kt.term,
        kt.reading ?? '',
        kt.meaningVi,
      ].map((s) => normalize(s));
      const hit = haystacks.some((h) => h && (nQuery.includes(h) || h.includes(nQuery)));
      if (!hit) continue;
      const key = `${guide.id}:${kt.term}`;
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push({ ...kt, guideId: guide.id, guideTitle: guide.title });
      if (hits.length >= 4) return hits;
    }
  }
  return hits;
}

// Take at most 2 counter phrases from the highest-confidence cited guide(s).
// We don't try to "intent match" the phrase — just expose what the user
// would say at the relevant counter so they don't miss it.
function pickCounterPhrases(cited: AdminGuide[]): CounterPhraseHit[] {
  const picked: CounterPhraseHit[] = [];
  for (const guide of cited) {
    if (!guide.counterPhrases || guide.counterPhrases.length === 0) continue;
    picked.push({
      ...guide.counterPhrases[0],
      guideId: guide.id,
      guideTitle: guide.title,
    });
    if (picked.length >= 2) break;
  }
  return picked;
}

// Pull 1–3 actionable bullets from the cited guides. Preference order per
// guide: first quickAction.doNow item, then quickAction.deadline, then the
// first faq.answer. We pick at most one bullet per guide so the answer
// reads as "according to guide A and guide B…" rather than dumping one
// guide's whole checklist.
function buildAnswerBullets(cited: AdminGuide[]): ChatAnswerBullet[] {
  const bullets: ChatAnswerBullet[] = [];
  for (const guide of cited) {
    const candidate =
      guide.quickAction?.doNow?.[0] ??
      guide.quickAction?.deadline ??
      guide.faq?.[0]?.answer ??
      guide.description;
    if (!candidate) continue;
    bullets.push({
      text: trimToBullet(candidate),
      guideId: guide.id,
      guideTitle: guide.title,
    });
    if (bullets.length >= 3) break;
  }
  return bullets;
}

function lookupGuide(id: string): AdminGuide | undefined {
  return ADMIN_GUIDES.find((g) => g.id === id);
}

// Vietnamese function/filler words that should not drive retrieval (they
// match almost every guide and dilute the ranking). The list is short
// because being too aggressive risks dropping a meaningful keyword.
// Single-character entries and entries with punctuation are excluded —
// the tokenizer below strips punctuation and discards tokens shorter
// than 2 characters before consulting this set.
const STOP_WORDS = new Set([
  'la', 'gi', 'co', 'khong', 'phai', 'lam', 'cua', 'cho', 'voi', 've',
  'sao', 'nao', 'de', 'tu', 'thi', 'rat', 'mot', 'hai', 'ba', 'va', 'hay',
  'duoc', 'roi', 'tai', 'nhe', 'nhu', 'the', 'ay', 'do', 'day', 'kia',
  'da', 'se',
]);

// Free-text queries from the chat screen are usually full sentences like
// "Mất thẻ cư trú phải làm gì?" — far too long for searchAppContent's
// substring match. Tokenize, drop stopwords + short tokens, and run a
// separate retrieval pass per remaining token. Then aggregate scores so
// guides matching multiple tokens rank highest.
function aggregateHits(query: string, limit: number): SearchResultItem[] {
  const tokens = normalize(query)
    .split(/[^\p{L}\p{N}#]+/u)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  if (tokens.length === 0) {
    return searchAppContent(query, limit);
  }

  const scored = new Map<string, { item: SearchResultItem; score: number }>();
  // Try the full query first so a verbatim title match still ranks highest.
  for (const item of searchAppContent(query, limit)) {
    scored.set(`${item.type}:${item.id}`, { item, score: 1000 });
  }
  // Then per-token. Each per-token hit adds a smaller score; guides that
  // match multiple tokens accumulate higher totals.
  for (const token of tokens) {
    const tokenHits = searchAppContent(token, limit);
    tokenHits.forEach((item, idx) => {
      const key = `${item.type}:${item.id}`;
      const inc = Math.max(10, 50 - idx * 5);
      const prev = scored.get(key);
      if (prev) {
        scored.set(key, { item: prev.item, score: prev.score + inc });
      } else {
        scored.set(key, { item, score: inc });
      }
    });
  }

  return Array.from(scored.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

/**
 * Run a retrieval pass over the existing search index for a free-text
 * Vietnamese question. Returns a fully-shaped chat answer the
 * HoiCamNangScreen can render directly. No AI call, no network.
 */
export function retrieveChatAnswer(query: string): ChatRetrievalResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      answer: '',
      bullets: [],
      sources: [],
      glossary: [],
      counterPhrases: [],
      confidence: 'low',
    };
  }

  const hits = aggregateHits(trimmed, 6);
  const guideHits = hits.filter((h) => h.type === 'guide');
  const top = guideHits.slice(0, 3);

  const citedGuides = top
    .map((h) => lookupGuide(h.id))
    .filter((g): g is AdminGuide => Boolean(g));

  const bullets = buildAnswerBullets(citedGuides);
  const glossary = findGlossaryHits(citedGuides, normalize(trimmed));
  const counterPhrases = pickCounterPhrases(citedGuides);
  const confidence = retrievalConfidence(trimmed, hits);

  const lead =
    confidence === 'low'
      ? 'Mình chưa chắc lắm. Đây là các bài có vẻ liên quan — bạn xem qua xem có giúp được không nhé.'
      : `Theo các bài trong app, đây là việc bạn nên làm:`;

  return {
    answer: bullets.length > 0 ? lead : 'Mình chưa tìm thấy bài nào khớp. Hãy thử gõ ngắn hơn hoặc chọn câu hỏi gợi ý bên dưới.',
    bullets,
    sources: hits.slice(0, 3),
    glossary,
    counterPhrases,
    confidence: bullets.length === 0 ? 'low' : confidence,
  };
}

// Static list of suggested questions the user can tap when they're not sure
// what to type. Kept short — 5 items fit on one row of chips on small phones.
// Each question is chosen so the searchIndex returns a high-confidence top
// result, guaranteeing the demo path always works.
export const SUGGESTED_QUESTIONS: string[] = [
  'Mất thẻ cư trú phải làm gì?',
  'Mới chuyển nhà cần làm những gì?',
  '住民税 là gì?',
  'Mở tài khoản ngân hàng cần gì?',
  'Khám bệnh ở Nhật như thế nào?',
];
