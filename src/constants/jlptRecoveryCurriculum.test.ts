import {
  getRecoveryCurriculum,
  getRecoveryCurriculumDay,
  getRecoveryDaysOfPhase,
  hasRecoveryCurriculum,
} from './jlptRecoveryCurriculum';

describe('jlptRecoveryCurriculum registry', () => {
  it('marks only the levels with wired-up curricula as available', () => {
    expect(hasRecoveryCurriculum('N5')).toBe(true);
    expect(hasRecoveryCurriculum('N2')).toBe(true);
    expect(hasRecoveryCurriculum('N4')).toBe(false);
    expect(hasRecoveryCurriculum('N3')).toBe(false);
    expect(hasRecoveryCurriculum('N1')).toBe(false);
  });

  it('returns undefined for an unavailable level', () => {
    expect(getRecoveryCurriculum('N1')).toBeUndefined();
    expect(getRecoveryCurriculumDay('N1', 1)).toBeUndefined();
    expect(getRecoveryDaysOfPhase('N1', 1)).toEqual([]);
  });

  describe('N5 curriculum', () => {
    const n5 = getRecoveryCurriculum('N5')!;

    it('has 30 contiguous days numbered 1..30', () => {
      expect(n5.days).toHaveLength(30);
      expect(n5.days.map((d) => d.day)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    });

    it('marks the expected review/test days', () => {
      const reviews = n5.days.filter((d) => d.kind === 'review').map((d) => d.day);
      const tests = n5.days.filter((d) => d.kind === 'test').map((d) => d.day);
      expect(reviews).toEqual([7, 13, 20, 29]);
      expect(tests).toEqual([30]);
    });

    it('gives every normal day a vocab topic and at least one grammar pattern', () => {
      for (const day of n5.days.filter((d) => d.kind === 'normal')) {
        expect(day.vocabTopic).not.toBe('—');
        expect(day.vocabTopic.length).toBeGreaterThan(0);
        expect(day.grammar.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('uses the "—" vocab placeholder on review/test days', () => {
      for (const day of n5.days.filter((d) => d.kind !== 'normal')) {
        expect(day.vocabTopic).toBe('—');
      }
    });

    it('partitions every day into exactly one phase', () => {
      const fromPhases = n5.phases.flatMap((p) => getRecoveryDaysOfPhase('N5', p.id));
      expect(fromPhases).toHaveLength(n5.days.length);
      for (const phase of n5.phases) {
        for (const day of getRecoveryDaysOfPhase('N5', phase.id)) {
          expect(day.day).toBeGreaterThanOrEqual(phase.dayFrom);
          expect(day.day).toBeLessThanOrEqual(phase.dayTo);
        }
      }
    });
  });
});
