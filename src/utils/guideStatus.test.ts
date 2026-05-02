import { getGuideStepProgressState, matchesGuideStatusFilter } from './guideStatus';

describe('guideStatus', () => {
  it('classifies empty, untouched, in-progress, and completed guides', () => {
    expect(getGuideStepProgressState(0, 0)).toMatchObject({
      completedStepCount: 0,
      isInProgress: false,
      isCompleted: false,
    });

    expect(getGuideStepProgressState(4, 0)).toMatchObject({
      completedStepCount: 0,
      isInProgress: false,
      isCompleted: false,
    });

    expect(getGuideStepProgressState(4, 2)).toMatchObject({
      completedStepCount: 2,
      isInProgress: true,
      isCompleted: false,
    });

    expect(getGuideStepProgressState(4, 4)).toMatchObject({
      completedStepCount: 4,
      isInProgress: false,
      isCompleted: true,
    });
  });

  it('clamps stale or invalid progress counts before matching status', () => {
    expect(getGuideStepProgressState(4, 6)).toMatchObject({
      completedStepCount: 4,
      isInProgress: false,
      isCompleted: true,
    });

    expect(getGuideStepProgressState(4, -2)).toMatchObject({
      completedStepCount: 0,
      isInProgress: false,
      isCompleted: false,
    });

    expect(matchesGuideStatusFilter(0, 3, 'completed')).toBe(false);
  });

  it('matches quick filters from guide step progress', () => {
    expect(matchesGuideStatusFilter(4, 0, 'all')).toBe(true);
    expect(matchesGuideStatusFilter(4, 0, 'in-progress')).toBe(false);
    expect(matchesGuideStatusFilter(4, 0, 'completed')).toBe(false);

    expect(matchesGuideStatusFilter(4, 1, 'in-progress')).toBe(true);
    expect(matchesGuideStatusFilter(4, 1, 'completed')).toBe(false);

    expect(matchesGuideStatusFilter(4, 4, 'in-progress')).toBe(false);
    expect(matchesGuideStatusFilter(4, 4, 'completed')).toBe(true);
    expect(matchesGuideStatusFilter(4, 7, 'completed')).toBe(true);
  });
});
