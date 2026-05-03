import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import {
  adminGuideMatchesSearch,
  getAdminGuideSearchMatches,
  normalizeAdminGuideSearchText,
} from './adminGuideSearch';

function matchingGuideIds(query: string) {
  return ADMIN_GUIDES.filter((guide) => adminGuideMatchesSearch(guide, query)).map((guide) => guide.id);
}

function guideById(id: string) {
  const guide = ADMIN_GUIDES.find((item) => item.id === id);
  if (!guide) throw new Error(`Missing guide: ${id}`);
  return guide;
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
    ['gia han visa', 'residence-card'],
    ['zairyu kikan koshin', 'residence-card'],
    ['doi dia chi', 'address-change'],
    ['doi viec', 'job-change-notification'],
    ['shikakugai', 'permission-activity-outside-status'],
    ['re entry', 're-entry'],
    ['spouse notification', 'spouse-notification'],
    ['mo tai khoan', 'bank-account'],
    ['gui tien', 'remittance'],
    ['visa types', 'visa-status-overview'],
    ['ssw 2027', 'ssw-training-worker-2027'],
    ['moi nguoi than', 'family-stay-invitation'],
    ['short stay', 'short-stay-relative-visit'],
    ['moi cha me', 'parents-elderly-relatives'],
    ['sinh con o nhat', 'baby-born-in-japan'],
    ['hoikuen', 'nursery-kindergarten-guide'],
    ['ly hon', 'divorce-custody-name-residence'],
    ['chintai', 'renting-and-buying-home'],
    ['nenmatsu chosei', 'tax-year-end-adjustment-filing'],
    ['nenkin refund', 'return-to-vietnam-checklist'],
    ['furikome sagi', 'banking-remittance-anti-fraud'],
    ['doi visa', 'status-of-residence-change'],
    ['tennyu todoke', 'moving-in-notification'],
    ['my number card', 'my-number-card'],
    ['hanko', 'hanko-inkan'],
    ['school enrollment', 'school-enrollment-children'],
    ['juminzei', 'juminzei-local-tax'],
    ['gomi', 'garbage-sorting-rules'],
    ['eijuu', 'permanent-residency-eijuu'],
    ['hsp', 'highly-skilled-professional'],
    ['tts sang ssw', 'ginou-jisshu-to-tokutei-ginou'],
    ['job hunt visa', 'tokutei-katsudo-46-job-hunt'],
    ['vay mua nha', 'home-purchase-mortgage'],
    ['kojin jigyo', 'sole-proprietor-kojin-jigyo'],
    ['credit card', 'credit-card-for-foreigners'],
    ['ikukyu', 'childcare-parental-leave'],
    ['tokushu sagi', 'special-fraud-tokushu-sagi'],
    ['kakutei shinkoku', 'kakutei-shinkoku'],
    ['bang luong', 'payslip-reading'],
    ['no luong', 'labor-rights-dispute'],
    ['kika', 'naturalization-kika'],
    ['nisa', 'nisa-investment'],
    ['giay ket hon', 'marriage-certificate-vn-japan'],
  ])('finds %s through admin guide keyword metadata', (query, guideId) => {
    expect(matchingGuideIds(query)).toContain(guideId);
  });

  it('still matches existing title and description fields', () => {
    expect(matchingGuideIds('tai nan')).toContain('traffic-accident-response');
  });

  it('returns concise search match labels from the same search candidates', () => {
    expect(getAdminGuideSearchMatches(guideById('juminzei-local-tax'), 'thue')).toContain('thue cu tru');
    expect(getAdminGuideSearchMatches(guideById('kakutei-shinkoku'), 'thue')).toContain('khai thue');
    expect(getAdminGuideSearchMatches(guideById('permanent-residency-eijuu'), 'vinh tru')).toContain('vinh tru');
  });

  it('deduplicates and limits visible search match labels', () => {
    const matches = getAdminGuideSearchMatches(guideById('traffic-accident-response'), 'tai nan', 2);

    expect(matches.length).toBeLessThanOrEqual(2);
    expect(new Set(matches).size).toBe(matches.length);
  });

  it('returns no visible search matches for blank queries', () => {
    expect(getAdminGuideSearchMatches(guideById('residence-card'), '   ')).toEqual([]);
  });
});
