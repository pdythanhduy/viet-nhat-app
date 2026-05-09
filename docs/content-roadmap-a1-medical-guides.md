# Issue #3 — Batch A1: Medical access essentials

**Date:** 2026-05-09
**Issue:** #3 (Content roadmap: add missing high-value guides after 80-guide release)
**Batch:** A1 — Medical access essentials
**Scope:** chỉ thêm 3 guide mới. Không sửa UI, không bump version, không thêm asset mới.

---

## Guides added

| # | id | title | titleJp | category | priority |
|---|---|---|---|---|---|
| 1 | `clinic-hospital-visit-guide` | Cách đi khám bệnh ở Nhật | 日本で病院・クリニックに行くとき | health | normal |
| 2 | `emergency-calls-japan` | Gọi cấp cứu, cảnh sát ở Nhật | 日本で緊急電話をかけるとき | health | normal |
| 3 | `dentist-visit-japan` | Đi nha khoa ở Nhật | 日本で歯医者に行くとき | health | normal |

## Files created

```
src/constants/content/adminGuides/guides/clinic-hospital-visit-guide.ts
src/constants/content/adminGuides/guides/emergency-calls-japan.ts
src/constants/content/adminGuides/guides/dentist-visit-japan.ts
docs/content-roadmap-a1-medical-guides.md
```

## Files modified

```
src/constants/content/adminGuides/guides/index.ts   (3 imports + 3 array entries)
```

## ADMIN_GUIDES count

- Before: **80**
- After: **83** (+3)

## Hero images reused

| Guide | Hero image | Asset path | Already used by |
|---|---|---|---|
| `clinic-hospital-visit-guide` | reused | `assets/content/daily-life/ag_kensin_hero.jpg` | `annual-health-checkup-kensin` |
| `emergency-calls-japan` | none | — | (no fitting existing asset) |
| `dentist-visit-japan` | none | — | (no fitting existing asset) |

Không thêm asset mới. `kensin_hero` thematically đúng cho khám clinic/bệnh viện thường (cùng cảnh quầy 受付 + 保険証).

## Search keywords added

| Guide | Keyword count | Keywords |
|---|---|---|
| `clinic-hospital-visit-guide` | 13 | đi khám bệnh, bệnh viện Nhật, phòng khám Nhật, khám bệnh ở Nhật, bảo hiểm y tế, thuốc, nhà thuốc, bị sốt, đau đầu, 病院, クリニック, 保険証, お薬手帳 |
| `emergency-calls-japan` | 14 | cấp cứu, gọi cứu thương, gọi cảnh sát, xe cứu thương, 119, 110, 7119, 9110, tai nạn, cháy, 救急車, 警察, 火事, 事故 |
| `dentist-visit-japan` | 11 | nha khoa, đau răng, răng đau, đi nha sĩ, bảo hiểm nha khoa, trám răng, sâu răng, 歯医者, 歯科, 歯が痛い, 虫歯 |

## Counter phrases per guide

| Guide | Count |
|---|---|
| `clinic-hospital-visit-guide` | 8 |
| `emergency-calls-japan` | 9 |
| `dentist-visit-japan` | 7 |

Tất cả đều có jp / romaji / vn + note.

## Source status per guide

| Guide | officialLinks | Status |
|---|---|---|
| `clinic-hospital-visit-guide` | 厚生労働省 (MHLW) homepage, 日本医師会 homepage | OK — homepages chính thức |
| `emergency-calls-japan` | 総務省消防庁 (FDMA) homepage, 警察庁 (NPA) homepage | OK — homepages chính thức |
| `dentist-visit-japan` | 厚生労働省 (MHLW) homepage, 日本歯科医師会 (JDA) homepage | OK — homepages chính thức |

Tất cả URL là **homepage cấp cao** của cơ quan có thẩm quyền — ít rủi ro broken/đổi đường dẫn. KHÔNG bịa deep-link.

### NEEDS_OFFICIAL_SOURCE_CHECK (chưa link nhưng có nhắc trong nội dung)

Các điểm dưới đây content lead nên verify trước khi thêm deep-link cụ thể vào `officialLinks`:

1. **#7119 (tư vấn y tế ngoài giờ)** — chỉ một số 都道府県 / 市 có. Nội dung guide ghi rõ "tùy khu vực, không phải toàn quốc". Cần link đến trang FDMA (`fdma.go.jp/mission/enrichment/qq/qq_sharp7119.html`) sau khi verify URL còn sống.
2. **#9110 (cảnh sát tư vấn không khẩn cấp)** — đề cập trong searchKeywords nhưng KHÔNG đưa link vì chưa verify URL chính xác. Cần content lead xác nhận.
3. **救急車 phí** — guide ghi "hiện đang miễn phí toàn quốc, một số tỉnh đã thí điểm thu phí". Đây là policy đang đổi 2024–2026. Re-verify vào `nextReviewAt: 2026-12-01`.
4. **選定療養費 (phụ phí 病院 lớn không có 紹介状)** — guide nhắc nhưng không cho con số cụ thể. Số tiền chuẩn tùy bệnh viện và đang được MHLW điều chỉnh; tránh ghi cố định.
5. **子ども医療費助成** — đề cập trong FAQ nha khoa cho trẻ em. Mức và điều kiện tùy 市町村. Không bịa số.
6. **休日歯科診療所 / 救急歯科** — đề cập trong FAQ nhưng không link vì lịch tùy 都道府県 + 歯科医師会 địa phương. User cần tự tra theo khu vực.

Tất cả nội dung chi phí dùng "thường", "khoảng", "tùy" — không bịa số chính xác.

## Items needing user/native review

1. **Counter phrases** — 7–9 câu/guide. Native review nên kiểm:
   - "予約していませんが、診てもらえますか" — natural?
   - "意識がありません" — phù hợp gọi 119?
   - "費用はどのくらいかかりますか" vs "いくらくらいですか" — chỗ nào dùng nào?
2. **Cảm xúc panic** — emergency-calls cần test với người mới sang Nhật chưa từng gọi 119. Đo: thời gian từ "mở guide" → "biết câu đầu tiên cần nói".
3. **Hospital wording** — có nên thêm phrase "意識を失った" (đã mất ý thức) bên cạnh "意識がありません" (không còn ý thức)?
4. **Dentist pricing** — số tiền (1,500–4,000円 trám, 5,000–15,000円 lấy tủy, 50,000–150,000円 sứ, 300,000–500,000円 implant) là phổ biến nhưng tùy phòng nha. Native dentist review nếu có.
5. **Trẻ em ở 119** — phần FAQ "trẻ con có gọi 119 được không" cần kiểm: hướng dẫn có quá đơn giản hóa với phụ huynh không? Có cần link đến official guide cho trẻ em không?
6. **Khu vực có #7119** — list 都道府県 hỗ trợ thay đổi. Hiện guide không list cụ thể, chỉ nói "tùy khu vực". Có thể cải thiện sau khi content lead verify.

## Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run test:ci` | PASS — **251/251 tests** |
| `npm run verify:content` | PASS — 0 files with issues, 0 suspicious lines |

### Test fix during work

- Lần đầu chạy: 1 test fail — `keeps legal scope and quick action metadata complete when present` đòi `quickAction.officialSourceLabels` exact-match `officialLinks[].label`. Đã sửa: align label trong `officialSourceLabels` cho đúng từng chữ với `officialLinks` trong cả 3 guide. Không ảnh hưởng nội dung user-facing.

## Style notes (tuân thủ)

- Action-first: bước 1 luôn là "xác định tình huống" (cấp cứu? đặt hẹn? định kỳ?), không bắt đầu bằng định nghĩa.
- Tone tự nhiên: dùng "có thể", "thường", "tùy phòng khám", "tùy khu vực", "hãy hỏi trước".
- Không khẳng định fact y tế / pháp lý / chi phí khi không có source.
- Không dùng từ Hán-Việt cứng (vd "thẻ y tế công cộng quốc gia") — dùng "thẻ bảo hiểm", "保険証".
- Mỗi guide có đoạn "không phải bạn nếu..." trong `whoIsThisFor` để tránh user lạc guide.

## Out of scope (đúng theo issue)

- Không thêm guide thứ 4.
- Không sửa UI / build config / version / tag.
- Không thêm policy-sensitive 2026 guide.
- Không bịa fact / URL.
- Không add image asset mới.
- Không rewrite guide cũ.

## Next batches (trong Issue #3, không thuộc PR này)

Theo `docs/content_roadmap_2026.md`, các batch tiếp theo gợi ý:

- A2: pharmacy / OTC drugs / 薬局 deep dive
- A3: pediatric care / 小児科 + 母子手帳 advanced
- B1: police encounter rights (panic-level 5)
- B2: urgent bill notice / 督促 / 差押 (panic-level 5)

Content lead chốt thứ tự + prioritize trước khi mở batch mới.
