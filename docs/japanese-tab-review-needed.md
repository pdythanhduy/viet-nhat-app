# Japanese Tab — Review Needed

Sau Batch 1.1, vẫn còn 9 entries cần human review trước khi tag "audit toàn bộ words.ts xong":
- 6 entries cần **user** đọc bằng mắt (tone tinh tế, không sai)
- 3 entries cần **native VN ngành cụ thể** xác nhận từ ngành dùng

File này không phải dùng để code — in ra hoặc share để reviewer đánh dấu.

**Source baseline:** commit `4c1b61e` của `src/constants/content/japanese/words.ts`.

---

## 1. NEEDS_USER_REVIEW (6 entries)

Tone tinh tế — không sai, nhưng có thể có cách nói tự nhiên hơn cho người Việt sống ở Nhật.

### 1.1 乗り換え

- **word:** 乗り換え
- **reading:** のりかえ
- **romaji:** norikae
- **current meaning:** Chuyển tàu / đổi tuyến
- **current example:** ここで乗り換えです。
- **current exampleMeaning:** Chuyển tàu ở đây.
- **culturalNote:** (không có)

**Lý do cần user review:**
"đổi tuyến" hơi technical (tone bản đồ giao thông). Người Việt đi tàu Nhật hàng ngày thường nói "đổi tàu" hoặc dùng nguyên 乗り換え (norikae). Có thể tone phù hợp nhưng user check.

**Alternatives đề xuất:**
- `Đổi tàu / chuyển tuyến`
- `Đổi tàu (norikae)` — giữ Nhật để user nghe đúng khi xem bảng chỉ dẫn ở ga

---

### 1.2 定期券

- **word:** 定期券
- **reading:** ていきけん
- **romaji:** teikiken
- **current meaning:** Vé tháng
- **current example:** 定期券を買いたいです。
- **current exampleMeaning:** Tôi muốn mua vé tháng.
- **culturalNote:** (không có)

**Lý do cần user review:**
"Vé tháng" thông dụng nhưng 定期券 thực tế có 1 tháng / 3 tháng / 6 tháng. Người Việt ở Nhật thường dùng nguyên teikiken hoặc "định kỳ".

**Alternatives đề xuất:**
- `Vé định kỳ (1/3/6 tháng)`
- `Vé tháng (teikiken — tàu/xe bus)`

---

### 1.3 送金

- **word:** 送金
- **reading:** そうきん
- **romaji:** soukin
- **current meaning:** Chuyển tiền
- **current example:** 海外送金をしたいです。
- **current exampleMeaning:** Tôi muốn chuyển tiền ra nước ngoài.
- **culturalNote:** (không có)

**Lý do cần user review:**
"Chuyển tiền" tự nhiên; nhưng người Việt ở Nhật gửi về VN thường nói "gửi tiền" hơn "chuyển tiền". Cả hai đều OK — chọn 1 cho thống nhất app.

**Alternatives đề xuất:**
- `Gửi tiền / chuyển tiền`
- `Chuyển khoản (qua ngân hàng) / gửi tiền (về VN)`

---

### 1.4 契約解除

- **word:** 契約解除
- **reading:** けいやくかいじょ
- **romaji:** keiyaku kaijo
- **current meaning:** Hủy hợp đồng
- **current example:** 契約解除の条件を確認したいです。
- **current exampleMeaning:** Tôi muốn xác nhận điều kiện hủy hợp đồng.
- **culturalNote:** (không có)

**Lý do cần user review:**
exampleMeaning có "xác nhận" hơi formal. Trong đời sống thường nói "hỏi rõ" hoặc "xem trước". Tone OK nhưng có thể tinh chỉnh.

**Alternatives đề xuất:**
- exampleMeaning: `Tôi muốn hỏi điều kiện hủy hợp đồng.`
- exampleMeaning: `Tôi muốn xem điều kiện hủy hợp đồng trước.`

---

### 1.5 保険料

- **word:** 保険料
- **reading:** ほけんりょう
- **romaji:** hokenryou
- **current meaning:** Phí bảo hiểm
- **current example:** 保険料はいくらですか。
- **current exampleMeaning:** Phí bảo hiểm là bao nhiêu?
- **culturalNote:** (không có)

**Lý do cần user review:**
Câu hỏi đúng nhưng quá generic. Người Việt ở Nhật thường hỏi cụ thể hơn ("một tháng bao nhiêu?", "tổng năm bao nhiêu?"). User chọn dạng tự nhiên nhất.

**Alternatives đề xuất:**
- exampleMeaning: `Phí bảo hiểm bao nhiêu một tháng?`
- exampleMeaning: `Phí bảo hiểm là bao nhiêu?` (giữ nguyên)

---

### 1.6 農薬

- **word:** 農薬
- **reading:** のうやく
- **romaji:** nouyaku
- **current meaning:** Thuốc nông nghiệp
- **current example:** 農薬を使う時は手袋が必要です。
- **current exampleMeaning:** Khi dùng thuốc nông nghiệp cần găng tay.
- **culturalNote:** (không có)

**Lý do cần user review:**
"Thuốc nông nghiệp" academic. Người làm nông VN gọi cụ thể: "thuốc trừ sâu", "thuốc diệt cỏ", "thuốc bảo vệ thực vật". 農薬 trong tiếng Nhật gồm cả 3 loại — keep generic hay tách?

**Alternatives đề xuất:**
- `Thuốc trừ sâu / thuốc bảo vệ thực vật`
- `Thuốc nông nghiệp (trừ sâu / diệt cỏ)`

---

## 2. NEEDS_NATIVE_REVIEW (3 entries)

Cần native VN đang làm trong ngành cụ thể (xây dựng / công xưởng / nhà hàng) ở Nhật xác nhận từ ngành dùng.

### 2.1 作業指示

- **word:** 作業指示
- **reading:** さぎょうしじ
- **romaji:** sagyou shiji
- **current meaning:** Hướng dẫn công việc
- **current example:** 朝礼で作業指示を聞きます。
- **current exampleMeaning:** Tôi nghe hướng dẫn công việc ở buổi họp sáng.
- **culturalNote:** (không có)

**Lý do cần native review:**
"Hướng dẫn công việc" trung tính. Trong ngành xây dựng / công xưởng VN ở Nhật, native có dùng từ ngành cụ thể không? "Phân công ca", "phổ biến công việc", "lệnh sản xuất", "lệnh thi công"?

**Alternatives đề xuất:**
- `Phân công công việc`
- `Phổ biến công việc / triển khai công việc`
- `Lệnh thi công` (đặc thù xây dựng)
- `Lệnh sản xuất` (đặc thù công xưởng)

---

### 2.2 休憩所

- **word:** 休憩所
- **reading:** きゅうけいじょ
- **romaji:** kyuukeijo
- **current meaning:** Chỗ nghỉ
- **current example:** 休憩所で水を飲みましょう。
- **current exampleMeaning:** Hãy uống nước ở chỗ nghỉ.
- **culturalNote:** (không có)

**Lý do cần native review:**
"Chỗ nghỉ" generic. Tùy môi trường: ở công trường có "lán nghỉ", "nhà tạm"; ở công xưởng có "phòng nghỉ", "khu giải lao". Native thực tế dùng gì?

**Alternatives đề xuất:**
- `Khu nghỉ / phòng nghỉ`
- `Khu vực nghỉ giải lao`
- `Lán nghỉ` (xây dựng)

---

### 2.3 配膳

- **word:** 配膳
- **reading:** はいぜん
- **romaji:** haizen
- **current meaning:** Phục vụ món
- **current example:** 料理を配膳します。
- **current exampleMeaning:** Tôi mang món ra phục vụ.
- **culturalNote:** (không có)

**Lý do cần native review:**
"Phục vụ món" trung tính. Native nhân viên nhà hàng VN ở Nhật dùng từ ngành: "bưng món ra", "lên món", "đưa món ra"?

**Alternatives đề xuất:**
- `Bưng món ra (cho khách)`
- `Lên món`
- `Phục vụ món / bưng món`

---

## 3. Reviewer checklist

Áp dụng cho mỗi entry trong file này:

- [ ] Nghĩa tiếng Việt có tự nhiên không?
- [ ] Người Việt mới sang Nhật có hiểu ngay không?
- [ ] Có bị Hán-Việt cứng không?
- [ ] Có đúng ngữ cảnh công việc/đời sống Nhật không?
- [ ] Có cách nói nào người Việt dùng tự nhiên hơn không?

---

## 4. Cách dùng file này

1. **In ra giấy** hoặc copy markdown → gửi tới reviewer.
2. **Reviewer tick checklist** + ghi alternative chọn cho mỗi entry.
3. **Trả lại** — sẽ apply fix vào `words.ts` trong sprint nhỏ tiếp theo (1 commit gọn).
4. **Không yêu cầu reviewer biết code** — file này thuần markdown, mỗi item đầy đủ context.

## 5. Tổng kết

| Loại | Số entries | Người review |
|---|---|---|
| NEEDS_USER_REVIEW | 6 | User chính + bất kỳ người Việt sống ở Nhật |
| NEEDS_NATIVE_REVIEW | 3 | Native VN đang làm trong ngành xây dựng / công xưởng / nhà hàng ở Nhật |
| **Tổng** | **9** | |

Sau khi nhận feedback đủ → apply fix + tag review-pass cho `words.ts`. Sau đó sang Batch 2 (phrases/) hoặc Batch 3 (admin guides).
