import { searchAppContent, getRelatedGuides, getFeaturedGuides } from './searchIndex';

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

  // Phase 2A ranking guarantees.
  describe('phase 2A ranking', () => {
    it('JP-form query lands the JP-titled guide first', () => {
      const r = searchAppContent('永住');
      expect(r[0]?.id).toBe('permanent-residency-eijuu');
    });

    it('romaji query "zairyu card" surfaces the residence-card validity guide above generic policy hits', () => {
      const r = searchAppContent('zairyu card');
      expect(r[0]?.id).toBe('residence-card-validity');
    });

    it('"rikon" surfaces the divorce guide above tangential matches', () => {
      const r = searchAppContent('rikon');
      expect(r[0]?.id).toBe('divorce-custody-name-residence');
    });

    it('"quá hạn visa" surfaces the overstay guide first', () => {
      const r = searchAppContent('quá hạn visa');
      expect(r[0]?.id).toBe('overstaying-illegal-stay-procedures');
    });
  });
});

describe('getRelatedGuides', () => {
  it('returns same-category neighbours for overstay', () => {
    const r = getRelatedGuides('overstaying-illegal-stay-procedures', 5);
    expect(r.length).toBeGreaterThan(0);
    expect(r.map((g) => g.id)).not.toContain('overstaying-illegal-stay-procedures');
  });

  it('returns an empty list for unknown ids', () => {
    expect(getRelatedGuides('not-a-real-guide')).toEqual([]);
  });

  it('caps result count to the requested limit', () => {
    const r = getRelatedGuides('residence-card-validity', 3);
    expect(r.length).toBeLessThanOrEqual(3);
  });
});

describe('getFeaturedGuides', () => {
  it('returns only guide-type entries', () => {
    const r = getFeaturedGuides(10);
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.type === 'guide')).toBe(true);
  });
});
