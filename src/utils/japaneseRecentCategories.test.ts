import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadRecentJapaneseCategories,
  recordRecentJapaneseCategory,
  saveRecentJapaneseCategories,
} from './japaneseRecentCategories';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('japaneseRecentCategories', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('loads an empty list when storage is empty', async () => {
    await expect(loadRecentJapaneseCategories()).resolves.toEqual([]);
  });

  it('saves and loads recent categories', async () => {
    const items = [
      {
        categoryName: 'Công việc và hợp đồng',
        categoryColor: '#8E44AD',
        practicedAt: '2026-04-12T00:00:00.000Z',
      },
    ];

    await saveRecentJapaneseCategories(items);
    await expect(loadRecentJapaneseCategories()).resolves.toEqual(items);
  });

  it('records unique recent categories and keeps newest first', async () => {
    await recordRecentJapaneseCategory('Cơ quan và giấy tờ', '#1F618D');
    await recordRecentJapaneseCategory('Đi khám và sức khỏe', '#C0392B');
    await recordRecentJapaneseCategory('Cơ quan và giấy tờ', '#1F618D');

    const items = await loadRecentJapaneseCategories();
    expect(items).toHaveLength(2);
    expect(items[0].categoryName).toBe('Cơ quan và giấy tờ');
    expect(items[1].categoryName).toBe('Đi khám và sức khỏe');
  });
});
