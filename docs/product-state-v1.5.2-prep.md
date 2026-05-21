# Product state — v1.5.2 prep

**Date**: 2026-05-21
**Branch**: `feat/phase-2c-observability-and-retrieval`
**Base**: main `e4d110d` (post-v1.5.1 foundation merge)
**Predecessor docs**:
- [`product-state-v1.5.1-prep.md`](product-state-v1.5.1-prep.md) — v1.5.1 foundation snapshot
- [`product-state-v1.5.0.md`](product-state-v1.5.0.md) — v1.5.0 launch snapshot
**Companions**:
- [`search-observability-phase-2c.md`](search-observability-phase-2c.md) — the analytics layer this sprint adds
- [`retrieval-review-playbook.md`](retrieval-review-playbook.md) — the manual weekly process that consumes the events
- [`reminder-system-design.md`](reminder-system-design.md) §8b (R3 gate still applies)
- [`growth-next-loop-v1.5.1.md`](growth-next-loop-v1.5.1.md) — deep-link / landing-page prereqs (unchanged this sprint)

This is a **data-driven growth sprint**, not a feature sprint. The goal: turn "we have users" into "we know where users hurt".

---

## 1. The mandate (what this sprint refuses to do)

This PR is explicitly NOT a feature sprint. Every line of code earns its place by answering one of:
- Helping us understand what users actually want
- Increasing `guide_open` count
- Increasing retention
- Increasing search success
- Reducing dead-ends

If a proposed change doesn't answer one of those, it doesn't ship in v1.5.2.

### Hard refusals — does NOT ship

| Refused | Why | When it becomes possible |
| --- | --- | --- |
| AI integration of any kind | Hard scope refusal; no Phase 2 AI Mail expansion either | Indefinite, per existing decision log |
| Visual / UX redesign | Risks regressing v1.5.0's App-Review-approved surface | When user signals clearly demand it |
| New external dependency | We added zero deps from v1.4 → v1.5.1 — keep streak | Only if a deferred feature gate is cleared AND no alternative exists |
| Social features / community / forum | Out of product scope per identity statement | Indefinite |
| Auth / backend / cloud | Pure local-first is the privacy posture | Indefinite |
| Push notification scheduler / Reminder R3 production | Still gated on `reminder-system-design.md` §8b — DAU tier 1 (< 100) only allows internal/beta, NOT production | Per decision-day 2026-06-04 |
| Deep link infrastructure | Still gated on `growth-next-loop-v1.5.1.md` §3 | Per domain registration + AASA + asset-links |
| App Review-impacting entitlement | Keeps this an OTA-eligible sprint | If entitlement is needed for a specific gated feature |
| Major refactor (AdminDetailScreen / HomeScreen split) | Tracked in tech-debt review; gate is "when a new section needs to ship inside it" | When a planned feature requires editing the orchestrator |
| Auto-bump of `lastVerified` | Hard content-governance rule | Never |
| Performance regression | Every change in this PR is additive + on cold paths (Home mount, Search effects) — no hot-path code touched | N/A |

---

## 2. What v1.5.2 DOES ship (all in this PR)

| Item | What it solves | Risk |
| --- | --- | --- |
| **Search observability** — 4 new events (`search_zero_results`, `search_result_opened`, `search_abandoned`, `fallback_guide_opened`) | "Where do searches fail / what do users give up on / what does search actually convert to" | Low. All bounded enum + 24-char normalized `q`. Reuses pinned `normalizeQueryForAnalytics` contract |
| **Guide-open source refinement** — 5 new bounded values in `GuideOpenSource` (`start_here`, `quick_action`, `saved`, `external_share`, `deep_link_placeholder`) | "Which Home surface earned the guide open?" | Low. Backward-compat: legacy `direct` / `featured` / etc. still work. Two new values are future-safe (no call site yet) |
| **Dead-end defense layer** in SearchScreen | "Zero-result users now see 6 featured guides + emergency CTA + retry-keyword chips + `fallback_guide_opened` fires on recovery" | Low. Builds on existing FeaturedAndEmergency component; surgical add (chips + analytics) |
| **Searcher-signal heuristic** + Home layout variant | "Users who self-select as typers (5+ searches) get a Home that emphasizes search and hides StartHere chips" | Medium. UX change visible to users. Local-only, deterministic, no remote config, no A/B service. Pure function lives in `searcherSignal.ts` with 11 tests |
| **Search ranking pin expansion** — 8 new pinned top-1 expectations (3 with controlled keyword additions: `baito tax`, `kokumin hoken`, `taishoku`) | "Phase 2C real-world query coverage protection" | Low. Each pin has a documented rationale; each keyword expansion is single-phrase scoped to one guide |
| **Retrieval review playbook** | "How does the reviewer turn the new events into action items weekly?" | Doc only |
| **Phase 2C observability doc** | "How does the analytics layer hang together?" | Doc only |
| **This doc** | "Where is the product right now, what did this sprint ship" | Doc only |

---

## 3. Architecture decisions in this PR (one-line each)

- **Abandon timer extracted to `abandonTimer.ts`** because the debounce semantics need fake-timer unit tests; living inside SearchScreen makes them untestable.
- **Searcher signal is a single AsyncStorage integer**, not a histogram, because the heuristic is binary (`>= 5` flips a layout). Histogram is YAGNI.
- **Home heuristic decides on focus, not on every render**, so layout doesn't flicker mid-session when the user crosses the threshold; they see the new layout next time they return to Home.
- **`fallback_guide_opened` is a dedicated event**, not a `source` enum value, because it counts dead-end recoveries (a different question than "where did this open come from").
- **`search_no_results` kept firing** alongside the new `search_zero_results` for v1.5.0 dashboard back-compat.
- **`search_result_opened` fires alongside `guide_open { source: 'search' }`** for the same reason — old dashboards still work; new ones get richer position data.
- **`external_share` + `deep_link_placeholder` enum slots reserved** with NO call sites — declares them at the schema level so the future deep-link PR is a wiring change, not a schema migration.

---

## 4. Release gate

### Code gates

1. ✅ `npx tsc --noEmit` — 0 errors
2. ✅ `npm run test:ci` — all suites + tests pass; expected suite count ≥ 54 (added `abandonTimer.test.ts` + `searcherSignal.test.ts`); test count ≥ existing baseline + ~26 (7 abandon + 11 searcher + 8 search pins)
3. ✅ `npm run verify:content` — zero encoding issues / zero BJT warnings
4. ✅ Zero new dependencies (`git diff package.json` empty in deps blocks)
5. ✅ No `console.warn` / `console.error` added outside `if (__DEV__)`

### Privacy gates

6. ✅ Every new event property is bounded enum / number / string-via-`normalizeQueryForAnalytics`
7. ✅ Updates to `analytics-events.md` describe WHEN each new event fires
8. ✅ Updates to `analytics-decision-map.md` map each new event to a product question
9. ✅ `§search-abandon` heuristic documented with all 5 anti-spam guarantees
10. ✅ No raw user query logged. PII contract held: 24-char normalized `q` only.

### Content gates

11. ✅ Each new search keyword is single-phrase + scoped to one guide
12. ✅ No `lastVerified` bumped
13. ✅ No keyword too generic (`japan`, `help`, `thu tuc`, etc.)

### Heuristic gates

14. ✅ Searcher threshold is documented, deterministic, and explainable (5 searches → flip)
15. ✅ Home layout decision is INSPECTABLE in `searcherSignal.ts` — no remote config, no A/B SDK

### Process gates

16. ✅ Branch name `feat/phase-2c-observability-and-retrieval`
17. ✅ PR body covers: retrieval funnel explanation / search-abandon heuristic / why NOT raw analytics / future deep-link compat / anti-spam reasoning / known limitations
18. ✅ Three new docs land in the same PR

---

## 5. Test gate — what must be true at merge time

| Scope | Expectation | Where pinned |
| --- | --- | --- |
| Analytics PII contract | 22 `normalizeQueryForAnalytics` tests pass | `analytics.test.ts` |
| Abandon timer | 7 tests pin the state-machine semantics (debounce / cancel / sentinel / re-arm) | `abandonTimer.test.ts` (new) |
| Searcher signal | 11 tests pin the storage + threshold semantics | `searcherSignal.test.ts` (new) |
| Search ranking | 54 pinned queries (46 pre-v1.5.2 + 8 added) | `searchIndex.test.ts` |
| Bookmark meta presentation | 4 cases | `bookmarkMeta.test.ts` |
| Reminder foundation | Existing tests + truth table | `reminderHooks.test.ts` |
| Content encoding | Zero rows in encoding audit; BJT gate zero warnings | `npm run verify:content` |

Total expected: **54+ suites / ~400+ tests**.

---

## 6. Risk list

| Risk | Severity | Likelihood | Mitigation |
| --- | --- | --- | --- |
| Abandon timer fires on torn-down screen | Low | Very low | useEffect cleanup calls `cancelAbandon`; 7 unit tests pin the contract |
| Abandon timer double-fires for the same query | Low | Very low | `firedFor` sentinel + 4 dedicated tests |
| Searcher heuristic flips too eagerly for noise typists | Medium | Medium | Threshold = 5 (high enough to filter noise). If signal says false-positive in 2 consecutive reviews, raise to 8 or 10 |
| Searcher heuristic confuses users who wanted StartHere | Medium | Low | Quick-actions row stays for both variants; the user can still tap a situation chip. Search CTA is at the top regardless |
| Dead-end keyword chips trigger query loops | Low | Low | Chips are static + every chip is guaranteed to return ≥ 1 hit by existing `searchSuggestions.test.ts` |
| `fallback_guide_opened` mis-fires from non-fallback paths | Low | Very low | Only one call site (the zero-result branch in SearchScreen) — typed enum prevents propagation |
| Source enum extension breaks legacy `guide_open.source` dashboards | Low | Very low | Existing 5 values preserved; new 5 added — additive only |
| 3 new keyword additions pollute other queries | Low | Low | Each is a long phrase (`baito tax`, `kokumin hoken`, `taishoku`) — substring collisions on common queries are unlikely. Existing 54-test pin suite catches regressions |
| Aptabase event-count limit hit by new events | Low | Very low | Aptabase free tier is ~20K/month; current volume is small. New events fire at most ~3-5x per session |
| Decision day 2026-06-04 conflated with this PR | Medium | Medium | This sprint is independent of the R3 gate — that decision day still uses the gate-1 tier from `reminder-system-design.md` §8b |

---

## 7. Metrics to watch (after merge, before deciding any v1.5.3 work)

After Aptabase dashboards are populated (~2 weeks post-merge):

| Metric | Healthy | Warning | Action if warning |
| --- | --- | --- | --- |
| **Search → tap conversion** = `search_result_opened` / `search_query` | ≥ 50% | < 30% | Ranking review per playbook Q4 |
| **Position-0 conversion share** | ≥ 70% | < 50% | Top-1 results aren't matching intent — investigate via playbook Q3 |
| **Abandon rate** = `search_abandoned` / `search_query` | ≤ 20% | ≥ 40% | Review top abandoned queries (playbook Q3) |
| **Zero-result rate** = `search_zero_results` / `search_query` | ≤ 15% | ≥ 25% | Coverage gaps (playbook Q2) |
| **Fallback recovery rate** = `fallback_guide_opened` / `search_zero_results` | ≥ 5% | < 1% | Fallback layer isn't earning its space — review featured guides |
| **`home_layout_variant` split (searcher %)** | 10-30% | < 5% (no flips) or > 50% (everyone flips quickly) | Threshold may need calibration |
| **`guide_open.source` distribution** | `search` + `featured` + `recent_viewed` together ≥ 60% | Long tail of `direct` | Direct opens shouldn't dominate — investigate whether other sources are firing |

---

## 8. Signals before scaling — what must be true before v1.5.3

This PR is intentionally a foundation, not the final shape. Before queueing additional retrieval / observability work:

1. **At least 2 retrieval reviews completed** per the playbook (Q1-Q5 each time)
2. **At least one Bucket-A finding shipped** as a controlled-keyword PR (proves the loop works end-to-end)
3. **At least one Bucket-B finding logged** into the content backlog
4. **`home_layout_variant` split observed** for ≥ 14 days
5. **`search_abandoned.ms_since_query` distribution checked** for a stuck-timer pattern (none expected — but verifying closes the loop)

If after 4 weeks ANY of those signals is missing, do NOT scale — first complete the missing review work. The retrieval loop is more important than additional instrumentation.

---

## 9. Rollback plan

Every change in this PR is additive and rollback-safe:

- **Analytics events** — comment out the `track(...)` call; event stops firing; nothing else breaks
- **Source enum extensions** — keep the enum values (back-compat), revert the call sites to `'direct'`
- **Dead-end defense layer** — revert the SearchScreen changes; legacy zero-result UX returns
- **Searcher heuristic** — set the threshold to `Number.MAX_SAFE_INTEGER` or revert the conditional render; Home shows StartHere always (cold_start variant)
- **Search keyword additions** — revert the 3 keyword adds; the 8 pin tests fail for the affected 3 queries → revert those pins too

No schema break, no data loss, no Aptabase reconfiguration required.

---

## 10. After this PR ships (next 4 weeks)

| Week | Activity | Owner |
| --- | --- | --- |
| 1 | Verify Aptabase dashboards populate. Spot-check `fallback_shown: true` actually appears | pdythanhduy |
| 2 | First retrieval review (manual, 1-2h) using the new playbook | pdythanhduy |
| 3 | Second retrieval review; first Bucket-A keyword PR if any candidate emerged | pdythanhduy |
| 4 | Third review; decision on v1.5.3 scope based on accumulated signal | pdythanhduy |

The 2026-06-04 R3 decision day still happens on schedule; this sprint does NOT change that gate.

---

## 11. Confidence: HIGH (foundation-grade, observability-focused)

Reasons HIGH:
- ✅ Every change is additive
- ✅ Every new event has a documented product question
- ✅ Every new pin has a documented rationale
- ✅ Every keyword addition is single-phrase + scoped
- ✅ No new dependency
- ✅ No backend / auth / push / AI / deep-link infra touched
- ✅ Heuristic is deterministic + local + inspectable
- ✅ Bounded blast radius (1 new screen behavior, 4 new events, 8 new test pins)
- ✅ Rollback plan is one PR

Reasons NOT VERY HIGH:
- The searcher-signal threshold (5) is a guess until 2-4 weeks of `home_layout_variant` data lands
- 3 new keywords might still surprise edge queries (small risk, single-phrase scope mitigates)
- Aptabase dashboards must be configured for the playbook to function — operational gate outside this PR

---

## 12. Recommendation: ship the sprint, then run the loop

This PR delivers the observability that v1.5.0 + v1.5.1 left as "we'll need this eventually". Once it ships:

1. Configure Aptabase dashboards (one-time, ~30 min)
2. Run the retrieval playbook weekly for 4 weeks
3. Ship one Bucket-A keyword PR per cycle if signal warrants
4. Re-read this doc at week 4; decide v1.5.3 scope from accumulated signal, not from the backlog wishlist
