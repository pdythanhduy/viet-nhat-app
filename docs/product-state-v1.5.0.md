# Product state — v1.5.0

**Date**: 2026-05-18
**Main HEAD**: `0da05a3` (after #64-#69 merged)
**Release status**: execution-ready, awaiting device smoke + EAS authorization

This doc is the single-page answer to "where is the product right now?"

---

## 1. Current strengths

### Content moat
- **127 admin guides** — Vietnamese-first, source-cited (出入国在留管理庁 / 厚生労働省 / 法テラス / etc.), all `lastVerified` within 23 days
- **Compliance discipline** documented and enforced (`docs/content-governance.md`)
- **Bundle-safe** — total content ~20KB minified; no scaling risk at current size

### Discovery (Phase 2A + 2B shipped)
- **Layered search ranking** — JP `titleJp` matches (+120/+80/+60) > keywords (+50/+35) > body (+8) > priority='high' bonus (+6)
- **`getRelatedGuides`** — cross-category token overlap, surfaces on every guide detail
- **`getFeaturedGuides`** — 42 priority='high' guides on Home + as fallback on empty search states
- **"Bắt đầu ở đâu?"** — 5 cold-start shortcuts under search/ask CTAs (UX1)
- **Emergency CTA** reachable from Home (top + bottom), Search empty + no-results states

### Retention (R1 shipped, R2 design committed)
- **"Đã xem gần đây"** — last 5 viewed guides, AsyncStorage, dedupe + cap, hidden when empty (Phase 2B)
- **"Đã lưu"** — guide-only saved row (R1)
- **`guide_save` / `guide_unsave` / `guide_share`** analytics for retention insight (R1 + G1)
- **Reminder data model** — 5 kinds (visa / tax / moving / insurance / mynumber), opt-out defaults, anti-spam cap, design doc (R2)

### Analytics
- **Privacy-first** — Aptabase EU, no PII, `normalizeQueryForAnalytics` pinned by 22 unit tests
- **Decision map** documented — every event maps to a product question, all properties are bounded enums
- **5 dashboards** specified — retention / search / failed-query / source distribution / share-funnel

### Technical health
- **0 bare `any`**, 1 documented `@ts-expect-error`
- **51 test suites, 328 tests** all green on main
- **0 dead code markers** (no TODO/FIXME)
- **0 new dependencies** added in v1.5.0
- **0 schema breaks** since v1.4.0 (App-Review-approved)
- **Hidden features verified hidden**: AI Mail, My Japan Plan, JLPT, debug routes

### Governance
- **9 release-prep docs** committed (`v1.5.0-*`, `retention-phase-proposal`, `technical-debt-review-*`, `search-phase2c-*`, `analytics-decision-map`, etc.)
- **Compliance copy** reviewed across changelog, App Store release notes, social playbook
- **Clear roadmap** to 10/10 + clear deferred-items map

---

## 2. Current weaknesses

### Operational
- **App Store screenshots may still be v1.3/v1.4 era** — audit done, redesign pending
- **Device smoke test NOT yet run** on post-merge main (`0da05a3`)
- **EAS build NOT yet triggered** against this HEAD
- **No production Aptabase dashboard configured** — events flow but no visualization

### Product
- **AdminDetailScreen 2230+ LOC, 0 useMemo** — refactor candidate (tech-debt doc tracks)
- **HomeScreen 1240+ LOC** — partially split into `home/*` subcomponents; main file still big
- **Reminder scheduling not implemented** — R2 ships only schema; full UX is a future PR
- **No real app-link infrastructure** — G1's share URL is a placeholder
- **25 of 127 guides still lack `searchKeywords`** — wait for `search_no_results` data

### Strategic
- **No content production yet** — social playbook exists; first video not shot
- **No ASO experiment shipped** — strategy doc exists; keyword field not updated
- **No retention baseline** — first 2 weeks of data will tell us if `recent_viewed` lever works
- **Bottom Home Emergency contacts section is redundant** with the new top-level surfaces — pending data before reorganizing

### Engagement
- **Daily Ritual is the only repeat-visit hook** today. R1+R2 are foundation for visa/tax recurring hooks but haven't shipped to users yet
- **No streaks on guide reads** (intentional — no gamification)
- **No surface for "what I learned" or progress tracking on the content side** (Daily Ritual covers Japanese learning only)

---

## 3. Highest-leverage next improvements (in priority order)

1. **Run device smoke test on `0da05a3`** — gates EAS build. 10 min on device. Highest urgency.
2. **EAS production build + TestFlight smoke** — gates submission. 15-30 min wait per platform.
3. **Aptabase dashboard setup per `docs/aptabase-dashboard-setup.md`** — 2-3 hours one-time. Without this, no decision-quality data after launch.
4. **App Store submission with v1.4 screenshots OR refreshed lineup** — decide before submitting.
5. **App Store keyword field updates per `docs/aso-strategy-v1.md`** — can ship with v1.5.0 metadata without binary change.
6. **2-week observation per `docs/post-launch-observation-plan.md`** — no new features in this window.
7. **Phase 2C analytics-driven keyword tuning** (week 3-4, only if data justifies)
8. **Retention Surface 2 (reminders) scheduler** — week 3-4, only if `recent_viewed` data validates lever
9. **AdminDetailScreen split** — month 2, only after retention/discovery levers are validated
10. **First social content batch** — month 2-3, only if `guide_share` data shows traction

---

## 4. Deferred items (NOT bugs — intentional)

| Item | Why deferred | Next decision gate |
|---|---|---|
| Phase 2C tuning | Needs 14-day analytics sample | Day 14 post-launch |
| Retention Surface 2 (reminders) | Needs `recent_viewed` source share signal | 2 weeks post-launch |
| Retention Surface 3 (daily-rotating guide) | Gated on Surface 2 outcome | After Surface 2 ships or is rejected |
| AdminDetailScreen split | Refactor without committed next feature = risk-without-reward | When a new section needs to ship inside it |
| HomeScreen sectioning split | Same as above | Same as above |
| FlatList migration | Threshold-based — only when result counts > 50 | Monitor list lengths post-launch |
| Remote content CDN | Bundle-safe at 127 guides; revisit at 300+ | Quarterly check (next: 2026-11) |
| App-link / universal link | Share URL placeholder works for v1.5.0 | When share volume justifies infra cost |
| App Store screenshot redesign | Audit + proposal done; production work pending | After v1.5.0 ships if install conversion < 3% |
| Aptabase paid tier | Free tier covers ~20K events / 200-500 DAU | When event volume exceeds free tier |
| Sentry crash reporting | App Store Connect + Play Console crash dashboards sufficient for v1.5.0 | If post-launch crash debugging needs deeper signal |
| AI Mail public exposure | 6 compliance gates uncleared | Per decision-log; quarterly review |
| My Japan Plan (#35) | HOLD per user direction | Indefinite |
| JLPT pipeline | Protected per direction + dataset license unclear | Indefinite |
| Monetization (IAP / premium / ads) | No PMF signal yet | Month 6+ after data |
| Localization beyond VI/EN | Out of scope for v1.5.0 | Not on roadmap |

---

## 5. Technical debt status

Tracked in [`docs/technical-debt-review-2026-05.md`](technical-debt-review-2026-05.md). High-level:

| Debt | Risk | Effort | Status |
|---|---|---|---|
| AdminDetailScreen split | Medium → High | 2-3 days | Deferred (post-launch, gated on next feature need) |
| HomeScreen sectioning split | Medium | 1-2 days | Deferred (same as above) |
| `analytics.ts` unit tests | High (privacy-critical) | 2-3 hours | **DONE in #61** ✅ |
| FlatList migration thresholds | Low → Medium | 0.5 day per surface | Threshold-based; not triggered yet |
| Content scaling ceiling | Low → High at 300+ guides | 2-3 days | Bundle-safe at 127; revisit at 200 |
| Remote content migration | Strategic | 1-2 weeks | Next check 2026-11 |
| Render tests for screens | Medium | 3-4 days | Deferred (post-launch) |
| Stale local branches | Low | 30 sec | Auto-cleanup on PR merge |

**Net assessment**: tech health is **7.5 / 10**. Strong TS discipline + no dead code + zero new dependencies offset the monolithic-screen risk. The screens grow but every addition is isolated component-by-component (`home/*`, no inline expansion of the orchestrator's logic).

---

## 6. Product identity statement

> **Cẩm Nang Việt Nhật** is the Vietnamese-first reference handbook for living in Japan — 127 source-cited admin / daily-life / legal guides searchable in Vietnamese (with or without diacritics), romaji, or Japanese. Smart ranking, related-guide suggestions, save-for-later, emergency one-tap — all on-device, no PII, no ads.

Three-word framing: **thủ tục / đời sống / pháp lý**.

Anti-positioning: NOT a job board, NOT a community / forum, NOT an AI chatbot, NOT a Japanese language school, NOT a Vietnamese restaurant directory.

---

## 7. Growth readiness

### What's ready
- ✅ Native share on every guide (G1)
- ✅ `guide_share` analytics tracks completion vs cancel per share
- ✅ Social content playbook (`docs/social-content-engine.md`) — 5 hook formats, top-10 high-share guide priority, compliance gate
- ✅ ASO strategy (`docs/aso-strategy-v1.md`) — title/subtitle options, keyword fields for vi+en, competitor map, 6-month timeline
- ✅ App Store metadata audit (`docs/v1.5.0-app-store-audit.md`) — screenshot proposal, copy compliance check
- ✅ Trust signals — source citations, no-PII commitment, no-ads commitment, free pricing

### What's NOT ready
- ❌ App-link / universal-link infrastructure (placeholder URL in share)
- ❌ Real screenshots taken / produced
- ❌ First social content video shot
- ❌ Influencer / community outreach plan
- ❌ Paid acquisition budget
- ❌ Referral program

**Net**: foundation laid for organic growth. No paid lever active. First social cycle gated on post-launch data (week 2-3).

---

## 8. Release confidence score: **HIGH**

### Reasons HIGH

1. **328/328 tests pass** on `0da05a3`, 51 suites, `tsc` + content verify clean
2. **TS discipline strong** — 0 bare `any`, 1 documented `@ts-expect-error`
3. **Privacy contract pinned** by 22 dedicated `normalizeQueryForAnalytics` unit tests
4. **No new dependency** since v1.4.0 (App-Review-approved)
5. **No schema break** since v1.4.0
6. **Content moat intact** — 127 guides, all fresh
7. **All hidden features verified hidden** (AI Mail, My Japan Plan, JLPT, debug routes)
8. **v1.4.0 was App-Review-approved on the same bundle ID** — Apple has precedent, low rejection risk
9. **Rollback anchor (v1.4.0 tag `d590a5a`)** intact

### Reasons NOT yet VERY HIGH

1. Device smoke test has NOT been run on `0da05a3` (the most recent commit)
2. App Store screenshots may still reflect v1.4 — audit done, no redesign yet
3. No EAS production build has been triggered against this HEAD
4. Aptabase dashboard not yet configured (blind for first week if not set up before submit)

---

## 9. Recommendation: **ship after fixes**

The "fixes" are operational, not code-level:

1. ✅ **Run device smoke test** on real iOS + Android (use `v1.5.0-device-smoke-test-final.md`)
2. ✅ **Configure Aptabase dashboard** before submit so day-1 data is visible (use `aptabase-dashboard-setup.md`)
3. ✅ **Decide on App Store screenshot strategy** — carry v1.4 OR refresh per `v1.5.0-app-store-audit.md` (defer-OK if launch timing matters more than conversion lift)
4. ✅ **Then trigger EAS build** + submit (use `v1.5.0-release-execution.md`)

**Total time-to-submit**: ~3 hours if smoke passes first try + ~24-48 hours review.

**Not blocked by**:
- Phase 2C work — explicitly post-launch
- Retention Surface 2 — explicitly post-launch
- AdminDetailScreen refactor — explicitly post-launch
- Social content production — explicitly post-launch
- App-link infrastructure — placeholder works for v1.5.0
- Most tech debt items — tracked, not blocking

---

## Companion docs (all on main)

### Release-prep
- [`v1.5.0-release-checklist.md`](v1.5.0-release-checklist.md)
- [`v1.5.0-changelog.md`](v1.5.0-changelog.md)
- [`v1.5.0-app-store-audit.md`](v1.5.0-app-store-audit.md)
- [`v1.5.0-final-release-status.md`](v1.5.0-final-release-status.md)
- [`v1.5.0-release-execution-commands.md`](v1.5.0-release-execution-commands.md)
- [`v1.5.0-release-execution.md`](v1.5.0-release-execution.md) ← supersedes the above
- [`v1.5.0-device-smoke-test-final.md`](v1.5.0-device-smoke-test-final.md) ← this batch
- [`search-discovery-phase2b-smoke-test.md`](search-discovery-phase2b-smoke-test.md)

### Operating after launch
- [`aptabase-dashboard-setup.md`](aptabase-dashboard-setup.md) ← this batch
- [`post-launch-observation-plan.md`](post-launch-observation-plan.md) ← this batch
- [`analytics-decision-map.md`](analytics-decision-map.md)
- [`analytics-events.md`](analytics-events.md)

### Future-phase plans (DEFERRED, not for v1.5.0)
- [`search-phase2c-data-checklist.md`](search-phase2c-data-checklist.md)
- [`retention-phase-proposal.md`](retention-phase-proposal.md)
- [`reminder-system-design.md`](reminder-system-design.md)
- [`technical-debt-review-2026-05.md`](technical-debt-review-2026-05.md)
- [`social-content-engine.md`](social-content-engine.md)
- [`aso-strategy-v1.md`](aso-strategy-v1.md)
- [`product-loop-review-v1.md`](product-loop-review-v1.md)
