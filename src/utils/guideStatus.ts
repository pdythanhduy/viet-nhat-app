export type GuideStatusFilter = 'all' | 'in-progress' | 'completed';

export interface GuideStepProgressState {
  totalSteps: number;
  completedStepCount: number;
  isInProgress: boolean;
  isCompleted: boolean;
}

export function getGuideStepProgressState(
  totalSteps: number,
  completedStepCount: number | undefined,
): GuideStepProgressState {
  const safeTotalSteps = Math.max(0, totalSteps);
  const safeCompletedStepCount = Math.max(0, completedStepCount ?? 0);
  const visibleCompletedStepCount = Math.min(safeCompletedStepCount, safeTotalSteps);

  return {
    totalSteps: safeTotalSteps,
    completedStepCount: visibleCompletedStepCount,
    isInProgress: visibleCompletedStepCount > 0 && visibleCompletedStepCount < safeTotalSteps,
    isCompleted: safeTotalSteps > 0 && visibleCompletedStepCount >= safeTotalSteps,
  };
}

export function matchesGuideStatusFilter(
  totalSteps: number,
  completedStepCount: number | undefined,
  filter: GuideStatusFilter,
) {
  const progressState = getGuideStepProgressState(totalSteps, completedStepCount);

  if (filter === 'all') return true;
  if (filter === 'in-progress') return progressState.isInProgress;
  return progressState.isCompleted;
}
