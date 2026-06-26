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

import { StorageKeys } from '../constants/storageKeys';
import {
  clearFuriganaReaderSession,
  loadFuriganaReaderSession,
  saveFuriganaReaderSession,
} from './furiganaSession';

describe('furiganaSession', () => {
  beforeEach(() => {
    mockAsyncStorage.clear();
  });

  it('saves and restores the last reader session', async () => {
    await saveFuriganaReaderSession({
      input: '日本語の文章。',
      tokens: [{ surface: '日本語', reading: 'にほんご' }],
      translationLines: [{ source: '日本語の文章。', translation: 'Một câu tiếng Nhật.' }],
      savedAt: 123,
    });

    await expect(loadFuriganaReaderSession()).resolves.toEqual({
      input: '日本語の文章。',
      tokens: [{ surface: '日本語', reading: 'にほんご' }],
      translationLines: [{ source: '日本語の文章。', translation: 'Một câu tiếng Nhật.' }],
      savedAt: 123,
    });

    expect(mockAsyncStorage.get(StorageKeys.furiganaReaderSession)).toBeTruthy();
  });

  it('removes the session when input is empty', async () => {
    await saveFuriganaReaderSession({
      input: '  ',
      tokens: [],
      translationLines: [],
      savedAt: 1,
    });

    await expect(loadFuriganaReaderSession()).resolves.toBeNull();
  });

  it('ignores invalid stored JSON', async () => {
    await mockAsyncStorage.set(StorageKeys.furiganaReaderSession, 'not-json');

    await expect(loadFuriganaReaderSession()).resolves.toBeNull();
  });

  it('clears the stored session explicitly', async () => {
    await mockAsyncStorage.set(
      StorageKeys.furiganaReaderSession,
      JSON.stringify({
        input: 'abc',
        tokens: [],
        translationLines: [],
        savedAt: 1,
      })
    );

    await clearFuriganaReaderSession();

    await expect(loadFuriganaReaderSession()).resolves.toBeNull();
  });
});
