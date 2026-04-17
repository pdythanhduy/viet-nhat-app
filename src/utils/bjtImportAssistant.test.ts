import type { BjtAuthoringQuestion, BjtReviewDecision } from '../types/content';
import { auditBjtImportReadiness } from './bjtImportAssistant';

const baseItem: BjtAuthoringQuestion = {
  id: 'j3_reading_001',
  level: 'J3',
  skill: 'reading',
  difficulty: 'intermediate',
  business_topic: 'email',
  situation: '社内メールを読んでいます。',
  prompt: '次に何をすべきですか。',
  options: ['A', 'B', 'C', 'D'],
  correctIndex: 1,
  explanation_vi: 'Giai thich ngắn gon.',
  vocabulary: ['定例会議'],
  grammar_points: ['〜してください'],
  action_focus: 'Xac dinh hanh dong',
  level_reason: 'Phu hop J3.',
  why_not_lower_level: 'Can doi chieu thong tin.',
  why_not_higher_level: 'Khong co xung dot phuc tap.',
};

describe('bjtImportAssistant', () => {
  it('reports ready-to-import batches cleanly', () => {
    const decisions: BjtReviewDecision[] = [
      {
        id: 'j3_reading_001',
        reviewStatus: 'approved',
        runtimeTitle: 'Email doi lich hop (J3)',
      },
    ];

    const audit = auditBjtImportReadiness([baseItem], decisions);

    expect(audit.readyToImport).toBe(true);
    expect(audit.importableCount).toBe(1);
    expect(audit.runtimeQuestionIds).toEqual(['j3_reading_001']);
  });

  it('flags missing review decisions before import', () => {
    const audit = auditBjtImportReadiness([baseItem], []);

    expect(audit.readyToImport).toBe(false);
    expect(audit.missingDecisionIds).toEqual(['j3_reading_001']);
    expect(audit.runtimeQuestionIds).toEqual([]);
  });

  it('flags non-approved items and invalid approved items', () => {
    const invalidItem: BjtAuthoringQuestion = {
      ...baseItem,
      id: 'j3_reading_002',
      options: ['A', 'A', 'C', 'D'],
    };
    const decisions: BjtReviewDecision[] = [
      {
        id: 'j3_reading_001',
        reviewStatus: 'needs_revision',
      },
      {
        id: 'j3_reading_002',
        reviewStatus: 'approved',
      },
    ];

    const audit = auditBjtImportReadiness([baseItem, invalidItem], decisions);

    expect(audit.readyToImport).toBe(false);
    expect(audit.nonApprovedIds).toEqual(['j3_reading_001']);
    expect(audit.invalidApprovedItems[0]?.id).toBe('j3_reading_002');
    expect(audit.runtimeQuestionIds).toEqual([]);
  });
});
