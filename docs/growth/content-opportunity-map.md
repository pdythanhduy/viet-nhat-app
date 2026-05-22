# Growth Asset Pack — Content Opportunity Map

**Date**: 2026-05-23
**Status**: domain-reasoning assumptions only. **No production analytics are referenced.** All predictions below are clearly marked as assumptions; nothing is treated as proven user behavior.
**Companion**: `docs/full-content-backlog-45-guides.md` (the existing content backlog this map informs), `docs/observation-season-freeze.md` (the freeze that prevents acting on these predictions without 2-week confirmation).

**Why this doc exists**: distribution + conversion sprint needs a hypothesis-grade view of where users hurt. The observation season forbids acting from real data yet, so we plan from domain reasoning — and mark every line as an assumption to be tested, never claimed.

**How to read it**: every section ends with the explicit signal that would confirm or refute the prediction. A prediction without a confirmation criterion is useless.

---

## 0. Assumption discipline

Every prediction below is labeled:

- `[A]` — assumption, no production signal yet
- `[D]` — derived from public domain reasoning (Japanese law, population stats, calendar dates)
- `[E]` — anecdotal evidence from public Vietnamese-language sources (forums, news), low confidence
- `[K]` — known from app content backlog or shipped guides (high confidence)

If a row in the tables below doesn't have a label, assume `[A]`. NEVER cite this doc as if it contained measured data.

---

## 1. Predicted high-value queries

A query is "high-value" if it satisfies ALL of:
- High intent (user is searching to act, not browse)
- High consequence if unresolved (penalty / loss / visa risk)
- We have a guide that materially helps

| # | Predicted query (normalized) | Label | Predicted reason | Matching guide |
| --- | --- | --- | --- | --- |
| 1 | `mat the cu tru` / `mất thẻ` | D | Time-pressed; 14-day deadline | `lost-residence-card` |
| 2 | `kakutei shinkoku` / `khai thue` | D | Annual Feb-Mar 15 deadline | `kakutei-shinkoku` |
| 3 | `kokumin hoken` / `bao hiem` | D | First-week new arrival action | `health-insurance` |
| 4 | `nenkin` / `pension` | D | Long-term residents recurring | `nenkin-pension` |
| 5 | `vinh tru` / `eijuu` / `永住` | D | 10-year milestone | `permanent-residency-eijuu` |
| 6 | `chuyen viec` / `bao chuyen viec` | D | 14-day notification deadline | `job-change-notification` |
| 7 | `chuyen nha` / `tennyuu` | D | Recurring; ward office anxiety | `moving-in-notification` |
| 8 | `juminzei` / `thue cu tru` | D | First June after first full year | `juminzei-local-tax` |
| 9 | `tieng nhat benh vien` | E | High emotional load; common forum question | `hospital` phrases |
| 10 | `tai nan giao thong` / `jiko` | D | Acute event; 110-call panic | `traffic-accident-response` |
| 11 | `quá hạn visa` / `overstay` | E | Frequent shame-driven search; users avoid forums | `overstaying-illegal-stay-procedures` |
| 12 | `baito 28 tieng` / `28h sinh vien` | D | Recurring student concern | `permission-activity-outside-status` |
| 13 | `gui tien ve VN` / `送金` | D | Monthly action for many users | `tax-on-remittance-to-vietnam`, `banking-remittance-anti-fraud` |
| 14 | `nhk hop dong` / `nhk go cua` | E | Anxiety + cultural confusion | `nhk-contract-guide` |
| 15 | `tieng nhat phong van` | E | Job-seeking pain point | `job-interview-japan` phrases |

**Confirmation criterion (Q3 2026)**: any query above appears in the top-10 of `search_query` for ≥ 2 consecutive weekly retrieval reports per `docs/no-data-action-policy.md` §3. Until then, this list is hypothesis.

**Refutation criterion**: any query above appears with count 0 across 4 weeks — predicted high-value is false; remove or merge guide priority.

---

## 2. Likely high-fear moments

These are moments where the user types urgently because something has already gone wrong. Fear-driven sessions have different metrics — they convert at unusually high rates if the result is right, and abandon catastrophically if not.

| # | Trigger event | Predicted fear intensity | Matching guide | Distribution implication |
| --- | --- | --- | --- | --- |
| F1 | Mất 在留カード (residence card) | HIGH (14-day deadline + identity loss) | `lost-residence-card` | Should be reachable in ≤ 2 taps from app open |
| F2 | Police pulled them aside | HIGH (rights anxiety) | `police-questioning-rights-japan` | Featured rail candidate |
| F3 | Tai nạn giao thông in real-time | EXTREME (acute) | `traffic-accident-response` | Emergency CTA must always be reachable |
| F4 | Bị 解雇 (fired) suddenly | HIGH (financial + visa) | `labor-rights-dispute`, `employment-crisis-visa-job-loss-layoff`, `unemployment-benefits` | 3-guide cluster — needs related-guides linking |
| F5 | Visa quá hạn | EXTREME (shame + legal) | `overstaying-illegal-stay-procedures` | Privacy-sensitive — users may not share; SEO matters more than social |
| F6 | DV / domestic violence | EXTREME (safety + visa fear) | `domestic-violence-dv-support` | Discreet surface; hotline placement is the asset |
| F7 | Bị 振り込め詐欺 ngay sau khi chuyển | EXTREME (acute, time-pressure) | `special-fraud-tokushu-sagi` | Featured if "fraud" appears in search history (not implementable in observation season) |
| F8 | Đại sứ quán gọi điện đòi tiền | EXTREME (scam recognition) | `special-fraud-tokushu-sagi` | Embassy-impersonation is a specific Vietnamese-targeted scam pattern |
| F9 | Bệnh đêm khuya không biết tiếng Nhật | HIGH (medical + language) | `holiday-night-medical-care`, `emergency-calls-japan` | Cross-link to #7119 hotline |
| F10 | Bão lớn / động đất sắp đến | HIGH (preparation panic) | `typhoon-evacuation-alerts`, `earthquake-preparedness-japan` | Seasonal — see §4 |

**Distribution implication summary**: fear-driven sessions DON'T convert via long-form content. They convert via fast retrieval + clear next-action language + visible hotline. Short-video hooks (Format E in `social-content-engine.md`) own the awareness phase; in-app search owns the conversion.

---

## 3. Seasonal search timing

Japanese fiscal year + cultural calendar drives predictable search spikes. The app doesn't need to be more aggressive in these windows — but content production should align so guides are fresh BEFORE the wave hits.

| Window | Predicted spike | Why | Guide priority for fresh-check |
| --- | --- | --- | --- |
| **Jan 15 - Mar 15** | `kakutei shinkoku`, `confirmed shinkoku`, `gửi tiền về VN khai thuế` | National tax filing season (確定申告期間 Feb 16 - Mar 15) | `kakutei-shinkoku`, `tax-on-remittance-to-vietnam` |
| **Mar - early Apr** | `chuyển nhà`, `tennyuu`, `tenshutsu`, `kokumin hoken` | Fiscal year-end relocations, new employment starts | `moving-in-notification`, `address-change`, `health-insurance` |
| **Late May - June** | `juminzei`, `thue cư trú`, `bị trừ lương` | Resident tax bills arrive ~June 10 | `juminzei-local-tax`, `kokuho-reduction`, `payslip-reading` |
| **June - Sep** | `bão`, `typhoon`, `động đất`, `避難`, `hazard map` | Typhoon season; June earthquake-preparedness month | `typhoon-evacuation-alerts`, `earthquake-preparedness-japan`, `hazard-map-flood-tsunami-volcano` |
| **Oct - Nov** | `ふるさと納税`, `年末調整`, `gửi gia đình tiền cuối năm` | Furusato deadline Dec 31; nenmatsu chosei begins | `furusato-nozei-guide`, `tax-year-end-adjustment-filing` |
| **Late Nov - Dec** | `oshogatsu`, `gửi tiền Tết`, `về VN ăn Tết` | Vietnamese Lunar New Year prep + re-entry permit anxiety | `re-entry`, `return-to-vietnam-checklist`, `remittance` |
| **Jan - Feb** | `về VN ăn Tết`, `みなし再入国`, `re-entry` | Tết Vietnam | `re-entry`, `return-to-vietnam-checklist` |
| **Apr (school start)** | `nyugaku`, `trường công`, `nhà trẻ`, `保育園` | School year starts Apr 1 | `school-enrollment-children`, `nursery-kindergarten-guide` |

**Distribution implication**: content production should target T-30 days before each window with category-specific video + share-card pushes. Don't push in-window; the user already arrived organically.

**Confirmation criterion**: weekly retrieval report shows query volume rise in the named window. If the predicted spike doesn't materialize across 2 cycles, remove from this map.

---

## 4. Osaka / Tokyo / regional differences

Many procedures vary by ward / prefecture. A guide that says "go to your city hall" hides up to 5x variation in:

| Topic | Tokyo (23 wards) | Osaka (Osaka-shi + Pref) | Other (general rule) | Source signal |
| --- | --- | --- | --- | --- |
| 自転車保険 mandatory | Yes (2020) | Yes (2016) | Varies (~30 prefectures) | `bicycle-insurance` |
| 子ども医療費 free up to | 18 years (city-dependent) | 15-18 years | 15 years typical | `child-allowance-jidou-teate`, `clinic-hospital-visit-guide` |
| ゴミ分別 categories | 5-7 typical | 4-5 | 3-10 (varies wildly) | `garbage-sorting-rules` |
| 国民健康保険料 base | Higher (Tokyo 23) | Mid | Lower in rural | `health-insurance`, `kokuho-reduction` |
| FRESC physical office | Yes (Shinjuku) | Limited | Phone only | `foreign-resident-support-centers` |
| 多文化共生 information centers | Many in 23 wards | Limited per ward | 1 per pref, sometimes none | `foreign-resident-support-centers`, `free-japanese-classes-local` |
| 法テラス bilingual support | Yes | Yes | Phone-redirect only | `houterasu-legal-aid-foreigners` |
| 救急安心 #7119 coverage | Yes | Yes | Not universal | `holiday-night-medical-care` |

**Content gap implication**: many existing guides say "tùy địa phương" without naming the variation. Future content work (NOT in observation season) could add per-prefecture supplement notes for the top 3 prefectures (Tokyo, Osaka, Aichi — the three largest Vietnamese populations).

**Caution**: do NOT add prefecture-specific advice unless verified directly from that prefecture's official source. Otherwise we replace "tùy địa phương" with "wrong specific".

---

## 5. First-90-days map

The single most predictable Vietnamese-in-Japan content surface is the first 90 days. Sequence is deterministic; emotional load is high; existing guides cover most of it.

### Days 0-7 (Week 1) — "tôi vừa tới"
| Day | Predicted need | Guide |
| --- | --- | --- |
| Day 1 | Phone / SIM | `sim-card`, `sim-phone-internet` |
| Day 1-2 | 住民票 + 在留カード初回登録 | `moving-in-notification` |
| Day 2-3 | 国民健康保険 enrollment | `health-insurance` |
| Day 3-5 | Ngân hàng + my number link | `bank-account`, `my-number-card` |
| Day 5-7 | Wi-Fi / utilities at home | `home-internet-wifi-contracts`, `electricity-gas-water-contracts` |
| Day 7 | Hanko / inkan nếu cần | `hanko-inkan` |

Map already in `first-7-days-in-japan` guide. Distribution play: a 7-card share-card pack (one per day) ships in week 1.

### Days 8-30 (Week 2-4) — "tôi đang ổn định"
| Day | Predicted need | Guide |
| --- | --- | --- |
| Week 2 | Đăng ký 国民年金 nếu chưa | `nenkin-pension` |
| Week 2-3 | Khám sức khỏe + 児童手当 nếu có con | `annual-health-checkup-kensin`, `child-allowance-jidou-teate` |
| Week 3 | Tìm 日本語クラス địa phương | `free-japanese-classes-local` |
| Week 3-4 | Học trash sorting + 自治会 | `garbage-sorting-rules`, `local-volunteering-chonaikai` |
| Week 4 | Báo cho công ty hoàn tất, năm thuế chấm dứt | `payslip-reading` (đầu lương đầu) |

Map already in `first-30-days-work-study-japan`. Distribution play: 1 video / week for 4 weeks pulling from this list.

### Days 31-90 (Month 2-3) — "tôi gặp việc bất ngờ"
| Phase | Predicted need | Guide |
| --- | --- | --- |
| Month 2 | Lần đi viện đầu tiên | `clinic-hospital-visit-guide`, `pharmacy-prescription-guide` |
| Month 2 | NHK gõ cửa | `nhk-contract-guide` |
| Month 2-3 | First disaster drill | `earthquake-preparedness-japan`, `hazard-map-flood-tsunami-volcano` |
| Month 3 | First quarter taxes if freelance | `sole-proprietor-kojin-jigyo`, `kakutei-shinkoku` |
| Month 3 | Sống xa Việt Nam — Tết / festival timing prep | `return-to-vietnam-checklist`, `re-entry` |

Map already in `first-90-days-in-japan`. Distribution play: month-3 video sequence + onboarding email if/when an email list exists.

---

## 6. Likely repeated pain loops (recurring searches)

Some pains are not one-shot — they cycle.

| Loop | Cycle | Predicted re-search trigger | Distribution implication |
| --- | --- | --- | --- |
| Visa renewal anxiety | 1-5 years (depends on status) | 3 months before expiry: "gia hạn visa" | Email reminder if list exists (not in scope); pre-shipped reminder system R3 still gated per `reminder-system-design.md` §8b |
| Tax filing | Annual | Mid-Feb: "確定申告 cách làm" | Annual content refresh + Jan 15 push |
| 住民税 surprise | Annual (every June) | Receipt of 住民税決定通知書 | Predictable May 25 push |
| Year-end 年末調整 | Annual (every Nov) | Company sends 扶養控除等申告書 | Predictable Oct 25 push |
| 在留カード renewal | Every status period | 3 months before expiry: "gia hạn the cư trú" | Tied to visa-renewal loop |
| Đi viện theo mùa | 2-4x / year | "đau bụng tiếng Nhật" / "cảm cúm" | Phrases category is the asset; not new content |
| Mất giấy tờ | Erratic | "mất 在留", "mất my number" | Always-on featured rail |
| Chuyển nhà | Every 2-4 years | "chuyển nhà 14 ngày" | Spring-cycle push (see §3) |
| Đón gia đình sang | Once or recurring | "đón vợ sang Nhật", "đón con sang" | Tied to family-visa guides |
| Đi về nước | Annual (Tết) | "みなし再入国", "tránh mất tư cách" | Tied to seasonal #5 cycle |

**Caution**: predicted re-search is NOT permission to add notification surfaces. Notification scheduler is gated by `reminder-system-design.md` §8b R3 decision day 2026-06-04. Use organic content cycles only.

---

## 7. Hypotheses NOT to act on yet

The following are tempting but should NOT drive content or distribution decisions until verified:

| Hypothesis | Why we're refusing to act |
| --- | --- |
| "Everybody types kanji" | Probably false in early-tenure users; needs data |
| "Vietnamese users in Tokyo behave like Vietnamese users in Osaka" | Cultural + procedural diffs (see §4) |
| "Fear-driven sessions retain best" | Plausible but unverified; counter-hypothesis: fear sessions are one-shot |
| "Tax-season is our biggest install window" | Plausible from §3, but Vietnam-Japan corridor may have different timing than Japan-only apps |
| "Vietnamese users avoid government apps" | Anecdotal; may or may not generalize |
| "Word-of-mouth is the main growth lever" | Plausible but unmeasured |

Mark these in a future weekly report's §17 carry-forward if a related query starts appearing. Don't theorize from this list — observe from real data.

---

## 8. Strongest growth insight in this map

> **The first 90 days is a sequenced, deterministic content map** (§5) — almost no Japanese-help app has a content-aligned distribution cadence for that 90-day window. Most apps publish topically; the differentiator is to publish *temporally* (T-7 days before Tết, T-30 before tax season, day 7 / 14 / 30 share-card packs for newcomers).
>
> Combine §3 (seasonal timing) + §5 (newcomer arc) + §6 (loops) and you have a 12-month publication calendar that doesn't require ANY new content — just disciplined re-surfacing of guides that already exist.

This is a distribution insight, not a content insight. The guides are already written.

---

## 9. What NOT to read into this map

- ❌ Not a roadmap. The 127 existing guides cover most of these.
- ❌ Not a justification for new analytics events. Observation season blocks that.
- ❌ Not a justification for personalization. `docs/search-known-debts.md` §6 already refuses personalization.
- ❌ Not user research. No interviews / surveys were conducted for this map. Domain reasoning only.
- ❌ Not a competitive map. Competitors are out of scope here.

---

## 10. Confirmation cycle

Every prediction here should be testable against the existing observability events (`search_query`, `search_zero_results`, `search_result_opened`, `search_abandoned`, `fallback_guide_opened`) once production data accrues. The first test windows:

| Prediction class | Confirmation window | Source |
| --- | --- | --- |
| §1 high-value queries | 4 cycles after first review | `docs/reports/retrieval-week-*.md` §2 top queries |
| §2 fear moments | 8 cycles + audit | `docs/reports/search-quality-audit-*.md` |
| §3 seasonal timing | Same window next year | Two-year overlay on `search_query` |
| §4 regional differences | Probably never directly testable (no geo) | Acknowledge as un-testable, content side only |
| §5 first-90-days arc | 12 cycles | Cross-cohort retention; not yet measurable |
| §6 pain loops | 12 cycles | Same query recurrence rate |

**Until confirmed: this is a planning aid, not a decision input.** All shipping decisions still pass through `docs/no-data-action-policy.md` §2 STRONG/MEDIUM/WEAK bands.

---

## Related docs

- [`docs/full-content-backlog-45-guides.md`](../full-content-backlog-45-guides.md) — existing content backlog
- [`docs/growth/short-video-hooks.md`](short-video-hooks.md) — uses §1, §2, §5 for hook prioritization
- [`docs/growth/share-card-concepts.md`](share-card-concepts.md) — uses §5 and §6 for card themes
- [`docs/no-data-action-policy.md`](../no-data-action-policy.md) — the gate this map's predictions pass through
- [`docs/observation-season-freeze.md`](../observation-season-freeze.md) — the freeze that prevents premature action
