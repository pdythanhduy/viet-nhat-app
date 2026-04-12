import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const STORAGE_KEY = StorageKeys.japaneseRecentCategories;
const MAX_ITEMS = 5;

export interface RecentJapaneseCategory {
  categoryName: string;
  categoryColor?: string;
  practicedAt: string;
}

export async function loadRecentJapaneseCategories(): Promise<RecentJapaneseCategory[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRecentJapaneseCategories(
  items: RecentJapaneseCategory[]
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function recordRecentJapaneseCategory(
  categoryName: string,
  categoryColor?: string
): Promise<void> {
  const items = await loadRecentJapaneseCategories();
  const next: RecentJapaneseCategory[] = [
    {
      categoryName,
      categoryColor,
      practicedAt: new Date().toISOString(),
    },
    ...items.filter((item) => item.categoryName !== categoryName),
  ].slice(0, MAX_ITEMS);

  await saveRecentJapaneseCategories(next);
}
