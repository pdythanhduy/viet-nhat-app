# Release v1.3.0

Baseline để build / TestFlight / Android preview cho phiên bản v1.3.0.
Bao gồm release notes, store metadata checklist, và runbook lệnh.

- **Cut commit:** `30b05ba` (HEAD on `main` at packaging time, sẽ tag `v1.3.0` trên commit hiện tại sau khi bump app.json)
- **Previous live store version:** `v1.2.0`
- **Internal `v1.4.0` label** từng tồn tại trong `app.json` đã được revert về `1.3.0` để khớp với store sequence (1.2.0 → 1.3.0).
- **Engineering readiness:** PASS (typecheck / 251 tests / verify:content / BJT QA gate)
- **Store readiness:** NOT YET — xem checklist bên dưới

---

## 1. Release notes

### 1.1 Vietnamese (App Store / Play Store "What's new" copy)

**Phiên bản 1.3.0 — Tìm thủ tục nhanh hơn, biết phải nói gì khi tới quầy**

- Cải thiện tốc độ mở app (lazy-load nội dung) và lấy nội dung mới qua remote (Supabase).
- Trang chủ giờ hỏi thẳng "Bạn đang cần làm thủ tục gì?" và có 7 chip tình huống thường gặp (visa hết hạn, chuyển nhà, mất giấy tờ…) đưa thẳng đến kết quả.
- AdminDetail có phần **"Câu tiếng Nhật có thể nói"** kèm romaji + nghĩa Việt + nút copy, hiện có ở 12 thủ tục phổ biến nhất (đăng ký địa chỉ, bảo hiểm y tế, My Number Card, thuế, year-end…).
- Mỗi thủ tục có thêm box **"Tóm tắt nhanh"** đọc 5 giây biết hạn / nơi nộp / mang gì / nếu trễ.
- Saved giờ là tab dưới (không còn phải vào Settings tìm); Settings chuyển lên icon ⚙️ ở Home.
- Sửa 2 chip search trên Home/Admin trước đó cho ra "không có kết quả".

### 1.2 English (optional store fallback)

**v1.3.0 — Find procedures faster, know what to say at the counter**

- Faster cold start (lazy-loaded content) and live remote content fetch (Supabase).
- Home now asks "What do you need to do?" with 7 quick-action chips (visa renewal, moving, lost documents…) that jump straight to filtered results.
- Each admin guide can now show a "**Câu tiếng Nhật có thể nói**" section: ready-made Japanese phrases with romaji, Vietnamese translation, and one-tap copy. Live on 12 high-frequency procedures.
- Every guide also has a 5-second "Tóm tắt nhanh" summary covering deadline / office / bring / if-late.
- Saved is now a bottom tab; Settings moved to a Home header icon.
- Fixed two Home / Admin quick-action queries that previously landed users on empty search results.

---

## 2. Store metadata checklist (v1.3.0)

Bám theo `RELEASE_CHECKLIST.md` mục 2 + cập nhật cho v1.3.0. Item đánh dấu **[NEW since 1.2.0]** là thay đổi khiến phải làm lại từ phiên bản đang live trên store.

### 2.1 Listing fields

- [ ] Tên app hiển thị (iOS) — chốt
- [ ] Tên app hiển thị (Android) — chốt
- [ ] Subtitle / short description — chốt
- [ ] Full description — viết
- [ ] Keywords iOS — chốt
- [ ] Category iOS — chọn (gợi ý: `Reference` hoặc `Education`)
- [ ] Category Android — chọn (gợi ý: `Education` hoặc `Books & Reference`)
- [ ] Email support — chuẩn bị
- [ ] Support URL — chuẩn bị (đã có `gh-pages` cho privacy/terms; xem có dùng cùng host được không)
- [ ] **[NEW since 1.2.0]** "What's new" copy — copy từ §1.1 trên

### 2.2 Visual assets

- [x] Icon 1024×1024 — đã có trong repo
- [ ] Feature graphic Google Play — chưa
- [ ] **[NEW since 1.2.0]** Screenshots — **PHẢI CHỤP LẠI** vì UI đổi nhiều so với 1.2.0:
  - Home (hero text mới + Search CTA + 7 quick action chips)
  - AdminDetail (box "Tóm tắt nhanh" mới + section "Câu tiếng Nhật có thể nói")
  - Admin (situation chips ở trên + export demote)
  - Bottom tab (Saved thay cho Settings)
  - 5 màn hình tối thiểu, theo size:
    - iPhone 6.7"
    - iPhone 6.5" (nếu cần)
    - Android phone
    - Tablet (nếu support)

### 2.3 Privacy / legal

- [x] Privacy Policy hosted (gh-pages)
- [x] Terms of Use hosted (gh-pages)
- [x] Support URL public
- [ ] **[NEW since 1.2.0]** Apple App Privacy "Data Collection" disclosure — review xem v1.3.0 có thay đổi gì về collection không. Lưu ý: counterPhrases UI có copy-to-clipboard — không thu thập gì từ user; Supabase fetch là one-way (read content), không upload user data.
- [ ] Google Play Data Safety form — review tương tự

---

## 3. Runbook — tag và build v1.3.0

### 3.1 Version state (sau khi rewrite)

```
package.json  "version": "1.3.0"   ← giữ nguyên (đã đúng)
app.json      "version": "1.3.0"   ← đã revert từ "1.4.0"
```

Cả hai khớp = `1.3.0`. EAS sẽ build ra v1.3.0 đúng nhãn store. Apple `buildNumber` và Android `versionCode` do EAS quản lý remote (`appVersionSource: "remote"` trong `eas.json`).

### 3.2 Pre-flight (chạy ngay trước tag)

```bash
# 1. Verify clean tree + on main + in sync
git status                                # phải clean
git branch --show-current                 # phải = main
git rev-list --left-right --count origin/main...HEAD  # phải = "0  0"

# 2. Verify chain (bắt buộc trước khi tag)
npm run verify                            # = typecheck + test:ci + verify:content
```

### 3.3 Tag command

Sau khi pre-flight pass:

```bash
git tag -a v1.3.0 -m "v1.3.0 — first store release after 1.2.0

Bundles all dev work since v1.2.0, including the internally-cut 1.4.0
that never shipped (lazy-load + Supabase) plus the new Home / Admin /
Search UX, counterPhrases, and regression fixes.

Highlights:
- Lazy-load infrastructure (Phase 1A + 1B) for faster cold start
- Supabase live remote-content fetch behind feature flag (Phase 2)
- Home: search CTA + 7 quick-action chips
- AdminDetail: Tóm tắt nhanh + Câu tiếng Nhật có thể nói (12 guides)
- Admin: situation chips, demoted export panel
- Nav: Saved tab, Settings via Home header icon
- Fix: broken Home/Admin search quick-action queries

Engineering readiness: PASS (typecheck + 251/251 tests + verify:content)
Store readiness: see docs/release-v1.3.0.md"

git push origin v1.3.0
```

(Optional retroactive tag for v1.2.0 nếu muốn lịch sử rõ — cần biết commit nào tương ứng v1.2.0 trên store.)

### 3.4 EAS build commands

Theo `eas.json` profiles (xác nhận trước khi chạy: `cat eas.json`):

**Android preview** (internal build / APK download để test trên máy):
```bash
eas build -p android --profile preview
```

**iOS preview / TestFlight**:
```bash
# Cần hoàn tất Apple Distribution credentials trước (interactive):
eas credentials
# Sau đó:
eas build -p ios --profile preview
```

> ⚠️ Theo `RELEASE_CHECKLIST.md` mục 1, iOS preview vẫn **block credentials** từ trước — cần user resolve trước khi build pass. EAS không tìm thấy iOS creds non-interactive.

**Production builds** (sau khi preview pass + device test):
```bash
eas build -p android --profile production
eas build -p ios --profile production
# Hoặc auto-submit nếu eas.json đã config submit:
eas build -p android --profile production --auto-submit
eas build -p ios --profile production --auto-submit
```

### 3.5 Post-build device verification

Trước khi push lên TestFlight / internal track public:

| Flow | Verify |
|---|---|
| Cold start | < 3s đến Home; không crash; lazy-load không gây flicker content |
| Home hero | Text "Bạn đang cần làm thủ tục gì?" hiện đúng, không bị cắt |
| Home Search CTA | Tap → mở SearchScreen với input rỗng + autoFocus |
| Home 7 quick action chips | Mỗi chip → đúng route (5 chip vào Search có prefill, "Tôi mới đến" → JourneyChecklist, "Khẩn cấp" → EmergencyHub) |
| Home settings icon | Tap ⚙️ ở header → mở Settings stack screen |
| Bottom tab | Hiển thị 5 tab: Home · Admin · Jobs · Japanese · Saved |
| Saved tab | Mở SavedScreen, không lỗi route param |
| Admin situation chips | 8 chip ở trên → search prefill + category filter đúng |
| Admin export panel | Đã chuyển xuống dưới resultsCount; vẫn bấm được |
| AdminDetail "Tóm tắt nhanh" | Box xuất hiện trên quickAction (4 dòng: deadline/office/bring/ifLate) |
| **AdminDetail "Câu tiếng Nhật có thể nói"** | Section render đúng giữa "Tóm tắt nhanh" và "Việc cần làm ngay" trên 12 guides có phrases |
| **Phrase render** | Kanji rõ (在留 / 国民健康保険 / 確定申告 / 粗大ごみ); romaji italic xám; VN secondary; note muted |
| **Copy button** | Tap → clipboard chứa string JP; alert "Đã copy" hiện |
| AdminDetail trên 67 guide khác (không có phrases) | Section ẩn hoàn toàn, không khoảng trắng dư |
| Search prefill | Tap chip Home → Search mở với query đã điền + có results > 0 (đặc biệt 5 chip đã sửa) |
| Supabase remote fetch | Nếu `EXPO_PUBLIC_REMOTE_CONTENT_ENABLED=true` — content load từ remote không crash; fallback về local nếu offline |
| Android tab labels | "Tiếng Nhật" không bị cắt 2 dòng |
| iOS safe area | Hero không đè notch; bottom tab không đè home indicator |
| Font BeVietnamPro | Render đầy đủ kanji + hiragana cho counterPhrases |
| Scroll smoothness | Vào AdminDetail có 6 phrase cards + steps + FAQ → mượt, không jank |

### 3.6 Hậu kỳ store

- [ ] Cập nhật "What's new" trong App Store Connect / Play Console với copy ở §1.1
- [ ] Upload screenshots mới đã chụp (xem §2.2)
- [ ] Re-verify Apple App Privacy / Google Play Data Safety
- [ ] Submit for review
- [ ] Theo dõi review feedback

---

## 4. Rollback plan

Nếu v1.3.0 phát sinh issue critical sau khi ship:

1. **Trên store** — pause rollout (Play Console) hoặc remove from sale (App Store Connect)
2. **Trên git** — revert commit theo thứ tự ngược, bắt đầu từ commit gây regression
3. **Hotfix path** — branch off v1.3.0 tag:
   ```bash
   git checkout -b hotfix/v1.3.1 v1.3.0
   # ... fix ...
   git tag -a v1.3.1 -m "v1.3.1 — hotfix"
   eas build -p android --profile production
   eas build -p ios --profile production
   ```

Đặc biệt, các change point dễ rollback gọn nếu issue cụ thể:
- counterPhrases section → comment block render trong `AdminDetailScreen.tsx`
- Tab swap Settings ↔ Saved → revert commit `eb32b43`
- Quick action queries → revert commit `5f6e354` (lưu ý: revert sẽ trở lại 0-hits queries; ưu tiên fix-forward)
- Supabase remote fetch → tắt feature flag `EXPO_PUBLIC_REMOTE_CONTENT_ENABLED=false` (không cần code change)
