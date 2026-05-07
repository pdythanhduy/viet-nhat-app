import AsyncStorage from '@react-native-async-storage/async-storage';

import { writeCache } from '../cache';
import { loadContent } from '../index';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-constants', () => ({
  expoConfig: { version: '1.3.0' },
}));

jest.mock('../fallback', () => ({
  BUNDLED: {
    'test.simple': () => ['bundled-a', 'bundled-b'],
    'test.with-cache': () => ['bundled-fallback'],
  },
}));

describe('loadContent', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns bundled data when no cache exists', async () => {
    await expect(loadContent<string[]>('test.simple')).resolves.toEqual([
      'bundled-a',
      'bundled-b',
    ]);
  });

  it('prefers fresh cached data over bundled fallback', async () => {
    await writeCache('test.with-cache', ['cached-value'], 1);

    await expect(loadContent<string[]>('test.with-cache')).resolves.toEqual([
      'cached-value',
    ]);
  });

  it('falls through to bundled when cache is older than ttlMs', async () => {
    await writeCache('test.with-cache', ['cached-value'], 1);

    await expect(
      loadContent<string[]>('test.with-cache', { ttlMs: 0 }),
    ).resolves.toEqual(['bundled-fallback']);
  });

  it('skips cache when forceRefresh is set', async () => {
    await writeCache('test.with-cache', ['cached-value'], 1);

    await expect(
      loadContent<string[]>('test.with-cache', { forceRefresh: true }),
    ).resolves.toEqual(['bundled-fallback']);
  });

  it('throws when no bundled fallback exists for the key', async () => {
    await expect(loadContent('unknown.key')).rejects.toThrow(/No bundled fallback/);
  });
});
