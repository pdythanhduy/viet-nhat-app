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

- **Admin Batch 3 (suggested):** ~10 guides tiếp theo (life events, family, traffic, daily-law…)
- **Còn ~60 guides** chưa audit Vietnamese-naturalness
- **Annual-health-checkup-kensin và một số guide ngoài batch** vẫn còn "municipal office" — sẽ xử lý trong batch sau
- **Native speaker review** vẫn pending cho tất cả (toàn workflow)

---

# Admin Guides Batch 2 (2026-05-09)

10 guides nhóm visa / lưu trú / công việc.

## Summary

- **Guides checked:** 10
- **Guides changed:** 8
- **Guides unchanged:** 2 (`job-change-notification`, `visa-status-overview` — đã đọc tự nhiên, không cần đụng)
- **Total field/text changes:** ~25 individual edits
- **Critical language bugs found:** 2
  - 1 typo: "chở sang ngày mai" → "chờ sang ngày mai" (overstaying)
  - 1 self-induced bug: bulk-replace "permission" làm hỏng tên biến (đã sửa ngay tại commit cùng patch)
- **Items needing source check:** 0
- **Items needing user review:** 0

## 10 guides mapping

| User-listed ID | Actual file used | Notes |
|---|---|---|
| re-entry-permit | re-entry | Same content |
| status-of-residence-change | status-of-residence-change | ✓ |
| residence-card | residence-card | ✓ |
| residence-card-info-change | residence-card-info-change | ✓ |
| job-change-notification | job-change-notification | ✓ |
| work-visa-basic | visa-status-overview | Closest tổng quan visa |
| specified-skilled-worker | ssw-training-worker-2027 | 特定技能 + 育成就労 mới |
| visa-renewal | (skipped — same as residence-card "Gia hạn thời hạn lưu trú") |
| overstaying-illegal-stay-procedures | overstaying-illegal-stay-procedures | ✓ |
| freelance-side-job-work-visa-rules | freelance-side-job-work-visa-rules | ✓ |
| (substitute) | permission-activity-outside-status | Replace cho slot trùng visa-renewal |

## Guide details

### 1. residence-card-info-change

Changed:
- 4 occurrences: `municipal office` → `市役所/区役所` (replace_all)
- `Giấy tờ Việt Nam/nhật` → `Giấy tờ Việt Nam / Nhật` (capitalize + space)

Reason: terminology consistency với batch 1, fix typo capitalize.

### 2. residence-card

Changed:
- whenToDo: `... municipal office hoặc người bảo lãnh` → `... 市役所/区役所 hoặc người bảo lãnh`

Reason: terminology consistency.

### 3. re-entry

Changed:
- bring + ifLate + steps: `permit chính thức` (3 occurrences) → `再入国許可 chính thức` / `giấy phép chính thức`

Reason: "permit" English → giữ tên Nhật chuẩn (再入国許可) ở chỗ context cụ thể, "giấy phép chính thức" ở chỗ generic.

### 4. status-of-residence-change

Changed:
- whoIsThisFor: `đi làm theo diện work visa` → `đi làm theo diện visa lao động`
- commonMistakes: `online system không nhận hồ sơ` → `hệ thống online không nhận hồ sơ`

Reason: "work visa" và "online system" English thừa.

### 5. ssw-training-worker-2027

Changed:
- doNow: `Xác định status hiện tại:` → `Xác định tình trạng hiện tại:`

Reason: "status" English → "tình trạng" Việt.

### 6. permission-activity-outside-status

Changed:
- 4 occurrences: `permission` (English) → `giấy phép`
- `như風俗営業` → `như 風俗営業` (kanji-glued fix)

⚠️ **Bug self-induced trong patch này:** replace_all `permission` → `giấy phép` làm hỏng cả tên biến `permissionActivityOutsideStatus` và id `permission-activity-outside-status`. Đã sửa ngay (revert tên biến + id) trước khi commit. Code TS lại pass, chỉ user-facing strings còn fix mới. Bài học: replace_all phải tránh từ trùng tên định danh code.

### 7. overstaying-illegal-stay-procedures (heavy fixes — file đầy English)

Changed (~10 fixes):
- **Typo bug**: `chở sang ngày mai` → `chờ sang ngày mai` (lỗi đánh máy rõ ràng)
- `tự ngỏ` → `tự khai báo` (tự ngỏ không phải VN tự nhiên)
- description: `"grace period" tự động` → `thời gian "đệm" tự động`
- whenToDo: `apply rescue measure (救済措置)` → `xin biện pháp cứu trợ (救済措置)`
- estimatedTime: `Nếu apply rescue: ... Nếu tự ra nước ngoài (departure): ... 1 năm upper entry ban` → `Nếu xin cứu trợ (救済措置): ... Nếu tự ra nước ngoài qua 出国命令: ... cấm nhập cảnh 1 năm`
- commonMistakes: `entry ban` → `cấm nhập cảnh`; `(self-departure)` → `(tự rời Nhật)`; `này là` → `đây là` (typo)
- faq: `"grace period"` → `thời gian "đệm"`; `apply rescue` → `nộp đơn xin cứu trợ`
- faq: `(deportation order)` → `(lệnh tự rời Nhật)`; `entry ban` → `cấm nhập cảnh` (multiple)
- faq: `cảnh báo/fine` → `cảnh báo / phạt tiền`
- faq: `Rescue measure không áp dụng` → `Biện pháp cứu trợ không áp dụng nữa`

### 8. freelance-side-job-work-visa-rules (heavy fixes — file đầy English)

Changed (~6 fixes):
- whenToDo: `tốt hơn là ask first.` → `Hỏi trước luôn an toàn hơn.`
- commonMistakes: `\"business\" (kinh doanh) vs \"part-time job\" (việc thêm) — rule khác nhau` → `"kinh doanh" (business) và "việc làm thêm part-time" — quy tắc xin phép khác nhau`
- faq: `không phạt retroactive` → `không phạt ngược về quá khứ`
- step 2 description: `time limit (thường 1 năm)` → `thời hạn (thường 1 năm)`
- step 3 description: `cần 開業届 (business registration)` → `cần nộp 開業届 (đăng ký mở kinh doanh) tại 税務署`
- step 1 table: `may report thuế` → `vẫn phải khai thuế` (typo "may" → "vẫn phải")

## Items NOT changed

- **2 guides** đã đọc rất tự nhiên: `job-change-notification`, `visa-status-overview`. Đa số dùng tone Việt-thực-dụng, có giải thích kanji khi cần.
- **counterPhrases / steps tables / officialLinks**: không đụng theo scope.
- **Một số English-Vietnamese mixing acceptable** (vd "freelance", "side job" lặp đi lặp lại trong freelance file): để lại vì người Việt ở Nhật trong context đó vẫn dùng nguyên tiếng Anh — không phải clunky.

## Critical language bugs found

1. **`overstaying-illegal-stay-procedures.ts:27`** typo: `chở sang ngày mai` (không có nghĩa) → fixed thành `chờ sang ngày mai`.
2. **Self-induced regression** trong patch này: `permission-activity-outside-status.ts` bị bulk-replace làm hỏng tên biến `permissionActivityOutsideStatus` và id field. Đã restore trước khi commit. typecheck pass.

## Cross-batch summary (Issue #2 cumulative)

| Sprint | Files | Fixes | New entries | CulturalNote |
|---|---|---|---|---|
| Sprint 1 (initial) | 2 | 10 | 0 | 4 |
| Batch 1 (words deeper) | 1 | 8 | 0 | 3 |
| Batch 1.1 (words deepest) | 1 | 12 | 2 (礼金, 敷金) | 5 + 2 expanded |
| Batch 2 (phrases) | 3 | 3 | 0 | 0 |
| Admin Batch 1 (10 guides) | 9 | ~36 | 0 | 0 |
| **Admin Batch 2 (10 guides)** | **8** | **~25** | **0** | **0** |
| **Total** | 22 unique files | **~94** | **2** | **12 + 2** |

## Verification (Batch 2)

```
npm run typecheck       ✓ pass
npm run test:ci         ✓ 251/251 pass
npm run verify:content  ✓ pass (sẽ chạy ở pre-commit)
```
