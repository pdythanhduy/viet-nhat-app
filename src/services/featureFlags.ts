// Feature flags — owner-controlled toggles for experimental features.
//
// Flags live in three places, in priority order when reading:
//   1. In-memory cache (this module) — what the app reads at runtime.
//   2. AsyncStorage ('lab.featureFlags.v1') — survives app restarts,
//      works fully offline.
//   3. Supabase table `lab_feature_flags` (one row per owner, RLS-scoped)
//      — syncs the owner's toggles across their devices.
//
// The Lab screen is the only place that pushes to Supabase. Everything
// else just reads via `getFlag()` / the `useFeatureFlags` hook. A flag a
// regular user never toggles stays at its `defaultValue`, so shipping a
// flag is inert until the owner flips it on their own account.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';

export type FeatureFlagKey = 'furiganaReader' | 'n2RecoveryHome' | 'jlptRecoveryHome';

export interface FeatureFlagDef {
  key: FeatureFlagKey;
  label: string;
  description: string;
  defaultValue: boolean;
}

// The catalog. Add a flag here, then read it anywhere via getFlag(key).
export const FEATURE_FLAGS: readonly FeatureFlagDef[] = [
  {
    key: 'furiganaReader',
    label: 'Đọc báo tiếng Nhật (Furigana)',
    description:
      'Dán văn bản tiếng Nhật, hiển thị hiragana phía trên kanji cho dễ đọc. Bật để hiện công cụ trong app.',
    defaultValue: false,
  },
  {
    key: 'n2RecoveryHome',
    label: 'JLPT Recovery N2 — 100 ngày',
    description:
      'Lộ trình lấy lại N2, giao tiếp và business Japanese. Bật để hiện nút học N2 ngoài màn hình chính.',
    defaultValue: false,
  },
  {
    key: 'jlptRecoveryHome',
    label: 'JLPT Recovery — chọn cấp',
    description:
      'Hiện nút chọn cấp JLPT Recovery trên Home để vào N5 / N4 / N3 / N2 / N1. ' +
      'Mặc định BẬT cho mọi người (tính năng public; tắt = kill-switch).',
    defaultValue: true,
  },
];

export type FeatureFlagState = Record<FeatureFlagKey, boolean>;

const STORAGE_KEY = 'lab.featureFlags.v1';
const REMOTE_TABLE = 'lab_feature_flags';

function defaults(): FeatureFlagState {
  const out = {} as FeatureFlagState;
  for (const f of FEATURE_FLAGS) out[f.key] = f.defaultValue;
  return out;
}

// Keep only known keys and coerce to boolean — guards against stale keys
// left in storage / remote after a flag is renamed or removed.
function sanitize(raw: unknown): FeatureFlagState {
  const out = defaults();
  if (raw && typeof raw === 'object') {
    for (const f of FEATURE_FLAGS) {
      const v = (raw as Record<string, unknown>)[f.key];
      if (typeof v === 'boolean') out[f.key] = v;
    }
  }
  return out;
}

let cache: FeatureFlagState = defaults();
let loaded = false;
const listeners = new Set<(state: FeatureFlagState) => void>();

function broadcast(): void {
  const snapshot = { ...cache };
  for (const cb of listeners) cb(snapshot);
}

/** Subscribe to flag changes. Returns an unsubscribe function. */
export function subscribeFlags(cb: (state: FeatureFlagState) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Synchronous read of the current cached state (defaults until loaded). */
export function getFlags(): FeatureFlagState {
  return { ...cache };
}

/** Synchronous read of a single flag. */
export function getFlag(key: FeatureFlagKey): boolean {
  return cache[key];
}

/** Load persisted flags from AsyncStorage into the cache. Call once at startup. */
export async function loadFlags(): Promise<FeatureFlagState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = raw ? sanitize(JSON.parse(raw)) : defaults();
  } catch {
    cache = defaults();
  }
  loaded = true;
  broadcast();
  return { ...cache };
}

export function isLoaded(): boolean {
  return loaded;
}

async function persistLocal(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Best-effort; in-memory cache still reflects the change this session.
  }
}

/**
 * Set a flag locally (persists + broadcasts). Does NOT push to Supabase —
 * the Lab screen calls `pushRemote` after toggling so sync only happens for
 * a logged-in owner.
 */
export async function setFlagLocal(key: FeatureFlagKey, value: boolean): Promise<void> {
  cache = { ...cache, [key]: value };
  broadcast();
  await persistLocal();
}

/**
 * Pull the owner's flags from Supabase and merge into the local cache.
 * No-op when Supabase isn't configured or no user is signed in.
 */
export async function pullRemote(): Promise<FeatureFlagState | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from(REMOTE_TABLE)
    .select('flags')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;

  cache = sanitize(data.flags);
  broadcast();
  await persistLocal();
  return { ...cache };
}

/**
 * Push the current local flag state to Supabase for the signed-in owner.
 * No-op when not configured / not signed in.
 */
export async function pushRemote(): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'not-configured' };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: 'not-signed-in' };

  const { error } = await supabase
    .from(REMOTE_TABLE)
    .upsert({ user_id: userId, flags: cache, updated_at: new Date().toISOString() });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
