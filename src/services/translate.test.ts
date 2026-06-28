// translate.ts now calls Claude through the anthropic-proxy Edge Function, so
// we mock that seam (callAnthropicProxy) instead of global fetch.

const mockProxy = jest.fn();

jest.mock('./anthropicProxy', () => ({
  callAnthropicProxy: (...args: unknown[]) => mockProxy(...args),
  isAnthropicProxyConfigured: () => true,
}));

jest.mock('../utils/translationSentences', () => ({
  splitJapaneseSentences: (text: string) => text.split('|').map((part) => part.trim()).filter(Boolean),
}));

import {
  translateJapaneseSentencesToVietnamese,
  translateToVietnamese,
} from './translate';

function claudeText(text: string) {
  return { content: [{ type: 'text', text }] };
}

describe('translate', () => {
  beforeEach(() => {
    mockProxy.mockReset();
  });

  it('translates a single block of text', async () => {
    mockProxy.mockResolvedValueOnce(claudeText('Xin chao Viet Nam'));
    await expect(translateToVietnamese('any text')).resolves.toBe('Xin chao Viet Nam');
  });

  it('translates sentence arrays and returns source/translation pairs', async () => {
    mockProxy.mockResolvedValueOnce(
      claudeText(
        JSON.stringify([
          { source: 'sentence-a', translation: 'translation-a' },
          { source: 'sentence-b', translation: 'translation-b' },
        ])
      )
    );

    await expect(
      translateJapaneseSentencesToVietnamese('sentence-a|sentence-b')
    ).resolves.toEqual([
      { source: 'sentence-a', translation: 'translation-a' },
      { source: 'sentence-b', translation: 'translation-b' },
    ]);

    const payload = mockProxy.mock.calls[0][0] as { messages: Array<{ content: string }> };
    expect(payload.messages[0].content).toContain('sentence-a');
    expect(payload.messages[0].content).toContain('sentence-b');
  });

  it('falls back to per-sentence translation when JSON parsing fails', async () => {
    mockProxy
      .mockResolvedValueOnce(claudeText('plain translation that is not JSON'))
      .mockResolvedValueOnce(claudeText('Sentence one translated'))
      .mockResolvedValueOnce(claudeText('Sentence two translated'));

    await expect(translateJapaneseSentencesToVietnamese('one|two')).resolves.toEqual([
      { source: 'one', translation: 'Sentence one translated' },
      { source: 'two', translation: 'Sentence two translated' },
    ]);

    expect(mockProxy).toHaveBeenCalledTimes(3);
  });
});
