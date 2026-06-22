import { getN2VocabSpeechText, normalizeN2SpeechText } from './n2SpeechText';

describe('n2SpeechText', () => {
  it('strips pitch accent markers', () => {
    expect(normalizeN2SpeechText('在留カード [3]')).toBe('在留カード');
  });

  it('prefers kana readings inside parentheses', () => {
    expect(getN2VocabSpeechText('在留カード(ざいりゅうカード)')).toBe('ざいりゅうカード');
  });

  it('removes leftover annotations and collapses spaces', () => {
    expect(normalizeN2SpeechText('  仕事（しごと）  [5]  ')).toBe('しごと');
  });
});
