# Technical debt review — 2026-05-18

**Status**: review only. NO refactoring in v1.5.0.
**Owner**: pdythanhduy.

This is a debt map — what to fix and when, not now. The repo is shippable today; this doc protects future velocity.

---

## Risk-level legend

- **High** — actively slowing development OR a known bug magnet
- **Medium** — readable today, will hurt within 3-6 months
- **Low** — minor smell, fix opportunistically

---

## 1. AdminDetailScreen.tsx (2202 LOC, 0 useMemo/useCallback)

**Risk**: Medium → High in 6 months.

**Why it's a problem**:
- Largest file by 2x
- 0 memoization despite 6+ state hooks (`expandedStep`, `expandedFaqIndex`, `bookmarked`, `checkedChecklistItems`, `exportingGuide`, `selectedFormJurisdiction`)
- Mixes data fetching, bookmark logic, checklist persistence, export flow, official-form jurisdiction filter, FAQ accordion, and rendering — all in one component function
- Every new section (e.g., "Related guides" wired in Phase 2B, or a hypothetical Phase 2B-2 "Notes" feature) extends this monster

**Split strategy** (when we do it):

```
src/screens/admin-detail/
  AdminDetailScreen.tsx        ← orchestrator (state hooks, navigation, data fetching). <300 LOC
  AdminDetailHeader.tsx        ← guide JP title + VI title + category badge + bookmark/export buttons
  AdminDetailMeta.tsx          ← lastVerified + jurisdiction + risk level + estimated time
  AdminDetailSteps.tsx         ← accordion of steps + per-step images
  AdminDetailFaq.tsx           ← accordion of FAQ items
  AdminDetailOfficialLinks.tsx ← officialLinks + jurisdiction filter dropdown
  AdminDetailRelated.tsx       ← related-guides surface (Phase 2B addition)
  AdminDetailExportFlow.tsx    ← HTML export modal + saveAndShare logic
```

Each child: 150-300 LOC. Total target: 8 files × ~250 LOC = ~2000 LOC, roughly same byte count but parallelizable, testable.

**Effort estimate**: 2-3 days for one developer. Should be done in 2-3 PRs (not one big-bang) to keep diffs reviewable.

**Recommended timing**: AFTER v1.5.0 ships. Before any new admin-detail feature (e.g., Phase 2B-related Phase B retention surfaces).

**Risk of delay**: every new section added before the split makes the eventual split bigger and riskier.

---

## 2. HomeScreen.tsx (1212 LOC)

**Risk**: Medium.

**Why it's a problem**:
- Already partially split into `home/HomeHeader`, `home/HomeQuickActions`, etc. — good direction
- But the main component still hand-renders ~10 sections inline (priority guides, ready guides, in-progress, bookmarks, daily-life recent, japanese recent, etc.)
- `.map()` chains in render at lines 292-294 (per technical audit) not in `useMemo` — minor

**Split strategy** (when we do it):

Continue the existing `home/*` pattern:

```
src/screens/home/
  HomePriorityGuides.tsx       ← "Ưu tiên lúc này"
  HomeReadyGuides.tsx          ← "Đã chuẩn bị đủ giấy tờ"
  HomeInProgressGuides.tsx     ← "Đang làm dở thủ tục"
  HomeRecentDailyLife.tsx      ← "Vừa đọc"
  HomeRecentJapanese.tsx       ← "Vừa luyện"
  HomeBookmarks.tsx            ← Pinned + saved
  HomePolicyUpdates.tsx        ← LAW_UPDATES
  HomeFamilyVisaGroups.tsx     ← FAMILY_VISA_GROUPS
  HomeAllGuidesCta.tsx         ← "Xem toàn bộ thủ tục"
```

After split, HomeScreen.tsx orchestrator should be ~400 LOC (state + data loading + orchestration).

**Effort estimate**: 1-2 days, one developer. Each section is mechanical — extract → import → render.

**Recommended timing**: AFTER v1.5.0 ships, AFTER AdminDetail split (lower risk than AdminDetail).

---

## 3. analytics.ts unit-test gap

**Risk**: High (privacy-critical, untested).

**Why it's a problem**:
- Privacy contract states `q` field is normalized + 24-char truncated. If someone changes `normalizeQueryForAnalytics()` and breaks the contract, no test catches it.
- `logSearchPerformed()` correctly fires `search_query` + conditionally `search_no_results` — also untested
- `logGuideOpened()` correctly forwards `source` field — untested
- The `track()` function correctly silent-fails when not initialized — untested

**Fix proposal** (when we do it):

```ts
// src/utils/analytics.test.ts
describe('normalizeQueryForAnalytics', () => {
  it('strips diacritics + đ→d + lowercases', ...)
  it('caps at 24 chars', ...)
  it('returns empty string for whitespace-only', ...)
});

describe('logSearchPerformed', () => {
  it('fires search_query with normalized q', ...)
  it('fires search_no_results only when result_count === 0', ...)
  it('does not fire when query is empty', ...)
});
```

To make this testable, export `normalizeQueryForAnalytics` from `analytics.ts` (1-line change). Mock `@aptabase/react-native` in the test file.

**Effort estimate**: 2-3 hours. Tiny PR.

**Recommended timing**: ASAP. Can fold into the v1.5.0 release-prep PR if time allows, otherwise immediately after.

---

## 4. Future FlatList thresholds

**Risk**: Low (today). Medium (when result counts grow).

**Why it's a problem**:
- `SearchScreen` renders results via `.map()` inside a `ScrollView` (no virtualization)
- `AdminDetailScreen` likewise renders steps + FAQ + related as `.map()`
- Fine while results stay ≤ 30 (current limit) and guides have ≤ 10 steps
- If we lift the search limit to 100 or add longer guides, scroll jank will appear

**Trigger thresholds for converting to FlatList**:
- Search results consistently > 50 items rendered
- Any single guide has > 15 steps OR > 20 FAQ items
- DAU > 1000 AND we see scroll-perf complaints

**Effort estimate** (when triggered): 0.5 day per surface. FlatList needs `keyExtractor`, `renderItem`, `ItemSeparatorComponent`.

**Recommended timing**: only after trigger conditions met. Don't pre-optimize.

---

## 5. Content scaling ceiling

**Risk**: Low (today). Medium-High at 300 guides.

**Why it's a problem**:
- All 127 admin guides + all daily-life topics + japanese phrases + words are statically imported at app startup
- Each TS file → bundled JS object literal in the main JS bundle
- Current size estimate (per content audit): ~15-20 KB minified content. Bundle-safe today.
- At 200-300 guides: 30-50 KB additional content, still bundle-safe but startup parsing creeps up
- At 500+ guides: JS parse cost becomes user-visible on low-end Android devices

**Mitigation when triggered**:
1. Stay static if total guide count stays < 200
2. Convert guides to JSON + lazy-load by category when count hits 200
3. Move to remote CDN + cache when count hits 400 OR when content needs faster-than-app-release updates

**Trigger** for option 2 (lazy load): bundle size > 8 MB, OR cold start > 5s on a mid-range Android.

**Trigger** for option 3 (remote CDN): need to push a content fix < 1 day (today: requires app update, 1-2 week App Review)

**Effort estimate**:
- Option 2: 2-3 days (move guides to JSON files, build category-lazy importers)
- Option 3: 1-2 weeks (CDN, schema versioning, cache invalidation, offline fallback) + cost (CDN ~$5-20/month at projected scale)

**Recommended timing**: not until trigger conditions met. Today is too early.

---

## 6. Remote content migration trigger

**Risk**: Low today. Strategic decision pending.

**When to migrate**:
- Need to fix a content typo / legal-source URL change WITHOUT a binary release
- Content team includes non-developers who can't open PRs
- App Store review delays > 7 days for content-only updates
- Guide count > 400 (see #5)

**When to NOT migrate**:
- All content edits are still flowing through PRs comfortably
- Source-citing rules require manual review (incompatible with CMS-driven publishing)
- We're not paying a backend operations cost

**Recommended timing**: re-evaluate every 6 months. Next check: 2026-11.

---

## 7. Test coverage gaps (besides analytics)

| Area | Coverage today | Risk |
| --- | --- | --- |
| `utils/searchIndex.ts` | ✅ 13 tests | Low |
| `utils/adminGuideSearch.ts` | ✅ covered | Low |
| `utils/analytics.ts` | ❌ 0 tests | High (see #3) |
| `screens/AdminDetailScreen` | ❌ 0 render tests | Medium |
| `screens/SearchScreen` | ❌ 0 render tests | Medium |
| `screens/HomeScreen` | ❌ 0 render tests | Medium |
| `navigation/AppNavigator` | ❌ 0 tests | Medium |
| `hooks/useGuideProgress` | ✅ covered | Low |

**Render test priority**: SearchScreen first (smallest surface, biggest behavior matrix — empty/no-result/result states). Then AdminDetailScreen. Then HomeScreen.

**Effort estimate**: 1 day per screen for basic render tests + navigation flow.

**Recommended timing**: after v1.5.0 ships, in parallel with retention work.

---

## 8. Stale local branches

After #57 + #58 merge, these become stale:
- `feat/search-discovery-phase1` (local) — superseded by merged main
- `chore/audit-safe-fixes-2026-05-18` (local) — superseded after PR #59 merges

`+` prefixed branches are worktree-pinned, don't touch.

**Cleanup**: `git branch -d feat/search-discovery-phase1 chore/audit-safe-fixes-2026-05-18` after PRs merge. Remote auto-deleted by GitHub on merge if "delete branch on merge" is on.

**Effort**: 30 seconds.

---

## Debt-vs-time matrix

| Item | Risk | Effort | Recommended timing |
| --- | --- | --- | --- |
| AdminDetailScreen split | Medium → High | 2-3 days | After v1.5.0, before Phase B retention |
| HomeScreen sectioning split | Medium | 1-2 days | After AdminDetail split |
| analytics.ts tests | High (privacy) | 2-3 hours | ASAP — could fold into v1.5.0 release-prep PR |
| FlatList migration | Low → Medium | 0.5 day per surface | Only when triggered |
| Content scaling | Low → High | 2-3 days (option 2) | When bundle > 8 MB |
| Remote content migration | Strategic | 1-2 weeks | Re-evaluate 2026-11 |
| Render tests | Medium | 3-4 days | After v1.5.0, parallel to retention |
| Stale branch cleanup | Low | 30 sec | After PRs merge |

---

## What this review does NOT cover

- ❌ Dependency upgrades (Expo SDK bumps, RN bumps) — separate cadence
- ❌ Performance profiling under load — needs DAU data first
- ❌ Accessibility audit — separate concern, see future doc
- ❌ Localization beyond VI/EN — out of scope for v1.5.0
- ❌ E2E / Detox tests — over-engineering at current size
