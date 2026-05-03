import { searchAppContent } from './searchIndex';

describe('searchAppContent', () => {
  it('finds results without accents', () => {
    const results = searchAppContent('bao hiem');
    expect(results.length).toBeGreaterThan(0);
  });

  it('prioritizes direct title matches', () => {
    const results = searchAppContent('thẻ cư trú');
    expect(results[0]?.title).toContain('Thẻ cư trú');
  });

  it.each([
    ['gaimen', 'drivers-license'],
    ['eijuu', 'permanent-residency-eijuu'],
    ['hanko', 'hanko-inkan'],
  ])('includes admin guide search keyword metadata for %s', (query, guideId) => {
    const results = searchAppContent(query);
    expect(results.map((item) => item.id)).toContain(guideId);
  });
});
