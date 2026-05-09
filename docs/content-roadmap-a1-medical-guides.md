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

---

## QA review pass — 2026-05-09 (commit follow-up)

Sau khi commit `f2912de`, làm pass review nội bộ trên 3 guide. Sửa nội dung tone + an toàn pháp lý, **không** thay schema, **không** đổi UI, **không** đổi version/tag.

### Tóm tắt sửa

| Guide | Thay đổi | Lý do |
|---|---|---|
| `emergency-calls-japan` | `description`: "tổng đài thường có cách kết nối thông dịch" → "Tổng đài 119/110 có thể kết nối thông dịch ở nhiều khu vực — không phải toàn quốc." | Giảm overclaim — interpreter không phải mọi tỉnh đều có |
| `emergency-calls-japan` | `救急車をお願いします` VN: "Làm ơn gọi xe cấp cứu" → "Tôi cần xe cấp cứu" | Trong panic-state, "Làm ơn gọi" hơi xa vời / lễ phép. "Tôi cần" trực tiếp + tự nhiên hơn cho người Việt đang gọi 119 |
| `emergency-calls-japan` | `警察をお願いします` VN: "Làm ơn gọi cảnh sát" → "Tôi cần cảnh sát" | Cùng lý do trên |
| `emergency-calls-japan` | `ベトナム語の通訳をお願いします` VN: "Làm ơn cho tôi phiên dịch tiếng Việt" → "Cho tôi phiên dịch tiếng Việt" + note thêm "Một số khu có dịch vụ thông dịch 3 bên — không phải toàn quốc." | Tone bớt xa, note tránh overclaim |
| 3 guides | Tất cả nơi nhắc "保険証 hoặc マイナンバーカード" → "保険証 / マイナンバーカード / 資格確認書" + ghi rõ "bất kỳ thẻ nào chứng minh tư cách bảo hiểm" | Phản ánh thực tế post-2024 khi 紙の保険証 đang dần được thay thế. KHÔNG nói chính sách deadline cụ thể (vì còn đang đổi) — chỉ liệt kê 3 dạng thẻ hợp lệ |
| `dentist-visit-japan` | `fees`: số yên cụ thể cho implant / niềng răng → bỏ con số chính xác, giữ "thường là 100% tự trả, hỏi 見積書 từ ≥2 phòng nha" | Tránh ghi chi phí cố định cho 自費 vì biên độ rộng và thay đổi nhanh theo phòng nha |
| `dentist-visit-japan` | `fees`: "30% chi phí. Lần khám đầu tiên + chụp X-quang thường 2,000–5,000円" → "thường khoảng" + lead bằng disclaimer "Số tiền dưới đây chỉ là tham khảo — phí thực tế thay đổi tùy phòng nha và khu vực" | Hedge mạnh hơn |
| `dentist-visit-japan` | FAQ "Phòng nha bảo tôi cần làm インプラント mất 50万円" → bỏ "50万円" cụ thể | Cùng lý do — không bịa số chốt |
| `dentist-visit-japan` | FAQ trẻ em: "Nếu khu có chương trình 子ども医療費助成 (hỗ trợ y tế trẻ em), nhiều trường hợp trẻ không phải trả tiền" → "Một số khu có chương trình ... — điều kiện và mức hỗ trợ tùy 市区町村, hỏi 市役所 trước" | Trợ cấp này tùy 市区町村 — không generalize |
| `clinic-hospital-visit-guide` | Step 5 thanh toán nhà thuốc: "(cũng được bảo hiểm 30%)" → "cũng thường được bảo hiểm chi trả ~70%, phần bệnh nhân trả là ~30%" | Diễn đạt đúng hơn — bảo hiểm chi 70%, không phải bệnh nhân trả 30% là "được bảo hiểm 30%" |
| `clinic-hospital-visit-guide` | FAQ "Tôi không có 保険証": cập nhật để nói cả 健康保険被保険者資格証明書 và 資格確認書 + nói rõ thời gian đăng ký 国保 mất ~1–2 tuần | Cụ thể hơn cho người mới sang |

### Kết luận từng guide

#### 1. clinic-hospital-visit-guide — PASS sau sửa
- Phân biệt クリニック / 病院 / cấp cứu rõ. (Step 1 / whoIsThisFor / quickAction).
- 紹介状 + 選定療養費 đã nhắc, không bịa số phụ phí.
- Chi phí dùng "thường", "khoảng", "có thể" đầy đủ.
- 保険証 / マイナンバーカード / 資格確認書 wording an toàn — không claim deadline policy.
- Counter phrases 8 câu — natural, đã qua review nội bộ.

Câu cần native review (không sửa, ghi nhận):
- `予約していませんが、診てもらえますか。` — natural ở クリニック không quá đông; với clinic đông có thể hơi presumptuous. Native confirm nếu cần đổi sang `今、診てもらえますか?` hoặc `飛び込みでも大丈夫ですか?`.
- `費用はどのくらいかかりますか。` — natural và an toàn. Một số dùng `いくらくらいですか` ngắn hơn.
- `ベトナム語の通訳はありますか。` — natural và đúng phong cách quầy 受付. OK.

#### 2. emergency-calls-japan — PASS sau sửa
- 119 (cứu thương + cứu hỏa) / 110 (cảnh sát) đúng. Phân biệt bằng Step 1 + quickAction.
- #7119 / #9110: legalScope ghi rõ "tùy khu vực — không phải tỉnh nào cũng có". Step 1 tip lặp lại. Description sau sửa ghi rõ "không phải toàn quốc".
- Counter phrases 9 câu — VN translations đã chỉnh trực tiếp/tự nhiên hơn.
- 救急車 fee policy: hedge "hiện đang miễn phí toàn quốc... một số tỉnh đã thí điểm thu phí" — không claim chắc.
- Address priority: ✓ (Step 3 ghi 住所 là câu hỏi đầu).
- Không cúp máy: ✓ (Step 4 + doNow lặp lại).

Câu cần native review:
- `救急車をお願いします` — JP wording chuẩn. VN sửa thành "Tôi cần xe cấp cứu" — natural cho panic.
- `意識がありません` — JP đúng. Có thể bổ sung biến thể `意識を失っています` (mạnh hơn). Native confirm nếu nên có cả 2.
- `日本語があまり話せません` — natural và phổ biến.
- `ベトナム語の通訳をお願いします` — JP chuẩn. Note hedged. OK.

#### 3. dentist-visit-japan — PASS sau sửa
- Bảo hiểm phần "thường có thể dùng cho điều trị cần thiết" → wording an toàn ✓.
- Điều trị thẩm mỹ: ghi "thường KHÔNG được bảo hiểm" ✓.
- Khuyên hỏi chi phí trước: ✓ ngay description + commonMistakes + 2 FAQ + Step 4 tip.
- Yen ranges đã giảm specific cho 自費 (implant/niềng răng) sau sửa.
- 資格確認書: thêm vào bring + checklist + steps.
- Counter phrases 7 câu — natural, không thay.

Câu cần native review:
- `保険は使えますか` — natural và phổ biến ở quầy nha. OK.
- `今日、治療できますか` — natural; có thể native suggest `今日中に処置できますか` formal hơn nhưng câu hiện tại OK.
- `痛み止めはもらえますか` — natural, polite. OK.

---

## Source status — final

| Guide | Sources hiện có | Mức tin cậy | Notes |
|---|---|---|---|
| `clinic-hospital-visit-guide` | mhlw.go.jp homepage, med.or.jp homepage | **HOMEPAGE LEVEL** | Source general — chưa phải deep-link xác minh từng chi tiết. Specific facts (紹介状 / 選定療養費 / 保険 30% / clinic vs hospital) đều dùng wording chung của hệ thống y tế Nhật, không bịa số mới. |
| `emergency-calls-japan` | fdma.go.jp homepage, npa.go.jp homepage | **HOMEPAGE LEVEL** | 119/110 là kiến thức phổ thông xác nhận được từ hai homepage. Mọi điểm khác (#7119/#9110/救急車 fee/通訳) hedged "tùy khu vực" / "có thể" / "không phải toàn quốc". |
| `dentist-visit-japan` | mhlw.go.jp homepage, jda.or.jp homepage | **HOMEPAGE LEVEL** | Sources general. Mọi yen cho 自費 đã bỏ specific số chốt. 子ども医療費助成 hedged "tùy 市区町村". 救急歯科 hedged "ở một số khu". |

**KHÔNG nâng status lên "confirmed" cho bất kỳ deep-link nào.** Các điểm sau vẫn `NEEDS_OFFICIAL_SOURCE_CHECK` và content lead phải verify trước khi update officialLinks lên trang con cụ thể:

- `#7119` deep-link
- `#9110` deep-link
- 救急車 fee policy (chính sách đang đổi 2024–2026)
- 選定療養費 (số tiền chuẩn theo MHLW)
- 子ども医療費助成 (theo 市区町村)
- 休日歯科診療 (theo 都道府県 歯科医師会)
- 保険証 → マイナンバーカード timeline (chính sách đang triển khai)
- 領収書 → 医療費控除 ngưỡng 100,000円/năm (xác minh trên 国税庁 mỗi năm)

---

## Device QA checklist

Để tester mở app trên điện thoại thật (iOS + Android nếu có) và check theo thứ tự:

### `clinic-hospital-visit-guide`
- [ ] Mở guide từ Admin tab.
- [ ] Hero image (`ag_kensin_hero.jpg`) render đúng, không vỡ.
- [ ] heroImageCaption hiển thị dưới hero.
- [ ] quickAction section render: deadline, office, doNow (5 bullet), bring (5 line), ifLate, officialSourceLabels.
- [ ] counterPhrases hiển thị đủ **8** câu — đọc sang phải / dọc đầy đủ jp + romaji + vn + note.
- [ ] Tap nút copy ở 1 câu — clipboard có nội dung jp.
- [ ] Steps render đủ 6 bước, đánh số đúng 1–6.
- [ ] FAQ render đủ 5 câu hỏi.
- [ ] documentsChecklist render — cả 6 row, "Bắt buộc" / "Không bắt buộc" rõ.

### `emergency-calls-japan`
- [ ] Mở guide từ Admin tab.
- [ ] Guide không có hero — kiểm tra layout vẫn cân đối, không khoảng trắng lớn ở đầu.
- [ ] Scroll dài: từ description → quickAction → 5 list (whoFor/when/where/...) → fees → checklist → mistakes → FAQ → counterPhrases → officialLinks → 5 steps. Mượt, không lag, không cắt.
- [ ] Các số `119`, `110`, `#7119`, `#9110` không bị format lỗi (không bị tách thành thẻ điện thoại auto-link sai).
- [ ] counterPhrases đủ **9** câu, jp/romaji/vn/note rõ.
- [ ] Copy 1 câu jp — clipboard đúng.
- [ ] FAQ trẻ em / không nhớ địa chỉ / interpreter render đủ.

### `dentist-visit-japan`
- [ ] Mở guide từ Admin tab.
- [ ] Guide không có hero — layout OK.
- [ ] counterPhrases đủ **7** câu.
- [ ] Copy 1 câu jp — clipboard đúng.
- [ ] FAQ 5 câu render đủ; FAQ implant không còn số "50万円".
- [ ] fees render — đọc thấy rõ disclaimer "tham khảo".

### Cross-cut search QA
- [ ] Mở Search tab. Gõ "đau răng" → kết quả có `dentist-visit-japan`.
- [ ] Gõ "cấp cứu" → kết quả có `emergency-calls-japan`.
- [ ] Gõ "đi khám bệnh" → kết quả có `clinic-hospital-visit-guide`.
- [ ] Gõ "119" → kết quả có `emergency-calls-japan`.
- [ ] Gõ "保険証" → kết quả có cả 3 guide mới (vì đều có trong searchKeywords / nội dung).
- [ ] Gõ "歯医者" → kết quả có `dentist-visit-japan`.
- [ ] Gõ "クリニック" → kết quả có `clinic-hospital-visit-guide`.

### iOS-specific
- [ ] Long-press 1 đoạn jp trong description hoặc step → context menu copy / chia sẻ hoạt động.
- [ ] Dynamic Type (settings → Display & Text Size lên cỡ XXL) — guide vẫn đọc được, không cắt ngang chữ.

### Android-specific
- [ ] Back button hardware → quay lại đúng AdminScreen / Search list.
- [ ] Long-press copy 1 đoạn jp — dán được vào app khác (notes / dịch).

---

## Outstanding native / user review

(Không sửa trong pass này, ghi vào danh sách chờ.)

1. `予約していませんが、診てもらえますか。` — native confirm có natural ở mọi loại クリニック không, hay nên đổi sang `飛び込みでも大丈夫ですか?` cho phòng đông.
2. `意識がありません` ↔ `意識を失っています` — có nên có cả 2 biến thể trong counterPhrases không?
3. Counter phrases note dài — review xem trên app render có bị wrap xấu không (Device QA).
4. Số tiền tham khảo nha khoa (1,500–4,000円, 5,000–15,000円) — native dentist (nếu có liên hệ) confirm có realistic 2026 không.
5. 救急車 fee policy — re-verify trước `nextReviewAt: 2026-12-01`.
6. Chương trình 子ども医療費助成 — content lead nên có sub-guide riêng tổng quan các 市区町村 chính (tokyo, osaka, nagoya, fukuoka...) sau này — không thuộc batch A1.

---

## Verification sau pass review

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run test:ci` | PASS — **251/251 tests** |
| `npm run verify:content` | PASS — 0 issues |

Không có test mới fail / regress.

---

## Next batches (trong Issue #3, không thuộc PR này)

Theo `docs/content_roadmap_2026.md`, các batch tiếp theo gợi ý:

- A2: pharmacy / OTC drugs / 薬局 deep dive
- A3: pediatric care / 小児科 + 母子手帳 advanced
- B1: police encounter rights (panic-level 5)
- B2: urgent bill notice / 督促 / 差押 (panic-level 5)

Content lead chốt thứ tự + prioritize trước khi mở batch mới.
