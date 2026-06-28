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

import { explainJapaneseSentenceForStudy } from './smartTranslation';

function claudeText(text: string) {
  return { content: [{ type: 'text', text }] };
}

describe('sentenceStudy', () => {
  beforeEach(() => {
    mockAsyncStorage.clear();
    mockProxy.mockReset();
  });

  it('returns structured study help for a sentence', async () => {
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify({
          source: '今日は雨です。',
          translation: 'Hôm nay trời mưa.',
          summary: 'Câu này nói thời tiết hôm nay.',
          grammarNote: 'です là mẫu câu khẳng định lịch sự.',
          learningTip: 'Chú ý 今日は + danh từ + です.',
          vocabulary: [
            { surface: '今日', reading: 'きょう', meaning: 'hôm nay' },
            { surface: '雨', reading: 'あめ', meaning: 'mưa' },
          ],
        })
      )
    );

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
    mockProxy.mockResolvedValueOnce(claudeText('Cau nay nhan manh mau です.'));

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
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify({
          source: '今日は雨です。',
          translation: 'Hôm nay trời mưa.',
          summary: 'Câu này nói thời tiết hôm nay.',
          grammarNote: 'です là mẫu câu khẳng định lịch sự.',
          vocabulary: [],
        })
      )
    );

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

    expect(mockProxy).toHaveBeenCalledTimes(1);
  });
});
