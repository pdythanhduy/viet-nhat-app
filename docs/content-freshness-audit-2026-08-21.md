# Content freshness + luật mới 2026 — audit 2026-08-21

**Scope**: 127 admin guides. Tiếp nối [`content-freshness-audit-2026-07-11.md`](content-freshness-audit-2026-07-11.md) — quét tin luật/chính sách mới cho người nước ngoài tại Nhật trong 41 ngày qua (07-11 → 08-21), tập trung nhập cư/visa và thuế/bảo hiểm/lao động.
**Trigger**: yêu cầu rà soát toàn bộ hướng dẫn xem có nội dung cũ / có chính sách mới về người nước ngoài tại Nhật cần cập nhật.
**Phương pháp**: 2 agent nghiên cứu song song (nhập cư/visa; thuế-bảo hiểm-lao động) quét tin 07-11→08-21, đối chiếu với nội dung 5 guide trọng tâm đã đọc trực tiếp, xác minh số liệu thuế qua WebFetch (NTA + Money Forward) trước khi áp dụng.

---

## 1. Trạng thái độ-cũ (tính tới 2026-08-21, trước khi sửa)

| Bucket | Số guide |
|---|---|
| > 90 ngày | 92 |
| 60–90 ngày | 10 |
| 31–41 ngày | 25 (đợt 07-11) |

Nợ governance tiếp tục tăng — không có đợt re-verify hàng loạt nào từ 07-11. Đợt này KHÔNG cố re-verify toàn bộ 92 guide (rủi ro bump lastVerified mà không kiểm nguồn thật — vi phạm nguyên tắc "KHÔNG làm" của audit trước); chỉ sửa guide có phát hiện chính sách cụ thể + 3 guide đã đọc kỹ mà không phát hiện sai sót (kakutei-shinkoku, kokuho-reduction — bump có căn cứ).

---

## 2. Phát hiện quan trọng + đã sửa

### 2.1 🔴 SỬA SỐ LIỆU SAI — phí đổi/gia hạn tư cách lưu trú + vĩnh trú
`visa-fee-increase-2025-2026.ts` từng ghi "政令 dự thảo... nâng trần lên 10万円/30万円" như thể đó là mức phí thực tế. **Sai**: 10万/30万円 chỉ là TRẦN tối đa luật cho phép (luật sửa 入管法 thông qua 2026-05-29, công bố 2026-06-05, 令和8年法律第32号). Nghị định (政令) dự thảo thực tế — công bố 2026-07-03, lấy ý kiến đến 2026-08-02 — quy định mức THẤP HƠN nhiều: đổi/gia hạn tư cách theo bậc **1万–7.5万円** (tùy thời hạn còn lại), vĩnh trú **20万円**. Tính đến 2026-08-21, nghị định vẫn CHƯA công bố trên 官報; mốc hiệu lực dự kiến vẫn 2026-10-01.
✅ Đã sửa `visa-fee-increase-2025-2026.ts` (step 5 + legalScope + lastVerified/sourceVerifiedAt/nextReviewAt→2026-09-25).

### 2.2 🆕 MỚI — dự thảo tổng rà soát tiêu chuẩn xét vĩnh trú (永住許可ガイドライン)
Chưa từng được ghi nhận trong các audit trước. ISA công bố dự thảo **2026-08-04**, lấy ý kiến công khai đến **2026-09-04**. Nội dung: thu nhập hộ phải trên trung bình cả nước (tính cả thân nhân phụ thuộc ở nước ngoài), thêm kiểm tra tài sản/年金, yêu cầu MỚI tiếng Nhật **CEFR B1**, diện vợ/chồng kéo dài 3→5 năm kết hôn / 1→3 năm cư trú, hồ sơ thuế/bảo hiểm trừ điểm nặng hơn. Hiệu lực chính dự kiến **2027-04-01**, phần thu nhập/nghĩa vụ công có thể hồi tố từ **2026-04-01** cho hồ sơ còn treo tại 2026-10-01.
✅ Đã thêm FAQ + keyTerm mới vào `permanent-residency-eijuu.ts` (lastVerified/sourceVerifiedAt→2026-08-21, nextReviewAt→2026-09-04) + nhắc trong `japan-policy-update-2026-foreign-residents.ts` và `japan-policy-2026-action-by-user-type.ts`.

### 2.3 ✅ Tăng cường thực thi — 226 nhân sự ISA mới, mục tiêu giảm tồn đọng trục xuất
Nội các quyết định 2026-07-28 (hiệu lực 2026-07-31): bổ sung 226 nhân sự ISA (176 điều tra + 50 cưỡng chế), tập trung Tokyo + Ibaraki; mục tiêu giảm một nửa số án 退去強制 tồn đọng (~3,100 người) trong 5 năm; ngân sách FY2027 dự kiến gấp đôi (~22.9 tỷ yên) cho biện pháp chống overstay.
✅ Đã thêm FAQ vào `overstaying-illegal-stay-procedures.ts` (không đổi nội dung pháp lý cốt lõi, chỉ củng cố thông điệp "xử lý ngay").

### 2.4 🔴 SỬA/BỔ SUNG — thuế thu nhập 令和8年/2026 đã có số liệu chính thức
`tax-year-end-adjustment-filing.ts` trước đó ghi số liệu 2026 là "dự kiến, công bố mùa thu 2026" — thực ra 国税庁 đã công bố CHÍNH THỨC từ ~05/2026 (trước cửa sổ tìm kiếm nhưng chưa từng được đưa vào guide): 基礎控除 58万→**62万円** (thu nhập ≤2,350万), 給与所得控除 tối thiểu 65万→**69万円**, kết hợp cơ chế đặc biệt → bức tường miễn thuế cho người làm công lên **178万円**, THAY THẾ hẳn mốc 160万 tạm thời của 2025. Xác minh qua WebFetch: `nta.go.jp/users/gensen/2026kiso` (xác nhận cải cách + hiệu lực từ lương tháng 1/2027) + Money Forward (xác nhận số liệu cụ thể).
✅ Đã sửa keyTerm `基礎控除` trong `tax-year-end-adjustment-filing.ts` + thêm link NTA + bump lastVerified/sourceVerifiedAt→2026-08-21.

### 2.5 ✅ Số liệu mới củng cố cảnh báo — nợ 住民税 khi rời Nhật
Khảo sát Bộ Nội vụ Nhật (~1,100 địa phương, công bố 2026-08-14): tỷ lệ nợ đọng 住民税 của người nước ngoài ĐÃ rời Nhật sau khi làm việc là **18.6%** (so với 4.6% chung), tổng nợ ~52 tỷ yên.
✅ Đã thêm FAQ vào `juminzei-local-tax.ts` (bump lastVerified/sourceVerifiedAt→2026-08-21).

### 2.6 ✅ Không phát hiện thay đổi — đã kiểm tra, giữ nguyên nội dung
- `kakutei-shinkoku.ts`, `kokuho-reduction.ts`: đọc kỹ toàn bộ, đối chiếu với 2 agent nghiên cứu — không có thay đổi chính sách nào ảnh hưởng. Bump lastVerified/sourceVerifiedAt→2026-08-21 (có căn cứ, không phải bump mù).
- Kokuho unpaid → visa/PR review (mốc 2027-06): khớp nội dung hiện tại, không có gì mới/sớm hơn.
- 技能実習→育成就労 (mốc 2027-04-01): không có 閣議決定 mới trong cửa sổ này — mốc 09/2026 vẫn như dự kiến, giữ nguyên `japan-policy-update-2026-foreign-residents.ts`.
- Hạn chế mua bất động sản của người nước ngoài: vẫn đình trệ, không có tin mới.
- Quy tắc đổi bằng lái: không đổi kể từ 10/2025, ngoài phạm vi cửa sổ này.

### 2.7 Không sửa (mức độ liên quan thấp / cần guide riêng khác)
- Lương tối thiểu 2026 (+55円 → bình quân 1,176円/giờ, hiệu lực ~01/10/2026 theo tỉnh): không foreigner-specific, ảnh hưởng gián tiếp lương 技能実習/特定技能 — để dành cho đợt re-verify `payslip-reading.ts` / `ssw-training-worker-2027.ts` / `ginou-jisshu-to-tokutei-ginou.ts` sau (chưa đọc kỹ 3 guide này đợt này).
- 在職老齢年金 ngưỡng 51万→65万円 đã hiệu lực 2026-04-01 (không phải "sắp tới"): hiện KHÔNG guide nào mô tả sai (chưa guide nào đề cập), không cần sửa gấp.

### 2.8 Guide "policy roundup" — làm mới thì hiện tại, gỡ bỏ ngôn ngữ tương lai đã thành quá khứ
`japan-policy-update-2026-foreign-residents.ts` và `japan-policy-2026-action-by-user-type.ts` viết theo thì tương lai cho các mốc nay đã qua (VD "từ 14/06/2026 sẽ bắt đầu..." — nay đã 08/2026). Đã sửa văn phong sang "đã áp dụng" + thêm mục 2 dự thảo mới (§2.1, §2.2) làm nội dung "đang diễn ra" chính của guide. Bump lastVerified cả hai → 2026-08-21.

---

## 3. Tổng kết thay đổi trong đợt này

| File | Thay đổi |
|---|---|
| `visa-fee-increase-2025-2026.ts` | Sửa số liệu sai (10万/30万 là trần, không phải phí thực) → số liệu đúng theo 政令 dự thảo (1万–7.5万 bậc / 20万 vĩnh trú); bump ngày |
| `permanent-residency-eijuu.ts` | Thêm FAQ + keyTerm mới: dự thảo tổng rà soát tiêu chuẩn xét vĩnh trú 08/2026 (B1 tiếng Nhật, thu nhập, thời gian vợ/chồng); bump ngày |
| `overstaying-illegal-stay-procedures.ts` | Thêm FAQ: tăng cường 226 nhân sự ISA, mục tiêu giảm tồn đọng trục xuất; bump ngày |
| `tax-year-end-adjustment-filing.ts` | Sửa keyTerm 基礎控除: số liệu 令和8年/2026 CHÍNH THỨC (62万/69万/178万) thay vì "dự kiến"; thêm link NTA; bump ngày |
| `juminzei-local-tax.ts` | Thêm FAQ: số liệu nợ đọng 18.6% khi rời Nhật (08/2026); bump ngày |
| `kakutei-shinkoku.ts`, `kokuho-reduction.ts` | Đọc kỹ, xác nhận không đổi, bump ngày có căn cứ |
| `japan-policy-update-2026-foreign-residents.ts` | Sửa thì tương lai→hiện tại cho mốc đã qua (14/06/2026); thêm FAQ tổng hợp 2 dự thảo mới; bump ngày |
| `japan-policy-2026-action-by-user-type.ts` | Thêm FAQ + cập nhật bước 4: liên kết 2 dự thảo mới; bump ngày |

**Verify**: `typecheck` ✅, `verify:content` (encoding + BJT gate) ✅, full test suite (526 tests / 70 suites) ✅.

**Lưu ý kỹ thuật phát sinh**: script `content-encoding-audit.js` báo false-positive với chuỗi "ĐÃ " (Đã viết hoa toàn bộ) vì ký tự "Ã" (U+00C3) trùng pattern nghi mojibake `/Ã./`. Đã đổi thành "Đã" (chỉ viết hoa chữ đầu) ở các đoạn mới thêm — không đổi nghĩa, gate xanh trở lại. Ghi chú cho đợt sau: tránh dùng "ĐÃ" toàn hoa trong nội dung mới.

---

## 4. Kế hoạch đợt tiếp theo (ưu tiên)

1. **Theo dõi 2 dự thảo đang góp ý**: nghị định phí (đóng góp ý đã xong 2026-08-02, chờ công bố 官報 — kiểm tra lại quanh 2026-09-25 trước mốc hiệu lực 10/01) và dự thảo tiêu chuẩn vĩnh trú (góp ý đến 2026-09-04 — kiểm tra lại ngay sau đó).
2. **92 guide >90 ngày còn lại** — re-verify theo nhóm chủ đề, ưu tiên: `payslip-reading.ts` / `ssw-training-worker-2027.ts` / `ginou-jisshu-to-tokutei-ginou.ts` (liên quan lương tối thiểu 2026 mới xác nhận), rồi tới nhóm giao thông/gia đình/ngân hàng còn lại từ đợt 05/2026.
3. **Audit link chết định kỳ** — lần cuối làm 07-11 (349 URL); nên lặp lại vì đã hơn 1 tháng.

**KHÔNG làm**: bump hàng loạt `lastVerified` mà chưa kiểm nguồn thật; sửa số liệu khi chưa verify trang chính thức; đoán URL thay thế mà không search+verify.

---

## Nguồn mới dùng trong audit này

- office-tree.jp / jeepney-office.jp (2026-07-03 trở đi) — chi tiết 政令 phí 在留資格変更/永住許可 theo bậc
- e-Gov パブリックコメント 案件番号 315000140 — dự thảo 永住許可ガイドライン (04/08/2026 → 04/09/2026)
- 東京新聞 (2026-07-28) — chỉ trích パブコメ chỉ có tiếng Nhật cho chính sách ảnh hưởng người nước ngoài
- 日経新聞 (~2026-07-20, ~2026-07-28) — 200+/226 nhân sự ISA mới, "不法滞在者ゼロプラン"
- 国税庁 — 令和8年分の所得税の基礎控除の見直し等について: https://www.nta.go.jp/users/gensen/2026kiso/index.htm
- Money Forward biz — tóm tắt số liệu 令和8年度税制改正: https://biz.moneyforward.com/accounting/basic/89764/
- 秋田魁新報 / 東奥日報 (2026-08-14) — khảo sát Bộ Nội vụ: tỷ lệ nợ đọng 住民税 18.6% của người nước ngoài rời Nhật
- taxlabor.com / nalevi (2026-07~08) — lương tối thiểu 2026 +55円 → 1,176円/giờ bình quân
