# Dashboard sanity checks — pre-trust checklist

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Cadence**: every weekly review, before filling the report. ~5 min.

Before any chart row becomes a candidate action, the data behind it
must pass these sanity checks. Skipping them is how a reviewer
becomes the kind of person who acts on noise.

Companions:
- [`docs/retrieval-metric-failure-modes.md`](retrieval-metric-failure-modes.md) — what each chart can deceive you into
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — the gates this checklist protects
- [`docs/aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) — chart-by-chart setup the checks assume
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — the weekly review this fits into

---

## 0. Run this first

If ANY of the following is true, **STOP** the review for this cycle
and file the report as "data integrity issue":

- [ ] One or more Phase 2C events return zero rows across the
      entire 7-day window (likely analytics outage, dashboard
      filter misconfiguration, or app failed to ship)
- [ ] `app_open` count is zero or implausibly low (< 10) for the
      window
- [ ] `home_view` count is significantly lower than `app_open`
      (suggests crash on Home mount or navigation regression)
- [ ] The Aptabase project shows a sampling banner (free-tier cap
      hit; data is no longer representative)
- [ ] The app version on the dashboard doesn't match what's in
      production (you might be looking at staging data)

A broken pipeline produces "clean" numbers. The numbers below are
how you detect a broken pipeline.

---

## 1. Cross-chart consistency checks

These checks compare numbers that MUST hold by definition. If they
don't hold, an event is mis-firing or a filter is wrong.

| # | Check | Expected | If broken |
| --- | --- | --- | --- |
| 1.1 | `search_query` count ≥ `search_zero_results` count | always | bug — zero-result fires without a query |
| 1.2 | `search_query` count ≥ `search_no_results` count (legacy) | always | bug — legacy zero-result also affected |
| 1.3 | `search_zero_results` count ≈ `search_no_results` count | within 5% | the two events should fire together; large divergence = one is mis-wired |
| 1.4 | `search_result_opened` count ≤ `search_query` count | always | bug — result open without query |
| 1.5 | `fallback_guide_opened` count ≤ `search_zero_results` count | always | bug — fallback fires outside zero-result branch |
| 1.6 | `guide_open` count ≥ `search_result_opened` count for guide-type results | always (legacy joins) | bug — `guide_open` is missing the search-source event |
| 1.7 | `home_layout_variant` count > 0 over a 7-day window with any `home_view` activity | always | bug — heuristic never fires; check HomeScreen wiring |
| 1.8 | Only values `cold_start` and `searcher` appear in `home_layout_variant` | strict | bug — unbounded variant string |
| 1.9 | `guide_open.source = external_share` count | 0 | bug — reserved enum populated |
| 1.10 | `guide_open.source = deep_link_placeholder` count | 0 | bug — reserved enum populated |
| 1.11 | `search_result_opened.position` is non-negative and ≤ 50 | always | bug — position field corrupted |
| 1.12 | `search_abandoned.ms_since_query` clusters near 10 000 ms | within 1 000 ms | bug — stuck timer or constant drift |

Any **broken** check = open a bug-fix PR BEFORE filling the report.
Broken event data corrupts every downstream conclusion.

---

## 2. Top-query vs top-open consistency

This is the second-most-useful cross-check.

**Setup**: open Chart 1 (top queries) and a derived view of Chart 5
(`search_result_opened` group-by `q`, NOT `result_type`) side-by-
side.

**Expected**: the top 10 most-searched queries should overlap
substantially with the top 10 most-OPENED queries. ≥ 5 of 10 in
common is a healthy sign.

**If broken**:
- Many top searches are NOT top opens → either ranking is missing
  the top results for those queries (Bucket A) OR the content
  doesn't satisfy the query (Bucket B). Cross-reference Chart 2
  (zero-results) and Chart 3 (abandons).
- Many top opens are NOT top searches → those guides are being
  reached by non-search paths (Home featured, related, direct).
  Not a search problem; possibly an opportunity if the gap is
  large.

**Do NOT act** from this check alone — it's a "where to look next"
signal, not an action signal.

---

## 3. Abandon vs zero-result consistency

If `search_abandoned` count for queries with `result_count = 0`
should equal `search_zero_results` count from the SAME queries,
within a margin.

| Observation | Likely cause | Action |
| --- | --- | --- |
| Abandon-with-zero-result count << zero-result count | Users open the fallback / emergency CTA before the 10s timer fires | normal — fallback layer is doing its job |
| Abandon-with-zero-result count ≈ zero-result count | Users stare at the dead-end UI for ≥ 10s and leave | also normal at low DAU |
| Abandon-with-zero-result count >> zero-result count | Bug — abandon firing for queries that should never have abandoned | investigate before any other action |

The ratio is informative; the absolute count is not, in low-DAU
regimes.

---

## 4. Fallback recovery vs abandon balance

For a single zero-result session, the user either:
- Opens a fallback guide → `fallback_guide_opened` fires
- Opens the emergency CTA → `emergency_cta_open { source: 'search_no_results' }` fires
- Abandons → `search_abandoned` fires with `result_count = 0`
- Switches away before 10s → no event fires

**Expected**: `fallback_guide_opened` + `emergency_cta_open` from
the `search_no_results` source + `search_abandoned(result_count=0)`
≤ `search_zero_results`. The leftover is "no event" — users who
left fast.

If the sum EXCEEDS `search_zero_results`, an event is double-firing.
File as bug.

---

## 5. Layout variant — equal-window comparison

`home_layout_variant` is the only Phase 2C metric where a 7-day
window is NOT enough. Use a 14-day window minimum.

**Compare**:
- This 14-day window's `searcher` count vs the previous 14-day
  window's `searcher` count
- Both must overlap at least 50% in actual users (which we cannot
  measure directly — proxy: similar `app_open` count and similar
  `home_view` count)

If `searcher` share rises sharply between equal-DAU windows, it's a
real heuristic flip. If it rises only because `app_open` rose
(more sessions overall), the share is misleading — investigate
distributional shift before any tune proposal.

---

## 6. Sample-size gates (per chart, before action)

Before ANY action candidate is considered STRONG (per
`no-data-action-policy.md` §2.2), each of these must hold:

| Chart | Minimum sample for action |
| --- | --- |
| Chart 1 — Top queries | Top query has count ≥ 5 AND DAU ≥ 30 |
| Chart 2 — Zero-result | Same query top-N in 2 consecutive weeks AND count ≥ 5 each |
| Chart 3 — Abandons | Same query count ≥ 5 across the window AND `result_count` mode is clear |
| Chart 4 — Position | ≥ 30 `search_result_opened` events in the window before discussing share |
| Chart 5 — Result type | ≥ 30 events; share < 10% across types should be ignored |
| Chart 6 — Fallback | ≥ 100 `search_zero_results` events in the window before computing recovery rate |
| Chart 7 — Layout variant | ≥ 14 days of data; ≥ 30 unique variants emitted (≥ 30 home focuses) |

Below the gate = chart is anecdote. Note in §16 of the weekly report
as "insufficient sample" and carry forward.

---

## 7. Analytics-outage detection

Each week, before trusting any chart, verify:

- [ ] **Per-day spread**: each weekday in the window has at least
      one event of each major type. A day with zero `search_query`
      AND zero `guide_open` is suspicious — either the app stopped
      shipping events that day or the dashboard filter ate them.
- [ ] **Hour-of-day spread**: events should appear across multiple
      hours of the day, not clustered into one hour (which would
      indicate a batch test push).
- [ ] **App version match**: the version pickup matches the
      production-deployed binary (currently v1.5.0 build 26). If
      multiple versions appear, the comparison is noisier; segment
      by version before drawing conclusions.
- [ ] **No identical-count duplicate days**: if Wednesday and
      Thursday show identical counts for multiple events, suspect
      that the dashboard is showing cached data, not fresh fetches.

If any outage indicator is present → mark the report data-integrity
suspect; do NOT escalate any finding to STRONG.

---

## 8. Dashboard-filter verification

A misapplied filter is the easiest invisible bug. Each cycle:

- [ ] Confirm time range = last 7 days (or 14 days for the layout
      chart). NOT "last 30 days" with implicit decay.
- [ ] Confirm the `fallback_shown = true` filter on Chart 2 hasn't
      been silently switched to `false` or removed.
- [ ] Confirm no `result_type` filter on Chart 4 (we want all
      types in the position distribution; filtering to `guide`
      only would bias the histogram).
- [ ] Confirm no `q` filter on Charts 1-3. Filtering to a single
      query would defeat the top-N purpose.
- [ ] Confirm no `app_version` filter that excludes the current
      production version.

When in doubt, **clear all filters and redo the chart from scratch**
per `docs/aptabase-phase2c-dashboard-checklist.md`.

---

## 9. Questions to ask before acting

For every action candidate that survived §1-§8, the reviewer must
be able to answer YES to ALL of these:

- [ ] Would this action still feel right if the count dropped by
      half next week?
- [ ] Is the action reversible in a single PR?
- [ ] Does the action affect EXACTLY ONE guide, ONE keyword, or
      ONE copy line? (Larger scope → break into smaller PRs)
- [ ] Has the proposed fix been documented in the weekly report's
      §14 (Action candidates), with the source-row citation?
- [ ] Have I checked that the proposed keyword phrase isn't a
      truncated form of a longer intent? (24-char cap)
- [ ] Would the action break any of the 26 pinned search guarantees
      in `searchIndex.test.ts`? If so, are new pins added?
- [ ] Is the user who would benefit from this action a real,
      identifiable user pattern — not a hypothetical?

A NO on any row = action is not yet justified. Carry forward.

---

## 10. What NOT to optimize

These are common "obvious" things to optimize that are NOT actually
healthy in this regime:

| Tempting optimization | Why not |
| --- | --- |
| **Maximize position-0 share** | Above 90% suggests users don't explore — possibly because alternatives look weak, not because top-1 is right |
| **Minimize abandon rate** | Abandons include legitimate "got it from the snippet" exits; pushing this to zero would mean removing the dead-end timer or hiding result snippets |
| **Maximize search share of `guide_open.source`** | Search competing with Home featured / quick actions is healthy variety; forcing search dominance trades discovery diversity for funnel cleanliness |
| **Equalize searcher / cold_start split** | The split SHOULD be uneven — most users aren't power searchers |
| **Pin every top-10 query** | Pinning every popular query overfits the index to current vocabulary and breaks on next month's vocabulary shift |
| **Maximize fallback recovery rate** | Above 30% suggests featured guides are too prominent at the cost of search proper |
| **Make every metric "green"** | Some metrics are SUPPOSED to be in the warning band; that's how surprises stay visible |

Optimization is not the goal. **Avoiding wrong action is the goal.**

---

## 11. When to stop looking at charts

End the review session when ANY of these is true:

- All §1 cross-checks pass AND all action candidates are documented in §14 of the report → review is done; close the dashboard.
- ≥ 90 minutes spent without surfacing a new STRONG candidate → stop; the marginal value is gone.
- Reviewer noticed they're looking for something to justify a pre-formed opinion → stop immediately; close the dashboard for 24 hours.
- The chart you're staring at hasn't changed materially in 4 reviews → remove it from the dashboard; it's not earning its space.

Charts are a tool, not a tribute. Spending more time does NOT
produce more truth — it just produces more rationalization.

---

## 12. Pre-flight before each weekly review

Save this list at the top of your reviewer notes.

```
[ ] §0 — no data integrity blocker
[ ] §1 — all 12 cross-chart sanity checks pass
[ ] §2 — top-query vs top-open overlap noted
[ ] §3 — abandon vs zero-result ratio noted
[ ] §4 — fallback + abandon balance noted
[ ] §5 — layout variant 14-day comparison noted
[ ] §6 — sample-size gate met for each chart referenced
[ ] §7 — no analytics-outage indicator
[ ] §8 — dashboard filters verified
[ ] §9 — all questions answered YES for each action candidate
[ ] §10 — no tempting optimization being chased
[ ] §11 — stop condition respected
```

If unchecked rows remain after the review, **the report is not yet
actionable**. File it as "observation only" — that's an honest
output, not a failure.

---

## 13. Revisit this doc

- After every 4 weeks → audit which rows in §1 actually fired bugs;
  remove rows that never trigger.
- After any wrong-action PR → trace which check would have caught
  it; strengthen that row.
- After 2-3 cycles where the reviewer felt "this checklist is
  overkill" → keep it anyway. The point is to feel overkill in
  calm weeks so the unusual week stays catchable.

The cost of an extra 5 minutes per cycle is much lower than the
cost of one wrong keyword PR.
