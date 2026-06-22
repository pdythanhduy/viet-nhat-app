type MockFetchResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

const originalApiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
const originalFetch = globalThis.fetch;
const fetchMock = jest.fn<Promise<MockFetchResponse>, [string, RequestInit | undefined]>();

jest.mock('../utils/translationSentences', () => ({
  splitJapaneseSentences: (text: string) => text.split('|').map((part) => part.trim()).filter(Boolean),
}));

import {
  translateJapaneseSentencesToVietnamese,
  translateToVietnamese,
} from './translate';

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

describe('translate', () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY = 'test-key';
    fetchMock.mockReset();
    setMockFetch();
  });

  afterEach(() => {
    restoreEnv();
    (globalThis as unknown as { fetch: typeof originalFetch }).fetch = originalFetch;
  });

  it('translates a single block of text', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        content: [{ type: 'text', text: 'Xin chao Viet Nam' }],
      }),
    });

    await expect(translateToVietnamese('any text')).resolves.toBe('Xin chao Viet Nam');
  });

  it('translates sentence arrays and returns source/translation pairs', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify([
              { source: 'sentence-a', translation: 'translation-a' },
              { source: 'sentence-b', translation: 'translation-b' },
            ]),
          },
        ],
      }),
    });

    await expect(
      translateJapaneseSentencesToVietnamese('sentence-a|sentence-b')
    ).resolves.toEqual([
      { source: 'sentence-a', translation: 'translation-a' },
      { source: 'sentence-b', translation: 'translation-b' },
    ]);

    const [url, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(String(init?.body)) as {
      messages: Array<{ content: string }>;
    };

    expect(url).toBe('https://api.anthropic.com/v1/messages');
    expect(body.messages[0].content).toContain('sentence-a');
    expect(body.messages[0].content).toContain('sentence-b');
  });

  it('falls back to per-sentence translation when JSON parsing fails', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          content: [{ type: 'text', text: 'plain translation that is not JSON' }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          content: [{ type: 'text', text: 'Sentence one translated' }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          content: [{ type: 'text', text: 'Sentence two translated' }],
        }),
      });

    await expect(translateJapaneseSentencesToVietnamese('one|two')).resolves.toEqual([
      { source: 'one', translation: 'Sentence one translated' },
      { source: 'two', translation: 'Sentence two translated' },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
