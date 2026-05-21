// ============================================================
// Search ranking test suite — pin philosophy
// ============================================================
//
// Read `docs/search-ranking-governance.md` BEFORE adding a pin.
// This file is the regression net for the ranking algorithm + the
// keyword map. It is NOT a roadmap for every query we might wish
// to support.
//
// Add a pin when (all required):
//   1. The query is real or confidently anticipated (NOT synthetic)
//   2. The expected guide answer is unambiguous (one canonical guide
//      OR a tight top-3 of canonical guides)
//   3. The current ranking already produces the expected result.
//      Pins freeze the current state; they do NOT force a result.
//   4. A future ranking refactor plausibly threatens this query
//   5. A one-sentence rationale comment documents WHY the position
//      is current (what the failure mode would look like)
//
// Do NOT add a pin when:
//   - "Just in case" — pins are not a roadmap
//   - The keyword would have to be too generic (`'thu tuc'`,
//     `'visa'`, `'help'`) to make the query land
//   - The expected guide is not canonical for the intent
//     (Bucket B in the retrieval playbook — that's a content gap,
//     not a keyword problem)
//   - The pin duplicates a sibling pin for a phrasing variant
//     (consolidate into one pin + one keyword)
//
// Anti-pollution rules:
//   - Every keyword expansion is single-phrase + scoped to one guide
//   - No keyword shorter than 4 chars unless it's a canonical JP
//     term (`'国保'`, `'国保'`)
//   - Cross-check `q.includes(keyword)` collisions before merging:
//     a new keyword must NOT be a substring of unrelated common
//     queries
//
// When the pin suite grows past ~60 entries, audit per
// search-ranking-governance.md §3. Diminishing returns = overfit.

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

  // v1.5.1 — defensive pins for the real-world queries Vietnamese
  // residents in Japan actually type. These are the queries v1.5.0
  // discovery work (Phase 2A + 2B + Phase 2C-prep batch 1) was meant
  // to handle. Locking them here so future ranking changes can't
  // silently regress the most common entry vocab.
  //
  // Top-1 pins: queries whose intent is unambiguous AND no other
  // guide has a stronger title prefix on the same phrase. Top-N
  // pins: queries where another guide legitimately wins top-1 by
  // title-startsWith but the canonical guide MUST be reachable in
  // the immediate result window.
  describe('v1.5.1 VN-in-JP real-world query defenses', () => {
    it.each([
      ['thue cu tru',      'juminzei-local-tax'],
      ['bao hiem y te',    'health-insurance'],
      ['chuyen nha',       'address-change'],
    ])('top-1 — "%s" → %s', (query, expectedId) => {
      const r = searchAppContent(query, 3);
      expect(r[0]?.id).toBe(expectedId);
    });

    it.each([
      // "visa het han" — title startsWith wins for
      // visa-emergency-medical-disaster-extension (its title
      // literally starts "Visa hết hạn trong lúc nhập viện..."), so
      // overstay can't reach top-1 without a title rewrite. Both
      // guides are valid responses; pin top-3 contains overstay so
      // the user always sees both.
      ['visa het han',     'overstaying-illegal-stay-procedures', 3],
      // "my number" — myna-portal-digital wins top-1 via title
      // startsWith ("My Number Card số hóa..."). The my-number
      // application guide is a valid co-result, not a sole winner.
      ['my number',        'my-number', 3],
      // "zairyu" alone — JP-word / phrase entries legitimately
      // outrank guides because the romanized form lives in the
      // JAPANESE_WORDS dictionary. The residence-card renewal guide
      // (the most common "zairyu" admin task) reaches top-10 via the
      // central keyword map ('zairyu kikan koshin'). Top-10 is the
      // practical scroll window before users refine. NOTE:
      // residence-card-validity is NOT in top-10 today — Phase 2C
      // analytics will tell us if "zairyu" alone deserves a more
      // controlled keyword expansion.
      ['zairyu',           'residence-card', 10],
      // "mat the ngoai kieu" — legacy diaspora term for residence
      // card. Controlled keyword added in v1.5.1 (single keyword on
      // lost-residence-card only — does not contaminate the broader
      // residence-card namespace).
      ['mat the ngoai kieu', 'lost-residence-card', 3],
    ])('top-N — "%s" → contains %s within %d', (query, expectedId, n) => {
      const r = searchAppContent(query, n);
      expect(r.map((x) => x.id)).toContain(expectedId);
    });
  });

  // v1.5.2 — Phase 2C real-world retrieval-quality defenses. These
  // queries surfaced from the Phase 2C-prep "what would Vietnamese
  // workers actually type" exercise + the analytics decision-map's
  // anticipated failed-query patterns. All 8 resolve top-1 today;
  // 3 of them only because v1.5.2 added controlled keywords:
  //
  //   - 'baito tax' / 'thue baito' → kakutei-shinkoku
  //   - 'kokumin hoken' (colloquial drop of 'kenkou') → health-insurance
  //   - 'taishoku' / 'taishoku-go' / 'nghi viec' → unemployment-benefits
  //
  // Each addition is single-phrase + scoped to one guide.
  describe('v1.5.2 Phase 2C retrieval-quality defenses', () => {
    it.each([
      // Pre-existing keyword coverage — pins lock current top-1
      ['nenkin refund',  'return-to-vietnam-checklist'],
      ['shakai hoken',   'health-insurance'],
      ['visa renewal',   'residence-card'],
      ['address change', 'address-change'],
      ['hello work',     'unemployment-benefits'],
      // v1.5.2 controlled keyword expansions — pins lock the new top-1
      ['baito tax',      'kakutei-shinkoku'],
      ['kokumin hoken',  'health-insurance'],
      ['taishoku',       'unemployment-benefits'],
    ])('top-1 — "%s" → %s', (query, expectedId) => {
      const r = searchAppContent(query, 3);
      expect(r[0]?.id).toBe(expectedId);
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
