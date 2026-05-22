# Retrieval weekly report — TEMPLATE

> Copy this file into `docs/reports/retrieval-week-YYYY-MM-DD.md`, fill it
> in by hand from the Aptabase dashboards, then commit. ONE report per
> ISO week. Do NOT delete previous reports — they're how the
> "2 consecutive weeks" rule works.

This is the **operating layer** of Phase 2C. The events in
`docs/search-observability-phase-2c.md` are the raw signal; this report
is how that signal becomes (or refuses to become) action.

Companions:
- [`docs/retrieval-review-playbook.md`](../retrieval-review-playbook.md) — the 5-question review process
- [`docs/aptabase-phase2c-dashboard-checklist.md`](../aptabase-phase2c-dashboard-checklist.md) — where to click in Aptabase
- [`docs/no-data-action-policy.md`](../no-data-action-policy.md) — the rules that decide if a row in this report becomes a PR

---

## 0. Meta

| Field | Value |
| --- | --- |
| Week range (ISO Mon-Sun) | YYYY-MM-DD → YYYY-MM-DD |
| Report filed | YYYY-MM-DD |
| Reviewer | pdythanhduy |
| App version observed | (e.g. v1.5.0 build 26 / iOS only) |
| Commit at start of week | (HEAD sha) |
| Commit at end of week | (HEAD sha) |
| Days of data in window | (7 ideal; record actual) |
| Aptabase dashboard URL(s) | (paste if you keep them) |

If `Days of data in window < 7` → this report is **insufficient on its
own** to trigger any action. Use it only to accumulate toward a future
2-week confirmation.

---

## 1. Volume

Filled from the built-in Aptabase home dashboard. Round to nearest 10
for DAU < 100 — false precision invites overreaction.

| Metric | This week | Last week | Δ |
| --- | --- | --- | --- |
| DAU (avg) | | | |
| `app_open` (count) | | | |
| `home_view` (count) | | | |
| `search_query` (count) | | | |
| `search_zero_results` (count) | | | |
| `search_result_opened` (count) | | | |
| `search_abandoned` (count) | | | |
| `fallback_guide_opened` (count) | | | |
| `guide_open` (count) | | | |

If DAU < 30 over the window → mark every section below "**LOW VOLUME —
weak signal**" and refuse to act on any single-week finding. Per
`no-data-action-policy.md`, only bugs or 2-consecutive-week patterns
are actionable in this regime.

---

## 2. Top 10 `search_query`

Chart: Top queries (Aptabase chart #1).

| Rank | Normalized `q` | Count | Has matching guide? | Notes |
| --- | --- | --- | --- | --- |
| 1 | | | yes / no / partial | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

"Has matching guide?" = does at least one guide in the index actually
cover the intent (not just the keyword)? If unsure, mark `partial` and
revisit at decision time.

---

## 3. Top 10 `search_zero_results`

Chart: Zero-result queries (Aptabase chart #2).

| Rank | Normalized `q` | Count | Bucket (A/B/C/D) | Same query last week? | Action candidate |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | yes / no | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |
| 9 | | | | | |
| 10 | | | | | |

Bucket definitions (from `retrieval-review-playbook.md` §Q2):
- **A** — clear intent + matching guide exists, ranking misses → safe keyword PR
- **B** — clear intent + NO matching guide → content backlog only
- **C** — ambiguous intent → carry forward, do not act
- **D** — generic noise (`japan`, `help`, `info`) → never pin

---

## 4. Top 10 `search_abandoned`

Chart: Abandoned queries (Aptabase chart #3), cross-filtered by `result_count`.

| Rank | Normalized `q` | Count | `result_count` mode | Same query last week? | Bucket | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | 0 / >0 | yes / no | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |
| 9 | | | | | | |
| 10 | | | | | | |

Rule:
- `result_count = 0` abandons → coverage gap → Bucket B
- `result_count > 0` abandons → ranking gap → record `position` for top-1 below in §6

---

## 5. Top 10 `search_result_opened` by `guide_id`

Chart: Result-type / opened-result group-by `guide_id` (derived from chart #5).

| Rank | `guide_id` (or `result_type:id`) | Count | Position mode | Healthy? |
| --- | --- | --- | --- | --- |
| 1 | | | | yes / no |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

"Healthy" = the opened guide is something we'd actively recommend as
the top answer for the query that produced it. Mark `no` only when a
guide is clearly mis-matched.

---

## 6. Position distribution summary

Chart: Search result opened position (Aptabase chart #4).

| Position bucket | Count | % of all opens |
| --- | --- | --- |
| 0 | | |
| 1 | | |
| 2 | | |
| 3-4 | | |
| 5-9 | | |
| 10+ | | |

Healthy targets (from `product-state-v1.5.2-prep.md` §7):
- Position-0 share ≥ 70%
- Top-3 (position 0-2) share ≥ 90%

If either drops, expect rank-failure abandon rows in §4 — cross-check.

---

## 7. Fallback recovery rate

Chart: Fallback recovery (Aptabase chart #6).

- `search_zero_results` count: _____
- `fallback_guide_opened` count: _____
- Recovery rate: _____ %

Healthy ≥ 5%. Below 1% AND volume > 100 → fallback layer isn't earning
its space → review featured guides in §10.

---

## 8. `home_layout_variant` split

Chart: Home layout variant (Aptabase chart #7).

| Variant | Count | % |
| --- | --- | --- |
| `cold_start` | | |
| `searcher` | | |

Healthy: searcher between 10% and 30%. Below 5% → threshold may be too
high. Above 50% → threshold too low. **Do NOT tune
`SEARCHER_THRESHOLD` until ≥ 14 days of data AND the same pattern
shows for 2 consecutive weekly reports.** See
`no-data-action-policy.md`.

---

## 9. `guide_open.source` distribution

| `source` | Count | % | Expected band | Status |
| --- | --- | --- | --- | --- |
| `direct` | | | 30-50% | |
| `search` | | | 20-40% | |
| `featured` | | | 5-15% | |
| `related` | | | 5-15% | |
| `recent_viewed` | | | 5-15% | |
| `start_here` | | | new — observe | |
| `quick_action` | | | new — observe | |
| `saved` | | | new — observe | |
| `external_share` | | | reserved (0 expected) | |
| `deep_link_placeholder` | | | reserved (0 expected) | |

`external_share` / `deep_link_placeholder` should remain 0 until
future wiring lands. Non-zero on either → bug, investigate before next
release.

---

## 10. 3 biggest user intents (qualitative)

Pick the 3 strongest signals from §2 and §3 combined. One sentence
each — what is the user trying to do?

1.
2.
3.

---

## 11. 3 biggest dead-ends (qualitative)

Pick the 3 strongest from §3 + §4-with-`result_count=0`. One sentence
each — what coverage is missing?

1.
2.
3.

---

## 12. 3 suspicious rankings

Pick the 3 strongest signals from §4-with-`result_count>0` + §5
"healthy=no" + §6 long-tail position evidence. One sentence each.

1.
2.
3.

---

## 13. Evidence strength

For each candidate action below, mark its evidence band:

| Band | Definition | Eligible action |
| --- | --- | --- |
| **STRONG** | Same query is top-N for 2 consecutive weekly reports OR bug (crash / wrong route / lastVerified rot caught by hand) | Keyword PR / content backlog entry / bug fix |
| **MEDIUM** | Top-N this week, not last week, count ≥ 5 | Carry to next report; act only if confirmed |
| **WEAK** | Top-N this week, count < 5, OR DAU < 30 | Observe only. No action. |
| **NOISE** | Single occurrence, ambiguous query, or generic word | Discard |

A query qualifies for a **keyword PR** only if its evidence band is
STRONG. Do NOT escalate MEDIUM → action just because it "feels right".

---

## 14. Action candidates

Only fill rows here that are STRONG-evidence per §13.

| # | Source row | Query / guide / surface | Proposed action | Type | Owner | ETA |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | §3 row N | | | content fix / keyword pin / ranking test / UX small fix / bug fix | | |
| 2 | | | | | | |
| 3 | | | | | | |

Type vocabulary (matches `no-data-action-policy.md`):
- **content fix** — edit an existing guide (typo, factual error, missing keyword in body)
- **keyword pin** — append a single phrase to one guide's `searchKeywords`
- **ranking test** — add a new pinned expectation in `searchIndex.test.ts`
- **UX small fix** — copy / chip-text only. NO redesign. NO new component.
- **bug fix** — broken route / crash / event mis-firing

---

## 15. Decision for this cycle

Mark exactly one for each action candidate above. If nothing qualifies,
mark `no action`.

- [ ] **no action** — observe only; carry suspicious rows to next week
- [ ] **content fix** — list PR(s) below
- [ ] **keyword pin** — list PR(s) below; ONE phrase per PR
- [ ] **ranking test** — list PR(s) below
- [ ] **UX small fix** — list PR(s) below; cite the copy line that changes
- [ ] **defer** — record reason

PR(s) opened from this report:

| # | PR link | Action type | Linked candidate row |
| --- | --- | --- | --- |
| 1 | | | §14 row N |

---

## 16. DO NOT act yet — explicit refusals

Use this section to **name** the candidates you saw but **chose not
to act on**, with reason. Recording refusals is as important as
recording actions — it's how future reviewers see that a signal was
considered and rejected, not missed.

| Candidate | Reason refused |
| --- | --- |
| | (DAU too low — wait 2 more weeks) |
| | (one-week spike, not yet confirmed) |
| | (Bucket D generic noise) |
| | (Bucket C — ambiguous intent) |
| | (constant tuning blocked by `no-data-action-policy.md` §4) |

---

## 17. Carry-forward queue

Things to re-check next week.

- [ ] Query `…` — appeared this week with N=… ; if appears next week → STRONG
- [ ] Surface `…` — % shifted from … to …; observe next week before acting
- [ ] Variant split `…` — drift to monitor

---

## 18. Anti-overreaction checklist

Tick each before filing this report. If any is unchecked, **the report
is not yet ready to be acted on** — at most it accumulates evidence.

- [ ] DAU and `search_query` volume large enough that any top-10 row has count ≥ 5
- [ ] Each STRONG action candidate appears in this week AND last week (or is a clear bug)
- [ ] No proposed keyword pin would steal traffic from another query (single phrase, scoped to one guide)
- [ ] No proposed UX change touches ranking, analytics, or the timer constants
- [ ] No proposed action requires changing `ANALYTICS_DEBOUNCE_MS`, `SEARCH_ABANDON_WINDOW_MS`, or `SEARCHER_THRESHOLD` — those are gated to ≥ 14 days of data per `no-data-action-policy.md` §4
- [ ] No proposed action lifts `lastVerified` without a real source check
- [ ] No proposed action adds a new dependency
- [ ] No proposed action requires backend, auth, push, AI, deep-link infra, or remote config

---

## 19. Notes / surprises

Free-text. Things that don't fit the form. Hypotheses to test next week.
