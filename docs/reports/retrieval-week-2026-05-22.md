# Retrieval weekly report — week of 2026-05-22

> First report of the v1.5.3 operating loop. Status: **PENDING DATA —
> Phase 2C observability merged at d219968 on 2026-05-21 — needs ≥ 7
> days of production traffic before any row is fillable.**

Template: [`docs/templates/retrieval-weekly-report-template.md`](../templates/retrieval-weekly-report-template.md)
Policy: [`docs/no-data-action-policy.md`](../no-data-action-policy.md)
Playbook: [`docs/retrieval-review-playbook.md`](../retrieval-review-playbook.md)

---

## 0. Meta

| Field | Value |
| --- | --- |
| Week range (ISO Mon-Sun) | 2026-05-18 → 2026-05-24 (partial — instrumentation began 2026-05-21) |
| Report filed | 2026-05-22 (initial; data review re-fill 2026-05-29) |
| Reviewer | pdythanhduy |
| App version observed | v1.5.0 (build 26) — iOS only; Android not yet built |
| Commit at start of week | `e4d110d` (v1.5.1 foundation) |
| Commit at end of week | `d219968` (Phase 2C observability) |
| Days of data in window | < 2 (instrumentation just landed) |
| Aptabase dashboard URL(s) | TBD — dashboards not yet configured |

**Insufficient on its own.** Per `no-data-action-policy.md`, this
report is filed as a placeholder, not as a basis for any action.

---

## 1. Status — why this report is empty

- Phase 2C observability merged at `d219968` on 2026-05-21.
- Events `search_zero_results`, `search_result_opened`,
  `search_abandoned`, `fallback_guide_opened`, `home_layout_variant`,
  and the expanded `guide_open.source` only start flowing from
  installs that already have the v1.5.0-build-26-or-later binary AND
  have opened the app since 2026-05-21.
- Even on iOS-only, app version distribution lags. Expect mostly
  trickled events for the first 3-5 days.
- Android is not yet built — no Android signal at all.
- Aptabase dashboards (per `docs/aptabase-phase2c-dashboard-checklist.md`)
  must be configured before any row in this report can be filled with
  real numbers. **DO NOT fabricate placeholder data to make the form
  look filled.**

---

## 2. Gates that must hold before this report becomes actionable

Per `no-data-action-policy.md`:

- [ ] **≥ 7 days of production data** with v1.5.0 build 26+ traffic
- [ ] **Aptabase 7-chart dashboard configured** per
      `docs/aptabase-phase2c-dashboard-checklist.md`
- [ ] **DAU ≥ 30** across the window (lower = mark every row WEAK)
- [ ] **`search_query` count ≥ 50** across the window (lower = top-N
      is anecdote-quality)
- [ ] **`search_zero_results.fallback_shown=true` confirmed present**
      (smoke check that the new event actually fires from the
      dead-end branch)
- [ ] **`home_layout_variant` showing both `cold_start` and `searcher`**
      values appear at least once each (confirms the heuristic is
      wired, not that the threshold is right — that's a separate
      14-day gate)

---

## 3. Calendar

| Date | Milestone |
| --- | --- |
| 2026-05-21 | Phase 2C instrumentation merged (`d219968`) |
| 2026-05-22 | v1.5.3 signal-to-action operating layer merged (this PR) — first report filed (this file) |
| **2026-05-29** | **Data review target** — refill this same file with whatever data exists. If gates above hold, run §4-§19 of the template. If they don't, append a "still pending" entry to §1 and carry forward. |
| **2026-06-04** | **Decision review target** — by this date a SECOND weekly report (`retrieval-week-2026-05-29.md`) must exist. Any keyword PR requires the same query to be top-N in BOTH this report AND the 05-29 report. Also: the existing 2026-06-04 R3-gate decision day from `reminder-system-design.md` §8b — unchanged by this PR. |
| 2026-06-12 | Earliest "v1.5.3 retro" date — only run if all 3 cycles produced at least one actionable row OR explicit refusal record |

---

## 4. Refusal record (this cycle)

Per template §16. The following candidates exist conceptually but
**must not** be acted on this cycle:

| Candidate | Reason refused |
| --- | --- |
| Any keyword PR | No data yet. Single-week observation is insufficient. |
| Any `SEARCHER_THRESHOLD` tune | Hard gate: ≥ 14 days of `home_layout_variant` data required. |
| Any `SEARCH_ABANDON_WINDOW_MS` tune | Hard gate: ≥ 500 `search_abandoned` events across ≥ 14 days (per `SearchScreen.tsx` constant comment). |
| Any `ANALYTICS_DEBOUNCE_MS` tune | Same hard gate as above. |
| Any ranking weight change | Wait for 2 consecutive reports per playbook §4. |
| Any UX redesign of Home/Search | Explicit refusal in `product-state-v1.5.2-prep.md` §1. |

---

## 5. Carry-forward queue

Nothing carried forward yet — this is the first report. Add rows
starting in the 2026-05-29 report once §2 gates begin to clear.

---

## 6. Notes

- Template at `docs/templates/retrieval-weekly-report-template.md`.
- When refilling this file on 2026-05-29, **append** an "Update
  2026-05-29" section above §3; do not delete the "PENDING DATA"
  prologue — it's the historical record that this cycle started cold.
- Subsequent weeks open a new file `retrieval-week-YYYY-MM-DD.md`
  using the template as-is.
