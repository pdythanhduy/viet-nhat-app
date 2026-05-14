import { ADMIN_GUIDES } from './adminGuides';

const TARGET_CATEGORIES = new Set(['visa', 'immigration']);

const hasSuspiciousSpacing = (text: string): boolean => /[^\S\r\n]{2,}/.test(text);
const hasReplacementChar = (text: string): boolean => /\uFFFD/.test(text);

describe('ADMIN_GUIDES QA gate for visa/immigration content', () => {
  const targetGuides = ADMIN_GUIDES.filter((guide) => TARGET_CATEGORIES.has(guide.category));

  it('keeps lastVerified in ISO date format', () => {
    targetGuides.forEach((guide) => {
      expect(guide.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('uses secure official links from expected official domains', () => {
    const allowedHosts = [
      'moj.go.jp',
      'mofa.go.jp',
      'ssw.go.jp',
      'mhlw.go.jp',
      'kojinbango-card.go.jp',
      'otit.go.jp',
      'nenkin.go.jp',
      'soumu.go.jp',
      'nta.go.jp',
      'e-gov.go.jp',
      'isa.go.jp',
      'mext.go.jp',
      'studyinjapan.go.jp',
      'jasso.go.jp',
      'vnembassy-jp.org',
      'vnconsulate-osaka.org',
      'emb-japan.go.jp',
    ];

    targetGuides.forEach((guide) => {
      expect(guide.officialLinks.length).toBeGreaterThan(0);

      guide.officialLinks.forEach((link) => {
        expect(link.url.startsWith('https://')).toBe(true);
        const host = new URL(link.url).hostname;
        expect(allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))).toBe(true);
      });
    });
  });

  it('keeps display text clean (no replacement char, no accidental double spaces)', () => {
    const collectTextBlocks = (guide: (typeof targetGuides)[number]): string[] => {
      const blocks: string[] = [guide.title, guide.titleJp, guide.description];
      blocks.push(...(guide.whoIsThisFor ?? []));
      blocks.push(...(guide.whenToDo ?? []));
      blocks.push(...(guide.whereToDo ?? []));
      blocks.push(...(guide.commonMistakes ?? []));
      blocks.push(...(guide.fees ?? []));
      if (guide.legalScope) {
        blocks.push(guide.legalScope.jurisdictionNote);
        blocks.push(...(guide.legalScope.whenToAskExpert ?? []));
      }
      if (guide.quickAction) {
        blocks.push(guide.quickAction.deadline, guide.quickAction.office, guide.quickAction.ifLate);
        blocks.push(...guide.quickAction.doNow);
        blocks.push(...guide.quickAction.bring);
        blocks.push(...guide.quickAction.officialSourceLabels);
      }
      blocks.push(...guide.steps.flatMap((step) => [step.title, step.description, ...step.documents, step.tip ?? '']));
      blocks.push(...(guide.faq ?? []).flatMap((item) => [item.question, item.answer]));
      return blocks.filter(Boolean);
    };

    targetGuides.forEach((guide) => {
      const blocks = collectTextBlocks(guide);
      blocks.forEach((text) => {
        expect(hasReplacementChar(text)).toBe(false);
        expect(hasSuspiciousSpacing(text)).toBe(false);
      });
    });
  });
});

