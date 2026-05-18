# Aptabase dashboard — setup

**Goal**: turn the Aptabase event stream into 5 decision-quality dashboards.
**Owner**: pdythanhduy.
**Effort**: 2-3 hours one-time setup. Daily glance takes 2 min.

This doc is the operational complement to [`docs/analytics-decision-map.md`](analytics-decision-map.md). The decision-map says WHAT to measure. This doc says WHERE to look in Aptabase.

---

## Pre-flight

1. Sign in to https://aptabase.com (or the EU instance — confirm in your account settings)
2. Confirm the app key in `app.json → expo.extra.aptabaseAppKey` matches the project in Aptabase
3. Verify events are flowing: open the dev app, do any action, refresh Aptabase dashboard. The event should appear within a few minutes

If no events appear after 10 minutes:
- Check `__DEV__` in Metro log — events should `console.log` regardless
- Check `getAptabaseKey()` returns non-null at app start
- Check network reachability to the EU instance from the device

---

## Dashboard 1 — Retention

**Question**: do users come back?

### Charts

| Chart | Aptabase setup |
|---|---|
| DAU / WAU / MAU | Built-in. Default Aptabase home page |
| Re-visit rate | Custom: count of `guide_open` where `source = recent_viewed` / total `guide_open` |
| Save rate by category | Custom: count of `guide_save` grouped by `category` property |
| Unsave-within-24h rate | Custom: for each `guide_id`, count of `guide_save` followed by `guide_unsave` within 24h. High value = quality issue with that guide |
| New-vs-returning split | Built-in cohort: install date vs. current session |

### Decision thresholds

- DAU / install < 10% after week 2 → product doesn't stick. Investigate via `search_no_results` + survey
- Re-visit rate < 5% → "Đã xem gần đây" surface isn't earning placement. Consider removing or repositioning
- Save rate < 1% across all guides → bookmark icon is invisible or unappealing. UX issue
- Unsave-within-24h > 30% for a specific guide → content quality issue. Audit that guide

---

## Dashboard 2 — Search

**Question**: does search work?

### Charts

| Chart | Aptabase setup |
|---|---|
| `search_query` count per day | Built-in event count |
| `search_query → guide_open { source: 'search' }` conversion | Funnel: 2 steps, both events tagged with anonymous session id |
| Average `q_length` distribution | Histogram of `q_length` property |
| `result_count` distribution | Histogram of `result_count` property — see how many results queries return |
| Top-N `q` values | Group-by `q` property, sort by count desc, limit 50 |

### Decision thresholds

- Conversion `search_query → guide_open(search)` < 30% → ranking is poor. Trigger Phase 2C
- Average `q_length` > 15 → users typing long phrases that ranking can't match. Consider tokenization
- Top-N `q` values containing surprises → keyword top-up candidates (Phase 2C)

---

## Dashboard 3 — Failed queries (Phase 2C input)

**Question**: which content / keywords are missing?

### Charts

| Chart | Aptabase setup |
|---|---|
| `search_no_results` count | Built-in event count |
| `search_no_results` rate | Custom: count `search_no_results` / count `search_query` |
| Top-50 failed `q` values | Group-by `q` property, sort by count desc |
| Length distribution of failed queries | Histogram of `q_length` on `search_no_results` |

### Decision rules (from `search-phase2c-data-checklist.md`)

Bucket each top-50 failed query:

- **A** keyword gap → add to matching guide's `searchKeywords`
- **B** content gap → add to content backlog (not auto-create)
- **C** out of scope (job listings, dating, etc.) → ignore
- **D** typo → park until typo-tolerance decision

Run this bucketing 2 weeks post-launch, then quarterly.

---

## Dashboard 4 — Guide source distribution

**Question**: which discovery surface earns its slot?

### Charts

| Chart | Aptabase setup |
|---|---|
| `guide_open` by `source` | Stacked bar chart, x-axis = day, stacks = source enum values |
| Daily share % per `source` | Same data, normalized to 100% |
| Top guides per `source` | Group-by `guide_id` filtered to one `source` at a time, top 10 each |

### Decision thresholds

| `source` | Expected share | Action if below |
|---|---|---|
| `direct` | 40-60% | (normal) |
| `search` | 20-40% | < 10% → search isn't discoverable; investigate Home placement |
| `featured` | 5-15% | < 3% → "Hay được dùng" surface dead; rotate or remove |
| `related` | 5-15% | < 3% → related-guides UI invisible at bottom; consider moving up |
| `recent_viewed` | 5-15% | < 2% → users don't return to guides; retention problem |

---

## Dashboard 5 — Share / save / open funnel

**Question**: do users go from passive read → active retain → growth advocate?

### Funnel steps

1. `guide_open` — read
2. `guide_save` — retain (R1 signal)
3. `guide_share` — advocate (G1 signal)

### Charts

| Chart | Aptabase setup |
|---|---|
| `guide_open → guide_save` rate | Funnel: 2 steps, same session |
| `guide_open → guide_share` rate | Funnel: 2 steps, same session |
| `guide_save → guide_share` rate | Funnel: 2 steps, same session |
| `guide_share` `completed: true` vs `false` ratio | Group-by `completed`, two-bar chart |

### Decision thresholds

- `guide_save / guide_open` < 1% → save UX is invisible. Tap target too small? Icon unclear? Run a 5-user usability check
- `guide_share / guide_open` < 0.5% → share lever weak. Either users don't see value in sharing OR the share button is hard to find
- `guide_share { completed: false }` > 70% on iOS → iOS share-sheet UX is the bottleneck. Investigate. Acceptable on Android (Material share is more cancel-prone)

---

## 2-week post-launch review process

### Day 1 (launch day)

- Check `app_open` count — confirm users are getting in
- Watch Metro logs / Sentry / native crash for any crash spike
- If crash spike → execute rollback per `v1.5.0-release-execution.md` §5

### Day 3

- Aptabase dashboard 1-2 should show real numbers
- Check `home_view` count vs `app_open` count — ratio should be ~1.0 (every session reaches Home). If lower, navigation regression

### Day 7

- Full sweep of dashboards 1-5
- Identify the lowest-performing surface (worst share %)
- Mark for review at Day 14 (NOT for action yet — 1 week is noise)

### Day 14 — Phase 2C / retention decision gate

Use `search-phase2c-data-checklist.md` step-by-step:

- [ ] Top-50 failed `q` values pulled and bucketed
- [ ] `guide_open.source` distribution snapshot taken
- [ ] Save / share / unsave-within-24h checked per Dashboard 1 & 5
- [ ] Decision: ship Phase 2C keyword top-up OR wait another week

Use `retention-phase-proposal.md` for the retention Surface 2+3 decision:

- [ ] If `recent_viewed` source share > 8% → retention lever works → ship Surface 2 (reminders)
- [ ] If `recent_viewed` source share < 3% → retention lever weak → re-evaluate before adding more surfaces

---

## Aptabase-specific notes

- **Free tier** covers ~20K events/month. Enough for first 200-500 DAU
- **EU instance** = privacy-friendly default. We're on EU
- **No user-id mapping** by default. Aptabase rotates a session id every hour; we don't persist or read it
- **Custom dashboards** are saved to your Aptabase account, not in this repo. Export to JSON if you want to version-control (Aptabase supports dashboard export under settings)
- **Retention** in Aptabase = user-cohort retention (does the same anonymous session id appear N days later). It's coarser than what some analytics tools offer but matches our privacy posture (no user-id)

---

## What we explicitly do NOT add to dashboards

Per the decision-map's privacy boundaries:

- ❌ Per-user behavior pages (no per-user identity)
- ❌ Geo / IP mapping (Aptabase doesn't collect; we don't enable)
- ❌ Device-model heatmaps with cross-event joins (re-identification risk)
- ❌ A/B test groups for notification copy (out of scope; see reminder-system-design.md)
- ❌ Funnel that includes raw search `q` text in the chart label (always show normalized form only)
- ❌ Push notification open rate dashboards (no push backend; only local notifications)

---

## Re-evaluate this doc

Quarterly. Add a dashboard only if a recurring product question has no chart today. Remove a dashboard if 8 weeks of viewing it produced no decision.
