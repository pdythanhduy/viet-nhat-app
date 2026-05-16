import type { PhraseCategory } from '../types/content';
import {
  buildDailyNotificationContent,
  getTodayPhrase,
  getTodayQuizQuestions,
  flattenPhrases,
} from './dailyRitualContent';

const CATEGORIES: PhraseCategory[] = [
  {
    category: 'Chào hỏi',
    icon: 'happy',
    color: '#185FA5',
    phrases: [
      { jp: 'おはよう', romaji: 'Ohayou', vn: 'Chào buổi sáng' },
      { jp: 'こんにちは', romaji: 'Konnichiwa', vn: 'Xin chào' },
    ],
  },
  {
    category: 'Bệnh viện',
    icon: 'medical',
    color: '#C0392B',
    phrases: [
      { jp: '頭が痛いです', romaji: 'Atama ga itai desu', vn: 'Tôi đau đầu' },
      { jp: '熱があります', romaji: 'Netsu ga arimasu', vn: 'Tôi bị sốt' },
      { jp: '薬', romaji: 'Kusuri', vn: 'Thuốc' },
    ],
  },
];

describe('flattenPhrases', () => {
  it('flattens categories into a single phrase pool with category set', () => {
    const flat = flattenPhrases(CATEGORIES);
    expect(flat).toHaveLength(5);
    expect(flat[0].category).toBe('Chào hỏi');
    expect(flat[2].category).toBe('Bệnh viện');
  });
});

describe('getTodayPhrase', () => {
  it('returns null when no categories provided', () => {
    expect(getTodayPhrase([])).toBeNull();
  });

  it('returns the same phrase for the same day', () => {
    const today = new Date('2026-06-01');
    const a = getTodayPhrase(CATEGORIES, today);
    const b = getTodayPhrase(CATEGORIES, today);
    expect(a?.jp).toBe(b?.jp);
  });

  it('rotates the phrase across consecutive days', () => {
    const day1 = getTodayPhrase(CATEGORIES, new Date('2026-06-01'));
    const day2 = getTodayPhrase(CATEGORIES, new Date('2026-06-02'));
    expect(day1?.jp).not.toBe(day2?.jp);
  });

  it('always returns a phrase from the pool', () => {
    const phrase = getTodayPhrase(CATEGORIES, new Date('2026-08-15'));
    const allJps = flattenPhrases(CATEGORIES).map((item) => item.jp);
    expect(allJps).toContain(phrase?.jp);
  });
});

describe('getTodayQuizQuestions', () => {
  it('returns empty when no categories', () => {
    expect(getTodayQuizQuestions([])).toEqual([]);
  });

  it('returns the requested number of questions', () => {
    const questions = getTodayQuizQuestions(CATEGORIES, 3);
    expect(questions).toHaveLength(3);
  });

  it('selects the same set of phrases for the same day (order may shuffle)', () => {
    const date = new Date('2026-06-01');
    const a = getTodayQuizQuestions(CATEGORIES, 3, date)
      .map((q) => q.phrase.jp)
      .sort();
    const b = getTodayQuizQuestions(CATEGORIES, 3, date)
      .map((q) => q.phrase.jp)
      .sort();
    expect(a).toEqual(b);
  });
});

describe('buildDailyNotificationContent', () => {
  it('returns generic text when phrase is null', () => {
    const content = buildDailyNotificationContent(null, 0);
    expect(content.wordTitle).toContain('Từ của hôm nay');
    expect(content.studyTitle).toContain('Luyện tiếng Nhật');
    expect(content.wordBody).not.toMatch(/\bngày\s\d+\b/);
  });

  it('includes the Japanese phrase in word title when phrase provided', () => {
    const phrase = { jp: '残業', romaji: 'zangyou', vn: 'tăng ca', category: 'Công ty' };
    const content = buildDailyNotificationContent(phrase, 0);
    expect(content.wordTitle).toContain('残業');
    expect(content.wordBody).toContain('zangyou');
    expect(content.wordBody).toContain('tăng ca');
  });

  it('mentions the streak count when above zero', () => {
    const phrase = { jp: '残業', romaji: 'zangyou', vn: 'tăng ca', category: 'Công ty' };
    const content = buildDailyNotificationContent(phrase, 7);
    expect(content.wordBody).toContain('7');
    expect(content.studyTitle).toContain('7');
  });

  it('does not mention streak when streak is zero', () => {
    const phrase = { jp: '残業', romaji: 'zangyou', vn: 'tăng ca', category: 'Công ty' };
    const content = buildDailyNotificationContent(phrase, 0);
    expect(content.wordBody).not.toMatch(/giữ chuỗi/);
  });
});
