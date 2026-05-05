import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoryStreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string; // YYYY-MM-DD
  totalDaysRead: number;
}

const STORAGE_KEY = 'story_streak_v1';
const EPOCH_DATE = new Date('2026-01-01');

const DEFAULT_STREAK: StoryStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastReadDate: '',
  totalDaysRead: 0,
};

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
    const todayStr = today.toISOString().split('T')[0];

    if (streak.lastReadDate === todayStr) {
      return; // Already marked today
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

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
  const daysSinceEpoch = Math.floor((Date.now() - EPOCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceEpoch % totalStories;
}
