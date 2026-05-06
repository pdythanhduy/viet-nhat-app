import { ADMIN_CONTENT_META, ADMIN_GUIDES } from '../constants/content/adminGuides';
import {
  getAdminGuideOfficialFormLinks,
  MUNICIPAL_FORM_NOTICE,
} from '../constants/content/adminGuideForms';
import type { AdminGuide } from '../types/content';
import {
  ADMIN_GUIDE_EXPORT_FORM_NOTICE,
  buildAdminGuideExportHtml,
  escapeAdminGuideExportHtml,
  getAdminGuideExportFileName,
} from './adminGuideExport';

const guide = ADMIN_GUIDES[0];
const guideWithForms = ADMIN_GUIDES.find((item) => item.id === 'address-change');

if (!guide) {
  throw new Error('Missing admin guide test fixture');
}

if (!guideWithForms) {
  throw new Error('Missing address-change guide test fixture');
}

describe('adminGuideExport', () => {
  it('builds an offline HTML guide with official current-form guidance', () => {
    const html = buildAdminGuideExportHtml({
      guides: [guide],
      generatedAt: new Date('2026-05-03T00:00:00.000Z'),
    });

    expect(html).toContain('<meta charset="utf-8"');
    expect(html).toContain(guide.title);
    expect(html).toContain(guide.officialLinks[0]?.url);
    expect(html).toContain('Link nguồn chính thức / tải form hiện hành');
    expect(html).toContain(ADMIN_GUIDE_EXPORT_FORM_NOTICE);
    expect(html).not.toContain('<script>');
  });

  it('includes official municipal form links without embedding PDF content', () => {
    const formLinks = getAdminGuideOfficialFormLinks(guideWithForms.id);
    const html = buildAdminGuideExportHtml({ guides: [guideWithForms] });

    expect(formLinks.length).toBeGreaterThan(0);
    expect(html).toContain('Form chính thức / PDF tải về');
    expect(html).toContain(MUNICIPAL_FORM_NOTICE);
    expect(html).toContain(formLinks[0]?.url);
    expect(html).toContain('東京都渋谷区');
    expect(html).not.toContain('%PDF-');
  });

  it('escapes unsafe text and link fields before writing HTML', () => {
    const unsafeGuide: AdminGuide = {
      ...guide,
      id: 'unsafe-guide',
      color: 'red; background:url(javascript:alert(1))',
      title: '<script>alert("x")</script>',
      titleJp: '"><img src=x onerror=alert(1)>',
      description: 'Use <b>bold</b> & "quotes"',
      officialLinks: [{ label: '<Form>', url: 'https://example.com/?a=1&b=2"bad' }],
      steps: [
        {
          step: 1,
          title: 'Step <one>',
          description: 'Never render <script> tags',
          documents: ['Doc <A>'],
        },
      ],
    };

    const html = buildAdminGuideExportHtml({ guides: [unsafeGuide] });

    expect(html).not.toContain('<script>alert("x")</script>');
    expect(html).not.toContain('javascript:alert(1)');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
    expect(html).toContain('https://example.com/?a=1&amp;b=2&quot;bad');
  });

  it('creates stable html file names for all guides and single-guide exports', () => {
    expect(getAdminGuideExportFileName()).toBe(
      `viet-nhat-thu-tuc-tat-ca-${ADMIN_CONTENT_META.lastUpdated}.html`
    );
    expect(getAdminGuideExportFileName({ scope: 'filtered' })).toBe(
      `viet-nhat-thu-tuc-danh-sach-${ADMIN_CONTENT_META.lastUpdated}.html`
    );
    expect(getAdminGuideExportFileName({ guide })).toBe(
      `viet-nhat-thu-tuc-${guide.id}-${guide.lastVerified}.html`
    );
  });

  it('escapes html-sensitive characters consistently', () => {
    expect(escapeAdminGuideExportHtml(`A&B <C> "D" 'E'`)).toBe(
      'A&amp;B &lt;C&gt; &quot;D&quot; &#39;E&#39;'
    );
  });
});
