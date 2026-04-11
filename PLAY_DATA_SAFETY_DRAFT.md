# Google Play Data Safety Draft

Last updated: 2026-04-11

This is a recommended declaration draft based on the current repo implementation.

Important:

- This is an engineering draft, not a legal guarantee.
- Google Play requires you to disclose the sum of data practices across all versions distributed on Play.
- Review again before production release if app behavior changes.

Official references used:

- Data safety form overview:
  https://support.google.com/googleplay/android-developer/answer/10787469?hl=en
- Data types and purposes reference:
  https://support.google.com/googleplay/answer/11416267?hl=en&p=data-safety
- User Data policy:
  https://support.google.com/googleplay/android-developer/answer/10144311?hl=en

## 1. Current Repo-Based Assessment

Observed in repo:

- local storage via `@react-native-async-storage/async-storage`
- secure local storage via `expo-secure-store`
- local notifications via `expo-notifications`
- optional AI chat using user-provided Anthropic API key
- feedback uses `mailto:` through the user's email app
- no custom backend detected
- no analytics SDK detected
- no ads SDK detected
- no in-app purchases detected
- no account system detected

## 2. Recommended Top-Level Answers

### Does your app collect or share any of the required user data types?

Recommended answer:

- `Yes`

Reason:

- AI prompts entered by the user are sent off device to Anthropic when the AI feature is used.

### Is all of the user data collected encrypted in transit?

Recommended answer:

- `Yes`

Reason:

- API communication is expected to use HTTPS/TLS.

### Do you provide a way for users to request that their data is deleted?

Recommended answer:

- `No`

Reason:

- There is no account backend or server-side user profile managed by the app developer.
- Most app data is stored locally on device and can be removed locally by the user.

Note:

- This is a practical inference from the current implementation, not legal advice.

## 3. Data Types Recommended For Disclosure

### Other user-generated content

Recommended declaration:

- `Collected`: Yes
- `Shared`: No
- Purpose:
  - `App functionality`

Reasoning:

- AI prompts and user-entered open-ended text sent to Anthropic fit closest to "Other user-generated content" based on Google's category examples.
- This content is transmitted off device when the optional AI feature is used.
- It does not appear to be shared for ads or sold onward by the app itself.

### Other in-app messages

Conservative option:

- If you treat AI chat exchanges as chat content rather than open-ended content, you may instead declare:
  - `Collected`: Yes
  - `Shared`: No
  - Purpose: `App functionality`

Recommendation:

- Use one category consistently.
- For this app, `Other user-generated content` is the cleaner fit.

## 4. Data Types Likely Not Required To Declare As Collected

These appear to stay on-device only in the current implementation:

- bookmarks
- checklist progress
- important dates
- local AI chat history
- local preferences
- stored API key in secure storage

Because Google's Data safety form focuses on data transmitted off device, purely on-device storage generally does not need to be declared as collected.

## 5. Data Sharing Recommendation

Recommended answer:

- `No`, the app itself does not appear to share user data with third parties in the Play data-safety sense for ads/data brokerage.

Important nuance:

- AI prompt data is transmitted to Anthropic to provide the feature.
- Whether you mark this as "shared" depends on Google's exact interpretation for your service-provider relationship.
- Based on current public guidance, service-provider processing is commonly handled as collection rather than third-party sharing, but you should review the form carefully at submission time.

## 6. Security Practices Notes

Current repo supports these statements:

- local API key storage uses secure storage where available
- user-entered reminders/bookmarks/checklists stay on device
- no proprietary backend for user accounts detected

## 7. Plain-Language Summary For Internal Use

Recommended internal summary:

- The app is mostly local-first.
- The only obvious off-device data flow in current code is the optional AI request to Anthropic, triggered only after the user manually enters their own API key.

## 8. What To Recheck Before Production

- [ ] confirm no analytics SDK was added
- [ ] confirm no crash reporting SDK was added
- [ ] confirm no remote push backend was added
- [ ] confirm AI requests still go directly to Anthropic
- [ ] confirm no new server-side feedback form or account system was added
