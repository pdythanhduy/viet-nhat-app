# Device QA v1.3.2

Manual smoke test trên iOS + Android trước khi chạy production EAS build. Mục tiêu ~30–45 phút mỗi platform.

---

## Build info

| Field | Value |
|---|---|
| **App version** | 1.3.2 |
| **Tag** | `v1.3.2` |
| **Commit** | `6e656cb` |
| **Test date** | __________ |
| **Tester** | __________ |
| **Device** | __________ |
| **OS version** | __________ |
| **Build channel** | preview / production |
| **Result** | ☐ GO / ☐ NO-GO |

---

## 1. App launch / basic navigation

- [ ] App mở không crash (cold start)
- [ ] Home screen render đầy đủ — header + quick actions + sections
- [ ] Bottom tab: Home → Admin → Search → Japanese → Jobs → Saved → BJT (tùy theo tab có sẵn)
- [ ] Mỗi tab open không crash
- [ ] Settings mở từ Home header (icon góc phải)
- [ ] Saved tab mở không crash kể cả khi list rỗng

**Expected:** không crash, không màn hình trắng, các tab điều hướng smooth.

---

## 2. Home quick actions

Tap từng chip / quick action, kiểm tra điều hướng + nội dung:

| Action | Expected |
|---|---|
| Gia hạn visa | Mở `residence-card` guide trực tiếp (không qua search list) |
| Chuyển nhà | Mở search hoặc guide `address-change` / `moving-in-notification` |
| Mất giấy tờ | Mở `lost-residence-card` guide trực tiếp |
| Thuế / bảo hiểm | Mở search `bảo hiểm` — kết quả KHÔNG ẩn `health-insurance` |
| Khẩn cấp | Mở Emergency hub HOẶC `emergency-calls-japan` guide |

- [ ] Tất cả chip trỏ đúng đích, không màn hình trắng
- [ ] Back từ guide → quay về Home đúng

---

## 3. Search

Vào Search tab, thử 10 query:

| Query | Expected guide xuất hiện |
|---|---|
| `gia hạn visa` | `residence-card` |
| `mất thẻ cư trú` | `lost-residence-card`, `residence-card` |
| `đi khám bệnh` | `clinic-hospital-visit-guide` |
| `cấp cứu` | `emergency-calls-japan` |
| `động đất` | `earthquake-preparedness-japan` |
| `bão` | `typhoon-evacuation-alerts` |
| `điện` | `electricity-gas-water-contracts` |
| `wifi` | `home-internet-wifi-contracts` |
| `NHK` | `nhk-contract-guide` |
| `bưu điện` | `post-office-mail-forwarding` |

- [ ] Mỗi query trả về guide đúng
- [ ] Sau khi xem 1 guide, back về search → query KHÔNG bị reset / không bị stale
- [ ] Nhấn nút clear (X) → query xóa, list rỗng quay về placeholder
- [ ] Search romaji "saigai" / "denki" / "kasai" — vẫn match nếu trong searchKeywords

---

## 4. Admin guides — A1 medical

### `clinic-hospital-visit-guide`
- [ ] Guide mở từ Admin tab hoặc search
- [ ] Hero image (`ag_kensin_hero.jpg`) load đúng
- [ ] Scroll xuống đến cuối không lag
- [ ] CounterPhrases section render đủ **8** câu
- [ ] Tap copy ở `初めてです` → clipboard có jp
- [ ] Long jp `予約していませんが、診てもらえますか。` không bị cắt giữa chừng

### `emergency-calls-japan`
- [ ] Guide mở
- [ ] Layout không hero — không khoảng trắng lớn ở đầu
- [ ] CounterPhrases đủ **9** câu
- [ ] Tap copy `救急車をお願いします` → clipboard có jp
- [ ] Số 119 / 110 / #7119 / #9110 render rõ, không bị format thành thẻ điện thoại auto-link sai

### `dentist-visit-japan`
- [ ] Guide mở
- [ ] CounterPhrases đủ **7** câu
- [ ] Tap copy `歯が痛いです` → clipboard có jp
- [ ] FAQ về implant render đầy đủ (không còn số "50万円" cụ thể sau QA pass)

---

## 5. Admin guides — A2 disaster

### `earthquake-preparedness-japan`
- [ ] Guide mở, scroll mượt
- [ ] CounterPhrases đủ **7** câu
- [ ] Step 2 title `姿勢を低く / 頭を守る / じっとする` render đầy đủ, không cắt
- [ ] Tap copy `助けてください！` → clipboard có jp

### `typhoon-evacuation-alerts`
- [ ] Guide mở
- [ ] CounterPhrases đủ **7** câu
- [ ] Step 5 cấp 5 wording đầy đủ
- [ ] Số `30cm` / `50cm` không bị format lỗi

### `hazard-map-flood-tsunami-volcano`
- [ ] Guide mở
- [ ] CounterPhrases đủ **6** câu
- [ ] Step 3 hiển thị "Hình trường học / Hình cây / Hình chữ thập" (KHÔNG còn emoji 🏫🌳🏥)
- [ ] FAQ Phú Sĩ hiển thị "active KHÔNG có nghĩa sắp phun trào" rõ ràng

### Japanese terms cross-render check
Mở bất kỳ trong 3 guide A2, scroll qua step + FAQ:

- [ ] `防災バッグ` render đúng
- [ ] `罹災証明書` render đúng
- [ ] `緊急地震速報` render đúng
- [ ] `警戒レベル` render đúng (đặc biệt cấp 1–5)
- [ ] `避難指示` render đúng
- [ ] `ハザードマップ` render đúng
- [ ] `津波` render đúng
- [ ] `土砂災害` render đúng
- [ ] `171` render rõ (không bị format thành điện thoại auto-link)

---

## 6. Admin guides — A3 daily utilities

### `electricity-gas-water-contracts`
- [ ] Guide mở
- [ ] CounterPhrases đủ **8** câu
- [ ] Tap copy `ガスの開栓を予約したいです` → clipboard có jp
- [ ] Search "mất điện" hoặc "rò gas" → trả guide này

### `home-internet-wifi-contracts`
- [ ] Guide mở
- [ ] CounterPhrases đủ **8** câu
- [ ] FAQ về 更新月 hiển thị rõ
- [ ] Long jp `今すぐ契約できません。家で確認してから決めます。` render không cắt

### `nhk-contract-guide` — **CHÚ Ý NHẠY CẢM**
- [ ] Guide mở
- [ ] CounterPhrases đủ **8** câu
- [ ] **Wording KHÔNG aggressive** — không nghe như "trốn NHK" / "lừa NHK"
- [ ] Step 5 title `tư vấn 国民生活センター trước` (KHÔNG còn `kiểm tra cooling-off 8 ngày`)
- [ ] Hedge "vùng tranh cãi pháp lý" hiện trong: fees, Step 5, ifLate, FAQ "đã ký rồi"
- [ ] Disclaimer "Đây không phải tư vấn pháp lý cá nhân" render rõ trong legalScope
- [ ] KHÔNG có markdown lạ (vd `**` hiện ra như chữ thường thay vì bold)
- [ ] Tap copy `今日は帰ってください` → clipboard có jp

### `post-office-mail-forwarding`
- [ ] Guide mở
- [ ] CounterPhrases đủ **8** câu
- [ ] FAQ scam SMS Japan Post hiển thị rõ
- [ ] Step 4 customs section hiển thị "khai trung thực" (KHÔNG còn "Khai dưới 50,000円 thường không bị truy thu")

### Search keyword cross-check A3
- [ ] "mất điện" → `electricity-gas-water-contracts`
- [ ] "internet bị cắt" → `home-internet-wifi-contracts`
- [ ] "受信料" → `nhk-contract-guide`
- [ ] "không nhận được hàng" → `post-office-mail-forwarding`
- [ ] "解約金" → cả `electricity-gas-water-contracts` + `home-internet-wifi-contracts`

---

## 7. Saved / bookmark

- [ ] Bookmark 1 guide từ A1 (vd `clinic-hospital-visit-guide`)
- [ ] Mở Saved tab → guide xuất hiện
- [ ] Tap guide từ Saved → mở đúng guide
- [ ] Unbookmark → guide biến mất khỏi Saved
- [ ] Bookmark guide trong A2 + A3 → cả 3 hiển thị trong Saved
- [ ] Đóng app + mở lại → state Saved giữ nguyên (persistence)

---

## 8. Copy / share behavior

- [ ] Copy counterPhrase jp từ A1 (`clinic-hospital`) → dán vào Notes / Translate → đúng nội dung
- [ ] Copy counterPhrase jp từ A2 (`earthquake`) → đúng nội dung
- [ ] Copy counterPhrase jp từ A3 (`nhk-contract`) → đúng nội dung
- [ ] Long-press đoạn jp trong description / step → context menu xuất hiện (iOS) / select text (Android)
- [ ] Nếu app có chức năng Share → share guide → dán URL/text vào Messages → readable

---

## 9. Platform-specific

### iOS
- [ ] Dynamic Type: Settings → Display & Text Size → cỡ XXL → mở lại app → guide không cắt ngang chữ
- [ ] Swipe back gesture từ rìa trái → quay lại đúng AdminScreen / Search list
- [ ] Long-press jp → context menu Copy / Define
- [ ] Copy paste vào Apple Notes → text đúng

### Android
- [ ] Hardware back button → quay lại đúng (theo navigation stack, không thoát app bất ngờ)
- [ ] Software back gesture (Android 10+) → tương tự
- [ ] Copy paste vào Google Keep / WhatsApp → text đúng
- [ ] Scroll performance ở guide dài (vd `nhk-contract-guide` có 5 step) — không lag, không tearing
- [ ] Khi nhấn link `disaportal.gsi.go.jp` (hazard-map officialLinks) → mở browser hệ thống, không crash app

---

## 10. Pass / fail summary

| # | Area | Result | Bug found | Screenshot/video needed | Fix required before production? |
|---|---|---|---|---|---|
| 1 | App launch / navigation | ☐ Pass / ☐ Fail | | | |
| 2 | Home quick actions | ☐ Pass / ☐ Fail | | | |
| 3 | Search | ☐ Pass / ☐ Fail | | | |
| 4 | A1 medical guides | ☐ Pass / ☐ Fail | | | |
| 5 | A2 disaster guides | ☐ Pass / ☐ Fail | | | |
| 6 | A3 daily utility guides | ☐ Pass / ☐ Fail | | | |
| 7 | Saved / bookmark | ☐ Pass / ☐ Fail | | | |
| 8 | Copy / share | ☐ Pass / ☐ Fail | | | |
| 9 | Platform-specific (iOS / Android) | ☐ Pass / ☐ Fail | | | |

---

## 11. Production go / no-go

### ✅ GO if all true:
- Không crash khi mở app / mở 10 guide mới
- Không broken navigation (chip / search → guide đúng)
- Không có guide nào blank / cut content giữa chừng
- Copy counterPhrase jp hoạt động trên cả iOS + Android
- NHK guide tone không aggressive — không có chỗ nào nghe như khuyến khích trốn luật
- Wording legal-sensitive (NHK cooling-off, 不退去罪, 訪問販売, 労働安全衛生法) đọc qua không có chỗ nào bậy / overclaim

### ❌ NO-GO if any true:
- Route crash (vd tap chip → app crash / màn hình trắng)
- Guide nào load blank (không hiện title / steps / counterPhrases)
- Search bị broken (gõ keyword phổ biến mà không trả guide)
- Copy counterPhrase fail trên 1 platform (iOS hoặc Android)
- Wording NHK / 訪問販売 / 労働安全衛生法 nghe như xúi user trốn luật / vi phạm hợp đồng
- Hero image (`ag_kensin_hero.jpg` cho clinic-hospital) load fail / hiện ảnh sai

Nếu NO-GO → KHÔNG chạy production build. Mở pass review commit fix bug, bump `1.3.3` hotfix, lặp lại QA này.

---

## 12. EAS commands sau khi QA passes

### Bước 1: Preview build (cài thử trên device)

```powershell
# iOS preview
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform ios --profile preview
```

```powershell
# Android preview
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform android --profile preview
```

Đợi build xong (~5–10 phút). Cài lên device thật, chạy lại smoke-test (sections 1–9). Nếu không có gì khác so với dev build → tiếp Bước 2.

### Bước 2: Production build + submit (chỉ chạy sau khi preview install test pass)

```powershell
# iOS production
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform ios --profile production
# → Lấy build ID từ output, sau đó:
eas submit -p ios --profile production --id <build-id>
```

```powershell
# Android production
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform android --profile production
eas submit -p android --profile production --id <build-id>
```

### Bước 3: App Store Connect "What's New" (English required)

```text
Adds 10 new practical-life guides for Vietnamese residents in Japan,
covering medical access (clinic visits, emergency calls, dental care),
disaster preparedness (earthquake, typhoon, hazard maps), and daily
utility setup (electricity/gas/water, internet, NHK door visits, post
office). Expanded search keywords for panic-search behavior. Added 76
practical Japanese counter phrases. No UI changes.
```

---

## QA execution log

Ghi note nhanh khi test:

```
[YYYY-MM-DD HH:MM] iOS / Android | Section X | Result | Note
[YYYY-MM-DD HH:MM] ...
```

Nếu phát hiện bug — mở GitHub issue mới (hoặc thêm vào `docs/native-legal-review-pending-a1-a3.md` nếu là wording issue), không tự ý sửa code trong khi đang QA.
