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

---

# Batch 1 — extended sweep of words.ts (2026-05-09)

Sau lần fix đầu (9 critical entries trên), batch này rà nốt `words.ts` cho các entry còn đọc cứng / dịch máy / mơ hồ. Phạm vi: chỉ `words.ts`, không đụng phrases khác.

## Items changed (Batch 1)

### 住民票
- **Before:** meaning `Giấy chứng nhận cư trú` / exampleMeaning `Tôi đã lấy giấy chứng nhận cư trú ở quận.`
- **After:** meaning `Giấy chứng nhận cư trú (juuminhyou)` / exampleMeaning `Tôi đã lấy 住民票 ở văn phòng hành chính quận.`
- **Added culturalNote:** `Xin tại 市役所/区役所 (đôi khi đóng phí ~300 yên/bản). Cần khi mở tài khoản, ký hợp đồng thuê nhà, làm visa và nhiều thủ tục khác.`
- **Reason:** "Ở quận" mơ hồ. Thêm romaji + culturalNote cho thuật ngữ user gặp gần như mỗi tháng.

### 家賃
- **Before:** exampleMeaning `Tiền nhà được trả hàng tháng.` (passive voice, awkward)
- **After:** exampleMeaning `Tôi đóng tiền nhà mỗi tháng.`
- **Reason:** Câu chủ động tự nhiên hơn cho người Việt.

### 転出証明書
- **Before:** meaning `Giấy chuyển đi`
- **After:** meaning `Giấy chuyển đi (xin từ 市役所 cũ trước khi sang thành phố mới)`
- **Added culturalNote:** `Xin tại 市役所/区役所 nơi ở cũ trước khi chuyển sang thành phố/tỉnh khác. Mang đến 市役所 nơi mới để làm 転入届.`
- **Reason:** User dễ nhầm "giấy chuyển đi" với loại giấy khác. Thêm context về workflow 2-đầu (cũ → mới) ngay trong meaning.

### 開通
- **Before:** meaning `Kích hoạt / thông tuyến`
- **After:** meaning `Kích hoạt (SIM, internet, đường dây)`
- **Reason:** "Thông tuyến" technical, không phổ biến với user Việt. Cụ thể hoá đối tượng (SIM, internet) thay vì abstract "tuyến".

### 本人確認書類
- **Before:** meaning `Giấy tờ xác minh danh tính`
- **After:** meaning `Giấy tờ tùy thân`
- **Added culturalNote:** `Thường gồm: 在留カード, hộ chiếu, bằng lái, hoặc My Number Card. Mang theo bản gốc khi làm thủ tục ngân hàng, SIM, hợp đồng.`
- **Reason:** "Giấy tờ tùy thân" là cụm Việt chuẩn; "xác minh danh tính" là dịch máy. CulturalNote liệt kê các loại giấy tờ cụ thể.

### 注文
- **Before:** meaning `Gọi món / đơn gọi món` / exampleMeaning `Xin cho tôi nhận order.` (mixed English)
- **After:** meaning `Gọi món` / exampleMeaning `Mời quý khách gọi món.`
- **Reason:** Bỏ "đơn gọi món" thừa (dùng cùng nghĩa), bỏ tiếng Anh "order" trộn lộn xộn. Câu mới đúng vai vai trò người nhân viên (đang mời khách gọi món).

### 会計
- **Before:** meaning `Tính tiền` / exampleMeaning `Tôi tính tiền ở quầy.`
- **After:** meaning `Tính tiền / thanh toán` / exampleMeaning `Tôi thanh toán ở quầy.`
- **Reason:** "Thanh toán" tự nhiên hơn khi user là khách hàng. Giữ "tính tiền" để cover use case nhân viên thu ngân.

### 作業指示
- **Before:** meaning `Chỉ thị công việc` / exampleMeaning `Tôi nghe chỉ thị công việc ở buổi họp sáng.`
- **After:** meaning `Hướng dẫn công việc` / exampleMeaning `Tôi nghe hướng dẫn công việc ở buổi họp sáng.`
- **Reason:** "Chỉ thị" có sắc thái mệnh lệnh quân đội/chính trị; "hướng dẫn" trung tính, đúng tone công xưởng/công trường.

### 休み希望
- **Before:** meaning `Nguyện vọng nghỉ` / exampleMeaning `Xin hãy nộp nguyện vọng nghỉ tuần sau.`
- **After:** meaning `Đăng ký ngày nghỉ (lịch nghỉ mong muốn)` / exampleMeaning `Xin hãy đăng ký lịch nghỉ tuần sau.`
- **Reason:** "Nguyện vọng" trang trọng đến mức không phù hợp với cảnh xếp ca công xưởng. "Đăng ký ngày nghỉ" là cụm chuẩn HR Việt Nam.

## Items NOT changed in Batch 1

Đã rà toàn bộ ~150 entries còn lại trong `words.ts`. Các nhóm sau pass review:

- **Identity & residency** (lines 1-100): 在留カード, マイナンバーカード, 保険証, 銀行口座, 残業, 定期券, 乗り換え, 有給休暇 — tự nhiên, không cần sửa.
- **Factory work** (lines 286-305): 工場, ライン, 検品, 不良品, 部品, 組み立て, 工程, 出荷, 梱包, 数量, 在庫, 機械, 手袋, 安全靴, 作業着, 休憩, 残業代, 早退, 欠勤, 交代 — wording thực tế công xưởng, OK.
- **Construction** (lines 307-326): 建設現場, 足場, ヘルメット, 安全帯, 高所作業, 危険, 立入禁止, 工具, 資材, 搬入, 搬出, 図面, 寸法, 測る, 休工, 現場監督, 朝礼, 片付け, 報告 — chuẩn ngành xây dựng, OK.
- **Agriculture** (lines 328-347): 農場, 畑, 収穫, 苗, 種, 肥料, 農薬, 水やり, 選別, 箱詰め, 温室, 気温, 長靴, 雨具, 休憩所, 出荷場, 台車, 腰, 熱中症 — OK (熱中症 đã chuẩn "Sốc nhiệt").
- **Restaurant** (lines 349-368): 飲食店, 予約, 満席, 厨房, 洗い場, テーブルの片付け, お釣り, レジ, 取り皿, 箸, スプーン, 持ち帰り, 店内, おすすめ, 品切れ, 配膳, 下げる, シフト — wording phục vụ chuẩn, OK.

## Batch 1 totals

- **Items audited (full file):** ~150 entries
- **Items changed in Batch 1:** 9 (8 wording fixes + culturalNote thêm vào 3 entries: 住民票, 転出証明書, 本人確認書類)
- **CulturalNote totals across both passes:** 7 (国民年金, 厚生年金, 納付書, 確定申告, 住民票, 転出証明書, 本人確認書類)
- **Items unchanged after batch 1:** ~141 entries

## Verification (Batch 1)

```
npm run typecheck   ✓ pass
npm run test:ci     ✓ 251/251 pass
```

## Out of scope (deferred to next batches)

- **Batch 2 (suggested):** rà 27 phrases files (`phrases/bank.ts`, `phrases/hospital.ts`, `phrases/factory.ts`, etc.) cho cùng style audit.
- **Batch 3 (suggested):** rà admin guide content (Vietnamese trong `src/constants/content/adminGuides/`).
- **Native speaker review:** vẫn cần — tôi self-QA, không thay native được.

---

# Batch 1.1 — deeper pass cho words.ts (2026-05-09)

User feedback sau Batch 1: "vẫn còn cảm giác dịch máy / Hán-Việt cứng / không giống tiếng người Việt sống ở Nhật nói". Batch này rà sâu hơn, tập trung vào nuance, voice, exampleMeaning, và culturalNote chất lượng — không chỉ keyword obvious.

## Classification framework

| Status | Định nghĩa |
|---|---|
| **OK_NATURAL** | Đọc tự nhiên, đúng ngữ cảnh, không cần sửa |
| **FIXED** | Đã sửa trong batch này |
| **NEEDS_USER_REVIEW** | Có thể OK nhưng user nên đọc lại bằng mắt |
| **NEEDS_NATIVE_REVIEW** | Cần native VN ở Nhật xác nhận tone (cách dùng thực tế) |

## Statistics — Batch 1.1

- **Total entries audited:** ~112 (toàn bộ `JAPANESE_WORDS` array)
- **OK_NATURAL:** ~96 (đa số tốt sau 2 batch trước, không cần đụng)
- **FIXED in Batch 1.1:** 14 (refine + thêm culturalNote + 2 entry mới)
- **NEEDS_USER_REVIEW:** ~6 (xem danh sách dưới)
- **NEEDS_NATIVE_REVIEW:** ~3 (tone cụ thể)

## Items FIXED in Batch 1.1

### Refined exampleMeaning (4 entries)

| 漢字 | Trước | Sau | Reason |
|---|---|---|---|
| 年金 | Giấy tờ về nenkin/lương hưu đã được gửi đến. | Tôi vừa nhận giấy tờ về nenkin. | Câu chủ động, gọn |
| 納付書 | Tôi đã thanh toán bằng phiếu thanh toán. | Tôi đã đóng tiền bằng 納付書. | Bớt redundant; dùng 納付書 thay vì lặp meaning |
| 口座振替 | Tôi muốn chuyển sang thanh toán tự động qua tài khoản. | Tôi muốn đổi sang thanh toán tự động. | Bớt lặp meaning; "đổi" tự nhiên hơn "chuyển sang" |
| 確定申告 | Tôi muốn xác nhận xem có cần khai thuế cá nhân không. | Tôi muốn hỏi xem mình có cần làm 確定申告 không. | "Hỏi" tự nhiên hơn "xác nhận"; dùng 確定申告 nguyên bản |

### CulturalNote bổ sung (5 entries quan trọng)

| 漢字 | Note ngắn |
|---|---|
| 健康保険 | Phân biệt — bao gồm cả công ty và quốc dân. Đến bệnh viện chỉ trả 30% |
| 国民健康保険 | Dành cho người không tham gia bảo hiểm công ty (du học/freelancer). Đăng ký 市役所; phí theo thu nhập năm trước |
| 市役所 | Nơi xử lý mọi thủ tục dân sự. Đông nhất tháng 3-4 và đầu tuần |
| 健康診断 | Công ty/trường tổ chức 1 lần/năm miễn phí. Bao gồm: cao/cân, máu, X-quang, mắt |
| 残業代 | Luật: tăng ca ≥125%, đêm ≥125%, ngày nghỉ ≥135% |
| 口座振替 (cập nhật) | Lý do dùng (không sợ quên), giấy tờ cần (通帳 + 印鑑) |
| 納付書 (cập nhật) | Hay gặp với 国保, 国民年金, 住民税 |

### Wording fixes (4 entries)

| 漢字 | Trước | Sau | Reason |
|---|---|---|---|
| 気温 | Nhiệt độ không khí | Nhiệt độ ngoài trời | "Không khí" technical; "ngoài trời" thực tế |
| テーブルの片付け | Dọn bàn / dọn dẹp bàn | Dọn bàn | Bỏ redundant |
| お釣り | Tiền thối lại | Tiền thừa / tiền thối | "Thừa" universal hơn (miền Bắc); "thối" miền Nam |
| 下げる | Dọn bát đĩa xuống / "Tôi dọn đĩa trống xuống." | Dọn (đĩa/ly đã ăn xong) / "Tôi dọn đĩa khách đã ăn xong." | "Trống" awkward — đĩa "ăn xong" tự nhiên |

### Entries NEW added (2 entries — user list)

#### 礼金 (reikin) — chưa có trong words.ts
- meaning: `Tiền lễ (礼金) — khoản trả 1 lần khi ký hợp đồng thuê nhà`
- example: `このアパートは礼金なしです。` / `Căn hộ này không có tiền lễ.`
- culturalNote: 1-2 tháng tiền nhà, KHÔNG hoàn lại; phân biệt với 敷金; cảnh báo "礼金なし" có thể vẫn có phí khác

#### 敷金 (shikikin) — chưa có trong words.ts
- meaning: `Tiền đặt cọc (敷金) — có thể được hoàn lại khi trả nhà`
- example: `敷金は家賃2ヶ月分です。` / `Tiền đặt cọc là 2 tháng tiền nhà.`
- culturalNote: 1-3 tháng tiền nhà; chủ trừ chi phí sửa chữa do bạn (theo guideline MLIT) rồi hoàn lại; khác 礼金 (KHÔNG hoàn lại)

## Re-check kết quả 18 terms user list

| 漢字 | Status sau Batch 1.1 |
|---|---|
| 年金 | FIXED (refined exampleMeaning) |
| 国民年金 | OK (đã tốt từ pass 1) |
| 厚生年金 | OK (đã tốt từ pass 1) |
| 納付書 | FIXED (refined + extended culturalNote) |
| 口座振替 | FIXED (refined exampleMeaning + thêm culturalNote) |
| 確定申告 | FIXED (refined exampleMeaning) |
| 市役所 | FIXED (thêm culturalNote) |
| 区役所 | OK (đủ từ pass 1; culturalNote ở 市役所 đã cover) |
| 本人確認書類 | OK (đã tốt từ batch 1) |
| 転入届 | OK (đã tốt từ pass 1) |
| 転出証明書 | OK (đã tốt từ batch 1, có culturalNote) |
| 開通 | OK (đã tốt từ batch 1) |
| 作業指示 | OK (đã tốt từ batch 1) |
| 休み希望 | OK (đã tốt từ batch 1) |
| 注文 | OK (đã tốt từ batch 1) |
| 会計 | OK (đã tốt từ batch 1) |
| 礼金 | **NEW** added trong batch 1.1 |
| 敷金 | **NEW** added trong batch 1.1 |

## NEEDS_USER_REVIEW (~6 entries)

User nên đọc bằng mắt — không sai, nhưng tone có thể tinh chỉnh thêm:

1. **乗り換え** — meaning "Chuyển tàu / đổi tuyến". Có thể ngắn hơn: "Đổi tàu"? VN người Việt đi tàu Nhật thường nói "đổi tuyến" hoặc "đổi tàu". OK.
2. **定期券** — meaning chỉ "Vé tháng". Có thể thêm context "(đi tàu/xe bus)" nếu user mới chưa biết. Hiện đủ context qua example.
3. **送金** — meaning "Chuyển tiền". OK. Example "海外送金" → "Tôi muốn chuyển tiền ra nước ngoài." OK.
4. **契約解除** — meaning "Hủy hợp đồng". OK. Example "Tôi muốn xác nhận điều kiện hủy hợp đồng." Hơi formal — alternative "Tôi muốn hỏi điều kiện hủy hợp đồng." Cả hai OK.
5. **保険料** — example "Phí bảo hiểm là bao nhiêu?" OK. Conversational variant: "Phí bảo hiểm bao nhiêu một tháng?" — chỉ context-dependent.
6. **農薬** — meaning "Thuốc nông nghiệp". OK technical. Người làm nông VN thường nói "thuốc trừ sâu" / "thuốc bảo vệ thực vật" — keep generic.

## NEEDS_NATIVE_REVIEW (~3 entries)

Cần native VN ở Nhật xác nhận tone thực dụng:

1. **作業指示 = "Hướng dẫn công việc"** — ổn nhưng native ngành xây dựng ở Nhật có dùng từ khác (vd "phổ biến công việc"/"phân công ca")?
2. **休憩所 = "Chỗ nghỉ"** — ngắn gọn, nhưng có thể native gọi "khu nghỉ" / "phòng nghỉ" tùy môi trường.
3. **配膳 = "Phục vụ món"** — ổn nhưng native nhà hàng ở Nhật có thể dùng "bưng món ra" / "lên món" (closer to industry talk).

## Top 5 before/after fixes (Batch 1.1)

1. **礼金** — chưa có → entry đầy đủ với culturalNote phân biệt 敷金
2. **敷金** — chưa có → entry đầy đủ với culturalNote phân biệt 礼金
3. **健康保険** — vague meaning "Bảo hiểm y tế" → "(chế độ chung)" + culturalNote phân biệt với 国保
4. **市役所** — không có culturalNote → thêm ghi chú life context (mọi thủ tục dân sự + thời điểm đông)
5. **残業代** — không có culturalNote → thêm rates 125%/125%/135%

## Cross-batch summary (3 sprints tích lũy)

| Metric | Sprint 1 | Batch 1 | Batch 1.1 | Total |
|---|---|---|---|---|
| Wording fixes | 9 | 8 | 4 | 21 |
| CulturalNote thêm | 4 | 3 | 5 (+2 cập nhật) | 12 (+2 cập nhật) |
| Entries mới | 0 | 0 | 2 (礼金, 敷金) | 2 |
| Items audited | 9 (explicit) | ~150 | ~112 | ~150 (toàn bộ) |

## Verification (Batch 1.1)

```
npm run typecheck      ✓ pass
npm run test:ci        ✓ 251/251 pass
```

## Out of scope (carry-forward)

- **Batch 2 (suggested):** 27 phrases files (`phrases/*.ts`).
- **Batch 3 (suggested):** admin guide Vietnamese.
- **Native speaker review** — vẫn pending.

