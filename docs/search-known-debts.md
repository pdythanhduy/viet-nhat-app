# Known search debts — intentionally accepted

**Date**: 2026-05-22
**Owner**: pdythanhduy
**Scope**: search and retrieval functionality across the app
(SearchScreen, `searchIndex.ts`, `searcherSignal.ts`, abandon
heuristic, Phase 2C observability).

A "known debt" here is **a capability we have explicitly chosen
NOT to build** — not a bug, not a backlog item, not a TODO. Each
entry below has been considered, rejected for now, and the rejection
is the design decision.

The point of this registry: when a future reviewer (or a future
session of myself) thinks "we should add X to search", they should
find X here with the explicit reasoning for why it isn't built, and
the signal that would justify reconsidering.

Companions:
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — when any of these debts can be reconsidered
- [`docs/retrieval-metric-failure-modes.md`](retrieval-metric-failure-modes.md) — how the absence of these capabilities affects metric interpretation
- [`docs/search-quality-audit-checklist.md`](search-quality-audit-checklist.md) — the audit that would surface need for them
- [`docs/product-state-v1.5.2-prep.md`](product-state-v1.5.2-prep.md) §1 — hard refusal table this list refines

---

## Format

Each debt has four fields:

- **Why not now** — the explicit reason it isn't built
- **Risk it avoids** — what bad outcome staying small protects against
- **Signal required before reconsideration** — what would need to be true to merit a fresh discussion
- **First-cut alternative if reconsidered** — the smallest plausible build, not the dream build

If reconsidered, the FIRST PR must implement the first-cut
alternative, not a larger feature. Larger work follows separate
review.

---

## 1. No typo correction

The current search index treats `kokumin hoken` and `koumin hoken`
as different queries. There is no Levenshtein-distance fallback, no
fuzzy match layer, no autocorrect.

**Why not now**
- Typo correction is a feature most users don't need: well-typed
  queries already find the right guide.
- Typo correction biases the index toward whatever it thinks is
  the "right" spelling — a strong, often-wrong opinion.
- Implementation requires either a runtime fuzzy-match library
  (new dependency) or a custom edit-distance check (perf cost at
  every query).
- The fallback layer + suggestion chips already mitigate
  catastrophic dead-ends without surfacing wrong content.

**Risk it avoids**
- "Helpful" typo correction that surfaces the wrong guide for an
  on-purpose Japanese term the user typed deliberately.
- A new dependency for a single edge case.
- Hidden ranking bias — the index decides what "looked like" the
  intent, taking decisions away from the user.

**Signal required before reconsideration**
- ≥ 4 weekly retrieval reports show a SPECIFIC repeated typo
  pattern (same misspelling, multiple users, multiple weeks)
- AND the typo pattern is NOT a Bucket-D generic word
- AND the missed guide is a high-priority admin task (not
  Japanese-learning content)
- AND a manual search-quality audit confirms the failure mode

**First-cut alternative if reconsidered**
- Add the specific misspelling to the ONE affected guide's
  `searchKeywords`. ONE phrase. ONE guide. No engine.
- Only if the misspelling recurs across ≥ 3 guides → consider a
  per-guide alias list (still no engine; just data).

---

## 2. No semantic search

The current index is keyword-match only. It does not understand
that "where do I file my taxes" and "kakutei shinkoku" describe the
same intent.

**Why not now**
- Semantic search requires an embedding model. Either runtime
  (new dependency, large bundle, slow on low-end devices) or
  pre-computed (build-time cost, drifts whenever content changes).
- The cost of a wrong semantic match is much higher than a missed
  match — surfaces look authoritative but lead to wrong content.
- The bilingual nature of the content (Vietnamese + Japanese)
  multiplies embedding ambiguity.
- Per `product-state-v1.5.2-prep.md` §1, AI integration of any
  kind is a hard refusal.

**Risk it avoids**
- Black-box ranking — "the model said so" is not a reviewable
  decision.
- Drift over content updates — semantic matches change silently
  when guides change.
- Compute / battery / bundle cost on low-end Android devices we
  will eventually serve.
- AI scope creep — once embeddings exist, every PR is a "while
  we're here" temptation.

**Signal required before reconsideration**
- Hard refusal of AI is lifted at a higher level (not by a single
  reviewer)
- AND ≥ 12 weekly reports demonstrate that keyword-match coverage
  is hitting a ceiling (≥ 30% zero-result rate sustained)
- AND audit confirms that the failures are SEMANTIC, not lexical
  (i.e., users are using words the index doesn't recognize, not
  misspellings)

**First-cut alternative if reconsidered**
- Hand-curated synonym entries per guide — still keyword-match,
  still inspectable. NOT an embedding model.
- See [Debt 8 (synonym engine)](#8-no-synonym-engine) below — they
  reinforce each other.

---

## 3. No decay on the searcher signal

`searcherSignal` is monotonically increasing. Once a user crosses
the threshold (5 searches), they stay in `searcher` variant
forever (until uninstall).

**Why not now**
- A user who searched 5 times last month and hasn't opened the app
  in 3 weeks is still a "searcher" by the current logic. This is
  a known imprecision.
- Implementing decay requires a timestamp, OR a decaying counter,
  OR a sliding-window structure. Each adds storage complexity.
- Without production data, we don't know if decay would help or
  just add jitter to a stable signal.
- The current binary heuristic is testable; a decay would not be
  (state depends on time, which is hard to fake-test cleanly).

**Risk it avoids**
- Layout flapping — a user who flips between cold_start and
  searcher across sessions has a worse experience than one who
  stays in either.
- False precision — decay rates have parameters; parameters need
  tuning; tuning needs data; data we don't have.
- Storage growth or timestamp drift on devices that don't sync
  their clocks.

**Signal required before reconsideration**
- ≥ 14 days of `home_layout_variant` data
- AND the searcher share > 50% on average — indicating the
  monotone counter has saturated for too many users
- AND audit confirms that some searcher-variant users would
  benefit from a return to cold_start (e.g., their behavior has
  shifted away from search)

**First-cut alternative if reconsidered**
- Cap the counter at 20 (so it can't grow unbounded), reset to 0
  on app uninstall. Still no decay. Just a ceiling.
- If still insufficient: a 30-day "last search" timestamp; if
  expired, decrement by 1. Single param, still inspectable.

---

## 4. No chained-search understanding

We do not track or analyze multi-query journeys. The events fire
independently — `search_query` doesn't carry a session ID linking it
to the prior or next query.

**Why not now**
- Session-level analysis requires a session ID, which is a privacy
  surface expansion. Aptabase does provide an anonymous rotating
  session ID, but we don't use it.
- "User searched X, didn't find, then searched Y, did find" is
  interesting but not actionable — the right fix is usually to
  improve X's match (visible from zero-result aggregates), not to
  track the journey.
- The dashboard alternative — top zero-results AND top searches —
  already surfaces the same problem from aggregate angles.

**Risk it avoids**
- Per-user behavior pages (which the privacy posture refuses).
- The temptation to "follow up" with users whose journey looked
  unsuccessful — a UX intervention we cannot deliver without push
  notifications (which are gated).
- Re-identification — even rotating session IDs become
  identifiable when joined with sparse data.

**Signal required before reconsideration**
- Aggregate analysis has hit a clear ceiling — multiple weekly
  reports cannot identify the failure mode of a known user
  problem.
- The proposed implementation does NOT introduce per-user IDs;
  it joins events only by anonymous session ID with a strict
  time window (e.g., 5 minutes).
- Privacy review confirms the new analysis stays within current
  privacy posture.

**First-cut alternative if reconsidered**
- Add a `previous_query_was_zero_result: boolean` property to
  `search_query` if (and only if) the user's last search in the
  same screen mount returned zero. No session ID, no IDs of any
  kind — just one bit. Tells us "this query came after a fail".
- If insufficient: a `query_sequence_index` integer (0, 1, 2…)
  scoped to the SearchScreen mount, NOT to the user.

---

## 5. No multilingual morphology

The index does not do stemming, conjugation, or particle
stripping. `bao hiem` matches `bao hiem`, not `bảo hiểm`'s plural
form or any inflected variant. Similarly, Japanese verbs in
keywords are not stem-normalized.

**Why not now**
- Vietnamese has limited morphology; the diacritic-strip in
  `normalizeQueryForAnalytics` handles the most common variation.
- Japanese morphology requires a morphological analyzer (MeCab or
  similar) — substantial dependency, large data files, slow on
  device.
- The content itself is curated; keyword variants can be added
  per-guide where they matter, without a runtime engine.

**Risk it avoids**
- A heavy analyzer dependency for the rare case where it would
  help.
- Wrong stem matches — Japanese morphology has many irregularities
  the analyzer would miss, surfacing wrong content with high
  confidence.
- Bundle size growth.

**Signal required before reconsideration**
- ≥ 4 audits show recurring failures specifically attributable to
  morphology (NOT to keyword absence)
- AND the affected vocabulary clusters around high-priority guides
- AND the proposed fix is data-driven (per-guide alias rows), not
  engine-driven

**First-cut alternative if reconsidered**
- Per-guide alias lists for the top-5 morphology-prone terms.
  Hand-curated. Still keyword-match.
- An engine is NOT the first cut. Never.

---

## 6. No personalization

The search ranking does not adapt to the individual user. Two users
with very different histories see the same result list for the
same query.

**Why not now**
- Personalization requires either tracked history (privacy surface)
  or per-user ranking models (storage + compute).
- The user base is small and diverse — early personalization would
  fit noise, not signal.
- The bookmarked-guides and recent-views surfaces already deliver
  per-user content without modifying ranking.

**Risk it avoids**
- Per-user behavior persistence that violates the privacy posture.
- Filter bubbles — personalization makes it harder for users to
  discover content outside their history.
- A new layer of "why did I see this?" debugging that the
  inspectable keyword index avoids.

**Signal required before reconsideration**
- A clear class of users with a specific need that aggregate
  ranking cannot serve (e.g., long-term residents need
  different content than first-week arrivals)
- AND a non-PII signal already exists to segment them (e.g., app
  age in days)
- AND user research (not just analytics) confirms the personalization
  would help

**First-cut alternative if reconsidered**
- A simple segment-based variant: e.g., users in their first 30
  days see a slightly different `featured` list than longer-term
  users. Computed locally from `app_install_timestamp` (which we
  already have).
- NO change to search ranking math. Featured rail only.

---

## 7. No recency ranking

The search index does not weight recently-updated content higher.
A guide updated yesterday and a guide updated last year tie on
ranking if their keyword scores match.

**Why not now**
- "Recency" is a noisy signal — frequent micro-updates inflate
  it; rare deep-rewrites lose to it.
- The content itself has a `lastVerified` field that conveys
  freshness to the user via the guide UI; the ranking doesn't
  need to surface it.
- Implementing recency requires ranking weight changes (which
  are gated by `no-data-action-policy.md` §4) plus a `lastVerified`
  → score mapping which would need its own tuning.

**Risk it avoids**
- Newly-edited guides outranking older but more authoritative
  guides on the same topic.
- Pressure to bump `lastVerified` for ranking benefit (which is
  explicitly forbidden by content governance).
- An additional ranking parameter to maintain.

**Signal required before reconsideration**
- ≥ 4 weekly reports show that users are landing on outdated
  guides despite a newer version existing for the same topic
- AND the audit confirms the failure is recency-related, NOT
  keyword coverage
- AND the proposed recency math is bounded (e.g., max 10% score
  boost for guides updated in the last 30 days — not a runaway
  exponential)

**First-cut alternative if reconsidered**
- A small fixed boost for guides with `lastVerified` in the
  current calendar year. Inspectable; one constant. NOT a smooth
  decay function.

---

## 8. No synonym engine

There is no central synonym map that says "kokumin hoken" ≈
"health insurance" ≈ "bao hiem suc khoe". Each guide carries its
own keyword variants in `searchKeywords`, and the variants are
duplicated per-guide where needed.

**Why not now**
- A central synonym map is a powerful tool with one major failure
  mode: any wrong synonym pollutes every guide that mentions
  either side of the pair.
- Per-guide keyword duplication is more verbose but easier to
  reason about — each guide controls its own discoverability.
- The current pinned-test approach (`searchIndex.test.ts`) checks
  per-query expectations; a synonym engine would require a new
  test paradigm.

**Risk it avoids**
- Cross-guide ranking collisions ("nenkin" matches both pension
  and ¥-related insurance guides → wrong top-1 on either).
- A new layer where ranking decisions hide ("the synonym did it").
- Maintenance burden of a growing synonym list with no obvious
  retirement mechanism.

**Signal required before reconsideration**
- ≥ 6 weekly reports show that the SAME term cluster (e.g.,
  health-insurance terminology) needs the SAME 3+ keywords
  duplicated across 3+ guides
- AND audits confirm this is causing maintenance pain (NOT just
  feeling redundant)
- AND the proposed synonym map has an explicit retirement /
  testing plan

**First-cut alternative if reconsidered**
- A SMALL synonym map — maximum 20 entries, all hand-curated, each
  with a per-entry test in `searchIndex.test.ts`.
- NOT a generated list. NOT an embedding-derived list.

---

## 9. No live search index rebuild

The search index is built once at app start and immutable until
the next app restart. There is no incremental index update during
runtime (because there's no runtime content update).

**Why not now**
- All content is static, committed to the repo, and shipped with
  the binary. There IS no runtime content delivery.
- Building an incremental index for content that never changes
  would be infrastructure for a feature that doesn't exist.

**Risk it avoids**
- A premature CMS integration.
- A whole class of "is the index fresh?" bugs.

**Signal required before reconsideration**
- A content-delivery system has been built (separate decision)
- AND the in-app content actually changes between app restarts
- AND users would be measurably affected by stale ranking

**First-cut alternative if reconsidered**
- Rebuild the index on `app_open` if a delivered-content
  fingerprint has changed. NOT during the user's session.

---

## 10. No query suggestion expansion

The `SEARCH_SUGGESTIONS` chip list is 6 hand-curated phrases. We
do not auto-expand from a query history, top-search history, or
related-guide list.

**Why not now**
- The 6 chips are guaranteed by tests to return at least one hit,
  so they cannot disappoint a user.
- Auto-expansion from query history requires storing per-user
  history (privacy surface) or globally-aggregated top queries
  (which would need a backend or a baked-in snapshot).
- Curated chips reinforce the index's strongest guarantees —
  exactly what's needed in a cold start.

**Risk it avoids**
- Surfacing user-specific queries (privacy regression).
- Surfacing aggregate top queries that may already be problematic
  (Bucket-D noise, ambiguity).
- Suggesting queries the index cannot satisfy reliably.

**Signal required before reconsideration**
- Cold-start UX has been audited and the 6 chips are
  insufficient (e.g., they miss a major user vocabulary cluster)
- AND a non-PII source of expansion candidates exists
- AND each candidate has a test guarantee for non-empty results

**First-cut alternative if reconsidered**
- Expand to 8-10 chips. Hand-curated. Test-pinned.
- NOT a learned list. NOT a history-driven list.

---

## 11. Not a debt — explicitly NOT in scope

The following are NOT search debts; they are out-of-scope items
that should NEVER be reconsidered as a "search improvement":

- **AI / LLM-based search** — broader product refusal, see `product-state-v1.5.2-prep.md` §1.
- **Voice search** — out of product scope; no voice surface anywhere in the app.
- **Image search / barcode lookup** — out of scope; not a content-delivery feature.
- **Multi-app federated search** — would require backend; refused.
- **Result personalization based on location** — would require location permission, which the app doesn't request.
- **"Did you mean" prompts** — wraps typo correction in UI; same refusal as Debt 1.
- **Search-result advertising / sponsored placement** — refused at a product-identity level.

These are NEVER reconsidered as part of the retrieval loop. If
proposed, decline pointing at this section.

---

## 12. Process — how to add a new debt

If a future PR considers and rejects a search capability:

1. Open a new section in this doc with the four required fields.
2. Cite the PR (or weekly report) that triggered the discussion.
3. Add a one-line entry to the table of contents at the top of
   this doc (not yet present — first section to add such a TOC).
4. Link from `product-state-v1.5.2-prep.md` if the debt is large
   enough to warrant top-level mention.

A debt added in a PR must be REVIEWED in that PR (not just
declared). Reviewers should sanity-check the "Signal required"
field — it's the trigger for reconsideration, so it shouldn't be
either too easy (debt re-opens on noise) or too hard (debt is
effectively un-reconsiderable).

---

## 13. Process — how to retire a debt

If conditions for reconsidering are met:

1. Open a discussion PR — NOT a feature PR. The PR proposes the
   "first-cut alternative" with explicit signal evidence.
2. Cite the matching weekly reports and audits.
3. If accepted, update this doc to mark the debt as RETIRED with
   the date and the PR link. DO NOT delete the entry — keep the
   audit trail.
4. The actual implementation is a SEPARATE PR.

A retired debt that comes back later is normal; the audit trail
makes the round-trip visible.

---

## 14. Quick reference card

```
Before proposing any new search capability:
  [ ] Check this doc — is the capability already a known debt?
  [ ] If yes, does the "Signal required" condition currently hold?
  [ ] If no, does the proposal fit "Not in scope" (§11)?
  [ ] If neither, the proposal is genuinely new — add to this doc
      after the design discussion lands.

When asked "why doesn't search do X":
  - This doc is the answer.
  - Default response: "It's a known debt; here's the reason."
```
