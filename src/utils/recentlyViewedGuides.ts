import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

// Lightweight retention surface for admin guides — last 5 guide IDs the
// user opened, newest first, deduped. Storage-only; no backend, no
// reminder system. Mirrors the shape of `dailyLifeRecentTopics.ts` so
// the patterns stay consistent.

const STORAGE_KEY = StorageKeys.recentlyViewedGuides;
const MAX_ITEMS = 5;

export interface RecentlyViewedGuide {
  guideId: string;
  viewedAt: string;
}

export async function loadRecentlyViewedGuides(): Promise<RecentlyViewedGuide[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRecentlyViewedGuides(items: RecentlyViewedGuide[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function recordRecentlyViewedGuide(guideId: string): Promise<void> {
  const items = await loadRecentlyViewedGuides();
  const next: RecentlyViewedGuide[] = [
    { guideId, viewedAt: new Date().toISOString() },
    ...items.filter((item) => item.guideId !== guideId),
  ].slice(0, MAX_ITEMS);
  await saveRecentlyViewedGuides(next);
}

export async function clearRecentlyViewedGuides(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
