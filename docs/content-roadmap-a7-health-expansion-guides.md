# Content backlog — Batch A7: Health expansion

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Batch:** A7 — Health expansion (P0 mental-health + Additional 43/44/45)
**Branch:** `feature/post-v1.3.2-content` (NOT main)

---

## Guides added

| # | id | title | category |
|---|---|---|---|
| 1 | `mental-health-stress-support` | Sức khỏe tâm thần — stress, lo âu, hotline hỗ trợ | health |
| 2 | `medical-interpretation-multilingual-hospitals` | Bệnh viện có phiên dịch + hỗ trợ đa ngôn ngữ | health |
| 3 | `holiday-night-medical-care` | Khám bệnh đêm / cuối tuần / ngày lễ | health |
| 4 | `pharmacy-prescription-guide` | Nhà thuốc + toa thuốc + cách nhận thuốc ở Nhật | health |

## ADMIN_GUIDES count

- Before A7 (sau A6): **99**
- After A7: **103** (+4)

## Counter phrases per guide

| Guide | Count |
|---|---|
| `mental-health-stress-support` | 8 |
| `medical-interpretation-multilingual-hospitals` | 7 |
| `holiday-night-medical-care` | 7 |
| `pharmacy-prescription-guide` | 8 |

**Tổng 30 câu mới.**

## Source status

| Guide | Sources | Risk |
|---|---|---|
| `mental-health-stress-support` | 厚生労働省 | **HIGH** — disclaimer mạnh, hotline verify (いのちの電話 0570-783-556, よりそい 0120-279-338) |
| `medical-interpretation-multilingual-hospitals` | 厚生労働省 | low — AMDA Tokyo/Osaka số có ghi |
| `holiday-night-medical-care` | 総務省消防庁 | medium — 119/#7119/#8000 hedge "tùy 都道府県" |
| `pharmacy-prescription-guide` | 厚生労働省 | low — 処方箋 4 ngày + お薬手帳 stable info |

Tất cả homepage level. KHÔNG bịa số / địa chỉ cụ thể.

## Hedge wording đặc biệt — A7

### `mental-health-stress-support`
- **Disclaimer mạnh** trong description: "Đây không phải tư vấn y tế cá nhân — bệnh nặng cần bác sĩ chuyên môn".
- Risk level: **HIGH**.
- Section "Khẩn cấp" cảnh báo gọi 119 / hotline NGAY khi nghĩ tự hại.
- KHÔNG khuyến khích self-diagnosis. Direct user đến 心療内科 / 精神科.
- Hotlines verify: いのちの電話 (一般社団法人 日本いのちの電話連盟), よりそいホットライン (Social Inclusion Support Center).

### `medical-interpretation-multilingual-hospitals`
- AMDA số: 03-6233-9266 (Tokyo) / 06-4395-0555 (Osaka) — public knowledge, có thể verify trên trang AMDA.
- Hedge "coverage tiếng Việt theo lịch — không phải 24/7".
- KHÔNG khuyến khích nhờ trẻ em làm thông dịch.

### `holiday-night-medical-care`
- 救急車 fee: hedge "hiện đang miễn phí toàn quốc, một số tỉnh thí điểm thu phí" — đúng theo memory về Mie.
- #7119/#8000: hedge "tùy 都道府県" — đúng.
- 4 cấp xử lý rõ: 119 / 救急外来 / 夜間休日診療所 / hotline.

### `pharmacy-prescription-guide`
- 処方箋 hạn 4 ngày: stable theo 薬剤師法.
- OTC 第1類/第2類/第3類: phân loại chuẩn 薬機法.
- Mang thuốc về VN: hedge "kiểm tra với hải quan VN", direct user kiểm tra customs.

## Items needing native / legal review

(Sẽ gom vào consolidated review doc khi cần.)

1. Mental health hotline tone — confirm ngôn ngữ tiếng Việt có hỗ trợ thực tế thế nào.
2. AMDA tiếng Việt schedule — confirm với trang AMDA.
3. #7119/#8000 coverage list từng 都道府県 — content lead verify.
4. 救急車 fee policy 2024–2026 — re-verify trước nextReviewAt.
5. お薬手帳プラス app — verify còn hoạt động.

## Verification

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ PASS |
| `npm run test:ci` | ✅ PASS — 251/251 |
| `npm run verify:content` | ✅ PASS |
| `npm run verify` (full chain) | ✅ PASS |

## Out of scope

- KHÔNG khuyến khích self-diagnosis tâm thần.
- KHÔNG khuyến nghị thuốc cụ thể nào.
- KHÔNG bịa số điện thoại / địa chỉ.
- KHÔNG ship trên main — đang ở `feature/post-v1.3.2-content`.

## Release context

- main giữ nguyên ở v1.3.2 (90 guide).
- `feature/post-v1.3.2-content` có A4–A7 = 13 guide bổ sung. Tổng 103 guide.
- Khi sẵn sàng release: merge feature → main + cut tag mới (v1.3.3 hoặc v1.4.0).
