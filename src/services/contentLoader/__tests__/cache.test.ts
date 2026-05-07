import AsyncStorage from '@react-native-async-storage/async-storage';

import { clearCache, readCache, writeCache } from '../cache';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-constants', () => ({
  expoConfig: { version: '1.3.0' },
}));

describe('contentLoader cache', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns null when nothing has been cached', async () => {
    await expect(readCache('japanese.words', 1)).resolves.toBeNull();
  });

  it('round-trips written data', async () => {
    await writeCache('japanese.words', [{ word: 'テスト' }], 1);
    const cached = await readCache<Array<{ word: string }>>('japanese.words', 1);

    expect(cached).not.toBeNull();
    expect(cached?.data).toEqual([{ word: 'テスト' }]);
    expect(cached?.schemaVersion).toBe(1);
    expect(cached?.appVersion).toBe('1.3.0');
    expect(typeof cached?.fetchedAt).toBe('number');
  });

  it('treats schema-version mismatch as a cache miss', async () => {
    await writeCache('japanese.words', [{ word: 'テスト' }], 1);
    await expect(readCache('japanese.words', 2)).resolves.toBeNull();
  });

  it('clears one key without affecting others', async () => {
    await writeCache('japanese.words', ['a'], 1);
    await writeCache('japanese.grammar', ['b'], 1);

    await clearCache('japanese.words');

    await expect(readCache('japanese.words', 1)).resolves.toBeNull();
    const grammar = await readCache<string[]>('japanese.grammar', 1);
    expect(grammar?.data).toEqual(['b']);
  });

  it('clears every cache entry when no key is specified', async () => {
    await writeCache('japanese.words', ['a'], 1);
    await writeCache('japanese.grammar', ['b'], 1);

    await clearCache();

    await expect(readCache('japanese.words', 1)).resolves.toBeNull();
    await expect(readCache('japanese.grammar', 1)).resolves.toBeNull();
  });

  it('does not touch unrelated AsyncStorage keys when clearing', async () => {
    await AsyncStorage.setItem('unrelated_key', 'keep-me');
    await writeCache('japanese.words', ['a'], 1);

    await clearCache();

    await expect(AsyncStorage.getItem('unrelated_key')).resolves.toBe('keep-me');
  });
});
