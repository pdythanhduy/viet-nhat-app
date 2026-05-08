# Content / Link / Typo Audit

Sprint nhỏ rà lỗi chữ, thuật ngữ khó hiểu và link sai trước build.
**Phạm vi:** chỉ audit/fix lỗi text/link rõ ràng. Không thêm feature mới, không rewrite content.

**Date:** 2026-05-09
**Branch:** `main`

---

## 1. Real estate terminology audit (礼金 / reikin)

### Search keywords
`lê kim`, `lễ kim`, `tiền lễ`, `tiền cảm ơn`, `reikin`, `礼金`, `key money`

### Findings

| File | Line | Trước | Sau | Action |
|---|---|---|---|---|
| `src/constants/content/dailyLife/topics/apartment.ts` | 16 | `...lễ kim nếu có...` | `...tiền lễ (礼金 / reikin) nếu có...` | FIXED |
| `src/constants/content/dailyLife/topics/apartment.ts` | 17 | `Nhà ghi "không lễ kim"` | `Nhà ghi "không tiền lễ" (礼金なし)` | FIXED |
| `src/constants/content/dailyLife/topics/apartment.ts` | 22 | `điều kiện đặt cọc và lễ kim` | `điều kiện đặt cọc (敷金) và tiền lễ (礼金)` | FIXED |
| `src/constants/content/adminGuides/guides/renting-and-buying-home.ts` | 33 | `tiền lễ (礼金)` | (không đổi) | OK — đã đúng terminology, dùng làm baseline |
| `src/constants/content/adminGuides/guides/renting-and-buying-home.ts` | 90 | `tiền lễ` | (không đổi) | OK |
| `src/constants/content/adminGuideSearchKeywords.ts` | 198 | `'key money'` | (không đổi) | OK — search alias, hữu ích cho user gõ tiếng Anh |

### Tiêu chuẩn áp dụng

Dùng nhất quán: **`tiền lễ (礼金 / reikin)`** ở lần đầu xuất hiện trong mỗi guide/topic; lần sau có thể rút gọn `tiền lễ`.

Không dùng:
- `lê kim` (sai chính tả)
- `lễ kim` (cứng, không tự nhiên với người Việt)
- `tiền cảm ơn` (mơ hồ)

### Result
- **3 fix áp dụng** trong `apartment.ts`.
- **0 instance còn lại** của "lễ kim" trong source.

---

## 2. "thuê nhà" vs "nhận nhà" usage check

### Findings

Hai cụm này được dùng **đúng và phân biệt** trong toàn bộ content. Không có nhầm lẫn.

| Cụm | Nghĩa | Chỗ dùng |
|---|---|---|
| `thuê nhà` | Hành động thuê, hợp đồng, tiền thuê hàng tháng | "Hợp đồng thuê nhà", "tiền thuê nhà", "賃貸" |
| `nhận nhà` | Ngày dọn vào (move-in day) | "Ngày nhận nhà phải làm ngay" |
| `trả nhà` | Ngày dọn ra (move-out) | "Những lỗi làm mất tiền khi trả nhà" |

Title `apartment.ts` "Thuê nhà và nhận nhà" cố ý cover cả 2 phase — chính xác.

### Result
- **No fix needed.**

---

## 3. Workplace heatstroke link audit

User flag: link/title kiểu `nghĩa vụ chống say nắng tại nơi làm` nghe khó hiểu và có thể link sai.

### Search keywords
`say nắng`, `chống say nắng`, `sốc nhiệt`, `phòng tránh sốc nhiệt`, `nắng nóng`, `nhiệt`, `heatstroke`, `熱中症`, `暑さ`, `workplace`, `labor`, `rousai`, `労働`, `職場`

### Findings

#### Item 1 — Heatstroke alert in Jobs tab

- **File:** `src/constants/content/jobs.ts` (lines 182-193)
- **Screen/tab:** Jobs tab (hiển thị qua `LABOR_ALERTS` array → `JobsScreen`)
- **Item ID:** `heatstroke-workplace`

**Trước:**
```ts
title: 'Nghĩa vụ chống say nắng tại nơi làm việc bị siết chặt'
summary: 'Doanh nghiệp phải có quy trình nhận diện nguy cơ, báo cáo và xử lý nhanh các ca nghi say nắng trong lao động.'
url: 'https://www.mhlw.go.jp/stf/newpage_47683.html'
```

**Sau:**
```ts
title: 'Phòng tránh sốc nhiệt (熱中症) tại nơi làm việc'
summary: 'Công ty phải có quy trình nhận diện nguy cơ, báo cáo và xử lý nhanh các ca nghi sốc nhiệt (熱中症) khi làm việc.'
url: 'https://www.mhlw.go.jp/stf/newpage_47683.html' (KHÔNG đổi)
```

**Status:** TITLE_ONLY_FIX

**Reason:**
- Title cũ "nghĩa vụ chống say nắng" → cứng, hơi tối nghĩa với người Việt. "Nghĩa vụ" có sắc thái pháp lý gò bó, "chống" như đang đối kháng. Sửa thành "Phòng tránh sốc nhiệt" rõ ràng hơn.
- Term "say nắng" → "sốc nhiệt" để đồng bộ với phần còn lại của app (`words.ts` đã định nghĩa 熱中症 = "Sốc nhiệt"; `dailyLife/topics/japan-seasons-weather.ts` cũng dùng "sốc nhiệt").
- Thêm `(熱中症)` để user có thể tra hoặc nói khi cần.
- "Doanh nghiệp" → "Công ty" — Việt thường dùng hơn.
- "trong lao động" → "khi làm việc" — tự nhiên hơn.

**Action taken:**
- ✅ FIXED title + summary (không động URL).

**URL note:** `https://www.mhlw.go.jp/stf/newpage_47683.html` thuộc domain chính thức `mhlw.go.jp` (Bộ Y tế, Lao động và Phúc lợi Nhật Bản). Path `/stf/newpage_*.html` là format trang tin chính thức của MHLW. Không thay link vì trong môi trường audit hiện tại không thể kiểm tra trực tiếp; URL có vẻ hợp lý dựa trên format. Đánh dấu **NEEDS_LINK_CHECK**: cần user/dev mở URL trên trình duyệt và xác nhận:
1. Trang còn live (chưa 404).
2. Nội dung trang là về quy định 熱中症 tại nơi làm việc áp dụng từ 2025-06-01.
3. Trang còn cập nhật (không bị thay thế bởi trang mới của MHLW).

#### Item khác?

Search toàn repo không thấy item nào khác liên quan workplace heatstroke. Chỉ có:
- `dailyLife/topics/japan-seasons-weather.ts` — đề cập 熱中症 trong context thời tiết mùa hè (life advice, không phải labor/workplace). Không cần fix.
- `japanese/phrases/agriculture.ts`, `japanese/words.ts`, `stories/seeds.ts` — vocabulary entries 熱中症. Đã đúng nghĩa "sốc nhiệt".

### Result
- **1 item FIXED (title + summary).**
- **1 URL NEEDS_LINK_CHECK** — chưa thay, chỉ flag để user verify.

---

## 4. Other minor consistency

Các terminology khác đã kiểm tra trong khi search — không cần action:

| Term | Trạng thái |
|---|---|
| `敷金 (shikikin)` / "tiền đặt cọc" | OK — đã được dùng song song nhất quán |
| `家賃 (yachin)` / "tiền nhà" / "tiền thuê" | OK |
| `保証会社` / "công ty bảo lãnh" | OK |
| `不動産 / 不動産会社` / "bất động sản" | OK |

---

## Summary

| Category | Files touched | Fixes |
|---|---|---|
| 礼金 terminology | 1 (`apartment.ts`) | 3 text replacements |
| Heatstroke title/wording | 1 (`jobs.ts`) | 1 item updated (title + summary) |
| Heatstroke URL | 0 | 1 NEEDS_LINK_CHECK flag |
| `thuê nhà` / `nhận nhà` | 0 | No fix needed |

**Tổng số fix áp dụng:** 4 text replacements / 2 files
**NEEDS_LINK_CHECK còn lại:** 1 (workplace heatstroke URL — `mhlw.go.jp/stf/newpage_47683.html`)

## Reviewer action

Reviewer cần làm 1 việc trước khi release v1.3.0 production:

1. Mở `https://www.mhlw.go.jp/stf/newpage_47683.html` trong browser.
2. Xác nhận trang vẫn live, nội dung khớp với 熱中症 / workplace 2025.
3. Nếu trang đã thay đổi/404, tìm URL mới chính thức từ MHLW (search "熱中症 職場 義務化 2025" trên `mhlw.go.jp`).
4. Báo lại để update `jobs.ts` line 192 nếu cần.

Không tự thay link bằng URL không chính thức (blog, news Vietnamese, social media).
