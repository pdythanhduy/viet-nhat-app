// Read pre-generated JLPT content (no on-device Claude calls).
//
//   • Free level N5  → bundled in the app (offline, instant). See n5Content.ts.
//   • Paid levels N4–N1 → Supabase table `jlpt_content`, gated by RLS/entitlement.
//
// Returns null when nothing pre-generated is available, so callers can fall back
// (during the transition, to on-device generation; later, to a clear error).

import { supabase } from './supabaseClient';
import { N5_PREGENERATED } from '../constants/jlpt/n5Content';
import type { JlptLevel, RecoveryPregeneratedDay } from './jlptRecoveryTypes';

const memo = new Map<string, RecoveryPregeneratedDay>();

function key(level: JlptLevel, day: number): string {
  return `${level}:${day}`;
}

/** Synchronous check: is this day bundled in the app (free N5)? */
export function hasBundledDay(level: JlptLevel, day: number): boolean {
  return level === 'N5' && Boolean(N5_PREGENERATED[day]?.vocab?.length);
}

/** Synchronous check: does the bundled day include a grammar lesson? */
export function hasBundledLesson(level: JlptLevel, day: number): boolean {
  return level === 'N5' && Boolean(N5_PREGENERATED[day]?.lesson?.length);
}

function fromBundle(level: JlptLevel, day: number): RecoveryPregeneratedDay | null {
  if (level !== 'N5') return null;
  const day_ = N5_PREGENERATED[day];
  return day_?.vocab?.length ? day_ : null;
}

async function fromSupabase(level: JlptLevel, day: number): Promise<RecoveryPregeneratedDay | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('jlpt_content')
      .select('payload')
      .eq('level', level)
      .eq('day', day)
      .maybeSingle();
    if (error || !data) return null;
    const payload = (data as { payload?: unknown }).payload as RecoveryPregeneratedDay | undefined;
    return payload?.vocab?.length ? payload : null;
  } catch {
    // Table missing (not provisioned yet) / offline / not entitled → null.
    return null;
  }
}

/**
 * Load a day's pre-generated content: bundle first (free N5), then Supabase
 * (paid levels). Successful results are memoized; nulls are not (so a transient
 * network failure can be retried).
 */
export async function loadPregeneratedDay(
  level: JlptLevel,
  day: number,
): Promise<RecoveryPregeneratedDay | null> {
  const cached = memo.get(key(level, day));
  if (cached) return cached;

  const result = fromBundle(level, day) ?? (await fromSupabase(level, day));
  if (result) memo.set(key(level, day), result);
  return result;
}

/** Test/debug helper: clear the in-memory cache. */
export function clearPregeneratedMemo(): void {
  memo.clear();
}
