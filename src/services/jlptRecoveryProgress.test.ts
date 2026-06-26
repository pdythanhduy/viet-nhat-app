const mockAsyncStorage = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn((key: string) => Promise.resolve(mockAsyncStorage.get(key) ?? null)),
    setItem: jest.fn((key: string, value: string) => {
      mockAsyncStorage.set(key, value);
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      mockAsyncStorage.delete(key);
      return Promise.resolve();
    }),
  },
}));

import {
  getCurrentDay,
  getProgress,
  isDayDone,
  isLoaded,
  loadProgress,
  subscribeProgress,
  toggleDay,
} from './jlptRecoveryProgress';

const STORAGE_KEY = 'jlpt_recovery_progress_v1:N5';

describe('jlptRecoveryProgress', () => {
  beforeEach(async () => {
    mockAsyncStorage.clear();
    // Reset the in-module store for this level back to an empty state.
    await loadProgress('N5');
  });

  it('starts empty and marks itself loaded', async () => {
    expect(isLoaded('N5')).toBe(true);
    expect(getProgress('N5')).toEqual({ completedDays: [] });
  });

  it('toggles a day on and off and persists it', async () => {
    await toggleDay('N5', 3);
    expect(isDayDone('N5', 3)).toBe(true);
    expect(getProgress('N5')).toEqual({ completedDays: [3] });
    expect(mockAsyncStorage.get(STORAGE_KEY)).toContain('3');

    await toggleDay('N5', 3);
    expect(isDayDone('N5', 3)).toBe(false);
    expect(getProgress('N5')).toEqual({ completedDays: [] });
  });

  it('keeps completed days sorted and unique', async () => {
    await toggleDay('N5', 5);
    await toggleDay('N5', 2);
    await toggleDay('N5', 9);
    expect(getProgress('N5').completedDays).toEqual([2, 5, 9]);
  });

  it('reports the first incomplete day as the current day', async () => {
    expect(getCurrentDay('N5')).toBe(1);
    await toggleDay('N5', 1);
    await toggleDay('N5', 2);
    expect(getCurrentDay('N5')).toBe(3);
  });

  it('sanitizes out-of-range and malformed days on load', async () => {
    mockAsyncStorage.set(
      STORAGE_KEY,
      JSON.stringify({ completedDays: [0, 5, 5, 999, 'x', -1, 12] })
    );
    const progress = await loadProgress('N5');
    // N5 has 60 days; 0, 999, 'x', -1 are dropped and duplicates collapsed.
    expect(progress.completedDays).toEqual([5, 12]);
  });

  it('notifies subscribers when progress changes', async () => {
    const seen: number[][] = [];
    const unsub = subscribeProgress('N5', (p) => seen.push(p.completedDays));
    await toggleDay('N5', 4);
    unsub();
    await toggleDay('N5', 7);
    expect(seen).toContainEqual([4]);
    // After unsubscribing, no further updates are recorded.
    expect(seen).not.toContainEqual([4, 7]);
  });
});
