# Content freshness + luật mới — audit 2026-10-04

**Scope**: 127 admin guides. Tiếp nối [`content-freshness-audit-2026-08-21.md`](content-freshness-audit-2026-08-21.md).
**Trigger**: báo cáo review tuần 2026-10-04 (10 guide quá `nextReviewAt`, 2 guide quá 90 ngày, 20 guide không có `legalScope`) + phí lưu trú mới có hiệu lực 01/10/2026.
**Phương pháp**: xác minh qua WebSearch (snippet trang ISA `11_00107`, PDF ISA `001469200`, MHLW, JIL, OTIT, JAF + nhiều văn phòng 行政書士 khớp nhau). Lưu ý: `moj.go.jp` bị chặn WebFetch trong môi trường chạy, nên không đọc trực tiếp được trang ISA, chỉ đối chiếu qua snippet tìm kiếm.

---

## 1. Trạng thái độ-cũ

| Bucket (tính tới 2026-10-04, trước khi sửa) | Số guide |
|---|---|
| `nextReviewAt` ≤ hôm nay | 10 |
| `lastVerified` > 90 ngày | 2 (ideco, nisa) |
| Đến hạn trong 14 ngày | 11 |
| Không có `legalScope` (không vào lịch review) | 20 |

Sau đợt này: 10 guide quá hạn đã được review (đọc toàn bộ), cùng 4 guide đến hạn sớm (ginou-jisshu, ssw-2027, myna-health-insurance-card, permanent-residency) và 2 guide money; 19 guide được thêm `legalScope` (guide thứ 20, `japan-policy-2026-action-by-user-type`, được review và bump `lastVerified`, chưa có `legalScope`).

---

## 2. Thay đổi chính sách + đã sửa

### 2.1 🔴 Phí thủ tục lưu trú mới — ĐÃ HIỆU LỰC 01/10/2026
政令 Nội các quyết định 2026-08-25. Hồ sơ tiếp nhận từ 01/10/2026: 在留資格変更・在留期間更新 tính theo **thời hạn được cấp** — quầy 10,000 / 18,000 / 25,000 / 33,000 / 48,000 / 64,000 / 75,000 yên (≤3 tháng → ≥5 năm), online 10,000 / 15,000 / 21,000 / 27,000 / 42,000 / 56,000 / 65,000 yên; 永住 200,000 yên. Hồ sơ tiếp nhận đến 30/09/2026 giữ phí cũ. Online từ 01/10/2026 chỉ trả qua コンビニ / Pay-easy (không 収入印紙, thẻ tín dụng, QR); tại quầy vẫn 収入印紙.

- `visa-fee-increase-2025-2026.ts`: viết lại toàn bộ theo bảng mới; sửa số liệu 再入国 / 就労資格証明書 trước đó mâu thuẫn trong chính guide (đúng: 4,000/3,500, 7,000/6,500, 2,000/1,600); sửa sai "bị từ chối vẫn mất phí" (phí chỉ trả khi được cấp phép); `priority: 'high'`.
- Đồng bộ trong 10 guide khác: `residence-card`, `visa-status-change-detailed-scenarios`, `status-of-residence-change`, `permanent-residency-eijuu`, `naturalization-kika`, `visa-emergency-medical-disaster-extension`, `japan-policy-update-2026-foreign-residents`, `japan-policy-2026-action-by-user-type`, `specific-residence-card-my-number-2026`, `visa-rejection-appeal-process`; cùng `ikusei-shuro-system-guide`, `ginou-jisshu-to-tokutei-ginou`.
- Sửa thêm: tiêu chuẩn 経営・管理 mới (3,000万円, 1 nhân viên toàn thời gian, tiếng Nhật B2) trong `status-of-residence-change`; điều kiện 高度専門職 → 永住 (70 điểm / 3 năm, 80 điểm / 1 năm) trong `visa-status-change-detailed-scenarios`.

### 2.2 🔴 Dự thảo tiêu chuẩn xét vĩnh trú — vẫn CHƯA chốt
Góp ý kết thúc 04/09/2026; tính đến 04/10/2026 chưa thấy kết quả パブコメ hay bản chính thức; có phản đối công khai. Dự kiến 04/2027. Đã ghi rõ trạng thái trong `permanent-residency-eijuu`, `japan-policy-update-2026-foreign-residents`. `nextReviewAt` → 2026-11-15.

### 2.3 🟡 Lương tối thiểu 2026
Bình quân gia quyền 1,177 yên (+56; 目安 ban đầu 1,176). Tokyo 1,280, Osaka 1,231, Aichi 1,195 (01/10/2026); thấp nhất 1,085. Hiệu lực rải rác 01/10 → 02/12. Cập nhật `payslip-reading`, `ssw-training-worker-2027`, `ikusei-shuro-system-guide`, `labor-rights-dispute`.
- `payslip-reading`: sửa lỗi pháp lý — guide bảo cộng 通勤手当 / 家族手当 / 住宅手当 vào lương cơ sở tính làm thêm giờ, nhưng 労基則21条 loại trừ các khoản này; sửa ví dụ + thêm bước so với lương tối thiểu.

### 2.4 Review guide quá hạn — phát hiện khác
- `myna-health-insurance-card-2026`: bỏ các lựa chọn "thẻ 保険証 giấy còn hạn" (mọi thẻ giấy đã hết hạn chậm nhất 01/12/2025, biện pháp chuyển tiếp kết thúc 31/07/2026); sửa quy tắc 後期高齢.
- `my-number`: 個人番号通知書 không cấp lại được (guide ghi nhầm "~600円 cấp lại").
- `my-number-card`: sửa dòng sai về thay thẻ bảo hiểm; phí cấp lại thường 1,000円.
- `return-to-vietnam-checklist`: hoàn thuế 20.42% 退職所得 qua 確定申告 (退職所得の選択課税) với 納税管理人, không qua hiệp định thuế; ghi chú luật lương hưu 06/2025 dự kiến nâng trần 脱退一時金 lên 8 năm (ngày áp dụng chờ 政令).
- `ikusei-shuro-system-guide`: viết lại mốc 2026 thành đã/đang diễn ra; thêm 経過措置 (kế hoạch 技能実習 nộp đến 31/03/2027, bắt đầu đến 30/06/2027 vẫn theo luật cũ); Bộ LĐ-TB-XH → Bộ Nội vụ (sáp nhập 01/03/2025).
- `ginou-jisshu-to-tokutei-ginou`, `ssw-training-worker-2027`: 3 lĩnh vực 特定技能 mới (閣議決定 23/01/2026, tổng 19); ngoại lệ 1号 tối đa 6 năm; sửa lỗi "tự động có 特定活動 khi chờ" → 特例期間.
- `ideco-personal-pension`: trần đóng góp mới từ 12/2026 (tự doanh 75,000, nhân viên trần 62,000; được tham gia đến dưới 70 tuổi); sửa sai lớn "gần như không thể rút 脱退一時金" — từ 05/2022 người nước ngoài đã rời Nhật có thể rút nếu đóng ≤5 năm hoặc ≤25万円, trong 2 năm.
- `nisa-investment`: こどもNISA từ 01/2027; sửa dòng mâu thuẫn về rời Nhật (継続適用届出書, tối đa 5 năm).
- Không cần đổi nội dung: `drivers-license`, `bicycle-rules-2026`, `daily-law-basics`, `hanko-inkan` (đã đọc toàn bộ, bump ngày).

### 2.5 Thêm `legalScope` cho 19 guide
`sourceVerifiedAt` = `lastVerified` hiện có (KHÔNG bump vì chưa re-verify nội dung). `nextReviewAt` theo rủi ro: 2026-10-31 cho guide cũ từ 07/2026 (first-7/30/90-days, car-shaken, motorcycle, labor-rights), 2026-11-15 cho guide tiền/lao động rủi ro cao, 2026-12-15 cho postpartum, 2027-01-15 cho guide rủi ro thấp.

---

## 3. Cần xác minh (chưa sửa)
- `specific-residence-card-my-number-2026`: mâu thuẫn nội bộ — keyTerm (~dòng 220) + 1 FAQ nói có thể xin 特定在留カード qua hệ thống online, phần khác nói không. Tìm kiếm chưa ra câu trả lời rõ.
- `ikusei-shuro-system-guide`: trần phí ~1,500 USD và URL DOLAB sau sáp nhập bộ; 2号 lúc 2027 còn lên 3号 được không.
- Thời điểm bắt đầu nhận người cho 3 lĩnh vực 特定技能 mới.
- `drivers-license`: mốc phí dịch JAF trung gian 6,000円 (04/2026).
- `payslip-reading`: tỷ lệ bảo hiểm 2026 (雇用保険 0.50%, 子ども・子育て支援金 0.115%, 協会けんぽ Tokyo 4.925%).
- `nisa-investment`: こどもNISA có tự chuyển sang NISA người lớn ở tuổi 18 không.
- `ideco-personal-pension`: trần 第3号 sau 12/2026 (giả định giữ 23,000).
- `my-number-card`: phí in giấy tờ ở コンビニ 200円 vs quầy 350円 (tùy địa phương).
- Mức online riêng cho 永住 (nếu có) — guide chỉ ghi 200,000 yên.

## 4. Ngoài phạm vi code
- Thông báo Telegram trong routine review tuần không chạy vì môi trường thiếu `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — cần thêm vào cấu hình environment của routine.
- Không có connector Claude Docs trong session routine → báo cáo được đăng dạng Artifact.
