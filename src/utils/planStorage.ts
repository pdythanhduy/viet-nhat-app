// My Japan Plan — local-only AsyncStorage layer.
//
// Phase 0 polish: persists wizard answers + step completion state +
// "Nhắc tôi sau" snooze marks. Everything lives in AsyncStorage on
// device. No network, no backend, no sync.
//
// Schema is intentionally minimal — when Phase 1 lands, the same
// shape extends with reminderIds + plan groups (instead of relying
// on the hardcoded sample). The `version` field gates migration.

import AsyncStorage from '@react-native-async-storage/async-storage';

export type PlanFlowId = 'lost-residence-card';

/** Versioned shape so we can migrate safely later. */
export interface StoredPlan {
  /** Bump when StoredPlan shape changes incompatibly. */
  version: 1;
  flowId: PlanFlowId;
  /** ISO timestamp the user finished the wizard. */
  createdAt: string;
  /** Wizard answers (questionId -> optionId). */
  answers: Record<string, string>;
  /** stepId -> completedAt ISO. Absence means not done. */
  completedSteps: Record<string, string>;
  /** stepId -> snooze metadata. Phase 0: UI placeholder, no real notification. */
  snoozedSteps?: Record<string, SnoozedStep>;
  /** ISO when the user archived the plan (all steps done or manual). */
  archivedAt?: string;
}

export interface SnoozedStep {
  /** ISO when the user wants to be reminded. */
  remindAt: string;
  /** Human label for UI ("1 giờ nữa", "Sáng mai", …) */
  label: string;
  /** ISO when the user tapped Nhắc tôi sau. */
  createdAt: string;
}

const STORAGE_KEY_PREFIX = 'myJapanPlan:active:';

function keyFor(flowId: PlanFlowId): string {
  return `${STORAGE_KEY_PREFIX}${flowId}`;
}

/** Load the active plan for a flow, or null if none. */
export async function loadActivePlan(flowId: PlanFlowId): Promise<StoredPlan | null> {
  try {
    const raw = await AsyncStorage.getItem(keyFor(flowId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredPlan;
    // Reject unknown schema versions rather than silently corrupting data.
    if (parsed.version !== 1) return null;
    if (parsed.flowId !== flowId) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Replace the active plan for a flow. Pass null to clear. */
export async function saveActivePlan(plan: StoredPlan): Promise<void> {
  await AsyncStorage.setItem(keyFor(plan.flowId), JSON.stringify(plan));
}

/** Remove the active plan for a flow. Idempotent. */
export async function clearActivePlan(flowId: PlanFlowId): Promise<void> {
  await AsyncStorage.removeItem(keyFor(flowId));
}

/**
 * Create a fresh plan in storage from wizard answers. Resets any
 * existing state for that flow.
 */
export async function createPlanFromAnswers(
  flowId: PlanFlowId,
  answers: Record<string, string>,
): Promise<StoredPlan> {
  const plan: StoredPlan = {
    version: 1,
    flowId,
    createdAt: new Date().toISOString(),
    answers,
    completedSteps: {},
    snoozedSteps: {},
  };
  await saveActivePlan(plan);
  return plan;
}

/**
 * Toggle whether a step is marked done. Persists the change and
 * returns the updated plan. If no plan exists for the flow, the
 * call is a no-op and returns null.
 */
export async function toggleStepComplete(
  flowId: PlanFlowId,
  stepId: string,
): Promise<StoredPlan | null> {
  const plan = await loadActivePlan(flowId);
  if (!plan) return null;
  const next: StoredPlan = { ...plan, completedSteps: { ...plan.completedSteps } };
  if (next.completedSteps[stepId]) {
    delete next.completedSteps[stepId];
  } else {
    next.completedSteps[stepId] = new Date().toISOString();
  }
  await saveActivePlan(next);
  return next;
}

/**
 * Set or update a "Nhắc tôi sau" entry for a step. Pass remindAt =
 * null to clear the snooze. Phase 0: persists only — no actual
 * notification is scheduled. Phase 1 will wire expo-notifications.
 */
export async function snoozeStep(
  flowId: PlanFlowId,
  stepId: string,
  snooze: { remindAt: string; label: string } | null,
): Promise<StoredPlan | null> {
  const plan = await loadActivePlan(flowId);
  if (!plan) return null;
  const next: StoredPlan = { ...plan, snoozedSteps: { ...(plan.snoozedSteps ?? {}) } };
  if (snooze) {
    next.snoozedSteps![stepId] = {
      remindAt: snooze.remindAt,
      label: snooze.label,
      createdAt: new Date().toISOString(),
    };
  } else {
    delete next.snoozedSteps![stepId];
  }
  await saveActivePlan(next);
  return next;
}
