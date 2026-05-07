import { BJT_PIPELINE_BATCHES } from '../constants/content/bjtPipeline';
import { getBjtPipelineStage, getBjtPipelineSummary } from './bjtPipeline';

describe('bjtPipeline', () => {
  it('marks imported batches at the highest completed stage', () => {
    expect(getBjtPipelineStage(BJT_PIPELINE_BATCHES[0]!)).toBe('runtime-imported');
  });

  it('summarizes pipeline counts from the manifest', () => {
    const summary = getBjtPipelineSummary(BJT_PIPELINE_BATCHES);

    expect(summary.totalBatches).toBeGreaterThanOrEqual(1);
    expect(summary.runtimeImportedBatches).toBeGreaterThanOrEqual(1);
    expect(summary.importedQuestions).toBeGreaterThanOrEqual(12);
  });
});
