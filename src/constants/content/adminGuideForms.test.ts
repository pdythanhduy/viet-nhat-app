import { ADMIN_GUIDES } from './adminGuides';
import {
  ADMIN_GUIDE_FORM_LINKS,
  getOfficialFormLinkTypeLabel,
  MUNICIPAL_FORM_NOTICE,
} from './adminGuideForms';

const VALID_TYPES = new Set(['official-page', 'pdf', 'fillable-pdf', 'example-pdf']);
const VALID_JURISDICTIONS = new Set(['national', 'prefecture', 'municipality']);

describe('ADMIN_GUIDE_FORM_LINKS', () => {
  it('references existing guides and verified secure official links', () => {
    const guideIds = new Set(ADMIN_GUIDES.map((guide) => guide.id));

    for (const [guideId, links] of Object.entries(ADMIN_GUIDE_FORM_LINKS)) {
      expect(guideIds.has(guideId)).toBe(true);
      expect(links.length).toBeGreaterThan(0);

      for (const link of links) {
        expect(link.label.trim().length).toBeGreaterThan(0);
        expect(link.url).toMatch(/^https:\/\//);
        expect(link.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(VALID_TYPES.has(link.type)).toBe(true);
        expect(VALID_JURISDICTIONS.has(link.jurisdiction)).toBe(true);

        if (link.sourceUrl) {
          expect(link.sourceUrl).toMatch(/^https:\/\//);
        }

        if (link.type === 'pdf' || link.type === 'fillable-pdf' || link.type === 'example-pdf') {
          expect(new URL(link.url).pathname.toLowerCase()).toMatch(/\.pdf$/);
        }

        if (link.jurisdiction === 'municipality') {
          expect(link.jurisdictionLabel?.trim().length).toBeGreaterThan(0);
          expect(link.note?.toLowerCase()).toMatch(
            /shibuya|municipality|thành phố|quận|địa phương|city|ward/
          );
        }
      }
    }
  });

  it('keeps action labels explicit for PDF and official page links', () => {
    expect(getOfficialFormLinkTypeLabel('pdf')).toBe('PDF');
    expect(getOfficialFormLinkTypeLabel('fillable-pdf')).toBe('PDF điền');
    expect(getOfficialFormLinkTypeLabel('example-pdf')).toBe('Ví dụ PDF');
    expect(getOfficialFormLinkTypeLabel('official-page')).toBe('Trang chính thức');
    expect(MUNICIPAL_FORM_NOTICE).toContain('市役所');
  });
});
