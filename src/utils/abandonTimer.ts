// Phase 2C (v1.5.2) — search abandon timer state machine.
//
// Extracted from SearchScreen so the debounce semantics are
// unit-testable with fake timers, independent of React rendering.
//
// Heuristic (also documented in docs/analytics-decision-map.md):
//
//   1. After the user types a query (≥ 3 chars) and the result list
//      is rendered, schedule a single one-shot timer that fires
//      `windowMs` later.
//   2. Each subsequent keystroke (= new effective query) cancels the
//      pending timer and schedules a fresh one. Rapid refinement
//      does NOT spam abandon events.
//   3. If the user opens any result, `markAbandonHandled` is called
//      — the timer is canceled AND the query is marked so that any
//      already-elapsed timer cannot still emit.
//   4. If the timer elapses without intervention, the registered
//      `onFire` callback fires EXACTLY once per resting query.
//      The same query cannot abandon twice without an intervening
//      query change.
//   5. On unmount, the caller calls `cancelAbandon` — no event
//      fires from a torn-down screen.

export interface AbandonTimerState {
  timer: ReturnType<typeof setTimeout> | null;
  firedFor: string | null;
  lastScheduledAt: number;
}

export function createAbandonTimerState(): AbandonTimerState {
  return { timer: null, firedFor: null, lastScheduledAt: 0 };
}

export function scheduleAbandon(
  state: AbandonTimerState,
  query: string,
  windowMs: number,
  onFire: (query: string, msSinceQuery: number) => void
): void {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  // Re-arm the firedFor sentinel — a new query is a fresh chance to
  // abandon, even if the previous query already fired. The user MAY
  // type a different query and abandon that one too; the storage is
  // per-query, not per-session.
  state.firedFor = null;
  state.lastScheduledAt = Date.now();
  state.timer = setTimeout(() => {
    // Defensive: if `markAbandonHandled` ran while the timer was
    // pending (e.g., synchronous race in tests), bail out.
    if (state.firedFor === query) return;
    state.firedFor = query;
    state.timer = null;
    onFire(query, Date.now() - state.lastScheduledAt);
  }, windowMs);
}

export function cancelAbandon(state: AbandonTimerState): void {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
}

export function markAbandonHandled(state: AbandonTimerState, query: string): void {
  // Called when the user opened a result — even if a timer is still
  // pending, it must not fire. Sets `firedFor` so the timer callback
  // bails out if it already fired-and-is-now-in-the-microtask-queue.
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  state.firedFor = query;
}
