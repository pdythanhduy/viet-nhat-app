# R3 (Reminder scheduling UI) — Decision Day Prep

**Decision day**: **2026-06-04** (per [`reminder-system-design.md`](reminder-system-design.md) §8b "Decision day" + [`product-state-v1.5.1-prep.md`](product-state-v1.5.1-prep.md) §7 "Decision day: 2026-06-04 (target)").
**Owner**: pdythanhduy.
**Status**: prep checklist — fill the gate values from real Aptabase data on the day. NOT a decision yet.
**Source of truth for gates**: [`reminder-system-design.md`](reminder-system-design.md) §8b — this doc operationalizes that doc, does not replace it.

---

## 0. Why this decision is gated

R2 (data model + storage + tests for the reminder system) shipped in v1.5.0. R3 is the scheduling/UI/permission layer. Before opening an R3 implementation PR, ALL gates in `reminder-system-design.md` §8b must pass. This doc turns the §8b gates into:

- Exact Aptabase queries to run
- Numeric thresholds derived from §8b
- A 3-outcome decision tree (SHIP / BETA / DEFER)
- Output template for the decision meeting note

If reading this doc for the first time on 2026-06-04: read `reminder-system-design.md` §8b first (it's the actual contract), then come back here.

---

## 1. Observation window

**Data window for gate evaluation**: **2026-05-19 → 2026-06-02** (15 days post-v1.5.0 launch — meets §8b "≥ 2 weeks of post-v1.5.0 production data").

**Aptabase time-range to set on every chart below**: `Last 14 days` (Aptabase doesn't support arbitrary fixed ranges in the free tier dashboard — `Last 14 days` rolled forward to 2026-06-04 covers 2026-05-21 → 2026-06-04, which is within the §8b window. If you want the exact 2026-05-19 → 2026-06-02 window, export the raw CSV and filter manually.)

---

## 2. Gate 1 — DAU baseline (TIERED, sizing gate)

**Source**: `reminder-system-design.md:132-137`.
**Type**: TIERED — not pass/fail. Determines WHICH R3 path is allowed, not WHETHER R3 is allowed.

### 2.1 Query

- **Aptabase chart**: built-in DAU on the home page (per [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) §"Dashboard 1 — Retention" → "DAU / WAU / MAU")
- **Event**: `app_open`
- **Metric**: distinct anonymous-session count per day
- **Range**: 14 days rolling
- **Compute**: take the **mean DAU** across the 14 days

### 2.2 Tier thresholds (verbatim from §8b)

| Mean DAU over 14d | R3 path allowed |
| --- | --- |
| **< 100** | Beta only — feature flag, 5-20 known users, TestFlight + internal Android APK, kill-switch validation. No production rollout |
| **≥ 100** | Production rollout allowed (subject to gates 2-4 passing) |
| **≥ 500** | Optional: two-arm A/B (control vs reminder cohort) for clean retention attribution |

### 2.3 Decision day input

- [ ] Mean DAU (14d rolling): _____________
- [ ] Tier: ☐ < 100 (beta) ☐ ≥ 100 (production) ☐ ≥ 500 (production + A/B)
- [ ] Screenshot of Aptabase DAU chart saved to: `docs/reports/r3-decision-2026-06-04/dau-chart.png` (or note "screenshot pending")

### 2.4 Failure-mode notes

- DAU spikes from TikTok/social campaign in the window → exclude those days, recompute mean. Document exclusion in §6 decision note.
- DAU below ~30 for many days → analytics ingestion may be lagging or AptabaseKey may be misconfigured (`aptabase-dashboard-setup.md:17-20`). Verify before reporting.

---

## 3. Gate 2 — Recent-viewed lever validated

**Source**: `reminder-system-design.md:138`.
**Threshold**: `guide_open { source: 'recent_viewed' } ≥ 5% of total guide_open`.
**Why**: if the in-app "Đã xem gần đây" surface doesn't earn taps, a notification-based re-entry surface is unlikely to land.

### 3.1 Query

- **Aptabase chart**: per [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) "Dashboard 4 — Guide source distribution"
- **Event**: `guide_open`
- **Group by**: `source` property
- **Metric**: count
- **Range**: 14 days rolling
- **Compute**: `count(source='recent_viewed') / count(total) × 100%`

### 3.2 Decision day input

- [ ] `guide_open` total count (14d): _____________
- [ ] `guide_open { source: 'recent_viewed' }` count (14d): _____________
- [ ] Recent-viewed share %: _____________%
- [ ] PASS (≥ 5%) / FAIL (< 5%): ☐ PASS ☐ FAIL

### 3.3 Failure-mode notes

- If `recent_viewed` share is 0% → check if the surface was actually wired (verify `guide_open` calls in `HomeScreen.tsx` recent-viewed section pass `source: 'recent_viewed'`).
- If `guide_open` total < 50 events → DAU too low to be meaningful (cross-check Gate 1). Recommend BETA path even if % looks OK.
- Aptabase `Dashboard 4` (per [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md):115) lists `recent_viewed` expected share as **5-15%** baseline. Below 2% = "users don't return to guides; retention problem".

---

## 4. Gate 3 — Search-driven retention signal exists

**Source**: `reminder-system-design.md:139`.
**Threshold**: `search_query count ≥ 1 per DAU on a 7-day moving average`.
**Why**: a user base that doesn't search isn't a user base that wants reminders.

### 4.1 Query

- **Aptabase chart**: per [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) "Dashboard 2 — Search" → "`search_query` count per day"
- **Event**: `search_query`
- **Metric**: count per day
- **Range**: 7 days rolling (NOT 14 — gate spec says "7-day moving average")
- **Compute**: `mean(daily search_query count) / mean(daily DAU)`

### 4.2 Decision day input

- [ ] Mean daily `search_query` count (7d): _____________
- [ ] Mean daily DAU (7d): _____________
- [ ] Ratio (queries / DAU): _____________
- [ ] PASS (≥ 1.0) / FAIL (< 1.0): ☐ PASS ☐ FAIL

### 4.3 Failure-mode notes

- Ratio between 0.5 and 1.0 → borderline. Look at the Phase 2C abandon chart ([`aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) Chart 3) — if abandon is high, users are searching but giving up. That's a retrieval problem, not a "don't want reminders" problem. Recommend DEFER + retrieval fix first.
- Ratio < 0.5 → users genuinely not searching. Don't ship reminders to a non-engaged base; ship a discovery improvement first.
- Ratio > 2.0 → very high. Cross-check that `search_query` isn't double-counted (Aptabase shouldn't dedupe; the app emits one per 800ms debounce per `analytics-events.md:80`). If genuine, this is a strongly-engaged base — reminders likely to land well.

---

## 5. Gate 4 — No active retention regression

**Source**: `reminder-system-design.md:140`.
**Threshold**: Week-2 retention at or above launch-week baseline.
**Why**: if retention is falling, reminders won't save it. Product-quality work must happen first.

### 5.1 Query

- **Aptabase chart**: built-in cohort retention (per [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) "Dashboard 1" → "New-vs-returning split")
- **Cohorts**: Week 1 (install date 2026-05-19 → 2026-05-25), Week 2 (install date 2026-05-26 → 2026-06-01)
- **Metric**: % of cohort that triggered `app_open` ≥ 1 time in the second week of their lifecycle
- **Compute**: compare Week-2 cohort D7 retention vs Week-1 cohort D7 retention

### 5.2 Decision day input

- [ ] Week 1 cohort D7 retention %: _____________%
- [ ] Week 2 cohort D7 retention %: _____________%
- [ ] Week 2 ≥ Week 1: ☐ YES (PASS) ☐ NO (FAIL — by ___ pp)

### 5.3 Failure-mode notes

- Aptabase free tier may not surface D7-cohort retention directly. Fallback compute: `count(distinct session id appearing in both Week 1 of install AND Week 2 of install) / count(distinct session id in Week 1 of install)`. If Aptabase still can't, export raw event CSV and compute manually.
- A drop of < 2 pp Week-1 → Week-2 with N < 100 per cohort is statistical noise. Treat as PASS with note: "below sample-size confidence threshold".
- A drop of ≥ 5 pp with N ≥ 100 = real regression. Do NOT ship R3 — investigate via `guide_open.source` distribution shift first.

---

## 6. Decision tree

Run gates in order. Each gate compounds — fail any of 2-4 = no R3 at any tier this cycle.

```
Gate 1 (DAU tier)
├── < 100 → R3 BETA path candidate (continue to gates 2-4)
├── ≥ 100 → R3 PRODUCTION path candidate (continue to gates 2-4)
└── ≥ 500 → R3 PRODUCTION + A/B path candidate (continue to gates 2-4)

Gates 2 + 3 + 4 (all must PASS):
├── ALL PASS → proceed with the path Gate 1 set
└── ANY FAIL → DEFER 4 more weeks. Re-evaluate on 2026-07-02.
```

### Outcome matrix

| Gate 1 tier | Gates 2-4 | Outcome |
| --- | --- | --- |
| < 100 | ALL PASS | **R3 BETA**: ship behind feature flag, opt-in 5-20 known users, validate UX + kill-switch |
| < 100 | ANY FAIL | **DEFER**: 4 weeks, re-evaluate 2026-07-02 |
| ≥ 100 | ALL PASS | **R3 PRODUCTION**: open R3 implementation PR with feature flag default OFF, rollout via opt-in toggle |
| ≥ 100 | ANY FAIL | **DEFER**: 4 weeks, re-evaluate 2026-07-02 |
| ≥ 500 | ALL PASS | **R3 PRODUCTION + A/B**: open R3 PR, two-arm experiment (control vs reminder) for retention attribution |
| ≥ 500 | ANY FAIL | **DEFER**: 4 weeks |

Per §8b:165 — **there is no "soft-yes"**. Either ship at the appropriate tier or defer with the specific gate that failed.

---

## 7. Anti-gates (instant DEFER if any TRUE)

**Source**: `reminder-system-design.md:156-161`. Check BEFORE running gates 1-4. If any anti-gate fires, skip gate evaluation entirely and defer.

| # | Anti-gate | Status on 2026-06-04 |
| --- | --- | --- |
| A1 | Team has < 2 weeks of post-launch focus available (notification UX bugs compound; rushed = bad) | ☐ TRUE ☐ FALSE |
| A2 | Apple App Review has unresolved feedback on v1.5.x | ☐ TRUE ☐ FALSE |
| A3 | Aptabase dashboards are not yet configured (gates 1-4 cannot be checked without them) | ☐ TRUE ☐ FALSE |
| A4 | Monetization, paid-acquisition, or social-content work is in flight (notifications + paid + social = 3 levers fighting for the same retention budget) | ☐ TRUE ☐ FALSE |

If ANY = TRUE → **DEFER**. Document which anti-gate fired in §10 decision note.

**Note on A4**: the J5 video pipeline at `C:\Users\thanh\japan-news-bot\pipeline_app_promo.py` (per [memory](../.claude/projects/C--viet-nhat-app-viet-nhat-app/memory/reference_japan_news_bot_pipeline.md)) is social-content work. If it's actively running and producing measurable install spikes on 2026-06-04, anti-gate A4 may fire. Check with growth ops.

---

## 8. Product / implementation gates (5-12) — pre-condition for opening R3 PR

These are NOT data gates — they're work-in-place gates. They don't block the 2026-06-04 decision itself, but if Gate 1-4 say "go", these must be cleared BEFORE the R3 PR opens. Quote: `reminder-system-design.md:143-154`.

| # | Gate | Source | Status |
| --- | --- | --- | --- |
| 5 | All 4 UI surfaces in §7 have concrete mockup + copy locked | §8b:144 | ☐ Done ☐ Pending |
| 6 | Permission-flow decision locked (default: first opt-in) | §8b:145 | ☐ Done ☐ Pending |
| 7 | Tax-season exception decision locked (default: drop fire-for-all rule) | §8b:146 | ☐ Done ☐ Pending |
| 8 | `reminder_set` / `reminder_dismissed` events typed in EventMap + documented | §8b:147 | ☐ Done ☐ Pending |
| 9 | `expo-notifications` smoke-test on real iOS + Android | §8b:151 | ☐ Done ☐ Pending |
| 10 | Quiet hours + monthly cap enforced by code (`isQuietHour`, `wouldExceedMonthlyCap` + unit tests) | §8b:152 | ☐ Done ☐ Pending |
| 11 | R3 PR feature-flagged off by default | §8b:153 | ☐ Done ☐ Pending |
| 12 | Rollback plan documented — kill-switch = one-line config flip | §8b:154 | ☐ Done ☐ Pending |

If 2026-06-04 decision = SHIP/BETA, work on gates 5-12 starts immediately. Realistic R3 PR open date = +1 week minimum (2026-06-11).

---

## 9. Cross-check with Observation Season freeze

[`observation-season-freeze.md`](observation-season-freeze.md) is ACTIVE until 2026-06-12. Per §65-71 the freeze does NOT prohibit:
- Bug fixes
- Content edits per content-governance
- Documentation maintenance
- Audits

R3 is a **new feature** (scheduling UI + permission flow + notifications layer). The freeze §22-35 explicitly forbids "new heuristic / feature from weak signal" before the cycles complete.

**Reconciliation**:
- If 2026-06-04 decision = SHIP → R3 PR work CAN start during the freeze window (design + code), but the PR cannot MERGE until 2026-06-12 minimum AND at least 1 STRONG retrieval finding ships per §52-59.
- If 2026-06-04 decision = BETA → BETA opt-in on TestFlight is internal-only, NOT a production rollout — does not violate the freeze.
- If 2026-06-04 decision = DEFER → no conflict.

**Practical implication**: even SHIP outcome means R3 in main no earlier than 2026-06-12. Schedule the R3 design / mockup / event-typing work to happen 2026-06-04 → 2026-06-11 in parallel with the rest of the observation season.

---

## 10. Decision meeting output template

Copy this section into a NEW file `docs/reports/r3-decision-2026-06-04.md` on the day. This file is the prep checklist; the decision record is separate.

```markdown
# R3 Decision — 2026-06-04

**Decision**: ☐ R3 BETA ☐ R3 PRODUCTION ☐ R3 PRODUCTION+A/B ☐ DEFER
**Decided by**: pdythanhduy
**Next review** (if DEFER): 2026-07-02

## Anti-gate check
- A1 (team focus): _____
- A2 (App Review pending): _____
- A3 (dashboards configured): _____
- A4 (other levers in flight): _____
→ Any TRUE? ☐ Yes (DEFER) ☐ No (continue)

## Data gates (window: 2026-05-19 → 2026-06-02)

### Gate 1 — DAU
- Mean DAU (14d): _____
- Tier: ☐ <100 ☐ ≥100 ☐ ≥500

### Gate 2 — Recent-viewed
- `recent_viewed` share: _____% (PASS ≥ 5%)
- Result: ☐ PASS ☐ FAIL

### Gate 3 — Search/DAU ratio
- Mean queries/DAU (7d): _____ (PASS ≥ 1.0)
- Result: ☐ PASS ☐ FAIL

### Gate 4 — Retention regression
- Wk1 D7 retention: _____% | Wk2 D7 retention: _____%
- Wk2 ≥ Wk1: ☐ PASS ☐ FAIL

## Outcome rationale
[1-3 sentences explaining the decision]

## Next actions
- [ ] [if SHIP/BETA] Start work on product gates 5-12 (target R3 PR open: 2026-06-11+)
- [ ] [if DEFER] Document which gate(s) failed and what would change them
- [ ] Cross-link this decision into `product-state-v1.5.x-prep.md`
- [ ] Update memory: project state snapshot for 2026-06-04

## Data screenshots
- DAU chart: _____
- Source distribution chart: _____
- Search-query chart: _____
- Retention cohort table: _____
```

---

## 11. Fallback if Aptabase data is unavailable / incomplete on 2026-06-04

If by 2026-06-04 morning the Aptabase dashboards are still not configured (`reminder-system-design.md:160` anti-gate A3 = TRUE):

1. **DO NOT guess from impression-level data** (App Store impressions ≠ DAU).
2. **DEFER automatically** — write the decision note as "DEFER; A3 fired; revisit when dashboards configured per [`aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) + Dashboard 1 in [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md)".
3. Set new decision day = 2026-06-04 + (days until dashboards live) + 14 (allow data accrual).

If only PARTIAL data (e.g., DAU available but cohort retention unavailable):
- Run partial gates that can be evaluated.
- If those PASS at the appropriate tier → conditional decision = "BETA-eligible pending Gate 4 confirmation by 2026-06-11".
- If those FAIL → confident DEFER.

---

## 12. What this prep doc explicitly does NOT do

- ❌ Recommend an outcome before the data is in.
- ❌ Lower the gate thresholds to "make R3 fit". §8b values are the contract.
- ❌ Skip gates because "we already know".
- ❌ Override anti-gates with optimism.
- ❌ Decide R3 scope. R3 implementation scope is governed by gates 5-12 + §7 surfaces in `reminder-system-design.md`, not by this doc.

---

## Related docs

- [`docs/reminder-system-design.md`](reminder-system-design.md) §8b — the actual contract this doc operationalizes
- [`docs/product-state-v1.5.1-prep.md`](product-state-v1.5.1-prep.md) §7 — observation plan + decision day reference
- [`docs/aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) — chart definitions for Gates 1, 2, 4
- [`docs/aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) — chart definitions for cross-checks (abandon, position)
- [`docs/observation-season-freeze.md`](observation-season-freeze.md) — freeze rules during this window
- [`docs/analytics-events.md`](analytics-events.md) — event schema (verify property names before querying)
- [`docs/retention-phase-proposal.md`](retention-phase-proposal.md) — wider retention plan (R3 is part 3 of 3)
