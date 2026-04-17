import { buildBjtPipelineBatchEntry, renderBjtPipelineBatchSnippet } from './bjtPipelineManifest';

describe('bjtPipelineManifest', () => {
  it('builds a manifest entry from metadata and runtime ids', () => {
    const entry = buildBjtPipelineBatchEntry(
      {
        id: 'j2-batch-002',
        level: 'J2',
        label: 'J2 Batch 002',
        rawFile: 'docs/bjt/raw/j2-batch-002.raw.json',
        reviewedFile: 'docs/bjt/reviewed/j2-batch-002.reviewed.json',
      },
      [{ id: 'j2_q_001' }, { id: 'j2_q_002' }]
    );

    expect(entry.importedQuestionIds).toEqual(['j2_q_001', 'j2_q_002']);
    expect(entry.level).toBe('J2');
  });

  it('renders a copy-ready snippet for bjtPipeline.ts', () => {
    const snippet = renderBjtPipelineBatchSnippet({
      id: 'j2-batch-002',
      level: 'J2',
      label: 'J2 Batch 002',
      rawFile: 'docs/bjt/raw/j2-batch-002.raw.json',
      reviewedFile: 'docs/bjt/reviewed/j2-batch-002.reviewed.json',
      runtimeFile: 'docs/bjt/reviewed/j2-batch-002.runtime.json',
      importedQuestionIds: ['j2_q_001', 'j2_q_002'],
    });

    expect(snippet).toContain("id: 'j2-batch-002'");
    expect(snippet).toContain("reviewedFile: 'docs/bjt/reviewed/j2-batch-002.reviewed.json'");
    expect(snippet).toContain("'j2_q_001'");
  });
});
