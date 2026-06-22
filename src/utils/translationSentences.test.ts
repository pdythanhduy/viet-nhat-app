import { splitJapaneseSentences } from './translationSentences';

describe('splitJapaneseSentences', () => {
  it('splits on Japanese punctuation and keeps punctuation attached', () => {
    expect(splitJapaneseSentences('今日は晴れです。明日も晴れです！')).toEqual([
      '今日は晴れです。',
      '明日も晴れです！',
    ]);
  });

  it('falls back to one segment when punctuation is missing', () => {
    expect(splitJapaneseSentences('在留カードを確認してください')).toEqual([
      '在留カードを確認してください',
    ]);
  });
});

