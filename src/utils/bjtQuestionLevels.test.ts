import { BJT_PRACTICE_QUESTIONS } from '../constants/content';
import type { BjtPracticeQuestion } from '../types/content';

import {
  filterBjtQuestionsByLevel,
  getAvailableBjtLevels,
  getBjtQuestionLevel,
} from './bjtQuestionLevels';

describe('bjtQuestionLevels', () => {
  it('prefers explicit levels when available', () => {
    const explicit = BJT_PRACTICE_QUESTIONS.find((item) => item.id === 'j3_reading_001');
    expect(explicit).toBeDefined();
    expect(getBjtQuestionLevel(explicit!)).toBe('J3');
  });

  it('infers legacy levels from difficulty', () => {
    const legacyLikeQuestion: BjtPracticeQuestion = {
      id: 'legacy-sample',
      skill: 'reading',
      difficulty: 'basic',
      title: 'legacy',
      situation: 'legacy',
      prompt: 'legacy',
      options: ['A', 'B'],
      correctIndex: 0,
      explanation: 'legacy',
    };

    expect(getBjtQuestionLevel(legacyLikeQuestion)).toBe('J4');
  });

  it('filters question banks by target level', () => {
    const j3 = filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, 'J3');
    expect(j3.length).toBeGreaterThanOrEqual(12);
    expect(j3.every((item) => getBjtQuestionLevel(item) === 'J3')).toBe(true);
  });

  it('returns available level chips in display order', () => {
    expect(getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS)).toEqual([
      'all',
      'J5',
      'J4',
      'J3',
      'J2',
      'J1',
      'J1+',
    ]);
  });
});
