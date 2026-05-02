import { useState, useEffect, useCallback } from 'react';
import { loadGuideStepProgress, toggleGuideStep, clearGuideStepProgress } from '../utils/guideStepProgress';

interface GuideProgressResult {
  completedSteps: Set<number>;
  toggleStep: (stepIndex: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  progressRatio: number;
}

export function useGuideProgress(guideId: string, totalSteps: number): GuideProgressResult {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!guideId) return;
    loadGuideStepProgress(guideId).then(setCompletedSteps);
  }, [guideId]);

  const toggleStep = useCallback(
    async (stepIndex: number) => {
      const next = await toggleGuideStep(guideId, stepIndex);
      setCompletedSteps(new Set(next));
    },
    [guideId],
  );

  const resetProgress = useCallback(async () => {
    await clearGuideStepProgress(guideId);
    setCompletedSteps(new Set());
  }, [guideId]);

  const progressRatio = totalSteps > 0 ? completedSteps.size / totalSteps : 0;

  return { completedSteps, toggleStep, resetProgress, progressRatio };
}
