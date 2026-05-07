import { BJT_PRACTICE_QUESTIONS } from '../constants/content/bjt';
import { getBjtCoverageSummary } from './bjtQuestionCoverage';

describe('bjtQuestionCoverage', () => {
  it('summarizes J3 coverage from the current question bank', () => {
    const summary = getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, 'J3');

    expect(summary.level).toBe('J3');
    expect(summary.total).toBeGreaterThanOrEqual(12);
    expect(summary.bySkill.listening).toBeGreaterThan(0);
    expect(summary.bySkill['listening-reading']).toBeGreaterThan(0);
    expect(summary.bySkill.reading).toBeGreaterThan(0);
    expect(summary.byDifficulty.intermediate).toBeGreaterThan(0);
  });

  it('keeps all-level total aligned with the question bank size', () => {
    const summary = getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, 'all');

    expect(summary.total).toBe(BJT_PRACTICE_QUESTIONS.length);
    expect(
      summary.bySkill.listening +
        summary.bySkill['listening-reading'] +
        summary.bySkill.reading
    ).toBe(BJT_PRACTICE_QUESTIONS.length);
  });
});
