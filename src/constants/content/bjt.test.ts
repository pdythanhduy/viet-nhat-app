import {
  BJT_DOCUMENT_META,
  BJT_FLASHCARD_SETS,
  BJT_PRACTICE_QUESTIONS,
  BJT_LEVEL_BANDS,
  BJT_MOCK_V2_EXAMS,
  BJT_MOCK_V2_META,
  BJT_OVERVIEW,
  BJT_QUESTION_TYPES,
  BJT_READING_PASSAGES,
  BJT_STUDY_MODULES,
  BJT_STUDY_PLAN,
  BJT_ULTIMATE_STUDY_PLAN,
  BJT_VOCABULARY,
} from './bjt';
import { BJT_PIPELINE_BATCHES } from './bjtPipeline';

const BJT_MOCK_V2_SOURCE = require('../../../docs/bjt/document/BJT_50_MOCK_EXAMS_V2.json') as {
  meta: {
    total_exams: number;
    total_questions: number;
    unique_question_bank: {
      notices: number;
      emails: number;
      keigo: number;
      listening: number;
      listening_reading: number;
      total_unique: number;
    };
  };
  exams: Array<{
    exam_id: string;
    total_questions: number;
    time_limit_minutes: number;
    parts: { I: number; II: number; III: number };
    questions: Array<{
      id: string;
      part: 'I' | 'II' | 'III';
      level: string;
      passage_jp: string;
      question_jp: string;
      answer: string;
    }>;
  }>;
};

const MOJIBAKE_MARKER_PATTERN =
  /\u00C2[\u0080-\u00BF]|\u00C3[\u0080-\u00BF]|\u00E2[\u0080-\u00BF]{2}|\u00E3[\u0080-\u00BF]{2}|\u00E5[\u0080-\u00BF]{2}|\u00E6[\u0080-\u00BF]{2}|\u00E7[\u0080-\u00BF]{2}|\u00E8[\u0080-\u00BF]{2}|\u00E9[\u0080-\u00BF]{2}|\u00EF\u00BE[\u0080-\u00BF]?/;

function collectSuspiciousStrings(value: unknown, hits: string[] = []): string[] {
  if (typeof value === 'string') {
    if (MOJIBAKE_MARKER_PATTERN.test(value)) {
      hits.push(value);
    }
    return hits;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectSuspiciousStrings(item, hits);
    }
    return hits;
  }

  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) {
      collectSuspiciousStrings(nested, hits);
    }
  }

  return hits;
}

describe('bjt content', () => {
  it('contains the core prep sections', () => {
    expect(BJT_OVERVIEW.examFocus.length).toBeGreaterThanOrEqual(3);
    expect(BJT_STUDY_MODULES).toHaveLength(4);
    expect(BJT_QUESTION_TYPES.length).toBeGreaterThanOrEqual(3);
    expect(BJT_LEVEL_BANDS.length).toBeGreaterThanOrEqual(4);
    expect(BJT_STUDY_PLAN).toHaveLength(14);
    expect(BJT_VOCABULARY.length).toBeGreaterThanOrEqual(12);
    expect(BJT_PRACTICE_QUESTIONS.length).toBeGreaterThanOrEqual(69);
  });

  it('loads the ultimate BJT partition counts', () => {
    expect(BJT_DOCUMENT_META.totalVocabulary).toBe(1000);
    expect(BJT_DOCUMENT_META.totalScenarios).toBe(20);
    expect(BJT_DOCUMENT_META.totalMockSets).toBe(60);
    expect(BJT_READING_PASSAGES).toHaveLength(10);
    expect(BJT_FLASHCARD_SETS).toHaveLength(15);
    expect(BJT_ULTIMATE_STUDY_PLAN.weeks).toHaveLength(12);
  });

  it('keeps Mock Exams V2 counts aligned with the source file', () => {
    expect(BJT_MOCK_V2_SOURCE.meta.total_exams).toBe(50);
    expect(BJT_MOCK_V2_SOURCE.meta.total_questions).toBe(4000);
    expect(BJT_MOCK_V2_SOURCE.meta.unique_question_bank).toEqual({
      notices: 26,
      emails: 15,
      keigo: 15,
      listening: 10,
      listening_reading: 10,
      total_unique: 76,
    });
    expect(BJT_MOCK_V2_SOURCE.exams).toHaveLength(50);
    expect(BJT_MOCK_V2_SOURCE.exams.every((exam) => exam.total_questions === 80)).toBe(true);
    expect(BJT_MOCK_V2_SOURCE.exams.every((exam) => exam.time_limit_minutes === 120)).toBe(true);
    expect(
      BJT_MOCK_V2_SOURCE.exams.every(
        (exam) => exam.parts.I === 25 && exam.parts.II === 15 && exam.parts.III === 40
      )
    ).toBe(true);
    expect(
      BJT_MOCK_V2_SOURCE.exams.reduce((sum, exam) => sum + exam.questions.length, 0)
    ).toBe(4000);
  });

  it('exports Mock Exams V2 counts consistently for app screens', () => {
    expect(BJT_MOCK_V2_META.totalExams).toBe(BJT_MOCK_V2_SOURCE.meta.total_exams);
    expect(BJT_MOCK_V2_META.totalQuestions).toBe(BJT_MOCK_V2_SOURCE.meta.total_questions);
    expect(BJT_MOCK_V2_EXAMS).toHaveLength(BJT_MOCK_V2_SOURCE.exams.length);
    expect(BJT_MOCK_V2_EXAMS.every((exam) => exam.totalQuestions === 80)).toBe(true);
  });

  it('records the actual Mock Exams V2 level coverage instead of overstating it', () => {
    const levels = new Set(
      BJT_MOCK_V2_SOURCE.exams.flatMap((exam) => exam.questions.map((question) => question.level))
    );
    expect(levels).toEqual(new Set(['J2', 'J3', 'J4']));
    expect(levels.has('J5')).toBe(false);
    expect(levels.has('J1')).toBe(false);
    expect(levels.has('J1+')).toBe(false);
  });

  it('keeps Mock Exams V2 backed by the declared unique question pool', () => {
    const uniqueQuestions = new Set(
      BJT_MOCK_V2_SOURCE.exams.flatMap((exam) =>
        exam.questions.map((question) =>
          JSON.stringify([
            question.part,
            question.level,
            question.passage_jp,
            question.question_jp,
            question.answer,
          ])
        )
      )
    );
    expect(uniqueQuestions.size).toBe(BJT_MOCK_V2_SOURCE.meta.unique_question_bank.total_unique);
  });

  it('keeps study plan days sequential', () => {
    expect(BJT_STUDY_PLAN.map((item) => item.day)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
    ]);
  });

  it('keeps question answer indexes valid', () => {
    for (const item of BJT_PRACTICE_QUESTIONS) {
      expect(item.correctIndex).toBeGreaterThanOrEqual(0);
      expect(item.correctIndex).toBeLessThan(item.options.length);
    }
  });

  it('repairs legacy vocabulary strings after import', () => {
    expect(collectSuspiciousStrings(BJT_VOCABULARY)).toEqual([]);
  });

  it('repairs legacy practice-question strings after import', () => {
    expect(collectSuspiciousStrings(BJT_PRACTICE_QUESTIONS)).toEqual([]);
  });

  it('keeps known legacy vocabulary samples readable after JSON extraction', () => {
    const deadline = BJT_VOCABULARY.find((item) => item.id === 'deadline');
    expect(deadline).toBeDefined();
    expect(deadline?.vn).toBe('hạn chót');
    expect(deadline?.exampleVn).toContain('Hạn chót');
    expect(deadline?.reading).toBe('しめきり');
  });

  it('keeps known legacy practice-question samples readable after JSON extraction', () => {
    const sample = BJT_PRACTICE_QUESTIONS.find((item) => item.id === 'j3_reading_001');
    expect(sample).toBeDefined();
    expect(sample?.title).toBe('Email đổi phòng họp (J3)');
    expect(sample?.prompt).toContain('山田さん');
    expect(sample?.explanation).toContain('Email thông báo phòng họp thay đổi');
  });

  it('covers every skill and difficulty band', () => {
    expect(new Set(BJT_PRACTICE_QUESTIONS.map((item) => item.skill))).toEqual(
      new Set(['listening', 'listening-reading', 'reading'])
    );
    expect(new Set(BJT_PRACTICE_QUESTIONS.map((item) => item.difficulty))).toEqual(
      new Set(['basic', 'intermediate', 'advanced'])
    );
  });

  it('tags reviewed J3 runtime items with an explicit J3 level', () => {
    const j3RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j3_'));
    expect(j3RuntimeItems).toHaveLength(16);
    expect(new Set(j3RuntimeItems.map((item) => item.level))).toEqual(new Set(['J3']));
  });

  it('tags reviewed J4 runtime items with an explicit J4 level', () => {
    const j4RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j4_'));
    expect(j4RuntimeItems).toHaveLength(16);
    expect(new Set(j4RuntimeItems.map((item) => item.level))).toEqual(new Set(['J4']));
  });

  it('tags reviewed J2 runtime items with an explicit J2 level', () => {
    const j2RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j2_'));
    expect(j2RuntimeItems).toHaveLength(16);
    expect(new Set(j2RuntimeItems.map((item) => item.level))).toEqual(new Set(['J2']));
  });

  it('tags reviewed J1 runtime items with an explicit J1 level', () => {
    const j1RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j1_'));
    expect(j1RuntimeItems).toHaveLength(16);
    expect(new Set(j1RuntimeItems.map((item) => item.level))).toEqual(new Set(['J1']));
  });

  it('keeps pipeline manifest aligned with imported runtime ids', () => {
    for (const batch of BJT_PIPELINE_BATCHES) {
      expect(batch.rawFile.endsWith('.json')).toBe(true);
      expect(batch.importedQuestionIds.length).toBeGreaterThan(0);
      for (const questionId of batch.importedQuestionIds) {
        expect(BJT_PRACTICE_QUESTIONS.some((item) => item.id === questionId)).toBe(true);
      }
    }
  });
});
