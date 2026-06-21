// N2 Recovery — per-owner course progress (which days are done).
//
// Same pattern as services/featureFlags.ts: in-memory cache + AsyncStorage
// (offline) + Supabase row (cross-device sync, RLS-scoped to the owner).
// Stage 1 tracks only the set of completed day numbers; richer stats
// (SRS due, weak topics) come later.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';
import { N2_TOTAL_DAYS } from '../constants/n2RecoveryCurriculum';

const STORAGE_KEY = 'lab.n2Progress.v1';
const REMOTE_TABLE = 'lab_course_progress';

export interface N2Progress {
  completedDays: number[]; // sorted, unique
}

function sanitize(raw: unknown): N2Progress {
  const out: N2Progress = { completedDays: [] };
  if (raw && typeof raw === 'object') {
    const days = (raw as { completedDays?: unknown }).completedDays;
    if (Array.isArray(days)) {
      const valid = days.filter(
        (n): n is number => typeof n === 'number' && n >= 1 && n <= N2_TOTAL_DAYS
      );
      out.completedDays = Array.from(new Set(valid)).sort((a, b) => a - b);
    }
  }
  return out;
}

let cache: N2Progress = { completedDays: [] };
let loaded = false;
const listeners = new Set<(p: N2Progress) => void>();

function broadcast(): void {
  const snapshot: N2Progress = { completedDays: [...cache.completedDays] };
  for (const cb of listeners) cb(snapshot);
}

export function subscribeProgress(cb: (p: N2Progress) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getProgress(): N2Progress {
  return { completedDays: [...cache.completedDays] };
}

export function isDayDone(day: number): boolean {
  return cache.completedDays.includes(day);
}

export function isLoaded(): boolean {
  return loaded;
}

/** First not-yet-completed day (1..100); 100 once everything is done. */
export function getCurrentDay(): number {
  for (let day = 1; day <= N2_TOTAL_DAYS; day++) {
    if (!cache.completedDays.includes(day)) return day;
  }
  return N2_TOTAL_DAYS;
}

export async function loadProgress(): Promise<N2Progress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = raw ? sanitize(JSON.parse(raw)) : { completedDays: [] };
  } catch {
    cache = { completedDays: [] };
  }
  loaded = true;
  broadcast();
  return getProgress();
}

async function persistLocal(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Best-effort; in-memory cache still reflects the change this session.
  }
}

/** Toggle a day's done state locally (persist + broadcast). Push is separate. */
export async function toggleDay(day: number): Promise<void> {
  const set = new Set(cache.completedDays);
  if (set.has(day)) set.delete(day);
  else set.add(day);
  cache = { completedDays: Array.from(set).sort((a, b) => a - b) };
  broadcast();
  await persistLocal();
}

/** Pull the owner's progress from Supabase and merge into the local cache. */
export async function pullRemote(): Promise<N2Progress | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from(REMOTE_TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;
  cache = sanitize(data.data);
  broadcast();
  await persistLocal();
  return getProgress();
}

/** Push the current local progress to Supabase for the signed-in owner. */
export async function pushRemote(): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'not-configured' };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ok: false, error: 'not-signed-in' };

  const { error } = await supabase
    .from(REMOTE_TABLE)
    .upsert({ user_id: userId, data: cache, updated_at: new Date().toISOString() });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
