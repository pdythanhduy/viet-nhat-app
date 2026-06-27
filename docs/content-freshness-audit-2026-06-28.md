# Content freshness + luật mới 2026 — audit 2026-06-28

**Scope**: 127 admin guides + thay đổi pháp luật Nhật 2026 ảnh hưởng cư dân nước ngoài.
**Trigger**: yêu cầu rà soát toàn bộ thủ tục + luật lệ mới.
**Cảnh báo phương pháp**: KHÔNG tự bump `lastVerified` mà chưa kiểm nguồn thật (= làm sai dữ liệu). Các con số pháp lý (thuế, phí, năm cư trú) chỉ sửa khi đã verify nguồn chính thức (国税庁/出入国在留管理庁/厚労省).

---

## 1. Trạng thái độ-cũ (factual, tính tới 2026-06-28)

| Bucket | Số guide |
|---|---|
| > 60 ngày | 0 |
| **31–60 ngày (QUÁ HẠN 30 ngày)** | **121** |
| 15–30 ngày | 0 |
| ≤ 14 ngày | 7 |

→ **121/127 guide đã vượt ngưỡng re-verify 30 ngày.** Lần audit trước (2026-05-19) cả moat còn ≤30 ngày; nhưng từ đó tới nay (40 ngày) hầu hết đã trôi qua mốc. 7 guide còn "tươi" là các guide vừa sửa ở law-audit 2026-06-20 (thuế, 脱退一時金, NHK…).

Cũ nhất (2026-05-02, 57 ngày): `sole-proprietor-kojin-jigyo`, `payslip-reading`, `marriage-certificate-vn-japan`, `labor-rights-dispute`, `credit-card-for-foreigners`, `bicycle-insurance`.

**Ý nghĩa**: trước bản App Store kế tiếp, cần một đợt re-verify có hệ thống. Đây KHÔNG phải khẩn cấp (không guide nào sai nghiêm trọng đã biết), nhưng là nợ governance cần trả theo nhóm ưu tiên ở §3.

---

## 2. Luật mới 2026 — đối chiếu với nội dung app

### 2.1. ⚠️ Cải cách thuế 令和8年度 (2026) — CẦN CẬP NHẬT
- **Thay đổi**: 基礎控除 `58万 → 62万` (gắn CPI, +4万 do CPI +6%); "年収の壁" `160万 → ~178万`. Áp dụng từ 年末調整 cuối **2026** (令和8年分).
- **App hiện có**: `tax-year-end-adjustment-filing` giải thích RẤT chuẩn bản **令和7年/2025** (48→58万, sàn 123万, band tạm tới 160万) — nhưng **chưa có CPI +4万 (→62万) và mốc 178万 của 2026**.
- **Affected**: `tax-year-end-adjustment-filing`, `kakutei-shinkoku`, `payslip-reading`, `juminzei-local-tax`, `kokuho-reduction` (band thu nhập), `freelance-side-job-work-visa-rules`.
- **Hành động**: cập nhật 基礎控除 → 62万 cho 令和8年分 + ghi rõ mốc 178万 (lưu ý phần "cộng thêm" giảm dần theo band — cần verify cách phân rã so với framing 123万 của app). **Verify trước khi sửa** ở 国税庁 trang 令和8年.

### 2.2. ⚠️ Tăng phí xuất nhập cảnh (入管法改正, 閣議決定 2026-03-10) — KIỂM TRA
- **Thay đổi**: phí 在留資格変更/在留期間更新 trần `10万円`; 永住許可 trần `30万円`.
- **App hiện có**: `visa-fee-increase-2025-2026.ts` (đã có guide riêng). **Cần kiểm** con số có khớp 10万/30万 (閣議決定 03/2026) chưa.
- **Affected**: `visa-fee-increase-2025-2026`, `status-of-residence-change`, `permanent-residency-eijuu`, `visa-rejection-appeal-process`.

### 2.3. ⚠️ Siết 永住許可 (đang là vận hành 2026) — KIỂM TRA
- **Thay đổi**: thời gian cư trú `5年 → nguyên tắc 10年`; chứng minh nộp thuế `1年 → 5年`; bảo hiểm xã hội `1年 → 2年`. (Cộng việc thu hồi vĩnh trú nếu nợ thuế/bảo hiểm — đã cảnh báo ở law-audit 2026-06.)
- **App hiện có**: `permanent-residency-eijuu`, `naturalization-kika-2026-changes`, `japan-policy-update-2026-foreign-residents`. **Kiểm** đã phản ánh 5→10年 + 5年/2年 chưa.
- **Affected**: `permanent-residency-eijuu`, `naturalization-kika`, `naturalization-kika-2026-changes`.

### 2.4. 🆕 Nợ 国保/国民年金 → ảnh hưởng xét visa (từ 2027-06) — BỔ SUNG
- **Thay đổi**: hệ thống sửa 2026, **từ 06/2027** tình trạng nợ 国民健康保険/国民年金 sẽ phản ánh vào xét 在留更新/変更.
- **App hiện có**: chưa rõ guide nào nêu liên kết "nợ bảo hiểm/lương hưu → trượt visa". **Đây là điểm mới đáng thêm cảnh báo.**
- **Affected**: `health-insurance`, `nenkin-pension`, `kokuho-reduction`, `pension-exemption-refund`, `visa-status-overview`, `japan-policy-update-2026-foreign-residents`.

### 2.5. 技人国 thêm tài liệu năng lực ngôn ngữ (2026-04-15) — KIỂM TRA
- **Thay đổi**: một số nghiệp vụ 技術・人文知識・国際業務 phải nộp thêm tài liệu xác nhận năng lực ngôn ngữ.
- **Affected**: `status-of-residence-change`, `japanese-resume-rirekisho`, `job-interview-japan`, guide việc làm.

### 2.6. 育成就労 thay 技能実習 (2027-04-01) — ĐÃ CÓ, kiểm mốc
- **App hiện có**: `ssw-training-worker-2027`, `ikusei-shuro-system-guide`, `ginou-jisshu-to-tokutei-ginou`. Kiểm mốc 2027-04-01 + 技能実習 廃止.

### 2.7. 年金改正 2026 (5 thay đổi quy tắc) — KIỂM TRA
- **Affected**: `nenkin-pension`, `pension-exemption-refund`, `ideco-personal-pension`.

---

## 3. Kế hoạch re-verify theo ưu tiên (impact × thay đổi 2026)

**Đợt 1 — cao nhất (sửa nội dung, có verify nguồn):**
1. `tax-year-end-adjustment-filing` — thêm 令和8年 (62万 / 178万). [§2.1]
2. `visa-fee-increase-2025-2026` — xác nhận 10万/30万. [§2.2]
3. `permanent-residency-eijuu` — 5→10年, 5年/2年. [§2.3]
4. Thêm cảnh báo "nợ 国保/年金 → visa (2027-06)" vào `health-insurance` + `nenkin-pension`. [§2.4]

**Đợt 2 — cao, high-traffic:**
`first-7-days-in-japan`, `first-90-days-in-japan`, `kakutei-shinkoku`, `juminzei-local-tax`, `kokuho-reduction`, `status-of-residence-change`, `overstaying-illegal-stay-procedures`.

**Đợt 3 — phần còn lại của 121 quá hạn**: re-verify theo nhóm (giao thông, gia đình/育児, ngân hàng, y tế…) — phần lớn chỉ cần xác nhận nguồn + bump `lastVerified`, không đổi nội dung.

**KHÔNG làm**: bump hàng loạt `lastVerified` mà chưa kiểm nguồn; sửa số liệu thuế/phí khi chưa verify trang chính thức.

---

## Resolution (2026-06-28, sau khi verify)
- **§2.1 Thuế 令和8年**: ✅ ĐÃ thêm ghi chú **hedged** vào `tax-year-end-adjustment-filing` (bức tường ~178万, 基礎控除 CPI-adjusted, chi tiết band chờ 国税庁 mùa thu 2026). KHÔNG chốt con số nội bộ vì nguồn mâu thuẫn (62万 nền vs 104万 band thấp nhất; 給与所得控除 65→74万). Thêm nguồn 財務省 大綱.
- **§2.2 Phí visa 10万/30万**: ✅ XÁC NHẬN còn là 改正案 (閣議決定 03/2026) → app giữ phí 2025 thật là ĐÚNG, không sửa.
- **§2.3 Vĩnh trú 5→10 năm**: ⛔ KHÔNG thêm — chỉ 1 blog 行政書士 nêu; visa-information.jp không xác nhận. Phần đã ban hành (取消制度 2024 + siết đóng hạn) app đã có.
- **§2.4 Nợ 国保/年金 → visa (2027-06)**: ✅ ĐÃ thêm cảnh báo vào `health-insurance` (khung "dự kiến"). Nên thêm tương tự cho guide pension.

---

## Nguồn (2026)
- 財務省 — 令和8年度税制改正の大綱 (2025-12-26): https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/20251226taikou.pdf
- 三菱UFJ銀行 — 年収の壁 2026 (160→178万, 基礎控除 62万): https://www.bk.mufg.jp/column/others/b0110.html
- 行政書士 — 在留資格 制度改正まとめ 2026 (phí 10万/30万, 5→10年): https://ishikawa-works.com/archives/1075
- ビザ申請サポート — 国保/年金 滞納 → 在留審査 (2027-06): https://solution-supporter.jp/visa/kokumin-kenkohoken-nofu-zairyushinsa
- hamaoka 行政書士 — 入管制度変更 2026 (手数料・日本語要件・育成就労): https://hamaoka-gyousei.com/blog/category7/entry97.html
