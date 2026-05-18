# Phase 2A — Search + Discovery Audit & Implementation

**Date**: 2026-05-18
**Branch**: `feat/search-discovery-phase1`
**Scope**: incremental improvement of in-app search ranking + add lightweight related-guides + featured-guides + analytics scaffolding. No UI redesign, no new dependency, no new screen.

> Phase 1 built the library (45/45 admin guides). Phase 2A makes users FIND the right guide first.

---

## 1. Audit — current search surface (pre-Phase 2A)

### 1.1 Files in scope

| File | Role |
| --- | --- |
| `src/utils/searchIndex.ts` | Cross-content index + scorer. Powers `SearchScreen`. |
| `src/utils/adminGuideSearch.ts` | Admin-guide-only helper used by the guide list filter (separate from global search). |
| `src/utils/adminQuickSearch.ts` | Curated chips shown on Home / admin landing. |
| `src/screens/SearchScreen.tsx` | UI surface (input box, suggestion chips, results list). |
| `src/utils/analytics.ts` | `logSearchPerformed` was a no-op. |

### 1.2 Pre-existing ranking model

`scoreResult(q, entry)` summed:

| Match location | Weight |
| --- | --- |
| `nTitle === q` | 120 |
| `nTitle.startsWith(q)` | 80 |
| `nTitle.includes(q)` | 45 |
| `nSubtitle.includes(q)` | 20 |
| `nSnippet.includes(q)` | 12 |
| `nSearchText.includes(q)` | 8 |

- `nSearchText` was a big blob containing `titleJp`, `searchKeywords`, FAQ, checklist labels, etc. — all collapsed into a single `+8` bucket.
- No special treatment for Japanese-form (`titleJp`) matches → the JP form was indistinguishable from body text.
- `priority: 'high'` field on `AdminGuide` (42 of 127 guides) was completely ignored.
- No related-guides API.

### 1.3 Empirical ranking issues (probed at audit time)

Probed via temporary jest test against `searchAppContent(query, 5)`. Top-1 result shown:

| Query | Pre-Phase-2A top-1 | Issue |
| --- | --- | --- |
| `zairyu card` | "Cập nhật chính sách Nhật 2026" | Generic policy update beat the residence-card validity guide. |
| `quá hạn visa` | "Du học Nhật" | Student visa guide beat the overstay guide. |
| `rikon` | "Đổi thông tin trên thẻ cư trú" | Residence-card-info-change beat the actual divorce guide. |
| `overstay` | (correct) Overstay guide | But #2 was "Bạo lực gia đình (DV)" — tangential. |
| `pension` | "Checklist về nước" | The 年金 / nenkin guide ranked below. |
| `visa` | "Visa bị từ chối và cách kháng cáo" | Rejection-appeal beat the general visa entry guides. |

Working correctly even before Phase 2A:
`thẻ cư trú`, `vinh tru` / `vĩnh trú` / `永住`, `離婚`, `ly hon`, `juminzei`, `kaiko`, `nenkin`, `tai nan giao thong`.

### 1.4 Typo tolerance, romaji, VI no-diacritic

- **Typo tolerance**: none. No Levenshtein / fuzzy. Out of scope for Phase 2A (would need a token index).
- **Romaji**: works because `searchKeywords` includes romaji forms (`zairyu`, `kaiko`, `juminzei`). The signal was just too weak.
- **VI no-diacritic vs diacritic**: identical results (`normalizeText` strips diacritics + `đ→d`). Working as designed.
- **EN fallback**: works for guides whose `searchKeywords` include English (e.g., `card validity`, `visa renewal`).

### 1.5 Empty-state behavior

`SearchScreen` renders 6 chips when the query is empty (`SEARCH_SUGGESTIONS`), guarded by `searchSuggestions.test.ts`. No change in Phase 2A.

### 1.6 Related-guide discoverability

**None.** A user opening `overstaying-illegal-stay-procedures` saw no "related guides" surface — no path back to `gia hạn visa`, `tái nhập cảnh`, `houterasu legal aid`, etc. This was the single biggest discovery gap.

---

## 2. Phase 2A changes

### 2.1 Ranking — layered scoring in `searchIndex.ts`

`NormalizedEntry` now carries `nTitleJp`, `nKeywords[]`, `priority`, and `category` as first-class fields instead of folding them into a single `nSearchText` blob.

New `scoreResult` weights:

| Match location | Weight |
| --- | --- |
| `nTitle === q` **or** `nTitleJp === q` | 120 |
| `nTitle.startsWith(q)` **or** `nTitleJp.startsWith(q)` | 80 |
| `nTitleJp.includes(q)` | **60** (new — was bundled into +8) |
| `nKeywords` exact | **50** (new) |
| `nTitle.includes(q)` | 45 |
| `nKeywords` substring | **35** (new) |
| `nSubtitle.includes(q)` | 20 |
| `nSnippet.includes(q)` | 12 |
| `nSearchText.includes(q)` | 8 |
| `priority === 'high'` bonus | **+6** (new — only added if any other rule matched) |

Intent of the user's priority order (`exact JP > romaji > VI no-diacritic > VI diacritic > EN fallback`) is encoded by **which field the match lands in**, not by the query string itself (the normalizer collapses VI ASCII == VI diacritic, so the only meaningful dimension at query time is the field). JP `titleJp` is the unambiguous identifier → strongest weight. Romaji + aliases sit in `keywords` → middle. Body text is fallback.

### 2.2 Before/after — same probe queries

| Query | Before | After |
| --- | --- | --- |
| `visa` | Visa rejection appeal | **Visa du lịch / thăm thân ngắn hạn** |
| `zairyu card` | Cập nhật chính sách Nhật 2026 | **Gia hạn hiệu lực thẻ cư trú** |
| `在留カード` | (correct) 特定在留カード — #2 was Embassy | (correct) 特定在留カード — **#2 now Gia hạn thẻ cư trú** |
| `quá hạn visa` | Du học Nhật | **Overstay / Không hợp pháp** |
| `rikon` | Đổi thông tin trên thẻ cư trú | **Ly hôn, nuôi con và giấy tờ cư trú** |
| `pension` | Checklist về nước | (correct) **#2 năm kim guide** — top-1 still tangential, see §4 |

Tests for these guarantees: `src/utils/searchIndex.test.ts → phase 2A ranking`.

### 2.3 Related-guides API

`getRelatedGuides(guideId, limit = 3)` — pure-function lookup over the normalized index. Scoring per candidate guide:

- Same `category` → +5
- Each shared token (length ≥ 3) between source + candidate `keywords` ∪ tokenized titles → +2
- `priority === 'high'` candidate with score > 0 → +1

Threshold of 5 ensures we never surface a totally unrelated guide. Capped at `limit`. Empty array on unknown id.

Probe results:

- `overstaying-illegal-stay-procedures` → `gia-han-visa`, `re-entry`, `visa-rejection-appeal-process`, `visa-emergency-medical-disaster-extension`, `permission-activity-outside-status` ✅
- `residence-card-validity` → `gia-han-visa`, `specific-residence-card-my-number-2026`, `lost-residence-card`, `residence-card-info-change`, `re-entry` ✅

API ready to render on `AdminDetailScreen` in a future PR (Phase 2B). **Not wired into UI in this PR** — keeps the surface minimal as requested.

### 2.4 Featured guides

`getFeaturedGuides(limit = 20)` — returns admin guides with `priority: 'high'`, sorted by title for stable rendering. 42 guides qualify.

`scoreResult` already applies a +6 boost to `priority: 'high'` hits, so the featured-ness is reflected in normal search results without needing a new UI surface.

### 2.5 Analytics scaffolding

`logSearchPerformed(query, resultCount)` is no longer a no-op. It forwards two typed events via `track()`:

| Event | Payload |
| --- | --- |
| `search_query` | `{ q, q_length, result_count }` |
| `search_no_results` | `{ q, q_length }` (fires only when `result_count === 0`) |

**PII handling**: `q` is `normalizeText(query).slice(0, 24)` — ASCII-only, lowercased, no diacritics. Names/addresses typed mid-stream get truncated; aggregation across thousands of queries surfaces popular keywords without storing raw user input. Mirrors the privacy posture already in `docs/analytics-events.md`.

### 2.6 What did NOT change

- ❌ No new UI surface (no related-guides card, no featured carousel, no new screen)
- ❌ No new dependency
- ❌ No content edits to admin guides
- ❌ `SEARCH_SUGGESTIONS` chips unchanged (still guarded by `searchSuggestions.test.ts`)
- ❌ `adminGuideSearch.ts` and `adminQuickSearch.ts` untouched
- ❌ No tokenization for multi-word queries (kept full-string includes — fuzzy tokenization is Phase 2B if data justifies it)
- ❌ No typo tolerance / Levenshtein
- ❌ No My Japan Plan / JLPT / AI Mail surface touched

---

## 3. Test results

- `npx jest src/utils/searchIndex.test.ts` → **13/13 pass**
- `npx jest` (full) → **306/306 pass, 48 suites**
- `npx tsc --noEmit` → clean
- Probe queries (20 cases) manually verified

New tests added (`searchIndex.test.ts`):
- JP-form query lands the JP-titled guide first
- `zairyu card` surfaces residence-card-validity above policy update
- `rikon` surfaces the divorce guide
- `quá hạn visa` surfaces the overstay guide
- `getRelatedGuides` returns same-category neighbours
- `getRelatedGuides` returns `[]` for unknown ids
- `getRelatedGuides` honours `limit`
- `getFeaturedGuides` returns only `type: 'guide'` entries

---

## 4. Risks & open questions

**Risk: ranking regression for queries not in the probe set.**
Mitigation: all 4 prior `searchIndex.test.ts` cases still pass + 9 new cases pin the deltas we care about. If a regression surfaces post-merge, the +6 priority boost is the most likely lever — it can be lowered to +3 or removed without touching anything else.

**Risk: `pension` top-1 is still a tangential hit (My Number Card guide).**
The 年金 / nenkin guide is now #2, which is acceptable. The MyNumberCard guide legitimately mentions `pension card` in its body. Fixing would require either tokenization or a tighter pension-specific keyword on the nenkin guide. Deferred — not worth widening this PR.

**Risk: analytics `q` field could still expose unusual user input.**
24-char truncation + ASCII-only normalization is the same posture we already use for other events. If a privacy review later asks for stricter handling, we can swap to length-bucket only (e.g., `q_length ∈ {short, medium, long}`) with one edit. **`docs/analytics-events.md` should be updated separately** to document the two new events — left to a follow-up to keep this PR scope tight.

**Risk: `getRelatedGuides` returns `[]` for guides with very sparse keywords.**
By design — better than surfacing irrelevant guides. The threshold of 5 means at minimum either same-category OR ≥3 shared tokens is required.

---

## 5. Recommended next phases

**Phase 2B (UI wiring, when ready)**:

1. Render `getRelatedGuides(guide.id)` on `AdminDetailScreen` as a small card list near the bottom.
2. Render `getFeaturedGuides()` on Home / SearchScreen empty state as a second row of chips (or replace the static 6 if data shows the curated ones convert better).
3. Add `source: 'home' | 'search' | 'related'` to the `guide_open` event to measure related-guide click-through.

**Phase 2C (data-driven, requires 2-4 weeks of analytics)**:

1. Once `search_no_results` events accumulate, pick the top 20 failed queries → add to the relevant guide's `searchKeywords`.
2. If multi-word queries dominate failed searches, add tokenization to `scoreResult` (split query on whitespace; require all tokens to land somewhere).
3. If JP / romaji queries dominate, consider exposing romaji versions of `titleJp` automatically.

**Phase 2D (still hypothetical, only if 2B/2C don't move the needle)**:

1. Fuzzy / typo tolerance via Levenshtein-1 for single tokens.
2. Section-level deep links from search results (e.g., search → jump to FAQ #3 inside a guide).

---

## 6. Files changed

```
src/utils/searchIndex.ts                +112 / -10   (rewrite scorer, add getRelatedGuides, getFeaturedGuides)
src/utils/searchIndex.test.ts           +52  / -0    (Phase 2A guarantees + related/featured tests)
src/utils/analytics.ts                  +28  / -1    (search_query / search_no_results events + normalizer)
docs/search-discovery-phase2a-audit.md  +new
```

Zero content / schema edits. Pure utility layer + test layer + doc.
