# Release Checklist

Checklist này bám sát repo `viet-nhat-app` hiện tại. Mục tiêu là đưa app lên Apple App Store và Google Play theo thứ tự chắc chắn, để submit xong không bị review trả về vì lỗi có thể thấy trước.

## 1. Kỹ thuật build và config

- [x] Co `bundleIdentifier`: `com.vietnhat.app`
- [x] Co `package`: `com.vietnhat.app`
- [x] Co `version`: `1.0.0`
- [x] Da them `ios.buildNumber = "1"`
- [x] Da them `android.versionCode = 1`
- [x] Da scaffold `eas.json`
- [x] Đã cài `eas-cli`
- [x] Đã đăng nhập Expo account
- [ ] Hoàn tất credentials cho cả iOS và Android:
  - Apple Distribution certificate / provisioning profile
  - Android keystore
- [ ] Chạy build thử bản preview còn thiếu:
  - `eas build -p ios --profile preview`
- [x] Android preview build đã tạo thành công
- [ ] Cài lên máy thật và test notification local, saved data, AI chat, checklist persistence
- [x] Da `eas init` va link project EAS: `@tt-duy/viet-nhat-app`
- [x] `eas build:configure` da pass

### Blocker kỹ thuật đang thấy trong repo

- [x] `app.json` da duoc sua sach va co ten app `Viet Nhat`
- [x] Repo da co `eas.json` va da connect voi EAS project that
- [x] Da `eas login`
- [x] Da bo `SCHEDULE_EXACT_ALARM` khoi `app.json` de giam rui ro policy Play
- [ ] Can xac nhan notification local van dat hanh vi mong muon tren binary release Android that
- [x] Android preview build da tao thanh cong tren EAS
- [ ] iOS preview build con blocker credentials Apple cho internal distribution
- [ ] EAS không tìm thấy iOS credentials phù hợp trong non-interactive mode; cần hoàn tất bằng bước interactive
- [x] Da them `ios.infoPlist.ITSAppUsesNonExemptEncryption = false`
- [x] Da them `cli.appVersionSource = remote` vao `eas.json`
- [ ] Chua thay quy trinh build native da duoc thu tren binary release, moi chi pass TypeScript/Jest

## 2. Metadata store

- [x] Đã có draft metadata ở `STORE_METADATA_DRAFT.md`
- [x] Đã có draft checklist ảnh chụp màn hình ở `STORE_ASSETS_CHECKLIST.md`
- [ ] Chốt tên app hiển thị:
  - iOS App Name
  - Android App Name
- [ ] Chot subtitle / short description
- [ ] Viet full description cho store
- [ ] Chuan bi keyword iOS
- [ ] Chon category:
  - iOS: likely `Reference` hoac `Education`
  - Android: likely `Education` hoac `Books & Reference`
- [ ] Chuan bi email support
- [ ] Chuan bi website support hoac page support toi thieu
- [x] Icon `1024x1024` hiện có trong repo
- [ ] Chuẩn bị screenshots:
  - iPhone 6.7"
  - iPhone 6.5" neu can
  - Android phone
  - tablet neu ban muon support tablet ro rang
- [ ] Chuẩn bị feature graphic cho Google Play

### Noi dung metadata nen viet dua tren app hien tai

- Thu tuc hanh chinh cho nguoi Viet tai Nhat
- Guide visa, lao dong, thue, nenkin, sinh con, nha o, ngan hang
- Nhac ngay quan trong bang local notifications
- Luu checklist/bookmark local
- AI chat voi API key do nguoi dung tu nhap

## 3. Privacy và legal

- [x] Da draft `PRIVACY_POLICY.md`
- [x] Da draft `TERMS_OF_USE.md`
- [x] Đã chuẩn bị bản HTML public trong thư mục `docs/`
- [x] Đã đẩy nhánh `gh-pages` lên GitHub
- [x] Đã bật GitHub Pages / static hosting cho `docs`
- [x] Đưa Privacy Policy lên public URL
- [x] Đưa Terms of Use / Terms of Service lên public URL
- [x] Có Support URL public
- [ ] Kiem tra data disclosure cho App Store / Play Console

### Data va hanh vi app hien tai can khai bao can than

- [ ] App co local notifications (`expo-notifications`)
- [ ] App co `expo-secure-store` de luu Claude API key tren thiet bi
- [ ] App co man AI chat gui prompt cua nguoi dung truc tiep toi Anthropic bang API key do nguoi dung tu nhap
- [ ] App co feedback qua email `mailto:`
- [ ] App khong thay co account system rieng, khong thay backend rieng, khong thay analytics/ad SDK, khong thay IAP/subscription

### Blocker privacy/legal dang thay trong repo

- [ ] Chua co Privacy Policy URL public
- [ ] Chua co Terms URL public
- [ ] Can viet review note cho Apple de giai thich:
  - AI feature chi hoat dong khi nguoi dung tu nhap API key rieng
  - key duoc luu local trong SecureStore
  - app khong ban API key, khong tao tai khoan AI ben trong app

## 4. Policy store và review risk

- [ ] Xac nhan app khong huong dan hanh vi phi phap, khong cam ket tu van phap ly/chinh phu chinh thuc
- [ ] Kiem tra disclaimer da ro o cac man noi dung nhay cam
- [ ] Kiem tra AI answer screen co canh bao AI co the sai
- [ ] Kiem tra noi dung lao dong/visa/y te khong dung giong dich vu phap ly co phi
- [ ] Kiem tra permission notifications co mo ta hop ly trong phan review

### Risk review cần xử lý trước khi submit

- [x] Da sua loi encoding o:
  - `src/screens/FeedbackScreen.tsx`
  - `src/screens/SettingsScreen.tsx`
  - `src/screens/AIChatScreen.tsx`
  - `src/utils/notifications.ts`
- [ ] Cần rà thêm bằng mắt trên máy thật để chắc không còn text lỗi ở các màn chưa mở trong quá trình sửa

## 5. Test trước submit

- [x] `npm run typecheck`
- [x] `npm test -- --runInBand`
- [ ] Test preview/release Android trên máy thật
- [ ] Test preview iOS trên TestFlight/Internal testing
- [ ] Test 100% cac flow quan trong:
  - mo app lan dau
  - bookmarks
  - guide checklist
  - labor help checklist
  - important dates + local notifications
  - AI chat co API key
  - AI chat khong co API key
  - feedback mailto
  - deep content screens khong crash
- [ ] Test offline:
  - content local van doc duoc
  - AI chat fail graceful
- [ ] Test doi ngon ngu / romaji / ky tu tieng Nhat hien thi dung
- [ ] Test tren man hinh nho va lon

## 6. Thứ tự khuyến nghị để release chắc nhất

1. Chụp bộ screenshots theo `STORE_ASSETS_CHECKLIST.md`
2. Hoàn tất `eas build -p ios --profile preview`
3. Cài lên máy thật và test các flow quan trọng
4. Chốt metadata store
5. Build `production`
6. Upload lên TestFlight và Play Internal testing
7. Sửa bug cuối nếu có
8. Submit App Store / Play Console

## 7. Lenh se dung

```bash
npm run typecheck
npm test -- --runInBand
eas login
eas build:configure
eas build -p android --profile preview
eas build -p ios --profile preview
eas build -p android --profile production
eas build -p ios --profile production
eas submit -p android --latest
eas submit -p ios --latest
```

## 8. Đánh giá hiện tại

Repo hiện đã ở mức:

- nội dung app rất mạnh
- local persistence ổn định
- typecheck/test pass
- Android preview build đã có
- metadata draft và screenshot checklist đã có

Nhưng chưa nên submit ngay vì còn 3 blocker lớn:

1. chưa chụp bộ screenshots/store assets hoàn chỉnh
2. chưa test binary thật trên cả Android và iOS
3. iOS preview build vẫn cần hoàn tất nhánh Apple credentials / signing
