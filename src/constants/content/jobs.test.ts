import { JOB_PLATFORMS, WORKER_TYPE_GUIDES } from './jobs';
import type { EligibleWorkerType } from '../../types/content';

const VALID_WORKER_TYPES: EligibleWorkerType[] = [
  'student',
  'dependent',
  'work-visa',
  'ssw',
  'unrestricted',
  'unsure',
];

describe('jobs content quality', () => {
  it('defines every worker type exactly once', () => {
    const ids = WORKER_TYPE_GUIDES.map((guide) => guide.id);
    expect(new Set(ids).size).toBe(VALID_WORKER_TYPES.length);
    expect(ids.sort()).toEqual([...VALID_WORKER_TYPES].sort());
  });

  it('has valid platform links and eligibility metadata', () => {
    const platformIds: string[] = [];

    for (const group of JOB_PLATFORMS) {
      expect(group.category.trim().length).toBeGreaterThan(0);
      expect(group.platforms.length).toBeGreaterThan(0);

      for (const platform of group.platforms) {
        platformIds.push(platform.id);
        expect(platform.name.trim().length).toBeGreaterThan(0);
        expect(platform.url).toMatch(/^https:\/\//);
        expect(platform.description.trim().length).toBeGreaterThan(0);
        expect(platform.eligibleFor.length).toBeGreaterThan(0);
        expect(platform.visaNote.trim().length).toBeGreaterThan(0);

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
});
