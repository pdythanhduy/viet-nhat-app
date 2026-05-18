// Phase R2 — Reminder hook foundation.
//
// Data model + storage skeleton only. NO actual notification scheduling
// in this file. The full scheduling layer (timing, opt-in flow,
// permission handling, anti-spam caps) is documented in
// docs/reminder-system-design.md and will land in a later phase when
// product-level reminder UX is approved.
//
// This file exists so that:
//   1. The reminder kinds are stable across releases (we don't rename
//      them after analytics start firing against them).
//   2. The storage schema is committed to before scheduling code is
//      written — schema migrations are harder than scheduling logic.
//   3. The UI can render "Nhắc tôi" placeholders against these types
//      without scheduling running anything yet.

import AsyncStorage from '@react-native-async-storage/async-storage';

// The five reminder kinds in scope for Phase R2. Each maps to a real
// recurring life event a Vietnamese resident in Japan deals with. New
// kinds should be added here only AFTER product approval — analytics
// dashboards will be keyed by these names.
export type ReminderHookKind =
  | 'visa-renewal'      // 在留期間更新申請: typically 3 months before expiry
  | 'tax-season'        // 確定申告: Feb 16 – Mar 15 each year
  | 'moving'            // 転出/転入届: 14-day window around a move
  | 'insurance-renewal' // 国民健康保険 / 火災 / 自賠責: anniversary date
  | 'mynumber'          // My Number Card pickup / renewal / linked services
  ;

export interface ReminderHook {
  id: string;                     // stable id (e.g. crypto.randomUUID equivalent)
  kind: ReminderHookKind;
  triggerDate: string;            // ISO 8601 — the actual deadline / event date
  enabled: boolean;               // user opt-in toggle (default false)
  createdAt: string;              // ISO 8601 — for sorting + debug
  // Optional related-guide pointer so the notification CTA (when wired)
  // opens the matching admin guide instead of the bare hub.
  guideId?: string;
  // User-facing label — short Vietnamese string. NEVER PII; the user
  // chooses from canned options OR types <= 32 chars. Validation is the
  // caller's responsibility.
  label: string;
}

export interface ReminderPreferences {
  // Master switch — if false, no reminders fire even if individual
  // hooks are enabled. Default false (opt-in, no surprise notifications).
  globalEnabled: boolean;
  // Per-kind defaults so a user who opts in to "visa-renewal" but not
  // "tax-season" only gets the former. Default all false.
  perKindEnabled: Record<ReminderHookKind, boolean>;
  // Anti-spam cap. Hard upper bound on notifications/month across all
  // kinds. Default 4 (the visa-renewal 90/30/7/1 cadence). User can
  // lower but not raise — protects against future kind-bloat.
  monthlyCap: number;
}

const STORAGE_KEY_HOOKS = 'reminder_hooks_v1';
const STORAGE_KEY_PREFS = 'reminder_preferences_v1';

export const DEFAULT_PREFERENCES: ReminderPreferences = {
  globalEnabled: false,
  perKindEnabled: {
    'visa-renewal': false,
    'tax-season': false,
    'moving': false,
    'insurance-renewal': false,
    'mynumber': false,
  },
  monthlyCap: 4,
};

export async function loadReminderHooks(): Promise<ReminderHook[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_HOOKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveReminderHooks(hooks: ReminderHook[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY_HOOKS, JSON.stringify(hooks));
}

export async function loadReminderPreferences(): Promise<ReminderPreferences> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PREFS);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<ReminderPreferences>;
    // Merge with defaults so a stored prefs object missing a newer kind
    // still produces a valid result. Defensive against future schema
    // extensions where adding a kind would otherwise crash old clients.
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      perKindEnabled: {
        ...DEFAULT_PREFERENCES.perKindEnabled,
        ...(parsed.perKindEnabled ?? {}),
      },
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export async function saveReminderPreferences(prefs: ReminderPreferences): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(prefs));
}

// Whether ANY notification should fire for this hook given current prefs.
// Pure function — caller passes prefs explicitly. Useful for the eventual
// scheduler + for unit tests that don't want to read AsyncStorage.
export function shouldFire(hook: ReminderHook, prefs: ReminderPreferences): boolean {
  if (!prefs.globalEnabled) return false;
  if (!prefs.perKindEnabled[hook.kind]) return false;
  if (!hook.enabled) return false;
  return true;
}
