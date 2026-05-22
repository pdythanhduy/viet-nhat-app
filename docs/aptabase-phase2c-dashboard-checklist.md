# Aptabase Phase 2C dashboard — manual setup checklist

**Goal**: configure the 7 dashboard charts that feed the weekly
retrieval report. Once. By hand. No automation.
**Owner**: pdythanhduy.
**Effort**: ~30-45 minutes one-time. ~2 minutes per chart at weekly review.
**Predecessors**: the broader [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md)
covers v1.5.0/v1.5.1 charts (retention, save, share, source split).
This doc adds the **Phase 2C-specific** charts that the
v1.5.3 operating layer requires.

Companions:
- [`docs/search-observability-phase-2c.md`](search-observability-phase-2c.md) — the event catalog
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — the 5-question review
- [`docs/templates/retrieval-weekly-report-template.md`](templates/retrieval-weekly-report-template.md) — the report form
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — when a chart row becomes a PR

---

## Pre-flight

1. Open https://aptabase.com → sign in → select the **viet-nhat-app**
   project (EU instance — privacy posture).
2. Confirm Phase 2C events are present in the event picker:
   - `search_query` (existing, pre-2C)
   - `search_no_results` (existing, pre-2C — kept for back-compat)
   - `search_zero_results` (new)
   - `search_result_opened` (new)
   - `search_abandoned` (new)
   - `fallback_guide_opened` (new)
   - `home_layout_variant` (new)
   - `guide_open` (existing; `source` enum now has 5 new values)
3. Confirm time-range default = **Last 7 days**. The weekly report
   assumes a 7-day window.
4. Confirm the project's event volume hasn't hit the free tier cap
   (~20K events/month). If close → consider sampling later. Not a
   blocker for first 200-500 DAU.

If any of the new events does NOT appear in the picker:
- Check the device that produced traffic is running v1.5.0 build 26+
- Check Metro `console.log` for the event name (analytics double-logs
  in `__DEV__`)
- Check `getAptabaseKey()` returns non-null
- Wait 5-10 minutes — Aptabase ingestion is not instant

---

## Naming convention

Name each dashboard chart exactly as listed below. The weekly report
template references these names — drift means the reviewer has to
mentally re-map every Monday.

Suggested folder in Aptabase: **`Phase 2C — Retrieval`** (separate
from the v1.5.0 retention / save / share folder).

---

## Chart 1 — Top queries

**Purpose**: what content do users actually want? Drives §2 of the
weekly report and Q1 of the playbook.

**Setup steps**:
1. New chart → event: `search_query`
2. Group by: `q` (normalized 24-char query property)
3. Metric: **count**
4. Time range: last 7 days
5. Sort: count desc
6. Limit: top 50
7. Chart type: horizontal bar
8. Save as: `Phase 2C — Top queries (7d)`

**Interpretation**:
- Top 10 = the user's working vocabulary.
- A top query NOT in the content roadmap = an unanticipated intent.
- Cross-reference against Chart 2: a query that is BOTH top-10 here
  AND top-10 in zero-results = high-priority Bucket A or B candidate.

**False-positive warnings**:
- Generic words (`japan`, `help`, `info`) inflate this list early
  because they're easy to type. Treat as Bucket D (noise).
- A single user typing one query 20 times still shows here.
  Aptabase has no per-session de-dup we can rely on. If DAU < 30,
  assume any count < 5 is one or two users.
- The 24-char normalization can fold distinct queries together
  (e.g. `bao hiem suc khoe gia dinh` → `bao hiem suc khoe gia di`).
  Don't pin keywords on truncated queries — re-check the snippet.

**Action threshold**: see `no-data-action-policy.md`. Briefly: a top
query becomes actionable only when it appears in the top-10 for
**2 consecutive weekly reports** AND has count ≥ 5 each time, OR is
a clear bug (e.g. spelled exactly the same as an existing guide title
yet returns zero — that's a ranking bug, not a signal question).

**What NOT to do**:
- ❌ Do NOT add a keyword based on a single week.
- ❌ Do NOT add a keyword to "rescue" a generic word (Bucket D).
- ❌ Do NOT trust the count if DAU < 30 for the window.

---

## Chart 2 — Zero-result queries

**Purpose**: where does search return nothing? Drives §3 of the
weekly report and playbook Q2.

**Setup steps**:
1. New chart → event: `search_zero_results`
2. Filter: `fallback_shown` = `true`  *(this is the only value the
   app currently emits, but recording the filter is defensive —
   future variants might emit `false` for non-dead-end zeros)*
3. Group by: `q`
4. Metric: **count**
5. Time range: last 7 days
6. Sort: count desc
7. Limit: top 50
8. Chart type: horizontal bar
9. Save as: `Phase 2C — Zero-result queries (7d)`

**Interpretation**:
- Each row = an unfulfilled intent the user actually expressed.
- Bucket each row per playbook §Q2 (A / B / C / D).
- A row that ALSO appears in Chart 1's top 10 = strongest evidence
  for action (real demand AND real failure).

**False-positive warnings**:
- Typos look like coverage gaps but aren't. Resolve via "does this
  query have a 1-2 char edit-distance fix that succeeds?". If yes,
  it's a typo, not a content gap.
- Mixed-language queries (`住民税 vietnamese`) may zero out for
  ranking reasons, not coverage reasons. Cross-check against the
  abandon chart (Chart 3) — if `result_count` was 0 there too, it's
  coverage; if > 0, it's ranking on a different query.
- Aptabase free-tier sampling does NOT happen below ~20K events/mo;
  no need to worry until DAU rises substantially.

**Action threshold**:
- **Bucket A** (intent + guide exists, ranking misses): act after
  the same query is top-N for **2 consecutive weekly reports**. One
  PR = one phrase = one guide.
- **Bucket B** (intent, no guide): append to
  `docs/full-content-backlog-45-guides.md`. No keyword PR. Ever.
- **Bucket C / D**: tally and ignore for ≥ 3 cycles before reconsidering.

**What NOT to do**:
- ❌ Do NOT add a keyword to an unrelated guide just to make the
  zero-result disappear — that trades "nothing" for "wrong answer",
  which is worse.
- ❌ Do NOT remove the fallback layer because "users don't seem to
  use it" — that decision is governed by Chart 6, not Chart 2.
- ❌ Do NOT batch fixes for multiple top-50 queries into one PR —
  one phrase per PR keeps regressions surgical.

---

## Chart 3 — Abandoned queries

**Purpose**: what did users give up on? Most important behavioral
chart. Drives §4 of the weekly report and playbook Q3.

**Setup steps**:
1. New chart → event: `search_abandoned`
2. Group by: `q`
3. Secondary group / split: `result_count` (bucket: `=0` vs `>0`)
4. Metric: **count**
5. Time range: last 7 days
6. Sort: count desc
7. Limit: top 50
8. Chart type: stacked horizontal bar (so each query shows both
   `=0` and `>0` contributions)
9. Save as: `Phase 2C — Abandoned queries (7d, by result_count)`

**Interpretation**:
- `result_count = 0` abandon → coverage gap. Equivalent to Bucket B
  in Chart 2. Likely the same row.
- `result_count > 0` abandon → **ranking quality issue**. The user
  saw results and walked away. This is the single most important
  signal in Phase 2C. Cross-reference position (Chart 4) and result-type
  (Chart 5) for these queries.

**False-positive warnings**:
- An abandon fires after `SEARCH_ABANDON_WINDOW_MS` (10s) of
  typing-stable inactivity. A user who switches apps to translate
  the result, then returns and taps, **does** count as abandoned —
  because the abandon fires AT 10s, and the later tap doesn't undo
  it. Treat the absolute count as inflated by ~5-15% for cross-app
  workflows. The ratio is still meaningful.
- A user who closes the app entirely **before** the 10s mark does
  NOT fire abandon (AppState listener cancels the timer). So the
  chart under-counts "rage-quit" abandons.
- Sub-3-char queries do NOT fire abandon (`ANALYTICS_MIN_QUERY_LEN`
  floor). So 1-2 char fragments never show up here.

**Action threshold**:
- `result_count = 0` abandons → treat as Bucket B (content backlog)
  after 2 consecutive weeks.
- `result_count > 0` abandons → **before** acting, look at Chart 4
  for that query and confirm position distribution actually points
  to wrong top-1. If top-1 is correct and the user still abandoned,
  the cause is content quality, not ranking. Open a content fix PR,
  NOT a ranking change.
- Never tune `SEARCH_ABANDON_WINDOW_MS` based on this chart alone.
  See `no-data-action-policy.md` for the constant-tuning gate.

**What NOT to do**:
- ❌ Do NOT change `SEARCH_ABANDON_WINDOW_MS` to "reduce false
  abandons" without 500+ events across ≥ 14 days.
- ❌ Do NOT re-weight ranking based on a single week. Same 2-week
  consecutive rule.
- ❌ Do NOT delete the abandon event because "the number is high".
  High abandon during cold-start is expected — the chart is a
  measurement, not a verdict.

---

## Chart 4 — Search result opened by position

**Purpose**: how good is ranking? Drives §6 of the weekly report
and playbook Q4.

**Setup steps**:
1. New chart → event: `search_result_opened`
2. Group by: `position`
3. Metric: **count**
4. Time range: last 7 days
5. Chart type: histogram (or bar with position 0, 1, 2, 3-4, 5-9, 10+)
6. Save as: `Phase 2C — Position distribution (7d)`

**Interpretation**:
- Position-0 share ≥ 70% = healthy. Top result is what users want.
- Top-3 share ≥ 90% = healthy.
- Long tail (significant count at position 10+) = top-1/top-3 are
  often wrong. Worth investigating which queries produced those
  high-position opens.

**False-positive warnings**:
- A user scrolling without intent can produce mid-list opens that
  inflate position 3-9 share. Cross-check against Chart 5: if these
  opens are mostly `japanese-*` types from a non-Japanese query,
  it's content-bleed, not navigation intent.
- Position resets to 0 on each new query. So a user who types
  `bao hiem`, scrolls, taps position 5, then types `health` and
  taps position 0 contributes BOTH samples — that's correct, not a
  bug.

**Action threshold**:
- Position-0 share drops below 50% for 2 consecutive weeks AND
  abandon count rises → ranking review per playbook §Q4. Concrete
  fixes: keyword adjustments on the queries that produced the
  mid-list opens, NOT a rewrite of `searchIndex.ts` ranking math.
- Long-tail position concentrations on specific queries become
  Phase 2C-prep batch candidates (one phrase per guide PR).

**What NOT to do**:
- ❌ Do NOT change ranking weights based on aggregate position
  distribution. Drive change by individual queries.
- ❌ Do NOT compress the position scale to hide a long tail.
- ❌ Do NOT chase position-0 share above 90% — too high suggests
  users never explore beyond top-1, which can mask wrong top-1.

---

## Chart 5 — Result type distribution

**Purpose**: which kinds of content earn opens? Drives §5 of the
weekly report (`result_type` column).

**Setup steps**:
1. New chart → event: `search_result_opened`
2. Group by: `result_type`
3. Metric: **count**
4. Time range: last 7 days
5. Chart type: pie or stacked bar
6. Save as: `Phase 2C — Result type distribution (7d)`

**Interpretation**:
- `guide` ≥ 70% = healthy. Guides are the main product surface.
- Sustained `daily-life` / `jobs` share = those tabs are earning
  their place in the index.
- High `japanese-dialogue` / `japanese-word` share for non-Japanese
  queries = language content is bleeding into administrative
  queries. This is a search-index normalization issue, not a
  ranking issue.

**False-positive warnings**:
- A single week with a Japanese-learning campaign or a TikTok spike
  can flip the distribution temporarily. Always compare to the
  prior week before concluding the index is broken.
- The `result_type` field on `search_result_opened` is a bounded
  enum — values outside the documented set should NOT appear. If
  they do, that's a typed-enum drift bug, not a content signal.

**Action threshold**:
- `guide` share < 50% for 2 consecutive weeks → search index is
  surfacing the wrong content for what users actually want.
  Investigate via the JAPANESE_WORDS normalization test in
  `analytics.test.ts` first.

**What NOT to do**:
- ❌ Do NOT remove a `result_type` from the index because its
  share is small — small share for an underused tab is expected,
  not a signal to delete.
- ❌ Do NOT pin keywords across types (e.g. add a `japanese-word`
  keyword to a `guide`) to balance the distribution.

---

## Chart 6 — Fallback recovery

**Purpose**: does the dead-end safety net work? Drives §7 of the
weekly report and playbook Q5.

**Setup steps**:
1. New chart → event: `fallback_guide_opened`
2. Group by: `guide_id`
3. Metric: **count**
4. Time range: last 7 days
5. Sort: count desc
6. Limit: top 20
7. Save as: `Phase 2C — Fallback recovery (7d)`

Add a derived metric next to it:
- **Fallback recovery rate** = `fallback_guide_opened` count
  ÷ `search_zero_results` count, expressed as a percentage.

**Interpretation**:
- Healthy ≥ 5%.
- Top-opened fallback guides = the real "evergreen safe defaults"
  for the user base. Worth keeping prominent.
- Rarely-opened featured guides may be miscalibrated for the
  current audience — rotate them in `getFeaturedGuides`.

**False-positive warnings**:
- The fallback layer also shows when query is empty (`search_empty`)
  but that path emits `guide_open { source: 'featured' }`, NOT
  `fallback_guide_opened`. So Chart 6 reflects **only** dead-end
  recoveries, not idle browsing of the featured list. This is
  exactly the question asked — keep the separation.

**Action threshold**:
- Recovery rate < 1% AND `search_zero_results` count > 100 for
  2 consecutive weeks → review the featured-guide selection. Possibly
  swap out 1-2 low-performers. Do NOT add new featured slots —
  6 is the cap.

**What NOT to do**:
- ❌ Do NOT promote a featured guide because it has high opens
  here — these are opens by users who hit a dead end. They are
  not a recommendation engine.
- ❌ Do NOT remove the fallback layer when recovery is low.
  Removing the dead-end safety net is worse than a low-recovery
  safety net.

---

## Chart 7 — Home layout variant

**Purpose**: who's using the searcher layout vs cold-start layout?
Drives §8 of the weekly report.

**Setup steps**:
1. New chart → event: `home_layout_variant`
2. Group by: `variant`
3. Metric: **count**
4. Time range: last 14 days (NOT 7 — the threshold needs longer
   horizon to settle)
5. Chart type: stacked area (daily) so you see the searcher %
   trending across the window
6. Save as: `Phase 2C — Home layout split (14d)`

**Interpretation**:
- Healthy band: searcher 10-30% of variants over the 14-day window.
- < 5% searcher → threshold (5 searches) may be too high → some
  active typers never flip. Investigate before any tune.
- > 50% searcher → threshold too low → casual users flipping into
  searcher layout when they didn't mean to.

**False-positive warnings**:
- The variant is decided at Home **focus**, not every render. So
  variant count ≠ user count; it's snapshot count. A user with
  3 sessions per day contributes ~3 samples per day.
- The signal increments AT MOST ONCE per SearchScreen visit (anti-
  spam ref in `SearchScreen.tsx`). Repeatedly typing in one visit
  does NOT inflate the counter.
- Fresh installs start at 0 → first 4 searches all see `cold_start`.
  This is correct, but biases the early-period distribution.

**Action threshold**:
- DO NOT change `SEARCHER_THRESHOLD` (currently 5) until:
  1. ≥ 14 days of data accumulated
  2. The same out-of-band split (< 5% or > 50%) appears in
     2 consecutive weekly reports
  3. The proposed new value is documented in
     `searcher-signal.ts` with the data screenshot in the PR body
- A `home_layout_variant` row of exactly `cold_start` and exactly
  `searcher` are the only two values that should appear. Anything
  else = bug.

**What NOT to do**:
- ❌ Do NOT tune `SEARCHER_THRESHOLD` based on one week of data.
- ❌ Do NOT add a third variant in Aptabase by hand — variants are
  emitted by the app, not configured in Aptabase.
- ❌ Do NOT decide the searcher layout "works" or "doesn't work"
  from this chart alone. Cross-reference with the conversion delta
  on `search_result_opened` for searcher-variant sessions if
  Aptabase supports the segmentation (it does not natively — this
  is a "carry forward to manual analysis" question).

---

## Cross-chart sanity checks (run each week before §4 of the report)

| Check | Expectation | If broken |
| --- | --- | --- |
| `search_query` count ≥ `search_zero_results` count | always | bug — zero-result fires without query |
| `search_result_opened` count ≤ `search_query` count | always | bug — result open without query |
| `fallback_guide_opened` count ≤ `search_zero_results` count | always | bug — fallback fires outside zero-result branch |
| `guide_open { source: external_share }` count | should be 0 | bug — reserved enum used |
| `guide_open { source: deep_link_placeholder }` count | should be 0 | bug — reserved enum used |
| `home_layout_variant` only values: `cold_start`, `searcher` | strict | bug — unbounded variant emitted |
| `search_result_opened.position` ≥ 0 and ≤ 50 | reasonable | unusually high position suggests bug |

Any broken check = open a bug fix PR **before** filling the rest of
the report. Bug data corrupts every downstream conclusion.

---

## When to revisit this checklist

- After 4 weeks of normal operation → review whether all 7 charts
  were actually consulted at each weekly review. Delete unused
  charts. Don't keep dashboards that produced no decision in 4
  cycles.
- After the first `SEARCHER_THRESHOLD` tune (whenever that lands) →
  refresh Chart 7's setup note to point at the new constant value.
- After any new analytics event ships → add a chart only if the
  weekly report template gains a new section that needs it. Do not
  add charts speculatively.

---

## Anti-anti-pattern: keep one source of truth

This doc is the canonical place for the **Phase 2C** chart setup.
The broader [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md)
covers v1.5.0/v1.5.1 charts (retention, save, share, source mix).
Do not duplicate Phase 2C chart setup into that doc. If a Phase 2C
chart needs to be referenced from another doc, link here.
