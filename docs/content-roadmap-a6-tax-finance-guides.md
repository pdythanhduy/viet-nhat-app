# Content backlog — Batch A6: Tax / finance expansion

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Batch:** A6 — Tax / finance expansion (P1 — Important / high-value)
**Scope:** 3 guide mới, category `money`. Hedge mạnh — đặc biệt cho tax/finance.

---

## Guides added

| # | id | title | category |
|---|---|---|---|
| 1 | `furusato-nozei-guide` | Furusato Nouzei (ふるさと納税) | money |
| 2 | `ideco-personal-pension` | iDeCo (lương hưu cá nhân) — lợi ích thuế | money |
| 3 | `tax-on-remittance-to-vietnam` | Gửi tiền về Việt Nam — thuế và quy định | money |

## ADMIN_GUIDES count

- Before A6 (sau A5): **96**
- After A6: **99** (+3)

## Counter phrases per guide

| Guide | Count |
|---|---|
| `furusato-nozei-guide` | 7 |
| `ideco-personal-pension` | 8 |
| `tax-on-remittance-to-vietnam` | 8 |

**Tổng 23 câu mới.**

## Source status

| Guide | Sources |
|---|---|
| `furusato-nozei-guide` | 総務省 (soumu.go.jp), 国税庁 (nta.go.jp) |
| `ideco-personal-pension` | 国民年金基金連合会 (nenkin.go.jp), 厚生労働省 (mhlw.go.jp) |
| `tax-on-remittance-to-vietnam` | 国税庁 (nta.go.jp), 財務省 (mof.go.jp) |

Tất cả homepage level. KHÔNG bịa deep-link.

## Hedge wording — đặc biệt mạnh cho A6

### `furusato-nozei-guide`
- **KHÔNG đưa số 控除限度額 cụ thể** — chỉ direct user dùng simulator. "Range thông thường cho thu nhập 400万円 + family-of-4 thường từ 30,000–60,000円/năm" — đã hedge "thường", "nhưng KIỂM TRA simulator vì có thể khác".
- Quy tắc 自己負担 2,000円 + 控除限度額 stable — claim này verify được.
- **NEEDS_OFFICIAL_SOURCE_CHECK**: deep-link 総務省 + simulator official.

### `ideco-personal-pension`
- **risk level: HIGH** — đầu tư có rủi ro thua lỗ + tiền KHÔNG rút được đến 60 tuổi.
- Hedge mạnh: "Đầu tư có rủi ro mất vốn — KHÔNG đảm bảo lãi" trong description + legalScope.
- **KHÔNG đưa khuyến nghị đầu tư cụ thể** — chỉ nguyên tắc chung + direct user đến 金融アドバイザー.
- 限度額 đóng có cải cách 2024–2026 — hedge "đang đổi" + direct user kiểm tra.
- **NEEDS_OFFICIAL_SOURCE_CHECK**:
  - Phí mở 2,829円 + phí quản lý 171円/tháng (国民年金基金連合会)
  - 限度額 cụ thể từng nhóm công việc 2026
  - Quy định khi rời Nhật (脱退一時金 cho iDeCo)

### `tax-on-remittance-to-vietnam` — risk level HIGH (cross-border)
- Phía Nhật: 100万円ルール + 国際送金等支払調書 — verify được.
- Phía Việt Nam: KHÔNG generalize quy định thuế VN. Đẩy về luật sư VN cho trường hợp cụ thể.
- Hiệp định tránh đánh thuế 2 lần Nhật–Việt 1995 — mention nhưng KHÔNG dẫn điều luật cụ thể.
- **Scam warning** trong commonMistakes + Step 6 — "国税庁/財務省 KHÔNG dùng SMS/LINE/call đòi tiền".
- **NEEDS_OFFICIAL_SOURCE_CHECK**:
  - 100万円ルール chi tiết (国際送金等支払調書 ngưỡng exact)
  - 出国税 áp dụng cho ai (チェック với 国税庁)
  - Quy định ngân hàng VN nhận tiền lớn

## Items needing native / legal review

⚠️ **A6 HIGH PRIORITY cho 税理士 review trước khi user dựa vào:**

1. `tax-on-remittance-to-vietnam` toàn bộ — cross-border tax sensitive. Cần 税理士 chuyên về quốc tế + (idealy) luật sư VN review.
2. `ideco-personal-pension` đoạn về rời Nhật — quy trình 脱退一時金 iDeCo phức tạp, hỏi 国民年金基金連合会.
3. `furusato-nozei-guide` simulator references — verify simulator hiện tại (Rakuten / Satofull) còn accurate 2026.

## Verification

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ PASS |
| `npm run test:ci` | ✅ PASS — 251/251 tests |
| `npm run verify:content` | ✅ PASS |
| `npm run verify` (full chain) | ✅ PASS |

## Out of scope

- Không tư vấn đầu tư cá nhân.
- Không khuyến nghị 金融機関 cụ thể (chỉ list options).
- Không đưa số mức tiền cố định cho 控除限度額 / 限度額 đóng / phí 出国税.
- Không generalize quy định thuế VN.
- Không khuyến khích kênh gửi tiền không chính thức.

## Release context

- v1.3.2 đang chờ Apple Review.
- A4 + A5 + A6 = 9 guide mới chưa ship. Sẽ vào release tiếp theo (v1.3.3 hoặc v1.4.0).
