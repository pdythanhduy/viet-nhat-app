# Google Play Console Checklist

Last updated: 2026-04-11

Use this file as the step-by-step sequence for the current Android release of `Viet Nhat`.

## 1. Create or Open the App

- [ ] Sign in to Google Play Console
- [ ] Create app if not created yet
- [ ] App name: `Viet Nhat`
- [ ] Default language: choose the language you want to maintain first
- [ ] App or game: `App`
- [ ] Free or paid: usually `Free`

## 2. Main Store Listing

Use:

- [ ] [PLAY_STORE_LISTING.md](C:/viet-nhat-app/viet-nhat-app/PLAY_STORE_LISTING.md)

Fill:

- [ ] App name
- [ ] Short description
- [ ] Full description
- [ ] App category: `Books & Reference`
- [ ] Support email: `thanhduy8vn@gmail.com`
- [ ] Support URL: `https://pdythanhduy.github.io/viet-nhat-app/support.html`
- [ ] Privacy Policy URL: `https://pdythanhduy.github.io/viet-nhat-app/privacy-policy.html`

## 3. Graphics

Use:

- [ ] [STORE_ASSETS_CHECKLIST.md](C:/viet-nhat-app/viet-nhat-app/STORE_ASSETS_CHECKLIST.md)

Upload:

- [ ] App icon from repo
- [ ] Feature graphic:
  - [ ] [google-play-feature-graphic.png](C:/viet-nhat-app/viet-nhat-app/assets/store/google-play-feature-graphic.png)
- [ ] At least 2 phone screenshots
- [ ] Recommended: 4-5 phone screenshots

Suggested screenshot order:

- [ ] Home
- [ ] Thủ tục
- [ ] Việc làm
- [ ] Cuộc sống hằng ngày
- [ ] Tiếng Nhật

## 4. App Content

Use:

- [ ] [PLAY_APP_CONTENT_DRAFT.md](C:/viet-nhat-app/viet-nhat-app/PLAY_APP_CONTENT_DRAFT.md)

Recommended answers:

- [ ] Target audience: `18 and over`
- [ ] Ads: `No`
- [ ] News app: `No`
- [ ] App access: no login needed for core content
- [ ] Add note that AI is optional and needs user-provided Anthropic API key

## 5. Data Safety

Use:

- [ ] [PLAY_DATA_SAFETY_DRAFT.md](C:/viet-nhat-app/viet-nhat-app/PLAY_DATA_SAFETY_DRAFT.md)

Recommended direction:

- [ ] App is mostly local-first
- [ ] Optional AI sends user-entered prompt content to Anthropic
- [ ] No ads SDK
- [ ] No analytics SDK detected
- [ ] No custom account backend detected
- [ ] No remote push backend detected

## 6. Content Rating

- [ ] Complete Google questionnaire
- [ ] Keep answers consistent with current app behavior
- [ ] Expect a low/general informational rating

## 7. Upload Android Build

Recommended first track:

- [ ] `Internal testing`

Then:

- [ ] Create release
- [ ] Upload Android artifact (`.aab` preferred, `.apk` only if your flow allows it)
- [ ] Add short release note
- [ ] Save

## 8. Review Before Sending Test

- [ ] Store listing has no broken Vietnamese text
- [ ] All URLs open correctly
- [ ] Screenshots match current UI
- [ ] Feature graphic uploaded
- [ ] Data safety saved
- [ ] App content saved
- [ ] Release created successfully

## 9. Test From Play

After internal testing is live:

- [ ] Install from Play testing link
- [ ] Open app first time
- [ ] Test Daily Life screen
- [ ] Test Admin guides
- [ ] Test Jobs screens
- [ ] Test bookmarks
- [ ] Test checklist persistence
- [ ] Test important dates and local reminders
- [ ] Test AI without API key
- [ ] Test AI with API key

## 10. After Internal Testing

- [ ] Fix any Play-binary-only bug
- [ ] Move to closed testing or production when stable
