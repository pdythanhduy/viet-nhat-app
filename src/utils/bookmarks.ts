import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const STORAGE_KEY = StorageKeys.bookmarks;

export type BookmarkType = 'guide' | 'phrase';

export interface GuideBookmark {
  type: 'guide';
  id: string;
  title: string;
  titleJp: string;
  description: string;
  color: string;
  savedAt: string;
}

export interface PhraseBookmark {
  type: 'phrase';
  id: string; // jp text dùng làm id
  jp: string;
  romaji: string;
  vn: string;
  category: string;
  savedAt: string;
}

export type Bookmark = GuideBookmark | PhraseBookmark;

export async function loadBookmarks(): Promise<Bookmark[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveBookmarks(bookmarks: Bookmark[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export async function toggleBookmark(item: Bookmark): Promise<boolean> {
  const bookmarks = await loadBookmarks();
  const idx = bookmarks.findIndex((b) => b.id === item.id && b.type === item.type);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
    await saveBookmarks(bookmarks);
    return false; // removed
  } else {
    bookmarks.unshift({ ...item, savedAt: new Date().toISOString() });
    await saveBookmarks(bookmarks);
    return true; // added
  }
}

export async function isBookmarked(id: string, type: BookmarkType): Promise<boolean> {
  const bookmarks = await loadBookmarks();
  return bookmarks.some((b) => b.id === id && b.type === type);
}
