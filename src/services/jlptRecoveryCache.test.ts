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

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { version: '9.9.9' } },
}));

import {
  extractJson,
  getAppVersion,
  readCache,
  stableHash,
  toAsciiJson,
  writeCache,
} from './jlptRecoveryCache';

const CACHE_PREFIX = 'jlpt_recovery_cache_v1::';

describe('jlptRecoveryCache', () => {
  beforeEach(() => {
    mockAsyncStorage.clear();
  });

  describe('toAsciiJson', () => {
    it('escapes non-ASCII characters but stays JSON-parseable', () => {
      const value = { jp: '日本語', tag: 'café' };
      const ascii = toAsciiJson(value);
      expect(ascii).not.toMatch(/[^\x00-\x7F]/);
      expect(JSON.parse(ascii)).toEqual(value);
    });
  });

  describe('stableHash', () => {
    it('is deterministic and order-sensitive', () => {
      expect(stableHash('abc')).toBe(stableHash('abc'));
      expect(stableHash('abc')).not.toBe(stableHash('acb'));
    });
  });

  describe('extractJson', () => {
    it('parses plain JSON', () => {
      expect(extractJson('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('extracts an array embedded in prose', () => {
      expect(extractJson('Here you go: [{"a":1}] thanks')).toEqual([{ a: 1 }]);
    });

    it('extracts an object embedded in prose', () => {
      expect(extractJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
    });

    it('throws when there is no JSON at all', () => {
      expect(() => extractJson('no json here')).toThrow();
    });
  });

  describe('readCache / writeCache', () => {
    it('round-trips data through the envelope', async () => {
      await writeCache('day1', { vocab: ['a'] }, 1);
      const env = await readCache<{ vocab: string[] }>('day1', 1);
      expect(env?.data).toEqual({ vocab: ['a'] });
      expect(env?.schemaVersion).toBe(1);
      expect(env?.appVersion).toBe(getAppVersion());
    });

    it('invalidates on schema version mismatch', async () => {
      await writeCache('day1', { vocab: ['a'] }, 1);
      expect(await readCache('day1', 2)).toBeNull();
    });

    it('still returns data when the stored appVersion differs', async () => {
      // Simulate a cache written by an older app build.
      mockAsyncStorage.set(
        `${CACHE_PREFIX}day1`,
        JSON.stringify({
          schemaVersion: 1,
          fetchedAt: 1,
          appVersion: '0.0.1-old',
          data: { vocab: ['a'] },
        })
      );
      const env = await readCache<{ vocab: string[] }>('day1', 1);
      expect(env?.data).toEqual({ vocab: ['a'] });
    });

    it('returns null for a missing key', async () => {
      expect(await readCache('nope', 1)).toBeNull();
    });

    it('returns null for corrupt JSON', async () => {
      mockAsyncStorage.set(`${CACHE_PREFIX}day1`, 'not-json');
      expect(await readCache('day1', 1)).toBeNull();
    });
  });
});
