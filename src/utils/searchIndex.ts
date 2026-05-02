import {
  ADMIN_GUIDES,
  CURRENT_LABOR_UPDATES,
  DAILY_LIFE_TOPICS,
  ESSENTIAL_PHRASES,
  JAPANESE_WORDS,
  WORKER_RIGHTS,
} from '../constants/content';

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
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

const SEARCH_INDEX: SearchResultItem[] = [
  ...ADMIN_GUIDES.map((guide) => ({
    id: guide.id,
    type: 'guide' as const,
    title: guide.title,
    subtitle: 'Thủ tục hành chính',
    snippet: guide.description,
    searchText: [
      guide.title,
      guide.titleJp,
      guide.description,
      ...(guide.searchKeywords ?? []),
      ...(guide.whoIsThisFor ?? []),
      ...(guide.whenToDo ?? []),
      ...(guide.whereToDo ?? []),
      ...(guide.documentsChecklist?.map((item) => item.label) ?? []),
      ...(guide.commonMistakes ?? []),
      ...(guide.faq?.flatMap((item) => [item.question, item.answer]) ?? []),
    ].join(' '),
  })),
  ...DAILY_LIFE_TOPICS.map((topic) => ({
    id: topic.id,
    type: 'daily-life' as const,
    title: topic.title,
    subtitle: 'Đời sống hằng ngày',
    snippet: topic.description,
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
  ...ESSENTIAL_PHRASES.flatMap((category) => [
    ...category.phrases.map((phrase) => ({
      id: `phrase:${category.category}:${phrase.jp}`,
      type: 'japanese-phrase' as const,
      title: phrase.vn,
      subtitle: `Tiếng Nhật • ${category.category}`,
      snippet: `${phrase.jp} • ${phrase.romaji}`,
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
          },
        ]
      : []),
  ]),
  ...JAPANESE_WORDS.map((word) => ({
    id: `word:${word.word}`,
    type: 'japanese-word' as const,
    title: word.meaning,
    subtitle: 'Từ vựng tiếng Nhật',
    snippet: `${word.word} • ${word.romaji}`,
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
  ...CURRENT_LABOR_UPDATES.map((item) => ({
    id: `job-update:${item.id}`,
    type: 'jobs' as const,
    title: item.title,
    subtitle: 'Việc làm và quyền lợi',
    snippet: item.summary,
    searchText: [item.title, item.summary, item.impact, item.effectiveDate].join(' '),
  })),
  ...WORKER_RIGHTS.map((item, index) => ({
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
  nSubtitle: string;
  nSnippet: string;
  nSearchText: string;
};

const NORMALIZED_INDEX: NormalizedEntry[] = SEARCH_INDEX.map((item) => ({
  item,
  nTitle: normalizeText(item.title),
  nSubtitle: normalizeText(item.subtitle),
  nSnippet: normalizeText(item.snippet),
  nSearchText: normalizeText(item.searchText),
}));

function scoreResult(q: string, entry: NormalizedEntry): number {
  let score = 0;
  if (entry.nTitle === q) score += 120;
  if (entry.nTitle.startsWith(q)) score += 80;
  if (entry.nTitle.includes(q)) score += 45;
  if (entry.nSubtitle.includes(q)) score += 20;
  if (entry.nSnippet.includes(q)) score += 12;
  if (entry.nSearchText.includes(q)) score += 8;
  return score;
}

export function searchAppContent(query: string, limit = 30) {
  const q = normalizeText(query);
  if (!q) return [];

  return NORMALIZED_INDEX
    .map((entry) => ({ item: entry.item, score: scoreResult(q, entry) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((x) => x.item);
}
