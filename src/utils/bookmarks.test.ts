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

const dialogueBookmark: Bookmark = {
  type: 'dialogue',
  id: 'dialogue-phone-clinic',
  category: 'Gọi điện cho bệnh viện hoặc phòng khám',
  situation: 'Gọi điện đặt lịch khám',
  lines: [
    {
      speakerLabel: 'Bạn',
      jp: '今日診てもらえますか。',
      romaji: 'Kyou mite moraemasu ka.',
      vn: 'Hôm nay tôi có thể được khám không?',
    },
  ],
  savedAt: '',
};

const dailyLifeBookmark: Bookmark = {
  type: 'daily-life',
  id: 'hospital',
  title: 'Đi khám và bệnh viện',
  titleJp: '病院・クリニック',
  description: 'Cách đi khám, đặt lịch và chuẩn bị giấy tờ cần mang.',
  color: '#27AE60',
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
    await saveBookmarks([guideBookmark, dialogueBookmark]);

    await expect(loadBookmarks()).resolves.toEqual([guideBookmark, dialogueBookmark]);
  });

  it('adds and removes a bookmark with toggleBookmark', async () => {
    await expect(toggleBookmark(guideBookmark)).resolves.toBe(true);
    await expect(isBookmarked(guideBookmark.id, guideBookmark.type)).resolves.toBe(true);

    await expect(toggleBookmark(guideBookmark)).resolves.toBe(false);
    await expect(isBookmarked(guideBookmark.id, guideBookmark.type)).resolves.toBe(false);
  });

  it('supports dialogue bookmarks', async () => {
    await expect(toggleBookmark(dialogueBookmark)).resolves.toBe(true);
    await expect(isBookmarked(dialogueBookmark.id, dialogueBookmark.type)).resolves.toBe(true);
  });

  it('supports daily life bookmarks', async () => {
    await expect(toggleBookmark(dailyLifeBookmark)).resolves.toBe(true);
    await expect(isBookmarked(dailyLifeBookmark.id, dailyLifeBookmark.type)).resolves.toBe(true);
  });
});
