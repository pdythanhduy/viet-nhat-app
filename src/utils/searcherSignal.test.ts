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

// Phase 2C review hardening — defenses against awkward Home layouts.
describe('home layout safety contract', () => {
  beforeEach(async () => {
    await _resetSearcherSignalForTests();
  });

  it('first-time user is ALWAYS in cold_start (never loses onboarding)', async () => {
    // No prior storage write → count is 0 → variant is cold_start.
    expect(await getSearcherSignal()).toBe(0);
    expect(getHomeLayoutVariant(0)).toBe('cold_start');
  });

  it('corrupt storage falls through to cold_start, NOT a blank or hidden Home', async () => {
    // Three flavors of corrupt storage. Each must default to 0 ⇒
    // cold_start so the StartHere row is shown — onboarding stays
    // intact even after a storage bug or schema migration.
    const corruptValues = ['NaN', '-999', '{"oops":true}', ''];
    for (const value of corruptValues) {
      await AsyncStorage.setItem('searcher_signal_v1', value);
      const count = await getSearcherSignal();
      expect(count).toBe(0);
      expect(getHomeLayoutVariant(count)).toBe('cold_start');
    }
  });

  it('the counter is monotonic — never decrements (returning casual stays in searcher mode)', async () => {
    // Documents the intentional non-decay behavior. A user who
    // crossed SEARCHER_THRESHOLD then stops searching for weeks
    // STAYS in searcher mode. If decay is wanted, a separate
    // timestamp-based reset would be needed — out of v1.5.2 scope.
    for (let i = 0; i < SEARCHER_THRESHOLD + 3; i++) {
      await incrementSearcherSignal();
    }
    expect(await getSearcherSignal()).toBe(SEARCHER_THRESHOLD + 3);
    // Simulate "weeks later" by simply re-reading — no decay logic
    // exists, so the count survives untouched.
    expect(await getSearcherSignal()).toBe(SEARCHER_THRESHOLD + 3);
    expect(getHomeLayoutVariant(SEARCHER_THRESHOLD + 3)).toBe('searcher');
  });

  it('reset returns the user to cold_start (test-only helper, mirrors app uninstall)', async () => {
    for (let i = 0; i < SEARCHER_THRESHOLD + 1; i++) {
      await incrementSearcherSignal();
    }
    expect(isSearcherMode(await getSearcherSignal())).toBe(true);

    await _resetSearcherSignalForTests();
    expect(await getSearcherSignal()).toBe(0);
    expect(getHomeLayoutVariant(await getSearcherSignal())).toBe('cold_start');
  });

  it('threshold-exactly = searcher (boundary is inclusive)', () => {
    // Locks the boundary semantic. `isSearcherMode(5) === true`.
    // Flipping to strict-greater-than would silently delay the
    // layout change by one search — keep this test in place even
    // if the threshold is later tuned.
    expect(isSearcherMode(SEARCHER_THRESHOLD)).toBe(true);
    expect(isSearcherMode(SEARCHER_THRESHOLD - 1)).toBe(false);
  });
});
