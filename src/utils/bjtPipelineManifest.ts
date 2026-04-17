import type { BjtPipelineBatch, BjtPracticeQuestion, BjtAuthoringLevel } from '../types/content';

export interface BjtPipelineManifestInput {
  id: string;
  level: BjtAuthoringLevel;
  label: string;
  rawFile: string;
  reviewedFile?: string;
  runtimeFile?: string;
  reviewNoteFile?: string;
  runtimePreviewFile?: string;
}

export function buildBjtPipelineBatchEntry(
  input: BjtPipelineManifestInput,
  runtimeQuestions: Pick<BjtPracticeQuestion, 'id'>[]
): BjtPipelineBatch {
  return {
    ...input,
    importedQuestionIds: runtimeQuestions.map((item) => item.id),
  };
}

export function renderBjtPipelineBatchSnippet(batch: BjtPipelineBatch): string {
  const optionalLines = [
    batch.reviewedFile ? `  reviewedFile: '${batch.reviewedFile}',` : '',
    batch.runtimeFile ? `  runtimeFile: '${batch.runtimeFile}',` : '',
    batch.reviewNoteFile ? `  reviewNoteFile: '${batch.reviewNoteFile}',` : '',
    batch.runtimePreviewFile ? `  runtimePreviewFile: '${batch.runtimePreviewFile}',` : '',
  ].filter(Boolean);

  const importedIds = batch.importedQuestionIds.map((id) => `    '${id}',`).join('\n');

  return [
    '{',
    `  id: '${batch.id}',`,
    `  level: '${batch.level}',`,
    `  label: '${batch.label}',`,
    `  rawFile: '${batch.rawFile}',`,
    ...optionalLines,
    '  importedQuestionIds: [',
    importedIds,
    '  ],',
    '}',
  ].join('\n');
}
