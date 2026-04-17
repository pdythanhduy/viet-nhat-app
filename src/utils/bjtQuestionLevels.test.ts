import { BJT_PRACTICE_QUESTIONS } from '../constants/content';

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
    const legacy = BJT_PRACTICE_QUESTIONS.find((item) => item.id === 'q4');
    expect(legacy).toBeDefined();
    expect(getBjtQuestionLevel(legacy!)).toBe('J4');
  });

  it('filters question banks by target level', () => {
    const j3 = filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, 'J3');
    expect(j3.length).toBeGreaterThanOrEqual(12);
    expect(j3.every((item) => getBjtQuestionLevel(item) === 'J3')).toBe(true);
  });

  it('returns available level chips in display order', () => {
    expect(getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS)).toEqual([
      'all',
      'J4',
      'J3',
      'J2',
      'J1',
    ]);
  });
});
