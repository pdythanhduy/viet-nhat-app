# Device QA Checklist — v1.3.3 (46 new guide)

**Target version**: v1.3.3 (app.json 1.3.3, tag `v1.3.3`)
**Estimated time**: 60–90 phút/platform (iOS + Android = ~3 giờ total)
**Tester**: Human device tester
**Date**: 2026-05-15

---

## Pre-flight

- [ ] Pull main, `git checkout v1.3.3` (sau khi tag tạo).
- [ ] `npm install` clean install (xoá `node_modules` nếu nghi cache).
- [ ] `npm run verify` pass (typecheck + test:ci 251/251 + verify:content 0 issue).
- [ ] iOS: build `eas build --platform ios --profile preview` → install qua TestFlight.
- [ ] Android: `eas build --platform android --profile preview` → install APK trên thiết bị thật.
- [ ] Tham khảo: thiết bị thật bắt buộc (simulator/emulator KHÔNG đủ vì 1 số counter-phrase clipboard + push notification chỉ test trên device thật).

## Test devices recommended

| OS | Device | Why |
|---|---|---|
| iOS | iPhone 12+ với iOS 17+ | Felica + Mobile Suica + Dynamic Type test |
| iOS | iPhone SE (older) | Memory constraint + small screen |
| Android | Pixel 7+ hoặc Galaxy S22+ với Android 13+ | Recent OS + Felica (some markets) |
| Android | Older Android (10) | Backward compat |

Tối thiểu: 1 iPhone + 1 Android. Lý tưởng: + 1 iPad + 1 tablet Android.

---

## A. Regression — flows đã tồn tại từ trước v1.3.3

⚠️ Confirm các flow cũ KHÔNG bị ảnh hưởng bởi content/data changes mới.

### A.1 Home screen
- [ ] Home loads <2s.
- [ ] Quick actions cards (visa-renewal, lost-document, tax-insurance) render đầy đủ.
- [ ] Tap quick action → đúng AdminDetail tương ứng.
- [ ] No console errors / warnings trong dev mode.

### A.2 Admin tab (`AdminScreen.tsx`)
- [ ] Render tất cả **128 guide** không lag / không cắt.
- [ ] Search input giữ query khi navigate qua lại (regression checked earlier).
- [ ] Situation chips điều hướng đúng (residence-card, lost-residence-card, health-insurance, …).
- [ ] Filter / sort hoạt động.

### A.3 Search tab
- [ ] Tìm "động đất" → kết quả earthquake-preparedness + hazard-map.
- [ ] Tìm "NHK" → nhk-contract-guide.
- [ ] Tìm "thuế" → kakutei-shinkoku, juminzei, tax-on-remittance, …
- [ ] Empty search → hiển thị recent / trending.
- [ ] Romaji + tiếng Việt + tiếng Nhật đều tìm được.

### A.4 Important Dates (Reminders feature từ v1.3.2 cycle — commit `4d15606`)
- [ ] Add new reminder → save → list.
- [ ] **Edit** reminder → save → list update đúng.
- [ ] Delete reminder.
- [ ] Notification permission flow: lần đầu mở → xin permission → nếu từ chối, fallback message + link to Settings.
- [ ] Fire notification thật (set deadline 2 phút sau, đợi).
- [ ] Tap notification → app open đến đúng reminder.

---

## B. Smoke test — 46 new guide rendering

Chỉ test render + counter phrase copy. KHÔNG cần đọc kỹ content (đã có review doc separately).

### B.1 Per-guide layout (sample 1 guide từ mỗi category)

| # | Guide | Category | Hero? | Test |
|---|---|---|---|---|
| 1 | `consumer-rights-cooling-off` | daily-law | No | Render đầy đủ steps + faq, scroll smooth |
| 2 | `domestic-violence-dv-support` | daily-law | No | Render đầy đủ, sensitive content hiện đúng |
| 3 | `inheritance-will-japan-foreigners` | daily-law | No | Tax bracket table render đúng (không bị cắt giữa) |
| 4 | `specific-residence-card-my-number-2026` | immigration | No | Steps + FAQ load |
| 5 | `ikusei-shuro-system-guide` | visa | No | Render đầy đủ |
| 6 | `visa-fee-increase-2025-2026` | immigration | No | Fee table render đúng |
| 7 | `tax-on-remittance-to-vietnam` | money | No | Render |
| 8 | `police-questioning-rights-japan` | daily-law | No | Render |
| 9 | `naturalization-kika-2026-changes` | immigration | No | FAQ section dài render OK |
| 10 | `jista-entry-system-guide` | immigration | No | Render |
| 11 | `pet-registration-japan` | daily-law | No | Render |
| 12 | `discrimination-human-rights-support` | daily-law | No | Render |
| 13 | `child-vaccination-schedule` | health | No | Schedule table render đúng |
| 14 | `houterasu-legal-aid-foreigners` | daily-law | No | Render |
| 15 | `mental-health-stress-support` | health | No | Render |
| 16 | `holiday-night-medical-care` | health | No | Render |
| 17 | `child-allowance-jidou-teate` | family | No | Render |
| 18 | `japanese-school-system-children` | family | No | Render |

Cho 28 guide còn lại — random sample 10. Document nếu có guide nào layout bị cắt / scroll lag.

### B.2 Counter phrase clipboard copy

Mỗi guide có 5–9 counter phrase. Test trên 4 guide đại diện:

- [ ] `police-questioning-rights-japan`: long-press 1 phrase JP → "Copied" toast → paste vào Notes → kanji + romaji không bị mojibake.
- [ ] `consumer-rights-cooling-off`: copy 内容証明郵便 template → paste full text đầy đủ.
- [ ] `child-vaccination-schedule`: copy 1 phrase với 漢字 + ひらがな + romaji.
- [ ] `tax-on-remittance-to-vietnam`: copy 1 phrase, paste vào LINE app → render đúng.

### B.3 Long Japanese text render (no cut)

Một số step description / FAQ answer dài. Confirm không bị cắt giữa câu.

- [ ] `consumer-rights-cooling-off` Step 2 (`quickAction.ifLate` block dài về 消費者契約法 grounds)
- [ ] `inheritance-will-japan-foreigners` FAQ Q5 (tax bracket explanation, ~600 chars)
- [ ] `nhk-contract-guide` Step 5 (cooling-off hedge wording)
- [ ] `ikusei-shuro-system-guide` FAQ Q1 (3-year baseline explanation)
- [ ] `jista-entry-system-guide` whole description (kế hoạch + timeline + VN-specific disclaimer)

### B.4 Critical content correction verify (changes từ v1.3.3 source verification)

- [ ] **171 test days** trong `earthquake-preparedness-japan` tip line ~250: hiển thị "ngày 1 và 15 mỗi tháng" (không phải chỉ ngày 1).
- [ ] **Safety tips publisher** ở 4 file `essential-apps-japan-life` / `earthquake-preparedness-japan` / `hazard-map-flood-tsunami-volcano` / `typhoon-evacuation-alerts`: hiển thị "観光庁 / Japan Tourism Agency" (không phải JNTO).
- [ ] **typhoon work-refusal** trong `typhoon-evacuation-alerts` FAQ + commonMistakes: hiển thị "労働契約法 第5条 安全配慮義務" (không phải 労働安全衛生法).
- [ ] **naturalization-2026 FAQ Q "Luật 国籍法 có đổi 2026 không?"**: hiển thị bản updated phân biệt văn bản luật vs 審査運用基準 sửa từ 01/04/2026.
- [ ] **JESTA deadline**: hiển thị "FY2028 (04/2028–03/2029)" — không phải 2026–2030.

### B.5 Official link tap-through (smoke test 5–10 link)

- [ ] FDMA #7119 link mở browser correctly.
- [ ] MHLW 資格確認書 link mở.
- [ ] 観光庁 Safety tips link.
- [ ] 最高裁 NHK PDF link → PDF viewer.
- [ ] 在ベトナム大使館 link.
- [ ] (Test thêm tuỳ).

---

## C. Cross-cut search QA (panic-search reality test)

User trong tình huống thật sẽ tìm gì? Test cả VN + JP + romaji.

### C.1 Disaster scenario
- [ ] `động đất` → earthquake-preparedness-japan đầu list.
- [ ] `bão` → typhoon-evacuation-alerts.
- [ ] `防災バッグ` → guide chứa bag checklist.
- [ ] `罹災証明書` → earthquake + typhoon.
- [ ] `警戒レベル` → typhoon-evacuation-alerts.
- [ ] `171` → earthquake (Step về 171).
- [ ] `núi lửa` → hazard-map.

### C.2 Medical scenario
- [ ] `cấp cứu` → emergency-calls-japan.
- [ ] `119` → emergency-calls-japan.
- [ ] `đau răng` → dentist-visit-japan.
- [ ] `bảo hiểm y tế` → health-insurance + clinic-hospital.
- [ ] `保険証` → liên quan.
- [ ] `救急車` → emergency-calls.
- [ ] `tiêm chủng con` → child-vaccination-schedule.

### C.3 Legal scenario
- [ ] `cảnh sát hỏi` → police-questioning-rights-japan.
- [ ] `黙秘権` → police-questioning.
- [ ] `lừa đảo` → consumer-rights-cooling-off + special-fraud.
- [ ] `bạo lực gia đình` → domestic-violence-dv-support.
- [ ] `DV` → domestic-violence.
- [ ] `thừa kế` → inheritance-will-japan-foreigners.
- [ ] `相続税` → inheritance.

### C.4 Immigration scenario
- [ ] `gia hạn visa` → status-of-residence, visa-fee, residence-card-info-change.
- [ ] `永住` → permanent-residency.
- [ ] `帰化` → naturalization-kika + naturalization-kika-2026-changes.
- [ ] `特定在留カード` → specific-residence-card-my-number-2026.
- [ ] `育成就労` → ikusei-shuro-system-guide.
- [ ] `JESTA` → jista-entry-system-guide.

### C.5 Daily scenario
- [ ] `NHK` → nhk-contract-guide.
- [ ] `mất điện` → electricity-gas-water.
- [ ] `Wi-Fi` → home-internet-wifi.
- [ ] `bưu điện` → post-office-mail-forwarding.
- [ ] `gửi đồ về VN` → post-office.
- [ ] `PayPay` → essential-apps-japan-life.
- [ ] `pet` / `chó` / `mèo` → pet-registration-japan.

---

## D. iOS-specific

### D.1 Dynamic Type
- [ ] Settings > Display & Brightness > Text Size → max XXL.
- [ ] Open 5 guide → confirm text không bị cắt, layout responsive.
- [ ] Heading + body + counter phrase đều scale.

### D.2 Felica / Mobile Suica references
- [ ] Open `essential-apps-japan-life` → step về Mobile Suica + Apple Pay → render đúng.

### D.3 Long-press copy
- [ ] Long-press counter phrase trên iOS 17 → menu Copy hiện.
- [ ] Copied content correct trên paste.

### D.4 Notifications permission
- [ ] Settings > Notifications > [App name] → confirm permission state matches in-app state.
- [ ] Disable notification ở Settings → in-app fallback message hiện rõ.

### D.5 Safe area
- [ ] Test trên iPhone có notch + iPhone SE (no notch).
- [ ] Top + bottom safe area không bị che bởi UI.

---

## E. Android-specific

### E.1 Back button
- [ ] Trong AdminDetail → back hardware button → quay về AdminScreen (không quit app).
- [ ] Multiple back → quay về Home → quit app khi tại Home.

### E.2 Copy clipboard
- [ ] Long-press counter phrase trên Android 13+ → copy.
- [ ] Paste vào Gboard / LINE / Notes → render đúng.

### E.3 Notification channel
- [ ] First reminder fired → notification channel "Important Dates" hiện trong Settings > Apps > [App name] > Notifications.
- [ ] Can disable channel → in-app fallback hiện.

### E.4 Font scaling
- [ ] Settings > Display > Font size → max.
- [ ] Open 5 guide → text scale đúng.

### E.5 Hardware permission
- [ ] `RECEIVE_BOOT_COMPLETED` permission declared trong app.json → confirm notifications survive reboot (set deadline ngày mai, reboot device, đợi).

---

## F. Performance

### F.1 Cold start
- [ ] iOS cold start <3s.
- [ ] Android cold start <4s.
- [ ] Time to first guide-list paint <1s after Home.

### F.2 Scroll
- [ ] Admin list 128 guide: scroll 60fps, không drop frame.
- [ ] Long guide detail: scroll smooth, hero không re-decode mỗi lần scroll.

### F.3 Memory
- [ ] Open 10 guide liên tiếp → quay về Home → check không leak (Xcode Memory Graph / Android Studio Profiler).

---

## G. Accessibility

- [ ] VoiceOver (iOS) / TalkBack (Android) đọc đúng heading + body trong 3 guide.
- [ ] Tap target ≥44dp / 44pt cho mọi button / link.
- [ ] Contrast ratio: text content WCAG AA pass cho dark text on white BG.

---

## H. Regression risk areas

⚠️ Đặc biệt watch — change có thể affect:

- **Counter phrase clipboard** — copy fix nhiều lần trong past releases. Re-test broadly.
- **Search index** — 38 new guide, ~250+ new keywords. Test edge case "không khớp gì" (mojibake input).
- **Long guide detail render** — inheritance guide có table dài, naturalization-2026 có FAQ phức tạp.
- **officialLinks tap** — new deep-link PDF (最高裁 087281_hanrei.pdf, ISA ゼロプラン 001446180.pdf). Test 1–2.

---

## I. Bug log template

Khi tìm thấy bug, log vào đây:

```
### [P0 / P1 / P2] {Short title}

**Device**: iOS 17 iPhone 13 / Android 13 Pixel 7
**Steps**:
1. ...
2. ...
**Expected**: ...
**Actual**: ...
**Screenshot/Video**: (link or attached)
**Workaround**: ...
**Related file**: (suspect file)
```

Priority:
- **P0**: app crash / data loss / security
- **P1**: feature broken or unusable
- **P2**: polish / cosmetic

---

## J. Sign-off

| Item | Status | Notes |
|---|---|---|
| A. Regression flows | ☐ Pass / ☐ Fail | |
| B. New guide rendering | ☐ Pass / ☐ Fail | |
| C. Cross-cut search | ☐ Pass / ☐ Fail | |
| D. iOS-specific | ☐ Pass / ☐ Fail | |
| E. Android-specific | ☐ Pass / ☐ Fail | |
| F. Performance | ☐ Pass / ☐ Fail | |
| G. Accessibility | ☐ Pass / ☐ Fail | |

**Tester name**: _____________
**Date completed**: _____________
**Devices tested**: _____________
**Sign-off**: ☐ Ready to ship / ☐ Needs fix / ☐ Block release

---

## Estimate

- Solo human tester, 2 device (1 iOS + 1 Android): **~3–4 giờ** wall-clock.
- Hai tester parallel: **~1.5–2 giờ** mỗi platform.
- Auto-test có thể cover phần B (render) + C (search) nhưng D + E + F + G cần manual.
