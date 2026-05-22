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

### `search_zero_results { q, q_length, fallback_shown }`

Fires alongside the legacy `search_no_results` whenever the result count is 0. `fallback_shown` is `true` from the SearchScreen path (which always renders the fallback layer) and reserved as `false` for analytics-only call sites that might bypass UI in the future. If `fallback_shown` is observed as `false` in real-world data without a known programmatic caller, that's a regression signal — the UI failed to render the dead-end recovery.

PII posture: same as `search_query`. `q` is the 24-char normalized form. The `fallback_shown` bit adds no PII.

### `search_result_opened { q, q_length, position, result_type }`

Fires when the user opens a search result. `position` is the 0-indexed list slot — top-1 is `0`. `result_type` is the bounded result-type enum (`guide / daily-life / jobs / japanese-*`).

This is the canonical search → engagement conversion event. The existing `guide_open { source: 'search' }` keeps firing as well (for back-compat with v1.5.0 dashboards), but `search_result_opened` carries the richer position + non-guide-type signal.

PII posture: position and result_type are bounded; `q` carries the same normalized contract as `search_query`.

### `search_abandoned { q, q_length, result_count, ms_since_query }`

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
        │               └── search_zero_results       (rich)
        │                       │
        │                       ├── fallback_guide_opened   (recovery)
        │                       └── search_abandoned          (give-up)
        │
        ├── search_result_opened       (engagement)
        │       │
        │       └── guide_open { source: 'search' }   (legacy joins)
        │
        └── search_abandoned       (give-up despite results)
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
| `search_no_results` | KEEPS firing alongside `search_zero_results` | `search_zero_results` for richer analysis |
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
2. **`search_zero_results.fallback_shown` watched** — if `false` appears in production data, file a UI regression bug. The SearchScreen always sets `true`.
3. **`search_abandoned.ms_since_query` distribution checked** weekly — values should cluster near 10_000 (the window). A spike at much higher values indicates a stuck timer (bug).
4. **Compare `search_result_opened` count vs legacy `guide_open { source: 'search' }` count** — they should be roughly equal for guide-type results. A divergence indicates one of the two events isn't firing where expected.

---

## 9. Rollback plan

Every event in Phase 2C is additive — disabling them leaves the rest of the analytics intact. This section is the **operational playbook** if something has to come out post-production. Updated 2026-05-22 as part of v1.5.4 retrieval reality check.

### 9.1 Disable order — least to most destructive

Always start at the top. Stop at the first level that solves the problem.

1. **Stop the dashboard from showing it** (no code change)
   - Hide the chart in Aptabase, or remove the chart from the weekly report template.
   - Useful when the event itself is fine but the chart is misleading.
   - Reversible immediately.

2. **Soft disable the event** (one-line code change)
   - Comment out the `track(...)` call inside the corresponding helper in `src/utils/analytics.ts`.
   - Event stops firing immediately on next install. No schema change. No `EventMap` edit.
   - Existing in-flight events already in Aptabase remain visible historically.
   - Reversible by re-enabling the line. The TYPE-LEVEL contract stays — call sites continue to compile.

3. **Soft disable the helper** (helper-level change)
   - Wrap the helper body in an early `return` and add a comment with the reason + revert criteria.
   - Equivalent effect to (2) but signals "this helper is parked" rather than "this line is hidden".
   - Choose this when the helper takes more than 5 lines OR when several call sites use it.

4. **Hard disable the event** (last resort — schema-level)
   - Remove the event from `EventMap` (or from the helper's exported type).
   - `tsc` fails at every call site → caller must be removed too.
   - Dashboards that reference the event by name break (see §9.5).
   - Use ONLY when the event must NEVER be emittable again (e.g. accidental PII surface).

### 9.2 Disabling the searcher-signal heuristic safely

The `home_layout_variant` event is driven by `src/utils/searcherSignal.ts`. To disable WITHOUT removing the surface (i.e., keep the layout machinery, just freeze it):

1. **Lock variant to `cold_start`** — change `getHomeLayoutVariant` to return a constant:
   ```ts
   export function getHomeLayoutVariant(_count: number): 'cold_start' | 'searcher' {
     return 'cold_start';
   }
   ```
   - `home_layout_variant` continues to fire, always with value `cold_start`.
   - Home renders the cold_start layout for everyone.
   - Aptabase chart shows 100% cold_start — that IS the signal that the heuristic was frozen.
   - Reversible: revert to the threshold check.

2. **Lock variant to `searcher`** — same as above with `'searcher'` returned. Use only as an experiment toggle; default should be cold_start.

3. **Full disable** — also bypass the `incrementSearcherSignal` call in SearchScreen by wrapping with a no-op guard. The counter stops growing; layout stays at whichever variant was locked.

**Do NOT** delete the stored counter from AsyncStorage — installed devices keep their state for the future case where the heuristic comes back. Storage keys are forward-compatibility infrastructure, not garbage.

**Do NOT** raise `SEARCHER_THRESHOLD` to `Number.MAX_SAFE_INTEGER` as an alternative to the constant-return approach. It works mechanically, but it's harder to find when re-enabling and it bypasses the unit tests that pin the threshold semantics.

### 9.3 Removing an event safely (post-production)

If an event MUST be removed (PII regression caught, event no longer makes sense, schema cleanup), follow this order. Skipping a step risks dashboard breakage AND missing-data interpretation errors.

1. **Announce the removal** in a release note one cycle before code change. Reviewers need to know dashboards will drop.
2. **Soft disable first** (§9.1 step 2) and ship that release. Confirm event count goes to zero in Aptabase within 7 days.
3. **Remove the call sites** in a separate PR. tsc should still pass — the event remains in `EventMap` but no longer fires.
4. **Remove the helper** from `analytics.ts`. tsc should still pass — no callers remain.
5. **Remove the entry from `EventMap`**. Now hard. Any silent re-introduction will fail at type-check.
6. **Document the removal** in `docs/analytics-events.md` (mark as REMOVED with date) — DO NOT delete the historical entry; future reviewers need the audit trail for old dashboards.
7. **Update dashboards** per §9.5.

Never compress steps 2-5 into one PR. The point of the gap is that downstream consumers (dashboards, the weekly report template, the playbook) get a chance to update before the schema disappears.

### 9.4 Removing the `q` property (or any normalized field)

The 24-char normalized `q` is the most privacy-sensitive field. If we ever need to STOP logging it:

1. Change the helper to omit `q` from the payload but keep the event firing — count is still useful.
2. Update `analytics-events.md` to show the new payload shape.
3. Dashboards that grouped by `q` (Charts 1-3 in the Phase 2C dashboard checklist) become count-only after the change date. Document the break point so historical vs current data are not mixed in an average.

Do NOT replace `q` with a different normalized form (e.g. 32-char). The 24-char contract is pinned by 22 unit tests in `analytics.test.ts`. Changing the length silently re-buckets historical aggregates.

### 9.5 Which dashboards break when an event is removed

Reference table — keep updated when removing an event.

| Removed event | Aptabase chart(s) that lose data | Weekly report sections affected |
| --- | --- | --- |
| `search_query` | Top queries (Chart 1) + every rate denominator | §1 volume; §2; §10; §11 |
| `search_zero_results` | Zero-result queries (Chart 2); fallback recovery rate | §1; §3; §7; §11 |
| `search_abandoned` | Abandoned queries (Chart 3) | §1; §4; §11; §12 |
| `search_result_opened` | Position distribution (Chart 4); Result-type distribution (Chart 5) | §1; §5; §6; §12 |
| `fallback_guide_opened` | Fallback recovery (Chart 6); recovery rate calculation | §1; §7 |
| `home_layout_variant` | Home layout split (Chart 7) | §1; §8 |
| `guide_open` | Source distribution (Dashboard 4 in the v1.5.0 setup); §9 of the weekly report | §1; §9 |
| `search_no_results` (legacy) | Legacy "failed queries" dashboard from v1.5.0 setup | none in v1.5.4 template (legacy only) |

Before removing any event, update the corresponding template sections to either delete the field or mark it "removed since YYYY-MM-DD".

### 9.6 Migration strategy — when a field absolutely must rename

The default is **never rename after production**. This subsection exists only to document the exception process, not to encourage renames.

Acceptable reasons to rename:
- Privacy regression — a field name itself leaks intent (rare).
- Type incompatibility — the field's type semantics changed (rarer).
- Internal-tool requirement (Aptabase API enforces a name) — rare.

NOT acceptable reasons:
- Aesthetic preference.
- "Better naming".
- Consistency with a different doc.
- A reviewer dislikes the name.

When a rename is genuinely required:

1. **Fire BOTH old and new under each call site** for one release. Type the helper to accept both via a generated wrapper.
2. **Document the migration window** in `analytics-events.md` with explicit start/stop dates.
3. **Update dashboards to the NEW name** during the dual-fire window.
4. **Verify the new chart matches the old chart's count within 5%** for at least one full week.
5. **Disable the old fire** in a subsequent release (soft-disable per §9.1 step 2).
6. **Keep the OLD name in `EventMap`** for historical type-safety until the next major version cleanup. Don't delete the slot — that breaks the historical audit trail.

### 9.7 Never rename after production — without migration

The reason renames are so dangerous: Aptabase aggregates by event name + property name. A silent rename creates TWO separate buckets in the same dashboard, and a "drop to zero" on the old chart that looks identical to an outage. The reviewer who didn't write the rename PR cannot distinguish "event was renamed" from "event stopped firing" from chart alone.

Hard rule:
> **Never rename a production analytics event or property without the §9.6 migration window. No exceptions for "small" renames. Field renames are schema breaks — treat them like database migrations.**

If a rename PR appears without §9.6 evidence, decline it.

### 9.8 What pre-production rollback looks like (currently, no production data yet)

Phase 2C events have been live for ~1-2 days at time of this update. There is NOT yet enough data to need any of the above procedures. The current rollback story is simpler:

- Revert the v1.5.2 search-observability PR commits → events disappear → next OTA / next install reverts to v1.5.0/v1.5.1 instrumentation.
- No data loss because no Aptabase aggregates depend on Phase 2C events yet.
- No dashboard updates needed because dashboards have not yet been configured.

This window closes the moment the first weekly retrieval report cites a Phase 2C chart. After that, the procedures in §9.1-§9.7 are the canonical path.

Existing v1.5.0 events (`search_query`, `search_no_results`, `guide_open`) keep firing regardless of any Phase 2C rollback. No dashboards built against them break.

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
