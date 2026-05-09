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

## Out of scope

- Không thêm guide thứ 5.
- Không sửa UI / build config / version / tag.
- Không bịa fact / URL / con số phí cố định.
- Không add image asset mới.
- Không rewrite guide cũ.
- Không hướng dẫn người dùng trốn luật (đặc biệt NHK).
