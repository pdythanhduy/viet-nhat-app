# Post-launch observation plan

**Purpose**: keep the team disciplined about what to watch (and what NOT to optimize) in the first 4 weeks after v1.5.0 ships.
**Owner**: pdythanhduy.

The temptation after shipping is to ship more. This doc is the antidote — observe first, build later.

---

## Week 1 — survive

The goal of week 1 is: **find out if anything is broken**. Nothing else.

### Watch daily

| Signal | Source | Threshold for action |
|---|---|---|
| Crash reports | App Store Connect / Play Console (or Sentry if added) | ANY crash > 0.5% of sessions → investigate same day |
| `app_open` count | Aptabase Dashboard 1 | Sudden drop > 30% day-over-day → check if app fails to launch |
| `search_no_results` rate | Aptabase Dashboard 3 | Spike > 60% → check if search index broke in production |
| Save usage | `guide_save` count | If 0 across 100+ users for 3+ days → bookmark icon may be invisible |
| Recently-viewed usage | `guide_open { source: recent_viewed }` | If 0 across 100+ users → storage may not persist |
| Home view → guide open conversion | `home_view` → first `guide_open` | If < 30% → Home overwhelms users |

### DO NOT in week 1

- ❌ Ship new features
- ❌ Change ranking thresholds
- ❌ Refactor anything
- ❌ Tweak copy based on n < 100 user feedback
- ❌ Run A/B tests
- ❌ Promote on social yet (wait until stability confirmed)

### Week 1 deliverable

A single Slack/note message at end of week:
- "v1.5.0 week 1 stability: GREEN / YELLOW / RED"
- "Top issue: [one line]"
- "Next action: [observe more / hotfix v1.5.1 / OK to proceed week 2]"

---

## Week 2 — observe behavior

The goal of week 2: **see how users actually use the discovery + retention surfaces**.

### Watch (weekly review, not daily)

| Signal | Source | What it tells us |
|---|---|---|
| **D1 retention** (% of installs that open app on day 2) | Aptabase install cohort | < 25% = onboarding/value-prop weak. > 40% = strong |
| **Guide share behavior** | `guide_share` counts; `completed: true` vs `false` ratio | Which guides earn shares. Per-platform completion rate |
| **Top "Bắt đầu ở đâu?" shortcut** | `home_start_here_pressed` by `shortcut_id` (after wiring lands) | Validates the cold-start hypothesis |
| **Emergency CTA usage** | `emergency_cta_open` by `source` | Confirms emergency surface placement is right |
| **Search ranking anomalies** | Aptabase Dashboard 2 — top `q` values | Any obvious failure that didn't appear in tests |
| **`guide_open.source` distribution** | Aptabase Dashboard 4 | Identifies the strongest + weakest discovery surface |

### Allowed actions in week 2

- ✅ Update App Store metadata if a stale claim is found (no binary change)
- ✅ Add a single keyword to a guide if `search_no_results` is dominated by that exact term (3+ occurrences)
- ✅ Triage Sentry / crash logs into v1.5.1 backlog
- ✅ Document anomalies in `docs/post-launch-anomalies-2026-05.md` (new doc; format: query → cause → action)

### DO NOT in week 2

- ❌ Ship Phase 2C yet — wait for 14-day sample
- ❌ Implement reminder scheduling (R3) yet — wait for `recent_viewed` source share data
- ❌ Add new analytics events because "we'd want to know" — see decision-map §7 checklist
- ❌ Promote a hidden feature (AI Mail, My Japan Plan)
- ❌ Add a new dependency
- ❌ Touch JLPT

### Week 2 deliverable

A single review note:
- D1 retention: X%
- Top failed query: "..."
- Most-tapped Start Here shortcut: ...
- Strongest discovery surface: ...
- Weakest discovery surface: ...
- Recommendation: continue observing / start Phase 2C planning / ship hotfix

---

## Week 3-4 — decide

The goal of weeks 3-4: **make 2-3 informed decisions, then ship the smallest possible change**.

### Phase 2C decision gate

Per [`search-phase2c-data-checklist.md`](search-phase2c-data-checklist.md):

- [ ] Pull top-50 failed `q` values from week 1-2 (28 days minimum sample if possible; 14 days OK if user volume is high)
- [ ] Bucket each: A keyword-gap / B content-gap / C out-of-scope / D typo
- [ ] If bucket A has ≥ 10 entries → ship Phase 2C keyword top-up PR (max 8 guides, 15 keywords each)
- [ ] If bucket B has ≥ 5 entries → log as content-backlog candidates (NOT auto-create)
- [ ] If bucket D > 15% → revisit typo-tolerance decision (Phase 2D, not 2C)

### Retention Surface 2 (reminders) decision gate

Per [`retention-phase-proposal.md`](retention-phase-proposal.md):

- [ ] If `guide_open { source: recent_viewed }` share > 8% over 2 weeks → users re-visit. Implementing reminders has clear ROI. Ship R3 (scheduler + UI for the 5 reminder kinds)
- [ ] If 3-8% → ambivalent. Implement Surface 3 (daily-rotating guide) first; revisit Surface 2 after
- [ ] If < 3% → retention isn't an obvious lever. DON'T add notifications. Investigate why users don't return (usability test, survey)

### Growth optimization candidates

- [ ] If `guide_share { completed: true }` count > 10/day → social content lever works. Plan first content cycle per `social-content-engine.md`
- [ ] If `guide_share` count near zero → share icon discoverability issue OR user motivation issue. Don't increase frequency — investigate UX first
- [ ] If install conversion (App Store impression → install) < 3% → screenshot redesign per `v1.5.0-app-store-audit.md`

### Allowed actions in week 3-4

- ✅ ONE Phase 2C PR with keyword top-ups (only if bucket A justifies)
- ✅ ONE retention-scheduler PR (only if Surface 2 gate met)
- ✅ App Store metadata update OR screenshot redesign (only if conversion justifies)
- ✅ First social content batch (only if share data justifies)

### DO NOT in week 3-4

- ❌ Implement more than 2 of the above in the same 2-week window
- ❌ Ship retention Surface 2 AND Surface 3 simultaneously — sequential only
- ❌ Build AdminDetailScreen refactor — still tracked as tech debt; not unblocked by data yet
- ❌ Resume My Japan Plan, JLPT, AI Mail
- ❌ Add monetization

---

## What NOT to optimize too early

Hard rules. Each of these is a documented anti-pattern:

| Don't | Why |
|---|---|
| **Tune search ranking weights** based on single-week data | Noise. Wait for 14-day sample minimum |
| **Add reminder kinds** beyond the 5 in R2 schema | Schema migration with analytics implications |
| **Rotate featured guides daily** without data | Surface 3 of retention proposal — gated on Surface 1 + 2 outcomes |
| **Refactor monolithic screens** before retention/discovery levers are validated | Refactor is risk-without-reward unless we're adding to those screens. Wait until we have a real next feature that requires it |
| **A/B test notification copy** | See reminder-system-design.md §8 — outright refusal |
| **Add a community feature** ("comments on guides") because the share rate is low | Different lever. Adds maintenance burden + moderation. Not on the roadmap |
| **Switch analytics provider** because "Aptabase is too basic" | The basics are exactly what we need for v1.5.0. Switching providers is week-of-work and re-instrument cost |
| **Implement deep-links / app-links** because the share URL is a placeholder | Real app-links need iOS Associated Domains + Android intent filters + DNS records. Worth doing ONLY when we have proof the share lever drives installs |

---

## Warning signs of overbuilding

Watch for these in own / team behavior:

1. **"While we're at it..."** — adding a second change to a PR because it's nearby. Refuse; ship the focused change first
2. **Building a second retention surface before the first one is measured** — Surface 1 (Đã xem gần đây) + Surface 2 (reminders) + Surface 3 (daily guide) is sequential, NOT parallel
3. **Adding new analytics events because "we'd want to know"** without a product question — see decision-map §7 checklist
4. **Refactoring "to make the next feature easier"** when there is no next feature committed
5. **Adding feature flags / config flexibility** for hypothetical futures
6. **Writing docs about a feature before observing real usage** — speculative docs decay fastest
7. **Optimizing the build pipeline** when ship cadence is monthly and build takes 20 min
8. **Re-running benchmarks** without a hypothesis to test

If you catch yourself doing one of these: pause, re-read this doc, ship the focused thing.

---

## Decision-quality bar

Each post-launch decision should answer:

1. **What product question does this answer?** (1 sentence; from `analytics-decision-map.md`)
2. **What is the sample size?** (n < 100 = too small for ranking decisions; n < 30 = too small for any decision)
3. **What is the reversal cost?** (1-day reversal = ship now; 1-week reversal = wait one more week of data)
4. **Does it move one of the 6 retention metrics?** (Dashboard 1-5 from `aptabase-dashboard-setup.md`)
5. **Is it the SMALLEST change that moves the metric?** (Always prefer the smaller change)

If you can't answer #1 in a sentence → don't ship.
If #4 is "no" → it's not a retention lever, it's noise.
If #5 is "no" → you're overbuilding; find the smaller version.

---

## Calendar template

Suggested re-use for v1.6+ launches:

- Week 1: stability check (1 daily glance, weekly summary)
- Week 2: behavior observation (weekly summary)
- Week 3-4: 2-3 informed decisions → ship smallest version of each
- Week 5-8: observe the impact of week-3-4 changes
- Week 9+: next planning cycle

If a week passes with no decision and no anomaly: that's success. The product is stable.
