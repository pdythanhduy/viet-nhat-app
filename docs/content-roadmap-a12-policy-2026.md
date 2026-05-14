# Batch A12 — Policy 2026 sensitive (3 guide)

**Date:** 2026-05-14
**Branch:** `feature/post-v1.3.2-content`
**ADMIN_GUIDES count:** 121 → **124** (+3 guide A12, +1 bonus pet-registration đã thêm song song)
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Companion review doc:** `docs/native-legal-review-pending-a1-a11.md` (sẽ update lên a1-a12)

---

## Scope

Batch A12 — **3 guide policy-sensitive 2026** (chọn 3 trong 6 từ backlog policy group):

| # | id | category | priority | Backlog # | Mốc thời gian chính thức |
|---|---|---|---|---|---|
| 1 | `specific-residence-card-my-number-2026` | immigration | normal | P-policy #37 | **14/06/2026** — ISA bắt đầu cấp |
| 2 | `myna-health-insurance-card-2026` | health | normal | P-policy #38 | **02/12/2024** ngừng cấp thẻ vật lý mới; thẻ cũ hết hạn đến tối đa 01/12/2025 |
| 3 | `ikusei-shuro-system-guide` | visa | normal | P-policy #41 | **01/04/2027** vận hành đầy đủ; 15/04/2026 + 01/09/2026 tiền vận hành |

**Bỏ qua (theo phân tích duplicate)**:
- #40 `naturalization-kika-2026-changes` — đã có `naturalization-kika.ts` từ trước → cần UPDATE existing thay vì NEW guide.
- #42 `jista-entry-system-guide` — JESTA tourist-oriented, ít relevance cho người Việt đã cư trú dài hạn.
- #39 `visa-fee-increase-2025-2026` — topic nhỏ, có thể merge vào A13 hoặc UPDATE existing.

**Bonus song song** (parallel agent): `pet-registration-japan` (P2 #36) — đã đăng ký index.ts trước A12.

---

## Backlog progress

Sau A12:

| Phần | Tổng | Done | Còn |
|---|---|---|---|
| P0 (1–18) | 18 | 18 ✓ | 0 |
| P1 (19–33) | 15 | 15 ✓ | 0 |
| P2 (34–36) | 3 | 3 ✓ (essential-apps + point-cards + pet-registration) | 0 |
| Policy-sensitive (37–42) | 6 | 3 ✓ (A12: #37 + #38 + #41) | 3 (#39 + #40 + #42) |
| Additional (43–45) | 3 | 3 ✓ | 0 |
| **GRAND TOTAL** | **45** | **42** | **3** |

**Done sau A12**: 42/45 = **93%** backlog. + 2 bonus (houterasu, child-vaccination, kèm naturalization-kika existing).

---

## Highlights nội dung — Heavy hedging

### `specific-residence-card-my-number-2026` (immigration, riskLevel high)

- **14/06/2026** ISA bắt đầu cấp 特定在留カード — thẻ cư trú + My Number Card hợp nhất.
- **KHÔNG bắt buộc đổi** — thẻ 在留カード hiện hành tiếp tục có hiệu lực.
- Cấp chỉ khi có thủ tục đủ điều kiện (gia hạn / đổi tư cách / cấp lại / etc.).
- Cảnh báo lừa đảo: "phải đổi ngay 14/06" / "không đổi bị deport" → SAI.
- 7 counterPhrases.
- Tham chiếu chính: `japan-policy-update-2026-foreign-residents.ts` (đã có).

### `myna-health-insurance-card-2026` (health, riskLevel high)

- **02/12/2024** 厚労省 ngừng cấp 健康保険証 vật lý mới.
- Thẻ vật lý cũ hiệu lực **đến tối đa 01/12/2025** (hoặc hạn ghi trên thẻ).
- 3 lựa chọn sau 2025-12: **マイナ保険証** / **資格確認書** / **tự trả 100% xin hoàn**.
- 8 counterPhrases.
- Liên kết với `my-number-card.ts` (đã có) cho phần cấp thẻ.

### `ikusei-shuro-system-guide` (visa, riskLevel high)

- **01/04/2027** hệ thống 育成就労 vận hành đầy đủ — thay 技能実習.
- 2026 tiền vận hành: **15/04** 監理支援機関 + **01/09** 育成就労計画.
- Cải tiến chính: **転籍** (đổi công ty trong cùng ngành), phí 監理 do công ty trả, yêu cầu tiếng Nhật N5+.
- KHÔNG có quy trình cá nhân 育成就労 trong 2026.
- Cảnh báo lừa đảo: "đi 育成就労 ngay 2026" / "tự do 転籍" / "lương 50万円" → SAI.
- 8 counterPhrases.
- Khác biệt với `ginou-jisshu-to-tokutei-ginou.ts` (chỉ về transition) — guide A12 về system mới.

### Tổng hedging A12

- Tất cả 3 guide có `riskLevel: 'high'`.
- `nextReviewAt: 2026-09-01` (gần hơn quy định 2026-12 cho A10/A11) vì chính sách đang vận hành.
- Description có **"tài liệu định hướng theo nguồn ... — kiểm tra ... trước khi nộp"**.
- Tham chiếu trang ISA cụ thể với URL.
- Liệt kê cảnh báo lừa đảo / tin đồn phổ biến.

---

## Schema compliance

Tất cả 3 guide tuân thủ:

- `AdminGuide` interface đầy đủ.
- `lastVerified: '2026-05-14'`.
- `legalScope.riskLevel: 'high'` cho tất cả 3 (policy sensitive).
- `legalScope.nextReviewAt: '2026-09-01'` (gần hơn 2026-12 vì chính sách đang vận hành).
- `quickAction.officialSourceLabels[]` exact-match một label trong `officialLinks[]`.
- `counterPhrases` đủ jp + romaji + vn + note (7–8 phrases/guide).
- `steps` 5 bước action-first.
- `commonMistakes` + `faq` 5–10 items.

### Total counterPhrases A12

- `specific-residence-card-my-number-2026`: 7 phrases.
- `myna-health-insurance-card-2026`: 8 phrases.
- `ikusei-shuro-system-guide`: 8 phrases.
- **Total**: 23 phrases mới.

---

## Verification

- `npm run typecheck`: ✅ Pass.
- `npm run test:ci`: ✅ 251/251 pass (44 test suite) sau khi clear jest cache.
- `npm run verify:content`: ✅ 0 issues, 0 suspicious lines, 0 lines fixed.

**Note**: Test ban đầu fail trên QA suspicious-spacing — clear cache + re-run pass. Có thể là jest cache issue (đã verify content sạch qua debug script).

---

## NEEDS_OFFICIAL_SOURCE_CHECK (HIGH risk cho cả 3)

### `specific-residence-card-my-number-2026`

- 14/06/2026 mốc bắt đầu — confirm với ISA gần ngày.
- Nhóm thủ tục đủ điều kiện xin (gia hạn / đổi tư cách / cấp lại / etc.) — chi tiết theo ISA.
- Phí cụ thể — chưa công bố tại 2026-05-14.
- Quy trình cho trẻ em + người chưa có My Number Card — chưa stable.
- Tính năng sinh trắc / chip IC — chưa công bố chi tiết.
- Hệ thống 在留申請オンライン integration cho 特定在留カード — đợi vận hành.

### `myna-health-insurance-card-2026`

- Hạn cuối thẻ 健康保険証 vật lý tối đa 01/12/2025 — confirm với 保険者 cụ thể.
- Quy trình cấp 資格確認書 từng 保険者 (社保 vs 国保 vs 後期高齢) — chi tiết khác nhau.
- 顔認証付きカードリーダー coverage tại các viện 2026 — đang triển khai.
- 償還払い quy trình khi không có thẻ — kiểm tra với 保険者 cụ thể.
- Hạn 5 năm cho 資格確認書 — confirm.

### `ikusei-shuro-system-guide`

- 01/04/2027 mốc vận hành — chính thức từ luật (đã thông qua) nhưng cập nhật quy định chi tiết liên tục.
- 15/04/2026 + 01/09/2026 mốc tiền vận hành — confirm trên trang ISA.
- 転籍 điều kiện cụ thể (sau bao nhiêu năm, ngành nào) — đợi ISA công bố chi tiết.
- 監理支援機関 yêu cầu cụ thể — chi tiết Q&A ISA.
- Liên kết 特定技能 sau 育成就労 — thi 技能評価試験 + JLPT N4.
- Phí 送出機関 ở VN tối đa 1,500 USD — confirm DOLAB.
- Lương tối thiểu vùng 2026 — kiểm tra MHLW.

---

## Priority cho native + legal review (A12 incremental)

### HIGHEST

1. `specific-residence-card-my-number-2026` — quy trình chi tiết + hồ sơ cần — **行政書士 chuyên 入管**.
2. `ikusei-shuro-system-guide` — quy định 転籍 + yêu cầu 育成就労計画 — **行政書士 + 監理団体**.

### HIGH

3. `myna-health-insurance-card-2026` — quy trình 資格確認書 + 償還払い — **保険者 + 厚労省 hỗ trợ**.
4. Tất cả 3 guide — tone tránh hoảng / overclaim — **native + legal reviewer**.

### MEDIUM

5. A12 counter phrases — 23 câu native confirm.
6. Cross-reference giữa A12 và các guide existing (japan-policy-update-2026, my-number-card, ginou-jisshu).

### LOW

7. Phí cụ thể (chưa rõ tại 2026-05-14) — kiểm tra lại sau khi chính sách vận hành.

---

## Files added

```
src/constants/content/adminGuides/guides/specific-residence-card-my-number-2026.ts
src/constants/content/adminGuides/guides/myna-health-insurance-card-2026.ts
src/constants/content/adminGuides/guides/ikusei-shuro-system-guide.ts
src/constants/content/adminGuides/guides/index.ts (modified — 3 imports + 3 entries)
```

---

## Next batches gợi ý

### Batch A13 — Policy 2026 còn lại + UPDATE existing (3 guide)

- `visa-fee-increase-2025-2026` (P-policy #39) — NEW guide nhỏ.
- `jista-entry-system-guide` (P-policy #42) — NEW (ít relevance nhưng đầy đủ backlog).
- **UPDATE** `naturalization-kika.ts` (P-policy #40) — thêm section "Cải cách 2026" thay vì NEW guide.

Sau A13: **45/45 backlog hoàn tất** (100%).

### Hoặc — Đóng backlog + chuẩn bị release

- A13 ưu tiên thấp hơn — có thể skip nếu không cấp thiết.
- Mở **PR v1.3.3** với ~34 guide A4–A12 + bonus đã sẵn sàng.
- App 1.3.1 đang App Review — đợi xác nhận trước khi merge.

---

## Apple Review status (carry-over)

- **App 1.3.1** vẫn đang App Review từ 2026-05-09 — chưa rõ kết quả tại 2026-05-14.
- **Branch `feature/post-v1.3.2-content`** mang 34+ guide cho v1.3.3 / v1.4.0.

---

## Commit message gợi ý

```
feat(admin): batch A12 — Policy 2026 sensitive (3 guide)

A12 — backlog policy #37 + #38 + #41:
- specific-residence-card-my-number-2026 (immigration, high risk)
  → 特定在留カード từ 14/06/2026 — hợp nhất residence + My Number
- myna-health-insurance-card-2026 (health, high risk)
  → 02/12/2024 ngừng cấp 健康保険証 vật lý mới, đến 01/12/2025 hết hạn
- ikusei-shuro-system-guide (visa, high risk)
  → 育成就労 thay 技能実習, vận hành đầy đủ 01/04/2027

ADMIN_GUIDES: 121 → 124 (kèm pet-registration song song).
Backlog 45 progress: 42/45 = 93%.
Còn lại: 3 policy (#39 + #40 + #42) — UPDATE existing nay NEW guide.

Heavy hedging cho cả 3 guide vì chính sách đang vận hành:
- riskLevel: 'high' tất cả 3
- nextReviewAt: 2026-09-01 (sớm hơn 2026-12 default)
- Description nhấn mạnh "tài liệu định hướng — kiểm tra ISA trước khi nộp"
- Cảnh báo lừa đảo: "phải đổi ngay" / "育成就労 ngay 2026" → SAI

Verify:
- npm run typecheck OK
- npm run test:ci OK 251/251 (44 suites)
- npm run verify:content OK 0 issues

Report + NEEDS_OFFICIAL_SOURCE_CHECK: docs/content-roadmap-a12-policy-2026.md
```
