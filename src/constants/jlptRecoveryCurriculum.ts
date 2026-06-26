// Registry mapping each JLPT level to its static day-by-day curriculum.
//
// The recovery engine itself is level-agnostic; a level only becomes browsable
// once its curriculum is wired up here. N2 reuses the existing 100-day course;
// N5 uses the 30-day curriculum. The rest stay "coming soon" until authored.

import type {
  JlptLevel,
  RecoveryCurriculum,
  RecoveryCurriculumDay,
  RecoveryCurriculumPhase,
} from '../services/jlptRecoveryTypes';
import { N2_DAYS, N2_PHASES } from './n2RecoveryCurriculum';
import { N4_DAYS, N4_PHASES } from './n4RecoveryCurriculum';
import { N5_DAYS, N5_PHASES } from './n5RecoveryCurriculum';

const CURRICULA: Partial<Record<JlptLevel, RecoveryCurriculum>> = {
  N2: { level: 'N2', phases: N2_PHASES, days: N2_DAYS },
  N4: { level: 'N4', phases: N4_PHASES, days: N4_DAYS },
  N5: { level: 'N5', phases: N5_PHASES, days: N5_DAYS },
};

export function getRecoveryCurriculum(level: JlptLevel): RecoveryCurriculum | undefined {
  return CURRICULA[level];
}

export function hasRecoveryCurriculum(level: JlptLevel): boolean {
  return Boolean(CURRICULA[level]);
}

export function getRecoveryCurriculumTotalDays(level: JlptLevel): number {
  return getRecoveryCurriculum(level)?.days.length ?? 0;
}

export function getRecoveryCurriculumDay(
  level: JlptLevel,
  day: number
): RecoveryCurriculumDay | undefined {
  return getRecoveryCurriculum(level)?.days.find((d) => d.day === day);
}

export function getRecoveryCurriculumPhase(
  level: JlptLevel,
  phaseId: number
): RecoveryCurriculumPhase | undefined {
  return getRecoveryCurriculum(level)?.phases.find((p) => p.id === phaseId);
}

export function getRecoveryDaysOfPhase(
  level: JlptLevel,
  phaseId: number
): RecoveryCurriculumDay[] {
  return getRecoveryCurriculum(level)?.days.filter((d) => d.phase === phaseId) ?? [];
}
