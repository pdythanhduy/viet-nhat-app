# Observation Season — Freeze

**Date**: 2026-05-22
**Status**: ACTIVE until 2026-06-12 (earliest re-evaluation).

The observability architecture for search and retrieval is **frozen**
as of v1.5.3 (PR #77) + v1.5.4 (PR #78). This file records that
freeze in one place so future contributors don't have to assemble
the rules from scattered docs.

---

## What is frozen

- **Analytics events**: `search_query`, `search_no_results`, `search_zero_results`, `search_result_opened`, `search_abandoned`, `fallback_guide_opened`, `home_layout_variant`, `guide_open` (with its expanded `source` enum). No new events.
- **Search heuristics**: abandon timer (10 s), analytics debounce (800 ms), min query length floor (3 chars), searcher signal threshold (5). No new heuristics. No tuning.
- **Dashboards**: the 7 charts in `docs/aptabase-phase2c-dashboard-checklist.md`. No new charts unless one of the seven retires by §11 of `docs/dashboard-sanity-checks.md`.
- **Review workflow**: weekly retrieval report from `docs/templates/retrieval-weekly-report-template.md`. No new templates, no new policy docs.

---

## Hard rules during the season

1. **No new analytics event** without strong justification:
   - "Strong" = a documented user-impacting question that the existing 8 events demonstrably cannot answer, AND privacy review confirms no PII expansion.
   - Curiosity, "while we're here", and "in case we need it later" are NOT strong.

2. **No new search heuristic before the review cycles complete.** Bug fixes to existing heuristics are allowed (they're bugs, not new heuristics). Tuning the existing constants is governed separately by `docs/no-data-action-policy.md` §4.

3. **No keyword PR from a weak signal.** A keyword PR requires the same query top-N in two consecutive weekly reports with count ≥ 5 and DAU ≥ 30 in each window. Anything weaker = carry-forward, not action. See `docs/no-data-action-policy.md` §2 + §3.

4. **No dashboard-driven panic.** A single chart row out of expected band for ≤ 2 weeks is not a crisis. Same-day reactions are forbidden; carry-forward to the next scheduled review is the only allowed response. Pre-trust the data via `docs/dashboard-sanity-checks.md` §0 + §1 before letting it move you.

5. **Default action during observation season = NO-OP.** Filing an empty `Action candidates` table in a weekly report is the expected outcome for most weeks. It is not a failure; it is the season's most likely correct output.

---

## Review cadence (the only dates that matter)

| Date | Activity | Output |
| --- | --- | --- |
| **2026-05-29** | Data review #1 — refill `docs/reports/retrieval-week-2026-05-22.md` from real Aptabase numbers | report file updated |
| **2026-06-04** | Data review #2 — file `docs/reports/retrieval-week-2026-05-29.md` from the template | new report file. Also: the existing R3-gate decision day from `reminder-system-design.md` §8b — unchanged. |
| **2026-06-12** | Earliest legitimate re-evaluation of the freeze | this file may be edited or retired |

Skipping a cadence date = the corresponding report file gets a "skipped, reason X" note. Silent omission is not allowed.

---

## What ends the freeze

The freeze may be lifted **only** when ALL of the following hold:

- 2026-06-12 has passed, AND
- At least 3 weekly retrieval reports have been filed, AND
- At least one finding has been classified STRONG per `docs/no-data-action-policy.md` §2.2, AND
- Either:
  - That STRONG finding's PR has merged and a follow-up week has been observed, OR
  - The constant-tuning data gates (≥ 14 days, ≥ 500 events per `no-data-action-policy.md` §4) have all cleared.

Until then, even if a reviewer feels "we have enough data now", the freeze is in effect. The rules exist precisely to override that feeling.

---

## What the freeze does NOT prohibit

- **Bug fixes** (crash, broken route, mis-firing event, typo in shipped string, future `lastVerified`, reserved-enum populated). Always act now.
- **Content edits** governed by content governance (not by retrieval signal).
- **Security fixes**.
- **Documentation maintenance** that doesn't expand the operating framework (e.g. correcting a stale cross-reference; updating a date that has passed).
- **Audits** (`docs/search-quality-audit-checklist.md`). Run at least monthly.

---

## Authoritative companions (read these instead of restating their rules here)

- [`docs/no-data-action-policy.md`](no-data-action-policy.md) — signal bands and the action-vs-refuse decision
- [`docs/retrieval-metric-failure-modes.md`](retrieval-metric-failure-modes.md) — what each metric can deceive you into
- [`docs/dashboard-sanity-checks.md`](dashboard-sanity-checks.md) — pre-trust checks for the data itself
- [`docs/search-quality-audit-checklist.md`](search-quality-audit-checklist.md) — manual audit workflow
- [`docs/search-known-debts.md`](search-known-debts.md) — capabilities explicitly NOT built (and what would justify reconsidering)
- [`docs/retrieval-review-playbook.md`](retrieval-review-playbook.md) — the 5-question weekly review process
- [`docs/templates/retrieval-weekly-report-template.md`](templates/retrieval-weekly-report-template.md) — the report form
- [`docs/aptabase-phase2c-dashboard-checklist.md`](aptabase-phase2c-dashboard-checklist.md) — the dashboard configuration
- [`docs/search-observability-phase-2c.md`](search-observability-phase-2c.md) §9 — rollback playbook

This freeze note is the **index card**. The companions hold the detail.
