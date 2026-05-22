# No-data action policy

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Scope**: every product decision that consumes Phase 2C analytics in
the first ~12 weeks after launch, while DAU is still in the
low-volume regime (< 100).

This policy exists to keep us **honest with low-volume data**. With
v1.5.0 just out and Android not yet shipped, weekly numbers will be
small. Small numbers invite overreaction. Overreaction in a search
ranking layer is hard to unwind — once a keyword PR lands, it
quietly biases every future query.

Companions:
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — the 5-question review
- [`docs/templates/retrieval-weekly-report-template.md`](templates/retrieval-weekly-report-template.md) — the report form
- [`docs/aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) — the dashboards
- [`docs/product-state-v1.5.2-prep.md`](product-state-v1.5.2-prep.md) §13 / §14 — Observation Season Rules and v1.5.3 / v1.5.4 sprint scope

---

## 1. The default is "do nothing"

In a low-DAU regime, the safest action is observation. The cost of
shipping a wrong keyword PR is bigger than the cost of waiting one
more week for confirmation. There is **no** product penalty for
filing an empty `Action candidates` table — that is the expected
outcome for the first 3-4 weekly reports.

> "If we waited a week, would the right action become more obvious?"
>
> If yes — wait.

---

## 2. Signal classification

Every observed pattern falls into one of four bands. Bind your
action to the band.

### 2.1 Bug (act now)

A bug is a deterministic correctness problem visible **without**
statistical interpretation:

- App crash, hang, or white screen
- Broken route (button taps fire but navigate nowhere)
- Event mis-firing (e.g. `fallback_guide_opened` fires from a path
  that is not the dead-end branch — caught by the cross-chart sanity
  checks)
- A guide title or `searchKeywords` entry contains an obvious typo
- A `lastVerified` date is in the future
- A reserved `guide_open.source` value (`external_share`,
  `deep_link_placeholder`) appears with non-zero count

Action: **fix immediately**. No 2-week wait. Single-PR fix. No
opinion required.

### 2.2 STRONG signal (act after confirmation)

A STRONG signal meets ALL of:

- Appears in a chart's top-N for **2 consecutive weekly reports**
- Count ≥ 5 in each report
- DAU ≥ 30 across each window (smaller windows are too noisy)
- The action is reversible (a keyword PR can be reverted; a deleted
  feature cannot)

Action: open exactly **one** PR (one phrase, one guide, one
ranking pin, or one copy line). Document the supporting weekly
report rows in the PR body. After merge, watch the next weekly
report to confirm the metric moved the right way.

### 2.3 MEDIUM signal (observe, do not act)

A MEDIUM signal:

- Appears in a chart's top-N this week, NOT last week
- Or appears both weeks but count < 5 in either
- Or appears with high count but the chart is itself questioned
  (DAU < 30, dashboard misconfiguration, brand-new install spike,
  etc.)

Action: **observe**. Add to the carry-forward queue (§17 of the
weekly report). If it reappears next week and qualifies as STRONG,
THEN act.

### 2.4 WEAK signal / noise (refuse to act)

A WEAK signal:

- Count < 5, or DAU < 30 across the window
- Generic / Bucket-D query (`japan`, `help`, `info`, `app`)
- Ambiguous intent / Bucket-C
- One-week spike that doesn't recur
- A pattern that "feels right" but isn't backed by a chart row

Action: **refuse**. Record the refusal in §16 of the weekly report.
Refusals are first-class outputs of this loop — they're how future
reviewers see that a pattern was considered and dismissed, not
missed.

---

## 3. Minimum-signal rule

Before any retrieval-related PR opens (excluding bug fixes per §2.1):

- [ ] **At least 7 days** of production data with the v1.5.0
      build-26+ binary (Phase 2C events firing).
- [ ] **At least 2 weekly reports filed** that both name the same
      finding.
- [ ] **DAU ≥ 30** in each of the 2 weeks (lower = the count is
      anecdote).
- [ ] **Count ≥ 5** for the query / surface in each of the 2 weeks.
- [ ] **Anti-overreaction checklist** (§18 of the weekly report)
      ticked.

If any box is unticked, the PR is **out of policy** — close it or
hold it until the box ticks.

---

## 4. Constant-tuning gate (separate, stricter)

The three SearchScreen heuristic constants are **frozen** until a
much higher data bar:

| Constant | Current value | Unfreeze gate |
| --- | --- | --- |
| `ANALYTICS_DEBOUNCE_MS` | 800 ms | ≥ 500 `search_query` events across ≥ 14 days AND signal that the debounce is misbehaving (e.g. duplicated events, or zero-result fires on transient queries) |
| `SEARCH_ABANDON_WINDOW_MS` | 10 000 ms | ≥ 500 `search_abandoned` events across ≥ 14 days AND the abandon distribution is clearly wrong (e.g. > 30% abandons in 0-3s suggests window too short; < 5% abandons regardless of query suggests window too long) |
| `SEARCHER_THRESHOLD` | 5 | ≥ 14 days of `home_layout_variant` data AND the split is outside 5%-50% for 2 consecutive weekly reports |

These constants are documented at their definition sites in
`src/screens/SearchScreen.tsx` and `src/utils/searcherSignal.ts`.
Tuning before the gate clears = tuning on vibes. Forbidden.

---

## 5. Worked examples

### 5.1 "One search_zero_results = no action"

Week 1 report: `bao hiem suc khoe`, count 1, zero results.

Band: **WEAK / NOISE** (count < 5, single week).

Action: record in §16 of week-1 report as "observed, count too low".

If the same query appears in week 2 with count ≥ 5 → upgrade to
STRONG, open one keyword PR.

If absent from week 2 → discard.

### 5.2 "Two weeks in a row = candidate"

Week 1: `kokumin hoken` count 7, zero results. Bucket A
(health-insurance guide exists, keyword missing).

Week 2: `kokumin hoken` count 9, zero results.

Band: **STRONG**.

Action: open one PR adding `'kokumin hoken'` to the
`health-insurance` guide's `searchKeywords`. PR body cites both
reports. After merge, watch week 3 — expect count to drop or query
to leave zero-results entirely.

### 5.3 "Obvious typo in guide keyword = safe fix"

A reviewer notices that `pension-nenkin` has
`searchKeywords: ['nenkim']` (typo for `nenkin`).

Band: **BUG**.

Action: fix immediately. No 2-week wait. Single-PR. The pre-existing
54-test pin suite already covers any keyword change; add a new
test only if the corrected keyword represents a new pinned
expectation.

### 5.4 "App crash / route broken = immediate fix"

A user reports tapping a guide card produces a white screen.

Band: **BUG**.

Action: fix immediately. Do not wait for a weekly report. Do not
require chart-row evidence. The user-reported reproduction IS the
signal.

### 5.5 "No feature because of vibes"

A reviewer reads the report and thinks "users might benefit from a
voice search". No chart row supports this. No user has asked for
it.

Band: **NOISE** (no signal at all).

Action: **refuse**. Vibes are not a signal. If the idea recurs,
open a discovery doc proposing how it would be measured first, not
a feature PR.

### 5.6 "No keyword because one user searched once"

Week 1: a single query `viet nam embassy phone` appears with count 1.

Band: **WEAK**.

Action: refuse. One search is one human. The cost of pinning a
keyword on the basis of one search is propagating that user's
specific phrasing to every future ranking decision. Wait.

If the same query (or close variant) appears with count ≥ 5 in a
later week → re-evaluate as STRONG, considering whether the right
fix is a keyword OR a content backlog entry (no embassy guide
currently exists — would be Bucket B).

---

## 6. What "act" actually means in this policy

A retrieval-related "action" in this regime is one of:

| Action | Scope | Notes |
| --- | --- | --- |
| **Bug fix** | unrestricted | crash, broken route, mis-firing event, typo in shipped string, future `lastVerified` date |
| **Content fix** | edit ONE guide | factual correction, minor body edit; must NOT bump `lastVerified` without a real source check (see `content-governance.md`) |
| **Keyword pin** | ONE phrase, ONE guide | append to `searchKeywords` only; phrase must be long enough to be specific (single common word like `tax` is forbidden); pin the new expectation in `searchIndex.test.ts` |
| **Ranking test** | ONE new pinned expectation | adds a test row in `searchIndex.test.ts`; does NOT change `searchIndex.ts` weights |
| **UX small fix** | copy only | one line of text or one chip label; no new component, no layout change, no new analytics |

Anything outside that vocabulary (new feature, new dependency, new
backend, AI integration, push notification, deep-link infra, remote
config, A/B SDK, Home/Search redesign) is **out of scope for the
v1.5.3 operating layer**. Those decisions belong to a separate
sprint with its own design + scope review — not a weekly report row.

---

## 7. When to retire this policy

This policy is calibrated for the low-DAU regime. It should be
revisited when:

- DAU has been ≥ 200 for 4 consecutive weeks, AND
- The weekly report has produced ≥ 5 STRONG-signal actions in the
  prior 12 weeks, AND
- The reviewer can no longer hold the top-50 queries in their head
  unaided

At that point, the 2-week consecutive rule may relax to a
single-week threshold with confidence-interval-based reasoning, and
some chart polling could be automated. Until then, manual + slow
+ honest beats automated + fast + biased.

---

## 8. Quick reference (carry into every weekly review)

```
DEFAULTS:
  - Do nothing
  - Wait one more week
  - Record refusals as first-class outputs

ACT NOW (no wait):
  - Crash / broken route / event mis-firing
  - Future lastVerified, typo in shipped string
  - Reserved enum value emitted
  - Cross-chart sanity check broken

ACT AFTER 2-WEEK CONFIRMATION:
  - Same query top-N in 2 consecutive reports
  - Count ≥ 5 in each
  - DAU ≥ 30 in each
  - Action reversible
  - Anti-overreaction checklist ticked

NEVER ACT FROM:
  - Single-week pattern
  - Count < 5
  - DAU < 30
  - Generic / ambiguous query
  - Vibes
  - "Just one phrase to be safe"
```
