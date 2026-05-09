# Release Checkpoint — 90 Guides

**Date:** 2026-05-09
**Source backlog:** `docs/full-content-backlog-45-guides.md`
**Purpose:** Đánh dấu trạng thái app sau khi hoàn thành 3 batch content (A1–A3). KHÔNG bắt đầu thêm batch mới cho đến khi device QA + native review pass.

---

## Current state

| Field | Value |
|---|---|
| **HEAD** | `986b65c` — `docs: consolidate native/legal review pending list for A1-A3` |
| **Branch** | `main` |
| **Sync với origin/main** | ✅ Up to date — `0 0` (ahead 0 / behind 0) |
| **Latest git tag** | `v1.3.1` |
| **app.json version** | `1.3.1` |
| **package.json version** | `1.3.0` (chưa bump theo app.json) |
| **ADMIN_GUIDES count** | **90** (xác nhận qua awk script) |

> **Note version mismatch:** `app.json` 1.3.1 và `package.json` 1.3.0 không khớp. Đã có tag `v1.3.1` cho commit `d41fe21`. App Store đang chạy 1.3.1 (build #21, đã `eas submit` 2026-05-09 — Apple status 審査待ち trước đó). Khi cut release tiếp theo cần đồng bộ 2 file.

## Completed content batches

| Batch | Guides added | Topic | Report doc |
|---|---|---|---|
| **A1** | 3 | Medical access essentials | `docs/content-roadmap-a1-medical-guides.md` |
| **A2** | 3 | Disaster preparedness | `docs/content-roadmap-a2-disaster-guides.md` |
| **A3** | 4 | Daily utilities | `docs/content-roadmap-a3-daily-utilities-guides.md` |
| **Review consolidation** | — | Pending review across A1–A3 | `docs/native-legal-review-pending-a1-a3.md` |

**Tổng: 10 guide mới** + 1 master backlog + 1 consolidated review doc.

## New guides added in A1–A3

### A1 — Medical access essentials (category `health`)
1. `clinic-hospital-visit-guide` — Cách đi khám bệnh ở Nhật
2. `emergency-calls-japan` — Gọi cấp cứu, cảnh sát ở Nhật (119/110)
3. `dentist-visit-japan` — Đi nha khoa ở Nhật

### A2 — Disaster preparedness (category `daily-law`)
4. `earthquake-preparedness-japan` — Hướng dẫn khi động đất
5. `typhoon-evacuation-alerts` — Hướng dẫn khi bão / 警戒レベル
6. `hazard-map-flood-tsunami-volcano` — Bản đồ phòng tai

### A3 — Daily utilities (category `daily-law`)
7. `electricity-gas-water-contracts` — Hợp đồng điện, gas, nước
8. `home-internet-wifi-contracts` — Internet, Wi-Fi nhà
9. `nhk-contract-guide` — NHK đến nhà thì xử lý thế nào
10. `post-office-mail-forwarding` — Bưu điện, chuyển tiếp thư

## Verification status

| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | ✅ PASS |
| Jest test suite | `npm run test:ci` | ✅ PASS — **251/251 tests** |
| Content audit | `npm run verify:content` | ✅ PASS — 0 files with issues, 0 suspicious lines |
| Full verify chain | `npm run verify` | ✅ PASS (chained: typecheck + test:ci + verify:content) |
| BJT QA checklist | (in verify:content) | ✅ 0 errors, 0 warnings on 106 questions |

`npm run verify` script tồn tại trong `package.json` (line 13) và pass đầy đủ.

## Known pending review

Theo `docs/native-legal-review-pending-a1-a3.md` — **~120 individual review questions** chia thành 5 nhóm:

### Native Japanese review pending
- **76 counterPhrases** (10 guide × jp + romaji + vn + note)
- HIGH priority: emergency 9 + NHK 8 + earthquake/typhoon panic 14 = ~31 phrases
- Reviewer Q tập trung: tone panic vs polite, biến thể câu mạnh hơn (vd `意識を失っています`, `お引き取りください`)

### Vietnamese naturalness review pending
- **14 wording điểm** Hán-Việt cứng / direct-translate / recently-fixed phrases
- Vd: "kiểu 健康保険被保険者資格証明書" (clinic FAQ), "di tản dọc" cho 垂直避難 (hazard-map), "vùng tranh cãi pháp lý" (NHK)

### Legal / consumer review pending
- **8 sensitive items**:
  - **HIGHEST**: NHK cooling-off applicability cho 受信契約 (vùng án lệ tranh cãi)
  - HIGH: NHK 不退去罪 ngưỡng / NHK tone không khuyến khích trốn luật / 労働安全衛生法 quyền từ chối work khi disaster
  - MEDIUM: Internet 訪問販売 cooling-off / customs VN / 救急車 fee policy / utility-internet fee ranges

### Official source check pending
- **22 NEEDS_OFFICIAL_SOURCE_CHECK** items:
  - A1 (7): #7119, #9110, 救急車 fee, 選定療養費, 子ども医療費助成, 休日歯科診療, 健康保険被保険者資格証明書 vs 資格確認書
  - A2 (10): 警戒レベル definition, 緊急地震速報, 171 NTT, Safety tips publisher, 被災者生活再建支援金, 罹災証明書, 地震保険 vs 火災保険, 火山防災, 想定浸水深, 労働安全衛生法
  - A3 (5): NHK cooling-off, internet 訪問販売, utility/internet fees, EMS fees, customs VN

### Device QA pending
- iOS + Android × 10 guide × ~25 search queries × 76 counter phrase copies × ~10 long JP render checks
- Estimate: 30–45 phút mỗi platform
- Chưa được tester confirm

## Release risk notes

⚠️ **Các điểm rủi ro nếu release ngay 90 guide không qua review:**

1. **NHK cooling-off applicability** — vùng án lệ tranh cãi tại Nhật. Nếu user dựa vào 8-day cooling-off mà tòa từ chối → tranh chấp pháp lý. Đã hedge mạnh ở 5 chỗ trong `nhk-contract-guide` + đẩy user đi 国民生活センター 188 trước. **Vẫn cần luật sư consumer review trước khi user trên scale dựa vào.**

2. **119 / 110 / #7119 / #9110 sources** — homepage level chỉ. Deep-link cho #7119 / #9110 chưa verify (tùy 都道府県). Một số tỉnh không có #7119 — guide đã hedge "tùy khu vực" nhưng nếu user gọi → dial fail có thể stress.

3. **救急車 fee policy 2024–2026** — đang đổi (Mie 三重県 đã thu phí, Tokyo chưa). Hedged trong guide nhưng cần re-verify trước `nextReviewAt: 2026-12-01`.

4. **Disaster warning level / source details** — 警戒レベル 1–5 đã chuẩn quốc gia từ 2019 (sửa 2021), nhưng deep-link đến trang 内閣府 cụ thể chưa link. 緊急地震速報 lead time đã hedge nhưng số liệu cụ thể (vài giây – vài chục giây) cần verify với 気象庁 deep-link.

5. **A1–A3 device QA chưa hoàn thành** — chưa có tester confirm trên iPhone/Android. Risk: counterPhrase copy có thể bị format lỗi, long Japanese text có thể cắt giữa chừng, search keywords có thể không match đúng.

6. **Version mismatch** — `app.json` 1.3.1 vs `package.json` 1.3.0. Chưa bump cho 90 guide content. Nếu cut release tiếp, phải đồng bộ + tag mới (vd 1.3.2 cho content patch hoặc 1.4.0 cho minor).

7. **Phí cụ thể trong guides** — utility / internet / EMS / yen ranges đều hedged "tham khảo, tùy công ty" nhưng chưa có confirm 2026.

## Device QA checklist summary

Final smoke-test checklist trước khi cân nhắc release:

### Existing flows (regression check)
- [ ] Home screen quick actions vẫn hoạt động (visa-renewal, lost-document, tax-insurance)
- [ ] Admin tab situation chips điều hướng đúng (residence-card, lost-residence-card, health-insurance không bị filter ẩn)
- [ ] Search tab không reset query khi quay lại nhiều lần

### New 10-guide rendering
- [ ] AdminDetail render 10 guide mới không lag / không cắt
- [ ] Hero image (clinic-hospital reuse `ag_kensin_hero.jpg`) load đúng
- [ ] Layout không hero (9 guide còn lại) cân đối, không khoảng trắng lớn
- [ ] CounterPhrase list render đầy đủ 8/9/7/7/7/6/8/8/8/8 = 76 phrases
- [ ] Tap copy trên jp → clipboard có đúng nội dung (đặc biệt jp dài như `今すぐ契約できません。家で確認してから決めます。`)

### Search keywords (panic terms)
- [ ] Gõ "đau răng" → `dentist-visit-japan`
- [ ] Gõ "cấp cứu" / "119" → `emergency-calls-japan`
- [ ] Gõ "động đất" / "震度" → `earthquake-preparedness-japan`
- [ ] Gõ "bão" / "警戒レベル" → `typhoon-evacuation-alerts`
- [ ] Gõ "ハザードマップ" → `hazard-map-flood-tsunami-volcano`
- [ ] Gõ "mở gas" / "mất điện" → `electricity-gas-water-contracts`
- [ ] Gõ "internet bị cắt" / "wifi" → `home-internet-wifi-contracts`
- [ ] Gõ "NHK" / "受信料" → `nhk-contract-guide`
- [ ] Gõ "không nhận được hàng" / "不在票" → `post-office-mail-forwarding`

### Long Japanese text render
- [ ] earthquake Step 2 title `姿勢を低く / 頭を守る / じっとする` không bị cắt
- [ ] typhoon Step 5 cấp 5 wording đầy đủ
- [ ] NHK Step 5 cooling-off hedge đoạn dài render đủ
- [ ] post Step 4 EMS / 航空便 / 船便 list đủ 3 lựa chọn
- [ ] electricity Step 5 引っ越し手続き render đủ

### iOS-specific
- [ ] Long-press đoạn jp → context menu copy hoạt động
- [ ] Dynamic Type cỡ XXL (Settings → Display & Text Size) → guide không cắt ngang chữ

### Android-specific
- [ ] Back button hardware → quay lại đúng AdminScreen / Search
- [ ] Long-press copy đoạn jp → dán được vào app khác (Notes, Translate)

**Mỗi platform ước tính 30–45 phút.**

## Recommendation

**Tình hình hiện tại**: 90 guide đã code + verify tự động pass, nhưng chưa có device QA + native/legal review trên 76 counterPhrases và 8 legal-sensitive items.

### Kịch bản A: Ship sớm (recommend nếu user muốn release 1.3.2 / 1.4.0 trong ngày)

1. **Device QA A1–A3 trên iOS + Android** (~30–45 phút mỗi platform). Theo checklist trong section trên.
2. **Bug fix nếu có** — pass riêng, không thêm content.
3. **Đồng bộ version** `app.json` ↔ `package.json` → `1.3.2` (content patch) hoặc `1.4.0` (minor — content significant).
4. **Cut tag** `v1.3.2` hoặc `v1.4.0`.
5. **EAS build + submit** App Store + Play Store.
6. **CHANGELOG.md** thêm entry liệt kê 10 guide mới.

⚠️ **Risk:** ship trước khi NHK cooling-off + 不退去罪 + 訪問販売 được luật sư consumer review. Đã hedge mạnh nhưng vẫn còn rủi ro pháp lý nếu user dựa quá vào.

### Kịch bản B: Native + legal review trước khi ship

1. **Device QA A1–A3** parallel với:
2. **Gửi `docs/native-legal-review-pending-a1-a3.md` cho 3 reviewer** (native Japanese / Vietnamese content / legal consumer). Estimate 2–4 giờ tổng.
3. **Pass review per batch** dựa trên feedback (vd "QA pass round 2 A1" sau khi native confirm).
4. **Ship sau khi review pass** với risk thấp hơn.

⏱️ **Timeline:** 2–5 ngày tùy tốc độ reviewer.

### Kịch bản C: Tiếp tục content trước khi ship

❌ **KHÔNG khuyến khích** — đã 3 batch không release intermediate. Tiếp tục thêm A4 → A5 → ... mà không cut release thì:
- Risk regression nhân lên qua mỗi batch
- User App Store vẫn ở 1.3.1 (80 guide) — không hưởng lợi từ A1–A3 work
- Bug device QA phát hiện ở batch 5 sẽ phải fix retro qua 5 batch

### Khuyến nghị chính: **Kịch bản A (ship sớm)** với điều kiện:
- Device QA pass thật trên 2 platform
- Hedge NHK / 訪問販売 / 労働安全衛生法 đã đủ mạnh sau pass review (đã làm trong A3 QA pass)
- Theo dõi feedback user real-world sau release để trigger pass review nếu có khiếu nại

Để Kịch bản B (legal review trước) chạy parallel với device QA — nếu reviewer trả lời nhanh trước device QA xong, có thể fix ngay. Nếu chậm — vẫn ship Kịch bản A và pass review sau.

---

## Document maintenance

Cập nhật doc này khi:
- Cut release tiếp theo (thêm tag + ngày + commit)
- Device QA hoàn thành (đánh dấu ✅)
- Review feedback đến (link đến pass review commit)
- Bắt đầu batch mới (chuyển sang doc checkpoint mới sau release)
