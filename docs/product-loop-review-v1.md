# Product Loop Review — v1

**Date**: 2026-05-18
**Branches reviewed**: feat/saved-guides-phase1 (#64) · feat/reminder-hooks-foundation (#65) · feat/home-ux-clarity-phase1 (#66) · feat/analytics-maturity-phase1 (#67) · feat/growth-readiness-phase1 (#68)
**Status**: all 5 PRs open + green CI, none merged yet. Doc captures what shipped to PR (not what landed on main).

---

## 1. Retention improvements shipped (to PR)

### R1 — Saved/Favorite Guides (#64)

- New "Đã lưu" guide-only Home section, hidden when empty, placed between "Đã xem gần đây" and "Hay được dùng"
- Layered on existing `bookmarks_v1` storage — no duplicate storage system
- `logBookmarkToggled('guide', …)` no longer no-ops: fires `guide_save` or `guide_unsave` with category propagated
- `HomeSavedGuides` component (87 LOC) mirrors `HomeFeaturedGuides` styling
- 4 unit tests pin the analytics wiring; existing bookmark behavior untouched

### R2 — Reminder hook foundation (#65)

- Data model + storage skeleton for 5 reminder kinds: `visa-renewal` / `tax-season` / `moving` / `insurance-renewal` / `mynumber`
- `DEFAULT_PREFERENCES`: opt-OUT defaults, 4-notifications/month hard cap
- `shouldFire(hook, prefs)` — pure 3-switch gate (global / per-kind / per-hook)
- 11 unit tests cover schema, defaults, defensive merge with old-client prefs, corrupt-JSON survival
- **No scheduling, no UI, no notification permission requests** — those land when product UX is approved
- 250-line design doc captures philosophy ("calm utility, never engagement bait"), anti-spam rules, privacy posture, local-vs-cloud decision, suggested timing, 5 open questions for implementation

### Other retention surfaces already on main (Phase 2B + earlier)

- "Đã xem gần đây" recently-viewed surface (Phase 2B / PR #62)
- "Hay được dùng" featured row (Phase 2B / PR #58)
- "Xem thêm liên quan" related-guides on every detail screen (Phase 2B)

---

## 2. UX improvements shipped (to PR)

### UX1 — Home clarity (#66)

- New "Bắt đầu ở đâu?" cold-start row with 5 entry shortcuts (Mới sang Nhật / Visa / Thuế / Khẩn cấp / Đi làm)
- Placed below the search/ask CTAs, above the existing quick-actions row
- Reuses existing nav targets — no new routes
- 95-LOC isolated `HomeStartHere` component; net +28 LOC in HomeScreen.tsx

**What UX1 did NOT change** (per "no redesign" rule):
- Did not reorder the 12 entrenched mid-page sections — that risks regressions in checkpoint/progress wiring
- Did not promote a duplicate Emergency CTA card — the new row's "Khẩn cấp" shortcut already covers the top-of-screen access requirement
- Did not remove the bottom Emergency contacts section (different traffic — phone numbers vs. hub)

---

## 3. Analytics maturity progress

### Events added this loop

| Event | PR | Privacy |
| --- | --- | --- |
| `guide_save` | #64 | enum-only payload |
| `guide_unsave` | #64 | enum-only payload |
| `emergency_cta_open` | #67 | source enum: 5 surfaces |
| `home_start_here_pressed` | #67 | shortcut_id enum: 5 chips |
| `guide_share` | #68 | guide_id + completed bool only — no destination leak |

### Decision-map doc (#67)

`docs/analytics-decision-map.md` — 250-line product-question ↔ event map across 7 domains:

1. Acquisition / activation
2. Discovery (search / featured / related / direct / recent_viewed)
3. Retention (R1)
4. Emergency / safety (A1)
5. Cold-start discovery (UX1 forward-compat)
6. Engagement (Daily Ritual)
7. Mail Translate (mock)

Plus explicit NOT-tracked list, privacy boundaries (aggregate-only, bounded enums, EU instance), 6 retention metrics for post-v1.5.0 dashboard, 7-step checklist for adding any new event.

### Privacy posture intact

- Raw search queries: still NEVER sent. 24-char normalized form only, pinned by `analytics.test.ts` (22 cases)
- No new PII surface in this loop. Every new event carries bounded enums or public-as-content IDs

---

## 4. Growth readiness progress

### G1 — Native share + ASO + social playbook (#68)

- `shareGuide()` util — RN built-in `Share.share()`, no new dependency, no social SDK
- Share button in `AdminDetailScreen` header
- Marketing URL placeholder (`https://camnangvietnhat.app`) — will become real app-link in a later phase
- `guide_share { guide_id, completed }` event — destination (Zalo/Messenger/SMS/copy) intentionally NOT tracked

### Strategy docs

- `docs/social-content-engine.md` (250 lines) — 5 TikTok/Shorts hook formats, top-10 high-share guide priority, emotional triggers (fear/help balance), CTA allowed/forbidden lists, publishing cadence, compliance gate
- `docs/aso-strategy-v1.md` (200 lines) — title/subtitle options for App Store + Play Store, keyword fields for vi+en locales, first-252-char description snippet, competitor comparison, "Cẩm nang sống ở Nhật cho người Việt" positioning analysis, 6-month timeline, ineligible tactics

Both docs gate against the existing `docs/content-governance.md` compliance rules (no guarantees, no loophole, no gov-impersonation).

---

## 5. Remaining bottlenecks (in priority order)

### Operational

1. **5 PRs awaiting merge** (#64-#68). All green, all mergeable, all stack cleanly (each branches from main, no cross-dependencies except cosmetic). Reviewer bandwidth is the bottleneck.
2. **Device smoke test not yet run on v1.5.0 main** (#57+#58+#59+#60+#61+#62 already merged). `docs/search-discovery-phase2b-smoke-test.md` is the gate. ~5 min on real device.
3. **App Store screenshots may still be v1.4 era** — `docs/v1.5.0-app-store-audit.md` captures the 6-screenshot redesign proposal but no work has been done.
4. **EAS production build not yet triggered** against current HEAD (`ae8e555` before this loop's PRs; would shift after merges).

### Product

5. **Reminder scheduling not implemented** — R2 (#65) ships only data model + design doc. The full scheduler / opt-in flow / notification permission UI is a future phase. Estimated effort: 2-3 days.
6. **No real app-link / universal-link infrastructure** — G1 (#68) ships a placeholder marketing URL. Real deep-links to specific guides need Expo Linking config + iOS Associated Domains + Android intent filters. Estimated: 1 day.
7. **AdminDetailScreen still 2202 LOC** (now ~2220 with R1's bookmark hook + G1's share button). Refactor candidate per `docs/technical-debt-review-2026-05.md`.
8. **HomeScreen still 1206+ LOC** (now ~1234 with UX1's new row). Same refactor track.
9. **25 of 127 admin guides still lack `searchKeywords`** — wait for Phase 2C analytics-driven top-up per playbook.

### Strategic

10. **No content production yet** — `docs/social-content-engine.md` is a playbook. Producing the first 10 short-form videos is the first growth lever. Estimated: 2-3 weeks part-time.
11. **No real ASO changes submitted** — `docs/aso-strategy-v1.md` is a strategy. The keyword field updates + subtitle change can ship with v1.5.0 metadata update.
12. **No analytics dashboard exists yet** — Aptabase dashboard needs setup with the 6 retention metrics. Estimated: 2-3 hours.

---

## 6. Next roadmap recommendation

### Immediate (this week)

1. Review + merge #64-#68 (5 PRs, all green)
2. Run device smoke test against post-merge main
3. Aptabase dashboard setup with the decision-map's 6 retention metrics
4. Decide on App Store metadata strategy (carry v1.4 assets OR ship the keyword/subtitle changes from `aso-strategy-v1.md` with the v1.5.0 binary)

### Pre-release (next 1-2 weeks)

5. EAS production build against the post-merge main
6. TestFlight / internal-track smoke on the actual build artifact
7. Submit to App Store + Play Store with v1.5.0 release notes from `docs/v1.5.0-changelog.md`

### Post-release wait (2 weeks)

8. Collect data. Don't ship new features. Watch the 6 retention metrics.
9. Identify which retention surface earns its slot (Featured / Recent / Saved / Related) via `guide_open.source` distribution
10. Identify failed search queries via `search_no_results` for Phase 2C keyword top-up

### Post-data (week 3-4)

11. Phase 2C — analytics-driven keyword tuning per `docs/search-phase2c-data-checklist.md`
12. Reminder scheduling implementation (R2 → R3) IF data shows visa/tax-related guides have high re-visit rate via `recent_viewed` source
13. App Store screenshot refresh per `docs/v1.5.0-app-store-audit.md` IF install conversion < 3%

### Growth (month 2-3)

14. First social content cycle — produce 10 short-form videos using formats A/B/E from `social-content-engine.md`
15. Track `guide_share` rate vs. external platform metrics
16. Re-rank the top-10 high-share guide priority list with real data

### Tech debt (month 2-3, parallel)

17. AdminDetailScreen split into 4-5 sub-components per `docs/technical-debt-review-2026-05.md`
18. HomeScreen sectioning split — second-priority because more entrenched state

### Strategic (month 3+)

19. Real app-link infrastructure (replaces G1's placeholder marketing URL)
20. Evaluate paid acquisition IF organic > 100 installs/week sustained
21. Re-evaluate JLPT pipeline IF dataset/license is verified clean (still HOLD)
22. Re-evaluate AI Mail IF compliance gates from decision log are cleared

### Out of scope (still)

- Monetization (no IAP, no premium, no ads) — wait for PMF signal at month 6+
- My Japan Plan #35 — HOLD per durable direction
- JLPT — protected by direction
- Backend infrastructure — none built; nothing in this loop required it

---

## 7. Summary metrics

**This loop**:
- 5 PRs opened (#64-#68)
- ~1,500 LOC added across code + tests + docs
- 4 new analytics events
- 5 new docs (`bookmarkAnalytics.test`, `analytics-decision-map`, `reminder-system-design`, `social-content-engine`, `aso-strategy-v1`)
- 11 new unit tests (R2: 11, R1: 4, others: 0 — covered by existing suites)
- 0 new dependencies
- 0 architecture changes
- 0 UI redesigns
- 0 PII surface expansions

**Cumulative since v1.4.0** (App-Review-approved):
- 12 PRs merged + 5 PRs in flight
- 313 → 313 tests on main (each phase added tests but only PR #64 + #65 add unit-test count when they land)
- 127 admin guides — content moat unchanged
- 0 schema breaks
- All v1.5.0 docs ready (release checklist, changelog with EN/VI release notes, App Store audit, retention proposal, tech debt review)

---

## 8. Mindset check

Per the direction: "We are no longer just building content. We are building: habit, trust, discoverability, retention, product loop — without losing simplicity."

| Pillar | Status |
| --- | --- |
| **Habit** | Daily Ritual exists. R1+R2 are foundation for visa/tax recurring hooks. UX1 cold-start helps newcomers stick |
| **Trust** | 127 sourced guides + compliance discipline + decision-map privacy boundary + opt-out reminder defaults |
| **Discoverability** | Phase 2A+2B already shipped. UX1 cold-start row addresses the "I don't know what to type" gap |
| **Retention** | R1 saved guides + R2 reminder foundation. Real lift waits for actual analytics data |
| **Product loop** | Decision map (#67) closes the analytics→action loop. Phase 2C playbook closes the search→content loop |
| **Simplicity** | No new dependency, no redesign, no backend, no monetization. AdminDetailScreen and HomeScreen are growing but every addition is isolated component-by-component |

---

## Related docs (created in this loop or earlier)

- [`docs/v1.5.0-release-checklist.md`](v1.5.0-release-checklist.md)
- [`docs/v1.5.0-changelog.md`](v1.5.0-changelog.md)
- [`docs/v1.5.0-app-store-audit.md`](v1.5.0-app-store-audit.md)
- [`docs/v1.5.0-final-release-status.md`](v1.5.0-final-release-status.md)
- [`docs/v1.5.0-release-execution-commands.md`](v1.5.0-release-execution-commands.md)
- [`docs/search-discovery-phase2b-smoke-test.md`](search-discovery-phase2b-smoke-test.md)
- [`docs/search-phase2c-data-checklist.md`](search-phase2c-data-checklist.md)
- [`docs/retention-phase-proposal.md`](retention-phase-proposal.md)
- [`docs/reminder-system-design.md`](reminder-system-design.md) ← new this loop
- [`docs/analytics-decision-map.md`](analytics-decision-map.md) ← new this loop
- [`docs/social-content-engine.md`](social-content-engine.md) ← new this loop
- [`docs/aso-strategy-v1.md`](aso-strategy-v1.md) ← new this loop
- [`docs/technical-debt-review-2026-05.md`](technical-debt-review-2026-05.md)
