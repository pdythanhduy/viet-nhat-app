/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';
import { Ionicons } from '@expo/vector-icons';

import { ADMIN_CONTENT_META, ADMIN_GUIDES } from './adminGuides';
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

const CORE_SETUP_GUIDE_IDS = [
  'residence-card-validity',
  'residence-card-info-change',
  're-entry',
  'spouse-notification',
  'remittance',
];

const NORMAL_STRUCTURED_GUIDE_IDS = [
  'school-enrollment-children',
  'juminzei-local-tax',
  'garbage-sorting-rules',
  'marriage-procedures-japan',
  'annual-health-checkup-kensin',
];

const VISA_IMMIGRATION_STRUCTURED_GUIDE_IDS = [
  'permanent-residency-eijuu',
  'highly-skilled-professional',
  'ginou-jisshu-to-tokutei-ginou',
  'tokutei-katsudo-46-job-hunt',
];

const MONEY_STRUCTURED_GUIDE_IDS = [
  'home-purchase-mortgage',
  'sole-proprietor-kojin-jigyo',
  'credit-card-for-foreigners',
  'nisa-investment',
];

const TRAFFIC_STRUCTURED_GUIDE_IDS = [
  'moped-motorcycle-registration',
  'bicycle-insurance',
];

function expectNonEmptyText(value: string) {
  expect(value.trim().length).toBeGreaterThan(0);
}

function expectNonEmptyTextArray(items: string[] | undefined) {
  if (items === undefined) return;

  expect(items.length).toBeGreaterThan(0);

  for (const item of items) {
    expectNonEmptyText(item);
  }
}

function expectRequiredTextArray(items: string[] | undefined) {
  expect(items).toBeDefined();
  expectNonEmptyTextArray(items);
}

function expectRequiredChecklist(items: { label: string; required: boolean; note?: string }[] | undefined) {
  expect(items).toBeDefined();
  expect(items?.length).toBeGreaterThan(0);

  for (const item of items ?? []) {
    expectNonEmptyText(item.label);
    expect(typeof item.required).toBe('boolean');

    if (item.note) {
      expectNonEmptyText(item.note);
    }
  }
}

function expectRequiredFaq(items: { question: string; answer: string }[] | undefined) {
  expect(items).toBeDefined();
  expect(items?.length).toBeGreaterThan(0);

  for (const item of items ?? []) {
    expectNonEmptyText(item.question);
    expectNonEmptyText(item.answer);
  }
}

function collectRequiredAssetPaths() {
  const sourcePath = path.join(__dirname, 'adminGuides.ts');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const matches = source.matchAll(/require\('([^']+)'\)/g);

  return [...matches].map((match) => match[1]).filter((assetPath): assetPath is string => Boolean(assetPath));
}

describe('ADMIN_GUIDES content quality', () => {
  it('has valid content metadata', () => {
    expect(ADMIN_CONTENT_META.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(ADMIN_CONTENT_META.sources.length).toBeGreaterThan(0);

    for (const source of ADMIN_CONTENT_META.sources) {
      expectNonEmptyText(source.label);
      expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it('uses unique guide ids', () => {
    const ids = ADMIN_GUIDES.map((guide) => guide.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('references only committed assets that exist on disk', () => {
    const assetPaths = collectRequiredAssetPaths();

    expect(assetPaths.length).toBeGreaterThan(0);

    for (const assetPath of assetPaths) {
      const absoluteAssetPath = path.resolve(__dirname, assetPath);
      expect(fs.existsSync(absoluteAssetPath)).toBe(true);
    }
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
      expectNonEmptyText(guide.title);
      expectNonEmptyText(guide.titleJp);
      expectNonEmptyText(guide.description);
      expect(guide.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(['high', 'normal', undefined]).toContain(guide.priority);
      expect(guide.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Ionicons.glyphMap[guide.icon]).toBeDefined();

      if (guide.heroImage) {
        expectNonEmptyText(guide.heroImageCaption ?? '');
      }
    }
  });

  it('keeps high-priority guides fully structured', () => {
    const highPriorityGuides = ADMIN_GUIDES.filter((guide) => guide.priority === 'high');

    expect(highPriorityGuides.length).toBeGreaterThan(0);

    for (const guide of highPriorityGuides) {
      expect(guide.heroImage).toBeDefined();
      expectNonEmptyText(guide.heroImageCaption ?? '');
      expectRequiredTextArray(guide.whoIsThisFor);
      expectRequiredTextArray(guide.whenToDo);
      expectRequiredTextArray(guide.whereToDo);
      expectRequiredChecklist(guide.documentsChecklist);
      expectRequiredTextArray(guide.commonMistakes);
      expectRequiredFaq(guide.faq);
    }
  });

  it('keeps core setup guides structured', () => {
    for (const guideId of CORE_SETUP_GUIDE_IDS) {
      const guide = ADMIN_GUIDES.find((item) => item.id === guideId);

      expect(guide).toBeDefined();
      expect(guide?.priority).toBe('normal');
      expect(guide?.heroImage).toBeDefined();
      expectNonEmptyText(guide?.heroImageCaption ?? '');
      expectRequiredTextArray(guide?.whoIsThisFor);
      expectRequiredTextArray(guide?.whenToDo);
      expectRequiredTextArray(guide?.whereToDo);
      expectRequiredChecklist(guide?.documentsChecklist);
      expectRequiredTextArray(guide?.commonMistakes);
      expectRequiredFaq(guide?.faq);
    }
  });

  it('keeps selected normal guides structured', () => {
    for (const guideId of NORMAL_STRUCTURED_GUIDE_IDS) {
      const guide = ADMIN_GUIDES.find((item) => item.id === guideId);

      expect(guide).toBeDefined();
      expect(guide?.priority).toBe('normal');
      expect(guide?.heroImage).toBeDefined();
      expectNonEmptyText(guide?.heroImageCaption ?? '');
      expectRequiredTextArray(guide?.whoIsThisFor);
      expectRequiredTextArray(guide?.whenToDo);
      expectRequiredTextArray(guide?.whereToDo);
      expectRequiredChecklist(guide?.documentsChecklist);
      expectRequiredTextArray(guide?.commonMistakes);
      expectRequiredFaq(guide?.faq);
    }
  });

  it('keeps selected visa and immigration guides structured', () => {
    for (const guideId of VISA_IMMIGRATION_STRUCTURED_GUIDE_IDS) {
      const guide = ADMIN_GUIDES.find((item) => item.id === guideId);

      expect(guide).toBeDefined();
      expect(guide?.priority).toBe('normal');
      expect(guide?.heroImage).toBeDefined();
      expectNonEmptyText(guide?.heroImageCaption ?? '');
      expectRequiredTextArray(guide?.whoIsThisFor);
      expectRequiredTextArray(guide?.whenToDo);
      expectRequiredTextArray(guide?.whereToDo);
      expectRequiredChecklist(guide?.documentsChecklist);
      expectRequiredTextArray(guide?.commonMistakes);
      expectRequiredFaq(guide?.faq);
    }
  });

  it('keeps post-graduation job-hunt guidance distinct from designated activities 46', () => {
    const guide = ADMIN_GUIDES.find((item) => item.id === 'tokutei-katsudo-46-job-hunt');

    expect(guide).toBeDefined();
    expect(guide?.title).not.toContain('46');
    expect(guide?.titleJp).toContain('継続就職活動');
    expect(guide?.description).toContain('khác với 特定活動46号');
    expect(guide?.officialLinks.some((link) => link.url.includes('designatedactivities14'))).toBe(true);
    expect(guide?.officialLinks.some((link) => link.url.includes('designatedactivities11'))).toBe(true);
  });

  it('keeps selected money guides structured', () => {
    for (const guideId of MONEY_STRUCTURED_GUIDE_IDS) {
      const guide = ADMIN_GUIDES.find((item) => item.id === guideId);

      expect(guide).toBeDefined();
      expect(guide?.category).toBe('money');
      expect(guide?.priority).toBe('normal');
      expect(guide?.heroImage).toBeDefined();
      expectNonEmptyText(guide?.heroImageCaption ?? '');
      expectRequiredTextArray(guide?.whoIsThisFor);
      expectRequiredTextArray(guide?.whenToDo);
      expectRequiredTextArray(guide?.whereToDo);
      expectRequiredChecklist(guide?.documentsChecklist);
      expectRequiredTextArray(guide?.commonMistakes);
      expectRequiredFaq(guide?.faq);
    }
  });

  it('uses public source links for NISA guidance', () => {
    const guide = ADMIN_GUIDES.find((item) => item.id === 'nisa-investment');

    expect(guide).toBeDefined();
    expect(guide?.officialLinks.every((link) => link.url.includes('fsa.go.jp') || link.url.includes('nta.go.jp'))).toBe(
      true,
    );
  });

  it('keeps selected traffic guides structured', () => {
    for (const guideId of TRAFFIC_STRUCTURED_GUIDE_IDS) {
      const guide = ADMIN_GUIDES.find((item) => item.id === guideId);

      expect(guide).toBeDefined();
      expect(guide?.category).toBe('traffic');
      expect(guide?.priority).toBe('normal');
      expect(guide?.heroImage).toBeDefined();
      expectNonEmptyText(guide?.heroImageCaption ?? '');
      expectRequiredTextArray(guide?.whoIsThisFor);
      expectRequiredTextArray(guide?.whenToDo);
      expectRequiredTextArray(guide?.whereToDo);
      expectRequiredChecklist(guide?.documentsChecklist);
      expectRequiredTextArray(guide?.commonMistakes);
      expectRequiredFaq(guide?.faq);
    }
  });

  it('keeps motorcycle registration sources pointed at MLIT guidance', () => {
    const guide = ADMIN_GUIDES.find((item) => item.id === 'moped-motorcycle-registration');

    expect(guide).toBeDefined();
    expect(guide?.officialLinks.some((link) => link.url.includes('mlit.go.jp'))).toBe(true);
    expect(guide?.officialLinks.some((link) => link.url.includes('jidoushatouroku-portal.mlit.go.jp'))).toBe(true);
    expect(guide?.officialLinks.some((link) => link.url.includes('keikenkyo.or.jp'))).toBe(false);
  });

  it('has ordered, complete steps', () => {
    for (const guide of ADMIN_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(2);

      guide.steps.forEach((step, index) => {
        expect(step.step).toBe(index + 1);
        expectNonEmptyText(step.title);
        expectNonEmptyText(step.description);
        expect(Array.isArray(step.documents)).toBe(true);

        for (const document of step.documents) {
          expectNonEmptyText(document);
        }

        if (step.tip) {
          expectNonEmptyText(step.tip);
        }

        if (step.image) {
          expectNonEmptyText(step.imageCaption ?? '');
        }
      });
    }
  });

  it('keeps rich guide sections complete when present', () => {
    for (const guide of ADMIN_GUIDES) {
      expectNonEmptyTextArray(guide.whoIsThisFor);
      expectNonEmptyTextArray(guide.whenToDo);
      expectNonEmptyTextArray(guide.whereToDo);
      expectNonEmptyTextArray(guide.fees);

      if (guide.estimatedTime) {
        expectNonEmptyText(guide.estimatedTime);
      }

      for (const item of guide.documentsChecklist ?? []) {
        expectNonEmptyText(item.label);
        expect(typeof item.required).toBe('boolean');

        if (item.note) {
          expectNonEmptyText(item.note);
        }
      }

      for (const item of guide.faq ?? []) {
        expectNonEmptyText(item.question);
        expectNonEmptyText(item.answer);
      }

      expectNonEmptyTextArray(guide.commonMistakes);
    }
  });
});
