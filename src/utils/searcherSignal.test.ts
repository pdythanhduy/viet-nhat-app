jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SEARCHER_THRESHOLD,
  getHomeLayoutVariant,
  getSearcherSignal,
  incrementSearcherSignal,
  isSearcherMode,
  _resetSearcherSignalForTests,
} from './searcherSignal';

describe('searcherSignal storage', () => {
  beforeEach(async () => {
    await _resetSearcherSignalForTests();
  });

  it('returns 0 when storage is empty', async () => {
    expect(await getSearcherSignal()).toBe(0);
  });

  it('increments by 1 and persists', async () => {
    expect(await incrementSearcherSignal()).toBe(1);
    expect(await incrementSearcherSignal()).toBe(2);
    expect(await getSearcherSignal()).toBe(2);
  });

  it('reaches the threshold after exactly SEARCHER_THRESHOLD increments', async () => {
    for (let i = 0; i < SEARCHER_THRESHOLD; i++) {
      await incrementSearcherSignal();
    }
    expect(await getSearcherSignal()).toBe(SEARCHER_THRESHOLD);
    expect(isSearcherMode(SEARCHER_THRESHOLD)).toBe(true);
  });

  it('returns 0 for corrupt non-numeric storage', async () => {
    await AsyncStorage.setItem('searcher_signal_v1', 'not-a-number');
    expect(await getSearcherSignal()).toBe(0);
  });

  it('returns 0 for corrupt negative storage', async () => {
    await AsyncStorage.setItem('searcher_signal_v1', '-3');
    expect(await getSearcherSignal()).toBe(0);
  });

  it('survives storage read throw (mock then restore)', async () => {
    const orig = AsyncStorage.getItem;
    (AsyncStorage as unknown as { getItem: (k: string) => Promise<string | null> }).getItem = () =>
      Promise.reject(new Error('quota exceeded'));
    try {
      expect(await getSearcherSignal()).toBe(0);
    } finally {
      (AsyncStorage as unknown as { getItem: (k: string) => Promise<string | null> }).getItem = orig;
    }
  });
});

describe('isSearcherMode', () => {
  it.each([
    [0, false],
    [1, false],
    [SEARCHER_THRESHOLD - 1, false],
    [SEARCHER_THRESHOLD, true],
    [SEARCHER_THRESHOLD + 1, true],
    [100, true],
  ])('count=%d → %s', (count, expected) => {
    expect(isSearcherMode(count)).toBe(expected);
  });
});

describe('getHomeLayoutVariant', () => {
  it('returns "cold_start" below threshold', () => {
    expect(getHomeLayoutVariant(0)).toBe('cold_start');
    expect(getHomeLayoutVariant(SEARCHER_THRESHOLD - 1)).toBe('cold_start');
  });

  it('returns "searcher" at and above threshold', () => {
    expect(getHomeLayoutVariant(SEARCHER_THRESHOLD)).toBe('searcher');
    expect(getHomeLayoutVariant(SEARCHER_THRESHOLD + 10)).toBe('searcher');
  });
});
