import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { adminGuideMatchesSearch, normalizeAdminGuideSearchText } from './adminGuideSearch';

function matchingGuideIds(query: string) {
  return ADMIN_GUIDES.filter((guide) => adminGuideMatchesSearch(guide, query)).map((guide) => guide.id);
}

describe('adminGuideSearch', () => {
  it('normalizes whitespace, casing, and Vietnamese accents', () => {
    expect(normalizeAdminGuideSearchText('  TAI NẠN  ')).toBe('tai nan');
    expect(normalizeAdminGuideSearchText('Đổi bằng')).toBe('doi bang');
  });

  it.each([
    ['110', 'traffic-accident-response'],
    ['119', 'traffic-accident-response'],
    ['jiko', 'traffic-accident-response'],
    ['交通事故証明書', 'traffic-accident-response'],
    ['gaimen', 'drivers-license'],
    ['外免切替', 'drivers-license'],
    ['koshin', 'drivers-license-renewal'],
    ['免許更新', 'drivers-license-renewal'],
    ['shaken', 'car-shaken-insurance'],
    ['車検', 'car-shaken-insurance'],
  ])('finds %s through admin guide keyword metadata', (query, guideId) => {
    expect(matchingGuideIds(query)).toContain(guideId);
  });

  it('still matches existing title and description fields', () => {
    expect(matchingGuideIds('tai nan')).toContain('traffic-accident-response');
  });
});
