import { BjtPracticeQuestion } from '../types/content';
import { BjtTargetLevel, filterBjtQuestionsByLevel } from './bjtQuestionLevels';

type BjtSkill = BjtPracticeQuestion['skill'];
type BjtDifficulty = BjtPracticeQuestion['difficulty'];

export interface BjtCoverageSummary {
  level: BjtTargetLevel;
  total: number;
  bySkill: Record<BjtSkill, number>;
  byDifficulty: Record<BjtDifficulty, number>;
}

const EMPTY_SKILL_COUNTS: Record<BjtSkill, number> = {
  listening: 0,
  'listening-reading': 0,
  reading: 0,
};

const EMPTY_DIFFICULTY_COUNTS: Record<BjtDifficulty, number> = {
  basic: 0,
  intermediate: 0,
  advanced: 0,
};

export function getBjtCoverageSummary(
  questions: BjtPracticeQuestion[],
  level: BjtTargetLevel
): BjtCoverageSummary {
  const scoped = filterBjtQuestionsByLevel(questions, level);
  const bySkill = { ...EMPTY_SKILL_COUNTS };
  const byDifficulty = { ...EMPTY_DIFFICULTY_COUNTS };

  for (const question of scoped) {
    bySkill[question.skill] += 1;
    byDifficulty[question.difficulty] += 1;
  }

  return {
    level,
    total: scoped.length,
    bySkill,
    byDifficulty,
  };
}
