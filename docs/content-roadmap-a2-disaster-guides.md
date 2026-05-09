# Content backlog — Batch A2: Disaster preparedness

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md` (master roadmap thay cho GitHub Issue #5)
**Batch:** A2 — Disaster preparedness
**Scope:** chỉ thêm 3 guide mới. Không sửa UI, không bump version, không thêm asset mới.

---

## Guides added

| # | id | title | titleJp | category | priority |
|---|---|---|---|---|---|
| 1 | `earthquake-preparedness-japan` | Hướng dẫn khi động đất ở Nhật | 日本で地震が起きたとき | daily-law | normal |
| 2 | `typhoon-evacuation-alerts` | Hướng dẫn khi bão / 警戒レベル ở Nhật | 日本で台風・警戒レベルが出たとき | daily-law | normal |
| 3 | `hazard-map-flood-tsunami-volcano` | Bản đồ phòng tai (ハザードマップ) — lũ / sóng thần / núi lửa | ハザードマップで自分の地域のリスクを確認 | daily-law | normal |

Category chọn `daily-law` vì 3 guide thuộc về phòng tai dân sự / civic preparedness, không phải y tế / visa / thuế / giao thông.

## Files created

```
src/constants/content/adminGuides/guides/earthquake-preparedness-japan.ts
src/constants/content/adminGuides/guides/typhoon-evacuation-alerts.ts
src/constants/content/adminGuides/guides/hazard-map-flood-tsunami-volcano.ts
docs/content-roadmap-a2-disaster-guides.md
```

## Files modified

```
src/constants/content/adminGuides/guides/index.ts   (3 imports + 3 array entries)
```

## ADMIN_GUIDES count

- Before A2 (sau A1): **83**
- After A2: **86** (+3)

## Hero images reused

| Guide | Hero image | Notes |
|---|---|---|
| `earthquake-preparedness-japan` | none | Không có asset `ag_*_disaster*` / `ag_*_earthquake*` phù hợp. Chỉ có `dl_earthquake_s2/s3/s4.jpg` cho daily-life topic, không reuse cho admin guide để tránh trộn convention. |
| `typhoon-evacuation-alerts` | none | Không có asset typhoon. |
| `hazard-map-flood-tsunami-volcano` | none | Không có asset hazard-map. |

Tất cả 3 guide ở `priority: 'normal'` không cần heroImage. Tuân chỉ thị "không thêm image asset mới nếu không thật sự cần".

## Counter phrases per guide

| Guide | Count |
|---|---|
| `earthquake-preparedness-japan` | 7 |
| `typhoon-evacuation-alerts` | 7 |
| `hazard-map-flood-tsunami-volcano` | 6 |

Tất cả có jp / romaji / vn + note. **Tổng: 20 câu mới.**

## Search keywords added

| Guide | Keyword count | Sample (đầy đủ trong file guide) |
|---|---|---|
| `earthquake-preparedness-japan` | 13 | động đất, rung lắc, di tản, 避難所, cảnh báo động đất, 地震, 揺れ, 緊急地震速報, 災害用伝言ダイヤル, 171… |
| `typhoon-evacuation-alerts` | 14 | bão, mưa lớn, 台風, di tản, 警戒レベル, 避難指示, 大雨警報, cảnh báo cấp 4, NHK… |
| `hazard-map-flood-tsunami-volcano` | 16 | hazard map, ハザードマップ, bản đồ phòng tai, ngập lũ, sóng thần, lở đất, núi lửa, 浸水, 津波, 土砂災害, 火山… |

## Source status per guide

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `earthquake-preparedness-japan` | 気象庁 (jma.go.jp), 内閣府防災 (bousai.go.jp), 総務省消防庁 (fdma.go.jp) | **HOMEPAGE LEVEL** — homepages chính thức của 3 cơ quan trung ương |
| `typhoon-evacuation-alerts` | 気象庁 (jma.go.jp), 内閣府防災 (bousai.go.jp) | **HOMEPAGE LEVEL** |
| `hazard-map-flood-tsunami-volcano` | 国土交通省 重ねるハザードマップ (disaportal.gsi.go.jp), 内閣府防災 (bousai.go.jp), 気象庁 (jma.go.jp) | **HOMEPAGE/SERVICE LEVEL** — `disaportal.gsi.go.jp` là service chính thức của 国土交通省 |

Tất cả URL là homepage hoặc service-level chính thức .go.jp. KHÔNG bịa deep-link.

### NEEDS_OFFICIAL_SOURCE_CHECK (chưa link cụ thể, ghi chú trong nội dung)

Các điểm content lead nên verify trước khi nâng `officialLinks` lên trang con cụ thể:

1. **警戒レベル 1–5 official definition** — guide ghi "do 内閣府 thiết lập từ 5/2019, sửa 2021 đổi 避難勧告 → 避難指示". Cần link đến trang chính 内閣府 cụ thể.
2. **緊急地震速報** — 気象庁 deep-link cụ thể về cách hoạt động + thời gian báo trước.
3. **災害用伝言ダイヤル 171** — dịch vụ NTT, không phải .go.jp. Nên link đến trang NTT East/West chính thức (`ntt-east.co.jp/saigai/voice171/` hoặc tương đương) sau khi verify URL còn sống. Hiện guide chỉ ghi cách dùng + ngày test (1/15 mỗi tháng) không link.
4. **Safety tips app** — ghi do "JNTO + 観光庁 phát hành" (theo thông tin hiện hành). Cần verify nguồn chính xác.
5. **被災者生活再建支援金** — chính sách hỗ trợ thiệt hại, mức tiền + điều kiện thay đổi. Đánh dấu re-verify trước `nextReviewAt: 2026-12-01`.
6. **罹災証明書** — quy trình do từng 市町村 xử lý — không bịa số tiền / mức độ thiệt hại cụ thể.
7. **地震保険 vs 火災保険 風水害** — guide ghi "thường KHÔNG bao động đất / bão" — chính xác trong đa số gói, nhưng tùy hợp đồng. Đã hedge "thường", "kiểm tra hợp đồng".
8. **火山防災 cụ thể từng núi** — không generalize "Phú Sĩ / Asama / Sakurajima nguy hiểm" — guide chỉ nhắc qua + direct user đến 火山防災協議会 địa phương.
9. **Mức 想定浸水深 specifics** — guide đưa ví dụ "3m" trong FAQ nhưng dùng "tham khảo" + direct user hỏi 市役所 cụ thể.

## Style notes (tuân thủ execution rules)

- **Action-first**: mỗi guide bắt đầu bằng "What to do in seconds/minutes" (động đất step 2 = Drop/Cover/Hold; bão step 3–5 = phản ứng theo cấp 3/4/5; hazard-map step 1 = mở trang 市役所).
- **Tone tự nhiên**: dùng "thường", "có thể", "tùy 市区町村", "hãy hỏi trước". Tránh "phải" tuyệt đối khi policy có thể đổi.
- **Không bịa fact**: số tiền, % bảo hiểm, thời gian xe cứu thương — đều có hedge hoặc direct user verify với cơ quan có thẩm quyền.
- **Cross-reference**: 3 guide nhắc lẫn nhau (typhoon nhắc earthquake's 防災バッグ; hazard-map nhắc cả 2; cả 3 đều nhắc visa-emergency-medical-disaster-extension đã có).
- **Counter phrases**: focus vào câu cứu mạng (助けてください, けがをしました, 避難所はどこですか) hơn câu lễ phép.
- **保険証 wording**: dùng "保険証 / マイナンバーカード / 資格確認書" như batch A1 đã chuẩn hóa.

## Verification results

| Check | Result | Time |
|---|---|---|
| `npm run typecheck` | PASS | trước khi viết report |
| `npm run test:ci` | PASS — **251/251 tests** | trước khi viết report |
| `npm run verify:content` | PASS — 0 files with issues, 0 suspicious lines | trước khi viết report |

Pre-commit hook sẽ chạy lại typecheck + verify:content khi commit — nếu có regression sẽ bị block.

## Items needing user / native review

(Không sửa trong batch này, ghi vào danh sách chờ.)

1. **警戒レベル 3 wording** — guide typhoon đề xuất "người già / có thai / có trẻ nhỏ → di tản ngay ở cấp 3". Native confirm có natural không hay nên thêm "người tàn tật" (要支援者).
2. **垂直避難 logic** — guide typhoon FAQ nói "chung cư bê tông cao tầng + không gần sông/núi → có thể 垂直避難". Native + chuyên gia phòng tai confirm trong các 市区町村 nào policy chấp nhận 垂直避難.
3. **`tasukete kudasai`** — câu cấp cứu cơ bản. Native confirm có natural so với "助けて！" (ngắn hơn, panic hơn).
4. **Earthquake "Drop/Cover/Hold"** — terminology Anh hóa. Native + 防災 expert confirm có nên dùng tiếng Nhật (姿勢を低く/頭を守る/動かない) thay vì terminology US-style.
5. **`垂直避難` translation** — guide dùng "di tản dọc". Native confirm có natural trong tiếng Việt hay nên dùng "di tản theo tầng" / "lên tầng cao".
6. **App "Safety tips"** — ghi "do JNTO + 観光庁 phát hành". Cần verify chính xác nhà phát hành hiện tại.

---

## Batch A2 done — không phải batch A3

Theo execution rule trong `docs/full-content-backlog-45-guides.md`: 3–5 guide / batch. Batch A2 đã đúng 3 guide. **KHÔNG implement Batch A3 (Daily utilities) trong PR này.**

Khi user yêu cầu batch tiếp theo, làm theo `docs/full-content-backlog-45-guides.md` Batch A3 (electricity-gas-water, internet, NHK, post-office) — 4 guide.

---

## QA review pass — 2026-05-09 (commit follow-up)

Sau khi commit ban đầu của batch A2, làm pass review nội bộ trên 3 guide. Sửa wording an toàn + tự nhiên + search keyword. Không thay schema, không sửa UI, không đổi version/tag.

### Tóm tắt sửa

| Guide | Thay đổi | Lý do |
|---|---|---|
| `earthquake-preparedness-japan` | Step 2 title + body: dùng wording chính thức 内閣府/消防庁 (姿勢を低く・頭を守る・じっとする) làm primary, Drop/Cover/Hold làm tham chiếu quốc tế | Trước đó lead bằng terminology US-FEMA. Bây giờ có cả tiếng Nhật official + tham chiếu quốc tế |
| `earthquake-preparedness-japan` | Common mistake "khung cửa": "ý tưởng cũ, không còn được khuyến nghị" → "không phải lựa chọn tốt nhất. Hướng dẫn hiện tại của 内閣府/消防庁..." | Bỏ overclaim "không còn được khuyến nghị" (không có source rõ); thay bằng tham chiếu hướng dẫn chính thức |
| `earthquake-preparedness-japan` | Common mistake + FAQ về 緊急地震速報: "5–30 giây" → "vài giây – vài chục giây tùy khoảng cách từ tâm chấn (gần thì 0–2 giây, xa hơn có thể 10–30 giây)" | Chính xác hơn — gần tâm chấn có thể 0 giây (sóng tới ngay), xa hơn mới có lead time |
| `earthquake-preparedness-japan` | FAQ "震度 4 trở xuống": "thường có thể ở lại" → "thông thường... có thể ở lại trong khi theo dõi NHK... Khi phân vân, di tản an toàn hơn" | Hedge mạnh hơn + thêm "khi phân vân di tản an toàn hơn" |
| `earthquake-preparedness-japan` | Step 3: "đợi xa tòa nhà ≥ 10m" → "đứng ra xa tòa nhà một khoảng cách an toàn" | Bỏ số 10m không có source chính thức |
| `earthquake-preparedness-japan` | Counter phrase 助けてください: "Làm ơn cứu tôi!" → "Cứu tôi với!" + note "không cần lễ phép trong tình huống này" | Tự nhiên + đúng panic state cho tiếng Việt |
| `earthquake-preparedness-japan` | searchKeywords +6: 震度, 緊急地震, 防災バッグ, vali phòng tai, 罹災証明書, giấy chứng nhận thiệt hại, 地震保険, sau động đất | User panic-search có thể gõ những term này |
| `typhoon-evacuation-alerts` | Description: "đã quá muộn để di tản, lên tầng cao nhất" → "nguy hiểm tính mạng đang xảy ra, có thể đã quá muộn ra ngoài an toàn — ở chỗ cao nhất trong nhà" + thêm "(sửa 5/2021 đổi 避難勧告 → 避難指示)" | Diễn đạt cấp 5 chính xác hơn (緊急安全確保 = ensuring last-minute safety, không phải auto "too late"); ghi rõ thay đổi terminology 2021 |
| `typhoon-evacuation-alerts` | Common mistake "Đi làm khi cấp 4–5": "bạn có quyền từ chối, không vi phạm hợp đồng" → "có lý do chính đáng để từ chối đi làm theo 労働安全衛生法 — báo sếp trước, ghi lại bằng chứng" | Hedge — "không vi phạm hợp đồng" tuyệt đối là overclaim. Hợp đồng cụ thể có thể quy định khác |
| `typhoon-evacuation-alerts` | FAQ "Sếp bắt đi làm": cùng softer wording, bỏ "không vi phạm hợp đồng" → "thường có lý do chính đáng" + nhấn lưu bằng chứng + nhắc khả năng cần luật sư | Realistic về tranh chấp lao động |
| `typhoon-evacuation-alerts` | Counter phrase 助けてください: cùng fix như earthquake | Cùng lý do |
| `typhoon-evacuation-alerts` | "東京電力 / 関西電力 / công ty điện địa phương" → "công ty điện địa phương (東京電力 ở Kanto, 関西電力 ở Kansai, 中部電力 ở Chubu, v.v.)" | List 2 công ty không đủ — Nhật có 10 công ty điện vùng. Nói rõ tùy khu |
| `typhoon-evacuation-alerts` | searchKeywords +9: lũ, lụt, ngập, cảnh báo cấp 3, 防災バッグ, vali phòng tai, trước bão, sau bão, 罹災証明書 | Panic-search behavior |
| `hazard-map-flood-tsunami-volcano` | Step 3: bỏ 3 emoji 🏫 🌳 🏥 → text "Hình trường học / Hình cây / Hình chữ thập" + note "ký hiệu cụ thể tùy 市町村" | Tuân nguyên tắc no-emoji + chính xác hơn (ký hiệu khác nhau theo bản đồ) |
| `hazard-map-flood-tsunami-volcano` | Step 5 tip: typo "11/3 動đất Tohoku" → "Ngày 11 tháng 3 (kỷ niệm động đất Tohoku 2011)" + viết rõ "17 tháng 1" thay vì "1/17" | Fix typo lai chữ + clearer Vietnamese date |
| `hazard-map-flood-tsunami-volcano` | Step 4 testing: "5/9 (防災の日 — 1/9 thường có training quốc gia)" → "ngày 1 và 15 hàng tháng. Cũng có thể test trong 防災週間 (30/8 – 5/9 hàng năm) và ngày 1 tháng 9 (防災の日 — kỷ niệm Đại địa chấn Kanto 1923, có training quốc gia)" | Date format mơ hồ (5/9 trong VN = 5 Sep hay 9 May?), bây giờ rõ ràng |
| `hazard-map-flood-tsunami-volcano` | FAQ trẻ em (text "11/3 動đất / 1/17 động đất") → "ngày 11 tháng 3 (động đất Tohoku 2011) + ngày 17 tháng 1 (động đất Kobe 1995)" | Cùng fix typo + clearer |
| `hazard-map-flood-tsunami-volcano` | FAQ Phú Sĩ: lead question "có thực sự nguy hiểm không?" giữ nguyên, answer thêm clarification "active KHÔNG có nghĩa sắp phun trào" lên đầu | Tránh hiểu nhầm Phú Sĩ sắp phun trào |
| `hazard-map-flood-tsunami-volcano` | whenToAskExpert "active (Sakurajima, Aso, Asama, Fuji, v.v.)" → "được 気象庁 phân loại 'active' (vd Sakurajima, Aso, Asama, Phú Sĩ, v.v.) — phân loại 'active' KHÔNG có nghĩa sắp phun trào" | Cùng lý do — tránh tạo nỗi sợ vô căn cứ |
| `hazard-map-flood-tsunami-volcano` | searchKeywords +4: 防災マップ, lũ lụt, 想定浸水深, 災害用伝言板 | User search behavior |

### Kết luận từng guide

#### 1. `earthquake-preparedness-japan` — PASS sau sửa
- Wording chính thức 姿勢を低く・頭を守る・じっとする làm primary, có tham chiếu Drop/Cover/Hold quốc tế.
- Số liệu lead time 緊急地震速報 đã chính xác hơn (vài giây – vài chục giây tùy khoảng cách).
- Số 10m bỏ → "khoảng cách an toàn" mở.
- Common mistake "khung cửa" softer + dẫn nguồn 内閣府/消防庁.
- Counter phrases: 助けてください VN sửa thành "Cứu tôi với!" (panic-natural).
- Search keywords +6.

#### 2. `typhoon-evacuation-alerts` — PASS sau sửa
- 警戒レベル 5 wording không còn auto-claim "đã quá muộn".
- Quyền từ chối đi làm khi cấp 4-5: hedge mạnh hơn — "có lý do chính đáng theo 労働安全衛生法" thay vì "không vi phạm hợp đồng".
- Công ty điện: list theo khu, không cố định 2 công ty.
- 避難勧告 → 避難指示 timeline rõ ràng (5/2021 sửa).
- Counter 助けてください như earthquake.
- Search keywords +9.

#### 3. `hazard-map-flood-tsunami-volcano` — PASS sau sửa
- Bỏ emoji theo nguyên tắc.
- Fix typo "動đất" → "động đất".
- Date format ambiguous (5/9, 1/9, 11/3, 1/17) → spelled out tháng/ngày kiểu Việt, có giải thích kỷ niệm.
- Núi lửa "active": làm rõ "không có nghĩa sắp phun trào" — tránh tạo nỗi sợ Phú Sĩ.
- Search keywords +4.

---

## Source status — final (sau QA review)

| Guide | Sources | Mức tin cậy |
|---|---|---|
| `earthquake-preparedness-japan` | 気象庁 (jma.go.jp), 内閣府防災 (bousai.go.jp), 総務省消防庁 (fdma.go.jp) | **HOMEPAGE LEVEL** — không thay đổi |
| `typhoon-evacuation-alerts` | 気象庁 (jma.go.jp), 内閣府防災 (bousai.go.jp) | **HOMEPAGE LEVEL** — không thay đổi |
| `hazard-map-flood-tsunami-volcano` | 国土交通省 重ねるハザードマップ (disaportal.gsi.go.jp), 内閣府防災 (bousai.go.jp), 気象庁 (jma.go.jp) | **HOMEPAGE/SERVICE LEVEL** — không thay đổi |

**KHÔNG nâng status lên "confirmed" cho deep-link nào trong pass này.**

Các điểm vẫn `NEEDS_OFFICIAL_SOURCE_CHECK` (không đổi từ commit gốc):
1. 警戒レベル 1–5 official definition (内閣府)
2. 緊急地震速報 cách hoạt động + lead time chính xác (気象庁)
3. 災害用伝言ダイヤル 171 NTT page
4. Safety tips app publisher (JNTO + 観光庁?)
5. 被災者生活再建支援金 mức tiền + điều kiện
6. 罹災証明書 quy trình từng 市町村
7. 地震保険 vs 火災保険 風水害 cụ thể
8. 火山防災 cụ thể từng núi
9. 想定浸水深 specifics
10. 労働安全衛生法 quyền từ chối work khi disaster — sau pass review hedge mạnh hơn nhưng vẫn cần luật sư review nếu publish ở scale lớn

---

## Device QA checklist

Tester mở app trên device thật (iOS + Android nếu có), check theo thứ tự:

### `earthquake-preparedness-japan`
- [ ] Mở guide từ Admin tab.
- [ ] Guide không có hero — layout vẫn cân đối.
- [ ] quickAction render: deadline, office, doNow (5 bullet), bring (6 line), ifLate, officialSourceLabels (3 source).
- [ ] counterPhrases hiển thị đủ **7** câu — đọc đầy đủ jp + romaji + vn + note.
- [ ] Tap copy ở 1 câu → clipboard có jp.
- [ ] Steps render đủ 6 bước, đánh số đúng 1–6.
- [ ] Step 2 title hiện 姿勢を低く / 頭を守る / じっとする không bị cắt.
- [ ] FAQ render đủ 5 câu hỏi.
- [ ] documentsChecklist render — cả 8 row, "Bắt buộc" / "Không bắt buộc" rõ.

### `typhoon-evacuation-alerts`
- [ ] Mở guide từ Admin tab.
- [ ] Layout không có hero — OK.
- [ ] Description hiện đủ "(sửa 5/2021 đổi 避難勧告 → 避難指示)".
- [ ] counterPhrases đủ **7** câu.
- [ ] Steps render 6 bước (1: theo dõi → 2: 1-2 ngày trước → 3: cấp 3 → 4: cấp 4 → 5: cấp 5 → 6: sau bão).
- [ ] FAQ "Sếp bắt đi làm" hiển thị bằng wording mới (hedge "lý do chính đáng" thay vì "không vi phạm hợp đồng").
- [ ] Số `30cm` / `50cm` không bị format lỗi.

### `hazard-map-flood-tsunami-volcano`
- [ ] Mở guide từ Admin tab.
- [ ] counterPhrases đủ **6** câu.
- [ ] Step 3 KHÔNG còn emoji 🏫 🌳 🏥 — text "Hình trường học / Hình cây / Hình chữ thập".
- [ ] Step 4 đoạn test 171 hiện rõ "ngày 1 và 15 hàng tháng" + "防災週間 (30/8 – 5/9)".
- [ ] FAQ Phú Sĩ hiện "active KHÔNG có nghĩa sắp phun trào" rõ ràng ở đầu answer.
- [ ] Step 5 tip không còn typo "動đất" — hiển thị "động đất" sạch.

### Cross-cut search QA
- [ ] Gõ "động đất" → kết quả có `earthquake-preparedness-japan`.
- [ ] Gõ "震度" → kết quả có `earthquake-preparedness-japan`.
- [ ] Gõ "防災バッグ" → kết quả có cả earthquake + typhoon (cùng share keyword).
- [ ] Gõ "vali phòng tai" → kết quả có cả earthquake + typhoon.
- [ ] Gõ "lụt" → kết quả có `typhoon-evacuation-alerts`.
- [ ] Gõ "ngập" → kết quả có `typhoon-evacuation-alerts`.
- [ ] Gõ "171" → kết quả có cả earthquake + hazard-map.
- [ ] Gõ "ハザードマップ" → kết quả có `hazard-map-flood-tsunami-volcano`.
- [ ] Gõ "núi lửa" → kết quả có `hazard-map-flood-tsunami-volcano`.
- [ ] Gõ "罹災証明書" → kết quả có ≥2 guide A2 (earthquake + typhoon).

### iOS-specific
- [ ] Long-press đoạn jp `避難指示が出ています` → context menu copy hoạt động.
- [ ] Dynamic Type lên cỡ XXL → guide không cắt ngang chữ.

### Android-specific
- [ ] Back hardware button → quay lại AdminScreen / Search list.
- [ ] Long-press copy đoạn jp → dán được vào app khác.

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

- Không thêm guide thứ 4.
- Không sửa UI / build config / version / tag.
- Không bịa fact / URL / con số phí thiệt hại / mức bảo hiểm cụ thể.
- Không add image asset mới.
- Không rewrite guide cũ.
- Không modify daily-life topic earthquake (đã có sẵn — admin guide bổ sung action-first procedure, không thay).
