import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoryStreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string; // YYYY-MM-DD (user-local)
  totalDaysRead: number;
}

const STORAGE_KEY = 'story_streak_v1';
// Local-time epoch used to rotate "today's story" — kept in user-local time
// so the rotation flips at the user's midnight, not UTC midnight.
const EPOCH_YEAR = 2026;
const EPOCH_MONTH = 0; // January (0-indexed)
const EPOCH_DAY = 1;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const DEFAULT_STREAK: StoryStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastReadDate: '',
  totalDaysRead: 0,
};

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export async function loadStoryStreak(): Promise<StoryStreakData> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_STREAK;
    const parsed = JSON.parse(data);
    return {
      currentStreak: parsed.currentStreak ?? 0,
      longestStreak: parsed.longestStreak ?? 0,
      lastReadDate: parsed.lastReadDate ?? '',
      totalDaysRead: parsed.totalDaysRead ?? 0,
    };
  } catch (error) {
    console.error('Error loading story streak:', error);
    return DEFAULT_STREAK;
  }
}

export async function saveStoryStreak(data: StoryStreakData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving story streak:', error);
  }
}

export async function markStoryReadToday(): Promise<void> {
  try {
    const streak = await loadStoryStreak();
    const today = new Date();
    const todayStr = toLocalDateStr(today);

    if (streak.lastReadDate === todayStr) {
      return; // Already marked today
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toLocalDateStr(yesterday);

    const newStreak = streak.lastReadDate === yesterdayStr ? streak.currentStreak + 1 : 1;
    const newLongestStreak = Math.max(newStreak, streak.longestStreak);

    const updated: StoryStreakData = {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastReadDate: todayStr,
      totalDaysRead: streak.totalDaysRead + 1,
    };

    await saveStoryStreak(updated);
  } catch (error) {
    console.error('Error marking story read today:', error);
  }
}

export function getStoryTodayIndex(totalStories: number): number {
  if (totalStories <= 0) return 0;
  const now = new Date();
  const epochMs = startOfLocalDay(new Date(EPOCH_YEAR, EPOCH_MONTH, EPOCH_DAY));
  const todayMs = startOfLocalDay(now);
  const daysSinceEpoch = Math.floor((todayMs - epochMs) / MS_PER_DAY);
  // Normalize negative results (clock skew / pre-epoch) into a positive bucket.
  return ((daysSinceEpoch % totalStories) + totalStories) % totalStories;
}
