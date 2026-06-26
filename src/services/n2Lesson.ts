import { getN2Day } from '../constants/n2RecoveryCurriculum';
import {
  getRecoveryLesson,
  hasCachedRecoveryLesson,
  isRecoveryLessonConfigured,
} from './jlptRecoveryLesson';
import type { RecoveryGrammarExample, RecoveryGrammarItem, RecoveryLesson } from './jlptRecoveryTypes';

export type N2Example = RecoveryGrammarExample;
export type N2GrammarItem = RecoveryGrammarItem;
export type N2Lesson = RecoveryLesson;

export function isLessonConfigured(): boolean {
  return isRecoveryLessonConfigured();
}

export async function generateN2Lesson(day: number): Promise<N2Lesson> {
  const info = getN2Day(day);
  if (!info) throw new Error(`Khong co Day ${day}.`);
  return getRecoveryLesson({
    level: 'N2',
    day,
    theme: info.theme,
    patterns: info.grammar,
  }) as Promise<N2Lesson>;
}

export async function hasCachedLesson(day: number): Promise<boolean> {
  const info = getN2Day(day);
  if (!info) return false;
  return hasCachedRecoveryLesson({
    level: 'N2',
    day,
    theme: info.theme,
    patterns: info.grammar,
  });
}
