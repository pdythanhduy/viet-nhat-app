# App Review Notes

Use this note when preparing App Store review notes or internal release documentation.

## App Summary

`Viet Nhat` is an informational app for Vietnamese users living in Japan.

The app provides:

- administrative guides,
- labor and daily-life guidance,
- tax and pension basics,
- family and housing guidance,
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

The app uses local notifications only for user-created reminder dates, such as deadlines and expiry reminders.

The app does not currently run its own remote push notification backend.

## Data Handling Summary

- no custom account system
- no proprietary backend for user profiles
- no ads SDK detected in current app
- no in-app purchases detected in current app
- user content such as bookmarks, checklists, reminder dates, and chat history is stored locally on device

## Support Contact

- Email: `thanhduy8vn@gmail.com`

