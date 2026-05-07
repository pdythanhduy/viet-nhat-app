import { BJT_PRACTICE_QUESTIONS } from '../constants/content/bjt';
import { BJT_PIPELINE_BATCHES } from '../constants/content/bjtPipeline';
import { getBjtCoverageSummary } from './bjtQuestionCoverage';
import { buildClaudePromptForGapAction, getBjtPipelineGapActions } from './bjtPipelineGaps';

describe('bjtPipelineGaps', () => {
  it('returns meaningful actions for a level that still needs broader J2 coverage', () => {
    const actions = getBjtPipelineGapActions({
      level: 'J2',
      coverage: getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, 'J2'),
      batches: BJT_PIPELINE_BATCHES.filter((batch) => batch.level === 'J2'),
    });

    expect(actions.length).toBeGreaterThan(0);
    expect(actions.some((item) => item.id === 'J2-missing-batch')).toBe(false);
    expect(actions.some((item) => item.id.includes('gap'))).toBe(true);
  });

  it('returns no hard batch-missing action for J3 imported data', () => {
    const actions = getBjtPipelineGapActions({
      level: 'J3',
      coverage: getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, 'J3'),
      batches: BJT_PIPELINE_BATCHES.filter((batch) => batch.level === 'J3'),
    });

    expect(actions.some((item) => item.id === 'J3-missing-batch')).toBe(false);
  });

  it('builds a Claude-ready prompt from a gap action', () => {
    const action = getBjtPipelineGapActions({
      level: 'J2',
      coverage: getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, 'J2'),
      batches: BJT_PIPELINE_BATCHES.filter((batch) => batch.level === 'J2'),
    })[0]!;

    const prompt = buildClaudePromptForGapAction(action, 'J2');

    expect(prompt).toContain('level J2');
    expect(prompt).toContain(action.title);
    expect(prompt).toContain('valid JSON array only');
  });
});
