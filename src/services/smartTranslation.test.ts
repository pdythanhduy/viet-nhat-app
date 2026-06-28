// smartTranslation.ts now calls Claude through the anthropic-proxy Edge
// Function. We mock that seam (callAnthropicProxy), which returns a parsed
// Claude Messages response, so these tests cover parsing/caching, not transport.

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

const mockProxy = jest.fn();
jest.mock('./anthropicProxy', () => ({
  callAnthropicProxy: (...args: unknown[]) => mockProxy(...args),
  isAnthropicProxyConfigured: () => true,
}));

import {
  explainJapaneseSelection,
  getArticleExcerpt,
  getSentenceAtOffset,
  splitJapaneseSentences,
  translateSentencesSmart,
} from './smartTranslation';

function claudeText(text: string) {
  return { content: [{ type: 'text', text }] };
}

describe('smartTranslation', () => {
  beforeEach(() => {
    mockAsyncStorage.clear();
    mockProxy.mockReset();
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
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify([
          { source: '今日は雨です。', translation: 'Hôm nay trời mưa.' },
          { source: '明日は晴れます。', translation: 'Ngày mai trời nắng.' },
        ])
      )
    );

    await expect(translateSentencesSmart('今日は雨です。明日は晴れます。')).resolves.toEqual([
      { source: '今日は雨です。', translation: 'Hôm nay trời mưa.' },
      { source: '明日は晴れます。', translation: 'Ngày mai trời nắng.' },
    ]);

    const payload = mockProxy.mock.calls[0][0] as { messages: Array<{ content: string }> };
    expect(payload.messages[0].content).toContain('今日は雨です。');
  });

  it('explains a selected token using sentence context', async () => {
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify({
          surface: '雨',
          reading: 'あめ',
          meaning: 'mưa',
          sentenceTranslation: 'Hôm nay trời mưa.',
          note: 'Danh từ.',
        })
      )
    );

    await expect(
      explainJapaneseSelection({ surface: '雨', reading: 'あめ', sentence: '今日は雨です。' })
    ).resolves.toEqual({
      surface: '雨',
      reading: 'あめ',
      meaning: 'mưa',
      sentenceTranslation: 'Hôm nay trời mưa.',
      note: 'Danh từ.',
    });
  });

  it('caches word explanations and does not send extra context', async () => {
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify({
          surface: '雨',
          reading: 'あめ',
          meaning: 'mưa',
          sentenceTranslation: 'Hôm nay trời mưa.',
        })
      )
    );

    const input = {
      surface: '雨',
      reading: 'あめ',
      sentence: '今日は雨です。',
      articleExcerpt: '余分な文脈はキャッシュキーにもClaudeにも送らない。',
    };

    await explainJapaneseSelection(input);
    const payload = mockProxy.mock.calls[0][0] as { messages: Array<{ content: string }> };
    expect(payload.messages[0].content).not.toContain('articleExcerpt');
    expect(payload.messages[0].content).not.toContain('余分');

    await expect(explainJapaneseSelection(input)).resolves.toMatchObject({
      surface: '雨',
      meaning: 'mưa',
      sentenceTranslation: 'Hôm nay trời mưa.',
    });

    // Second call served from cache → proxy only hit once.
    expect(mockProxy).toHaveBeenCalledTimes(1);
  });

  it('falls back to raw Claude text for non-JSON word lookup responses', async () => {
    mockProxy.mockResolvedValueOnce(claudeText('雨: nghĩa là mưa trong câu này.'));

    await expect(
      explainJapaneseSelection({ surface: '雨', reading: 'あめ', sentence: '今日は雨です。' })
    ).resolves.toMatchObject({
      surface: '雨',
      reading: 'あめ',
      meaning: '雨: nghĩa là mưa trong câu này.',
      sentenceTranslation: '今日は雨です。',
      note: 'Phản hồi không đúng JSON; app đang hiển thị nội dung thô.',
    });
  });

  it('propagates proxy errors (e.g. forbidden / not configured)', async () => {
    mockProxy.mockRejectedValueOnce(new Error('not-configured'));
    await expect(translateSentencesSmart('今日は雨です。')).rejects.toThrow('not-configured');
  });
});
