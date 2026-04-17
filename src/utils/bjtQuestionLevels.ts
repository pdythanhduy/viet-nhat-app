import type { BjtAuthoringLevel, BjtPracticeQuestion } from '../types/content';

export type BjtTargetLevel = BjtAuthoringLevel | 'all';

// Legacy runtime questions did not carry an explicit BJT level.
// We infer a reasonable default from difficulty so the level filters can
// coexist with the older question bank until every item is manually tagged.
const INFERRED_LEVEL_BY_DIFFICULTY: Record<BjtPracticeQuestion['difficulty'], BjtAuthoringLevel> = {
  basic: 'J4',
  intermediate: 'J3',
  advanced: 'J2',
};

export function getBjtQuestionLevel(question: BjtPracticeQuestion): BjtAuthoringLevel {
  return question.level ?? INFERRED_LEVEL_BY_DIFFICULTY[question.difficulty];
}

export function filterBjtQuestionsByLevel(
  questions: BjtPracticeQuestion[],
  level: BjtTargetLevel
): BjtPracticeQuestion[] {
  if (level === 'all') {
    return questions;
  }

  return questions.filter((question) => getBjtQuestionLevel(question) === level);
}

export function getAvailableBjtLevels(questions: BjtPracticeQuestion[]): BjtTargetLevel[] {
  const levels = new Set<BjtTargetLevel>(['all']);
  for (const question of questions) {
    levels.add(getBjtQuestionLevel(question));
  }

  const ordered: BjtTargetLevel[] = ['all', 'J5', 'J4', 'J3', 'J2', 'J1', 'J1+'];
  return ordered.filter((level) => levels.has(level));
}
