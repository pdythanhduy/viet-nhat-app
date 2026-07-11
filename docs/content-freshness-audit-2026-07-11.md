# Content freshness + luật mới 2026 — audit 2026-07-11

**Scope**: 127 admin guides. Tiếp nối [`content-freshness-audit-2026-06-28.md`](content-freshness-audit-2026-06-28.md) — giải quyết các mục còn treo + quét tin luật mới 13 ngày qua + audit link chết (lần đầu, chưa ai làm trước đây).
**Trigger**: yêu cầu rà soát toàn bộ hướng dẫn xem có cái nào cũ / thiếu.

---

## 1. Trạng thái độ-cũ (tính tới 2026-07-11)

| Bucket | Số guide | So với 06-28 |
|---|---|---|
| > 60 ngày | 60 | 0 → 60 (tăng mạnh) |
| 31–60 ngày | 61 | 121 → 61 |
| 15–30 ngày | 6 | 0 → 6 |
| ≤ 14 ngày | 0 | 7 → 0 |

**Ý nghĩa**: nợ governance tiếp tục tăng vì chưa có đợt re-verify hàng loạt nào giữa 06-28 và hôm nay (ngoại trừ các sửa điểm trong audit này). Đây vẫn KHÔNG phải khẩn cấp — không phát hiện sai sót nghiêm trọng nào ngoài các mục nêu dưới — nhưng cần một đợt re-verify có hệ thống trước bản phát hành tiếp theo.

Cũ nhất (đã re-verify hôm nay, không còn trong danh sách): `sole-proprietor-kojin-jigyo`, `marriage-certificate-vn-japan`, `credit-card-for-foreigners`, `bicycle-insurance` — vẫn CHƯA re-verify, chỉ có link (đã check qua batch #4) không phải 404.

---

## 2. Giải quyết các mục treo từ audit 2026-06-28

### §2.4 — Nợ 年金 → ảnh hưởng visa (2027-06)
✅ **ĐÃ THÊM** cảnh báo vào `pension-exemption-refund.ts` (`commonMistakes`), mirror đúng văn phong đã dùng ở `health-insurance.ts`. Nguồn: NHK News (chính thức) + 2 nguồn hành chính thư sĩ xác nhận mốc 06/2027 và cơ chế áp dụng cho cả 国保 lẫn 国民年金.

### §2.5 — 技人国 (Gijinkoku) yêu cầu tài liệu tiếng Nhật từ 2026-04-15
✅ **XÁC NHẬN CÓ THẬT** qua trang chính thức ISA (moj.go.jp/isa) — trích nguyên văn: *"業務上使用する言語について、CEFR・B2相当の言語能力を有することを証する資料"*, áp dụng cho category 3/4 công việc chủ yếu dùng ngôn ngữ. Đã thêm vào `status-of-residence-change.ts` (`legalScope.whenToAskExpert`).

### §2.6 — 育成就労 thay 技能実習, mốc 2027-04-01
✅ **MỐC ĐÚNG**, không cần sửa ngày. Đã chuyển từ "dự kiến" sang CHÍNH THỨC (閣議決定 2026-09-26 + 省令 công báo 2026-09-30). Lưu ý nhỏ chưa sửa (ưu tiên thấp): guide ghi "N5+" nhưng nguồn mới dùng thang CEFR A1 (không hoàn toàn tương đương N5 JLPT) — có thể làm rõ ở đợt sau.

### §2.7 — 年金制度改正法 2026, guide đã đủ chưa
✅ **Guide đã cập nhật tốt** phần liên quan trực tiếp đối tượng (mở rộng 厚生年金 part-time, nâng trần 脱退一時金 5→8 năm). 3 thay đổi còn thiếu (在職老齢年金 ngưỡng cắt, 遺族年金 cải cách, 標準報酬月額 trần) có mức liên quan thấp với nhóm đọc chính (người Việt đi làm phổ thông/rời Nhật) — KHÔNG bắt buộc bổ sung ngay.

### 🆕 Phát hiện mới — phí visa đang thay đổi (khác dự đoán audit 06-28)
`visa-fee-increase-2025-2026.ts` có đoạn khẳng định "KHÔNG thay đổi tiếp dự kiến đến 2027" — **SAI tại thời điểm hiện tại**:
- Phí **査証 nhập cảnh** (MOFA/Đại sứ quán, khác phạm vi phí 在留 của guide) đã tăng thật từ **2026-07-01** (1 lần 3,000→15,000円; nhiều lần 6,000→30,000円) — nguồn: 閣議決定 2026-06-19 (jiji.com), xác nhận nikkei.com.
- Phí **在留資格変更/永住許可** (đúng phạm vi guide): tiến từ "案" (audit 06-28) sang **政令 dự thảo công bố 2026-07-03**, dự kiến hiệu lực **2026-10-01** (10万/30万円) — gần chính thức hơn nhiều so với 2 tuần trước.

✅ **ĐÃ SỬA** đoạn "Cập nhật 2026" trong `visa-fee-increase-2025-2026.ts` để phản ánh đúng 2 thay đổi này, phân biệt rõ 査証 (MOFA) vs 在留 (ISA).

---

## 3. Audit link chết — LẦN ĐẦU (chưa có audit trước làm việc này)

Quét HTTP status **349 URL** duy nhất trong `officialLinks` của toàn bộ 127 guide (curl, xác nhận chéo bằng WebFetch cho các case nghi ngờ để loại false-positive do bot-blocking — nhiều site .go.jp/.or.jp chặn user-agent tự động nhưng vẫn sống bình thường, vd `kyoukaikenpo.or.jp`, `cic.co.jp`, `zenginkyo.or.jp`, `nenkin.go.jp` — các URL này ĐÃ verify là còn sống, không sửa).

**20 link 404 xác nhận thật** (verify bằng cả curl lẫn WebFetch), phân theo 15 guide:

| Guide | Số link chết |
|---|---|
| `moj.go.jp/isa` (nhiều guide) | 6 — `job-change-notification`, `status-of-residence-change`, `visa-rejection-appeal-process`, `business-manager-visa-2025`, `spouse-notification`, `study-in-japan-student-guide`, `ginou-jisshu-to-tokutei-ginou` |
| `nhk-contract-guide` | 2 |
| `child-vaccination-schedule` | 2 |
| `first-7-days-in-japan` / `first-90-days-in-japan` / `first-30-days-work-study-japan` | 1 (chung 1 URL mhlw) |
| `long-term-care-insurance-kaigo` | 1 |
| `pet-registration-japan` | 1 |
| `remittance` | 1 |
| `motorcycle-voluntary-insurance` | 1 |
| `car-shaken-insurance` | 1 |
| `traffic-accident-response` | 2 |
| `inheritance-will-japan-foreigners` | 1 |

**✅ ĐÃ SỬA 20/20** — tất cả link chết xác nhận đều đã tìm + verify (curl + WebFetch) URL thay thế còn sống trước khi áp dụng:
- `labor-rights-dispute.ts` — 3 link (労働基準監督署 tư vấn, JOHAS 未払賃金, 裁判所 労働審判)
- `payslip-reading.ts` — 1 link (割増賃金率)
- `health-insurance.ts` — 1 link (国保 tổng quan)
- `nhk-contract-guide.ts` — 2 link (国民生活センター ADR, 最高裁判例 — dùng trang hub ổn định thay vì deep-link vì trang gốc đã gỡ)
- `remittance.ts` — 1 link (danh sách 資金移動業者 đăng ký 金融庁)
- `motorcycle-voluntary-insurance.ts` — 1 link (自賠責保険 料率機構)
- `child-vaccination-schedule.ts` — 2 link (予防接種情報 mhlw, 予防接種スケジュール 日本小児科学会)
- `long-term-care-insurance-kaigo.ts` — 1 link (介護保険制度 mhlw)
- `first-7-days-in-japan.ts`, `first-90-days-in-japan.ts`, `first-30-days-work-study-japan.ts` — 1 link chung (国民健康保険 mhlw)
- `pet-registration-japan.ts` — 1 link (狂犬病 mhlw)
- `car-shaken-insurance.ts` — 1 link (自賠責保険とは mlit)
- `traffic-accident-response.ts` — 2 link (自転車保険義務化 mlit, 当番弁護士 日弁連)
- `inheritance-will-japan-foreigners.ts` — 1 link (自筆証書遺言保管制度 moj)
- `job-change-notification.ts` — 1 link (電子届出システム moj/isa)
- `status-of-residence-change.ts`, `visa-rejection-appeal-process.ts` — 1 link chung (在留資格一覧 moj/isa — chỉ thiếu segment `/status/` trong URL)
- `business-manager-visa-2025.ts` — 1 link (経営・管理 お知らせ PDF → trang thông báo còn sống)
- `spouse-notification.ts` — 1 link (在留資格「定住者」moj/isa)
- `study-in-japan-student-guide.ts` — 1 link (danh sách 日本語教育機関 告示 moj/isa)
- `ginou-jisshu-to-tokutei-ginou.ts` — 1 link (登録支援機関一覧 moj/isa)

**Lưu ý quy trình phát hiện khi sửa**: đổi `label` cùng lúc với URL đã phá vỡ ràng buộc `quickAction.officialSourceLabels` phải khớp chính xác `officialLinks.label` (test `adminGuides.test.ts:585`, quy tắc content-governance.md §3) ở 2 file (`nhk-contract-guide`, `child-vaccination-schedule`) — đã phát hiện qua test suite và sửa lại: giữ nguyên label cũ, chỉ đổi URL.

---

## 4. Backlog nội dung mới — kiểm tra "Future ideas" cũ

2 ý tưởng "chưa chặn" từ `full-content-backlog-45-guides.md` (2026-05-14):
- **Job change tenshoku deep-dive**: đã có `job-change-notification.ts` bao phủ khá kỹ nghĩa vụ khai báo 入管. Không phát hiện gap cấp thiết mới.
- **Birth registration với lãnh sự quán VN**: đã bao phủ qua 6 guide (`baby-born-in-japan`, `embassy-consulate-vietnam-japan`, `pregnancy-childbirth-postpartum`, `postpartum-30-day-timeline`, `marriage-procedures-japan`, `marriage-certificate-vn-japan`).

→ Không phát hiện gap guide mới cần viết trong đợt này.

---

## 5. Tổng kết thay đổi trong PR này

| File | Thay đổi |
|---|---|
| `labor-rights-dispute.ts` | 3 link chết → link sống + bump `lastVerified` |
| `payslip-reading.ts` | 1 link chết → link sống + bump `lastVerified` |
| `health-insurance.ts` | 1 link chết → link sống; sửa `lastVerified`/`sourceVerifiedAt` bị lệch sổ sách |
| `pension-exemption-refund.ts` | Thêm cảnh báo nợ 年金→visa (2027-06) + bump `lastVerified` |
| `status-of-residence-change.ts` | Thêm cảnh báo tài liệu tiếng Nhật 技人国 (2026-04-15) + bump `lastVerified`/`sourceVerifiedAt` |
| `visa-fee-increase-2025-2026.ts` | Sửa claim sai "không đổi đến 2027" → phản ánh đúng phí 査証 (07/2026) + 政令 10万/30万 dự kiến (10/2026) + bump `lastVerified`/`sourceVerifiedAt`/`nextReviewAt` |
| `embassy-consulate-vietnam-japan.ts` | (do fork nghiên cứu thực hiện, đã verify) thêm link Tổng lãnh sự quán Fukuoka — đóng gap từ audit 2026-05-15 §4.2 |
| 19 link chết khác (17 file, mục 3) | Tất cả link → URL sống mới, verify curl + WebFetch trước khi áp dụng + bump `lastVerified` |
| `adminGuideDatabase.test.ts` | Cập nhật giá trị `lastVerified` kỳ vọng cho `business-manager-visa-2025` theo ngày verify mới |

**Verify**: `typecheck` ✅, `verify:content` (encoding + BJT gate) ✅, full test suite (526 tests / 70 suites) ✅.

---

## 6. Kế hoạch đợt tiếp theo (ưu tiên)

1. **`status-of-residence-change` N5→CEFR A1 clarification** cho `ikusei-shuro-system-guide.ts` (thấp ưu tiên).
2. **Đợt 2 re-verify** (từ audit 06-28, chưa làm): `kakutei-shinkoku`, `juminzei-local-tax`, `kokuho-reduction`, `overstaying-illegal-stay-procedures` — cộng thêm nay đã qua 30 ngày. (`first-7-days-in-japan`, `first-90-days-in-japan` đã re-verify hôm nay qua fix link.)
3. **~55 guide >60 ngày còn lại** — re-verify theo nhóm chủ đề (giao thông, gia đình, ngân hàng...), phần lớn chỉ cần xác nhận nguồn + bump `lastVerified`, không đổi nội dung.
4. **Theo dõi 政令 phí visa 10万/30万** — kiểm tra lại quanh 2026-09-15 (đã set `nextReviewAt`) trước khi có hiệu lực dự kiến 2026-10-01.
5. **Audit link chết định kỳ** — nên lặp lại quét 349 URL này mỗi vài tháng (script đơn giản: curl toàn bộ `officialLinks`, đối chiếu WebFetch cho case nghi ngờ bot-block).

**KHÔNG làm**: bump hàng loạt `lastVerified` mà chưa kiểm nguồn thật; sửa số liệu khi chưa verify trang chính thức; đoán URL thay thế mà không search+verify.

---

## Nguồn mới dùng trong audit này

- 厚生労働省 — 遺族年金改正 (2026): https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000147284_00020.html
- NHK News — nợ 保険料 ảnh hưởng xét 在留 (2027-06)
- 出入国在留管理庁 — 技人国 yêu cầu ngôn ngữ: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
- 時事ドットコム (2026-06-19) — 閣議決定 tăng phí 査証: https://www.jiji.com/jc/article?k=2026061901087&g=pol
- office-m-yoko.com (2026-07-03) — 政令 phí 在留資格変更/永住 10万/30万
- 日本経済新聞 — xác nhận khung phí 10万/30万 qua sửa 入管法
