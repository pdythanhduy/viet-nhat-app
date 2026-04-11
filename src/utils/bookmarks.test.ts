import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  isBookmarked,
  loadBookmarks,
  saveBookmarks,
  toggleBookmark,
  type Bookmark,
} from './bookmarks';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const guideBookmark: Bookmark = {
  type: 'guide',
  id: 'residence-card',
  title: 'Gia hạn thẻ cư trú',
  titleJp: '在留カード更新',
  description: 'Hướng dẫn gia hạn thẻ cư trú',
  color: '#185FA5',
  savedAt: '',
};

describe('bookmarks', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('loads an empty list when storage is empty', async () => {
    await expect(loadBookmarks()).resolves.toEqual([]);
  });

  it('saves and loads bookmarks', async () => {
    await saveBookmarks([guideBookmark]);

    await expect(loadBookmarks()).resolves.toEqual([guideBookmark]);
  });

  it('adds and removes a bookmark with toggleBookmark', async () => {
    await expect(toggleBookmark(guideBookmark)).resolves.toBe(true);
    await expect(isBookmarked(guideBookmark.id, guideBookmark.type)).resolves.toBe(true);

    await expect(toggleBookmark(guideBookmark)).resolves.toBe(false);
    await expect(isBookmarked(guideBookmark.id, guideBookmark.type)).resolves.toBe(false);
  });
});
