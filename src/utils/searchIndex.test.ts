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

  // Defensive pinned-ranking guarantees (2026-05-19). Locks in the
  // CURRENT top-1 for queries where the answer is unambiguous. Future
  // ranking changes (Phase 2C, typo tolerance, etc.) must preserve
  // these — if a refactor changes top-1 for a query here, either the
  // refactor is wrong or the expectation needs an explicit update
  // documented in the PR body.
  describe('pinned top-1 guarantees', () => {
    it.each([
      // JP-form queries — the most precise user intent
      ['永住', 'permanent-residency-eijuu'],
      ['住民税', 'juminzei-local-tax'],
      ['離婚', 'divorce-custody-name-residence'],
      ['確定申告', 'kakutei-shinkoku'],
      ['健康診断', 'annual-health-checkup-kensin'],
      ['転入届', 'moving-in-notification'],

      // Romaji — what users type when they know the JP term but lack IME
      ['eijuu', 'permanent-residency-eijuu'],
      ['juminzei', 'juminzei-local-tax'],
      ['kensin', 'annual-health-checkup-kensin'],
      ['tennyu', 'moving-in-notification'],
      ['hanko', 'hanko-inkan'],
      ['gentsuki', 'moped-motorcycle-registration'],

      // VI no-diacritic — most common typed form (no IME assist)
      ['vinh tru', 'permanent-residency-eijuu'],
      ['ly hon', 'divorce-custody-name-residence'],
      ['kham suc khoe', 'annual-health-checkup-kensin'],
      ['bao hiem xe dap', 'bicycle-insurance'],

      // EN fallback — international audience or partial Japan vocabulary
      ['permanent residency', 'permanent-residency-eijuu'],
      ['health insurance', 'health-insurance'],
      ['work accident', 'workplace-accident-rousai'],
      ['tax return', 'kakutei-shinkoku'],

      // Phase 2C-prep batch 1 specifics — pin so the new keywords stay
      // wired even after future audits of the centralized map
      ['jitensha hoken', 'bicycle-insurance'],
      ['nin-i hoken', 'motorcycle-voluntary-insurance'],
      ['blue ticket', 'bicycle-rules-2026'],
    ])('"%s" → top-1 = %s', (query, expectedId) => {
      const r = searchAppContent(query, 3);
      expect(r[0]?.id).toBe(expectedId);
    });
  });

  // Where the natural top-1 is a Japanese-word dictionary entry (which
  // is reasonable behavior — the user asked about a JP term), still
  // require the matching admin guide to appear in top-3.
  //
  // NOTE: "zairyu" alone currently surfaces word + phrase entries
  // ahead of any residence-card guide, because the centralized
  // residence-card keywords have "zairyu kikan koshin", "zairyu card",
  // etc. but no bare "zairyu" entry. Phase 2C analytics will tell us
  // whether that's a real failed-query pattern. Not pinned here.
  describe('pinned top-3 guarantees', () => {
    it.each([
      ['kakutei shinkoku', 'kakutei-shinkoku'],
      ['nenkin', 'pension-exemption-refund'],
      ['sau sinh', 'postpartum-30-day-timeline'],
    ])('"%s" → top-3 contains %s', (query, expectedId) => {
      const r = searchAppContent(query, 3);
      expect(r.map((x) => x.id)).toContain(expectedId);
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
