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

import {
  explainJapaneseSelection,
  getArticleExcerpt,
  getSentenceAtOffset,
  splitJapaneseSentences,
  translateSentencesSmart,
} from './smartTranslation';

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

describe('smartTranslation', () => {
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

  it('splits Japanese text into sentence-like chunks', () => {
    expect(splitJapaneseSentences('今日は雨です。明日は晴れます！\n注意してください')).toEqual([
      '今日は雨です。',
      '明日は晴れます！',
      '注意してください',
    ]);
  });

  it('extracts the sentence and nearby article context around an offset', () => {
    const text = '一つ目です。二つ目の文です。三つ目です。';
    const offset = text.indexOf('文');

    expect(getSentenceAtOffset(text, offset)).toBe('二つ目の文です。');
    expect(getArticleExcerpt(text, offset, 4)).toContain('文');
  });

  it('translates all sentences through Claude JSON', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: JSON.stringify([
                { source: '今日は雨です。', translation: 'Hôm nay trời mưa.' },
                { source: '明日は晴れます。', translation: 'Ngày mai trời nắng.' },
              ]),
            },
          ],
        }),
    });

    await expect(translateSentencesSmart('今日は雨です。明日は晴れます。')).resolves.toEqual([
      { source: '今日は雨です。', translation: 'Hôm nay trời mưa.' },
      { source: '明日は晴れます。', translation: 'Ngày mai trời nắng.' },
    ]);

    const [url, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(String(init?.body)) as {
      messages: Array<{ content: string }>;
    };

    expect(url).toBe('https://api.anthropic.com/v1/messages');
    expect(init?.headers).toMatchObject({
      'x-api-key': 'test-key',
      'anthropic-version': '2023-06-01',
    });
    expect(String(init?.body)).toContain('\\u4eca\\u65e5');
    expect(body.messages[0].content).toContain('今日は雨です。');
  });

  it('explains a selected token using sentence context', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                surface: '雨',
                reading: 'あめ',
                meaning: 'mưa',
                sentenceTranslation: 'Hôm nay trời mưa.',
                note: 'Danh từ.',
              }),
            },
          ],
        }),
    });

    await expect(
      explainJapaneseSelection({
        surface: '雨',
        reading: 'あめ',
        sentence: '今日は雨です。',
      })
    ).resolves.toEqual({
      surface: '雨',
      reading: 'あめ',
      meaning: 'mưa',
      sentenceTranslation: 'Hôm nay trời mưa.',
      note: 'Danh từ.',
    });
  });

  it('caches word explanations by selected word and sentence', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                surface: '雨',
                reading: 'あめ',
                meaning: 'mưa',
                sentenceTranslation: 'Hôm nay trời mưa.',
              }),
            },
          ],
        }),
    });

    const input = {
      surface: '雨',
      reading: 'あめ',
      sentence: '今日は雨です。',
      articleExcerpt: '余分な文脈はキャッシュキーにもClaudeにも送らない。',
    };

    await explainJapaneseSelection(input);
    const [, init] = fetchMock.mock.calls[0];
    expect(String(init?.body)).not.toContain('articleExcerpt');
    expect(String(init?.body)).not.toContain('余分');
    await expect(explainJapaneseSelection(input)).resolves.toMatchObject({
      surface: '雨',
      meaning: 'mưa',
      sentenceTranslation: 'Hôm nay trời mưa.',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('falls back to raw Claude text for non-JSON word lookup responses', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          content: [
            {
              type: 'text',
              text: '雨: nghĩa là mưa trong câu này.',
            },
          ],
        }),
    });

    await expect(
      explainJapaneseSelection({
        surface: '雨',
        reading: 'あめ',
        sentence: '今日は雨です。',
      })
    ).resolves.toMatchObject({
      surface: '雨',
      reading: 'あめ',
      meaning: '雨: nghĩa là mưa trong câu này.',
      sentenceTranslation: '今日は雨です。',
      note: 'Phản hồi không đúng JSON; app đang hiển thị nội dung thô.',
    });
  });

  it('throws a readable error when Claude API returns a non-JSON body', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 502,
      text: async () => 'html bad gateway',
    });

    await expect(translateSentencesSmart('今日は雨です。')).rejects.toThrow(
      'Claude API returned a non-JSON response: html bad gateway'
    );
  });

  it('throws not-configured without Anthropic key', async () => {
    delete process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

    await expect(translateSentencesSmart('今日は雨です。')).rejects.toThrow('not-configured');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
