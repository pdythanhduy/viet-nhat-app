# Batch A11 — P1 cuối + P2 mixed (3 guide)

**Date:** 2026-05-14
**Branch:** `feature/post-v1.3.2-content`
**ADMIN_GUIDES count:** 117 → **120** (+3 guide)
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Companion review doc:** `docs/native-legal-review-pending-a1-a10.md` (sẽ update lên a1-a11 sau commit này)

---

## Scope

Batch A11 hoàn thành **1 P1 còn lại** + **2 P2** trong backlog 45.

| # | id | category | priority | Backlog # | Tom tat |
|---|---|---|---|---|---|
| 1 | `inheritance-will-japan-foreigners` | daily-law | normal | P1 #22 | 民法 + 通則法 + 相続税法 cho cross-border, di chúc 自筆/公正証書, deadline 3/4/10 tháng |
| 2 | `essential-apps-japan-life` | daily-law | normal | P2 #34 | 7 nhóm app cần thiết: LINE, PayPay, Google Maps, Yahoo Tenki, Safety Tips, マイナポータル, etc. |
| 3 | `point-cards-coupons-japan` | money | normal | P2 #35 | 5 hệ điểm chính (Rakuten, dPoint, Ponta, V-Point, PayPay Point) + credit card combo |

---

## Backlog progress

Sau A11:

| Phần | Tổng | Done | Còn |
|---|---|---|---|
| P0 (1–18) | 18 | 18 ✓ | 0 |
| P1 (19–33) | 15 | 15 ✓ (đầy đủ sau A11 inheritance) | 0 |
| P2 (34–36) | 3 | 2 ✓ (essential-apps + point-cards) | 1 (pet-registration) |
| Policy-sensitive (37–42) | 6 | 0 | 6 |
| Additional (43–45) | 3 | 3 ✓ (A7) | 0 |
| **GRAND TOTAL** | **45** | **38** | **7** |

**Done sau A11**: 38/45 = **84%** backlog. + 2 bonus (houterasu, child-vaccination).

---

## Highlights nội dung

### `inheritance-will-japan-foreigners` (HIGH risk legal)

- Phân tích 2 khung pháp lý: **luật dân sự** (通則法 đ.36 — luật quốc tịch người chết) vs **luật thuế** (相続税法 Nhật).
- 3 deadline quan trọng: **3 tháng** (相続放棄), **4 tháng** (準確定申告), **10 tháng** (相続税申告).
- Cảnh báo renvoi (luật VN có thể dẫn về luật Nhật cho 不動産 tại Nhật).
- 自筆証書 vs 公正証書 — chi tiết yêu cầu pháp lý 民法 968.
- 遺留分 (forced share) — không thể loại trừ vợ/con hoàn toàn bằng di chúc.
- 相続税 ví dụ thực tế với 基礎控除 + bậc thang thuế.
- Tone: heavy hedge "tài liệu định hướng, không thay thế tư vấn cá nhân".

### `essential-apps-japan-life` (low risk practical)

- 7 nhóm: Communication / Payment / Transport / Disaster / Translation / Shopping / Government.
- 5–6 app top tuần đầu: LINE, Google Maps, Yahoo乗換, Yahoo Tenki, Safety Tips, Google Lens.
- PayPay setup + KYC step-by-step.
- マイナポータル + e-Tax setup với My Number Card NFC.
- Cảnh báo: SIM VN không xác thực được app Nhật.

### `point-cards-coupons-japan` (low risk practical)

- 5 hệ chính: Rakuten / dPoint / Ponta / V-Point (former T-Point hợp nhất 2024) / PayPay Point.
- Combo theo mobile carrier + combini.
- 三井住友NL 5% combini touch payment.
- Rakuten Super Sale SPU lên tới 47x lý thuyết.
- Hạn point + bảo mật + tránh hết hạn.
- Sale calendar 2026.

---

## Schema compliance

Tất cả 3 guide tuân thủ:

- `AdminGuide` interface đầy đủ (`src/types/content.ts`).
- `lastVerified: '2026-05-14'`.
- `legalScope` đầy đủ với `sourceVerifiedAt` + `nextReviewAt` (2026-12-01) + `riskLevel`.
- `quickAction.officialSourceLabels[]` exact-match một label trong `officialLinks[]`.
- `counterPhrases` đủ jp + romaji + vn + note (7–8 phrases/guide).
- `steps` 5 bước action-first.
- `commonMistakes` + `faq` 5–10 items.

### counterPhrases A11

- `inheritance-will-japan-foreigners`: 8 phrases.
- `essential-apps-japan-life`: 7 phrases.
- `point-cards-coupons-japan`: 7 phrases.
- **Total**: 22 phrases mới cần native review.

---

## Verification

- `npm run typecheck`: ✅ Pass.
- `npm run test:ci`: ✅ 251/251 pass (44 test suite).
- `npm run verify:content`: ✅ 0 issues, 0 suspicious lines, 0 lines fixed.

---

## NEEDS_OFFICIAL_SOURCE_CHECK

### `inheritance-will-japan-foreigners` (HIGH priority)

- 通則法 đ.36 + renvoi rules cho người Việt — confirm với 弁護士 cross-border (Nhật + VN).
- 民法 968 自筆証書 yêu cầu cứng — vẫn cập nhật 2019 cải cách 財産目録.
- 公正証書遺言 phí theo giá trị (5,000 – 240,000円+) — kiểm tra với 公証役場 hiện tại.
- 相続税 基礎控除 + bậc thang thuế — chuẩn theo 国税庁 2024–2026.
- 配偶者控除 1.6億円 / 法定相続分 — luật cố定 nhưng đôi khi cải cách.
- 遺留分 民法 1042 — 1/3 / 1/2 phần luật.
- 16 bệnh đặc定 vẫn KHÔNG nằm trong guide này (chỉ trong kaigo).
- VN Bộ luật Dân sự 2015 thừa kế Chapter XX — cập nhật theo Quốc hội VN.

### `essential-apps-japan-life` (LOW priority)

- Phí mobile carrier 2026 — đa số cập nhật, cần xem mỗi tháng.
- PayPay 5% combini touch — vẫn chính sách 2024–2026 nhưng có thể thay đổi.
- Rakuten Super Sale SPU rate 47x — lý thuyết, thường 5–15x thực tế.
- マイナポータル NFC compatibility (iPhone iOS 14+, Android Felica) — confirm.
- App URL store: stable nhưng có thể đổi.

### `point-cards-coupons-japan` (LOW priority)

- Tỷ lệ tích point theo hệ — thay đổi mỗi năm.
- V-Point hợp nhất 2024-04 từ T-Point — confirm với Tập đoàn V-Point.
- Phí thẻ tín dụng năm đầu miễn phí — confirm với từng công ty.
- Sale calendar — chính xác cho 2026.

---

## Priority cho native + legal review (A11 incremental)

### HIGHEST

1. `inheritance-will-japan-foreigners` — 民法 + 通則法 + 相続税 — **弁護士 chuyên cross-border** + **税理士 chuyên 相続**.

### HIGH

2. `inheritance-will-japan-foreigners` 遺留分 + 相続税 ví dụ — 弁護士 + 税理士.

### MEDIUM

3. A11 counter phrases tone — 22 câu native confirm.
4. essential-apps app list cập nhật + Rakuten SPU rate confirm.

### LOW

5. point-cards phí cụ thể từng credit card 2026.
6. essential-apps tier price (Spotify, Netflix, etc.) update.

---

## Files added

```
src/constants/content/adminGuides/guides/inheritance-will-japan-foreigners.ts
src/constants/content/adminGuides/guides/essential-apps-japan-life.ts
src/constants/content/adminGuides/guides/point-cards-coupons-japan.ts
src/constants/content/adminGuides/guides/index.ts (modified — 3 imports + 3 entries)
```

---

## Next batches gợi ý

### Batch A12 — Policy 2026 mở rộng (3–4 guide policy-sensitive)
- `specific-residence-card-my-number-2026` (#37).
- `myna-health-insurance-card-2026` (#38).
- `visa-fee-increase-2025-2026` (#39).
- `naturalization-kika-2026-changes` (#40).

### Batch A13 — Policy 2026 final + P2 (3 guide)
- `ikusei-shuro-system-guide` (#41) — 育成就労 mới thay 技能実習.
- `jista-entry-system-guide` (#42) — JESTA.
- `pet-registration-japan` (P2 #36).

Sau A13: 7 guide nữa → đóng backlog 45 hoàn toàn (100%).

---

## Apple Review status (carry-over)

- **App 1.3.1** vẫn đang App Review từ 2026-05-09 — chưa rõ kết quả.
- **Branch `feature/post-v1.3.2-content`** mang content cho v1.3.3 / v1.4.0 sau khi 1.3.1 ship.
- A4–A11 (~30 guide + 3 bonus) chưa ship qua App Store.

---

## Commit message gợi ý

```
feat(admin): batch A11 — P1 cuối + P2 mixed (3 guide)

A11 — backlog #22, #34, #35:
- inheritance-will-japan-foreigners (daily-law) — 通則法 + 相続税 cross-border
- essential-apps-japan-life (daily-law) — 7 nhóm app cần thiết
- point-cards-coupons-japan (money) — 5 hệ điểm + credit card combo

ADMIN_GUIDES: 117 → 120. Backlog 45 progress: 38/45 = 84%.
Còn lại: 6 policy-sensitive (#37–42) + 1 P2 (pet-registration #36).

Verify:
- npm run typecheck OK
- npm run test:ci OK 251/251 (44 suites)
- npm run verify:content OK 0 issues

Report + NEEDS_OFFICIAL_SOURCE_CHECK: docs/content-roadmap-a11-p1-p2-mixed.md
```
