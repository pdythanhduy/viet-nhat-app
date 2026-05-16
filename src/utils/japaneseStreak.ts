import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const KEY = StorageKeys.japaneseStreak;

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // 'YYYY-MM-DD'
  totalDaysStudied: number;
}

const DEFAULT: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: '',
  totalDaysStudied: 0,
};

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function loadStreak(): Promise<StreakData> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch {
    return { ...DEFAULT };
  }
}

/** Call this whenever user does a practice session or quiz. */
export async function markStudiedToday(): Promise<StreakData> {
  const data = await loadStreak();
  const today = toDateStr(new Date());
  const yesterday = toDateStr(new Date(Date.now() - 86400000));

  if (data.lastStudyDate === today) return data; // Already counted

  const newStreak =
    data.lastStudyDate === yesterday ? data.currentStreak + 1 : 1;

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, data.longestStreak),
    lastStudyDate: today,
    totalDaysStudied: data.totalDaysStudied + 1,
  };

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

/** Returns the word index for today (deterministic, changes daily). */
export function getTodayWordIndex(totalWords: number): number {
  const start = new Date('2026-01-01').getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayNumber = Math.floor((today.getTime() - start) / 86400000);
  return ((dayNumber % totalWords) + totalWords) % totalWords;
}
