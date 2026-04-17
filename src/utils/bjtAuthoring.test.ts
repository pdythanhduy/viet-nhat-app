import {
  applyBjtReviewDecisions,
  buildBjtRuntimeTitle,
  toApprovedBjtPracticeQuestions,
  toBjtPracticeQuestion,
  validateBjtAuthoringQuestion,
} from './bjtAuthoring';
import type { BjtAuthoringQuestion, BjtReviewedAuthoringQuestion } from '../types/content';

const baseItem: BjtReviewedAuthoringQuestion = {
  id: 'j3_reading_001',
  level: 'J3',
  skill: 'reading',
  difficulty: 'intermediate',
  business_topic: 'email',
  situation: '社内メールを読んでいます。',
  prompt: '次に何をすべきですか？',
  options: ['A', 'B', 'C', 'D'],
  correctIndex: 1,
  explanation_vi: 'Chọn hành động khớp với thông tin email.',
  vocabulary: ['定例会議'],
  grammar_points: ['〜させていただきます'],
  action_focus: 'Xác định hành động tiếp theo',
  level_reason: 'J3 do cần hiểu email nội bộ và suy ra việc cần làm.',
  why_not_lower_level: 'Có nhiều điều kiện cần tách đúng.',
  why_not_higher_level: 'Không có xung đột nhiều nguồn thông tin.',
  reviewStatus: 'approved',
};

const { reviewStatus, runtimeTitle, reviewNotes, ...rawBaseItem } = baseItem;

describe('bjtAuthoring', () => {
  it('builds a stable fallback runtime title', () => {
    expect(buildBjtRuntimeTitle(baseItem)).toBe('Business Email (J3)');
  });

  it('validates duplicate options and invalid indexes', () => {
    const invalidItem: BjtReviewedAuthoringQuestion = {
      ...baseItem,
      options: ['A', 'A', 'C', 'D'],
      correctIndex: 6,
    };

    expect(validateBjtAuthoringQuestion(invalidItem)).toEqual(
      expect.arrayContaining([
        'correctIndex must point to a valid option',
        'options must not contain duplicates',
      ])
    );
  });

  it('transforms approved reviewed items into runtime practice questions', () => {
    const runtime = toBjtPracticeQuestion({
      ...baseItem,
      runtimeTitle: 'Email đổi phòng họp',
    });

    expect(runtime).toEqual({
      id: 'j3_reading_001',
      level: 'J3',
      skill: 'reading',
      difficulty: 'intermediate',
      title: 'Email đổi phòng họp',
      situation: '社内メールを読んでいます。',
      prompt: '次に何をすべきですか？',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Chọn hành động khớp với thông tin email.',
    });
  });

  it('refuses to transform non-approved items', () => {
    expect(() =>
      toBjtPracticeQuestion({
        ...baseItem,
        reviewStatus: 'needs_revision',
      })
    ).toThrow('Cannot transform item "j3_reading_001" with status "needs_revision"');
  });

  it('filters non-approved items from batch transforms', () => {
    const questions = toApprovedBjtPracticeQuestions([
      baseItem,
      {
        ...baseItem,
        id: 'j3_reading_002',
        reviewStatus: 'needs_revision',
      },
    ]);

    expect(questions).toHaveLength(1);
    expect(questions[0]?.id).toBe('j3_reading_001');
  });

  it('applies review decisions to raw authoring items', () => {
    const rawItems: BjtAuthoringQuestion[] = [rawBaseItem];

    const reviewed = applyBjtReviewDecisions(rawItems, [
      {
        id: 'j3_reading_001',
        reviewStatus: 'approved',
        runtimeTitle: 'Email doi lich hop',
        reviewNotes: ['Ready for runtime import after copy-edit.'],
      },
    ]);

    expect(reviewed[0]).toMatchObject({
      id: 'j3_reading_001',
      reviewStatus: 'approved',
      runtimeTitle: 'Email doi lich hop',
    });
  });

  it('fails when a raw item has no matching review decision', () => {
    expect(() =>
      applyBjtReviewDecisions(
        [rawBaseItem],
        []
      )
    ).toThrow('Missing review decision for item "j3_reading_001"');
  });
});
