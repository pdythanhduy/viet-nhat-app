import type { PhraseCategory } from '../types/content';
import type { QuizPhrase, QuizQuestion } from './japaneseQuiz';
import { buildQuizQuestions } from './japaneseQuiz';

const EPOCH = new Date('2026-01-01').getTime();

function dayNumber(date = new Date()): number {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return Math.floor((startOfDay.getTime() - EPOCH) / 86400000);
}

export function flattenPhrases(categories: PhraseCategory[]): QuizPhrase[] {
  return categories.flatMap((category) =>
    category.phrases.map((phrase) => ({ ...phrase, category: category.category }))
  );
}

export function getTodayPhrase(categories: PhraseCategory[], date = new Date()): QuizPhrase | null {
  const pool = flattenPhrases(categories);
  if (pool.length === 0) return null;
  const day = dayNumber(date);
  const index = ((day % pool.length) + pool.length) % pool.length;
  return pool[index];
}

export function getTodayQuizQuestions(
  categories: PhraseCategory[],
  count = 3,
  date = new Date()
): QuizQuestion[] {
  const pool = flattenPhrases(categories);
  if (pool.length === 0) return [];

  const day = dayNumber(date);
  const targets: QuizPhrase[] = [];
  // Stride > 1 so the 3 daily questions don't repeat the same phrase
  const stride = Math.max(1, Math.floor(pool.length / count) || 1);
  for (let i = 0; i < count; i++) {
    const idx = (((day + i * stride) % pool.length) + pool.length) % pool.length;
    targets.push(pool[idx]);
  }
  return buildQuizQuestions(targets, pool, 'mixed');
}

export interface DailyNotificationContent {
  wordTitle: string;
  wordBody: string;
  studyTitle: string;
  studyBody: string;
}

export function buildDailyNotificationContent(
  phrase: QuizPhrase | null,
  currentStreak: number
): DailyNotificationContent {
  if (!phrase) {
    return {
      wordTitle: '🌸 Từ của hôm nay',
      wordBody: 'Mở app để xem cụm tiếng Nhật mới hôm nay.',
      studyTitle: '🇯🇵 Luyện tiếng Nhật hôm nay chưa?',
      studyBody: 'Chỉ cần 1 phút mỗi ngày để duy trì chuỗi của bạn.',
    };
  }

  const streakSuffix = currentStreak > 0 ? ` — giữ chuỗi ${currentStreak} ngày 🔥` : '';

  return {
    wordTitle: `🌸 Hôm nay: ${phrase.jp}`,
    wordBody: `${phrase.romaji} — "${phrase.vn}". Tap để học + 3 câu quiz nhanh${streakSuffix}.`,
    studyTitle: currentStreak > 0
      ? `🔥 Còn 1 cú chạm để giữ chuỗi ${currentStreak} ngày`
      : '🇯🇵 Bắt đầu chuỗi học hôm nay',
    studyBody: `${phrase.jp} (${phrase.romaji}) — "${phrase.vn}". Mở app làm 3 câu quiz là xong.`,
  };
}
