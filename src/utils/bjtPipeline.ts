import { BjtPipelineBatch, BjtPipelineStage } from '../types/content';

export interface BjtPipelineSummary {
  totalBatches: number;
  rawBatches: number;
  reviewedBatches: number;
  runtimeImportedBatches: number;
  importedQuestions: number;
}

export function getBjtPipelineStage(batch: BjtPipelineBatch): BjtPipelineStage {
  if (batch.importedQuestionIds.length > 0) {
    return 'runtime-imported';
  }

  if (batch.reviewedFile) {
    return 'reviewed';
  }

  return 'raw';
}

export function getBjtPipelineSummary(batches: BjtPipelineBatch[]): BjtPipelineSummary {
  return batches.reduce(
    (acc, batch) => {
      acc.totalBatches += 1;

      const stage = getBjtPipelineStage(batch);
      if (stage === 'raw') acc.rawBatches += 1;
      if (stage === 'reviewed') acc.reviewedBatches += 1;
      if (stage === 'runtime-imported') acc.runtimeImportedBatches += 1;

      acc.importedQuestions += batch.importedQuestionIds.length;
      return acc;
    },
    {
      totalBatches: 0,
      rawBatches: 0,
      reviewedBatches: 0,
      runtimeImportedBatches: 0,
      importedQuestions: 0,
    }
  );
}
