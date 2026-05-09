# Content backlog — Batch A3: Daily utilities

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md` (master roadmap thay cho GitHub Issue #5)
**Batch:** A3 — Daily utilities
**Scope:** chỉ thêm 4 guide mới. Không sửa UI, không bump version, không thêm asset mới.

---

## Guides added

| # | id | title | titleJp | category | priority |
|---|---|---|---|---|---|
| 1 | `electricity-gas-water-contracts` | Hợp đồng điện, gas, nước ở Nhật | 日本で電気・ガス・水道を使うとき | daily-law | normal |
| 2 | `home-internet-wifi-contracts` | Internet, Wi-Fi nhà ở Nhật | 日本で自宅のインターネットを契約するとき | daily-law | normal |
| 3 | `nhk-contract-guide` | NHK đến nhà thì xử lý thế nào? | NHKの訪問を受けたとき | daily-law | normal |
| 4 | `post-office-mail-forwarding` | Bưu điện, chuyển tiếp thư và gửi hàng ở Nhật | 郵便局・転送届・荷物を送るとき | daily-law | normal |

Category `daily-law` — utilities/civic life domain.

## Files created

```
src/constants/content/adminGuides/guides/electricity-gas-water-contracts.ts
src/constants/content/adminGuides/guides/home-internet-wifi-contracts.ts
src/constants/content/adminGuides/guides/nhk-contract-guide.ts
src/constants/content/adminGuides/guides/post-office-mail-forwarding.ts
docs/content-roadmap-a3-daily-utilities-guides.md
```

## Files modified

```
src/constants/content/adminGuides/guides/index.ts   (4 imports + 4 array entries)
```

## ADMIN_GUIDES count

- Before A3 (sau A2): **86**
- After A3: **90** (+4)

## Hero images reused

| Guide | Hero image | Notes |
|---|---|---|
| `electricity-gas-water-contracts` | none | Không có asset utility/electric/gas/water phù hợp |
| `home-internet-wifi-contracts` | none | Không có asset internet/wifi phù hợp |
| `nhk-contract-guide` | none | Không có asset NHK/TV phù hợp |
| `post-office-mail-forwarding` | none | Không có asset post-office phù hợp |

Tất cả 4 guide priority `normal` không cần heroImage. Tuân chỉ thị "không thêm image asset mới nếu không thật sự cần".

## Counter phrases per guide

| Guide | Count |
|---|---|
| `electricity-gas-water-contracts` | 8 |
| `home-internet-wifi-contracts` | 8 |
| `nhk-contract-guide` | 8 |
| `post-office-mail-forwarding` | 8 |

Tất cả jp + romaji + vn + note. **Tổng: 32 câu mới.**

## Search keywords added

| Guide | Keyword count | Notable terms |
|---|---|---|
| `electricity-gas-water-contracts` | 21 | điện, gas, nước, mở điện/gas/nước, hủy điện/gas/nước, chuyển nhà, 水道, 電気, ガス, 開栓, 使用開始, 解約, 引っ越し, 水道局, 東京電力, 東京ガス, 使用停止 |
| `home-internet-wifi-contracts` | 19 | internet, wifi, wi-fi, mạng nhà, lắp mạng, hikari, pocket wifi, home router, mạng di động, 光回線, ポケットWi-Fi, ホームルーター, 解約金, 工事費, 契約期間, WiMAX, SoftBank, NTT東日本, auひかり |
| `nhk-contract-guide` | 16 | NHK, nhk đến nhà, nhân viên NHK, hợp đồng NHK, đài NHK, 受信料, 受信契約, 放送法, 訪問, テレビ, không xem TV, từ chối NHK, không ký NHK, cooling-off, tư vấn NHK, 国民生活センター |
| `post-office-mail-forwarding` | 19 | bưu điện, gửi hàng, gửi đồ về Việt Nam, chuyển tiếp thư, đổi địa chỉ nhận thư, hẹn giao lại, 不在票, 再配達, 郵便局, 転送届, 荷物, 追跡番号, EMS, 国際郵便, tracking, 日本郵便, Japan Post, kokusai yubin, chuyển nhà thư |

**Tổng 75 search keywords mới.**

## Source status per guide

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `electricity-gas-water-contracts` | 経済産業省 (meti.go.jp), 国民生活センター (kokusen.go.jp) | **HOMEPAGE LEVEL** — METI quản lý điện + gas; 国民生活センター cho consumer disputes |
| `home-internet-wifi-contracts` | 総務省 (soumu.go.jp), 国民生活センター (kokusen.go.jp) | **HOMEPAGE LEVEL** — MIC quản lý telecom; 国民生活センター cho contract disputes / cooling-off |
| `nhk-contract-guide` | NHK (nhk.or.jp), 国民生活センター (kokusen.go.jp) | **HOMEPAGE LEVEL** — NHK official + 国民生活センター cho consumer rights / cooling-off |
| `post-office-mail-forwarding` | 日本郵便 (post.japanpost.jp), 国民生活センター (kokusen.go.jp) | **HOMEPAGE/SERVICE LEVEL** — Japan Post là công ty cổ phần (.jp không phải .go.jp), official cho dịch vụ post |

KHÔNG bịa deep-link. Tất cả homepage level + 1 service-level URL (post.japanpost.jp).

## Items needing official source check (NEEDS_OFFICIAL_SOURCE_CHECK)

Các điểm content lead nên verify trước khi nâng `officialLinks` lên trang con cụ thể hoặc thêm số tiền cố định:

### electricity-gas-water-contracts
1. **電気自由化 từ 2016 + ガス自由化 từ 2017** — chính xác (chính phủ công bố), nhưng trang METI cụ thể về 自由化 cần link.
2. **Phí cụ thể** (4,000–6,000円/tháng cho 光回線, 700–2,000円 cho ゆうパック, etc.) — chỉ là tham khảo, đã hedge "tùy công ty + tùy gói + tùy mùa".
3. **使用停止 procedure** — varies theo công ty, đã direct user đến trang công ty cụ thể.
4. **List 10 公司 điện vùng** (東京電力, 関西電力, 中部電力, 中国電力, 四国電力, 九州電力, 北海道電力, 東北電力, 北陸電力, 沖縄電力) — không list đầy đủ trong guide vì dài, đã đề cập "v.v.".
5. **プロパン (LP gas) phí** — "thường đắt hơn 都市ガス" — chính xác chung nhưng không bịa số.

### home-internet-wifi-contracts
6. **電気通信事業法 + 特定商取引法 cooling-off 8 ngày** — chính xác trong general framework. Trường hợp cụ thể (online vs 訪問販売) cần luật sư review nếu publish ở scale.
7. **Phí 月額 + 工事費 + 解約金** — chỉ là range tham khảo (đã hedge "tùy công ty"). Không bịa số chính xác.
8. **更新月 mechanism** — đa số ISP có 2-year auto-renewal, nhưng từng công ty khác. Đã direct user đọc hợp đồng.
9. **訪問販売 cooling-off** — chính xác cho 訪問販売 nhưng KHÔNG cho online / cửa hàng. Đã hedge.

### nhk-contract-guide
10. **放送法 điều 64** — quy định chung. Áp dụng cụ thể cho từng thiết bị (smart TV không có ăng-ten / điện thoại One-Seg / xe hơi cũ) là vùng xám pháp lý. Guide đã hedge "Đây không phải tư vấn pháp lý cá nhân".
11. **特定商取引法 cooling-off 8 ngày cho 訪問販売** — chính xác general, áp dụng cụ thể tùy trường hợp.
12. **不退去罪** — luật hình sự (刑法) — chính xác general, nhưng áp dụng cụ thể cần cảnh sát đánh giá.
13. **受信料 cụ thể** — KHÔNG đưa số tiền vì có nhiều mức (đất / vệ tinh / theo phương thức thanh toán) + thay đổi. Đã direct user đến trang NHK.
14. **Hủy hợp đồng sau cooling-off** — quy định cụ thể của NHK, đã direct user đến trang NHK + 国民生活センター.

### post-office-mail-forwarding
15. **転送届 miễn phí 1 năm** — Japan Post quy định chuẩn, ổn định trong nhiều năm.
16. **Phí thư + ゆうパック + EMS / 航空便 / 船便** — range tham khảo, đã hedge "tùy" + direct user kiểm tra trang Japan Post.
17. **Đồ cấm về VN** — guide list dựa trên hiểu biết chung (thực phẩm tươi, hạt giống, thuốc theo toa, mỹ phẩm cồn cao, etc.). Quy định cụ thể của hải quan VN thay đổi — đã direct user kiểm tra.
18. **Claim time 6 tháng cho 国際郵便** — quy định Japan Post chuẩn theo UPU, nhưng nên verify trang chính thức.
19. **税関告知書 yêu cầu** — Japan Post quy định chuẩn theo UPU.

## Items needing native / user review

(Không sửa trong batch này, ghi vào danh sách chờ.)

1. **`電気を使い始めたいです` / `ガスの開栓を予約したいです`** — natural Japanese, đã verified với pattern phổ thông.
2. **`今すぐ契約できません`** — tone polite-firm cho NHK guide. Native confirm có quá soft không.
3. **`今日は帰ってください`** — tone đủ mạnh cho yêu cầu nhân viên về. Native confirm có cần variant mạnh hơn không.
4. **`テレビなどの受信機器はありません`** — phrasing chính xác cho declaration không có thiết bị. Native confirm.
5. **`荷物を送りたいです` / `この荷物は送れますか`** — natural cho post office. Confirmed with similar guides.
6. **NHK guide tone**: cần legal counsel review trước khi publish vì NHK liên quan 放送法. Đặc biệt section "Tôi không có TV" + "Smart TV chỉ Netflix".
7. **Internet contract section**: 訪問販売 cooling-off advice nên có luật sư xác nhận.
8. **Phí cụ thể** mỗi guide: dù đã hedge, nên có nhân viên hiện tại confirm range vẫn realistic 2026.

## Device QA checklist

Tester mở app trên device thật (iOS + Android nếu có), check theo thứ tự:

### `electricity-gas-water-contracts`
- [ ] Mở guide từ Admin tab.
- [ ] Layout không hero — OK.
- [ ] quickAction render: deadline, office, doNow (5 bullet), bring (6 line), ifLate, officialSourceLabels.
- [ ] counterPhrases hiển thị đủ **8** câu — đọc đầy đủ jp + romaji + vn + note.
- [ ] Tap copy ở 1 câu (vd `ガスの開栓を予約したいです`) → clipboard có jp.
- [ ] Steps render đủ 5 bước, đánh số đúng 1–5.
- [ ] FAQ render đủ 5 câu hỏi.
- [ ] documentsChecklist 6 row.

### `home-internet-wifi-contracts`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu.
- [ ] Steps render 5 bước.
- [ ] FAQ về 更新月 hiện rõ — tránh user bỏ lỡ tháng renewal.
- [ ] FAQ về cooling-off 訪問販売 hiển thị đầy đủ.

### `nhk-contract-guide`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu (8 câu xử lý nhân viên ở cửa).
- [ ] Steps render 5 bước (TRƯỚC → tại cửa → đáp lại → sau khi đi → cooling-off nếu lỡ ký).
- [ ] FAQ có 5 câu — đặc biệt câu về "smart TV chỉ Netflix" không bị cắt.
- [ ] Disclaimer "không phải tư vấn pháp lý cá nhân" hiện rõ trong legalScope.

### `post-office-mail-forwarding`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu.
- [ ] Steps render 5 bước (転送届 → 不在票 → gửi nội địa → gửi quốc tế → tracking).
- [ ] FAQ về scam SMS Japan Post hiển thị rõ — quan trọng cho user.

### Cross-cut search QA
- [ ] Gõ "điện" → kết quả có `electricity-gas-water-contracts`.
- [ ] Gõ "gas" → kết quả có `electricity-gas-water-contracts`.
- [ ] Gõ "internet" → kết quả có `home-internet-wifi-contracts`.
- [ ] Gõ "wifi" → kết quả có `home-internet-wifi-contracts`.
- [ ] Gõ "NHK" → kết quả có `nhk-contract-guide`.
- [ ] Gõ "受信料" → kết quả có `nhk-contract-guide`.
- [ ] Gõ "bưu điện" → kết quả có `post-office-mail-forwarding`.
- [ ] Gõ "gửi đồ về Việt Nam" → kết quả có `post-office-mail-forwarding`.
- [ ] Gõ "chuyển nhà" → kết quả có cả electricity (使用停止) + post-office (転送届).
- [ ] Gõ "解約金" → kết quả có cả electricity + internet guides.
- [ ] Gõ "国民生活センター" → kết quả có ≥3 guide A3 (electricity, internet, NHK, post — đều reference).

### iOS-specific
- [ ] Long-press đoạn jp → context menu copy hoạt động.
- [ ] Dynamic Type lên cỡ XXL → không cắt ngang chữ.

### Android-specific
- [ ] Back button → quay lại AdminScreen / Search.
- [ ] Long-press copy đoạn jp → dán được vào app khác.

---

## Style notes (tuân thủ execution rules)

- **Action-first**: mỗi guide bắt đầu bằng quickAction "phải làm gì NGAY". Steps theo thứ tự thời gian (trước → trong → sau).
- **Tone tự nhiên**: "thường", "có thể", "tùy công ty", "tùy địa phương", "hãy hỏi trước". Không tuyệt đối "phải" / "không bao giờ".
- **Không bịa fact**: số tiền dùng range hedged + direct user kiểm tra trang công ty / official.
- **Không bịa URL**: tất cả URL homepage / service-level chính thức.
- **Cross-reference**: post-office guide nhắc 内容証明郵便 dùng cho NHK cooling-off; electricity guide nhắc 国民生活センター 188 cho consumer disputes.
- **Counter phrases**: focus vào câu thiết thực tại quầy / qua điện thoại (mở dịch vụ, hỏi phí, hủy, từ chối ép ký).
- **保険証 wording**: không applicable (utilities không cần). Nhưng mention 在留カード khi cần xác minh danh tính.
- **Safety wording cho NHK**: KHÔNG hướng dẫn "trốn luật" / "giả vờ không có TV". Chỉ hướng dẫn quyền + nghĩa vụ + cooling-off — user tự quyết định.

## Verification results

| Check | Result | Time |
|---|---|---|
| `npm run typecheck` | PASS | trước khi commit |
| `npm run test:ci` | PASS — **251/251 tests** | trước khi commit |
| `npm run verify:content` | PASS — 0 issues | trước khi commit |

Pre-commit hook chạy lại khi commit — nếu regression sẽ block.

---

## Batch A3 done — không phải batch A4

Theo execution rule: 3–5 guide / batch. Batch A3 có 4 guide đúng quy định. **KHÔNG implement Batch A4 (Education / children) trong PR này.**

Khi user yêu cầu batch tiếp theo, làm theo `docs/full-content-backlog-45-guides.md` Batch A4 (japanese-school-system-children, japanese-language-support-children, child-allowance-jidou-teate) — 3 guide.

---

## QA review pass — 2026-05-09 (commit follow-up)

Sau khi commit ban đầu của batch A3, làm pass review nội bộ trên 4 guide. Sửa wording an toàn, hedge claim pháp lý, làm sạch search keyword. Không thay schema, không sửa UI, không đổi version/tag.

### Tóm tắt sửa

| Guide | Thay đổi | Lý do |
|---|---|---|
| `nhk-contract-guide` | searchKeywords: bỏ "từ chối NHK", "không ký NHK" → thêm "xem xét NHK", "không ký vội", "188", "NHK ép ký" | "Từ chối NHK" / "không ký NHK" có thể đọc thành khuyến khích trốn luật. Thay bằng wording trung lập về xem xét trước khi ký |
| `nhk-contract-guide` | quickAction.ifLate: "có quyền cooling-off — có thể hủy không lý do" → "có cơ chế cooling-off cho 訪問販売 (8 ngày), nhưng việc cooling-off có áp dụng cho 受信契約 NHK hay không là vùng còn tranh cãi pháp lý" | Áp dụng cooling-off cho NHK 受信契約 thực sự là vùng tranh cãi (khác với 訪問販売 thông thường). KHÔNG được claim như quyền chắc chắn |
| `nhk-contract-guide` | whenToDo: "8 ngày cooling-off có còn không" → "đọc lại giấy tờ và hỏi 国民生活センター 188" | Cùng lý do trên — bỏ giả định cooling-off áp dụng |
| `nhk-contract-guide` | fees: thêm hedge "Việc áp dụng cho 受信契約 NHK là vùng tranh cãi — hỏi 国民生活センター trước khi dựa vào đó" + thêm điều kiện hủy NHK + 内容証明郵便 phí | Cooling-off ⊨ NHK chưa rõ pháp lý |
| `nhk-contract-guide` | FAQ "đe dọa kiện": "có thể là 不退去罪" → "có thể đối chiếu 不退去罪 (luật hình sự về việc không rời sau khi được yêu cầu, ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá khi đến)" | 不退去罪 có ngưỡng áp dụng cụ thể, không phải mọi trường hợp NHK đều đủ điều kiện |
| `nhk-contract-guide` | FAQ "đã ký rồi": "8 ngày cooling-off thường áp dụng cho 訪問販売" → "việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý — Việc đầu tiên: hỏi 国民生活センター 188" | Đẩy user đi tư vấn TRƯỚC khi tự gửi 解約通知書 |
| `nhk-contract-guide` | Step 1 "Có 8 ngày cooling-off nếu đã lỡ ký 訪問販売" → "特定商取引法 có cơ chế cooling-off 8 ngày cho 訪問販売 — việc áp dụng cụ thể cho NHK là vùng tranh cãi" | Cùng lý do |
| `nhk-contract-guide` | Step 4 "Nếu có thắc mắc: hỏi 国民生活センター 188 (miễn phí, không kỳ thị)" → "(tư vấn consumer miễn phí)" | Bỏ wording "không kỳ thị" — không phù hợp ngữ cảnh |
| `nhk-contract-guide` | Step 5 title: "Nếu lỡ ký rồi — kiểm tra cooling-off 8 ngày" → "Nếu lỡ ký rồi — tư vấn 国民生活センター trước"; body lead với hedge "việc áp dụng cụ thể cho 受信契約 NHK là vùng tranh cãi pháp lý ở Nhật"; "không thể bị từ chối" → "có chứng minh ngày gửi" | Đẩy user đi tư vấn → tự dùng cooling-off; bỏ overclaim "không thể bị từ chối" |
| `post-office-mail-forwarding` | Step 4: "Khai dưới 50,000円 thường không bị truy thu thuế VN nhưng tùy hải quan" → "KHÔNG khai sai để né thuế" + "Mức thuế tùy loại + giá trị + hải quan đánh giá — không có công thức chung" | "50,000円 không bị thuế" là overclaim — quy định VN thay đổi, không có ngưỡng cố định toàn cầu |
| `post-office-mail-forwarding` | commonMistakes: "bị truy thu thuế hoặc bị từ chối" → "vi phạm quy định, bị phạt hoặc bị từ chối nhận" | Diễn đạt rõ hơn về hậu quả pháp lý |
| `electricity-gas-water-contracts` | searchKeywords +6: "mất điện", "mất nước", "rò gas", "停電", "プロパンガス", "都市ガス" | Panic-search behavior — khi mất điện đột ngột, user gõ "mất điện" |
| `home-internet-wifi-contracts` | searchKeywords +5: "không có mạng", "internet bị cắt", "mạng chậm", "更新月", "cooling-off" | Panic-search + technical terms được nhắc trong guide |
| `post-office-mail-forwarding` | searchKeywords +4: "không nhận được hàng", "hàng chưa đến", "hàng mất", "内容証明郵便" | Panic-search khi tracking dừng + cross-reference NHK guide |

### Kết luận từng guide

#### 1. `electricity-gas-water-contracts` — PASS sau sửa
- Wording về 開栓 / 解約 / 引っ越し đã action-first.
- Phí dùng range hedged ("thường khoảng" / "tùy công ty / gói / mùa").
- Counter phrases natural cho hotline + cửa hàng.
- Phần rò gas có warning rõ — gọi gas company / 119 + KHÔNG bật điện / lửa.
- Search keywords +6 (panic terms + chuyên ngành gas).

#### 2. `home-internet-wifi-contracts` — PASS sau sửa
- Phân biệt 光回線 / ホームルーター / ポケット Wi-Fi rõ.
- Cooling-off cho 訪問販売 internet là thực sự áp dụng — không hedge quá mức (khác NHK case).
- 解約金 / 契約期間 / 工事費 / 更新月 đều có hedge "tùy công ty".
- KHÔNG overclaim "always need construction" — đã ghi rõ "Một số chung cư đã có sẵn".
- Search keywords +5.

#### 3. `nhk-contract-guide` — PASS sau sửa (lớn nhất)
- **Cooling-off cho NHK 受信契約**: hedge mạnh ở 5 chỗ — quickAction.ifLate, whenToDo, fees, FAQ "đã ký", Step 1, Step 5. Mọi nơi nhắc đều direct user đi 国民生活センター 188 TRƯỚC khi tự gửi 解約通知書.
- **不退去罪**: thêm hedge "ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá khi đến".
- **searchKeywords**: bỏ "từ chối NHK", "không ký NHK" (có thể đọc thành trốn luật) → thêm wording trung lập.
- **Tone**: vẫn calm + neutral, hướng dẫn xem xét trước khi ký, KHÔNG khuyến khích trốn luật / nói dối / cãi nhau.
- **Counter phrases**: 8 câu — đều natural + thực tế (tại cửa).
- **`内容証明郵便` "không thể bị từ chối"**: sửa thành "có chứng minh ngày gửi".

#### 4. `post-office-mail-forwarding` — PASS sau sửa
- 転送届 / 不在票 / 再配達 wording rõ + practical (4 cách hẹn lại).
- Khai báo hải quan: bỏ overclaim "Khai dưới 50,000円 thường không bị truy thu" — thay bằng "Khai trung thực + hỏi hải quan VN nếu cần".
- Search keywords +4 (panic terms + cross-ref NHK).
- Counter phrases practical cho post + tracking.
- KHÔNG promising mọi đồ đều gửi được — đã list đồ cấm + hedge "kiểm tra với hải quan VN".

### CounterPhrases review (32 câu)

Tất cả 32 câu đã được review natural Japanese + natural Vietnamese:

| Guide | Câu | Đánh giá |
|---|---|---|
| electricity (8) | 電気を使い始めたい / ガスの開栓を予約したい / 水道の使用開始 / 引っ越しするので解約 / 支払い方法を変更 / いつから使えますか / 解約金はかかりますか / ガスの臭いがします | Tất cả natural, dùng được tại quầy / qua điện thoại |
| internet (8) | インターネットを契約したい / 工事は必要ですか / 解約金はいくらですか / 契約期間は何年ですか / 引っ越し先でも使えますか / いつから使えますか / 今すぐ契約できません / ベトナム語の説明はありますか | Tất cả natural — đặc biệt câu "今すぐ契約できません" useful cho 訪問販売 |
| NHK (8) | 内容を確認したい / 今すぐ契約できません / ベトナム語で確認してから判断 / 名刺をいただけますか / 今日は帰ってください / 書類を置いてください / テレビなどの受信機器はありません / 国民生活センターに相談します | Tất cả natural + neutral tone — không aggressive |
| post-office (8) | 転送届を出したい / 荷物を送りたい / ベトナムに送りたい / 追跡番号はありますか / 再配達をお願いしたい / この荷物は送れますか / 何日くらいで届きますか / 保険を付けたい | Tất cả natural — phù hợp tại quầy bưu điện |

KHÔNG có câu nào quá textbook-like. Tất cả đều thực tế.

---

## Source status — final (sau QA review)

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `electricity-gas-water-contracts` | 経済産業省 (meti.go.jp), 国民生活センター (kokusen.go.jp) | **HOMEPAGE LEVEL** — không thay đổi |
| `home-internet-wifi-contracts` | 総務省 (soumu.go.jp), 国民生活センター | **HOMEPAGE LEVEL** — không thay đổi |
| `nhk-contract-guide` | NHK (nhk.or.jp), 国民生活センター | **HOMEPAGE LEVEL** — không thay đổi. Cooling-off claims hedged mạnh sau pass review |
| `post-office-mail-forwarding` | 日本郵便 (post.japanpost.jp), 国民生活センター | **HOMEPAGE/SERVICE LEVEL** — không thay đổi. Bỏ specific claim về thuế VN |

**KHÔNG nâng status lên "confirmed" cho deep-link nào.**

### Items vẫn `NEEDS_OFFICIAL_SOURCE_CHECK` (sau QA review)

19 items đã ghi trong section trên — KHÔNG thay đổi sau pass review. Lưu ý đặc biệt:

1. **NHK cooling-off pháp lý applicability** — sau QA pass đã hedge mạnh nhưng VẪN cần luật sư chuyên về consumer law review trước khi publish ở scale lớn. Đây là hot topic ở Nhật với nhiều tranh chấp tòa án — phán quyết tòa varies.
2. **不退去罪 ngưỡng áp dụng cụ thể cho NHK case** — luật hình sự (刑法 130) áp dụng cho 不退去, nhưng case law cho NHK varies. Đã hedge "tùy hoàn cảnh".
3. **Post-office: thuế hải quan VN** — quy định VN thay đổi, không có ngưỡng cố định. Đã bỏ specific claim "50,000円".

---

## Device QA checklist (cập nhật sau pass review)

### `electricity-gas-water-contracts`
- [ ] Mở guide từ Admin tab. Layout không hero — OK.
- [ ] quickAction render: deadline, office, doNow (5 bullet), bring (6 line), ifLate, officialSourceLabels.
- [ ] counterPhrases hiển thị đủ **8** câu. Tap copy ở `ガスの開栓を予約したいです` → clipboard có jp.
- [ ] Steps render đủ 5 bước, đánh số đúng 1–5.
- [ ] FAQ render đủ 5 câu hỏi. FAQ "rò gas" + tip an toàn không bị cắt.
- [ ] documentsChecklist 6 row.
- [ ] Search "mất điện" → kết quả có guide này.
- [ ] Search "rò gas" → kết quả có guide này (qua bring + counter phrase).

### `home-internet-wifi-contracts`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu. Tap copy ở `今すぐ契約できません` → clipboard có jp.
- [ ] Steps render 5 bước.
- [ ] FAQ về 更新月 hiện rõ — đặc biệt phần "Đặt nhắc nhở 更新月".
- [ ] FAQ về 訪問販売 cooling-off đầy đủ — tránh user nhầm sang NHK case.
- [ ] Search "internet bị cắt" → kết quả có guide này.
- [ ] Search "mạng chậm" → kết quả có guide này.

### `nhk-contract-guide`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu (8 câu xử lý nhân viên ở cửa).
- [ ] Steps render 5 bước (TRƯỚC → tại cửa → đáp lại → sau khi đi → tư vấn 国民生活センター).
- [ ] **Step 5 title** hiện "tư vấn 国民生活センター trước" (không còn "kiểm tra cooling-off 8 ngày").
- [ ] Disclaimer "không phải tư vấn pháp lý cá nhân" hiện rõ trong legalScope.
- [ ] Hedge "vùng tranh cãi pháp lý" hiện trong fees + Step 5 + ifLate + FAQ "đã ký rồi".
- [ ] FAQ "đe dọa kiện" hedge "ngưỡng áp dụng tùy hoàn cảnh" rõ ràng.
- [ ] Counter phrase `今日は帰ってください` copy được.
- [ ] Search "NHK" → kết quả có guide này.
- [ ] Search "受信料" → kết quả có guide này.
- [ ] Search "NHK ép ký" → kết quả có guide này.
- [ ] Search "từ chối NHK" → kết quả KHÔNG còn match qua searchKeywords (đã bỏ keyword này).

### `post-office-mail-forwarding`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **8** câu.
- [ ] Steps render 5 bước (転送届 → 不在票 → gửi nội địa → gửi quốc tế → tracking).
- [ ] FAQ về scam SMS Japan Post hiển thị rõ.
- [ ] Step 4 hedge "khai trung thực" + bỏ specific 50,000円 claim.
- [ ] Search "không nhận được hàng" → kết quả có guide này.
- [ ] Search "内容証明郵便" → kết quả có guide này (cross-ref NHK guide).

### Cross-cut search QA
- [ ] Gõ "điện" → có `electricity-gas-water-contracts`.
- [ ] Gõ "gas" → có `electricity-gas-water-contracts`.
- [ ] Gõ "mất điện" → có `electricity-gas-water-contracts`.
- [ ] Gõ "internet" / "wifi" → có `home-internet-wifi-contracts`.
- [ ] Gõ "internet bị cắt" → có `home-internet-wifi-contracts`.
- [ ] Gõ "NHK" → có `nhk-contract-guide`.
- [ ] Gõ "受信料" / "受信契約" → có `nhk-contract-guide`.
- [ ] Gõ "bưu điện" → có `post-office-mail-forwarding`.
- [ ] Gõ "不在票" / "再配達" → có `post-office-mail-forwarding`.
- [ ] Gõ "không nhận được hàng" → có `post-office-mail-forwarding`.
- [ ] Gõ "chuyển nhà" → có cả electricity (使用停止) + post-office (転送届).
- [ ] Gõ "解約金" → có cả electricity + internet guides.
- [ ] Gõ "国民生活センター" → có ≥3 guide A3.

### Long Japanese text render check
- [ ] electricity Step 5 (移転 + 解約 dài) — không cắt giữa chừng.
- [ ] internet Step 5 (更新月 + 引っ越し手続き) — render đủ.
- [ ] NHK Step 5 (cooling-off + hedged) — đoạn dài, kiểm tra không cắt.
- [ ] post Step 4 (gửi quốc tế EMS/航空便/船便) — render đủ 3 lựa chọn.

### iOS-specific
- [ ] Long-press đoạn jp `今日は帰ってください` → context menu copy hoạt động.
- [ ] Dynamic Type lên cỡ XXL → không cắt ngang chữ.

### Android-specific
- [ ] Back button hardware → quay lại AdminScreen / Search.
- [ ] Long-press copy đoạn jp → dán được vào app khác.

---

## Items vẫn cần native / legal review

(Sau QA pass, đẩy lên list pending review.)

1. **NHK cooling-off applicability**: VẪN cần luật sư consumer review chính thức. Đã hedge mạnh nhưng còn rủi ro nếu user dựa vào cooling-off mà không hỏi 国民生活センター trước.
2. **NHK 不退去罪 ngưỡng**: case law cụ thể cho NHK 訪問販売 — luật sư review.
3. **Counter phrase tone NHK**: 8 câu hiện neutral. Native confirm có quá soft / quá cứng không khi tương tác thực với nhân viên NHK.
4. **Internet cooling-off cho 訪問販売**: chính xác chung, nhưng case-specific (vd online vs cửa hàng vs 訪問販売 hỗn hợp) — luật sư review.
5. **Phí ranges (utility, internet, EMS)**: native + công ty hiện tại confirm còn realistic 2026 không.
6. **Đồ cấm về VN**: kiểm tra trang hải quan VN mới nhất — 2026 có thay đổi không.
7. **e転居 procedure**: NHK pass review không động tới procedure này — vẫn là Japan Post info chuẩn.

---

## Verification sau pass review

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run test:ci` | PASS — **251/251 tests** |
| `npm run verify:content` | PASS — 0 issues |

Không có test mới fail / regress.

---

## Out of scope

- Không thêm guide thứ 5.
- Không sửa UI / build config / version / tag.
- Không bịa fact / URL / con số phí cố định.
- Không add image asset mới.
- Không rewrite guide cũ.
- Không hướng dẫn người dùng trốn luật (đặc biệt NHK).
