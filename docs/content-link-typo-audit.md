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

**Status:** BROKEN_OR_WRONG_LINK
- Title + summary: ✅ FIXED (giữ phiên bản đã sửa).
- URL: ❌ **bị lỗi / không khớp nội dung** (đã user-verified 2026-05-09).

**Title/summary fix reason:**
- Title cũ "nghĩa vụ chống say nắng" → cứng, hơi tối nghĩa với người Việt. "Nghĩa vụ" có sắc thái pháp lý gò bó, "chống" như đang đối kháng. Sửa thành "Phòng tránh sốc nhiệt" rõ ràng hơn.
- Term "say nắng" → "sốc nhiệt" để đồng bộ với phần còn lại của app (`words.ts` đã định nghĩa 熱中症 = "Sốc nhiệt"; `dailyLife/topics/japan-seasons-weather.ts` cũng dùng "sốc nhiệt").
- Thêm `(熱中症)` để user có thể tra hoặc nói khi cần.
- "Doanh nghiệp" → "Công ty" — Việt thường dùng hơn.
- "trong lao động" → "khi làm việc" — tự nhiên hơn.

**Action taken in repo:**
- ✅ FIXED title + summary trong `jobs.ts` (commit `bae8a32`).
- ❌ **URL `https://www.mhlw.go.jp/stf/newpage_47683.html` VẪN ĐANG TRONG `jobs.ts`** — chưa thay vì không có nguồn chính thức MHLW thay thế đã verified. **Đây là release-blocker cho v1.3.0 production build.**

**Action needed before next production build — Needs replacement official MHLW URL:**

1. Search trên `mhlw.go.jp` các từ khoá: `熱中症 職場`, `熱中症 義務化 2025`, `職場における熱中症`, `労働 熱中症 ガイドライン`.
2. Khả năng cao link đúng nằm ở 1 trong các phần sau của site MHLW:
   - `https://www.mhlw.go.jp/` (homepage → search nội bộ)
   - `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/anzen/...` (mục an toàn lao động — 労働基準)
   - Trang riêng về 熱中症 (cập nhật 2025) thuộc nhóm 安全衛生 (an toàn vệ sinh lao động)
3. **Quy tắc thay URL:**
   - ✅ Chỉ chấp nhận domain `mhlw.go.jp` (bao gồm subdomain).
   - ✅ Trang phải **trực tiếp nói về 熱中症 tại nơi làm việc** (không phải trang tổng hợp luật lao động chung).
   - ✅ Trang phải có thông tin về quy định **2025-06-01** hoặc cập nhật mới hơn nếu MHLW đã refresh.
   - ❌ KHÔNG dùng blog tiếng Việt, news Vietnamese, social media, hay third-party site.
   - ❌ KHÔNG dùng URL từ search engine cache.
4. Khi tìm được URL đúng → update `src/constants/content/jobs.ts` line 192, commit, verify, retag (hoặc cut `v1.3.1`).

**Tạm thời (nếu cần ship gấp v1.3.0 mà chưa tìm được URL):**
- Lựa chọn 1: Xóa field `url` khỏi item này — `jobs.ts` schema cần check xem `url` có optional không.
- Lựa chọn 2: Thay tạm bằng MHLW homepage `https://www.mhlw.go.jp/` — vẫn là domain chính thức nhưng generic; user phải tự search bên trong.
- Lựa chọn 3 (recommended): Hold v1.3.0 production until reviewer tìm được link đúng. Title/summary đã sửa nên alert hiển thị vẫn hợp lý; URL bị broken nhưng user click vào sẽ thấy 404 từ trang MHLW — không gây hiểu nhầm pháp lý nghiêm trọng.

#### Item khác?

Search toàn repo không thấy item nào khác liên quan workplace heatstroke. Chỉ có:
- `dailyLife/topics/japan-seasons-weather.ts` — đề cập 熱中症 trong context thời tiết mùa hè (life advice, không phải labor/workplace). Không cần fix.
- `japanese/phrases/agriculture.ts`, `japanese/words.ts`, `stories/seeds.ts` — vocabulary entries 熱中症. Đã đúng nghĩa "sốc nhiệt".

### Result
- **1 item FIXED (title + summary).**
- **1 URL BROKEN_OR_WRONG_LINK** — user đã verify URL bị lỗi/không khớp nội dung. Cần replacement official MHLW URL trước production build. Chưa tự thay theo nguyên tắc không bịa link.

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
**BROKEN_OR_WRONG_LINK còn lại (release-blocker):** 1 (workplace heatstroke URL — `mhlw.go.jp/stf/newpage_47683.html` — đã user-verified bị lỗi)

## Reviewer action — RELEASE BLOCKER

URL `https://www.mhlw.go.jp/stf/newpage_47683.html` đã được user verify là **bị lỗi / không khớp nội dung** (2026-05-09). URL hiện vẫn nằm trong `src/constants/content/jobs.ts:192` và sẽ ship cùng v1.3.0 production nếu không xử lý.

**Cần làm trước v1.3.0 production build:**

1. Tìm URL chính thức MHLW thay thế:
   - Search keywords: `熱中症 職場`, `熱中症 義務化 2025`, `職場における熱中症`, `労働 熱中症 ガイドライン`.
   - Vị trí khả năng: nhóm 労働基準 / 安全衛生 trên `mhlw.go.jp`.
2. Quy tắc:
   - ✅ Chỉ domain `mhlw.go.jp` (bao gồm subdomain).
   - ✅ Trang phải trực tiếp về 熱中症 tại nơi làm việc, có thông tin quy định 2025-06-01 (hoặc bản cập nhật).
   - ❌ Không blog tiếng Việt / news / third-party.
3. Khi tìm thấy → update `jobs.ts` line 192 → commit → verify → retag hoặc cut `v1.3.1`.

**Hoặc:** quyết định xử lý tạm theo 1 trong 3 lựa chọn ở phần "Tạm thời" trên (xoá field `url`, dùng MHLW homepage tạm, hoặc hold release).
