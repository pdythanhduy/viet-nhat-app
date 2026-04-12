import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const STORAGE_KEY = StorageKeys.bookmarks;

export type BookmarkType = 'guide' | 'phrase' | 'dialogue' | 'daily-life';

export interface GuideBookmark {
  type: 'guide';
  id: string;
  title: string;
  titleJp: string;
  description: string;
  color: string;
  savedAt: string;
  pinnedAt?: string;
}

export interface PhraseBookmark {
  type: 'phrase';
  id: string;
  jp: string;
  romaji: string;
  vn: string;
  category: string;
  savedAt: string;
  pinnedAt?: string;
}

export interface DialogueBookmark {
  type: 'dialogue';
  id: string;
  category: string;
  situation: string;
  lines: {
    speakerLabel: string;
    jp: string;
    romaji: string;
    vn: string;
  }[];
  savedAt: string;
  pinnedAt?: string;
}

export interface DailyLifeBookmark {
  type: 'daily-life';
  id: string;
  title: string;
  titleJp: string;
  description: string;
  color: string;
  savedAt: string;
  pinnedAt?: string;
}

export type Bookmark = GuideBookmark | PhraseBookmark | DialogueBookmark | DailyLifeBookmark;

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
    return false;
  }

  bookmarks.unshift({ ...item, savedAt: new Date().toISOString() });
  await saveBookmarks(bookmarks);
  return true;
}

export async function isBookmarked(id: string, type: BookmarkType): Promise<boolean> {
  const bookmarks = await loadBookmarks();
  return bookmarks.some((b) => b.id === id && b.type === type);
}

export async function toggleBookmarkPin(id: string, type: BookmarkType): Promise<boolean> {
  const bookmarks = await loadBookmarks();
  const index = bookmarks.findIndex((b) => b.id === id && b.type === type);
  if (index < 0) return false;

  const target = bookmarks[index];
  const nextPinned = !target.pinnedAt;

  bookmarks[index] = {
    ...target,
    pinnedAt: nextPinned ? new Date().toISOString() : undefined,
  };

  bookmarks.sort((a, b) => {
    const aPinned = a.pinnedAt ? new Date(a.pinnedAt).getTime() : 0;
    const bPinned = b.pinnedAt ? new Date(b.pinnedAt).getTime() : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });

  await saveBookmarks(bookmarks);
  return nextPinned;
}
