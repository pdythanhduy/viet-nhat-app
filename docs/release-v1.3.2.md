# Release v1.3.2 — 90-guide Content Patch

**Date:** 2026-05-09
**Type:** Content patch (no UI rework, no schema changes)
**Tag:** `v1.3.2`
**Previous tag:** `v1.3.1` (commit `d41fe21`)

---

## Summary

Content patch trên v1.3.1 — thêm 10 guide practical life, cập nhật search keywords + counter phrases, hedge legal-sensitive wording cho NHK/disaster/customs. ADMIN_GUIDES count: **80 → 90**. Không sửa UI, không đổi schema, không thêm asset mới.

| Field | Before (1.3.1) | After (1.3.2) |
|---|---|---|
| ADMIN_GUIDES | 80 | **90** |
| `app.json` version | 1.3.1 | **1.3.2** |
| `package.json` version | 1.3.0 (mismatch) | **1.3.2** (synced) |
| Counter phrases | (existing) | **+76** new (jp + romaji + vn + note) |
| Search keywords | (existing) | **+94** new (panic-search + technical) |
| Schema changes | — | None |
| UI changes | — | None |
| New assets | — | None (reused `ag_kensin_hero.jpg` cho clinic-hospital) |

---

## 10 new guides

### A1 — Medical access essentials (category `health`, 3 guides)

1. **`clinic-hospital-visit-guide`** — Cách đi khám bệnh ở Nhật. Phân biệt クリニック / 病院, quy trình tại quầy 受付, 8 counter phrases. Reuse `ag_kensin_hero.jpg`.
2. **`emergency-calls-japan`** — Gọi cấp cứu, cảnh sát ở Nhật (119/110). Hướng dẫn câu đầu tiên + nói địa chỉ + không cúp máy. 9 counter phrases.
3. **`dentist-visit-japan`** — Đi nha khoa ở Nhật. Đặt hẹn, hỏi 見積書, phân biệt 自費 vs bảo hiểm. 7 counter phrases.

### A2 — Disaster preparedness (category `daily-law`, 3 guides)

4. **`earthquake-preparedness-japan`** — Hướng dẫn khi động đất. Lead với wording chính thức 内閣府 / 消防庁 (姿勢を低く・頭を守る・じっとする), 防災バッグ checklist, 171 災害用伝言ダイヤル, 罹災証明書 sau 24h. 7 counter phrases.
5. **`typhoon-evacuation-alerts`** — Hướng dẫn khi bão / 警戒レベル. Giải thích 5 cấp 警戒レベル (3=chuẩn bị, 4=di tản NGAY, 5=quá muộn ra ngoài). 7 counter phrases.
6. **`hazard-map-flood-tsunami-volcano`** — Bản đồ phòng tai (ハザードマップ). 4 loại nguy cơ (浸水/津波/土砂災害/火山), test 171 hàng tháng, hedge "active 火山" ≠ sắp phun trào. 6 counter phrases.

### A3 — Daily utilities (category `daily-law`, 4 guides)

7. **`electricity-gas-water-contracts`** — Hợp đồng điện, gas, nước. Mở/hủy 3 dịch vụ, đặc biệt 開栓 gas cần hẹn. 8 counter phrases.
8. **`home-internet-wifi-contracts`** — Internet, Wi-Fi nhà. Phân biệt 光回線 / ホームルーター / ポケット Wi-Fi, 解約金 / 更新月 / 訪問販売 cooling-off. 8 counter phrases.
9. **`nhk-contract-guide`** — NHK đến nhà thì xử lý thế nào? Quyền + nghĩa vụ tại cửa, hedge cooling-off pháp lý ở 5 chỗ, direct user 国民生活センター 188 trước. 8 counter phrases.
10. **`post-office-mail-forwarding`** — Bưu điện, chuyển tiếp thư và gửi hàng. 転送届, 不在票/再配達, EMS/航空便/船便 về VN, scam SMS Japan Post. 8 counter phrases.

---

## Known risks

⚠️ Trước khi production submission, tester / content lead cần aware:

1. **NHK cooling-off applicability** — vùng án lệ tranh cãi tại Nhật. Đã hedge mạnh ở 5 chỗ trong `nhk-contract-guide` (quickAction.ifLate, whenToDo, fees, 2 FAQ, Step 5) + đẩy user đi 国民生活センター 188 trước. Vẫn nên có luật sư consumer review trước scale lớn. Status: `NEEDS_LEGAL_OR_CONSUMER_REVIEW`.

2. **NHK 不退去罪 threshold** — luật hình sự (刑法 130). Đã hedge "ngưỡng áp dụng tùy hoàn cảnh — cảnh sát đánh giá khi đến". User gọi #9110 chưa đủ điều kiện thường chỉ được tư vấn.

3. **救急車 fee policy 2024–2026** — đang đổi (Mie 三重県 đã thu phí, Tokyo chưa). Đã hedge "một số tỉnh đã thí điểm thu phí". Re-verify trước `nextReviewAt: 2026-12-01`.

4. **#7119 / #9110 deep-link** — chưa link cụ thể vì coverage tùy 都道府県. Đã hedge "tùy khu vực".

5. **A1–A3 device QA** — chưa hoàn thành trên iOS/Android. Smoke-test checklist tại `docs/release-checkpoint-90-guides.md`.

6. **22 NEEDS_OFFICIAL_SOURCE_CHECK items** đầy đủ trong `docs/native-legal-review-pending-a1-a3.md`. Tất cả đã có hedge wording — homepage links đầy đủ, deep-link verification pending.

7. **Phí cụ thể** (utility/internet/EMS yen ranges, dentist tham khảo) đều hedged "tùy công ty / tùy khu vực / chỉ là tham khảo".

---

## Device QA checklist (smoke test trước EAS submit)

### Existing flows (regression check)
- [ ] Home quick actions (visa-renewal, lost-document, tax-insurance) hoạt động.
- [ ] Admin tab situation chips điều hướng đúng (residence-card, lost-residence-card, health-insurance không bị filter ẩn).
- [ ] Search tab không reset query khi navigate qua lại.

### New 10-guide rendering
- [ ] AdminDetail render 10 guide mới không cắt / không lag.
- [ ] Hero `ag_kensin_hero.jpg` (clinic-hospital) load đúng.
- [ ] Layout no-hero (9 guide còn lại) cân đối.
- [ ] CounterPhrase list 8/9/7/7/7/6/8/8/8/8 = 76 phrases đầy đủ.
- [ ] Tap copy trên jp dài (vd `今すぐ契約できません。家で確認してから決めます。`) → clipboard có đúng nội dung.

### Search keywords
- [ ] "đau răng" / "歯医者" → `dentist-visit-japan`.
- [ ] "cấp cứu" / "119" → `emergency-calls-japan`.
- [ ] "động đất" / "震度" → `earthquake-preparedness-japan`.
- [ ] "bão" / "警戒レベル" → `typhoon-evacuation-alerts`.
- [ ] "ハザードマップ" → `hazard-map-flood-tsunami-volcano`.
- [ ] "mở gas" / "mất điện" → `electricity-gas-water-contracts`.
- [ ] "internet bị cắt" / "wifi" → `home-internet-wifi-contracts`.
- [ ] "NHK" / "受信料" → `nhk-contract-guide`.
- [ ] "không nhận được hàng" / "不在票" → `post-office-mail-forwarding`.

### Long Japanese text render
- [ ] earthquake Step 2 title `姿勢を低く / 頭を守る / じっとする` không bị cắt.
- [ ] typhoon Step 5 cấp 5 wording đầy đủ.
- [ ] NHK Step 5 cooling-off hedge đoạn dài render đủ.
- [ ] post Step 4 EMS / 航空便 / 船便 list đủ 3 lựa chọn.
- [ ] electricity Step 5 引っ越し手続き đầy đủ.

### iOS-specific
- [ ] Long-press đoạn jp → context menu copy.
- [ ] Dynamic Type cỡ XXL → guide không cắt ngang chữ.

### Android-specific
- [ ] Back hardware button → quay lại đúng AdminScreen / Search.
- [ ] Long-press copy đoạn jp → dán được vào app khác.

**Estimate:** 30–45 phút mỗi platform.

---

## EAS build commands (chỉ chạy sau khi user xác nhận)

KHÔNG chạy tự động trong task này. User chạy thủ công sau khi device QA pass:

### iOS preview build
```powershell
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform ios --profile preview
```

### iOS production build + submit
```powershell
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform ios --profile production
# Đợi build xong, lấy build ID
eas submit -p ios --profile production --id <build-id>
```

### Android preview build
```powershell
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform android --profile preview
```

### Android production build + submit
```powershell
$env:GIT_CLONE_PROTECTION_ACTIVE="false"
eas build --platform android --profile production
eas submit -p android --profile production --id <build-id>
```

### App Store Connect "What's New" (English required)
```text
Adds 10 new practical-life guides for Vietnamese residents in Japan,
covering medical access (clinic visits, emergency calls, dental care),
disaster preparedness (earthquake, typhoon, hazard maps), and daily
utility setup (electricity/gas/water, internet, NHK door visits, post
office). Expanded search keywords for panic-search behavior. Added 76
practical Japanese counter phrases. No UI changes.
```

---

## Rollback plan

Nếu phát hiện regression nghiêm trọng sau EAS submit:

### Rollback content (không cần resubmit App Store)
1. Revert content commits trên `main`:
   ```powershell
   git revert e357d19 986b65c d0bf407 009dcec f9292a6 71a4840 8a7b3e6 f2912de --no-commit
   git commit -m "revert: rollback A1-A3 content for v1.3.2 hotfix"
   git push origin main
   ```
2. Bump `app.json` + `package.json` thành `1.3.3` cho hotfix release.
3. Tag `v1.3.3` + EAS build + submit.
4. App Store Connect: ghi rõ "1.3.3 hotfix — temporarily reverted 1.3.2 content additions pending review".

### Rollback chỉ 1-2 guide cụ thể (vd NHK guide gây tranh cãi)
1. Edit `src/constants/content/adminGuides/guides/index.ts` — comment out `nhkContractGuide` import + array entry.
2. Bump `app.json` + `package.json` thành `1.3.3`.
3. Tag + build + submit như trên.
4. Re-verify với luật sư rồi re-add ở `1.3.4`.

### Reject Apple Review (chưa qua submit)
- Trong App Store Connect, nhấn "Reject this build" trên submission đang chờ.
- Đẩy build mới sau khi fix.

---

## Verification

| Check | Result |
|---|---|
| `npm run typecheck` | (chạy trước commit) |
| `npm run test:ci` | (chạy trước commit) |
| `npm run verify:content` | (chạy trước commit) |
| `npm run verify` (full chain) | (chạy trước commit) |
| Pre-commit hook (typecheck + verify:content + bjt qa) | (chạy khi commit) |

Tất cả check đã pass trước khi commit + tag (xem báo cáo task).

---

## Document maintenance

Sau khi EAS submit + Apple Review:
- Cập nhật `docs/release-checkpoint-90-guides.md`: chuyển trạng thái sang "v1.3.2 shipped".
- Note kết quả Apple Review (Approved / Rejected) vào CHANGELOG nếu có.
- Nếu tiếp tục mở batch A4: tạo `docs/release-checkpoint-NN-guides.md` mới sau A4 ship.

Sau review feedback từ native / legal reviewer:
- Trigger pass review commits per batch (vd "QA pass round 2 A1").
- Cập nhật `docs/native-legal-review-pending-a1-a3.md` đánh dấu ✓ items đã verify.
