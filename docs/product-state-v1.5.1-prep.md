# Product state — v1.5.1 prep

**Date**: 2026-05-21
**Branch**: `chore/product-loop-v1.5.1-foundation` (this PR)
**Base**: main `f958548` (post-v1.5.0 freshness audit + 26 defensive search pins)
**Predecessor doc**: [`product-state-v1.5.0.md`](product-state-v1.5.0.md) — the v1.5.0 snapshot
**Companions**: [`growth-next-loop-v1.5.1.md`](growth-next-loop-v1.5.1.md), [`reminder-system-design.md`](reminder-system-design.md) §8b (R3 gate)

This doc is the single-page answer to "what is v1.5.1, what is it NOT, and how do we know we're ready to ship?"

---

## 1. Where the repo is right now

### Released state (2026-05-19)
- **iOS v1.5.0 (build 26)** — App Review APPROVED, live on App Store
- **Android v1.5.0** — NOT yet built (deferred per separate decision)
- **Main HEAD**: `f958548` — content freshness audit signed off
- **Tag**: `v1.5.0` live
- **Tests**: 51 suites / 328+ tests green on main
- **TypeScript**: 0 errors, 0 bare `any`, 1 documented `@ts-expect-error`

### What's already done in this branch (foundation PR)
- ✅ Analytics wiring closed — three previously-no-op wrappers (`logHomeSearchPressed`, `logHomeQuickActionPressed`, `logHomeStartHerePressed`) now fire real events; `emergency_cta_open { source: 'home_start_here' }` now fires when the cold-start emergency chip is tapped (was silently dropped in v1.5.0)
- ✅ HomeScreen light modularization — `getBookmarkMeta` extracted to `src/screens/home/bookmarkMeta.ts` with its own unit test
- ✅ Retention foundation hardened — exhaustive truth-table test for `shouldFire`, schema-exhaustiveness test for `ReminderHookKind`, monthlyCap-lower-than-default round-trip test
- ✅ `docs/reminder-system-design.md` §8b — R3 scheduling decision gate (12 gates + 4 anti-gates) documented
- ✅ Search defenses — 8 new v1.5.1 query pins (top-1 + top-N) for VN-in-JP real-world queries
- ✅ Controlled keyword expansion — single phrase `'mat the ngoai kieu'` added to lost-residence-card (legacy diaspora term for residence card)
- ✅ Growth next-loop doc — link-layer prerequisites, landing-page checklist, share-card formats, social funnel measurement plan
- ✅ This product state doc

---

## 2. What v1.5.1 SHOULD ship

Tight scope. Each item is a foundation deliverable, not a user-facing feature.

| Item | Why now | Risk | Status in this PR |
| --- | --- | --- | --- |
| Close analytics wiring gaps | v1.5.0 left 3 wrappers no-op + 1 missing emergency source. Decision-map dashboards will be blind on these surfaces without it | Low — pure additive change, no new external dep | ✅ Done |
| HomeScreen light modularization | Reduces orchestrator coupling without UI / route changes | Low — pure extraction of a pure function | ✅ Done |
| Retention foundation tests + R3 gate | R2 design already shipped; gate doc is required BEFORE any R3 PR is even considered | Low — design-only change | ✅ Done |
| Search defensive query pins | Locks the v1.5.0 ranking work against future regressions; adds VN-real-world queries the existing suite didn't cover | Low — adds tests + one controlled keyword | ✅ Done |
| Growth next-loop planning doc | Sets the prerequisite map for v1.6 deep-link work; prevents premature implementation | Zero — doc-only | ✅ Done |
| This product state doc | Single-page answer to "where are we, what's next" — needed for v1.6 planning | Zero | ✅ Done |

---

## 3. What v1.5.1 must NOT ship

Each "no" below is enforced because the work is either premature, gated on data we don't have, or out of scope for a foundation PR.

| Item | Why NOT now | When it becomes possible |
| --- | --- | --- |
| Deep-link / universal-link infrastructure | Domain not registered, AASA / asset-links not configured, no v1.6 growth experiment queued behind it | See `growth-next-loop-v1.5.1.md` §3 — ALL prereqs needed before any code lands |
| Landing page | Same as above + the v1.5.0 share placeholder URL is intentional | After domain + hosting exist |
| Reminder R3 scheduling UI | Gated by 12 decision-gate items in `reminder-system-design.md` §8b — most need ≥ 2 weeks of post-launch data | Earliest review date: 2 weeks after Android v1.5.0 ships |
| Notification permissions UX | Same as above (gate 6) | Same as above |
| AI Mail public surface | 6 compliance gates uncleared per `docs/feature-ai-mail-translate-decision-log.md` | Indefinite — quarterly review only |
| My Japan Plan | HOLD per user direction | Indefinite |
| Monetization (IAP / premium / ads) | No PMF signal yet | Month 6+ after data |
| Major HomeScreen / AdminDetailScreen refactor | Tech-debt review intentionally defers this; gate is "when a new section needs to ship inside it" | When next user-facing feature requires editing the orchestrator |
| Render tests for full screens | Tracked in tech-debt review; effort 3-4 days, not justified before retention signal lands | Post-launch + 4 weeks if a render bug actually slips |
| FlatList migration for any Home / Saved list | Threshold-based — not triggered at current list lengths | When list lengths exceed 50 items |
| New `Reminder` data type or schema change | R2 schema is committed; any schema migration belongs in R3 | After R3 gate passes |
| Auto-bumping `lastVerified` on any guide | Hard rule — `lastVerified` must reflect actual source verification | Never auto-bump |
| New external dependency | v1.4.0 → v1.5.0 added zero deps; v1.5.1 keeps that streak | When a deferred-feature gate is cleared AND the dep is justified |

---

## 4. Release gate — before tagging v1.5.1

All gates must pass. Each gate is a single-line check; failing means "the PR is not ready", not "the PR is bad".

### Code gates

1. ✅ `npx tsc --noEmit` exits 0
2. ✅ `npm run test:ci` — all suites + tests pass; suite count ≥ 52 (one new suite for `bookmarkMeta.test.ts`); test count ≥ existing baseline + 12 (8 search + 4 reminder additions, plus `bookmarkMeta` cases)
3. ✅ `npm run verify:content` — encoding audit + BJT QA gate pass with zero warnings
4. ✅ Zero new dependencies in `package.json` (`git diff package.json` is empty in the deps blocks)
5. ✅ No `console.warn` / `console.error` added outside `if (__DEV__)` guards
6. ✅ No bare `any`, no new `@ts-expect-error` without a comment

### Privacy gates

7. ✅ Every new event in `EventMap` has bounded enum properties (no free-text user input). Verify: `home_search_pressed: void` (no payload), `home_quick_action_pressed.action_id` is a 7-value union
8. ✅ Updates to `docs/analytics-events.md` describe WHEN each new event fires
9. ✅ Updates to `docs/analytics-decision-map.md` map each new event to a product question

### Content gates

10. ✅ Search-keyword expansion is single-phrase + guide-specific (only `'mat the ngoai kieu'` on `lost-residence-card`), not a generic broadcast
11. ✅ No `lastVerified` date changed in any guide

### Process gates

12. ✅ Branch name follows convention: `chore/product-loop-v1.5.1-foundation`
13. ✅ PR body has: Summary / What changed / What did NOT change / Test plan / Risk assessment / Reviewer checklist / Commands run + results
14. ✅ This product state doc lands in the same PR

---

## 5. Test gate — what must be true at merge time

Verified by `npm run verify` (typecheck + test:ci + verify:content). Specific expectations:

| Scope | Expectation | Where pinned |
| --- | --- | --- |
| Analytics PII contract | 22 `normalizeQueryForAnalytics` tests pass | `src/utils/analytics.test.ts` |
| Reminder foundation | Schema-exhaustiveness + shouldFire 8-row truth table + corrupt-storage defense + monthlyCap round-trip | `src/utils/reminderHooks.test.ts` |
| Search Phase 2A ranking | JP-form / romaji / VI / EN pins from earlier work | `src/utils/searchIndex.test.ts` §pinned top-1 / top-3 |
| Search Phase 2C-prep | 26 v1.5.0 pins from PR #72 | Same file §pinned top-1 |
| Search v1.5.1 VN-in-JP | 3 top-1 pins + 4 top-N pins added in this PR | Same file §v1.5.1 |
| Bookmark meta presentation | 4 cases pinning the type → meta mapping | `src/screens/home/bookmarkMeta.test.ts` |
| Content encoding | Zero rows in encoding audit; BJT QA gate zero warnings | `npm run verify:content` |

Total expected after this PR: **52+ suites / 340+ tests**.

---

## 6. Risk list — what could go wrong

| Risk | Severity | Likelihood | Mitigation in this PR |
| --- | --- | --- | --- |
| Analytics wiring exposes a high-cardinality enum bug | Low | Low | All new event props are typed unions; `tsc` enforces |
| Bookmark-meta extraction breaks rendering | Low | Very low | Pure-function extraction; render code path unchanged; component already imported elsewhere |
| Reminder test additions reveal a real `shouldFire` bug | Low | Very low | Existing tests already cover the AND-of-three contract; new truth table is a stricter superset |
| Search keyword addition pollutes another query's ranking | Low | Low | Only one phrase added; phrase is rare enough that contamination requires substring-overlap on `mat the ngoai kieu` which is not a substring of any common query |
| Search test pins lock ranking we'll want to evolve | Medium | Medium | Each pin's comment documents WHY the position is current behavior; future PR can update the pin + comment together |
| Growth doc commits us to a v1.6 timeline | Low | Low | Doc is explicitly "DO NOT implement in v1.5.1" — sets prereqs, not deadlines |
| Reviewer disagrees with R3 gate severity | Medium | Low | Each gate has a documented rationale; gates can be challenged individually without rewriting the doc |
| App Store / Play Store re-submission needed for v1.5.1 | Low | Low | v1.5.1 is doc + analytics + tests only — no binary-affecting code other than analytics call sites; OTA-eligible if EAS configures it |

---

## 7. Two-week observation plan (post-v1.5.0 launch)

This plan is what makes v1.5.1 a "foundation" PR — we're laying groundwork for decisions that depend on the next 2 weeks of data.

### Week 1 (2026-05-21 → 2026-05-28)

| Day | What to watch | Action if signal triggers |
| --- | --- | --- |
| Day 1-2 | Crash rate via App Store Connect; Aptabase event count | Crash > 1% sessions → hotfix branch; events flatlined → check Aptabase key + initialization |
| Day 3-4 | `app_open` DAU trend; `search_query` per-DAU ratio | DAU < 50 → marketing surface needed earlier than planned; search/DAU < 0.5 → discovery surfaces underused |
| Day 5-7 | `guide_open.source` distribution | If `featured` > 50% of opens → cut other discovery surfaces. If `search` > 50% → invest in Phase 2C tuning sooner |

### Week 2 (2026-05-28 → 2026-06-04)

| Day | What to watch | Action if signal triggers |
| --- | --- | --- |
| Day 8-10 | `guide_save` rate; `guide_share { completed: true }` count | Save rate < 5% of opens → save surface isn't discoverable; share completion > 5/day sustained → consider unlocking growth-next-loop §3 |
| Day 11-12 | `home_start_here_pressed` vs `home_quick_action_pressed` distribution | One dominates 5:1 → consider deprecating the other in v1.6; both balanced → keep both |
| Day 13-14 | `search_no_results` top-20 list | Cluster failed queries; pick top-5 for v1.5.2 keyword tuning if any meet the Phase 2C bucket-A/B criteria |

### Decision day: 2026-06-04 (target)

Review against `reminder-system-design.md` §8b gates 1-4. Gate 1 (DAU) is tiered, not pass/fail:
- DAU < 100 → R3 internal/beta experiment is allowed (subject to gates 2-12); no production rollout.
- DAU ≥ 100 → R3 production rollout is allowed.

If gates 2-4 all pass and the DAU tier is at least beta-eligible, queue the R3 design PR with the tier locked. If any of gates 2-4 fail, defer 2 more weeks and re-check.

Other follow-up decisions to record on this day:
- ASO experiment ship date (gated on Apple App Review backlog, not on data)
- Android v1.5.0 build decision
- v1.5.2 scope (keyword tuning + any v1.5.0 hot-spots that surfaced)

### Anti-actions during the 2-week window

- ❌ Do NOT ship a new user-facing feature (this is observation time, not feature time)
- ❌ Do NOT respond to single-user complaints with hotfixes — wait for a pattern
- ❌ Do NOT change `lastVerified` dates outside the scheduled freshness audit
- ❌ Do NOT add a new tracked event mid-window — the comparison baseline depends on a stable schema
- ❌ Do NOT start R3 implementation early because "the data looks promising" — the gate exists for a reason

---

## 8. Confidence: HIGH (foundation work)

### Reasons HIGH
- ✅ Every change is additive: no schema break, no UI redesign, no dependency change
- ✅ Each new event has a documented product question in the decision map
- ✅ Tests added are stricter supersets of existing contracts
- ✅ Search keyword expansion is one phrase on one guide — minimum-blast extension
- ✅ All deferred items are explicitly documented WITH their decision gates
- ✅ No `lastVerified` was touched (content correctness untouched)
- ✅ No file in `src/` outside the modified set was opened

### Reasons NOT VERY HIGH
- Test count adds modest volume — not a structural overhaul of test coverage
- Two new events (`home_search_pressed`, `home_quick_action_pressed`) need a calibration pass after first week of data (false-positive on the "valuable event" decision is possible but reversible)
- Growth + R3 docs commit us to NOT shipping a class of things; reversing would require new doc entries
- HomeScreen modularization is "light" — the orchestrator stays a 1240+ LOC file; full split is still in tech-debt review with a deliberate trigger

---

## 9. Recommendation: ship the foundation PR, then observe

The PR is intentionally scoped to "everything needed before v1.6 can be planned, and nothing that requires post-launch data we don't have yet."

Next decision after merge: re-read this doc at the end of the 2-week observation window. Tick gates that passed, defer the ones that didn't, and pick a v1.5.2 or v1.6 scope from what the data justifies — not from the backlog wishlist.
