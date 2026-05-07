// Story reading progress management
// Handles saving/loading reading progress, bookmarks, and favorites

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';
import { StoryProgress, StoryBookmark, SentenceBookmark, WordBookmark } from '../types/story';

/**
 * Load reading progress for all stories
 */
export async function loadStoryProgress(): Promise<Record<string, StoryProgress>> {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.storyProgress);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading story progress:', error);
    return {};
  }
}

/**
 * Save reading progress for a story
 */
export async function saveStoryProgress(storyId: string, progress: StoryProgress): Promise<void> {
  try {
    const allProgress = await loadStoryProgress();
    allProgress[storyId] = progress;
    await AsyncStorage.setItem(StorageKeys.storyProgress, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving story progress:', error);
  }
}

/**
 * Mark story as completed
 */
export async function markStoryCompleted(storyId: string): Promise<void> {
  try {
    const allProgress = await loadStoryProgress();
    if (!allProgress[storyId]) {
      allProgress[storyId] = {
        storyId,
        userId: 'default',
        currentParagraphIndex: 0,
        percentRead: 100,
        isCompleted: true,
        lastReadAt: new Date().toISOString(),
      };
    } else {
      allProgress[storyId].isCompleted = true;
      allProgress[storyId].percentRead = 100;
      allProgress[storyId].lastReadAt = new Date().toISOString();
    }
    await AsyncStorage.setItem(StorageKeys.storyProgress, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error marking story completed:', error);
  }
}

/**
 * Get progress for a specific story
 */
export async function getStoryProgress(storyId: string): Promise<StoryProgress | null> {
  try {
    const allProgress = await loadStoryProgress();
    return allProgress[storyId] || null;
  } catch (error) {
    console.error('Error getting story progress:', error);
    return null;
  }
}

/**
 * Update current reading position
 */
export async function updateReadingPosition(storyId: string, paragraphIndex: number, percentRead: number): Promise<void> {
  try {
    let progress = await getStoryProgress(storyId);
    if (!progress) {
      progress = {
        storyId,
        userId: 'default',
        currentParagraphIndex: paragraphIndex,
        percentRead: Math.min(percentRead, 100),
        isCompleted: false,
        lastReadAt: new Date().toISOString(),
      };
    } else {
      progress.currentParagraphIndex = paragraphIndex;
      progress.percentRead = Math.min(percentRead, 100);
      progress.lastReadAt = new Date().toISOString();
    }
    await saveStoryProgress(storyId, progress);
  } catch (error) {
    console.error('Error updating reading position:', error);
  }
}

/**
 * Load story bookmarks
 */
export async function loadStoryBookmarks(): Promise<StoryBookmark[]> {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.storyBookmarks);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading story bookmarks:', error);
    return [];
  }
}

/**
 * Add story to bookmarks
 */
export async function addStoryBookmark(storyId: string): Promise<void> {
  try {
    const bookmarks = await loadStoryBookmarks();
    if (!bookmarks.find((b) => b.storyId === storyId)) {
      bookmarks.push({
        id: `bookmark-${Date.now()}`,
        storyId,
        userId: 'current-user', // Will be dynamic later
        createdAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem(StorageKeys.storyBookmarks, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error adding story bookmark:', error);
  }
}

/**
 * Remove story from bookmarks
 */
export async function removeStoryBookmark(storyId: string): Promise<void> {
  try {
    const bookmarks = await loadStoryBookmarks();
    const filtered = bookmarks.filter((b) => b.storyId !== storyId);
    await AsyncStorage.setItem(StorageKeys.storyBookmarks, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing story bookmark:', error);
  }
}

/**
 * Check if story is bookmarked
 */
export async function isStoryBookmarked(storyId: string): Promise<boolean> {
  try {
    const bookmarks = await loadStoryBookmarks();
    return bookmarks.some((b) => b.storyId === storyId);
  } catch (error) {
    console.error('Error checking story bookmark:', error);
    return false;
  }
}

/**
 * Load sentence bookmarks
 */
export async function loadSentenceBookmarks(): Promise<SentenceBookmark[]> {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.sentenceBookmarks);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading sentence bookmarks:', error);
    return [];
  }
}

/**
 * Add sentence to bookmarks
 */
export async function addSentenceBookmark(sentenceId: string, storyId: string, note?: string): Promise<void> {
  try {
    const bookmarks = await loadSentenceBookmarks();
    if (!bookmarks.find((b) => b.sentenceId === sentenceId)) {
      bookmarks.push({
        id: `sent-bookmark-${Date.now()}`,
        sentenceId,
        storyId,
        userId: 'current-user',
        note,
        createdAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem(StorageKeys.sentenceBookmarks, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error adding sentence bookmark:', error);
  }
}

/**
 * Load word bookmarks (vocabulary saves)
 */
export async function loadWordBookmarks(): Promise<WordBookmark[]> {
  try {
    const data = await AsyncStorage.getItem(StorageKeys.wordBookmarks);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading word bookmarks:', error);
    return [];
  }
}

/**
 * Add word to bookmarks
 */
export async function addWordBookmark(word: string, reading: string, meaning: string): Promise<void> {
  try {
    const bookmarks = await loadWordBookmarks();
    if (!bookmarks.find((b) => b.word === word && b.reading === reading)) {
      bookmarks.push({
        id: `word-bookmark-${Date.now()}`,
        word,
        reading,
        meaning,
        userId: 'current-user',
        createdAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem(StorageKeys.wordBookmarks, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error adding word bookmark:', error);
  }
}

/**
 * Remove word from bookmarks
 */
export async function removeWordBookmark(wordId: string): Promise<void> {
  try {
    const bookmarks = await loadWordBookmarks();
    const filtered = bookmarks.filter((b) => b.id !== wordId);
    await AsyncStorage.setItem(StorageKeys.wordBookmarks, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing word bookmark:', error);
  }
}

/**
 * Get completion stats
 */
export async function getCompletionStats(): Promise<{
  totalStories: number;
  completedStories: number;
  percentageComplete: number;
  totalWordsLearned: number;
}> {
  try {
    const allProgress = await loadStoryProgress();
    const wordBookmarks = await loadWordBookmarks();

    const completedStories = Object.values(allProgress).filter((p) => p.isCompleted).length;
    const totalStories = Object.values(allProgress).length;
    const percentageComplete = totalStories > 0 ? Math.round((completedStories / totalStories) * 100) : 0;

    return {
      totalStories,
      completedStories,
      percentageComplete,
      totalWordsLearned: wordBookmarks.length,
    };
  } catch (error) {
    console.error('Error getting completion stats:', error);
    return {
      totalStories: 0,
      completedStories: 0,
      percentageComplete: 0,
      totalWordsLearned: 0,
    };
  }
}
