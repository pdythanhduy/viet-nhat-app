# Phase 2 Scoping Assessment

**Date:** 2026-05-15
**Status:** Pre-implementation — scope review only
**Reference:** `docs/app_features_roadmap_2026.md` Phase 2 = Find Nearby (Feature C) + Calculators (Feature D)

---

## Phase 1 status — DONE

Reminders feature shipped trong v1.3.2 cycle (commit `4d15606`):
- `src/screens/ImportantDatesScreen.tsx` (+160/-19) — edit flow + permission fallback
- `src/utils/notifications.ts` (+18/-0) — permission helper
- `expo-notifications` + `expo-secure-store` plugins configured trong `app.json`
- iOS `NSUserNotificationsUsageDescription` ✅
- Android `RECEIVE_BOOT_COMPLETED` permission ✅

→ **Phase 1 = Smart Notifications Local** = DONE. Phase 2 OCR + Phase 3 cloud sync chưa làm.

---

## Phase 2 scope per roadmap

### Feature C — Find Services Nearby
- React Native Maps + Apple Maps / Google Maps
- expo-location permission
- Data seeding: ~30 đại sứ quán/lãnh sự + 14 入管 chi nhánh + 法テラス + ~500 多言語 bệnh viện
- Filter UI: chip by category + language
- **Estimated effort: 3–5 tuần** (1 tuần data seed + 2 tuần dev + 1–2 tuần test)

### Feature D — Calculators (6 calculators)
1. Salary net calculator
2. Pension refund (脱退一時金)
3. Tax estimate
4. Furusato Nozei limit
5. iDeCo savings
6. Yen ↔ VND FX
- Pure client-side, formulas + UI
- **Estimated effort: 3–4 tuần** (mỗi calc 2–4 ngày dev + 1 ngày test)

### Total Phase 2 estimate: 6–9 tuần (1 dev full-time)

---

## What can ship in ONE session (today)

Realistic deliverable trong 1 session:

| Deliverable | Effort | Risk | Verdict |
|---|---|---|---|
| Yen ↔ VND FX (simplest, hardcoded rate + free API fallback) | 2–3h | Low (pure client) | ✅ Doable nếu thực sự muốn ship 1 calc |
| Salary net calculator | 4–6h | Medium (tax tables, edge cases) | ⚠️ Risk half-baked |
| Find Nearby map screen scaffold | 4–6h | High (Google Maps API key + permission UX + data) | ❌ Too much for 1 session |
| Pension refund calc | 3–4h | Low (formula well-defined) | ⚠️ Possible if no FX |
| All 6 calculators | 20–30h | High | ❌ Multi-session |

## Recommendation

**KHÔNG ship Phase 2 trong session này** vì:

1. **Half-baked risk** — CLAUDE.md rule "no half-finished implementations". Một calculator hoặc Find Nearby scaffold không hoàn chỉnh sẽ tạo:
   - UI nửa vời trong production app (1.3.1 đang Apple Review, 1.3.3 chuẩn bị ship)
   - User confusion ("calculator này dùng số nào?")
   - Tax accuracy risk (calc sai 1 yên = user phẫn nộ)

2. **Tax table maintenance** — calculators như salary-net, tax-estimate, Furusato Nozei limit cần tax tables hardcode + cập nhật hằng năm. Cần commitment maintenance (4 thời điểm/năm theo roadmap). Không thể ship rồi quên.

3. **Test infrastructure** — calculators cần unit test sâu (edge case: 扶養 multiple, có 配偶者控除, 障害者控除 …). Hệ thống test hiện có 251 test cho content — calculator domain chưa có. Adding without test scaffolding = technical debt.

4. **v1.3.3 milestone tự nhiên** — tag v1.3.3 đã push, focus sprint hiện tại là content + reviewer brief. Mở scope engineering mới trong cùng tag = milestone không clean.

5. **Roadmap nói Q4 2026** — Phase 2 explicitly scheduled for 2026 Q4 (tháng 10–12), không phải 2026 Q2 (hôm nay là 2026-05-15).

## Next-session entry point (cho Phase 2)

Khi bắt đầu Phase 2 chính thức, propose sprint structure:

### Sprint 2.0 — Decision + setup (1 tuần)
- Confirm budget cho Google Maps API quota
- Confirm content team commit để seed Find Nearby data (~3 tuần)
- Confirm engineering có thể maintain tax tables hằng năm
- Pick UX direction: bottom-tab "Tools" hay drawer? (xem `homeScreenData.test.ts` cho navigation pattern hiện tại)

### Sprint 2.1 — FX calculator (1 tuần)
- Simple Yen ↔ VND với API fallback (exchangerate.host free)
- New route `CalculatorsScreen` + child `FxCalculator`
- 5–10 unit test
- Smoke device test

### Sprint 2.2 — Pension refund calc (1 tuần)
- Hardcoded formula 厚生年金 / 国民年金 脱退一時金 with tier
- API: confirm 加入月数 lookup table còn current
- Unit test edge cases (<6 tháng, >36 tháng, mixed years)

### Sprint 2.3 — Salary net + tax estimate (2 tuần)
- Highest-value calc cho user Vietnamese
- Hardcoded 所得税 brackets + 住民税 estimate + 健康保険 + 厚生年金 + 雇用保険 rates
- Per-prefecture 住民税 variation (~5% maybe)
- Edge case: 扶養家族 multiple, 障害者, 寡婦, 配偶者, 国民健康保険 vs 健康保険
- Disclaimer cứng "estimate only — không thay 税理士"

### Sprint 2.4 — Furusato Nozei + iDeCo (1 tuần)
- Standard formula
- Visualization: bar chart "tiết kiệm thuế"

### Sprint 2.5 — Find Nearby data + UI (3 tuần)
- Data seed: 14 入管 + 30 大使館/総領事館 + 法テラス + selected 多文化共生 centers (~50 entries)
- Bệnh viện đa ngôn ngữ (~500 entries) — content team task, không phải engineering
- Map screen + list view + filter + detail card
- expo-location permission UX

### Sprint 2.6 — QA + ship (1 tuần)
- Device QA (calculators + map) iOS + Android
- Tag v1.4.0 (significant feature addition warrants minor bump)
- Marketing copy + screenshot

**Total Phase 2: ~9 tuần** (consistent với roadmap original estimate).

---

## Alternative: ship smaller "Phase 1.5" (pre-Phase 2)

Nếu muốn momentum, có thể ship trong tuần tới (NOT today):

### "FX Mini" feature
- Single screen `FxCalculator.tsx` — Yen ↔ VND realtime + USD optional
- 1 free API call (exchangerate.host) với cache 1h
- ~200 LOC + 5 unit test
- Hidden behind feature flag, ship gradual
- v1.3.4 patch release

→ Đây là "MVP của 6 calculator" — ship riêng để measure adoption trước khi đầu tư 9 tuần.

---

## Decision required from user

1. **A)** Skip Phase 2 entirely cho đến Q4 2026 (theo roadmap original). Tập trung content + native review trong meantime.
2. **B)** Ship "FX Mini" v1.3.4 patch (1 tuần effort, low risk) để measure user appetite.
3. **C)** Bắt đầu Phase 2 full sprint plan trên branch riêng (`feature/phase-2-tools`). Multi-session work, không ship vào main cho đến all calculator done + tested.
4. **D)** Defer decision, đợi v1.3.1 Apple Review xong rồi đánh giá lại.

**Recommendation**: A hoặc D. Lý do: content tốt → user trust cao hơn calculator chưa polish. Ship Phase 2 sau khi engagement metrics từ v1.3.3 content release rõ.

---

## What's done in current sprint (v1.3.3)

✅ ADMIN_GUIDES 90 → 128 (+38 guide)
✅ Backlog 45/45 = 100%
✅ 22 source-check VERIFIED + deep-linked
✅ Reviewer brief 9 HIGHEST guide
✅ Device QA checklist doc
✅ Phase 1 (Reminders) shipped
✅ Tag v1.3.3 pushed

## What's NOT in scope of current session

❌ Phase 2 implementation (multi-week)
❌ Physical device QA (human only)
❌ Engage external reviewers (human action)
❌ Apple Review (passive wait)
❌ Build EAS submission (waits on Apple 1.3.1 clearing)

**Current sprint = DONE.** Phase 2 = next sprint, decision required first.
