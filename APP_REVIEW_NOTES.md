# App Review Notes

Use this note when preparing App Store review notes or internal release documentation.

## App Summary

`Viet Nhat` is an informational app for Vietnamese users living in Japan.

The app provides:

- administrative guides,
- labor and daily-life guidance,
- tax and pension basics,
- family and housing guidance,
- Japanese and BJT-style study support,
- local reminder notifications,
- optional AI chat.

## AI Feature Explanation

The AI feature is optional.

Important implementation details:

- the app does not create AI accounts for users,
- the app does not issue or sell API keys,
- users manually enter their own Anthropic API key,
- the API key is stored locally on device using secure storage,
- prompts are sent directly from the app to Anthropic using the user-provided key.

If no API key is entered, the AI feature does not function.

## Notifications Explanation

The app uses local notifications only.

Current notification use cases:

- user-created important dates, such as deadlines and expiry reminders,
- optional daily study reminders,
- optional word-of-the-day style reminders.

The app does not currently run its own remote push notification backend.

## Encryption Declaration

The current Expo config declares:

- `ITSAppUsesNonExemptEncryption = false`

This should still be reviewed against the app's final functionality and any future SDK/library changes before App Store submission.

## Data Handling Summary

- no custom account system
- no proprietary backend for user profiles
- no ads SDK detected in current app
- no in-app purchases detected in current app
- user content such as bookmarks, checklists, reminder dates, study progress, and chat history is stored locally on device

## BJT Content Clarification

- the BJT module contains original BJT-style practice content,
- it does not claim to include official BJT exam questions,
- it is designed as study support and practice content only.

## Support Contact

- Email: `thanhduy8vn@gmail.com`