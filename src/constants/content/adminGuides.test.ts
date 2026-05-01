import { ADMIN_GUIDES } from './adminGuides';
import type { AdminGuideCategory } from '../../types/content';

const VALID_CATEGORIES: AdminGuideCategory[] = [
  'immigration',
  'visa',
  'daily-law',
  'traffic',
  'health',
  'money',
  'license',
];

describe('ADMIN_GUIDES content quality', () => {
  it('uses unique guide ids', () => {
    const ids = ADMIN_GUIDES.map((guide) => guide.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has required category and official source links for every guide', () => {
    for (const guide of ADMIN_GUIDES) {
      expect(VALID_CATEGORIES).toContain(guide.category);
      expect(guide.officialLinks.length).toBeGreaterThan(0);

      for (const link of guide.officialLinks) {
        expect(link.label.trim().length).toBeGreaterThan(0);
        expect(link.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('has non-empty display text', () => {
    for (const guide of ADMIN_GUIDES) {
      expect(guide.title.trim().length).toBeGreaterThan(0);
      expect(guide.titleJp.trim().length).toBeGreaterThan(0);
      expect(guide.description.trim().length).toBeGreaterThan(0);
      expect(guide.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(['high', 'normal', undefined]).toContain(guide.priority);
    }
  });

  it('has ordered, complete steps', () => {
    for (const guide of ADMIN_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(2);

      guide.steps.forEach((step, index) => {
        expect(step.step).toBe(index + 1);
        expect(step.title.trim().length).toBeGreaterThan(0);
        expect(step.description.trim().length).toBeGreaterThan(0);
        expect(Array.isArray(step.documents)).toBe(true);
      });
    }
  });

  it('keeps rich guide sections complete when present', () => {
    for (const guide of ADMIN_GUIDES) {
      for (const item of guide.documentsChecklist ?? []) {
        expect(item.label.trim().length).toBeGreaterThan(0);
        expect(typeof item.required).toBe('boolean');
      }

      for (const item of guide.faq ?? []) {
        expect(item.question.trim().length).toBeGreaterThan(0);
        expect(item.answer.trim().length).toBeGreaterThan(0);
      }

      for (const mistake of guide.commonMistakes ?? []) {
        expect(mistake.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
