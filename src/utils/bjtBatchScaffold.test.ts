import {
  buildBjtClaudePromptTemplate,
  buildBjtRawBatchTemplate,
  buildBjtReviewNoteTemplate,
  buildBjtReviewedBatchTemplate,
  buildBjtRuntimePreviewTemplate,
} from './bjtBatchScaffold';

describe('bjtBatchScaffold', () => {
  const input = {
    id: 'j2-batch-001',
    level: 'J2' as const,
    label: 'J2 Batch 001',
  };

  it('builds empty json templates for raw and reviewed files', () => {
    expect(buildBjtRawBatchTemplate()).toBe('[\n]\n');
    expect(buildBjtReviewedBatchTemplate()).toBe('[\n]\n');
  });

  it('builds a review note template with batch metadata', () => {
    const note = buildBjtReviewNoteTemplate(input);

    expect(note).toContain('# J2 Batch 001 Review');
    expect(note).toContain('`j2-batch-001`');
    expect(note).toContain('Status: pending review');
  });

  it('builds a runtime preview template with batch metadata', () => {
    const preview = buildBjtRuntimePreviewTemplate(input);

    expect(preview).toContain('# J2 Batch 001 Runtime Preview');
    expect(preview).toContain('Runtime items: pending transform');
  });

  it('builds a Claude prompt template for the target level', () => {
    const prompt = buildBjtClaudePromptTemplate(input);

    expect(prompt).toContain('level J2');
    expect(prompt).toContain('"level": "J2"');
    expect(prompt).toContain('valid JSON array only');
  });
});
