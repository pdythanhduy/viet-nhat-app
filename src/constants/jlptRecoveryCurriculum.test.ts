import {
  getRecoveryCurriculum,
  getRecoveryCurriculumDay,
  getRecoveryDaysOfPhase,
  hasRecoveryCurriculum,
} from './jlptRecoveryCurriculum';

describe('jlptRecoveryCurriculum registry', () => {
  it('marks the levels with wired-up curricula as available', () => {
    expect(hasRecoveryCurriculum('N5')).toBe(true);
    expect(hasRecoveryCurriculum('N4')).toBe(true);
    expect(hasRecoveryCurriculum('N3')).toBe(true);
    expect(hasRecoveryCurriculum('N2')).toBe(true);
    expect(hasRecoveryCurriculum('N1')).toBe(true);
  });

  it('returns undefined for a day outside the curriculum range', () => {
    expect(getRecoveryCurriculumDay('N1', 0)).toBeUndefined();
    expect(getRecoveryCurriculumDay('N1', 999)).toBeUndefined();
    expect(getRecoveryDaysOfPhase('N1', 99)).toEqual([]);
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

  describe('N4 curriculum', () => {
    const n4 = getRecoveryCurriculum('N4')!;

    it('has 40 contiguous days numbered 1..40', () => {
      expect(n4.days).toHaveLength(40);
      expect(n4.days.map((d) => d.day)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
    });

    it('marks the expected review/test days', () => {
      const reviews = n4.days.filter((d) => d.kind === 'review').map((d) => d.day);
      const tests = n4.days.filter((d) => d.kind === 'test').map((d) => d.day);
      expect(reviews).toEqual([8, 16, 26, 34, 39]);
      expect(tests).toEqual([40]);
    });

    it('gives every normal day a vocab topic and at least one grammar pattern', () => {
      for (const day of n4.days.filter((d) => d.kind === 'normal')) {
        expect(day.vocabTopic).not.toBe('—');
        expect(day.vocabTopic.length).toBeGreaterThan(0);
        expect(day.grammar.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('uses the "—" vocab placeholder on review/test days', () => {
      for (const day of n4.days.filter((d) => d.kind !== 'normal')) {
        expect(day.vocabTopic).toBe('—');
      }
    });

    it('partitions every day into exactly one phase', () => {
      const fromPhases = n4.phases.flatMap((p) => getRecoveryDaysOfPhase('N4', p.id));
      expect(fromPhases).toHaveLength(n4.days.length);
      for (const phase of n4.phases) {
        for (const day of getRecoveryDaysOfPhase('N4', phase.id)) {
          expect(day.day).toBeGreaterThanOrEqual(phase.dayFrom);
          expect(day.day).toBeLessThanOrEqual(phase.dayTo);
        }
      }
    });
  });

  describe('N3 curriculum', () => {
    const n3 = getRecoveryCurriculum('N3')!;

    it('has 60 contiguous days numbered 1..60', () => {
      expect(n3.days).toHaveLength(60);
      expect(n3.days.map((d) => d.day)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
    });

    it('marks the expected review/test days', () => {
      const reviews = n3.days.filter((d) => d.kind === 'review').map((d) => d.day);
      const tests = n3.days.filter((d) => d.kind === 'test').map((d) => d.day);
      expect(reviews).toEqual([10, 20, 30, 40, 50, 59]);
      expect(tests).toEqual([60]);
    });

    it('gives every normal day a vocab topic and at least one grammar pattern', () => {
      for (const day of n3.days.filter((d) => d.kind === 'normal')) {
        expect(day.vocabTopic).not.toBe('—');
        expect(day.vocabTopic.length).toBeGreaterThan(0);
        expect(day.grammar.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('uses the "—" vocab placeholder on review/test days', () => {
      for (const day of n3.days.filter((d) => d.kind !== 'normal')) {
        expect(day.vocabTopic).toBe('—');
      }
    });

    it('partitions every day into exactly one phase', () => {
      const fromPhases = n3.phases.flatMap((p) => getRecoveryDaysOfPhase('N3', p.id));
      expect(fromPhases).toHaveLength(n3.days.length);
      for (const phase of n3.phases) {
        for (const day of getRecoveryDaysOfPhase('N3', phase.id)) {
          expect(day.day).toBeGreaterThanOrEqual(phase.dayFrom);
          expect(day.day).toBeLessThanOrEqual(phase.dayTo);
        }
      }
    });
  });

  describe('N1 curriculum', () => {
    const n1 = getRecoveryCurriculum('N1')!;

    it('has 80 contiguous days numbered 1..80', () => {
      expect(n1.days).toHaveLength(80);
      expect(n1.days.map((d) => d.day)).toEqual(Array.from({ length: 80 }, (_, i) => i + 1));
    });

    it('marks the expected review/test days', () => {
      const reviews = n1.days.filter((d) => d.kind === 'review').map((d) => d.day);
      const tests = n1.days.filter((d) => d.kind === 'test').map((d) => d.day);
      expect(reviews).toEqual([12, 26, 40, 54, 68, 79]);
      expect(tests).toEqual([80]);
    });

    it('gives every normal day a vocab topic and at least one grammar pattern', () => {
      for (const day of n1.days.filter((d) => d.kind === 'normal')) {
        expect(day.vocabTopic).not.toBe('—');
        expect(day.vocabTopic.length).toBeGreaterThan(0);
        expect(day.grammar.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('uses the "—" vocab placeholder on review/test days', () => {
      for (const day of n1.days.filter((d) => d.kind !== 'normal')) {
        expect(day.vocabTopic).toBe('—');
      }
    });

    it('partitions every day into exactly one phase', () => {
      const fromPhases = n1.phases.flatMap((p) => getRecoveryDaysOfPhase('N1', p.id));
      expect(fromPhases).toHaveLength(n1.days.length);
      for (const phase of n1.phases) {
        for (const day of getRecoveryDaysOfPhase('N1', phase.id)) {
          expect(day.day).toBeGreaterThanOrEqual(phase.dayFrom);
          expect(day.day).toBeLessThanOrEqual(phase.dayTo);
        }
      }
    });
  });
});
