import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { DAILY_LIFE_TOPICS } from '../constants/content/dailyLife';
import { ESSENTIAL_PHRASES, JAPANESE_WORDS } from '../constants/content/japanese';
import { CURRENT_LABOR_UPDATES, WORKER_RIGHTS } from '../constants/content/jobs';
import { getAdminGuideSearchKeywords } from '../constants/content/adminGuideSearchKeywords';

export type SearchResultType =
  | 'guide'
  | 'daily-life'
  | 'japanese-phrase'
  | 'japanese-dialogue'
  | 'japanese-word'
  | 'jobs';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  snippet: string;
  searchText: string;
  queryHint?: string;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

// Phase 2A: index entries carry the JP form and the keyword array as
// first-class fields so the scorer can apply layered weights instead of
// burying everything in a single searchText blob.
type IndexEntry = SearchResultItem & {
  titleJp?: string;
  keywords?: string[];
  priority?: 'high' | 'normal';
  category?: string;
};

const SEARCH_INDEX: IndexEntry[] = [
  ...ADMIN_GUIDES.map((guide): IndexEntry => ({
    id: guide.id,
    type: 'guide' as const,
    title: guide.title,
    subtitle: 'Thủ tục hành chính',
    snippet: guide.description,
    titleJp: guide.titleJp,
    keywords: getAdminGuideSearchKeywords(guide),
    priority: guide.priority ?? 'normal',
    category: guide.category,
    searchText: [
      guide.title,
      guide.titleJp,
      guide.description,
      ...(guide.whoIsThisFor ?? []),
      ...(guide.whenToDo ?? []),
      ...(guide.whereToDo ?? []),
      ...(guide.documentsChecklist?.map((item) => item.label) ?? []),
      ...(guide.commonMistakes ?? []),
      ...(guide.faq?.flatMap((item) => [item.question, item.answer]) ?? []),
    ].join(' '),
  })),
  ...DAILY_LIFE_TOPICS.map((topic): IndexEntry => ({
    id: topic.id,
    type: 'daily-life' as const,
    title: topic.title,
    subtitle: 'Đời sống hằng ngày',
    snippet: topic.description,
    titleJp: topic.titleJp,
    searchText: [
      topic.title,
      topic.titleJp,
      topic.description,
      ...(topic.sections?.flatMap((section) => [
        section.title,
        section.content ?? '',
        ...(section.items ?? []),
        section.tip ?? '',
      ]) ?? []),
    ].join(' '),
  })),
  ...ESSENTIAL_PHRASES.flatMap((category): IndexEntry[] => [
    ...category.phrases.map((phrase): IndexEntry => ({
      id: `phrase:${category.category}:${phrase.jp}`,
      type: 'japanese-phrase' as const,
      title: phrase.vn,
      subtitle: `Tiếng Nhật • ${category.category}`,
      snippet: `${phrase.jp} • ${phrase.romaji}`,
      titleJp: phrase.jp,
      keywords: [phrase.romaji],
      searchText: [category.category, phrase.jp, phrase.romaji, phrase.vn].join(' '),
      queryHint: phrase.jp,
    })),
    ...(category.dialogue
      ? [
          {
            id: `dialogue:${category.category}`,
            type: 'japanese-dialogue' as const,
            title: category.dialogue.situation,
            subtitle: `Hội thoại • ${category.category}`,
            snippet: category.dialogue.lines
              .slice(0, 2)
              .map((line) => `${line.speakerLabel}: ${line.vn}`)
              .join(' • '),
            searchText: [
              category.category,
              category.dialogue.situation,
              ...category.dialogue.lines.flatMap((line) => [
                line.speakerLabel,
                line.jp,
                line.romaji,
                line.vn,
              ]),
            ].join(' '),
            queryHint: category.category,
          } satisfies IndexEntry,
        ]
      : []),
  ]),
  ...JAPANESE_WORDS.map((word): IndexEntry => ({
    id: `word:${word.word}`,
    type: 'japanese-word' as const,
    title: word.meaning,
    subtitle: 'Từ vựng tiếng Nhật',
    snippet: `${word.word} • ${word.romaji}`,
    titleJp: word.word,
    keywords: [word.romaji, word.reading].filter(Boolean) as string[],
    searchText: [
      word.word,
      word.reading,
      word.romaji,
      word.meaning,
      word.example,
      word.exampleMeaning,
      word.culturalNote ?? '',
    ].join(' '),
    queryHint: word.word,
  })),
  ...CURRENT_LABOR_UPDATES.map((item): IndexEntry => ({
    id: `job-update:${item.id}`,
    type: 'jobs' as const,
    title: item.title,
    subtitle: 'Việc làm và quyền lợi',
    snippet: item.summary,
    searchText: [item.title, item.summary, item.impact, item.effectiveDate].join(' '),
  })),
  ...WORKER_RIGHTS.map((item, index): IndexEntry => ({
    id: `worker-right:${index}`,
    type: 'jobs' as const,
    title: item.title,
    subtitle: 'Quyền lợi lao động',
    snippet: item.description,
    searchText: [item.title, item.description].join(' '),
  })),
  {
    id: 'jobs:labor-guide',
    type: 'jobs' as const,
    title: 'Cẩm nang lao động',
    subtitle: 'Việc làm và quyền lợi',
    snippet: 'Checklist hợp đồng, dấu hiệu công ty rủi ro và câu nên hỏi lại trước khi ký.',
    searchText:
      'cam nang lao dong hop dong no luong ep ot giu giay to nghi viec cong ty rui ro',
  },
  {
    id: 'jobs:labor-help',
    type: 'jobs' as const,
    title: 'Khiếu nại / cần giúp gì',
    subtitle: 'Việc làm và quyền lợi',
    snippet: 'Đi thẳng vào các tình huống nợ lương, ép OT, giữ giấy tờ hoặc cản nghỉ việc.',
    searchText:
      'khieu nai can giup gi no luong ep ot giu giay to can tro nghi viec lao dong',
  },
];

// Pre-normalized version of each index entry — built once at module load,
// reused on every search query.
type NormalizedEntry = {
  item: SearchResultItem;
  nTitle: string;
  nTitleJp: string;
  nSubtitle: string;
  nSnippet: string;
  nKeywords: string[];
  nSearchText: string;
  priority: 'high' | 'normal';
  category?: string;
};

const NORMALIZED_INDEX: NormalizedEntry[] = SEARCH_INDEX.map((item) => ({
  item: {
    id: item.id,
    type: item.type,
    title: item.title,
    subtitle: item.subtitle,
    snippet: item.snippet,
    searchText: item.searchText,
    queryHint: item.queryHint,
  },
  nTitle: normalizeText(item.title),
  nTitleJp: normalizeText(item.titleJp ?? ''),
  nSubtitle: normalizeText(item.subtitle),
  nSnippet: normalizeText(item.snippet),
  nKeywords: (item.keywords ?? []).map(normalizeText).filter(Boolean),
  nSearchText: normalizeText(item.searchText),
  priority: item.priority ?? 'normal',
  category: item.category,
}));

// Layered scoring (Phase 2A). The intent of the priority order
// "exact JP > romaji > VI no-diacritic > VI diacritic > EN fallback" is
// encoded by *where* the match lands, not by the query string itself
// (normalizeText flattens diacritics so VI ASCII == VI diacritic at the
// query level):
//
//   - titleJp exact / startsWith / includes → highest signal (JP form
//     is the unambiguous identifier)
//   - title  exact / startsWith / includes → equivalent strength (Vi
//     title is the user-facing identifier)
//   - keywords match → romaji + alias hits live here, so we score them
//     above body text but below titles
//   - subtitle / snippet / searchText → body fallback
//
// A small +6 bump for priority='high' guides surfaces editorially
// featured guides without overriding a stronger title/keyword match.
function scoreResult(q: string, entry: NormalizedEntry): number {
  let score = 0;

  if (entry.nTitle === q) score += 120;
  else if (entry.nTitle.startsWith(q)) score += 80;
  else if (entry.nTitle.includes(q)) score += 45;

  if (entry.nTitleJp) {
    if (entry.nTitleJp === q) score += 120;
    else if (entry.nTitleJp.startsWith(q)) score += 80;
    else if (entry.nTitleJp.includes(q)) score += 60;
  }

  if (entry.nKeywords.length > 0) {
    if (entry.nKeywords.some((k) => k === q)) score += 50;
    else if (entry.nKeywords.some((k) => k.includes(q))) score += 35;
  }

  if (entry.nSubtitle.includes(q)) score += 20;
  if (entry.nSnippet.includes(q)) score += 12;
  if (entry.nSearchText.includes(q)) score += 8;

  if (score > 0 && entry.priority === 'high') score += 6;

  return score;
}

export function searchAppContent(query: string, limit = 30): SearchResultItem[] {
  const q = normalizeText(query);
  if (!q) return [];

  return NORMALIZED_INDEX
    .map((entry) => ({ item: entry.item, score: scoreResult(q, entry) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((x) => x.item);
}

// Phase 2A: featured-guides helper. Returns guide-type entries marked
// `priority: 'high'` in their AdminGuide source. Order is by title for
// stable rendering — callers that want a different sort (by category,
// last-verified, etc.) should sort the result themselves.
export function getFeaturedGuides(limit = 20): SearchResultItem[] {
  return NORMALIZED_INDEX
    .filter((e) => e.item.type === 'guide' && e.priority === 'high')
    .sort((a, b) => a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((x) => x.item);
}

// Phase 2A: lightweight related-guides surface. For a given guide id,
// return up to `limit` other guides ranked by:
//   - same category (+5)
//   - token overlap on normalized keywords (+2 per shared token)
//   - shared keyword substring (+1 per pair, capped)
// Cheap to compute at runtime (single pass over the admin-guide subset
// of the index) and avoids hand-curating a related-guides table.
export function getRelatedGuides(guideId: string, limit = 3): SearchResultItem[] {
  const source = NORMALIZED_INDEX.find(
    (e) => e.item.type === 'guide' && e.item.id === guideId
  );
  if (!source) return [];

  const sourceTokens = new Set<string>();
  for (const k of source.nKeywords) {
    for (const t of k.split(/\s+/).filter((s) => s.length >= 3)) {
      sourceTokens.add(t);
    }
  }
  // Also tokenize the source title so a guide with sparse keywords still
  // matches obvious neighbours via shared title tokens.
  for (const t of source.nTitle.split(/\s+/).filter((s) => s.length >= 3)) {
    sourceTokens.add(t);
  }

  if (sourceTokens.size === 0 && !source.category) return [];

  return NORMALIZED_INDEX
    .filter((e) => e.item.type === 'guide' && e.item.id !== guideId)
    .map((e) => {
      let score = 0;
      if (e.category && source.category && e.category === source.category) {
        score += 5;
      }
      const candidateTokens = new Set<string>();
      for (const k of e.nKeywords) {
        for (const t of k.split(/\s+/).filter((s) => s.length >= 3)) {
          candidateTokens.add(t);
        }
      }
      for (const t of e.nTitle.split(/\s+/).filter((s) => s.length >= 3)) {
        candidateTokens.add(t);
      }
      for (const t of sourceTokens) {
        if (candidateTokens.has(t)) score += 2;
      }
      if (e.priority === 'high' && score > 0) score += 1;
      return { item: e.item, score };
    })
    .filter((x) => x.score >= 5)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((x) => x.item);
}
