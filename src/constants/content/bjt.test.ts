import {
  BJT_PRACTICE_QUESTIONS,
  BJT_LEVEL_BANDS,
  BJT_OVERVIEW,
  BJT_QUESTION_TYPES,
  BJT_STUDY_MODULES,
  BJT_STUDY_PLAN,
  BJT_VOCABULARY,
} from './bjt';
import { BJT_PIPELINE_BATCHES } from './bjtPipeline';

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
    expect(j3RuntimeItems).toHaveLength(12);
    expect(new Set(j3RuntimeItems.map((item) => item.level))).toEqual(new Set(['J3']));
  });

  it('tags reviewed J4 runtime items with an explicit J4 level', () => {
    const j4RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j4_'));
    expect(j4RuntimeItems).toHaveLength(12);
    expect(new Set(j4RuntimeItems.map((item) => item.level))).toEqual(new Set(['J4']));
  });

  it('tags reviewed J2 runtime items with an explicit J2 level', () => {
    const j2RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j2_'));
    expect(j2RuntimeItems).toHaveLength(12);
    expect(new Set(j2RuntimeItems.map((item) => item.level))).toEqual(new Set(['J2']));
  });

  it('tags reviewed J1 runtime items with an explicit J1 level', () => {
    const j1RuntimeItems = BJT_PRACTICE_QUESTIONS.filter((item) => item.id.startsWith('j1_'));
    expect(j1RuntimeItems).toHaveLength(12);
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
