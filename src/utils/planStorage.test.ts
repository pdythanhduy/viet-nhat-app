import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearActivePlan,
  createPlanFromAnswers,
  loadActivePlan,
  saveActivePlan,
  snoozeStep,
  StoredPlan,
  toggleStepComplete,
} from './planStorage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('planStorage', () => {
  it('returns null when no plan is stored', async () => {
    const p = await loadActivePlan('lost-residence-card');
    expect(p).toBeNull();
  });

  it('creates and reads back a plan from wizard answers', async () => {
    const answers = { 'q1-when': 'today', 'q4-visa': 'long' };
    const created = await createPlanFromAnswers('lost-residence-card', answers);
    expect(created.flowId).toBe('lost-residence-card');
    expect(created.answers).toEqual(answers);
    expect(created.completedSteps).toEqual({});
    expect(created.version).toBe(1);

    const loaded = await loadActivePlan('lost-residence-card');
    expect(loaded).toEqual(created);
  });

  it('toggles step completion idempotently', async () => {
    await createPlanFromAnswers('lost-residence-card', {});

    const after1 = await toggleStepComplete('lost-residence-card', 'today-1');
    expect(after1?.completedSteps['today-1']).toBeTruthy();

    const after2 = await toggleStepComplete('lost-residence-card', 'today-1');
    expect(after2?.completedSteps['today-1']).toBeUndefined();
  });

  it('returns null when toggling a step with no active plan', async () => {
    const r = await toggleStepComplete('lost-residence-card', 'today-1');
    expect(r).toBeNull();
  });

  it('snooze stores remindAt + label, clears with null', async () => {
    await createPlanFromAnswers('lost-residence-card', {});
    const remindAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const set = await snoozeStep('lost-residence-card', 'today-1', {
      remindAt,
      label: '1 giờ nữa',
    });
    expect(set?.snoozedSteps?.['today-1'].remindAt).toBe(remindAt);
    expect(set?.snoozedSteps?.['today-1'].label).toBe('1 giờ nữa');

    const cleared = await snoozeStep('lost-residence-card', 'today-1', null);
    expect(cleared?.snoozedSteps?.['today-1']).toBeUndefined();
  });

  it('clearActivePlan removes the plan and is idempotent', async () => {
    await createPlanFromAnswers('lost-residence-card', {});
    expect(await loadActivePlan('lost-residence-card')).not.toBeNull();

    await clearActivePlan('lost-residence-card');
    expect(await loadActivePlan('lost-residence-card')).toBeNull();

    // Calling again on an empty store should not throw.
    await clearActivePlan('lost-residence-card');
    expect(await loadActivePlan('lost-residence-card')).toBeNull();
  });

  it('rejects stored plans with unknown schema version', async () => {
    const wrong = { version: 99, flowId: 'lost-residence-card' };
    await AsyncStorage.setItem('myJapanPlan:active:lost-residence-card', JSON.stringify(wrong));
    expect(await loadActivePlan('lost-residence-card')).toBeNull();
  });

  it('survives a save → reload round-trip with completed + snoozed state', async () => {
    const plan: StoredPlan = {
      version: 1,
      flowId: 'lost-residence-card',
      createdAt: '2026-05-16T00:00:00.000Z',
      answers: { 'q1-when': 'today' },
      completedSteps: { 'today-1': '2026-05-16T01:00:00.000Z' },
      snoozedSteps: {
        'soon-2': {
          remindAt: '2026-05-16T05:00:00.000Z',
          label: '4 giờ nữa',
          createdAt: '2026-05-16T01:00:00.000Z',
        },
      },
    };
    await saveActivePlan(plan);
    const loaded = await loadActivePlan('lost-residence-card');
    expect(loaded).toEqual(plan);
  });
});
