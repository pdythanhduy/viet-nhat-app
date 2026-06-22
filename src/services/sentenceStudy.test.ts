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
    clear: jest.fn(() => {
      mockAsyncStorage.clear();
      return Promise.resolve();
    }),
  },
}));

import { explainJapaneseSentenceForStudy } from './smartTranslation';

type MockFetchResponse = {
  ok: boolean;
  status: number;
  text: () => Promise<string>;
};

const originalApiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
const originalFetch = globalThis.fetch;
const fetchMock = jest.fn<Promise<MockFetchResponse>, [string, RequestInit | undefined]>();

function setMockFetch() {
  (globalThis as unknown as { fetch: typeof fetchMock }).fetch = fetchMock;
}

function restoreEnv() {
  if (originalApiKey === undefined) {
    delete process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  } else {
    process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY = originalApiKey;
  }
}

describe('sentenceStudy', () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY = 'test-key';
    mockAsyncStorage.clear();
    fetchMock.mockReset();
    setMockFetch();
  });

  afterEach(() => {
    restoreEnv();
    (globalThis as unknown as { fetch: typeof originalFetch }).fetch = originalFetch;
  });

  it('returns structured study help for a sentence', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                source: '今日は雨です。',
                translation: 'Hôm nay trời mưa.',
                summary: 'Câu này nói thời tiết hôm nay.',
                grammarNote: 'です là mẫu câu khẳng định lịch sự.',
                learningTip: 'Chú ý 今日は + danh từ + です.',
                vocabulary: [
                  { surface: '今日', reading: 'きょう', meaning: 'hôm nay' },
                  { surface: '雨', reading: 'あめ', meaning: 'mưa' },
                ],
              }),
            },
          ],
        }),
    });

    await expect(
      explainJapaneseSentenceForStudy({
        source: '今日は雨です。',
        translation: 'Hôm nay trời mưa.',
      })
    ).resolves.toEqual({
      source: '今日は雨です。',
      translation: 'Hôm nay trời mưa.',
      summary: 'Câu này nói thời tiết hôm nay.',
      grammarNote: 'です là mẫu câu khẳng định lịch sự.',
      learningTip: 'Chú ý 今日は + danh từ + です.',
      vocabulary: [
        { surface: '今日', reading: 'きょう', meaning: 'hôm nay' },
        { surface: '雨', reading: 'あめ', meaning: 'mưa' },
      ],
    });
  });

  it('falls back to raw text when the model response is not JSON', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [{ type: 'text', text: 'Cau nay nhan manh mau です.' }],
        }),
    });

    await expect(
      explainJapaneseSentenceForStudy({
        source: '今日は雨です。',
        translation: 'Hôm nay trời mưa.',
      })
    ).resolves.toMatchObject({
      source: '今日は雨です。',
      translation: 'Hôm nay trời mưa.',
      summary: 'Cau nay nhan manh mau です.',
      vocabulary: [],
    });
  });

  it('caches study explanations by sentence and translation', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                source: '今日は雨です。',
                translation: 'Hôm nay trời mưa.',
                summary: 'Câu này nói thời tiết hôm nay.',
                grammarNote: 'です là mẫu câu khẳng định lịch sự.',
                vocabulary: [],
              }),
            },
          ],
        }),
    });

    const input = {
      source: '今日は雨です。',
      translation: 'Hôm nay trời mưa.',
    };

    await expect(explainJapaneseSentenceForStudy(input)).resolves.toMatchObject({
      source: '今日は雨です。',
      translation: 'Hôm nay trời mưa.',
    });
    await expect(explainJapaneseSentenceForStudy(input)).resolves.toMatchObject({
      source: '今日は雨です。',
      translation: 'Hôm nay trời mưa.',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
