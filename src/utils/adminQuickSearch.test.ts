import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { adminGuideMatchesSearch } from './adminGuideSearch';
import { ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS, ADMIN_QUICK_SEARCH_CHIPS } from './adminQuickSearch';

describe('ADMIN_QUICK_SEARCH_CHIPS', () => {
  it('keeps quick search chip ids unique and display metadata complete', () => {
    const ids = ADMIN_QUICK_SEARCH_CHIPS.map((chip) => chip.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const chip of ADMIN_QUICK_SEARCH_CHIPS) {
      expect(chip.label.trim().length).toBeGreaterThan(0);
      expect(chip.query.trim().length).toBeGreaterThan(0);
      expect(chip.targetGuideIds.length).toBeGreaterThan(0);
      expect(chip.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it('points each chip to searchable admin guides inside its category', () => {
    for (const chip of ADMIN_QUICK_SEARCH_CHIPS) {
      const matchingGuideIds = ADMIN_GUIDES
        .filter((guide) => guide.category === chip.category && adminGuideMatchesSearch(guide, chip.query))
        .map((guide) => guide.id);

      for (const guideId of chip.targetGuideIds) {
        expect(matchingGuideIds).toContain(guideId);
      }
    }
  });

  it('keeps empty-state suggestions focused and searchable', () => {
    expect(ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS.map((chip) => chip.id)).toEqual([
      'tax',
      'health-insurance',
      'traffic-accident',
      'visa',
    ]);

    for (const chip of ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS) {
      const matchingGuideIds = ADMIN_GUIDES
        .filter((guide) => guide.category === chip.category && adminGuideMatchesSearch(guide, chip.query))
        .map((guide) => guide.id);

      expect(matchingGuideIds.length).toBeGreaterThan(0);
    }
  });
});
