# Phase 2C — Search/discovery analytics review (data-driven)

**Run 2 weeks after the Phase 2B PR (#58) ships** — earlier than that and the sample size is too small to act on. Earlier than that and you'll fit to noise.

This doc is the playbook for turning the events we wired in Phase 2A/2B into decisions. It is intentionally short and rule-based — no judgment calls hidden behind "we'll see."

---

## Inputs (Aptabase dashboard queries)

All events documented in [`docs/analytics-events.md`](analytics-events.md). The 3 that matter for this review:

| Event | What it tells us |
| --- | --- |
| `search_query { q, q_length, result_count }` | Every search attempt — `q` is the normalized 24-char form |
| `search_no_results { q, q_length }` | Subset of above where `result_count === 0` — the failed queries |
| `guide_open { guide_id, category, source }` | Conversion — `source ∈ search / related / featured / direct` |

---

## Step 1 — Failed-query mining

**Query**: Top 50 `search_no_results.q` values by count, over the last 14 days.

For each entry, classify by hand into exactly one bucket:

| Bucket | Definition | Action |
| --- | --- | --- |
| A — keyword gap | Query matches a real guide topic but the guide's `searchKeywords` doesn't carry that form | Add the keyword to the matching guide |
| B — content gap | Query matches a topic we don't have a guide for | Log as a content-backlog candidate. Do NOT auto-create a guide |
| C — out of scope | Query is for something we'll never cover (job listings, dating, travel itinerary) | Ignore — these will always fail |
| D — typo | Query is a near-miss of a known guide title/keyword | Park until typo-tolerance decision (Step 5) |

**Rule**: only bucket A drives keyword edits. Buckets B/C/D do NOT trigger code changes in Phase 2C.

**Cap**: ship at most **15 keyword additions per guide** in a single PR, across at most **8 guides**. Keep diffs reviewable. Roll a second PR if more is justified.

---

## Step 2 — `guide_open.source` distribution

**Query**: count of `guide_open` events grouped by `source`, last 14 days.

Compute percentages. Read the table:

| Pattern | Reading | Action |
| --- | --- | --- |
| `direct` > 70% | Discovery surfaces aren't being seen / aren't useful | Investigate UX (Home placement, scroll depth) before tuning ranking |
| `search` > 30% | Search is doing real work | Tuning is high-leverage — proceed with Step 1 edits |
| `related` > 20% | Related-guides surface earns its keep | Consider exposing more (4 → 5 items, or row on Home) |
| `featured` > 15% | "Hay được dùng" carries weight | Consider rotation logic (currently static priority='high' list) |
| `featured` < 3% | Featured surface is dead weight | Reduce visibility OR re-curate the priority='high' list |

**Rule**: act on at most ONE of these levers per PR. Stacking changes makes attribution impossible.

---

## Step 3 — Synonym candidate rules

For each bucket-A failed query → matched guide pair, the keyword to add must satisfy ALL of:

1. **Length**: 3 to 24 normalized characters (matches the analytics truncation, avoids one-letter noise)
2. **Form**: at least one of romaji / VI no-diacritic / VI diacritic / JP. EN is allowed but de-prioritized
3. **Specificity**: the keyword should not match >5 OTHER guides when probed via `searchAppContent`. Generic words ("japan", "thủ tục") are banned — they over-broaden every guide they touch
4. **No PII**: keywords are content, never user data. If a failed query contains a name or address fragment, drop it entirely

Test the addition: run `searchAppContent('<new keyword>')` locally and confirm the target guide is in top-3.

---

## Step 4 — Overfitting warnings

Avoid these traps. They look like progress but corrode quality:

- ❌ **Adding a keyword to fix exactly one failed query**. If the same form didn't appear 3+ times in 14 days, it's noise. Wait for the next review window.
- ❌ **Adding generic keywords because "they could help"**. Generic = matches >5 guides = ranking gets blurrier, not sharper. Specificity beats coverage.
- ❌ **Adding 50 keywords to one guide because that guide is popular**. Keyword count and guide quality are orthogonal — past 15 keywords the marginal value is near zero and the index gets noisy.
- ❌ **Auto-generating keywords from `titleJp` / FAQ text**. We already index those via `searchText`. Adding them as keywords double-counts.
- ❌ **Treating `search_no_results` count as a vanity metric to drive down**. Some queries SHOULD fail (out-of-scope, typos). Aim for "all bucket-A failures fixed", not "0 no-results events".

---

## Step 5 — Typo tolerance decision

If after Step 1 the bucket-D (typo) failures still represent >15% of failed queries, then revisit typo tolerance. Until then: don't add Levenshtein. The complexity cost (every search becomes O(n × m) instead of O(n)) only pays off when the typo rate justifies it.

When/if it's worth doing:
- Restrict to single-token queries of length ≥ 4
- Edit distance = 1 only
- Apply ONLY to `nTitle` and `nKeywords` (not `nSearchText` — too noisy)
- Add `score *= 0.7` penalty so exact matches still win

This is Phase 2D, not 2C.

---

## Step 6 — Featured-guide rotation (only if Step 2 says featured < 3%)

Two options if "Hay được dùng" surface underperforms:

**Option A — re-curate**: review which `priority: 'high'` guides aren't drawing taps and demote them to `priority: 'normal'`. Promote 2-3 guides that have high `search → guide_open` conversion to `priority: 'high'`.

**Option B — rotate**: instead of static `priority: 'high'`, pick 6 from a pool of 12 high-priority guides on each app load, deterministic by date (so same user sees same set per day; different across days). Adds complexity but tests whether stale-vs-fresh is the issue.

Default = Option A. Try B only if A doesn't move the needle.

---

## Output of this review

One PR titled `feat(search): Phase 2C — analytics-driven tuning (<window>)`, with:

1. Markdown table of the top-N failed queries with bucket classification
2. The keyword additions (≤ 8 guides, ≤ 15 keywords each)
3. ONE distribution-driven UX change at most (from Step 2)
4. NO typo tolerance work unless Step 5 condition met

Test gates: `npm run typecheck`, `npm run verify:content`, `npm run test:ci`. Plus update `searchIndex.test.ts` with new ranking guarantees for any keyword whose effect we want pinned.

---

## What this review does NOT cover

- ❌ Content backlog (bucket B failures) — separate stream
- ❌ AI Mail / My Japan Plan / JLPT (out of scope)
- ❌ EAS build / version bump (release-prep doc covers that)
- ❌ Backend / remote content pipeline (architecture-level, not Phase 2C)
- ❌ Adding new analytics events (Phase 2A/2B are sufficient for this review)
