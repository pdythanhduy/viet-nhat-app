# First-review-day runbook — 2026-05-29

**Purpose**: do the FIRST real retrieval-review cycle, in order, in ~60-90 minutes.
**Use**: open this file on 2026-05-29, follow A → I top-to-bottom, then close it.
**This is operational, NOT governance.** Rules live in the reference docs at the bottom. This runbook only sequences them.

> **No feature decisions on first review day.** A single weekly cycle cannot produce a STRONG signal (the rule requires 2 consecutive cycles). The only PRs allowed today are BUG FIX, CONTENT FIX, or SECURITY. Everything else → defer or observe.

---

## A. Pre-flight (≤ 10 min)

- [ ] `git checkout main && git pull origin main`
- [ ] Open Aptabase → project **viet-nhat-app** (EU instance)
- [ ] Verify the 7 Phase 2C charts exist in folder `Phase 2C — Retrieval` per `docs/aptabase-phase2c-dashboard-checklist.md`
  - If charts missing: TODO is config first (~45 min), then come back. Append "2026-05-29 — dashboards not yet configured, postponed N days" to §1 of the report. STOP this runbook.
- [ ] Set Aptabase time range = `Last 7 days` (Chart 7 uses 14 days)
- [ ] Have a notes app or paper ready — do NOT rely on memory across 7 charts

---

## B. Open dashboards in order (one tab each)

| # | Chart name | What to read |
| --- | --- | --- |
| 0 | Aptabase home | DAU avg, `app_open`, `home_view` (last 7d) |
| 1 | Top queries (7d) | top 10 `q` + counts |
| 2 | Zero-result queries (7d) | top 10 `q` + counts (filter `fallback_shown=true`) |
| 3 | Abandoned queries (7d) | top 10 `q` + counts + `result_count` mode |
| 4 | Position distribution (7d) | counts per bucket (0, 1, 2, 3-4, 5-9, 10+) |
| 5 | Result type distribution (7d) | counts per `result_type` |
| 6 | Fallback recovery (7d) | top 10 `guide_id` + counts + sum |
| 7 | Home layout split (14d) | counts for `cold_start` and `searcher` |

Copy each into notes verbatim. **Do not round, do not omit zero rows.**

---

## C. Cross-chart sanity — RUN BEFORE INTERPRETATION

If any check fails → that's a **BUG**, jump straight to G.B (Bug fix). Don't proceed with §D-§F until the bug PR is opened.

- [ ] `search_query` ≥ `search_zero_results` ≥ `fallback_guide_opened`
- [ ] `search_result_opened` ≤ `search_query`
- [ ] `home_layout_variant` has ONLY `cold_start` and `searcher` values
- [ ] `guide_open.source = external_share` count = 0 (reserved)
- [ ] `guide_open.source = deep_link_placeholder` count = 0 (reserved)
- [ ] `search_result_opened.position` is between 0 and 50
- [ ] `search_abandoned.ms_since_query` clusters near 10 000 ms

Full sanity table: `docs/dashboard-sanity-checks.md` §1.

---

## D. Fill the report

Edit `docs/reports/retrieval-week-2026-05-22.md`. Per its §6: **append a new section "Update 2026-05-29" ABOVE §3 Calendar**. KEEP the PENDING DATA prologue intact.

Inside the new section, copy the form structure from `docs/templates/retrieval-weekly-report-template.md` and fill these sections in order:

§0 Meta → §1 Volume → §2-§5 (top-10 tables) → §6-§9 (distributions) → §10-§12 (qualitative top-3) → §13 (evidence bands) → §14 (action candidates) → §15 (decision) → §16 (DO-NOT-act refusals) → §17 (carry-forward) → §18 (anti-overreaction checklist).

**Rules while filling**:
- DAU < 100 → round counts to nearest 10. False precision invites overreaction.
- 0 → write `0`, never leave blank.
- No data → write "no data", never fabricate.

---

## E. Run playbook Q1 → Q5 in this order (no skipping)

From `docs/retrieval-review-playbook.md`:

1. **Q1** — What are users searching for? (Chart 1) → just record, don't act.
2. **Q2** — Where does search fail? (Chart 2) → bucket each top zero-result as A / B / C / D.
3. **Q3** — What are users giving up on? (Chart 3) → cross-filter `result_count`; `=0` is coverage gap (Bucket B), `>0` is ranking signal (still observe-only on cycle 1).
4. **Q4** — Where did successful searches land? (Charts 4 + 5) → check position-0 share and `guide` share.
5. **Q5** — Does fallback rescue zero-result users? (Chart 6) → recovery rate = Chart 6 sum ÷ Chart 2 sum.

After Q5, ask the **bias check**: "Am I looking for numbers to justify a pre-formed opinion?" If yes → close the dashboard for 24 hours.

---

## F. Classify each candidate finding

| Band | Definition (full: `docs/no-data-action-policy.md` §2) | Action on cycle 1 |
| --- | --- | --- |
| **BUG** | Crash, broken route, mis-firing event (sanity check fail), typo in shipped string, future `lastVerified`, reserved enum populated | act NOW (G.A or G.B) |
| **STRONG** | Same query top-N in 2 consecutive reports + count ≥ 5 + DAU ≥ 30 each | **impossible on cycle 1** (no prior week to compare). Defer to 2026-06-04. |
| **MEDIUM** | Top-N this week with count ≥ 5 + DAU ≥ 30, but only one week so far | observe — carry forward to next week |
| **WEAK** | Count < 5, OR DAU < 30, OR generic (Bucket D), OR ambiguous (Bucket C) | refuse — record in §16 |
| **NOISE** | Single event, vibes, no chart row supports it | refuse — discard |

For pitfalls per metric (e.g. "position-0 dominance ≠ ranking is perfect"), see `docs/retrieval-metric-failure-modes.md`.

---

## G. Decision tree — pick ONE

Trace top → bottom. Stop at the first match.

### G.A — ESCALATE (crash / security / PII)
**Trigger**: app crash; broken route in production; raw query text appears in Aptabase label instead of normalized form; security regression observed.
**Do**: fix immediately as a separate session. PR `fix(security|crash): <one-line>`. Cite chart row or repro in PR body.

### G.B — BUG FIX
**Trigger**: any cross-chart sanity check (§C) fails; reserved enum populated; stuck-timer distribution; version mismatch on dashboard.
**Do**: ONE bug PR. Title `fix(observability|<area>): <issue>`. No batching with content edits.

### G.C — CONTENT FIX
**Trigger**: typo in a shipped string; factual error caught manually; `lastVerified` is in the future; a `searchKeywords` entry has a typo.
**Do**: ONE content PR. Title `fix(content): <guide-id> <issue>`. Never bump `lastVerified` just for a typo.

### G.D — DEFER (wait for 2026-06-04)
**Trigger**: interesting pattern (top query, zero-result spike, abandon rise, fallback drop) but ONLY ONE WEEK of evidence. By F's classification rules, this is MEDIUM — impossible to be STRONG on cycle 1.
**Do**: NO PR. Fill §17 carry-forward + §16 refusal record. Open `docs/reports/retrieval-week-2026-05-29.md` from the template on 2026-06-04.

### G.E — NO ACTION  ← **expected default for 2026-05-29**
**Trigger**: dashboards configured, sanity checks pass, no bug, no content error caught, all findings classify as WEAK / MEDIUM / NOISE.
**Do**:
- §15 Decision → tick **"no action"**.
- §14 Action candidates → leave empty. **This is the correct first-cycle output, not a failure** (per `observation-season-freeze.md` rule 5).
- §16 → at least 1 refusal row explaining "observed and refused".
- §18 → tick every line.
- Commit the report update directly to main as a docs-only commit (allowed by freeze rule "documentation maintenance"): `docs(report): retrieval week 2026-05-22 — 2026-05-29 update`.

---

## H. Hard floors — never act when

| Condition | Reason |
| --- | --- |
| Dashboard not configured | §2 gate of report not met |
| DAU < 30 across the window | Counts are anecdote-quality |
| `search_query` total < 50 | Top-N not statistically meaningful |
| Any top-10 row has count < 5 | Below action threshold |
| Pattern appears only this week | 2-week consecutive rule (cannot satisfy on cycle 1) |
| Bucket D generic query | Don't pin noise |
| Bucket C ambiguous query | Skip ≥ 3 cycles |
| Truncated 24-char `q` | Unknown full intent |
| "Feels right" without chart row | Vibes ≠ signal |

For any of the above → §16 refusal record, then §17 carry-forward. Do NOT open a PR.

---

## I. Close-out (≤ 5 min)

- [ ] Review §18 anti-overreaction checklist — every box ticked?
- [ ] Save and commit the report update (docs-only commit; freeze allows this).
- [ ] Push commit. No PR.
- [ ] Calendar reminder for 2026-06-04 (review #2 + R3 decision day).
- [ ] Close all 7 Aptabase tabs. **Do not browse the dashboard between cycles** — `docs/dashboard-sanity-checks.md` §11.

---

## Reference docs (read for WHY, not for sequence)

- [`docs/observation-season-freeze.md`](observation-season-freeze.md) — freeze rules, default = no-op
- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — signal bands + constant-tuning gates
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — Q1-Q5 detail
- [`docs/dashboard-sanity-checks.md`](dashboard-sanity-checks.md) — cross-chart checks + outage detection
- [`docs/retrieval-metric-failure-modes.md`](retrieval-metric-failure-modes.md) — what each metric can deceive you into
- [`docs/aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) — chart setup
- [`docs/templates/retrieval-weekly-report-template.md`](templates/retrieval-weekly-report-template.md) — the form
- [`docs/search-known-debts.md`](search-known-debts.md) — capabilities explicitly NOT built
- [`docs/product-state-v1.5.2-prep.md`](product-state-v1.5.2-prep.md) §13-§14 — sprint scope + Observation Season Rules
