# Japanese Tab Translation Audit

## Summary

- **Files checked:** `src/constants/content/japanese/` toàn bộ
  - `words.ts` (361 dòng, ~150 từ)
  - `phrases/*.ts` (27 file phrases)
  - `grammar.ts`
  - `index.ts`
- **Words checked:** ~150 entries trong `words.ts` (pass đầu — chỉ rà những item flagged + một số quanh đó)
- **Items changed:** 9 entries trong `words.ts` + 1 string trong `phrases/cityHall.ts` = **10 fixes**
- **Items left unchanged:** Tất cả các entry không liên quan tới các nhóm flagged (~140 entries)
- **Main issues found:**
  1. Dịch Hán-Việt cứng: "niên kim" cho 年金 (3 chỗ) — không dùng trong tiếng Việt sinh hoạt.
  2. Trộn tiếng Anh không cần: "ward office" — user Việt không quen.
  3. Wording máy dịch: "tờ khai chuyển đến", "phiếu nộp tiền", "trích tiền tự động qua tài khoản".
  4. Thuật ngữ thiếu chính xác: "Khai thuế cuối kỳ" (sai timing — đây là khai thuế CÁ NHÂN, làm 1 lần/năm).
  5. Bug typo: kanji ghép sát chữ Việt không có space ("khoản厚生年金").
  6. Thiếu culturalNote ở các thuật ngữ sống còn (Kokumin Nenkin / Kousei Nenkin) — user không phân biệt được.

## Terminology decisions

| Japanese | Old meaning | New meaning | Reason |
|---|---|---|---|
| 転入届 | Tờ khai chuyển đến | Giấy báo chuyển đến (đăng ký cư trú mới) | "Tờ khai" hành chính cứng; "giấy báo chuyển đến" tự nhiên hơn, thêm context "(đăng ký cư trú mới)" |
| 市役所 | Tòa thị chính / cơ quan phường | Tòa thị chính (shiyakusho) — văn phòng hành chính thành phố | "Cơ quan phường" sai cấp (市 là thành phố, không phải phường); thêm romaji + giải thích |
| 区役所 | Ủy ban quận / ward office | Văn phòng hành chính quận (kuyakusho) | Bỏ "ward office" tiếng Anh không cần; "ủy ban" gợi liên tưởng VN, "văn phòng hành chính" trung tính hơn |
| 年金 | Lương hưu công / Nenkin | Lương hưu / nenkin | "Lương hưu công" mơ hồ — 年金 chung không phân loại |
| 国民年金 | Quốc dân niên kim | Lương hưu quốc dân (Kokumin Nenkin) + culturalNote | Hán-Việt cứng; thêm culturalNote phân biệt với 厚生年金 |
| 厚生年金 | Phúc lợi niên kim / pension qua công ty | Lương hưu công ty (Kousei Nenkin) + culturalNote | Hán-Việt cứng; "pension qua công ty" trộn tiếng Anh; thêm culturalNote |
| 納付書 | Phiếu nộp tiền | Phiếu thanh toán (giấy nộp tiền) + culturalNote | Tự nhiên hơn; culturalNote thêm "đóng ở konbini/bưu điện" |
| 口座振替 | Trích tiền tự động qua tài khoản | Thanh toán tự động qua tài khoản | "Trích tiền" gợi nghĩa tiêu cực (mất tiền); "thanh toán tự động" là cách nói chuẩn của ngân hàng VN |
| 確定申告 | Khai thuế cuối kỳ | Khai thuế cá nhân (kakutei shinkoku) + culturalNote | "Cuối kỳ" mơ hồ; 確定申告 là khai THU NHẬP CÁ NHÂN năm trước; thêm culturalNote về timing 16/02–15/03 |
| (situation string) | Đổi địa chỉ tại cơ quan phường | Đổi địa chỉ tại 市役所/区役所 | Đồng bộ với fix ở words.ts |

## Changed items

### 転入届
- **Before:** meaning `Tờ khai chuyển đến` / exampleMeaning `Tôi đến để nộp tờ khai chuyển đến.`
- **After:** meaning `Giấy báo chuyển đến (đăng ký cư trú mới)` / exampleMeaning `Tôi đến để nộp giấy báo chuyển đến.`
- **Reason:** "Tờ khai" hành chính cứng. Thêm context "(đăng ký cư trú mới)" để user biết đây không phải khai báo gì khác.

### 市役所
- **Before:** meaning `Tòa thị chính / cơ quan phường` / exampleMeaning `Tôi làm thủ tục ở cơ quan phường.`
- **After:** meaning `Tòa thị chính (shiyakusho) — văn phòng hành chính thành phố` / exampleMeaning `Tôi làm thủ tục ở tòa thị chính.`
- **Reason:** "Cơ quan phường" sai cấp hành chính (市 = thành phố, không phải phường). Romaji giúp user nói được khi hỏi đường.

### 区役所
- **Before:** meaning `Ủy ban quận / ward office` / exampleMeaning `Ủy ban quận ở gần ga.`
- **After:** meaning `Văn phòng hành chính quận (kuyakusho)` / exampleMeaning `Văn phòng hành chính quận ở gần ga.`
- **Reason:** "Ward office" tiếng Anh không cần thiết. "Ủy ban" gợi UBND VN — "văn phòng hành chính" trung tính hơn cho người mới sang Nhật.

### 年金
- **Before:** meaning `Lương hưu công / Nenkin` / exampleMeaning `Giấy tờ Nenkin đã được gửi đến.`
- **After:** meaning `Lương hưu / nenkin` / exampleMeaning `Giấy tờ về nenkin/lương hưu đã được gửi đến.`
- **Reason:** "Lương hưu công" mơ hồ — 年金 là từ chung cho cả 国民年金 và 厚生年金. Bỏ "công" để không gợi nhầm.

### 国民年金
- **Before:** meaning `Quốc dân niên kim` / exampleMeaning `Tôi đã đọc hướng dẫn về quốc dân niên kim.`
- **After:** meaning `Lương hưu quốc dân (Kokumin Nenkin)` / exampleMeaning `Tôi đã đọc hướng dẫn về lương hưu quốc dân.`
- **Added culturalNote:** `Đây là chế độ lương hưu cơ bản ở Nhật, thường liên quan đến du học sinh, người tự kinh doanh hoặc người không tham gia 厚生年金 (lương hưu công ty).`
- **Reason:** "Niên kim" Hán-Việt cứng. CulturalNote giúp user phân biệt với 厚生年金.

### 厚生年金
- **Before:** meaning `Phúc lợi niên kim / pension qua công ty` / exampleMeaning `Trên phiếu lương có ghi khoản厚生年金.` (kanji ghép sát chữ Việt — typo bug)
- **After:** meaning `Lương hưu công ty (Kousei Nenkin)` / exampleMeaning `Trên phiếu lương có ghi khoản lương hưu công ty.`
- **Added culturalNote:** `Thường áp dụng cho người đi làm ở công ty và được trừ trực tiếp từ lương cùng với 健康保険.`
- **Reason:** "Phúc lợi niên kim" Hán-Việt; "pension qua công ty" trộn tiếng Anh. Sửa luôn typo kanji-ghép-sát-chữ-Việt.

### 納付書
- **Before:** meaning `Phiếu nộp tiền` / exampleMeaning `Tôi đã thanh toán bằng phiếu nộp tiền.`
- **After:** meaning `Phiếu thanh toán (giấy nộp tiền)` / exampleMeaning `Tôi đã thanh toán bằng phiếu thanh toán.`
- **Added culturalNote:** `Có thể đóng tại ngân hàng, bưu điện hoặc konbini. Giữ lại biên nhận để đối chiếu sau.`
- **Reason:** "Phiếu nộp tiền" mơ hồ — "thanh toán" rõ hơn. CulturalNote giúp user biết đóng được ở konbini.

### 口座振替
- **Before:** meaning `Trích tiền tự động qua tài khoản` / exampleMeaning `Tôi muốn chuyển sang trích tiền tự động.`
- **After:** meaning `Thanh toán tự động qua tài khoản` / exampleMeaning `Tôi muốn chuyển sang thanh toán tự động qua tài khoản.`
- **Reason:** "Trích tiền" có sắc thái tiêu cực (như bị trừ tiền). "Thanh toán tự động" là wording chuẩn của ngân hàng VN.

### 確定申告
- **Before:** meaning `Khai thuế cuối kỳ` / exampleMeaning `Tôi muốn xác nhận xem có cần khai thuế cuối kỳ không.`
- **After:** meaning `Khai thuế cá nhân (kakutei shinkoku)` / exampleMeaning `Tôi muốn xác nhận xem có cần khai thuế cá nhân không.`
- **Added culturalNote:** `Thường nộp từ 16/02 đến 15/03 hàng năm cho thu nhập năm dương lịch trước. Người đi làm 1 nơi đã có 年末調整 thường không cần làm; freelancer/người làm 2 nơi/người có thu nhập phụ trên ngưỡng thì cần.`
- **Reason:** "Khai thuế cuối kỳ" timing sai — 確定申告 không phải cuối kỳ kế toán mà là khai thu nhập cá nhân năm trước. CulturalNote giúp user tự xác định mình có thuộc đối tượng phải khai không.

### phrases/cityHall.ts (situation string)
- **Before:** `Đổi địa chỉ tại cơ quan phường`
- **After:** `Đổi địa chỉ tại 市役所/区役所`
- **Reason:** Đồng bộ với fix ở words.ts. Dùng kanji nguyên bản giúp user dễ đọc bảng chỉ dẫn ở Nhật.

## Items NOT changed (đã pass review)

Các thuật ngữ y tế/giấy tờ đã dùng wording tự nhiên — không sửa:
- 在留カード → "Thẻ cư trú" ✓
- マイナンバーカード → "Thẻ My Number" ✓
- 住民票 → "Giấy chứng nhận cư trú" ✓
- 保険証 → "Thẻ bảo hiểm" ✓
- 健康保険 → "Bảo hiểm y tế" ✓
- 国民健康保険 → "Bảo hiểm y tế quốc dân" ✓ (user nói thuật ngữ này đã quen, OK)
- 保険料 → "Phí bảo hiểm" ✓
- 銀行口座 → "Tài khoản ngân hàng" ✓
- 残業 → "Làm thêm giờ" ✓
- 有給休暇 → "Nghỉ phép có lương" ✓
- 健康診断 → "Khám sức khỏe định kỳ" ✓
- 送金 → "Chuyển tiền" ✓
- 携帯電話 → "Điện thoại di động" ✓
- SIMカード → "Thẻ SIM" ✓
- Các từ về công xưởng/xây dựng (lines 278-313): dùng từ tự nhiên (Nhà máy, Dây chuyền, Kiểm hàng, etc.)

## Needs user/native review

Các điểm tôi không tự confirm được, cần native Vietnamese ở Nhật xác nhận:

1. **`Lương hưu công ty` cho 厚生年金 vs `Lương hưu phúc lợi`** — user gợi ý cả hai trong instructions. Tôi chọn "công ty" vì rõ context người đi làm. Native xác nhận giúp.

2. **`Khai thuế cá nhân` cho 確定申告** — user gợi ý cả "kakutei shinkoku" và "khai thuế cá nhân". Tôi giữ cả hai. CulturalNote về timing 16/02–15/03 cần verify với chuyên gia thuế Nhật.

3. **CulturalNote của 国民健康保険 vẫn để trống** — audit chỉ rà những item flag. Nếu cần thêm note phân biệt với 健康保険, có thể bổ sung sprint sau.

4. **Romaji của 確定申告 viết hoa lẫn lộn** — meaning ghi `(kakutei shinkoku)` lowercase nhưng `Kokumin Nenkin` capitalized. Có thể chuẩn hóa: tên chế độ viết hoa (Kokumin Nenkin, Kousei Nenkin), tên hành động viết thường (kakutei shinkoku, nenmatsu chousei). Cần native xác nhận quy ước.

5. **Phrases/dialogues khác chưa rà sâu** — sprint này chỉ fix các điểm user flag và lan ra `cityHall.ts`. Các file phrases khác (bank, hospital, factory, etc.) có thể có Hán-Việt cứng tương tự — sprint mở rộng sau.

## Verification

```
npm run typecheck   ✓ pass
npm run test:ci     ✓ 251/251 pass
grep "niên kim|cơ quan phường|ward office|Phúc lợi niên|Quốc dân niên|tờ khai chuyển|cuối kỳ|trích tiền tự động|phiếu nộp tiền"
                    ✓ 0 matches (all replaced)
```

## Sprint scope summary

- **Files modified:** 2 (`words.ts`, `phrases/cityHall.ts`)
- **Total fixes:** 10 (9 in words.ts + 1 in cityHall.ts)
- **CulturalNote added:** 4 (国民年金, 厚生年金, 納付書, 確定申告)
- **Schema changes:** 0
- **UI changes:** 0
- **Other content/admin guides:** 0
