# Search observability — Phase 2C (v1.5.2)

**Date**: 2026-05-21
**Branch**: `feat/phase-2c-observability-and-retrieval`
**Status**: foundation, no production data yet. The retrieval-review playbook ([`retrieval-review-playbook.md`](retrieval-review-playbook.md)) consumes the events documented here.
**Companions**: [`analytics-events.md`](analytics-events.md), [`analytics-decision-map.md`](analytics-decision-map.md) §7b §search-abandon

---

## 1. The problem v1.5.0 left unsolved

After v1.5.0 we had `search_query` and `search_no_results`. Those answered:
- How many searches happened?
- How many of them returned zero results?

They did NOT answer:
- **Where in the result list did the user actually tap?** (Position-zero conversion vs scrolling)
- **Which queries failed silently** — i.e., returned ≥ 1 result but the user didn't engage?
- **Did the dead-end fallback layer ever rescue a zero-result user?**
- **What's the conversion rate of the search funnel?**

Without those signals, ranking tuning is a guessing game. Phase 2C closes the gap with FOUR new events.

---

## 2. The four events

### `search_zero_result { q, q_length, fallback_shown }`

Fires alongside the legacy `search_no_results` whenever the result count is 0. `fallback_shown` is `true` from the SearchScreen path (which always renders the fallback layer) and reserved as `false` for analytics-only call sites that might bypass UI in the future. If `fallback_shown` is observed as `false` in real-world data without a known programmatic caller, that's a regression signal — the UI failed to render the dead-end recovery.

PII posture: same as `search_query`. `q` is the 24-char normalized form. The `fallback_shown` bit adds no PII.

### `search_result_opened { q, q_length, position, result_type }`

Fires when the user opens a search result. `position` is the 0-indexed list slot — top-1 is `0`. `result_type` is the bounded result-type enum (`guide / daily-life / jobs / japanese-*`).

This is the canonical search → engagement conversion event. The existing `guide_open { source: 'search' }` keeps firing as well (for back-compat with v1.5.0 dashboards), but `search_result_opened` carries the richer position + non-guide-type signal.

PII posture: position and result_type are bounded; `q` carries the same normalized contract as `search_query`.

### `search_abandon { q, q_length, result_count, ms_since_query }`

Fires when the abandon window (10 seconds) elapses after the user's last keystroke, with no result open and no further typing. See `analytics-decision-map.md` §7b for the full heuristic. The five anti-spam guarantees:

1. Per-query single-fire (sentinel prevents re-emission)
2. Refinement cancels (timer reschedules from zero on every keystroke)
3. Result tap cancels
4. Unmount cancels (navigation away does NOT abandon)
5. Too-short queries (< 3 chars) cancel

Implementation lives in `src/utils/abandonTimer.ts` — a pure state-machine helper with 7 unit tests. SearchScreen wires the helper to the analytics call via `useEffect`.

PII posture: same as the other search events.

### `fallback_guide_opened { guide_id }`

Fires when the user opens a featured guide FROM the zero-result fallback layer (not from the Home featured rail or the empty-state featured rail). Distinct from `guide_open { source: 'featured' }`: the latter counts discovery; this event counts dead-end recoveries.

PII posture: `guide_id` is public-as-content (a slug like `permanent-residency-eijuu`). No PII.

---

## 3. The retrieval funnel after Phase 2C

```
                   search_query
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   result_count       result_count    (typed and
   > 0                 === 0           cleared)
        │               │
        │               ├── search_no_results       (legacy)
        │               └── search_zero_result       (rich)
        │                       │
        │                       ├── fallback_guide_opened   (recovery)
        │                       └── search_abandon          (give-up)
        │
        ├── search_result_opened       (engagement)
        │       │
        │       └── guide_open { source: 'search' }   (legacy joins)
        │
        └── search_abandon       (give-up despite results)
```

The funnel is what makes retrieval auditable. Without Phase 2C, the only signal was the top of the funnel (`search_query`); now every branch has a measurable outcome.

---

## 4. Why NOT raw analytics

A typical "let me just see the queries" approach would log the raw user input. We refuse:

1. **PII risk** — search inputs include names, addresses, phone numbers, visa specifics, and worse. Raw logging is a privacy violation we don't reverse.
2. **24-char normalization is a hard contract** — `normalizeQueryForAnalytics` strips diacritics, lowercases, and caps at 24 chars. 22 unit tests pin this contract. It's been stable since v1.5.0; Phase 2C reuses it as-is.
3. **Aggregate-only dashboards** — Aptabase aggregates by event name + property values. We never query at user-level.
4. **No cross-event join keys** — the only "key" across events is `q` (which is the normalized form). Two users typing the same normalized string look identical in aggregates. That's a feature, not a bug.

If a reviewer ever proposes raw query logging "just for one experiment", point them at this section.

---

## 5. Backwards compatibility

| Legacy event | Status | Replacement |
| --- | --- | --- |
| `search_query` | KEEPS firing unchanged | None — still the canonical "query fired" event |
| `search_no_results` | KEEPS firing alongside `search_zero_result` | `search_zero_result` for richer analysis |
| `guide_open { source: 'search' }` | KEEPS firing unchanged | `search_result_opened` for position-aware conversion analysis |

Aptabase dashboards built against v1.5.0 events will continue to work after v1.5.2 ships. New dashboards should prefer the v1.5.2 events.

---

## 6. Forward compatibility — deep links + share-back

The expanded `guide_open.source` enum reserves two future-safe values:

- `external_share` — for the path "user receives a shared link → opens the app → lands on the shared guide via a routed deep link". No call site today. Wires in alongside `growth-next-loop-v1.5.1.md` §3.
- `deep_link_placeholder` — for any other deep-link routing (universal link to a guide, app-link from a notification). No call site today.

These are declared NOW so that:
1. The enum doesn't need a schema migration when deep-linking ships
2. Dashboards built against the v1.5.2 enum already display these buckets (zero-counts initially, populated once routing lands)
3. The compile-time type-system enforces the bounded enum at every existing call site — no risk of arbitrary strings creeping in

---

## 7. What this phase does NOT solve

- **Session-level analysis** — every event is independent. We can't say "User X searched 3 times, opened 1, abandoned 2" because we don't track users. We only aggregate.
- **Pre-typing intent** — we don't know what the user was about to type. Only what they actually typed (normalized).
- **Result quality scoring** — we don't ask "was this result helpful?" Time-on-screen, scroll depth, and back-out time are NOT tracked (privacy posture).
- **Cross-search journey** — "the user searched X, didn't find it, then searched Y, did find it" is invisible to aggregate-only analysis.

These limits are deliberate. Solving any of them requires either user tracking or richer per-event payloads — both expand the privacy surface. The retrieval playbook ([§5 below](#5-backwards-compatibility) sister doc) is designed to extract useful signal from the bounded events alone.

---

## 8. Operational checklist before relying on the new events

1. **Aptabase dashboard configured** for each new event (4 charts: zero-result rate, abandon rate, result-opened conversion, fallback recovery rate). One-time setup, ~30 min.
2. **`search_zero_result.fallback_shown` watched** — if `false` appears in production data, file a UI regression bug. The SearchScreen always sets `true`.
3. **`search_abandon.ms_since_query` distribution checked** weekly — values should cluster near 10_000 (the window). A spike at much higher values indicates a stuck timer (bug).
4. **Compare `search_result_opened` count vs legacy `guide_open { source: 'search' }` count** — they should be roughly equal for guide-type results. A divergence indicates one of the two events isn't firing where expected.

---

## 9. Rollback plan

Every event in Phase 2C is additive — disabling them leaves the rest of the analytics intact.

- **Soft disable** — comment out the `track(...)` call in the corresponding helper. Event stops firing immediately, no schema change.
- **Hard disable** — remove the event from `EventMap`. tsc fails at every call site, forcing the call site to be removed too. Use only for permanent removal.

Existing v1.5.0 events (`search_query`, `search_no_results`, `guide_open`) keep firing regardless. No dashboards built against them break.

---

## 10. Companion files

- `src/utils/analytics.ts` — event definitions + helpers
- `src/utils/abandonTimer.ts` — abandon-timer state machine
- `src/utils/abandonTimer.test.ts` — 7 unit tests
- `src/utils/searcherSignal.ts` — local searcher counter (drives `home_layout_variant`)
- `src/utils/searcherSignal.test.ts` — 11 unit tests
- `src/screens/SearchScreen.tsx` — wires all four new events
- `src/screens/HomeScreen.tsx` — emits `home_layout_variant` once per focus
- `docs/retrieval-review-playbook.md` — manual weekly review process
- `docs/product-state-v1.5.2-prep.md` — what v1.5.2 ships and explicitly does not
