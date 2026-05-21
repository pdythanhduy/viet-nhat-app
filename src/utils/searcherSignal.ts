// Phase 2C (v1.5.2) — local searcher-signal heuristic.
//
// Counts how many times the user has performed a search. When the
// count crosses the threshold, the Home layout switches from
// "cold_start" (StartHere chips emphasized) to "searcher" (search
// CTA emphasized, StartHere hidden). The heuristic is intentionally
// deterministic, local-only, and explainable:
//
//   - Storage: a single integer in AsyncStorage. No timestamps, no
//     histogram. Resets on app uninstall only.
//   - Threshold: `SEARCHER_THRESHOLD` (5). Picked because a user
//     who reached 5 searches has self-selected as someone who
//     navigates by typing, not by chip-tapping. 5 is high enough to
//     avoid flipping on noise (mistyping, exploration) and low enough
//     to flip before retention typically erodes.
//   - No remote config. No A/B service. No experiment SDK.
//
// This file owns ONLY the storage + threshold logic. The Home
// rendering decision lives in HomeScreen so the heuristic stays
// inspectable in one place per concern.

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'searcher_signal_v1';

export const SEARCHER_THRESHOLD = 5;

export async function getSearcherSignal(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    // Guard against corrupt storage: a non-numeric or negative value
    // is treated as "fresh user, no signal yet" rather than crashing.
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

export async function incrementSearcherSignal(): Promise<number> {
  const current = await getSearcherSignal();
  const next = current + 1;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Storage write failed — return what we computed but don't crash.
    // The next read will retry. Worst case: the heuristic flips one
    // search later than expected.
  }
  return next;
}

export function isSearcherMode(count: number): boolean {
  return count >= SEARCHER_THRESHOLD;
}

// Convenience for analytics + UI: returns the layout variant given a
// signal count. Pure function — same input, same output, easy to test.
export function getHomeLayoutVariant(count: number): 'cold_start' | 'searcher' {
  return isSearcherMode(count) ? 'searcher' : 'cold_start';
}

// Test-only reset. Not exported via index; tests import directly.
export async function _resetSearcherSignalForTests(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // No-op
  }
}
