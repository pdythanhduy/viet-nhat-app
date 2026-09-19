# Content freshness audit — 2026-09-19

**Scope**: 128 admin guides (up from 127 in the 2026-07-11 audit).
Tiếp nối [`content-freshness-audit-2026-07-11.md`](content-freshness-audit-2026-07-11.md).
**Trigger**: yêu cầu rà soát toàn bộ hướng dẫn có gì cũ + thêm luật mới ra
gần đây.

**Cảnh báo về AI cutoff**: audit này do assistant (Claude) chạy. Knowledge
cutoff của assistant là **01/2026**; hôm nay là **09/2026**. Assistant CHỈ
scan metadata + đối chiếu doc có sẵn — KHÔNG tự nhớ được các luật/quy định
mới ra từ 02–09/2026. Phần "luật mới cần thêm" bên dưới **chờ maintainer
(hoặc reviewer bilingual) cung cấp nguồn chính thức** (官報 / 出入国 / 厚労省
/ 国税庁 / 内閣官房 / …), sau đó assistant sẽ áp dụng vào schema.

---

## 1. Kết quả scan metadata

Script: [`scripts/audit-content-freshness.js`](../scripts/audit-content-freshness.js)
(chạy `node scripts/audit-content-freshness.js` hoặc `--json` cho output máy).

```
Scanned 128 admin guides.

Bucket                                    Count
── nextReviewAt already in the past          5
── sourceVerified / lastVerified >12mo       0
── Missing legalScope block                 20   (+ 1 index.ts false-positive)
── HIGH-risk overdue or stale                3
```

### 1.1 `nextReviewAt` đã quá hạn (5 guide)

Thứ tự theo mức quá hạn giảm dần:

| Guide | Risk | nextReviewAt | Quá hạn |
|---|---|---|---|
| `child-vaccination-schedule` | medium | 2026-09-01 | 18 ngày |
| `health-insurance` | medium | 2026-09-01 | 18 ngày |
| `status-of-residence-change` | **high** | 2026-09-01 | 18 ngày |
| `japan-policy-update-2026-foreign-residents` | **high** | 2026-09-04 | 15 ngày |
| `permanent-residency-eijuu` | **high** | 2026-09-04 | 15 ngày |

**3 HIGH-risk cần ưu tiên**:
- `status-of-residence-change` — 在留資格変更, `sourceVerifiedAt: 2026-07-11`
  (audit 07-11 đã thêm mục 技人国 CEFR-B2). Cần verify trạng thái tài liệu
  ISA hiện tại.
- `permanent-residency-eijuu` — 永住許可申請, `sourceVerifiedAt: 2026-08-21`.
  Đây là trước khi luật 2026 permanent-residency về "hủy tư cách khi vi
  phạm nghĩa vụ đóng thuế/bảo hiểm" áp dụng đầy đủ — cần xác nhận điều lệ
  hiện tại của MOJ.
- `japan-policy-update-2026-foreign-residents` — guide tổng hợp chính sách
  quốc gia. `sourceVerifiedAt: 2026-08-21`. Đây là guide "meta" nên nội
  dung phụ thuộc cập nhật ở các guide con — nên rev lại **sau** khi các
  guide chuyên đề xong.

### 1.2 `sourceVerifiedAt` / `lastVerified` cũ >12 tháng

**0 guide**. Repo đang được maintain rất chặt — tất cả `lastVerified` đều
là 2026-07 hoặc mới hơn. Không có nợ governance cũ nào.

### 1.3 Guide thiếu `legalScope` (20 guide, sau khi loại `index.ts`)

Chia theo "có thể legally scope được" hay không:

**Group A — nên có `legalScope` (11 guide)**: nội dung có ràng buộc pháp
lý rõ ràng, thiếu block này khiến người dùng không thấy "phạm vi áp
dụng", "cần hỏi chuyên gia khi nào", "kỳ verify tiếp".

- `annual-health-checkup-kensin` — nghĩa vụ khám định kỳ, 労働安全衛生法.
- `bicycle-insurance` — bắt buộc theo condominium & ordinances địa phương.
- `car-shaken-insurance` — 自賠責/任意 phân biệt pháp lý.
- `childcare-parental-leave` — luật 育児休業 vừa cải cách.
- `drivers-license-renewal` — 道路交通法, lịch renew phụ thuộc tuổi.
- `home-purchase-mortgage` — 宅地建物取引業法 + luật thuế.
- `labor-rights-dispute` — luật 労働基準法 lõi.
- `school-enrollment-children` — 学校教育法.
- `sim-card` — 携帯電話不正利用防止法 (có id verification), luật mới 2025.
- `unemployment-benefits` — 雇用保険法.
- `workplace-accident-rousai` — 労災保険法.

**Group B — có thể để trống (9 guide)**: guide "timeline lifecycle"
hoặc "process narrative" không phải một thủ tục pháp lý cụ thể.

- `first-30-days-work-study-japan`, `first-7-days-in-japan`,
  `first-90-days-in-japan` — checklist cross-cutting nhiều luật.
- `motorcycle-voluntary-insurance` — voluntary, không bắt buộc pháp lý.
- `postpartum-30-day-timeline` — narrative sau sinh, cross-cutting.
- `sole-proprietor-kojin-jigyo`, `special-fraud-tokushu-sagi` — narrative
  giáo dục, không phải một 手続き cụ thể.
- `banking-remittance-anti-fraud` (nếu vào list) — tương tự.
- `japan-policy-2026-action-by-user-type` — user-facing action matrix,
  không phải luật đơn lẻ.

### 1.4 Có "luật/quy định mới ra gần đây" không?

**Assistant không biết** — cutoff 01/2026. Cần maintainer xác nhận với
nguồn chính thức. Một số hướng cụ thể để check (dựa vào trend đã thấy
trong audit 07-11):

- **在留資格 phí (`visa-fee-increase-2025-2026`)**: audit 07-11 ghi mốc
  2026-10-01 cho 政令 dự thảo. Nếu đã ban hành chính thức → cần cập nhật
  từ "dự kiến" sang "đã có hiệu lực".
- **育成就労 2027-04-01**: audit 07-11 đã confirm 閣議決定 + 省令. Cập
  nhật thêm nếu ISA đã publish thêm thông tư chi tiết.
- **年金制度改正法 2026**: audit 07-11 note guide đã cập nhật đủ nhóm
  đối tượng chính. Nếu có 施行規則 mới publish → check thêm.
- **携帯電話不正利用防止法** (2025 amendment): `sim-card` guide chưa có
  `legalScope`. Luật mới về SIM verification (chống lừa đảo 特殊詐欺)
  đáng flag.
- **道路交通法** cải cách xe đạp: `bicycle-rules-2026` đã có, nhưng nếu
  MHLW/警察庁 có 施行日程 mới cho 2026-11 sau này → cần cập nhật.

**Actionable từ maintainer**: liệt kê tên luật + link nguồn chính thức
(go.jp / e-gov.go.jp / 官報) + guide id nên áp dụng. Assistant sẽ apply.

---

## 2. Đề xuất hành động

Ưu tiên giảm dần:

1. **3 HIGH-risk overdue**: verify từng cái. Cần WebFetch được ISA/MOJ
   URL hoặc reviewer đọc tận trang. Sau khi verify, bump `sourceVerifiedAt`
   + `nextReviewAt` (đề xuất `+90 ngày` = 2026-12-18).
2. **2 MEDIUM overdue** (`child-vaccination-schedule`, `health-insurance`):
   check nội dung cơ bản còn đúng, bump ngày. Rủi ro thấp hơn vì lịch tiêm
   & thẻ 国保 ít biến động vài tháng một lần.
3. **Group A missing `legalScope` (11 guide)**: batch task riêng — mỗi
   guide cần author một `legalScope` block với `jurisdiction`,
   `jurisdictionNote`, `sourceVerifiedAt`, `nextReviewAt`, `riskLevel`,
   `whenToAskExpert[]`. Đây là governance debt, không phải content sai —
   không blocker để ship.
4. **Luật mới**: chờ maintainer cung cấp danh sách + nguồn. Đừng tự phát
   sinh nội dung, tránh hallucinate.

---

## 3. Verification

Chạy audit:

```bash
node scripts/audit-content-freshness.js         # human-readable
node scripts/audit-content-freshness.js --json  # machine-readable
```

Script pure metadata scan, không dependency, không thay đổi content.
Có thể add vào `npm run verify` sau này nếu muốn gate nợ governance
(ví dụ fail nếu >X guide quá `nextReviewAt`).
