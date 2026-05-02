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
