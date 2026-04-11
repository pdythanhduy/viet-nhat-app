# Release Checklist

Checklist nay bam sat repo `viet-nhat-app` hien tai. Muc tieu la dua app len Apple App Store va Google Play theo thu tu chac chan, de submit xong khong bi review tra ve vi loi co the thay truoc.

## 1. Ky thuat build va config

- [x] Co `bundleIdentifier`: `com.vietnhat.app`
- [x] Co `package`: `com.vietnhat.app`
- [x] Co `version`: `1.0.0`
- [x] Da them `ios.buildNumber = "1"`
- [x] Da them `android.versionCode = 1`
- [x] Da scaffold `eas.json`
- [ ] Cai `eas-cli` va dang nhap Expo account:
  - `npm i -g eas-cli`
  - `eas login`
- [ ] Chay `eas build:configure`
- [ ] Tao credentials cho iOS va Android:
  - Apple Distribution certificate / provisioning profile
  - Android keystore
- [ ] Build thu ban release:
  - `eas build -p android --profile preview`
  - `eas build -p ios --profile preview`
- [ ] Cai len may that va test notification local, saved data, AI chat, checklist persistence

### Blocker ky thuat dang thay trong repo

- [x] `app.json` da duoc sua sach va co ten app `Viet Nhat`
- [ ] Repo chua co `eas.json` truoc do, da scaffold nhung chua connect voi Expo project that
- [ ] May hien tai chua `eas login`, nen chua the chay `eas project:info`, `eas build:configure` hoac build cloud
- [x] Da bo `SCHEDULE_EXACT_ALARM` khoi `app.json` de giam rui ro policy Play
- [ ] Can xac nhan notification local van dat hanh vi mong muon tren binary release Android that
- [ ] Chua thay quy trinh build native da duoc thu tren binary release, moi chi pass TypeScript/Jest

## 2. Metadata store

- [ ] Chot ten app hien thi:
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
- [ ] Chuan bi icon 1024x1024 cho store
- [ ] Chuan bi screenshots:
  - iPhone 6.7"
  - iPhone 6.5" neu can
  - Android phone
  - tablet neu ban muon support tablet ro rang
- [ ] Chuan bi feature graphic cho Google Play

### Noi dung metadata nen viet dua tren app hien tai

- Thu tuc hanh chinh cho nguoi Viet tai Nhat
- Guide visa, lao dong, thue, nenkin, sinh con, nha o, ngan hang
- Nhac ngay quan trong bang local notifications
- Luu checklist/bookmark local
- AI chat voi API key do nguoi dung tu nhap

## 3. Privacy va legal

- [x] Da draft `PRIVACY_POLICY.md`
- [x] Da draft `TERMS_OF_USE.md`
- [ ] Dua Privacy Policy len public URL
- [ ] Dua Terms of Use / Terms of Service len public URL
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

## 4. Policy store va review risk

- [ ] Xac nhan app khong huong dan hanh vi phi phap, khong cam ket tu van phap ly/chinh phu chinh thuc
- [ ] Kiem tra disclaimer da ro o cac man noi dung nhay cam
- [ ] Kiem tra AI answer screen co canh bao AI co the sai
- [ ] Kiem tra noi dung lao dong/visa/y te khong dung giong dich vu phap ly co phi
- [ ] Kiem tra permission notifications co mo ta hop ly trong phan review

### Risk review can xu ly truoc khi submit

- [x] Da sua loi encoding o:
  - `src/screens/FeedbackScreen.tsx`
  - `src/screens/SettingsScreen.tsx`
  - `src/screens/AIChatScreen.tsx`
  - `src/utils/notifications.ts`
- [x] Da ra soat lai `src`, `App.tsx`, `app.json` va khong con match chuoi mojibake theo regex quet release

## 5. Test truoc submit

- [x] `npm run typecheck`
- [x] `npm test -- --runInBand`
- [ ] Test release build Android tren may that
- [ ] Test release build iOS tren TestFlight/Internal testing
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

## 6. Thu tu khuyen nghi de release chac nhat

1. Sua het loi encoding tren cac screen con lai
2. Chot privacy policy + terms URL
3. Xac nhan co giu hay bo `SCHEDULE_EXACT_ALARM`
4. Build `preview` bang EAS
5. Cai len may that va test het flow
6. Chuan bi metadata + screenshots
7. Build `production`
8. Upload len TestFlight va Play Internal testing
9. Sua bug cuoi cung neu co
10. Submit App Store / Play Console

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

## 8. Danh gia hien tai

Repo da dat muc:

- noi dung app rat manh
- local persistence on dinh
- typecheck/test pass

Nhung chua nen submit ngay vi con 3 blocker lon:

1. con loi encoding text o nhieu screen quan trong
2. chua co privacy policy / terms URL
3. chua test binary release that tren EAS
