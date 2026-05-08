# Content Rewrite Pilot v1

Pilot rewrite của 5 admin guide quan trọng nhất, theo kiểu "đọc xong làm được ngay".

- **Audit baseline:** `docs/admin-guides-content-audit.md` (audit 2026-05-09 cho 79 guides)
- **Rewrite date:** 2026-05-09
- **Phạm vi:** chỉ 5/79 guides — pilot mẫu để validate phong cách trước khi mở rộng
- **Schema:** không thay đổi (chỉ rewrite text trong các field hiện có)

---

## Guides rewritten

1. `moving-in-notification` — Đăng ký cư trú khi mới chuyển đến (転入届)
2. `address-change` — Đổi địa chỉ / chuyển nhà (住居地の届出)
3. `residence-card-validity` — Gia hạn hiệu lực thẻ cư trú (在留カードの有効期間の更新申請)
4. `my-number-card` — Đăng ký và nhận My Number Card (マイナンバーカード)
5. `juminzei-local-tax` — Thuế cư dân địa phương (住民税)

Tất cả 5 guide ID đều tồn tại trong `ADMIN_GUIDES`. Không cần fallback.

## Rewrite principles

- **Action-first** — User đọc 5 giây phải biết đầu tiên làm gì.
- **Câu ngắn** — Không câu hành chính dài; mỗi đoạn 1 ý.
- **whoIsThisFor có "Không phải bạn nếu…"** — Giúp user tự loại trừ trường hợp.
- **whenToDo có mốc rõ + lý do** — Không chỉ nói "trong 14 ngày" mà còn nói tại sao.
- **whereToDo nói rõ "Không làm ở đâu"** — Tránh user đi nhầm 入国管理局 vs 市役所.
- **doNow là chuỗi hành động** — Bắt đầu bằng động từ ("Cầm…", "Mang…", "Hỏi…", "Yêu cầu…").
- **commonMistakes có "→ hậu quả"** — Để user thấy rõ rủi ro của mỗi sai lầm.
- **Counter phrases tích hợp ngay trong tip/doNow** — User không cần scroll xuống tìm.
- **Wording an toàn pháp lý** — "thường…", "tuỳ địa phương…", "hãy hỏi quầy…", thay vì "chắc chắn", "bắt buộc 100%".
- **Thuật ngữ Nhật + giải thích Việt ngắn ngay sau** — vd "国保 (bảo hiểm y tế quốc dân)".

## Before/After summary

### moving-in-notification

**Before problems:**
- Description bắt đầu bằng "Thủ tục đăng ký địa chỉ tại municipal office..." — hơi hành chính.
- whoIsThisFor 3 dòng máy móc; user đọc xong vẫn phải tự chiếu.
- whenToDo nhắc 14 ngày 2 lần nhưng không nói tại sao quan trọng.
- doNow chỉ 3 bước, thiếu hành động cụ thể tại quầy.
- ifLate dài, ngữ cảnh hành chính.
- Steps mô tả chung chung; không có hành động cụ thể bước 4.
- commonMistakes 3 dòng, thiếu "đi nhầm 入国管理局".

**After improvements:**
- Description 2 câu: "Đây là thủ tục báo với 市役所/区役所..." + "Chưa làm thủ tục này, các việc sau bị vướng".
- whoIsThisFor 4 dòng kèm "Không cần làm nếu: chỉ ở khách sạn vài ngày…".
- whenToDo nói rõ "tính từ ngày thực sự bắt đầu sống" + "chưa làm thì chưa làm được bảo hiểm/My Number/ngân hàng".
- doNow tăng lên 4 hành động: cầm gì → nói câu Nhật cụ thể (gắn `転入届を出したいです`) → hỏi gộp 4 thứ → yêu cầu cập nhật 在留カード.
- ifLate ngắn 3 câu: "Đi ngay khi nhớ ra. Nói thật ngày bạn chuyển đến. Giữ giấy biên nhận."
- Step 4 mở rộng thành 5-nơi-checklist: ngân hàng, điện thoại, công ty, bảo hiểm, bưu điện (kèm 転送届).
- commonMistakes thêm "Đi nhầm 入国管理局".

**Still needs source check:** NO

### address-change

**Before problems:**
- Description hành chính: "Khi chuyển đến địa chỉ mới ở Nhật, người trung/dài hạn cần làm…"
- whoIsThisFor không tách rõ trường hợp (cùng thành phố / khác thành phố).
- whenToDo lặp ý moving-in.
- doNow dài, mơ hồ.
- bring không nhấn bắt buộc/tuỳ.
- commonMistakes thiếu cảnh báo nhầm 入国管理局, thiếu cảnh báo "chuyển trong cùng thành phố vẫn phải đi".

**After improvements:**
- Description 2 câu nhấn hậu quả: "Việc này quyết định cả thẻ cư trú, bảo hiểm, ngân hàng và bưu điện có gửi đúng địa chỉ hay không."
- whoIsThisFor tách 3 case rõ + "Không cần làm nếu…".
- whereToDo nói rõ "Không làm ở 入国管理局".
- doNow 4 hành động cụ thể (mang gì → yêu cầu gì → cộng thêm gì → tự đổi sau).
- bring có "(bắt buộc)" / "(nếu...)" cho mỗi mục.
- commonMistakes 5 dòng có lỗi "Chuyển trong cùng thành phố không đi 市役所" và "Đi nhầm 入国管理局".
- FAQ rewrite gọn hơn, câu hỏi trực diện hơn ("Chuyển trong cùng thành phố có cần đi 市役所 không?").

**Still needs source check:** NO

### residence-card-validity

**Before problems:**
- Description rất dài: "Thủ tục gia hạn hạn sử dụng của thẻ cư trú vật lý. Chủ yếu dành cho người vĩnh trú, Highly Skilled Professional 2 hoặc trẻ em đến mốc đổi thẻ; khác với gia hạn thời hạn lưu trú. Từ 14/06/2026..."
- Step 1 không tách rõ 2 thủ tục dễ nhầm.
- Audit flag: 78/100 do FAQ thiếu depth + counter phrases ("Phí" hỏi đầy đủ chưa được tổng hợp).
- whoIsThisFor không rõ "không phải bạn nếu...".

**After improvements:**
- Description rút thành 3 câu, có "KHÁC với gia hạn visa/lưu trú" in hoa.
- Step 1 thành "Phân biệt 2 thủ tục dễ nhầm" với bảng so sánh: 在留期間更新許可申請 (visa) vs 在留カードの有効期間の更新申請 (thẻ vật lý). Hướng dẫn xem ngày trên mặt thẻ.
- whoIsThisFor 4 dòng, dòng cuối là "Không phải bạn nếu...".
- Step 3 có Japanese phrase ngay trong description: '"在留カードの有効期間更新申請をしたいです"'.
- ifLate rút gọn: "Đi ISA ngay. Nói thật."

**Still needs source check:** NEEDS_OFFICIAL_SOURCE_CHECK
- Trang 特定在留カード từ 14/06/2026 — wording về "không bắt buộc đổi ngay" cần re-verify khi gần ngày.
- Phí thủ tục: trang ISA hiện không nêu phí; cần verify lại trên ngày người dùng làm thủ tục.

### my-number-card

**Before problems:**
- Description dài, tóm tắt đủ nhưng không tách rõ benefit cho user.
- whoIsThisFor 3 dòng — thiếu use case "khai 確定申告 online".
- bring trộn lẫn nộp đơn vs nhận thẻ — gây confused.
- Audit flag: 92/100 (đã tốt nhất trong 5).
- Step 1 description hơi wordy về quy cách ảnh.

**After improvements:**
- Description tách rõ 4 benefit: thẻ bảo hiểm, in giấy konbini, Mynaportal, e-Tax.
- whoIsThisFor mở rộng 5 dòng + "Không cần ngay nếu mới sang Nhật < 3 tháng".
- bring sạch — chỉ list cho lúc đi NHẬN thẻ; thêm "Bút + giấy nhỏ để ghi 4 PIN ngay tại quầy".
- doNow 4 hành động rõ thứ tự, từ "chuẩn bị ảnh" → "tìm 申請書ID" → "mở app" → "đợi thư".
- commonMistakes thêm 1 lỗi: "Đặt PIN ① giống PIN ②③④ → ngân hàng/e-Tax không chấp nhận".
- Step 1 description rút gọn, giữ 5 yêu cầu ảnh dạng bullet.

**Still needs source check:** NO (đã có 5 official links + verified 2026-05-06)

### juminzei-local-tax

**Before problems:**
- Audit score 73/100 — thấp nhất trong 5.
- Description không nhấn được "tại sao bất ngờ" — user Việt mới sang hay shock vào tháng 6 năm 2.
- whoIsThisFor không tách rõ "không phải bạn nếu sinh viên không có thu nhập".
- whenToDo 3 mốc nhưng thiếu "trước khi về nước phải có 納税管理人".
- Steps wordy, mix nhiều ý trong 1 đoạn.
- commonMistakes có nhưng không cảnh báo đủ rõ về việc nhầm 所得税.

**After improvements:**
- Description nhấn "năm đầu tiên ở Nhật chưa bị tính, nhưng năm thứ hai sẽ nhận hoá đơn vào tháng 6 — và nhiều người Việt bất ngờ với số tiền".
- whoIsThisFor 4 dòng + "Không phải bạn nếu mới sang Nhật năm đầu tiên, hoặc đang là sinh viên không có thu nhập".
- whenToDo 4 mốc bullet ngắn, có "Trước khi về nước: phải có 納税管理人 hoặc đóng hết".
- whereToDo viết theo kiểu user dễ scan: "**Phòng nhân sự công ty:** ...", "**市役所/区役所** ...", "**税務署 hoặc e-Tax:** ...".
- Step 1 mở đầu "Hiểu trước: 住民税 là thuế của năm TRƯỚC" + ví dụ cụ thể "thu nhập 2024 → hoá đơn 6/2025".
- Step 2 tách rõ "**特別徴収 — trừ qua lương:**" và "**普通徴収 — tự nộp:**" thành 2 đoạn ngắn.
- Step 3 mở rộng case "Nghỉ tháng 1-5" vs "Nghỉ tháng 6+" thành 2 bullet rõ.

**Still needs source check:** NEEDS_OFFICIAL_SOURCE_CHECK
- Thuế suất "10% (6%+4%)" và 均等割 vài nghìn yên/năm — cần re-verify cho năm thuế 2026 (audit đã flag).
- Deadline 減額申請 "thường tháng 7-8" — phụ thuộc municipal office, đã ghi rõ "khác nhau theo địa phương".

## Remaining risks

### 1. Native speaker review chưa làm
Tôi tự QA Vietnamese tone + Japanese phrasing. Cần 1 người Nhật bản ngữ + 1 người Việt sống ở Nhật review:
- Phrase Nhật trong description/steps có natural không?
- Vietnamese tone gần gũi nhưng không suồng sã?
- Có chỗ nào dịch sai/hiểu nhầm không?

### 2. 2 guides flag NEEDS_OFFICIAL_SOURCE_CHECK
- `residence-card-validity`: 特定在留カード từ 14/06/2026 — wording cần verify khi gần ngày.
- `juminzei-local-tax`: thuế suất + deadline 減額申請 — re-verify primary source.

### 3. 67 guide khác chưa rewrite
Nội dung 67 guide còn lại vẫn theo style cũ. Nếu user đọc 5 guide rewrite rồi nhảy sang 1 guide khác, sẽ thấy chênh lệch tone. Cần lên kế hoạch sprint mở rộng.

### 4. Rewrite có thể đã thay đổi nuance pháp lý
Tôi cố gắng giữ wording an toàn ("thường", "tuỳ địa phương", "hãy hỏi quầy"). Nhưng cần cross-check lần nữa với chuyên gia về:
- "Không bị phạt tự động" cho address-change — đúng theo ISA hiện hành?
- "Lịch sử khai báo trễ có thể bất lợi cho thủ tục visa sau này" — đây là wording an toàn đúng pháp lý.
- juminzei "Nợ 住民税 có thể ảnh hưởng đến thủ tục khi quay lại Nhật" — đúng theo thực tế?

### 5. Format markdown trong steps có thể render khác
Tôi dùng `**bold**` và `\n\n` trong description — cần kiểm tra `RichText` component render đúng trên device.

## Verification

```
npm run typecheck      ✓ pass
npm run test:ci        ✓ 251/251 pass
npm run verify:content ✓ 0 issues, 0 warnings, 0 BJT errors
```

## Sprint scope summary

- **Files modified:** 5 guide files
- **Total edits applied:** ~48
- **Schema changes:** 0
- **Source/fee/policy changes:** 0
- **New laws/policies added:** 0
- **counterPhrases changes:** 0 (kept as-is)
- **officialLinks changes:** 0
- **Image references changes:** 0
- **Guide IDs/categories changes:** 0
