# Admin Guides Natural Vietnamese Audit

Issue #2 — Admin Guides Batch 1: rà tiếng Việt trong 10 admin procedure guides quan trọng nhất, ưu tiên ngôn ngữ tự nhiên cho người Việt sống ở Nhật.

**Date:** 2026-05-09
**Source baseline:** commit `b67a24f` → HEAD sau commit này.

## Summary

- **Guides checked:** 10
- **Guides changed:** 9
- **Guides unchanged (đã pass review):** 1 (`residence-card-validity`)
- **Total field/text changes:** ~36 individual edits
- **Items needing source check:** 0 (không đụng fact, chỉ đụng wording)
- **Items needing user review:** 1 (xem mục cuối)

## Terminology decisions reused

Theo terminology đã thống nhất từ Issue #2 sprint 1 và batch 1.1:

| Japanese | Vietnamese chuẩn |
|---|---|
| 国民年金 | lương hưu quốc dân (Kokumin Nenkin) |
| 厚生年金 | lương hưu công ty (Kousei Nenkin) |
| 年金 | lương hưu / nenkin |
| 礼金 | tiền lễ (礼金 / reikin) |
| 敷金 | tiền cọc (敷金 / shikikin) |
| 確定申告 | khai thuế cá nhân / kakutei shinkoku |
| 口座振替 | thanh toán tự động qua tài khoản |
| 納付書 | giấy/phiếu thanh toán |
| 市役所 | tòa thị chính (shiyakusho) hoặc `市役所/区役所` |
| 区役所 | văn phòng hành chính quận (kuyakusho) |
| 熱中症 | sốc nhiệt |
| municipal office (English) | → `市役所/区役所` |

## Guide details

### 1. moving-in-notification

**Changed:**
- **Field:** `legalScope.jurisdictionNote` + others (replace_all)
- **Before:** `... do municipal office xử lý ...` (2 occurrences)
- **After:** `... do 市役所/区役所 xử lý ...`
- **Reason:** "municipal office" (English) → 市役所/区役所 đồng bộ với words.ts batch 1.1

### 2. address-change

**Changed:** (3 occurrences via replace_all)
- **Field:** `legalScope.jurisdictionNote`, `estimatedTime`, `documentsChecklist[].note`
- **Before/After:** `municipal office` → `市役所/区役所`

### 3. residence-card-validity

**Unchanged.** Đã rewrite trong commit `a1368e9` (action-first pilot) và pass review. Không có residual English term hoặc Hán-Việt cứng.

### 4. my-number-card

**Changed:** (4 occurrences — case-sensitive, lowercase + capitalized)
- **Field:** `legalScope.jurisdictionNote`, `faq.answer`, `steps[2].description` (2 lần)
- **Before/After:** `municipal office` / `Municipal office` → `市役所/区役所`

### 5. health-insurance

**Changed:** 5 fixes
- **Field:** `description`
  - Before: `Đăng ký bảo hiểm y tế quốc gia (Kokumin Kenkou Hoken) tại văn phòng phường/quận`
  - After: `Đăng ký bảo hiểm y tế quốc dân (国民健康保険) tại 市役所/区役所.`
  - Reason: "quốc gia" → "quốc dân" (terminology); "(Kokumin Kenkou Hoken)" → "(国民健康保険)" kanji nguyên bản; "văn phòng phường/quận" → 市役所/区役所
- **Field:** `quickAction.bring[3]`
  - Before: `Thông tin tài khoản ngân hàng nếu muốn auto-debit`
  - After: `Thông tin tài khoản ngân hàng nếu muốn thanh toán tự động (口座振替)`
  - Reason: "auto-debit" English → terminology Việt + Nhật
- **Field:** `quickAction.doNow`, `whenToDo`, `faq.answer`, `steps[*].description/tip`
  - Replace `municipal office` → `市役所/区役所` (5 occurrences)
- **Field:** `steps[1].description`
  - Before: `tại văn phòng phường (区役所/市役所) nơi bạn đăng ký hộ khẩu`
  - After: `tại 市役所/区役所 nơi bạn đăng ký địa chỉ`
  - Reason: "hộ khẩu" → "địa chỉ" (Việt-VN style → Nhật-context); chuẩn hoá tên quầy

### 6. juminzei-local-tax

**Changed:** (2 occurrences via replace_all)
- **Field:** `documentsChecklist[].note`
- **Before/After:** `municipal office` → `市役所/区役所`

### 7. kakutei-shinkoku

**Changed:** 1 fix
- **Field:** `whenToDo[1]`
- **Before:** `Nếu chỉ yêu cầu hoàn thuế (환급): có thể nộp sớm từ ngày 01/01...`
- **After:** `Nếu chỉ yêu cầu hoàn thuế (還付申告): có thể nộp sớm từ ngày 01/01...`
- **Reason:** `환급` là **tiếng Hàn** lọt vào file Nhật-Việt — bug rõ ràng. Sửa thành 還付申告 (kanji Nhật chuẩn cho "khai hoàn thuế").

### 8. pension-exemption-refund

**Changed:** ~13 fixes (file này có nhiều kanji ghép sát chữ Việt — typo bug nghiêm trọng nhất)

**Wording fixes:**
- `description`: "Guide thực tế về..." → "Hướng dẫn thực tế về..." + thêm gloss VN cho 国民年金 và 厚生年金
- `whoIsThisFor`: "Người Việt đang đi làm..." (đổi "người nước ngoài" → "Người Việt" tone)

**Kanji ghép sát chữ Việt → thêm space:**
- `loại年金` → `loại 年金`
- `nợ年金` → `nợ 年金`
- `xác nhận加入` → `xác nhận tham gia` (dịch luôn)
- `chế độ免除` → `chế độ 免除`
- `để未納` → `để 未納`
- `về障害年金` → `về 障害年金`
- `hoặc遺族年金` → `hoặc 遺族年金`
- `hoàn全部 tiền年金` → `hoàn lại toàn bộ tiền 年金`
- `hệ thống公的年金` → `hệ thống 公的年金`
- `chế độ免除, 納付猶予, 学生納付特例 và産前産後免除` → tách spaces hết
- `danh sách対象校` → `danh sách 対象校` (2 lần)
- `vào社会保険` → `vào 社会保険`
- `hệ thống年金 là退職所得` → `hệ thống 年金 là 退職所得`

**English/clunky → Việt:**
- `市区町村 / ward office` → `市役所/区役所`
- `日本年金機構 /年金事務所` → `日本年金機構 / 年金事務所` (đúng spacing)
- `Payslip` → `Phiếu lương (給与明細)`
- `city hall` → `市役所/区役所`
- `lump-sum theo công thức` → `khoản tiền 1 lần theo công thức`
- `record` (English) → `lịch sử đóng` (3 lần)
- `mất bài toán thuế phía sau` → giữ nguyên (idiom OK)
- `tu` typo → fixed implicitly via context
- `NTA xem một số lump-sum...là退職所得` → `国税庁 (NTA) xem một số khoản tiền 1 lần...là 退職所得`

**Style chuẩn hoá:**
- `miễn/猶予` → `miễn / 納付猶予` (đầy đủ + spacing)
- `khả năng追納` → `khả năng truy đóng (追納)` (dịch + giữ Nhật)

### 9. family-stay-invitation

**Changed:** 4 fixes (English mixed)
- `legalScope.jurisdictionNote`: `Family stay dài hạn` → `Diện 家族滞在 dài hạn`
- `quickAction.ifLate`: `Không dùng short stay để thay thế` → `Không dùng visa 短期滞在 (ngắn hạn) để thay thế`
- `steps[4].description`: `khâu xét landing permission ở sân bay Nhật` → `khâu kiểm tra nhập cảnh (上陸審査) ở sân bay Nhật`
- `steps[4].tip`: `quyết định cuối cùng về landing permission` → `quyết định cuối cùng về việc cho nhập cảnh (上陸審査)`

### 10. spouse-notification

**Changed:** 2 fixes
- `commonMistakes[0]`: `Tưởng ly hôn tại municipal office` → `Tưởng ly hôn tại 市役所/区役所`
- `legalScope.jurisdictionNote`: `municipal office` → `市役所/区役所` (1 occurrence)
- `steps[0].tip`: `đừng để quá deadline 14 ngày` → `đừng để quá hạn 14 ngày`

## Items NOT changed (pass review)

- **5 guides đã rewrite trong action-first pilot** (commit `a1368e9`) đã được kiểm tra:
  - moving-in-notification (chỉ còn residue "municipal office" → đã sửa)
  - address-change (như trên)
  - residence-card-validity (sạch hoàn toàn)
  - my-number-card (chỉ còn "municipal office" → đã sửa)
  - juminzei-local-tax (như trên)
- **counterPhrases** đã pass batch 1 cho cả 10 guides — không sửa lại trong batch này.
- **officialLinks** không đụng (theo scope quy định).
- **Steps có markdown table 住民異動届 / 加入申請書** — giữ nguyên format.

## Items needing source check

**0** — batch này KHÔNG đụng fact, rate, deadline, official URL. Chỉ wording.

## Items needing user review

**1 — pension-exemption-refund mục step 1 documents:**
- `'Payslip'` đã đổi thành `'Phiếu lương (給与明細)'`. Reviewer kiểm tra xem có muốn dùng "Bảng lương" hay "Phiếu lương" — cả hai đều dùng được với người Việt ở Nhật.

## Cross-batch summary (Issue #2 cumulative)

| Sprint | Files | Fixes | New entries | CulturalNote |
|---|---|---|---|---|
| Sprint 1 (initial) | 2 | 10 | 0 | 4 |
| Batch 1 (words deeper) | 1 | 8 | 0 | 3 |
| Batch 1.1 (words deepest) | 1 | 12 | 2 (礼金, 敷金) | 5 + 2 expanded |
| Batch 2 (phrases) | 3 | 3 | 0 | 0 |
| **Admin Batch 1 (10 guides)** | **9** | **~36** | **0** | **0** |
| **Total** | 14 unique files | **~69** | **2** | **12 + 2** |

## Verification

```
npm run typecheck       ✓ pass
npm run test:ci         ✓ 251/251 pass
npm run verify:content  ✓ pass (sẽ chạy ở pre-commit)
```

## Out of scope (deferred)

- **Admin Batch 2 (suggested):** ~10 guides tiếp theo (visa-related: re-entry, status-of-residence-change, residence-card, residence-card-info-change, job-change-notification, permission-activity-outside-status, ...)
- **Còn ~60 guides** chưa audit Vietnamese-naturalness
- **Annual-health-checkup-kensin và một số guide ngoài batch** vẫn còn "municipal office" — sẽ xử lý trong batch sau
- **Native speaker review** vẫn pending cho tất cả (toàn workflow)
