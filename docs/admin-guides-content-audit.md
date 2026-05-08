# Admin Guides Content Audit

**Audit date:** 2026-05-09
**Auditor:** Claude (no content was modified during this audit; this is a read-only assessment)
**Scope:** 79 AdminGuide files in `src/constants/content/adminGuides/guides/`
**Reference schema:** `src/types/content.ts` → `AdminGuide`

## Scoring rubric (0–100)

- 15 pts — `whoIsThisFor` present and specific (user can tell if they're affected)
- 15 pts — `whenToDo[]` + `quickAction.deadline` (clear timing)
- 15 pts — `whereToDo[]` + `quickAction.office` (clear location)
- 15 pts — `documentsChecklist[]` + `quickAction.bring` (clear papers list)
- 15 pts — `steps[]` concrete and actionable
- 10 pts — `commonMistakes[]` + `faq[]` (practical pitfalls)
- 10 pts — `officialLinks[]` (2+) + `lastVerified` within 12 months + `legalScope.sourceVerifiedAt`
- 5 pts — Japanese phrases the user actually says/shows at the counter (NOT just procedure names like 在留期間更新許可申請; want spoken phrases or form-field translations)

## Source status definitions

- **OK** — `officialLinks` has 2+ links and `lastVerified` is within 12 months of audit date
- **NEEDS_OFFICIAL_SOURCE_CHECK** — has links but content references specific fees/dates/laws that warrant re-verification, OR only 1 link, OR `lastVerified` > 12 months
- **MISSING_SOURCE** — `officialLinks` empty or placeholder

---

## Summary

- **Tổng số guide:** 79
- **Số guide ≥ 85 điểm:** 42 (53%)
- **Số guide 70–84 điểm:** 37 (47%)
- **Số guide < 70 điểm:** 0
- **Trung bình:** 84.1 / 100
- **Số guide cần `NEEDS_OFFICIAL_SOURCE_CHECK`:** 13
- **Số guide `MISSING_SOURCE`:** 0

### Top 10 guide cần sửa gấp (điểm thấp nhất)

1. `juminzei-local-tax` — 73 (NEEDS_OFFICIAL_SOURCE_CHECK)
2. `japan-policy-2026-action-by-user-type` — 75 (NEEDS_OFFICIAL_SOURCE_CHECK)
3. `sim-card` — 76 (OK)
4. `spouse-notification` — 76 (NEEDS_OFFICIAL_SOURCE_CHECK)
5. `garbage-sorting-rules` — 76 (NEEDS_OFFICIAL_SOURCE_CHECK)
6. `pension-exemption-refund` — 78 (OK)
7. `residence-card-validity` — 78 (OK)
8. `visa-highlights-2026` — 79 (OK)
9. `marriage-certificate-vn-japan` — 79 (NEEDS_OFFICIAL_SOURCE_CHECK)
10. `hanko-inkan` — 79 (OK)

Đồng hạng 79 (cũng nên ưu tiên review): `credit-card-for-foreigners`, `moped-motorcycle-registration`, `home-purchase-mortgage`.

---

## Global issues

Vấn đề lặp lại trên toàn bộ tập 79 guides, sắp xếp theo mức độ phổ biến:

### 1. Thiếu câu tiếng Nhật người dùng sẽ nói tại quầy (≈ 79/79)

Đây là điểm yếu **lớn nhất và duy nhất gần như phổ quát**. Hầu như mọi guide chỉ chứa tên thủ tục (`在留期間更新許可申請`, `転入届`, `確定申告`…) — đây là 0 điểm theo rubric. Schema `AdminGuide` không có field riêng cho phrases, nên content cũng không gắn vào đâu.

User cụ thể đang băn khoăn: "Đến quầy nói gì?" "Hỏi cảnh sát thế nào?" "Gọi 110 nói câu gì đầu tiên?" — guide hiện tại trả lời được "phải đi đâu, mang gì" nhưng không trả lời được "mở miệng nói gì".

Ví dụ phrases nên có:
- `〇〇の手続きをお願いします` (xin thực hiện thủ tục …)
- `〇〇の書類をください` (cho tôi mẫu đơn …)
- `必要な書類は何ですか？` (cần giấy gì?)
- `いくらですか？` (bao nhiêu tiền?)
- `何日かかりますか？` (mất bao nhiêu ngày?)
- Tại 110/119: `交通事故です。住所は〇〇です。けが人がいます`
- Tại 不動産: `重要事項説明をしてください`
- Tại HR: `扶養控除等申告書をください`

### 2. `fees` mơ hồ thay vì con số yên cụ thể (≈ 35/79)

Nhiều guide ghi "phụ thuộc/tùy địa phương/tùy loại" thay vì range cụ thể. User cần con số ước lượng để chuẩn bị tiền mặt và quyết định phương án.

Ví dụ điển hình:
- `drivers-license`: "Phí thi/cấp lại tùy vùng" — không có khoảng yên ước
- `electric-bike-moped-rules`: "phụ thuộc loại xe" — không có 自賠責 cụ thể
- `bicycle-rules-2026`: "tùy loại vi phạm" — không liệt kê 反則金 ví dụ
- `home-purchase-mortgage`: "6–10% tổng" — không tách 印紙税/登録免許税/仲介
- `nisa-investment`, `bank-account`, `credit-card-for-foreigners`: thiếu range minh hoạ

### 3. `estimatedTime` mơ hồ hoặc thiếu (≈ 30/79)

Field tồn tại nhưng nội dung kiểu "tùy hồ sơ" hoặc trống. User không biết có nên xin nửa ngày nghỉ hay 1 ngày nghỉ.

Ví dụ: `residence-card-info-change` (trống), `spouse-notification` (trống), `permission-activity-outside-status` ("tùy hồ sơ"), `status-of-residence-change` ("thay đổi theo hồ sơ" — không cho range tuần/tháng), `kakutei-shinkoku` ("1–2h" — không cảnh báo queue Mar/Feb).

### 4. `quickAction` block thiếu hoặc một số field rỗng (≈ 8/79)

Một số guide không có `quickAction` toàn block, dù schema gợi ý có. AdminDetailScreen "Tóm tắt nhanh" sẽ trống hoặc kém hữu dụng.

Quan sát: `nursery-kindergarten-guide`, `school-enrollment-children`, `kokuho-reduction`, `annual-health-checkup-kensin`, `hanko-inkan`, `daily-law-basics` — một số thiếu `quickAction` hoặc các field con.

### 5. `officialLinks` chỉ 1 link hoặc chỉ trỏ trang chung ISA/MOFA (≈ 13/79 — cùng nhóm NEEDS_OFFICIAL_SOURCE_CHECK)

Một số guide chỉ có 1 link, hoặc nhiều link nhưng đều trỏ trang `procedures/` chung của ISA mà không vào trang con cụ thể của thủ tục đó.

Ví dụ:
- `residence-card-info-change`: 1 link
- `address-change`: 1 link (thiếu link bộ nội vụ về 住民基本台帳)
- `spouse-notification`: 1 link (thiếu link 戸籍/離婚届)
- `garbage-sorting-rules`: 2 link 環境省 — nhưng không có link app phân loại của tỉnh
- `motorcycle-voluntary-insurance`: 2 link, không có công ty bảo hiểm/警察庁/MLIT
- `juminzei-local-tax`, `kakutei-shinkoku`: cần re-verify rate cho năm thuế 2026

### 6. Các điểm yếu nhỏ hơn

- **`whoIsThisFor` đôi khi máy móc** — list 3 dòng nhưng chưa tách scenario rõ (ví dụ `marriage-certificate-vn-japan` không tách "làm ở Nhật trước" vs "làm ở VN trước"; `divorce-custody-name-residence` không tách diện 家族滞在 vs 日本人の配偶者等).
- **Decision tree ẩn** — guide policy/explainer (`japan-policy-2026-action-by-user-type`, `visa-highlights-2026`) viết kiểu narrative, user phải đọc dài để chọn nhánh.
- **Cross-reference thiếu** — `pregnancy-childbirth-postpartum`, `baby-born-in-japan`, `postpartum-30-day-timeline` cover chồng nhau nhưng không link nhau rõ.
- **Cảnh báo quan trọng nằm sai chỗ** — `marriage-certificate-vn-japan` có "短期滞在ビザの人は không được" trong text mà không nâng lên `quickAction` hoặc `commonMistakes` đầu.

---

## Guide details

### residence-card - Gia hạn thời hạn lưu trú / visa

Score: 86/100

Đủ:
- whoIsThisFor / whenToDo / whereToDo cụ thể; office chi tiết; ảnh minh hoạ steps
- 4 official links, lastVerified 2026-05-07; phí 6,000/5,500 yên rõ ràng
- FAQ + commonMistakes phong phú; cảnh báo online không nộp ngày cuối

Thiếu:
- Không có spoken Japanese phrases — chỉ có procedure name 在留期間更新許可申請 (0/5)
- FAQ về 特例期間 hơi mơ hồ

Source status: OK

---

### residence-card-validity - Gia hạn hiệu lực thẻ cư trú

Score: 78/100

Đủ:
- 4 official links, lastVerified 2026-05-06; phân biệt rõ gia hạn thẻ vật lý vs lưu trú
- Ghi 特定在留カード từ 2026-06-14

Thiếu:
- FAQ thiếu depth; "không phải mất phí" nhưng không xác nhận chính thức
- Không có Japanese counter phrases
- Fees không rõ ràng (vừa nói không có phí vừa yêu cầu kiểm tra tại quầy)

Đề xuất sửa:
- Bổ sung phrase mẫu khi đến quầy đổi thẻ
- Khẳng định/làm rõ phí cấp đổi thẻ vật lý dựa trên trang ISA hiện hành

Source status: OK

---

### residence-card-info-change - Đổi thông tin trên thẻ cư trú

Score: 82/100

Đủ:
- Deadline 14 ngày rõ; documentsChecklist có required flags
- Step 2 có bảng điền form chi tiết; whoIsThisFor cụ thể (kết hôn/ly hôn/đổi quốc tịch)

Thiếu:
- Chỉ 1 official link (trang ISA chung)
- Thiếu Japanese phrase khi nộp
- estimatedTime trống; không rõ giấy tờ gốc/bản dịch công chứng

User còn băn khoăn:
- Có cần dịch công chứng giấy đổi tên/kết hôn khi nộp ISA không?

Đề xuất sửa:
- Bổ sung 2-3 link phụ (municipal office, công chứng dịch)
- Thêm hướng dẫn về dịch công chứng và estimatedTime

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 1 link; thủ tục liên quan tên pháp lý cần xác nhận yêu cầu công chứng

---

### address-change - Đổi địa chỉ / chuyển nhà

Score: 88/100

Đủ:
- Office (municipal office), deadline 14 ngày rõ; bring list cụ thể
- Step 2 có bảng 住民異動届 chi tiết; commonMistakes + FAQ cover câu hỏi phổ biến

Thiếu:
- Chỉ 1 official link (trang ISA); thiếu link bộ nội vụ về 住民基本台帳
- Thiếu Japanese phrase tại quầy
- estimatedTime nên ghi rõ "trong ngày" hay không

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 1 link, nên có thêm link SOUMU/municipal về resident registration

---

### job-change-notification - Thông báo đổi việc / nghỉ việc

Score: 85/100

Đủ:
- Visa nào cần khai báo rõ; deadline 14 ngày, office (online) rõ
- Step 2 có bảng + link PDF mẫu 3 loại; FAQ rõ "không phải xét duyệt"
- 2 links (procedures + online), lastVerified 2026-05-06

Thiếu:
- Không có Japanese phrase khi nộp online/quầy
- Thiếu scenario cụ thể (vd: nghỉ A 2026-05-20, ký B hôm sau)

Source status: OK

---

### permission-activity-outside-status - Xin phép làm thêm ngoài tư cách

Score: 84/100

Đủ:
- whoIsThisFor cụ thể (du học, gia đình); 28 giờ/tuần là tổng
- 3 links (procedures + du học + gia đình); FAQ xử lý vượt giờ

Thiếu:
- Không có Japanese phrase "〇〇の許可をお願いします"
- estimatedTime không rõ bao lâu
- Thiếu detail: xin lại khi đổi nơi làm? khi nghỉ học?

Đề xuất sửa:
- Thêm phrase mẫu hỏi tại trường/ISA
- Bổ sung scenario chi tiết khi đổi nơi làm thêm

Source status: OK

---

### re-entry - Tạm rời Nhật / tái nhập cảnh

Score: 80/100

Đủ:
- Phân biệt rõ みなし vs 再入国許可; giới hạn 1 năm
- Step 2 chi tiết về ED card; FAQ cover mất hộ chiếu/thẻ

Thiếu:
- Không có Japanese phrase tại sân bay (vd "再入国のつもりです")
- Documents không ghi gốc/copy; thiếu "vé máy bay/kế hoạch quay lại"
- estimatedTime không rõ みなし có cần xin trước không

Đề xuất sửa:
- Thêm phrase tại quầy xuất cảnh
- Làm rõ documentation requirements (gốc vs copy, vé)

Source status: OK

---

### spouse-notification - Thông báo ly hôn / vợ chồng mất

Score: 76/100

Đủ:
- Deadline 14 ngày rõ; whoIsThisFor rõ; bảng điền form
- FAQ ghi rõ khai báo này không tự động đổi visa

Thiếu:
- Chỉ 1 official link (trang ISA)
- Không có Japanese phrase
- estimatedTime trống; không rõ ISA phản hồi bao lâu
- Thiếu scenario: "đã ly hôn nhưng chưa có visa mới, ở tiếp được không?"

User còn băn khoăn:
- Cần bản sao 離婚届受理 hay phải công chứng?
- ISA phản hồi sau bao nhiêu ngày?

Đề xuất sửa:
- Bổ sung link 戸籍/ly hôn từ bộ nội vụ
- Thêm scenario về visa transition sau ly hôn

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 1 link; thủ tục liên quan hộ tịch nên có thêm link bộ tư pháp/nội vụ

---

### status-of-residence-change - Đổi tư cách lưu trú

Score: 87/100

Đủ:
- whoIsThisFor rõ; riskLevel cao + whenToAskExpert phù hợp
- 3 links + lastVerified 2026-05-07; phí 6,000/5,500 yên rõ
- Step 2 có bảng form; bước 3-4 cảnh báo không bắt đầu trước được phép

Thiếu:
- Không có Japanese phrase tại quầy
- estimatedTime chỉ ghi "thay đổi theo hồ sơ" — không có range tuần/tháng

Source status: OK

---

### moving-in-notification - Đăng ký cư trú khi mới chuyển đến

Score: 83/100

Đủ:
- Office, deadline, bring list rõ cho 2 trường hợp
- Step 2 có bảng 転入届 chi tiết; ghi rõ nhân viên cập nhật địa chỉ trên 在留カード
- 4 links + lastVerified 2026-05-06; bước 3 nhắc bảo hiểm + My Number

Thiếu:
- Không có Japanese phrase; chỉ có procedure name
- estimatedTime nên ghi "trong ngày, chừa 1-2h"
- Chưa có scenario "ở ký túc xá trường/công ty thì làm địa chỉ không?"

Đề xuất sửa:
- Thêm phrase mẫu hỏi tại 役所
- Bổ sung scenario ký túc xá

Source status: OK

---

### visa-status-overview - Các loại visa / tư cách lưu trú

Score: 88/100

Đủ:
- whoIsThisFor 3 segment; whenToDo/whereToDo aligned
- 4 steps tốt; commonMistakes + FAQ rich
- 8 official links, lastVerified 2026-05-06

Thiếu:
- Không có Japanese counter phrases
- estimatedTime mơ hồ ("phụ thuộc")

Source status: OK

---

### visa-status-change-detailed-scenarios - Đổi tư cách lưu trú — tình huống chi tiết

Score: 92/100

Đủ:
- 6 scenarios (Student→Work, Work→Spouse…) với timeline + phí
- 4-step process: scenario table → sponsor docs → application → result
- 5 FAQ; 3 links + lastVerified 2026-05-04

Thiếu:
- Không có Japanese counter phrases
- Không nhắc local ISA branch variation

Source status: OK

---

### visa-rejection-appeal-process - Visa bị từ chối và cách kháng cáo

Score: 89/100

Đủ:
- Giải thích rõ không có "appeal" chính thức; nói về 行政不服審査請求 (hiếm)
- Bảng common rejection reasons → solutions
- 5 FAQ + 3 links + lastVerified 2026-05-04

Thiếu:
- Không có phrase Nhật yêu cầu giải thích chi tiết tại quầy
- Không có timeline guidance khi nào nộp lại

Đề xuất sửa:
- Thêm sample 理由書 outline (Nhật + Việt)

Source status: OK

---

### overstaying-illegal-stay-procedures - Overstay / không hợp pháp

Score: 90/100

Đủ:
- 3-option framework rõ: rescue measure 2 tháng / 出国命令 / 在留特別許可
- 5-step process; 6 FAQ tốt
- 3 links + lastVerified 2026-05-04

Thiếu:
- Không có Japanese phrases tại quầy ISA

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 3 link nhưng đều trỏ trang chung ISA, không có rescue/deportation policy direct

---

### visa-emergency-medical-disaster-extension - Visa hết hạn khi nhập viện/thảm họa

Score: 87/100

Đủ:
- 2-track: <90 ngày extension vs >90 ngày 特定活動
- 5-step process bao gồm hospital liaison
- 4 FAQ + 3 links + lastVerified 2026-05-04

Thiếu:
- Không có sample bác sĩ phải viết gì
- Thiếu phrase tại bộ phận quốc tế bệnh viện
- estimatedTime cho status change không rõ (medical case thường lâu hơn 2-4 tuần)

Đề xuất sửa:
- Thêm phrase mẫu liên hệ bệnh viện
- Cụ thể hoá hơn về sample diagnosis bác sĩ phải ghi

Source status: OK

---

### visa-highlights-2026 - Các diện visa đáng chú ý 2026

Score: 79/100

Đủ:
- 6-step breakdown: family/short-stay/eVISA, J-Skip, J-Find, Digital Nomad, Start-up
- 6 FAQ; 8 MOFA links lastVerified 2026-05-06

Thiếu:
- Là explainer, không có actionable steps/documents
- estimatedTime mơ hồ ("guide chỉ định hướng")
- Không có counter phrases (acceptable do nature)

Đề xuất sửa:
- Thêm bảng so sánh 6 diện visa (yêu cầu/timeline/phí)
- Làm rõ Digital Nomad "no work for Japanese company" với ví dụ yes/no

Source status: OK

---

### japan-policy-update-2026-foreign-residents - Cập nhật chính sách Nhật 2026

Score: 81/100

Đủ:
- Tách 3 timeline: 育成就労 (2027-04-01), interim 06/2026, online 2026-05-01
- 5-step + 5 FAQ + 7 ISA links

Thiếu:
- commonMistakes có thể scenario-specific hơn
- Không có Japanese phrases
- estimatedTime mơ hồ

Đề xuất sửa:
- Thêm matrix forms/processes theo timeline window

Source status: OK

---

### japan-policy-2026-action-by-user-type - Chính sách 2026: hành động theo nhóm

Score: 75/100

Đủ:
- 2-group segmentation rõ (A in Japan vs B preparing entry)
- 4-step action checklist
- 3 links

Thiếu:
- Quá meta ("check guide khác") thay vì standalone
- Không có concrete documentsChecklist
- FAQ chỉ 2 mục
- lastVerified 2026-04-19 (20 ngày)

Đề xuất sửa:
- Decision tree text-based cho từng group với action items cụ thể
- Thêm "common mistake by group" callout

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 3 link; cần verify interim policy milestones từ primary source sau 2026-04-19

---

### business-manager-visa-2025 - Visa kinh doanh/quản lý: tiêu chuẩn mới

Score: 85/100

Đủ:
- Update 2025-10-16 marked rõ; high-risk + commonMistakes (capital, staff, JLPT B2)
- 4-step; 7-field documentsChecklist với capital floor 30M yên + expert validator
- 5 FAQ + 3 ISA links + lastVerified 2026-05-06

Thiếu:
- Không có Japanese counter phrases (forms, terms 常勤職員/資本金等)
- Không có sample business plan structure
- estimatedTime "months to prepare" không có typical approval window

Source status: OK

---

### family-stay-invitation - Bảo lãnh vợ/chồng/con sang Nhật

Score: 91/100

Đủ:
- High-priority; legalScope 2 lớp (COE ISA + visa embassy) rõ
- 5-step; 4 FAQ; 3 links + lastVerified 2026-05-06; 2 hero/step images

Thiếu:
- Không có Japanese counter phrases
- estimatedTime ISA range (1-3 tháng) nhưng không có embassy window

Source status: OK

---

### short-stay-relative-visit - Visa du lịch / thăm thân ngắn hạn

Score: 89/100

Đủ:
- whoIsThisFor + whenToDo (1 tuần xử lý) cụ thể
- 5 bước rõ; commonMistakes + FAQ; 4 MOFA links + lastVerified 2026-05-06

Thiếu:
- Không có phrase tiếng Nhật tại lãnh sự

Source status: OK

---

### first-7-days-in-japan - 7 ngày đầu mới sang Nhật

Score: 85/100

Đủ:
- 5 bước cụ thể; commonMistakes 6 điểm; FAQ 4 câu
- 3 official links + lastVerified 2026-04-28

Thiếu:
- Không có Japanese phrases
- Fees mơ hồ ("có thể phát sinh")

Đề xuất sửa:
- Thêm phrase mẫu cho municipal office + bank
- Bổ sung range yên cho fees

Source status: OK

---

### first-30-days-work-study-japan - 30 ngày đầu đi làm / đi học

Score: 82/100

Đủ:
- whoIsThisFor + estimatedTime (2-4 tuần)
- 5 bước; commonMistakes 5 điểm

Thiếu:
- Không có Japanese phrases tình huống làm việc
- Fees không cụ thể
- estimatedTime mơ hồ về mốc

Đề xuất sửa:
- Thêm phrase HR ("給料日はいつですか?", "契約書を確認させていただけますか?")
- Cụ thể hoá mốc tuần 1/2/3/4

Source status: OK

---

### first-90-days-in-japan - 90 ngày đầu ở Nhật

Score: 84/100

Đủ:
- 5 bước theo phase 0-7/8-30/31-60/61-90
- 4 official links + lastVerified 2026-04-12

Thiếu:
- Không có Japanese phrases
- Fees liệt kê mục, không cụ thể

Đề xuất sửa:
- Thêm phrase tại bước cuối ("困ったときはどこに聞けば良いですか?")

Source status: OK

---

### parents-elderly-relatives - Bảo lãnh cha mẹ / người thân lớn tuổi

Score: 88/100

Đủ:
- LegalScope rõ (高度専門職 ngoại lệ vs 短期滞在 thường)
- 6 bước, 5 FAQ, 5 official links + lastVerified 2026-05-06

Thiếu:
- Không có Japanese phrase
- estimatedTime mơ hồ với riskLevel "high"

Source status: OK

---

### ssw-training-worker-2027 - 特定技能 và luật 育成就労 mới

Score: 83/100

Đủ:
- Phân biệt 2026 chuẩn bị vs 2027-04-01 vận hành
- 16 lĩnh vực 特定技能 liệt kê (+ 4 mới 2024-03-29)
- 5 ISA links + lương tối thiểu cụ thể

Thiếu:
- Không có Japanese phrases
- estimatedTime mơ hồ ("thay đổi theo giai đoạn")

Đề xuất sửa:
- Thêm phrase liên hệ ISA/OTIT khi công ty giữ hộ chiếu

Source status: OK

---

### freelance-side-job-work-visa-rules - Freelance, side job, YouTube monetize

Score: 86/100

Đủ:
- Bảng so sánh freelance/part-time/YouTube/đầu tư
- 4 bước; 6 FAQ chi tiết

Thiếu:
- Không có Japanese phrase xin permission
- commonMistakes thiếu scenario "trong phạm vi tư cách"

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 2 ISA links nhưng mơ hồ về freelance/YouTube specifics

---

### employment-crisis-visa-job-loss-layoff - Bị đuổi việc / công ty phá sản

Score: 87/100

Đủ:
- Deadline 14 ngày sau sa thải; estimatedTime cụ thể (14n nộp, 1-2 tuần phê duyệt, 6 tháng tìm việc)
- 5 bước; 6 FAQ; 2 ISA/MHLW links + lastVerified 2026-05-04

Thiếu:
- Không có Japanese phrase ("会社都合" vs "自己都合")

Source status: OK

---

### ginou-jisshu-to-tokutei-ginou - Chuyển từ 技能実習 sang 特定技能

Score: 81/100

Đủ:
- whenToDo rõ (3-4 tháng trước hết hạn)
- 4 bước; documentsChecklist cụ thể; 3 ISA links + lastVerified 2026-05-06

Thiếu:
- Không có Japanese phrases
- estimatedTime không cụ thể (1-2 tháng xử lý nhưng thi bao lâu?)
- Chưa update 4 ngành 2024-03-29

Đề xuất sửa:
- Thêm phrase yêu cầu 修了証明書
- Đồng bộ 4 ngành thêm 2024 từ ssw-training-worker-2027

Source status: OK

---

### tokutei-katsudo-46-job-hunt - Visa tìm việc sau tốt nghiệp

Score: 85/100

Đủ:
- 4 bước; documentsChecklist cụ thể; 4 ISA links + lastVerified 2026-05-06

Thiếu:
- Không có Japanese phrase yêu cầu 推薦状
- estimatedTime không rõ về gia hạn lần 2

Source status: OK

---

### permanent-residency-eijuu - Xin vĩnh trú

Score: 88/100

Đủ:
- 4 tiêu chí xét duyệt; 4 bước rút ngắn; mốc 2026-02-24 thẻ 5 năm
- Tip cụ thể về lịch sử cư trú/xuất nhập cảnh; My Number từ 06/2026

Thiếu:
- Không có Japanese phrase ("過去3年間の納税履歴を見たいのですが…")
- whoIsThisFor chưa rõ "5 năm thường" vs "3 năm rút ngắn"

Source status: OK

---

### highly-skilled-professional - Visa 高度専門職

Score: 85/100

Đủ:
- 3 nhóm visa (イ/ロ/ハ) với điểm số rõ
- Ưu đãi 5 năm/hoạt động kép/永住 sau 3 hoặc 1 năm; 4 bước

Thiếu:
- Không có phrase đối thoại với công ty/ISA
- whenToDo chưa nêu mốc cụ thể

User còn băn khoăn:
- Đúng 70 điểm có chắc được không?

Đề xuất sửa:
- Phrase mẫu hỏi ISA về điểm
- Làm rõ scenario đổi công ty trong 高度専門職1号

Source status: OK

---

### naturalization-kika - Nhập quốc tịch Nhật

Score: 92/100

Đủ:
- 7 điều kiện trong bảng; mốc Tokyo 法務局 2026-04-01
- 5 steps; 自書 (動機書/履歴書/生計の概況) hướng dẫn rõ
- 4 法務局 links + lastVerified 2026-05-06

Thiếu:
- Japanese phrase tối thiểu

Source status: OK

---

### marriage-procedures-japan - Thủ tục kết hôn tại Nhật

Score: 82/100

Đủ:
- 4 bước rõ thủ tục 2 phía; FAQ 3 câu thực tế
- Đại sứ quán có link

Thiếu:
- Không có phrase ("婚姻届に必要な書類…")
- whenToDo nói "không có hạn chung" nhưng nên nêu mốc liên quan (con/visa)
- whoIsThisFor cần tách 3 cặp

User còn băn khoăn:
- Hai nhân chứng cần ai?

Đề xuất sửa:
- Tách scenario whoIsThisFor
- Thêm phrase mẫu

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 4 links nhưng cần re-check thủ tục 婚姻届/hợp pháp hoá lãnh sự gần đây

---

### marriage-certificate-vn-japan - Đăng ký kết hôn ở VN khi ở Nhật

Score: 79/100

Đủ:
- Cover 2 hướng (Nhật/VN trước); 4 bước; 4 FAQ
- 3 lãnh sự quán đầy đủ

Thiếu:
- Không có Japanese phrase
- whoIsThisFor chưa tách 2 hướng
- "短期滞在ビザ KHÔNG được" nên ở vị trí bắt mắt hơn

User còn băn khoăn:
- Về VN làm trước rồi sang Nhật, bước nào bỏ qua?

Đề xuất sửa:
- WARNING ở quickAction về visa ngắn hạn
- Tách rõ 2 hướng A/B trong steps

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 3 link lãnh sự; quy trình lãnh sự thay đổi theo mùa, cần verify phí + lịch hẹn

---

### divorce-custody-name-residence - Ly hôn, nuôi con và giấy tờ cư trú

Score: 81/100

Đủ:
- Tách 4 việc rõ; luật 2026-04-01 親権
- 6 bước; 10 links từ 法務省/裁判所/ISA

Thiếu:
- Không có Japanese phrase
- whenToDo thiếu mốc 14 ngày khi ở 家族滞在
- whoIsThisFor chưa nêu visa cụ thể

Đề xuất sửa:
- Tách step 5 thành 14n báo + đổi tư cách
- Thêm phrase mẫu hỏi ISA

Source status: OK

---

### return-to-vietnam-checklist - Checklist về nước

Score: 87/100

Đủ:
- Mốc rõ: 転出 14n, 脱退一時金 2 năm
- Tip quan trọng (không đóng tài khoản trước khi nhận pension refund, chụp ảnh thẻ trước khi nộp ở sân bay)
- 5 bước; 4 official links + lastVerified 2026-05-06

Thiếu:
- Không có phrase Nhật ("SIM契約を解約したい…")
- whoIsThisFor chưa nêu "muốn quay lại — giữ 脱退一時金 hay không"

Source status: OK

---

### pregnancy-childbirth-postpartum - Mang thai, sinh con và sau sinh

Score: 86/100

Đủ:
- Cover toàn bộ chu kỳ với mốc 14n/15n/30n
- Nhấn 出生 ≠ tự động quốc tịch Nhật; 出産育児一時金 ¥500,000 không tiền mặt
- 6 bước; 7 official links + lastVerified 2026-04-11

Thiếu:
- Không có Japanese phrases
- 妊娠届 nên nêu "trong 3-4 tháng đầu" (MHLW khuyến)

User còn băn khoăn:
- Cha mẹ sang hỗ trợ ở bao lâu?

Source status: OK

---

### baby-born-in-japan - Con sinh ở Nhật: quốc tịch, hộ chiếu, cư trú

Score: 89/100

Đủ:
- Tách 3 việc (khai sinh/quốc tịch/cư trú); mốc 14n + 30n
- 6 bước; 5 FAQ; 6 links + lastVerified 2026-05-06

Thiếu:
- Không có Japanese phrase
- whoIsThisFor chưa nêu "cha mẹ khác quốc tịch"

Source status: OK

---

### postpartum-30-day-timeline - Timeline 0-30 ngày sau sinh

Score: 84/100

Đủ:
- 4 nhịp thời gian rõ (0-2/1-7/14n/15n/<30n)
- Checklist 8 mục; 3 mốc cứng nêu rõ; 5 official links + lastVerified 2026-04-11

Thiếu:
- Không có Japanese phrases
- whenToDo chưa nêu "làm sớm hơn = tốt hơn"

Đề xuất sửa:
- WARNING step 1 về kiểm tra giấy bệnh viện
- Priority order 4 việc rõ ràng

Source status: OK

---

### nursery-kindergarten-guide - Nhà trẻ, mẫu giáo

Score: 87/100

Đủ:
- whoIsThisFor / whenToDo / whereToDo cụ thể
- 6 bước (loại hình, 保育の必要性, 就労証明書, tham quan, miễn học phí, 2026 changes)
- 5 commonMistakes + 5 FAQ; 5 links + lastVerified 2026-04-11

Thiếu:
- estimatedTime narrative, không clear deadline
- Fees không có range cost
- Không có quickAction block (template gap)
- Không có counter phrases

Đề xuất sửa:
- Thêm quickAction block
- Cụ thể "6-8 tháng trước tháng 4" cho deadline

Source status: OK

---

### school-enrollment-children - Đăng ký trường tiểu học/THCS

Score: 82/100

Đủ:
- whoIsThisFor + whereToDo rõ; 4 bước (転入届/教育委員会/就学通知書/dụng cụ)
- 4 commonMistakes + 3 FAQ; 2 MEXT links + lastVerified 2026-04-25

Thiếu:
- estimatedTime chỉ 1 step
- Fees ranges 5,000-20,000 yên nhưng vague
- Thiếu quickAction
- Không có counter phrases

Đề xuất sửa:
- Thêm legalScope nếu có quy định riêng cho minor nước ngoài
- Itemize fees (gears/shoes/supplies vs optional)

Source status: OK

---

### annual-health-checkup-kensin - Khám sức khỏe định kỳ

Score: 85/100

Đủ:
- 3 nhóm + 3 timing + 4 nơi
- 5 bước với threshold đọc kết quả; 5 commonMistakes + 3 FAQ
- 2 MHLW links + lastVerified 2026-04-25

Thiếu:
- Không có estimatedTime
- Không có quickAction
- Không có counter phrases

Source status: OK

---

### health-insurance - Đăng ký bảo hiểm y tế

Score: 90/100

Đủ:
- LegalScope chi tiết; quickAction đầy đủ
- 4 bước với bảng form 加入申請書; 5 commonMistakes + 3 FAQ
- 5 links + lastVerified 2026-05-06

Thiếu:
- estimatedTime chỉ "trong ngày nếu đủ giấy tờ" vague
- Không có counter phrase explicit

Source status: OK

---

### kokuho-reduction - Giảm phí bảo hiểm y tế quốc dân

Score: 88/100

Đủ:
- 4 bước với threshold 7割減/5割減/2割減
- 非自発的失業者 reduction với 雇用保険受給資格者証 + 離職理由 codes
- 6 commonMistakes + 4 FAQ; 2 links + lastVerified 2026-05-02

Thiếu:
- Không có quickAction block
- Không có counter phrase

Đề xuất sửa:
- Thêm quickAction với deadline ("trong 1 năm từ ngày nghỉ việc")

Source status: OK

---

### my-number - Đăng ký thẻ My Number

Score: 85/100

Đủ:
- whoIsThisFor + whenToDo + whereToDo (3 channel) rõ
- legalScope bao gồm hạn thẻ; quickAction đầy đủ
- 4 bước; 4 links + lastVerified 2026-05-06

Thiếu:
- estimatedTime full process thiếu
- Fees vague ("first time free, cấp lại có thể có phí")
- Không có counter phrases

Đề xuất sửa:
- "1-2 tháng từ nộp đến nhận"
- Range fee cấp lại (~500-1,000 yên)

Source status: OK

---

### my-number-card - Đăng ký và nhận My Number Card

Score: 92/100

Đủ:
- 4 bước cực chi tiết: photo specs, app submission, 交付通知書 + 転送不要 warning, 4 PINs detailed use
- 5 commonMistakes + 3 FAQ; 5 links + lastVerified 2026-05-06

Thiếu:
- estimatedTime rời rạc
- Fees cấp lại vague

Source status: OK

---

### myna-portal-digital - マイナポータル

Score: 84/100

Đủ:
- whoIsThisFor + 4 channel (app/kiosk/役所/combini)
- legalScope mention insurance switch 2025-12-02; quickAction
- 4 bước; 5 links + lastVerified 2026-05-06

Thiếu:
- estimatedTime rời rạc
- Fees combini 200-300 yên nói trong step không structured
- Không có counter phrase tại bệnh viện ("マイナ保険証を使いたい")

Đề xuất sửa:
- Move estimated time vào field structured

Source status: OK

---

### hanko-inkan - Con dấu cá nhân

Score: 79/100

Đủ:
- LegalScope rõ municipal jurisdiction
- 4 bước (3 loại 認印/銀行印/実印 + 印鑑登録)
- 6 commonMistakes + 5 FAQ; 3 links + lastVerified 2026-05-06

Thiếu:
- estimatedTime vague cấp 印鑑証明書
- Fees ranges không có municipal fee cụ thể
- Không có counter phrase ("印鑑証明書をください")

Đề xuất sửa:
- Phrase mẫu xin 印鑑証明書 với name insertion
- Cụ thể fee đăng ký 印鑑

Source status: OK

---

### daily-law-basics - Luật sinh hoạt cần biết

Score: 81/100

Đủ:
- LegalScope mixed jurisdiction; quickAction đầy đủ
- 4 bước; 5 commonMistakes + 3 FAQ
- 4 links (ISA/FRESC/consumer/FSA) + lastVerified 2026-05-06

Thiếu:
- estimatedTime không (advisory guide)
- Step 2-3 ngắn gọn (1-2 dòng)
- Không có counter phrase

Đề xuất sửa:
- Mở rộng step 2-3 với ví dụ cụ thể (từ chối lend account: "申し訳ありません、できません")
- Phrase gọi FRESC/consumer center

Source status: OK

---

### bank-account - Mở tài khoản ngân hàng

Score: 82/100

Đủ:
- 4 bước; documentsChecklist với 印鑑 tip
- 6 commonMistakes + 4 FAQ; 4 links + lastVerified 2026-05-06
- Risk warning về account selling tích hợp tốt

Thiếu:
- Không có Japanese phrases
- Bảng form fields không gắn spoken phrasebook
- FAQ chưa cover address mismatch rejection

Đề xuất sửa:
- Phrase: "口座開設申込書をください", "外国人です", "在留カード で大丈夫ですか?"
- Mở rộng FAQ về <3 tháng address threshold

Source status: OK

---

### sim-card - Đăng ký SIM điện thoại

Score: 76/100

Đủ:
- 4 bước; documentsChecklist Razuten/IIJmio/docomo
- FAQ về eSIM + shared SIM risk
- 3 links + lastVerified 2026-04-10; 5 commonMistakes

Thiếu:
- Không có spoken phrases ("SIM契約したいです", "eKYC手続")
- whenToDo thiếu trigger ("trước khi mở bank")
- estimatedTime vague

Đề xuất sửa:
- Phrase mẫu store + online flow
- Timeline: "1 ngày tại store nếu KYC pass; online 2-3 ngày activation"

Source status: OK

---

### remittance - Chuyển tiền về Việt Nam

Score: 85/100

Đủ:
- Bảng map receiver info (受取人氏名/支店名/口座番号/SWIFT)
- 5 commonMistakes (name mismatch, intermediary fraud)
- 4 links + lastVerified 2026-04-10

Thiếu:
- Không có spoken phrases
- estimatedTime "2-3 weeks" không nói first transaction verification delay
- FAQ thiếu "bank đòi proof of relationship?"

Đề xuất sửa:
- Phrase: "ベトナムへ海外送金したいです", "受取人情報をもう一度確認…"
- Note first-time/large amount may need 3-5 ngày extra

Source status: OK

---

### banking-remittance-anti-fraud - Ngân hàng, chuyển tiền và chống khóa tài khoản

Score: 88/100

Đủ:
- 6 bước AML→fraud→restriction handling
- 6 official links 金融庁/全国銀行協会/FRESC
- 6 commonMistakes + 5 FAQ rất rõ

Thiếu:
- Không có phrase counter explain income source
- Step 2 thiếu template language response
- Step 3 bảng nhưng không có user phrasing for 扶養

Đề xuất sửa:
- Phrase mẫu: "送金目的は家族扶養です", "給与明細があります"
- Sample email/response templates

Source status: OK

---

### special-fraud-tokushu-sagi - Cảnh báo lừa đảo

Score: 80/100

Đủ:
- High-priority; 3 bước concrete; 5 fraud scenarios
- 4 FAQ thẳng "no"; 3 links 警察庁/消費者ホットライン/FRESC
- Hero image; nhấn 110/188

Thiếu:
- Không có phrase báo công an ("特殊詐欺です")
- Step 1 thiếu email phishing
- Không có evidence preservation digital

Đề xuất sửa:
- Phrase: "特殊詐欺の被害に遭いました", "被害届を出したいです"
- Step 3 + screenshot/chat preservation checklist

Source status: OK

---

### credit-card-for-foreigners - Làm thẻ tín dụng

Score: 79/100

Đủ:
- 4 bước thin credit file 薄い信用情報
- 5 commonMistakes (リボ払い trap, multiple early apps); 3 FAQ
- 4 links (CIC/JICC/KSC/全国銀行) + lastVerified 2026-05-02

Thiếu:
- Không có application phrases
- Step 2 thiếu guidance debit-visa products that build credit (FAQ nói không, nên repeat early)
- estimatedTime thiếu (apply→arrival)

Đề xuất sửa:
- Phrase: "クレジットカードの申請をしたいです", "年収は…円です", "在留期間の残りは…"
- Move debit-doesn't-build-history sớm hơn step 1

Source status: OK

---

### nisa-investment - Đầu tư NISA miễn thuế

Score: 86/100

Đủ:
- 5 bước với limits つみたて 120万 + 成長 240万
- Bảng broker (SBI/楽天/マネックス); fund examples
- 4 links + lastVerified 2026-05-02; 4 FAQ

Thiếu:
- Không có phrase mở account ("NISA口座を開設したいです")
- Step 2 không emphasize MyNumber Card timing
- Step 5 thiếu Vietnam tax treatment khi rời

Source status: OK

---

### kakutei-shinkoku - Tự khai thuế 確定申告

Score: 87/100

Đủ:
- 5 bước với mapping 源泉徴収票
- Bảng form fields chi tiết (給与収入金額/医療費控除/住宅ローン控除/寄附金控除)
- 4 commonMistakes + 3 FAQ; 2 links + lastVerified 2026-04-29

Thiếu:
- Không có counter phrases
- estimatedTime vague (queue Mar/Feb)
- Step 1 thiếu decision tree yes/no

Đề xuất sửa:
- Phrase: "確定申告したいです", "マイナンバーを使いたいです", "e-Taxで申告します"
- Decision tree single job + 年末調整 = NO; 2+ jobs = YES; medical >100k = YES

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 2 link; thresholds (源泉徴収票, 医療費 100,000 yên, 20万 sidebar) cần verify policy 2026

---

### juminzei-local-tax - Thuế cư dân địa phương

Score: 73/100

Đủ:
- 4 bước explaining lagged calculation; 2 collection types (特別徴収/普通徴収)
- documentsChecklist cover employed + self-employed; step 4 form mapping
- 2 links + lastVerified 2026-04-25; 3 FAQ

Thiếu:
- Không có phrases tại municipal office
- estimatedTime thiếu (減額申請 approval typically 2-4 tuần)
- commonMistakes không cover overseas resident scenario / 納税管理人

Đề xuất sửa:
- Phrase: "住民税の決定通知書をください", "失業したので減額申請したいです"
- Mở rộng step 4 bảng: 勤務先/給与額/申告理由
- Note: rates (6%+4%) and 均等割 vary by municipality — warn user check own city

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 2 link; rates municipal-dependent cần warning

---

### tax-year-end-adjustment-filing - Thuế 年末調整 / 確定申告 / 扶養

Score: 88/100

Đủ:
- 6 bước comprehensive (single vs multiple employers, 扶養 cho VN, age 30-70, 2026 changes)
- 10+ NTA links + lastVerified 2026-04-11
- 5 FAQ; integration 扶養 complexity (38万 chuyển tiền)

Thiếu:
- Không có HR phrases ("扶養控除等申告書を出したいです")
- Step 4 thiếu visual translation requirement
- Step 6 thiếu side-by-side 2025 vs 2026 基礎控除 table

Source status: OK

---

### payslip-reading - Cách đọc bảng lương

Score: 88/100

Đủ:
- 4 bước với bảng lương + công thức 残業手当
- 4 commonMistakes + 4 FAQ; 3 mhlw links + lastVerified 2026-05-02

Thiếu:
- Không có "bring to counter" cho HR/税務署
- Không có spoken phrases ("基本給はいくらですか", "控除明細を説明してください")

Đề xuất sửa:
- Section "Japanese phrases at counter"
- Field "bring" trong quickAction (給与明細 + hợp đồng)

Source status: OK

---

### unemployment-benefits - Trợ cấp thất nghiệp

Score: 85/100

Đủ:
- whoIsThisFor + ハローワーク
- 4 bước; 6-item checklist; 5 commonMistakes + 4 FAQ
- 2 links + lastVerified 2026-04-14

Thiếu:
- Không có phrases ("求職票を記入したいです", 雇用保険受給資格者証 yêu cầu)
- estimatedTime register→first payment unclear

Đề xuất sửa:
- "Sayings at Hello Work"
- Timeline register→説明会→1-3 tháng tiền

Source status: OK

---

### workplace-accident-rousai - Tai nạn lao động

Score: 87/100

Đủ:
- whoIsThisFor + whereToDo (bệnh viện/công ty/労基/FRESC)
- 4 bước có hình ảnh; 5 commonMistakes + 3 FAQ
- 2 mhlw links + lastVerified 2026-04-25

Thiếu:
- Không có phrase tại bệnh viện ("これは仕事中のケガです", "労災で診てください")
- Phrase tại 労働基準監督署

Source status: OK

---

### labor-rights-dispute - Quyền lao động

Score: 89/100

Đủ:
- whoIsThisFor + 4 nơi
- 5 bước với công thức tính lương thiếu cụ thể
- 5 commonMistakes + 4 FAQ; 5 official links

Thiếu:
- Không có phrase tại 労働相談コーナー / 労働審判

Source status: OK

---

### childcare-parental-leave - Nghỉ sinh và nuôi con

Score: 82/100

Đủ:
- 4 bước; 5 commonMistakes + 4 FAQ
- 3 links + lastVerified 2026-04-28

Thiếu:
- Không có phrase tại công ty ("育児休業を申請したいのですが")
- Phrase tại ハローワーク/年金事務所
- 給付金額 (67%/50%) trong FAQ chứ không trong step

Đề xuất sửa:
- Section phrase company/ハローワーク
- Đưa 給付金額 vào bảng quick reference hoặc step 2
- Timeline báo→tiền

Source status: OK

---

### pension-exemption-refund - 年金 miễn giảm và hoàn

Score: 78/100

Đủ:
- whoIsThisFor 3 nhóm khác nhau
- 6 bước; 6 commonMistakes + 6 FAQ
- 12 links 年金機構/国税庁

Thiếu:
- Không có phrase tại 年金事務所 ("免除申請したいです", "脱退一時金を請求したいです")
- Phrase tại municipal office đăng ký 国民年金
- FAQ quá dài, nên tách Basic vs Advanced

Đề xuất sửa:
- Section phrases tại pension office
- Cải thiện cấu trúc FAQ

Source status: OK

---

### sole-proprietor-kojin-jigyo - Đăng ký kinh doanh cá nhân

Score: 81/100

Đủ:
- whoIsThisFor + 4 nơi; 4 bước
- 5 commonMistakes + 3 FAQ; 3 links 国税庁

Thiếu:
- Không có phrase tại 税務署 ("開業届を提出したいのですが")
- Phrase xác minh 屋号
- Phrase tại municipal office đăng ký 国民健康保険

Đề xuất sửa:
- "Sayings at 税務署"
- Khi nào dùng 青色申告 vs simplified accounting

Source status: OK

---

### home-purchase-mortgage - Mua nhà và vay

Score: 79/100

Đủ:
- whoIsThisFor + 5 địa điểm; 7-item docs checklist
- 4 bước; 5 commonMistakes + 3 FAQ; 3 links

Thiếu:
- Không có phrase ngân hàng/不動産会社 ("事前審査を受けたいです")
- Phrase 住宅ローン控除 tại 税務署
- Chi phí 6-10% nên dạng table quick reference

Đề xuất sửa:
- "Counter Japanese" cho ngân hàng/不動産/税務署
- Bảng quick reference chi phí + điều kiện vay

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- 3 links nhưng flat35.com / housing finance cần re-check; lãi suất + điều kiện vay thay đổi thường xuyên

---

### renting-and-buying-home - Thuê nhà và mua nhà

Score: 83/100

Đủ:
- whoIsThisFor + 4 nơi
- 6 bước có hình ảnh; 6 commonMistakes + 5 FAQ
- 8 links MLIT/MOJ về 原状回復

Thiếu:
- Không có phrase tại 不動産会社 ("重要事項説明をしてください")
- Phrase hỏi chi tiết lãi suất/thời hạn
- Phrase tại municipal office 住民票

Đề xuất sửa:
- Minimum Japanese phrases cho 不動産 + quản lý
- Tách "mua nhà" thành guide riêng

Source status: OK

---

### garbage-sorting-rules - Phân loại rác

Score: 76/100

Đủ:
- whoIsThisFor 3 nhóm
- 4 bước có hình ảnh; 5 commonMistakes + 3 FAQ
- 2 links 環境省 + lastVerified 2026-04-25

Thiếu:
- documentsChecklist chủ yếu optional — chưa rõ bắt buộc vs gợi ý
- Không có phrase tại municipal office ("ごみカレンダーをください")
- Phrase đặt 粗大ゴミ qua phone/online
- Fees 400-2000 yên không chi tiết

Đề xuất sửa:
- "Counter Japanese" tại municipal office/quản lý
- Improve 粗大ゴミ với phrase đặt online/phone
- Quick reference 4 loại rác + ngày thu

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 2 link 環境省; quy định khác nhau theo địa phương — cần link app phân loại tỉnh

---

### drivers-license - Đổi bằng lái

Score: 82/100

Đủ:
- whoIsThisFor 3 nhóm + whenToDo 4 + whereToDo 2
- 5 bước có images/tips/documents; 6 commonMistakes + 3 FAQ
- 5 links 警察庁/JAF + lastVerified 2026-05-07

Thiếu:
- Không có phrase tại quầy ("Lái xe bằng cấp gì?", "外免切替したいです")
- quickAction.deadline mơ hồ
- Fees không có range cụ thể (JAF 6,000 yên 2026-04-01 đã có trong step nhưng không nâng lên fees)

Đề xuất sửa:
- Thêm example phrase
- "Phí JAF từ 2026-04-01: 6,000 yên/bản" vào fees

Source status: OK

---

### drivers-license-renewal - Gia hạn bằng lái Nhật

Score: 85/100

Đủ:
- 3 target + 3 khoảng + 3 nơi
- 5 bước; 5 commonMistakes + 3 FAQ
- 4 警察庁 links + lastVerified 2026-05-03

Thiếu:
- Không có phrase ("更新したいです", "高齢者講習が必要ですか?")
- 更新連絡書 mất giải thích chưa rõ
- Fees không có range cụ thể

Đề xuất sửa:
- Phrase mẫu + xin 更新連絡書 nếu mất
- "Phí thường: 3,000-5,000 yên/năm tùy khóa học"

Source status: OK

---

### bicycle-rules-2026 - Luật xe đạp 2026 / blue ticket

Score: 88/100

Đủ:
- whoIsThisFor 3 + áp dụng 2026-04-01
- 5-item checklist (phanh/đèn/chuông/bảo hiểm/đăng ký)
- 6 commonMistakes + 4 FAQ; 5 NPA/警視庁/gov-online links + lastVerified 2026-05-07

Thiếu:
- Fees không có 反則金 cụ thể (vd "携帯電話使用: 5,000 yên")
- Không có phrase với cảnh sát ("何の違反ですか?", "いくらですか?")
- quickAction.office "không phải đăng ký" nhưng không nói làm gì khi nhận blue ticket

Source status: OK

---

### bicycle-insurance - Bảo hiểm xe đạp

Score: 87/100

Đủ:
- 3 target + 3 khi nào + 5 nơi
- 4 bước; 4 commonMistakes + 3 FAQ
- 2 links MLIT/日本交通管理技術協会 + lastVerified 2026-05-02

Thiếu:
- Fees ~1,000-3,000 yên/năm nhưng không gói cụ thể
- Phrase công ty bảo hiểm có trong tip step 1, chưa structured
- whoIsThisFor chưa có "công ty/ký túc xá"

Source status: OK

---

### electric-bike-moped-rules - Xe đạp điện, e-bike và moped

Score: 80/100

Đủ:
- 3 target + trước mua/throttle
- 4 bước (phân loại → trợ lực → moped → không rõ)
- 5 commonMistakes + 4 FAQ; 5 links 警察庁/警視庁/MLIT + lastVerified 2026-05-07

Thiếu:
- Fees không có 自賠責 cụ thể (vd "原付 ~7,000 yên/năm 2024")
- Không có phrase người bán ("これは電動アシスト自転車ですか?")
- quickAction.deadline mơ hồ (ngày nào?)

Đề xuất sửa:
- Phrase: "この自転車は日本の基準に合いますか?"
- Cụ thể 自賠責 + đăng ký fees

Source status: OK

---

### moped-motorcycle-registration - Đăng ký xe máy / xe tay ga

Score: 79/100

Đủ:
- 4 target + 3 khi nào
- 7-item checklist; 4 bước; 6 commonMistakes + 5 FAQ
- 7 links 警察庁/MLIT/損害保険料率 + lastVerified 2026-05-07

Thiếu:
- Fees không có 軽自動車税 cụ thể (2,000 yên/năm 原付一種 trong tip step 2 nhưng không nâng lên)
- Không có phrase tại municipal office ("原付を登録したいんですが…")
- whoIsThisFor không tách 新基準原付 vs 原付二種 rõ

Đề xuất sửa:
- Phrase mẫu hỏi quầy
- Đưa fee vào quickAction/fees field

Source status: OK

---

### motorcycle-voluntary-insurance - Bảo hiểm xe máy tự nguyện

Score: 86/100

Đủ:
- 3 target (原付/người mua/family có ô tô)
- 4 bước (điểm khác → ファミリーバイク特約 → 任意保険 → tai nạn)
- 4 commonMistakes + 3 FAQ; 2 links GIROJ/SONPO + lastVerified 2026-04-29

Thiếu:
- Fees ~3,000-7,000 yên/năm cho ファミリーバイク特約 nhưng không tên công ty
- Phrase công ty bảo hiểm có trong step 2 chưa structured
- estimatedTime 15-60 phút online vs phone không tách

User còn băn khoăn:
- ファミリーバイク特約 có >125cc không?

Source status: NEEDS_OFFICIAL_SOURCE_CHECK
- Chỉ 2 link (GIROJ/SONPO); thiếu link công ty bảo hiểm lớn hoặc 警察庁/MLIT về 任意保険

---

### car-shaken-insurance - Đăng kiểm xe (車検) và bảo hiểm ô tô

Score: 83/100

Đủ:
- 3 target + 3 khi nào (3 năm đầu/2 năm sau/mua cũ)
- 4 bước; 6 commonMistakes + 4 FAQ
- 5 MLIT links + lastVerified 2026-05-03

Thiếu:
- Fees 60,000-150,000 yên không tách 自賠責/検査手数料/重量税
- Không có phrase garage ("車検に出したいですが、費用はいくらですか?", "何日かかりますか?")
- estimatedTime 1-3 ngày không tách ユーザー車検 bao lâu

Source status: OK

---

### traffic-accident-response - Khi gặp tai nạn giao thông

Score: 81/100

Đủ:
- 3 target (lái/đi bộ/chứng kiến)
- 5 bước; 6 commonMistakes + 4 FAQ
- 5 links MLIT/神奈川県警察/SONPO + lastVerified 2026-05-03

Thiếu:
- Không có phrase gọi 110 ("交通事故です。住所は〇〇です。けが人があります")
- Phrase từ chối trả tiền mặt ("その場での解決はできません。保険会社に連絡します")
- estimatedTime claim bảo hiểm bao lâu

User còn băn khoăn:
- Không có dashcam thì cách chứng minh xe bỏ chạy?

Đề xuất sửa:
- Phrase 110 + từ chối thoả thuận hiện trường
- Bổ sung scenario không có video

Source status: OK
