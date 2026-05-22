# Retrieval metric failure modes

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Scope**: every Phase 2C metric that a reviewer will see in Aptabase
or in a weekly retrieval report.

The premise: **numbers do not equal truth**. Each metric below has at
least one plausible interpretation that LOOKS correct from the chart
alone but would lead to a bad action if acted on. This doc names
those failure modes so the reviewer can refuse them before reaching
for a keyword PR.

Companions:
- [`docs/search-observability-phase-2c.md`](search-observability-phase-2c.md) — what the events actually fire on
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — the action gates this doc protects
- [`docs/dashboard-sanity-checks.md`](dashboard-sanity-checks.md) — pre-trust checks before applying this doc
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — the weekly review this doc supports

For every metric: read **"What it does NOT mean"** before forming an
opinion about a chart row.

---

## 1. `search_query`

### What it ACTUALLY means
A single fire records that the user typed a query, the typing went
quiet for 800 ms (`ANALYTICS_DEBOUNCE_MS`), the trimmed length is ≥
3 chars, the result list has rendered, and the screen is still
mounted and foregrounded.

### What it DOES NOT mean
- It does NOT mean a unique user. Aptabase aggregates anonymous
  sessions; the same person typing the same query in two visits
  counts twice.
- It does NOT mean an intent the user wanted to express. The user
  may have typed an interim phrase on the way to a different
  search. We only see the stable form, not the trajectory.
- It does NOT mean the query is "popular" in any market-research
  sense. With DAU < 100, a top query may be a handful of users
  repeating the same word, not a population-level demand signal.

### Common false interpretation
> "Top query `bao hiem` has 23 events this week — that's clear
> demand for a health-insurance push."

### Dangerous action
Adding more keywords to the health-insurance guide, or pinning
`bao hiem` as a featured chip on Home, because of one week's
top-of-list ranking.

### Safer interpretation
> "23 events of `bao hiem` from a 60-DAU base could be anywhere from
> 5 to 23 distinct users. The query already returns a relevant guide
> (verify in §5 of the weekly report). I'll watch whether it stays
> in the top 10 next week before acting."

### Minimum evidence required
- DAU ≥ 30 across the window AND
- Top-10 in 2 consecutive weekly reports AND
- Count ≥ 5 in each week AND
- A specific action exists that would not steal from other queries

---

## 2. `search_zero_results`

### What it ACTUALLY means
The result count for a trimmed, ≥ 3-char, debounce-stable query was
zero AND the SearchScreen was the path that fired (so
`fallback_shown` is `true`). Existing legacy `search_no_results`
also fires; the v1.5.2 version is the richer one.

### What it DOES NOT mean
- It does NOT mean the guide is missing. The keyword might be
  missing, the ranking might miss, or the user might be typing
  Japanese into a Vietnamese-only guide that simply doesn't have
  the Japanese term in `searchKeywords`.
- It does NOT mean the user actually wanted that exact phrase. It
  could be a typo, a partial query the user was about to refine,
  or a query they typed because the previous one returned too many
  results.
- It does NOT distinguish "I searched for `foo`" from "I searched
  for `foo`, gave up, then searched for `bar` 10 seconds later and
  found `foo`'s answer under `bar`". The user's recovery is
  invisible.

### Common false interpretation
> "`bao hiem suc khoe gia di` returned zero. Let's add `bao hiem
> suc khoe gia dinh` as a keyword to the health-insurance guide."

### Dangerous action
Adding a long phrase that's a TRUNCATED form of what the user
actually meant. The 24-char normalization caps `q` at 24
characters, so the row label is not the full intent. Acting on a
truncated label can pin the wrong phrase.

### Safer interpretation
> "Zero-result row `bao hiem suc khoe gia di` is the 24-char truncated
> form. The user's full query is unknown. Health-insurance guide
> already exists, so the bucket is A or D depending on the rest of
> the query. Carry forward; do not pin until 2-week confirmation."

### Minimum evidence required
- Same query (or close variant) in 2 consecutive weekly reports
- Bucketed A (content exists, ranking misses) NOT B (no content) —
  Bucket B goes to the content backlog, not a keyword PR
- The proposed keyword is at least 8 chars and unambiguous
- No truncation suspected — i.e. count > 1 AND multiple users imply
  the truncated form IS the real intent

---

## 3. `search_abandoned`

### What it ACTUALLY means
The abandon timer (`SEARCH_ABANDON_WINDOW_MS` = 10 s) elapsed after
the user's last keystroke for a query with ≥ 3 chars, no result was
opened, no further typing happened, and the screen remained mounted
and foregrounded.

### What it DOES NOT mean
- It does NOT mean "the user was frustrated". They might have been
  thinking, reading the top result, looking up a kanji externally,
  or stepping away from the phone.
- It does NOT mean "the search failed". A user who reads the top
  result, decides it answers their question without needing to
  open it, and switches apps will still abandon. Most "lookup"
  intents (a phone number, a date) need no tap.
- It does NOT mean "the ranking is wrong" when `result_count > 0`.
  See §3.5 below.
- It under-counts users who close the app entirely before 10 s
  (AppState listener cancels the timer). It over-counts users who
  cross-app to a dictionary / translator.

### Common false interpretation
> "Abandon rate is 35% this week — that's way above the 20% healthy
> threshold from `product-state-v1.5.2-prep.md` §7. Ranking is
> broken."

### Dangerous action
Re-weighting `searchIndex.ts` ranking based on aggregate abandon
rate, or shortening `SEARCH_ABANDON_WINDOW_MS` to "reduce false
abandons".

### Safer interpretation
> "35% abandon with DAU 40 means roughly 14 events. Of those, how
> many had `result_count > 0`? Cross-filter in Chart 3. If most
> were `result_count = 0`, that's a coverage gap (Bucket B), NOT
> a ranking failure. If most were `result_count > 0`, look at the
> specific queries — the right fix is content quality on those
> guides, not a global ranking change."

### Minimum evidence required
For ranking-related action:
- ≥ 2 consecutive weeks with the same abandon-prone queries
- Each query had `result_count > 0`
- Top-1 result for those queries IS clearly the wrong answer (manual
  verification, not chart-only)
- Count ≥ 5 per query per week

For tuning `SEARCH_ABANDON_WINDOW_MS`:
- ≥ 500 `search_abandoned` events across ≥ 14 days
- A specific distribution claim (e.g. > 30% in 0-3 s suggests too short)
- Per `no-data-action-policy.md` §4

---

## 3.5. `search_abandoned` with `result_count > 0` — the trap

This sub-case deserves its own warning. A `result_count > 0` abandon
LOOKS like the most actionable signal in Phase 2C — "user saw
results and rejected them". It is also the easiest to misread.

### What it does NOT mean
- The user did NOT necessarily see the result you think they saw.
  Position-0 result may have been off-screen on a small phone if
  the keyboard pushed it down — a layout artifact, not a content
  failure.
- The user did NOT necessarily reject the result. They may have
  found their answer in the SNIPPET (the result card shows title +
  snippet), so opening was unnecessary.
- "The user gave up" is one interpretation; "the user got their
  answer from the card" is another. The data cannot distinguish.

### Dangerous action
Adding new keywords to the top-1 guide so it "becomes more
relevant", when in fact the user already saw enough to satisfy
their intent in the result card.

### Safer interpretation
> "Pin this query for 2-week observation. If the same query abandons
> at `result_count > 0` for 2 weeks in a row AND the top-1 guide is
> manifestly wrong on inspection, open a single-phrase keyword PR
> for the RIGHT guide — not a content padding PR for the wrong one."

---

## 4. `search_result_opened.position`

### What it ACTUALLY means
The 0-indexed list slot of the result the user tapped, captured at
the moment the tap fires. Position resets to 0 for each new query.

### What it DOES NOT mean
- Position-0 dominance does NOT mean ranking is perfect. It can
  mean:
  - Position-0 is correct (good — but unprovable from this alone)
  - Position-0 is "good enough" and users don't bother scrolling
  - The top result has a familiar title that pulls a tap regardless
    of relevance (anchoring effect)
- A long-tail position distribution does NOT automatically mean
  ranking is bad. It can mean:
  - Users browse for context, not specific queries
  - The query is genuinely ambiguous (e.g. "thue") and multiple
    guides are legitimately relevant
  - The result list is short; position 5 of 6 is normal

### Common false interpretation
> "98% of opens are at position 0 — ranking is perfect."

### Dangerous action
Concluding the index does not need attention, OR conversely,
chasing position-0 share above 90% by aggressively pinning every
query to a top-1 guide. Both lead to a brittle index that breaks on
the next user vocabulary shift.

### Safer interpretation
> "Position-0 share ≥ 70% is the healthy target. Above 90% is
> suspicious — possibly users never explore past top-1 because the
> rest of the list looks weak. Mid-tail share (positions 3-9) IS a
> useful sign that the index produces a varied result page; it is
> not by itself a failure."

### Minimum evidence required
For ranking action on a specific query:
- Position concentration at 5+ for that exact query
- ≥ 2 consecutive weeks
- Manual confirmation that the higher-ranked guides are NOT the
  right answer
- Count ≥ 5 per query per week

For aggregate ranking concern:
- Position-0 share drops below 50% AND abandon rate climbs
- 2 consecutive weeks
- Drives investigation, not immediate change

---

## 5. `fallback_guide_opened`

### What it ACTUALLY means
The user reached the zero-result dead-end in SearchScreen AND
tapped one of the 6 featured guides shown there. Distinct from
`guide_open { source: 'featured' }` (which counts discovery from
the empty / Home featured rails).

### What it DOES NOT mean
- It does NOT mean the user got the answer they wanted. It means
  they got SOMETHING, possibly close, possibly off-topic, possibly
  just curious about the featured guide regardless of their query.
- It does NOT mean the featured selection is editorially perfect.
  Users may tap the first featured card by anchoring, not by
  relevance to their abandoned query.
- It does NOT mean the dead-end UX is "working" in any deep sense.
  A recovery rate of 5% means 95% of zero-result users left
  without engaging.

### Common false interpretation
> "Fallback recovery rate is 8% — the dead-end safety net is
> earning its place."

### Dangerous action
Treating the featured-guide selection as a recommendation engine
and pinning more guides into the featured rail because they
"performed well" as fallback opens. The fallback is a safety net,
not a discovery surface.

### Safer interpretation
> "Recovery rate of 8% on a base of 100 zero-results is 8 events.
> Useful signal that the layer exists and is not invisible. NOT a
> ranking signal for the featured guides themselves. Their
> performance under dead-end conditions is biased by the fact that
> the user was already lost."

### Minimum evidence required
For removing the fallback layer:
- NEVER. Removing the dead-end safety net is worse than a low-
  recovery safety net. Decline this proposal regardless of metrics.

For swapping featured guides:
- Recovery rate < 1% for 2 consecutive weeks
- `search_zero_results` volume > 100 in each week
- A specific guide is dragging the average (manual inspection of
  the per-guide breakdown)
- Replacement candidate exists with editorial justification, NOT
  selected because it looked good in another chart

---

## 6. `home_layout_variant`

### What it ACTUALLY means
At Home **focus** (NOT every render), the heuristic in
`searcherSignal.ts` reads the local counter, compares it to
`SEARCHER_THRESHOLD` = 5, and emits `cold_start` or `searcher`.

### What it DOES NOT mean
- It does NOT mean a count of users. A user with 3 sessions per
  day contributes ~3 samples per day. Aptabase aggregates events,
  not users.
- It does NOT mean "the searcher layout is working" if the
  searcher share is non-trivial. It means people crossed the
  threshold. Whether their downstream behavior actually improved
  on the searcher layout is a SEPARATE question (and one Phase 2C
  doesn't directly answer — needs cross-event analysis).
- It does NOT mean the threshold is right. A "healthy" 10-30%
  split could equally well indicate the threshold is too low (more
  people flip than should) or just right.

### Common false interpretation
> "Searcher share is 22% — the heuristic is well-calibrated. Let's
> ship more searcher-only features."

### Dangerous action
Building features that ONLY appear on the searcher variant,
locking out cold_start users who might have eventually crossed the
threshold. Worse: changing `SEARCHER_THRESHOLD` based on the
share without 14-day data.

### Safer interpretation
> "Variant split of 22% over 14 days tells us the heuristic
> activates for a minority of session-samples. It does NOT tell us
> whether the searcher variant is more useful. To answer THAT, we'd
> need a per-variant conversion comparison — and the bounded events
> can support that only as a manual cross-filter, not a built-in
> dashboard chart."

### Minimum evidence required
For declaring the heuristic "working":
- Variant split between 5% and 50% over 14 days
- Manual cross-filter of `search_result_opened` count per
  variant — searcher should match cold_start (NOT exceed it
  dramatically, which would indicate the threshold flipped the
  wrong people)

For tuning `SEARCHER_THRESHOLD`:
- ≥ 14 days data AND
- Variant split outside 5-50% range AND
- 2 consecutive weekly reports show the same pattern AND
- Per `no-data-action-policy.md` §4

---

## 7. `guide_open.source`

### What it ACTUALLY means
The discovery surface that produced a guide open. Bounded enum:
`direct`, `featured`, `search`, `related`, `recent_viewed`,
`start_here`, `quick_action`, `saved`, `external_share` (reserved,
0 expected), `deep_link_placeholder` (reserved, 0 expected).

### What it DOES NOT mean
- It does NOT mean any source is "better" than another. Each
  surface answers a different question. Sustained `direct` share
  is normal — users navigating from a notification, a deep link
  (when wired), or a fresh app open all count as direct in the
  current routing.
- It does NOT mean the user's actual journey. A user who opened
  via search, backed out, then opened via featured produces two
  events with different sources. The journey isn't visible.
- A drop in `featured` share does NOT mean the featured rail is
  broken — it could mean other sources got better.

### Common false interpretation
> "Direct opens are 65% of all guide opens — search is failing to
> earn its placement."

### Dangerous action
Moving the search CTA more prominently, removing competing
surfaces, or doubling down on Home redesign — all of which are
broader-than-warranted reactions to a single chart row.

### Safer interpretation
> "65% direct is high but normal in a low-DAU regime where most
> sessions are notification-driven or direct-link-driven. The
> question is whether search SHARE is rising or falling week-over-
> week, not what its absolute level is."

### Minimum evidence required
For action on a specific surface:
- 2 consecutive weekly reports showing a TREND (not a level)
- The drop is consistent with a hypothesis (e.g. "Home redesign
  the week before correlated with `featured` drop")
- The proposed fix is a copy / chip / link change, NOT a redesign

For action on a reserved value:
- `external_share` or `deep_link_placeholder` non-zero → BUG, act
  immediately. These should not fire in any released build.

---

## 8. Common cross-metric failure modes

### 8.1 "Demand AND failure" is not always "fix this"

A query that appears in BOTH top `search_query` AND top
`search_zero_results` looks like the obvious next keyword PR
target. But:

- It may be Bucket B (no matching content) — the right fix is a
  new guide, not a keyword. Adding a keyword to an adjacent guide
  trades zero-result for wrong-answer.
- It may be a coordinated typo (social media spike with a misspelled
  phrase). The right action is to wait, not to pin the typo.

Cross-reference manually before acting.

### 8.2 "Spike" is rarely actionable in week 1

A query that wasn't top-10 last week but is top-10 this week, with
count 12, is a MEDIUM signal. It could be:
- A real shift in user vocabulary
- A social-media-driven burst (e.g. a TikTok mentioning a specific
  word)
- A single power user typing the same phrase in 12 sessions
- A bot or test traffic

A week-1 spike is NOT a STRONG signal. Wait for week 2.

### 8.3 "Search-heavy users are confused users"

Some reviewers see high `search_query` rate per session and
conclude users can't find content via navigation, so search is
"compensating". Equally plausible interpretations:
- Users are power users who prefer typing
- Search is the most ergonomic surface for repeat lookups
- Navigation is good ENOUGH that exploration via search is a
  free choice, not a forced last-resort

Without a counterfactual ("would users still search if navigation
were better?") this is unanswerable from Phase 2C alone.

### 8.4 "Low fallback recovery means dead-end UX failed"

Healthy fallback recovery is 5%. Below 1% is a warning. But ANY
recovery rate is bounded by the fact that users at the dead-end
have already failed. A "failed" recovery rate of 0% could mean:
- The fallback selection is wrong (real signal)
- The user got their answer from a different app and never came
  back (false signal)
- The user gave up on the app entirely (real but unfixable from
  the dead-end)

A 0% recovery week with a small base (< 30 zero-results) is noise.

### 8.5 "Position concentration proves ranking"

A high position-0 share is consistent with both "ranking is great"
AND "users tap the first thing regardless of quality" (anchoring).
The data does not arbitrate.

If you ever need to know which it is, run the manual audit per
`docs/search-quality-audit-checklist.md`. Do NOT infer from the
position chart alone.

---

## 9. The decision sheet (one row per dangerous action)

Before opening any retrieval-related PR, the reviewer must check
that the action is NOT in this table.

| Dangerous action | What chart row tempts it | What to do instead |
| --- | --- | --- |
| Pin keyword from 1-week top `search_zero_results` | "Top failed query, count 7" | Wait for week 2. Refusal recorded in report §16. |
| Pin truncated 24-char query as keyword | "Top failed query with hyphen-cut tail" | Confirm full intent before pinning; reject if truncated form is plausibly multiple distinct queries |
| Re-weight `searchIndex.ts` based on abandon rate | "Abandon rate above 20%" | Investigate per-query top abandons; if STRONG, fix one query's keyword |
| Tune `SEARCH_ABANDON_WINDOW_MS` from one week | "Abandon distribution looks off" | Hold to 14-day / 500-event gate per `no-data-action-policy.md` §4 |
| Tune `SEARCHER_THRESHOLD` from one week | "Variant split feels wrong" | Hold to 14-day gate; observe |
| Remove fallback layer | "Recovery rate low" | NEVER. Safety net stays. |
| Pin featured guides based on `fallback_guide_opened` ranking | "This guide opens most when users hit dead-end" | Refuse — fallback isn't a recommendation engine |
| Build searcher-only feature | "22% of sessions are searcher variant" | Refuse — cold_start users would lose the feature without recourse |
| Conclude ranking perfect from position-0 dominance | "98% opens at position 0" | Manual audit per `docs/search-quality-audit-checklist.md` |
| Conclude search failed from `direct` share dominance | "65% direct opens" | Trend, not level; wait 2 weeks |
| Conclude users are confused from high `search_query` rate | "Lots of searches" | Counterfactual unknowable from this data alone |
| Add keyword from a spike that wasn't top last week | "New top-10 entry, count 12" | MEDIUM signal — observe week 2 |
| Act on `external_share` / `deep_link_placeholder` non-zero | "Reserved enum populated" | BUG — investigate immediately. NOT a feature signal. |

---

## 10. Minimum evidence cheat-sheet

If the reviewer is in a hurry, this row alone protects against the
most common overreaction:

> Open a keyword PR only when **(A) the same query appears in
> top-N for 2 consecutive weekly reports, (B) count ≥ 5 in each
> week, (C) DAU ≥ 30 in each window, AND (D) the existing top-1
> result is manifestly wrong on manual inspection.**
>
> Open a constant-tuning PR only when **(A) ≥ 14 days of data
> AND (B) ≥ 500 events of the relevant type AND (C) 2 consecutive
> reports show the same out-of-band pattern.**
>
> Open any other retrieval PR only when **the change is reversible
> in one PR AND has a written rollback plan in the PR body.**

Stick the cheat-sheet next to the dashboard. Re-read before clicking.

---

## 11. When to revisit this doc

- After every 2 weekly reports → add any new failure mode that
  appeared in the actual review (not in theory).
- After any keyword PR that turned out to be wrong → trace which
  failure mode was missed; add it here.
- After any constant tune → add the post-mortem reasoning.

The doc grows by experience, not by hypothesis. Theoretical failure
modes get added only if a reviewer can explain a SPECIFIC scenario
that would trigger them on this app's data.
