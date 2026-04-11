# Google Play Store Listing Draft

Last updated: 2026-04-11

This draft is specific to the current `viet-nhat-app` repo.

Official references used:

- Google Play preview assets guidance:
  https://support.google.com/googleplay/android-developer/answer/9866151?hl=en-EN
- Google Play target audience and app content:
  https://support.google.com/googleplay/android-developer/answer/9867159?hl=en
- Google Play user data requirements:
  https://support.google.com/googleplay/android-developer/answer/10144311?hl=en

## 1. Core Listing Fields

### App name

`Viet Nhat`

### Short description

Hướng dẫn thực tế cho người Việt tại Nhật: thủ tục, việc làm, thuế, nenkin và đời sống.

### Full description

`Viet Nhat` là ứng dụng hỗ trợ người Việt Nam đang sinh sống tại Nhật Bản.

Ứng dụng tập trung vào các nội dung mà người dùng cần dùng thật trong đời sống hằng ngày:

- thủ tục hành chính
- visa và thẻ cư trú
- việc làm và quyền lợi người lao động
- thuế, nenkin, bảo hiểm
- nhà ở, ngân hàng, chuyển tiền
- gia đình, sinh con, con nhỏ
- tiếng Nhật cơ bản theo tình huống thực tế

Các điểm chính:

- nội dung chi tiết, dễ đọc, dễ làm theo
- bám nguồn chính thức và có ngày cập nhật
- checklist có thể tick trực tiếp trong app
- lưu bookmark, tiến độ checklist và dữ liệu cá nhân ngay trên máy
- nhắc ngày quan trọng bằng local notifications
- AI chat là tính năng tùy chọn khi người dùng tự nhập API key của mình

Phù hợp cho:

- người mới sang Nhật
- du học sinh
- người đi làm
- gia đình người Việt đang sống tại Nhật

Lưu ý:

- Nội dung trong app mang tính chất thông tin và hướng dẫn thực tế.
- Với các quyết định quan trọng liên quan đến visa, thuế, y tế, lao động hoặc hồ sơ cá nhân, người dùng vẫn nên đối chiếu lại với nguồn chính thức.

## 2. Category

Recommended:

- App category: `Books & Reference`

Alternative:

- `Education`

Reason:

- The app is primarily a practical reference tool, not a course-first learning app.

## 3. Contact Details

- Email: `thanhduy8vn@gmail.com`
- Support URL:
  `https://pdythanhduy.github.io/viet-nhat-app/support.html`
- Privacy Policy URL:
  `https://pdythanhduy.github.io/viet-nhat-app/privacy-policy.html`

## 4. Graphics Checklist

Google Play official guidance says:

- a feature graphic is required to publish the store listing
- feature graphic format must be JPEG or 24-bit PNG, no alpha
- feature graphic dimensions must be `1024 x 500`
- you need at least `2` screenshots to publish
- for stronger discovery placement, Google highly recommends at least `4` screenshots with minimum `1080px` resolution

Recommended upload set for this app:

1. Home
2. Thủ tục
3. Việc làm
4. Cuộc sống hằng ngày
5. Tiếng Nhật

## 5. Suggested Screenshot Captions

- Thủ tục và visa theo tình huống thật
- Quyền lợi lao động, thuế và nenkin dễ tra cứu
- Cuộc sống hằng ngày ở Nhật, viết gọn và dễ làm theo
- Checklist và ngày quan trọng lưu ngay trên máy
- Tiếng Nhật cơ bản để dùng ngay trong đời sống

## 6. Feature Graphic Copy

Recommended main line:

`Hướng dẫn thực tế cho người Việt tại Nhật`

Optional secondary line:

`Thủ tục, đời sống, việc làm, thuế và nenkin`

Keep the text short. Google recommends avoiding overloading fine details and keeping key elements centered.

## 7. Play Console Sections To Finish

- [ ] Main store listing
- [ ] App content
- [ ] Data safety
- [ ] Content rating
- [ ] Target audience
- [ ] Ads declaration
- [ ] App access
- [ ] Release production or closed/open testing track

## 8. Recommended Order

1. Upload icon, feature graphic, and screenshots
2. Paste short description and full description
3. Add contact details and privacy policy URL
4. Complete Data safety using `PLAY_DATA_SAFETY_DRAFT.md`
5. Complete target audience and content rating using `PLAY_APP_CONTENT_DRAFT.md`
6. Upload Android release build to internal/closed testing first
