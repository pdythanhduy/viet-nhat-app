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

## Out of scope

- Không thêm guide thứ 4.
- Không sửa UI / build config / version / tag.
- Không bịa fact / URL / con số phí thiệt hại / mức bảo hiểm cụ thể.
- Không add image asset mới.
- Không rewrite guide cũ.
- Không modify daily-life topic earthquake (đã có sẵn — admin guide bổ sung action-first procedure, không thay).
