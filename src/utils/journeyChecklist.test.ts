jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

import { buildJourneyChecklistPlan, getJourneyChecklistCounts } from './journeyChecklist';

describe('journeyChecklist', () => {
  it('builds new arrival plan when profile is missing', () => {
    const plan = buildJourneyChecklistPlan(null);

    expect(plan.id).toBe('new-arrival');
    expect(plan.sections.length).toBeGreaterThan(0);
  });

  it('calculates checked and total counts', () => {
    const plan = buildJourneyChecklistPlan({
      visaStatus: 'student',
      lifeStage: 'new-arrival',
      household: 'alone',
      prefecture: 'Tokyo',
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:00.000Z',
    });

    const counts = getJourneyChecklistCounts(plan, ['new-arrival-zairyu', 'new-arrival-japanese']);

    expect(counts.checked).toBe(2);
    expect(counts.total).toBeGreaterThan(counts.checked);
  });
});
