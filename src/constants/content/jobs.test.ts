import { Ionicons } from '@expo/vector-icons';

import {
  CONTRACT_REVIEW_CHECKLIST,
  CURRENT_LABOR_UPDATES,
  JOB_PLATFORMS,
  JOBS_CONTENT_META,
  LABOR_HELP_SCENARIOS,
  LABOR_RISK_SIGNS,
  LABOR_SUPPORT_PHRASES,
  WORKER_RIGHTS,
  WORKER_TYPE_GUIDES,
} from './jobs';
import type { EligibleWorkerType } from '../../types/content';

const VALID_WORKER_TYPES: EligibleWorkerType[] = [
  'student',
  'dependent',
  'work-visa',
  'ssw',
  'unrestricted',
  'unsure',
];

function expectNonEmptyText(value: string) {
  expect(value.trim().length).toBeGreaterThan(0);
}

function expectValidIcon(icon: keyof typeof Ionicons.glyphMap) {
  expect(Ionicons.glyphMap[icon]).toBeDefined();
}

function expectValidColor(color: string) {
  expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
}

describe('jobs content quality', () => {
  it('has valid source metadata', () => {
    expect(JOBS_CONTENT_META.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(JOBS_CONTENT_META.sources.length).toBeGreaterThan(0);

    for (const source of JOBS_CONTENT_META.sources) {
      expectNonEmptyText(source.label);
      expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it('defines every worker type exactly once', () => {
    const ids = WORKER_TYPE_GUIDES.map((guide) => guide.id);
    expect(new Set(ids).size).toBe(VALID_WORKER_TYPES.length);
    expect(ids.sort()).toEqual([...VALID_WORKER_TYPES].sort());
  });

  it('has complete worker type guide content', () => {
    for (const guide of WORKER_TYPE_GUIDES) {
      expectNonEmptyText(guide.label);
      expectNonEmptyText(guide.title);
      expectNonEmptyText(guide.description);
      expectValidIcon(guide.icon);
      expectValidColor(guide.color);
      expect(guide.warnings.length).toBeGreaterThan(0);

      for (const warning of guide.warnings) {
        expectNonEmptyText(warning);
      }
    }
  });

  it('has valid platform links and eligibility metadata', () => {
    const platformIds: string[] = [];

    for (const group of JOB_PLATFORMS) {
      expect(group.category.trim().length).toBeGreaterThan(0);
      expectValidIcon(group.icon);
      expectValidColor(group.color);
      expect(group.platforms.length).toBeGreaterThan(0);

      for (const platform of group.platforms) {
        platformIds.push(platform.id);
        expect(platform.name.trim().length).toBeGreaterThan(0);
        expect(platform.nameJp.trim().length).toBeGreaterThan(0);
        expect(platform.url).toMatch(/^https:\/\//);
        expect(platform.description.trim().length).toBeGreaterThan(0);
        expect(platform.targetUser.trim().length).toBeGreaterThan(0);
        expectValidIcon(platform.icon);
        expectValidColor(platform.color);
        expect(platform.tags.length).toBeGreaterThan(0);
        expect(platform.eligibleFor.length).toBeGreaterThan(0);
        expect(platform.visaNote.trim().length).toBeGreaterThan(0);

        for (const tag of platform.tags) {
          expectNonEmptyText(tag);
        }

        for (const workerType of platform.eligibleFor) {
          expect(VALID_WORKER_TYPES).toContain(workerType);
        }
      }
    }

    expect(new Set(platformIds).size).toBe(platformIds.length);
  });

  it('marks student and dependent part-time platforms as requiring permission', () => {
    const platforms = JOB_PLATFORMS.flatMap((group) => group.platforms);
    const partTimePlatforms = platforms.filter(
      (platform) =>
        platform.eligibleFor.includes('student') || platform.eligibleFor.includes('dependent')
    );

    for (const platform of partTimePlatforms) {
      if (platform.tags.includes('Part-time')) {
        expect(platform.requiresPermission).toBe(true);
        expect(platform.workHourLimit?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('has complete current labor updates', () => {
    const ids = CURRENT_LABOR_UPDATES.map((update) => update.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const update of CURRENT_LABOR_UPDATES) {
      expectNonEmptyText(update.title);
      expectNonEmptyText(update.effectiveDate);
      expectNonEmptyText(update.summary);
      expectNonEmptyText(update.impact);
      expectValidIcon(update.icon);
      expectValidColor(update.color);
      // url is optional — items without a verified official URL ship
      // without a link. When url IS present, it must be a real https URL.
      if (update.url !== undefined) {
        expect(update.url).toMatch(/^https:\/\//);
      }
    }
  });

  it('has complete labor rights, risks, checklist, and phrases', () => {
    expect(WORKER_RIGHTS.length).toBeGreaterThan(0);
    expect(LABOR_RISK_SIGNS.length).toBeGreaterThan(0);
    expect(CONTRACT_REVIEW_CHECKLIST.length).toBeGreaterThan(0);
    expect(LABOR_SUPPORT_PHRASES.length).toBeGreaterThan(0);

    for (const right of WORKER_RIGHTS) {
      expectNonEmptyText(right.title);
      expectNonEmptyText(right.description);
      expectValidIcon(right.icon);
    }

    for (const risk of LABOR_RISK_SIGNS) {
      expectNonEmptyText(risk.title);
      expectNonEmptyText(risk.description);
      expect(['high', 'medium']).toContain(risk.severity);
    }

    for (const item of CONTRACT_REVIEW_CHECKLIST) {
      expectNonEmptyText(item.label);
      expectNonEmptyText(item.whyItMatters);
    }

    for (const phrase of LABOR_SUPPORT_PHRASES) {
      expectNonEmptyText(phrase.jp);
      expectNonEmptyText(phrase.romaji);
      expectNonEmptyText(phrase.vn);
      expectNonEmptyText(phrase.useCase);
    }
  });

  it('has complete labor help scenarios', () => {
    const ids = LABOR_HELP_SCENARIOS.map((scenario) => scenario.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const scenario of LABOR_HELP_SCENARIOS) {
      expectNonEmptyText(scenario.title);
      expect(['high', 'medium']).toContain(scenario.urgency);
      expectNonEmptyText(scenario.description);
      expect(scenario.doNow.length).toBeGreaterThan(0);
      expect(scenario.collectEvidence.length).toBeGreaterThan(0);
      expect(scenario.contact.length).toBeGreaterThan(0);

      for (const item of [...scenario.doNow, ...scenario.collectEvidence, ...scenario.contact]) {
        expectNonEmptyText(item);
      }
    }
  });
});
