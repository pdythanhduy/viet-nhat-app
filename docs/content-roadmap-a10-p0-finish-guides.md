# Batch A10 — P0 finish + bonus daily-law/health expansion

**Date:** 2026-05-14
**Branch:** `feature/post-v1.3.2-content`
**ADMIN_GUIDES count:** 110 → **117** (+7 guide)
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Companion review doc:** `docs/native-legal-review-pending-a1-a10.md` (to be updated)

---

## Scope

Batch A10 hoàn thành **4 guide P0 còn lại** trong backlog 45 + 3 guide P1/expansion song song.

### A10 — P0 finish (4 guide)

| # | id | category | priority | Tom tat |
|---|---|---|---|---|
| 1 | `long-term-care-insurance-kaigo` | health | normal | 介護保険 cho người 40+ + bố/mẹ già — 要介護認定, ケアマネ, dịch vụ tại nhà / viện |
| 2 | `fire-earthquake-insurance-home` | money | normal | 火災保険 + 地震保険 cho nhà thuê — 借家人賠償, 個人賠償, 失火責任法 |
| 3 | `consumer-rights-cooling-off` | daily-law | normal | クーリングオフ 8/20 ngày + hotline 188 + 内容証明 quy trình |
| 4 | `study-in-japan-student-guide` | visa | normal | Visa 留学, 日本語学校/専門学校/大学, アルバイト 28h, 学費 + 奨学金 |

### Bonus — 3 guide thêm song song (cùng date 2026-05-14)

| # | id | category | priority | Trạng thái |
|---|---|---|---|---|
| 5 | `domestic-violence-dv-support` | daily-law | high | Backlog P1 #23 (DV / 配偶者暴力 + 保護命令 + visa保護) |
| 6 | `houterasu-legal-aid-foreigners` | daily-law | normal | KHÔNG có trong backlog 45 — companion cho consumer-rights + DV |
| 7 | `child-vaccination-schedule` | health | normal | KHÔNG có trong backlog 45 — health expansion cho child |

---

## Backlog progress

Sau A10 + bonus:

| Phần | Tổng | Done | Còn |
|---|---|---|---|
| P0 medical | 5 | 5 ✓ | 0 |
| P0 disaster | 4 | 4 ✓ (fire-earthquake-insurance + A2 + nhà có 9) | 0 |
| P0 utilities | 5 | 5 ✓ (consumer-rights + A3 + nhà có 4) | 0 |
| P0 education | 4 | 4 ✓ (study-in-japan + A4 + 3 từ trước) | 0 |
| **P0 total** | **18** | **18** | **0** |
| P1 legal/support | 5 | 4 ✓ (A5 + DV) | 1 (inheritance-will) |
| P1 community | 4 | 4 ✓ (A9 + foreign-resident-support) | 0 |
| P1 tax/finance | 3 | 3 ✓ (A6) | 0 |
| P1 work/career | 3 | 3 ✓ (A8) | 0 |
| **P1 total** | **15** | **14** | **1** |
| P2 tech | 3 | 0 | 3 (essential-apps, point-cards, pet-reg) |
| Policy-sensitive | 6 | 0 | 6 |
| Additional (43–45) | 3 | 3 ✓ (A7) | 0 |
| **GRAND TOTAL** | **45** | **35** | **10** |

**Done sau A10**: 35/45 = **78%** backlog. + 2 bonus guide (houterasu, child-vaccination).

---

## Schema compliance

Tất cả 7 guide tuân thủ:

- `AdminGuide` interface đầy đủ (`src/types/content.ts`)
- `lastVerified: '2026-05-14'`
- `legalScope` đầy đủ với `sourceVerifiedAt` + `nextReviewAt` (2026-12-01) + `riskLevel`
- `quickAction.officialSourceLabels[]` exact-match một label trong `officialLinks[]`
- `counterPhrases` đủ jp + romaji + vn + note (7–9 phrases/guide)
- `steps` 5 bước action-first
- `commonMistakes` + `faq` 5–8 items
- `documentsChecklist`, `fees`, `whereToDo`, `whoIsThisFor` đầy đủ

### Tổng counterPhrases A10

- `long-term-care-insurance-kaigo`: 8 phrases
- `fire-earthquake-insurance-home`: 8 phrases
- `consumer-rights-cooling-off`: 9 phrases
- `study-in-japan-student-guide`: 9 phrases
- **Bonus**: DV + houterasu + vaccination ~24 phrases (chưa đếm chính xác)

Total **~58 phrases mới** cần native review.

---

## Verification

- `npm run typecheck`: ✅ Pass
- `npm run test:ci`: ✅ 251/251 pass (44 test suite)
- `npm run verify:content`: ✅ 0 issues, 0 suspicious lines, 0 lines fixed

---

## NEEDS_OFFICIAL_SOURCE_CHECK

### `long-term-care-insurance-kaigo`
- 介護保険 phí cho 40–64 + 65+ — phí thực tế thay đổi theo 市町村 + thu nhập + reform 介護保険法.
- 要介護認定 7 cấp + giới hạn hằng tháng theo 介護報酬改定 2024–2026.
- 16 bệnh đặc定 cho 第2号 — list chính xác từ 厚労省.
- 特養 vs 有料老人ホーム phí ranges 2024–2026.
- 地域包括支援センター coverage + tiếng Việt: tùy 市町村.

### `fire-earthquake-insurance-home`
- 地震保険 8 nhóm 都道府県 phí + 限度額 — confirm với GIROJ.
- 火災保険 phí ranges 2024–2026.
- 失火責任法 áp dụng cụ thể (vô ý vs 重大過失) — luật cũ 1899, nuance theo case.
- こくみん共済 / 都道府県民共済 phí (rough estimate, kiểm tra 全労済).
- 振込詐欺救済法 cho cooling-off khi đã chuyển (nói qua FAQ).
- Mức cooling-off cho cọc nhà / 礼金 / 敷金: cần luật sư bất động sản.

### `consumer-rights-cooling-off`
- 特定商取引法 8/20-ngày period — chuẩn nhưng nuance theo loại.
- 消費者契約法 1 năm / 5 năm thời hiệu vô hiệu hóa.
- 闇金 利息制限法 + 出資法 — confirm với 弁護士 chuyên đa nợ.
- 188 phiên dịch tiếng Việt coverage tùy 消費生活センター.
- NHK cooling-off applicability — vẫn là vùng tranh cãi (đã hedge nhưng cẩn thận).

### `study-in-japan-student-guide`
- 学費 ranges 2024–2026 (国公立 cố định, 私立 thay đổi).
- 奨学金 MEXT điều kiện + selection rate.
- 28 giờ/tuần アルバイト — strict luật, nuance trong kỳ nghỉ dài.
- 特定活動 sau tốt nghiệp visa — quy định thay đổi 2024–2026.
- 法務省告示 trường list — kiểm tra trực tiếp trên trang ISA trước khi giới thiệu.
- 国民健康保険 + 年金 cho học sinh — phí giảm cụ thể tùy 市町村 + 学生納付特例.

### Bonus 3 guide
- `domestic-violence-dv-support`: hotline numbers + 配偶者暴力相談支援センター hotline 0120-279-889 + 入管 nhân quyền giải pháp.
- `houterasu-legal-aid-foreigners`: 0570-078374 + thu nhập điều kiện cụ thể + đa ngôn ngữ.
- `child-vaccination-schedule`: lịch tiêm + 五種混合 mới 2024 + 任意接種 trợ cấp tùy 市町村.

---

## Priority cho native + legal review

### HIGHEST (ship blocker khi đến v1.3.3 / v1.4.0)

1. `long-term-care-insurance-kaigo` — phí + 限度額 + 16 bệnh đặc定 — confirm với 厚労省 hoặc 介護福祉士.
2. `consumer-rights-cooling-off` — quy trình 内容証明 + thời hiệu pháp lý — confirm với 弁護士 chuyên 消費者.
3. `domestic-violence-dv-support` — bảo vệ visa + hotline đa ngôn ngữ — confirm với 配偶者暴力相談支援センター.
4. `study-in-japan-student-guide` — 28 giờ/tuần + 特定活動 + 法務省告示 — confirm với 行政書士 chuyên 入管.

### HIGH

5. `fire-earthquake-insurance-home` — 失火責任法 + 借家人賠償 — confirm với 損害保険代理店 / 弁護士.
6. `houterasu-legal-aid-foreigners` — thu nhập điều kiện + 国選弁護人 quy trình.
7. `child-vaccination-schedule` — lịch tiêm 2026 + 任意接種 trợ cấp.

### MEDIUM

8. A10 counterPhrases tone — native Nhật confirm naturalness cho 58 câu mới.
9. 地震保険 phí cụ thể từng 都道府県.
10. Tax / sinh hoạt phí ranges 2026.

### LOW

11. Việc tham chiếu cross-guide cho lộ trình A10 (vd kaigo → mental-health, study → tokutei-katsudo-46).

---

## Files added

```
src/constants/content/adminGuides/guides/long-term-care-insurance-kaigo.ts
src/constants/content/adminGuides/guides/fire-earthquake-insurance-home.ts
src/constants/content/adminGuides/guides/consumer-rights-cooling-off.ts
src/constants/content/adminGuides/guides/study-in-japan-student-guide.ts
src/constants/content/adminGuides/guides/domestic-violence-dv-support.ts
src/constants/content/adminGuides/guides/houterasu-legal-aid-foreigners.ts
src/constants/content/adminGuides/guides/child-vaccination-schedule.ts
src/constants/content/adminGuides/guides/index.ts (modified — 7 imports + 7 entries)
```

---

## Next batches gợi ý (Issue #3)

### Batch A11 — P1 cuối + P2 (3 guide)
- `inheritance-will-japan-foreigners` (P1 #22) — di chúc + thừa kế cho người nước ngoài.
- `essential-apps-japan-life` (P2 #34) — app cần thiết.
- `point-cards-coupons-japan` (P2 #35) — Rakuten, dPoint, Ponta.

### Batch A12 — Policy 2026 group 1 (3 guide policy-sensitive)
- `specific-residence-card-my-number-2026` (#37).
- `myna-health-insurance-card-2026` (#38).
- `visa-fee-increase-2025-2026` (#39).

### Batch A13 — Policy 2026 group 2 + tech (3 guide)
- `naturalization-kika-2026-changes` (#40).
- `ikusei-shuro-system-guide` (#41).
- `jista-entry-system-guide` (#42).

### Batch A14 — Tech P2 cuối + Bonus
- `pet-registration-japan` (P2 #36).
- Companion guides cho topic mới phát sinh.

Sau A14 (~12 guide nữa) → đóng backlog 45 + bonus.

---

## Apple Review status (carry-over)

- **App 1.3.1** đang App Review từ 2026-05-09 (commit `d41fe21`, build #21).
- **Branch `feature/post-v1.3.2-content`** mang content cho v1.3.3 / v1.4.0 sau khi 1.3.1 ship.
- A4–A10 (24 guide + 3 bonus) chưa ship qua App Store.

---

## Commit message gợi ý

```
feat(admin): batch A10 — P0 finish + bonus daily-law/health (7 guide)

- 4 P0 final: kaigo / fire-earthquake / cooling-off / study-in-japan
- 3 bonus: DV support / houterasu / child-vaccination
- ADMIN_GUIDES: 110 → 117
- typecheck + test:ci (251/251) + verify:content all pass

Backlog 45 progress: 35/45 = 78% done.
NEEDS_OFFICIAL_SOURCE_CHECK chi tiết trong docs/content-roadmap-a10-p0-finish-guides.md
```
