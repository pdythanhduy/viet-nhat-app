import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadRecentlyViewedGuides,
  recordRecentlyViewedGuide,
  clearRecentlyViewedGuides,
} from './recentlyViewedGuides';
import { StorageKeys } from '../constants/storageKeys';

// Mirror the AsyncStorage mock used by bookmarks.test.ts so the storage
// calls run against an in-memory store instead of the missing native bridge.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('recentlyViewedGuides', () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem(StorageKeys.recentlyViewedGuides);
  });

  it('returns an empty list when storage is empty', async () => {
    expect(await loadRecentlyViewedGuides()).toEqual([]);
  });

  it('persists newly opened guides newest-first', async () => {
    await recordRecentlyViewedGuide('residence-card');
    await recordRecentlyViewedGuide('permanent-residency-eijuu');
    await recordRecentlyViewedGuide('overstaying-illegal-stay-procedures');

    const items = await loadRecentlyViewedGuides();
    expect(items.map((i) => i.guideId)).toEqual([
      'overstaying-illegal-stay-procedures',
      'permanent-residency-eijuu',
      'residence-card',
    ]);
  });

  it('dedupes — opening the same guide again moves it to the front', async () => {
    await recordRecentlyViewedGuide('a');
    await recordRecentlyViewedGuide('b');
    await recordRecentlyViewedGuide('c');
    await recordRecentlyViewedGuide('a');  // re-open a

    const ids = (await loadRecentlyViewedGuides()).map((i) => i.guideId);
    expect(ids).toEqual(['a', 'c', 'b']);
    expect(ids.length).toBe(3);
  });

  it('caps the list at MAX_ITEMS = 5', async () => {
    for (const id of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
      await recordRecentlyViewedGuide(id);
    }
    const items = await loadRecentlyViewedGuides();
    expect(items.length).toBe(5);
    expect(items.map((i) => i.guideId)).toEqual(['g', 'f', 'e', 'd', 'c']);
  });

  it('records an ISO-8601 viewedAt timestamp', async () => {
    await recordRecentlyViewedGuide('residence-card');
    const [item] = await loadRecentlyViewedGuides();
    expect(item.viewedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(() => new Date(item.viewedAt)).not.toThrow();
  });

  it('clearRecentlyViewedGuides empties the list', async () => {
    await recordRecentlyViewedGuide('a');
    await recordRecentlyViewedGuide('b');
    await clearRecentlyViewedGuides();
    expect(await loadRecentlyViewedGuides()).toEqual([]);
  });

  it('survives corrupt JSON in storage (returns empty list)', async () => {
    await AsyncStorage.setItem(StorageKeys.recentlyViewedGuides, 'not-valid-json');
    expect(await loadRecentlyViewedGuides()).toEqual([]);
  });
});
