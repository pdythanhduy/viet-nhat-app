import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const STORAGE_KEY = StorageKeys.dailyLifeRecentTopics;
const MAX_ITEMS = 6;

export interface RecentDailyLifeTopic {
  topicId: string;
  viewedAt: string;
}

export async function loadRecentDailyLifeTopics(): Promise<RecentDailyLifeTopic[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRecentDailyLifeTopics(items: RecentDailyLifeTopic[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function recordRecentDailyLifeTopic(topicId: string): Promise<void> {
  const items = await loadRecentDailyLifeTopics();
  const next: RecentDailyLifeTopic[] = [
    { topicId, viewedAt: new Date().toISOString() },
    ...items.filter((item) => item.topicId !== topicId),
  ].slice(0, MAX_ITEMS);
  await saveRecentDailyLifeTopics(next);
}
