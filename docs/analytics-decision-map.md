# Analytics decision map

**Date**: 2026-05-18
**Companion**: [`docs/analytics-events.md`](analytics-events.md) — the event catalog. This doc maps WHICH event answers WHICH product question, and what is explicitly out of scope.

The goal of this doc is to make analytics auditable. Before adding a new event, check the table below: if no product question is unanswerable today, the new event is engagement bait, not signal.

---

## 1. Product questions ↔ events

### Acquisition / activation

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| How many users open the app each day? | `app_open` | DAU |
| Do users come back after install? | `app_open` + cohort by install date | Week-2 / Week-4 retention |
| What's the first surface a fresh user lands on? | `home_view` | First-session % seeing Home (vs. deep-link) |

### Discovery (search / featured / related / direct / recent_viewed / start_here / quick_action / saved)

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| Does smart search ranking convert? | `search_query` → `search_result_opened` funnel (preferred); legacy `guide_open { source: 'search' }` still fires | conversion rate per `q`; position distribution from `search_result_opened.position` |
| Which queries fail? Which keywords need a top-up? | `search_no_results { q }` (legacy) AND `search_zero_results { q, fallback_shown }` | Top-N over 14 days, classified per [retrieval-review-playbook.md](retrieval-review-playbook.md) |
| Which queries did the user GIVE UP on without engaging? | `search_abandoned { q, result_count, ms_since_query }` | Top-N abandons over 14 days; cross-reference with `result_count` — high-result-count abandons signal ranking failure, zero-result abandons signal coverage gap |
| Where in the result list did the user actually tap? | `search_result_opened.position` | Histogram of position values; if 90%+ at position 0, search is working; if long-tail, ranking has room |
| Did the dead-end defense layer rescue zero-result users? | `search_zero_results { fallback_shown: true }` → `fallback_guide_opened` funnel | Recovery rate (= `fallback_guide_opened` count / `search_zero_results` count); compare against pure abandon rate |
| Which Home surface earned the guide open? | `guide_open { source }` with values `search / related / featured / direct / recent_viewed / start_here / quick_action / saved / external_share / deep_link_placeholder` | Distribution share; `external_share` + `deep_link_placeholder` reserved for future routing (no call site yet) |
| Is the "Hay được dùng" featured row earning its slot? | `guide_open { source: 'featured' }` | % of guide opens; revisit if < 3% |
| Does the related-guides surface drive deeper sessions? | `guide_open { source: 'related' }` | Pages per session; absolute count |
| Do users come back to guides they viewed before? | `guide_open { source: 'recent_viewed' }` | Re-visit rate; days-to-return |
| Are featured/related/recent surfaces additive or cannibalistic? | `guide_open.source` distribution over 14 days | Compare each source share vs. `direct` |

### Retention (Phase R1)

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| Which guides earn long-term saves? | `guide_save { guide_id, category }` | Top-N saved guides over 30 days |
| Save churn — what's saved-then-unsaved? | `guide_save` vs. `guide_unsave` per guide | Net saves; rapid unsaves flag a quality issue |
| Is the save lever working at all? | `guide_save` count over baseline `guide_open` | Save rate (saves / opens); compare per category |

### Emergency / safety (Phase A1)

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| Which emergency surface earns opens? | `emergency_cta_open { source }` | Count by `source` ∈ `home_quick_action` / `home_start_here` / `search_empty` / `search_no_results` / `home_section_link` |
| Do users find the emergency hub when they need it? | `emergency_cta_open` correlated with time-of-day | Heatmap; spike outside business hours = good signal |
| Is the bottom Emergency contacts list redundant? | Phone-tap intent isn't tracked (different surface); EmergencyHub opens are tracked | If `emergency_cta_open` is rare AND the bottom list is the primary path, surface bloat |

### Cold-start discovery (Phase UX1, forward-compat)

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| Does the "Bắt đầu ở đâu?" row work for fresh users? | `home_start_here_pressed { shortcut_id }` | Share of new-user sessions; per-shortcut breakdown |
| Which shortcut is most-tapped — what's the de-facto cold-start intent? | `home_start_here_pressed { shortcut_id }` | Top-5 ranking; surface most-popular more prominently |
| Cannibalization with existing quick-actions? | Compare `home_start_here_pressed` vs. `home_quick_action_pressed` counts | If one dominates, consider deprecating the other |

### Engagement (Daily Ritual — existing)

| Product question | Event(s) | Aggregation |
| --- | --- | --- |
| Does Daily Ritual hook? | `daily_ritual_view` → `ritual_started` → `ritual_completed` funnel | Drop-off % per step |
| Streak retention? | `streak_viewed { current_streak }` distribution | Median streak; long-tail of 7+ day streaks |

### Mail Translate (mock / deferred)

Phase 1 mock flow. Events fire on the simulated flow. Useful for "does this feature concept interest users enough to justify Phase 2 backend cost?"

---

## 2. What we explicitly do NOT track

Hard rules. Each NO is enforced either by code (PII normalizer) or by review discipline (no event was added without a documented question).

| ❌ Do NOT track | Why |
| --- | --- |
| Raw search queries | PII risk. We forward `q = normalizeText(query).slice(0, 24)` only — see `normalizeQueryForAnalytics` in `src/utils/analytics.ts` |
| User-typed strings beyond the 24-char normalized search slice | PII risk |
| User location, IP-derived locale, GPS | Out of scope; Aptabase doesn't collect by default |
| Time-on-screen / scroll depth per guide | Privacy & engagement-bait risk |
| Per-tap UI interactions ("which button was tapped") | Spam — only decision-quality events |
| Notification copy A/B tests | Trust risk — see reminder system design |
| Bookmark contents (titles, notes) | PII risk — only `guide_id` |
| Specific guide content read time | Same as above |
| Reading user's calendar / contacts / email | Categorical privacy refusal |
| Sponsored / partner referral events | No monetization in v1.5.0 |
| Demographic inference (visa-status from profile setup) | Profile is local-only; never forwarded |

---

## 3. Privacy boundaries

- **All events are aggregate**. No event includes a value that can identify a single user.
- **`guide_id` is public-as-content** — it's a slug like `permanent-residency-eijuu`, not a personal id.
- **`q` from search is normalized + truncated to 24 chars** — pinned by `analytics.test.ts`.
- **`source` discriminators are bounded enums** — TypeScript prevents arbitrary strings from leaking.
- **No anonymous-id assignment by the app**. Aptabase uses a session-id rotated every hour; we don't read or persist it.
- **No cross-event joins** that could reconstruct user behavior. Aptabase's dashboard model is aggregate-only by default.
- **Aptabase EU instance** by default for the production app key.

---

## 4. Retention metrics — the dashboard we care about

Once 2 weeks of post-v1.5.0 data accumulates, these 6 metrics are the ones to watch:

1. **DAU / WAU / MAU** — `app_open` cohorts
2. **Search conversion** — `search_query` → `guide_open { source: 'search' }` ratio
3. **Failed query rate** — `search_no_results` count / `search_query` count
4. **Save rate** — `guide_save` count / `guide_open` count (segmented by category)
5. **Re-visit rate** — `guide_open { source: 'recent_viewed' }` / total `guide_open`
6. **Emergency CTA reach** — `emergency_cta_open` count / `home_view` count (any surface)

If 4 or 5 stagnate, retention surfaces aren't earning their slot. If 6 is near-zero, the discovery work isn't reaching the right urgency case.

---

## 5. Search metrics — Phase 2C inputs

Already documented in detail in [`docs/search-phase2c-data-checklist.md`](search-phase2c-data-checklist.md). The 3 events that feed it:

- `search_query { q, q_length, result_count }`
- `search_no_results { q, q_length }`
- `guide_open { source: 'search' }`

Phase 2C uses bucket A/B/C/D classification on the top-N failed queries to drive keyword top-ups.

---

## 6. Naming conventions (recap)

Per [`docs/analytics-events.md`](analytics-events.md):

- `<noun>_view` — screen views
- `<noun>_<verb>` — state transitions (`search_query`, `guide_save`)
- `<subject>_open` — surface activation (`emergency_cta_open`)
- `<subject>_pressed` — explicit tap intent (`home_start_here_pressed`)

When in doubt: read the catalog row aloud. If it answers a clear product question, ship. If it sounds like a generic UI tap, don't.

---

## 7. Adding a new event — checklist

Before opening a PR that adds to `EventMap`:

1. ✅ Document the **product question** the event answers in this file
2. ✅ Add the event row to `docs/analytics-events.md` with `When fires` description
3. ✅ Add the event to `EventMap` in `src/utils/analytics.ts` with typed props
4. ✅ Wire `track(...)` at the call site
5. ✅ Verify the event NEVER carries free-text from the user (only enum-typed `source` / `kind` / `shortcut_id` strings)
6. ✅ If the event semantically replaces an existing one, mark the old one deprecated in `analytics-events.md` and plan removal
7. ✅ Run `npm run typecheck` — type union enforces enum values

If you can't answer step 1 in one sentence, the event is engagement bait. Don't ship.

---

## 7b. §search-abandon — the heuristic

`search_abandoned` fires when the user typed a query (≥ 3 chars), let it stabilize for `ANALYTICS_DEBOUNCE_MS`, and then did NOT engage with the results before the abandon window elapsed. Engagement = tapping a result OR refining the query. The heuristic lives in `src/utils/abandonTimer.ts` (pure state-machine, fake-timer-tested) and is wired into SearchScreen via a 2-stage timer (debounce → abandon).

**Constants** (both in `SearchScreen.tsx`):
- `ANALYTICS_DEBOUNCE_MS = 800` — typing stability before any analytics fires
- `SEARCH_ABANDON_WINDOW_MS = 10_000` — idle time after the analytics fire that counts as abandon

**Tuning gate**: do NOT change either constant before ≥ 500 `search_abandoned` events / ≥ 14 days production data. Lower volume = anecdote-quality distribution.

**Anti-spam guarantees**:
1. **Per-query single-fire** — the same resting query cannot fire `search_abandoned` twice. Once fired, the `firedFor` sentinel matches that query string; until the next query change (which resets the sentinel), no further event emits.
2. **Pre-analytics debounce cancels** — every keystroke restarts the 800ms debounce timer BEFORE any analytics fires. Typing "z" → "za" → "zai" → "zair" → "zairy" → "zairyu" over 5 seconds collapses to ONE search_query + ONE abandon arm (for "zairyu"), not six.
3. **Refinement cancels (post-arm)** — after the abandon timer is armed, every keystroke reschedules it from zero. Rapid refinement after arm still produces at most one abandon for the final resting query.
4. **Result tap cancels** — `markAbandonHandled` is called on every result open, clearing both the timer and marking the query as engaged.
5. **Unmount cancels** — navigating away from SearchScreen runs the cleanup effect, which calls `cancelAbandon` AND clears any pending debounce. Walking away does NOT emit; only sitting on the screen idle does.
6. **App-background cancels** — an `AppState` listener cancels both the debounce and the abandon timer when the app goes inactive or backgrounds. Switching apps for 30 seconds does NOT emit an abandon. No auto-resume on return — the user must keystroke to re-arm.
7. **Too-short queries cancel** — `query.trim().length < 3` is treated as "user not committed yet"; both timers are canceled. Deleting a long query down to one char does not produce a spurious abandon.

**What `search_abandoned` tells the analyst**:
- `result_count > 0` → ranking failure or content quality failure (results existed; user found none acceptable)
- `result_count === 0` → coverage gap (no controlled keyword path exists for this query — Phase 2C playbook bucket A/B)
- `ms_since_query` near 10_000 → "thought about it then gave up" (good signal); much higher would indicate a stuck timer (bug)

**What `search_abandoned` does NOT tell the analyst** (don't infer):
- It does not measure user frustration intensity. The window threshold is heuristic, not psychological.
- It does not separate "abandoned because results were bad" from "abandoned because the user got distracted". Use `result_count` + Phase 2C bucket classification, not the abandon event alone, to decide whether to act on the query.

---

## 8. Events shipped this loop (R1 + A1)

| Event | PR | Decision-map row |
| --- | --- | --- |
| `guide_save` | #64 (R1) | §1 Retention — which guides earn long-term saves |
| `guide_unsave` | #64 (R1) | §1 Retention — save churn quality signal |
| `emergency_cta_open` | this PR (A1) | §1 Emergency — surface attribution |
| `home_start_here_pressed` | this PR (A1, forward-compat) | §1 Cold-start — shortcut effectiveness |
| `home_search_pressed` | v1.5.1 | §1 Discovery — search-CTA intent vs typed query (tap-without-type abandonment) |
| `home_quick_action_pressed` | v1.5.1 | §1 Cold-start — cannibalization vs `home_start_here_pressed` (the row already specified in §1 was unfired in v1.5.0) |
| `search_zero_results` | v1.5.2 | §1 Discovery — richer companion of `search_no_results`; carries `fallback_shown` for dead-end defense analysis |
| `search_result_opened` | v1.5.2 | §1 Discovery — position-aware conversion of search → tap |
| `search_abandoned` | v1.5.2 | §7b §search-abandon — quantifies give-up rate (distinct from zero-result) |
| `fallback_guide_opened` | v1.5.2 | §1 Discovery — dead-end recovery rate vs raw abandon |
| `home_layout_variant` | v1.5.2 | §1 Cold-start — cohorting for the local searcher-signal heuristic |

Existing `guide_open.source` enum was extended with `start_here`, `quick_action`, `saved`, `external_share`, `deep_link_placeholder` in v1.5.2. The first three have call sites today; the last two reserve forward-compat slots per `growth-next-loop-v1.5.1.md`.

Existing events whose `source` enum was extended:
- `guide_open.source` += `recent_viewed` (R1, Phase 2B addition)
