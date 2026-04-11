# Google Play App Content Draft

Last updated: 2026-04-11

This draft covers the Play Console sections around target audience, ads, and content rating preparation.

Official reference used:

- Target audience and app content:
  https://support.google.com/googleplay/android-developer/answer/9867159?hl=en

## 1. Target Audience

Recommended selection:

- `18 and over`

Why:

- The app covers labor rights, visa procedures, tax, pension, housing, childbirth, and legal-adjacent practical guidance.
- It is not designed primarily for children.
- Choosing children-inclusive audiences can trigger extra Families policy obligations that do not fit this app.

## 2. App Category Fit

Recommended app positioning:

- utility / reference app for adults living in Japan

## 3. Ads Declaration

Recommended answer:

- `No`, the app does not contain ads

Repo basis:

- no ads SDK detected
- no ad surfaces detected in app code

## 4. Content Rating Preparation

Expected outcome:

- likely low or general informational rating

Reasoning:

- no explicit sexual content
- no gambling
- no user-to-user social feed
- no graphic violence gameplay
- no extremist or hate-oriented content

Still required:

- complete the official content rating questionnaire in Play Console

## 5. News App Question

Recommended answer:

- `No`, this is not a news app

Reason:

- the app provides practical guidance and reference material
- it is not organized as a news publisher or current-events feed

## 6. App Access

Recommended answer:

- the app does not require reviewer login for core local content
- optional AI feature requires a user-provided Anthropic API key

Use this note if Play Console asks for review instructions:

`Most content is accessible without login. Optional AI chat requires the user to enter their own Anthropic API key in Settings.`

## 7. Health / Government / Financial Sensitivity Note

This app contains practical guidance in areas like labor, tax, pension, visa, and health-system usage.

Recommended handling:

- keep disclaimer language visible in app
- avoid claiming official government status
- avoid promising legal, visa, or medical outcomes

## 8. Final Review Before Submission

- [ ] ads still not present
- [ ] no child-directed section introduced
- [ ] no account-login gate added
- [ ] AI disclaimers still visible
- [ ] no wording suggests official government representation
