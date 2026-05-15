import { retrieveChatAnswer, SUGGESTED_QUESTIONS } from './chatRetrieval';

describe('retrieveChatAnswer', () => {
  it('returns empty result for empty query', () => {
    const r = retrieveChatAnswer('   ');
    expect(r.sources).toHaveLength(0);
    expect(r.bullets).toHaveLength(0);
    expect(r.confidence).toBe('low');
  });

  it('returns source guides and bullets for a clear admin-guide question', () => {
    const r = retrieveChatAnswer('Mất thẻ cư trú phải làm gì?');
    expect(r.sources.length).toBeGreaterThan(0);
    expect(r.sources.some((s) => s.id === 'lost-residence-card')).toBe(true);
    expect(r.bullets.length).toBeGreaterThan(0);
  });

  it('never returns ** markdown markers in synthesized bullets', () => {
    // Use a query that hits guides with **bold** in their content.
    const r = retrieveChatAnswer('jesta');
    for (const b of r.bullets) {
      expect(b.text).not.toMatch(/\*\*/);
    }
  });

  it('surfaces glossary terms when query matches a keyTerm', () => {
    // moving-in-notification ships with 転入届 in its keyTerms.
    const r = retrieveChatAnswer('転入届');
    expect(r.glossary.some((g) => g.term === '転入届')).toBe(true);
  });

  it('surfaces counter phrases when cited guide has one', () => {
    const r = retrieveChatAnswer('Mới chuyển nhà cần làm gì?');
    expect(r.counterPhrases.length).toBeGreaterThan(0);
    expect(r.counterPhrases[0].jp.length).toBeGreaterThan(0);
  });

  it('flags low confidence when there are no good matches', () => {
    const r = retrieveChatAnswer('xyz qwerty unrelated nonsense 123');
    expect(r.confidence).toBe('low');
  });

  it('each suggested question yields at least one source', () => {
    for (const q of SUGGESTED_QUESTIONS) {
      const r = retrieveChatAnswer(q);
      expect(r.sources.length).toBeGreaterThan(0);
    }
  });
});
