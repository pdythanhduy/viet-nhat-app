# Cẩm Nang Việt Nhật

> A mobile app that helps Vietnamese people living in Japan handle administrative procedures, daily life, work, practical Japanese, important dates, and saved notes — all in Vietnamese.

**Current version:** see `app.json` (`expo.version`) — currently `1.3.3`.

---

## Purpose

Hỗ trợ người Việt sống ở Nhật xử lý thủ tục, đời sống, việc làm, tiếng Nhật thực tế, ngày quan trọng và nội dung cần lưu — bằng tiếng Việt, không cần biết tiếng Nhật thành thạo.

## Tech stack

- **Expo** SDK 54 + **React Native** 0.81 + **React** 19
- **TypeScript** (strict-ish, `npm run typecheck`)
- **React Navigation** v6 (`@react-navigation/native`, `native-stack`, `bottom-tabs`)
- **AsyncStorage** (`@react-native-async-storage/async-storage`) for local persistence
- **Expo Notifications** for important-date reminders
- **Supabase** (`@supabase/supabase-js`) — listed dependency, used in select sync paths only
- **Expo Font** (`@expo-google-fonts/be-vietnam-pro`)
- **Jest** + **jest-expo** for unit tests

See `package.json` for the canonical list.

## Main modules

| Module | Screen / area | Notes |
|---|---|---|
| Home | `HomeScreen` | Greeting, search CTA, situation chips, personalized actions, alerts, recent items, category grid |
| Admin guides (Thủ tục) | `Admin*` screens + `src/constants/content/adminGuides/` | 120+ guides on visa, tax, insurance, residence, family, etc. |
| Daily Life | `DailyLife*` screens + `src/constants/content/dailyLife/` | Banking, hospital, trash, transportation, seasons, etc. |
| Jobs / Labor | `Jobs*`, `LaborGuide`, `LaborHelp` | Job-hunt, labor rights, dispute paths |
| Japanese learning | `Japanese*`, `JapaneseKana*` screens | Phrases, kana, practice & quiz modes |
| BJT (Business Japanese) | `BJT*` screens + `src/constants/content/bjt.ts` | Vocab, keigo, scenarios, mock tests, 12-week plan |
| Stories | `Story*` screens + `src/constants/content/stories/` | Reading + vocab dashboard |
| Saved / Bookmarks | `SavedScreen` + `utils/bookmarks` | Pinned + recent saves across types |
| Important dates / reminders | `ImportantDatesScreen` + `utils/notifications` | Local notifications scheduling |
| Search | `SearchScreen` + `utils/searchIndex` | Cross-module text search |
| Settings | `SettingsScreen` | Profile, font, notification toggles |
| **AI Mail Translation** | `MailTranslate*` screens (`MailTranslateIntro` / `MailCapture` / `MailProcessing` / `MailResult`) | **Internal prototype only — NOT exposed in production UI.** See [Product rule](#product-rule-ai-mail-translation) below. |

## How to run

```bash
npm install
npm start             # Expo dev server (Metro bundler)
npm run ios           # iOS simulator (macOS only)
npm run android       # Android emulator / device
npm run web           # Web preview
```

## Quality checks

```bash
npm run typecheck         # tsc --noEmit (must PASS)
npm run test:ci           # jest --runInBand
npm run verify            # typecheck + test:ci + content audits
npm run verify:precommit  # typecheck + content audits (also runs via pre-commit hook)
```

Content-specific checks:
- `npm run content:audit-encoding` — encoding sweep across content files
- `npm run bjt:qa-checklist:gate` — BJT QA gate (zero warnings allowed)
- `npm run content:qa-admin-guides` — admin-guides Jest QA

## Release overview

- **`app.json`** — Expo config (name, slug, version, bundle ID, plugins, icons).
- **`eas.json`** — EAS build / submit profiles (development / preview / production).
- **`CHANGELOG.md`**, `RELEASE_CHECKLIST.md`, `PLAY_*.md`, `APP_REVIEW_NOTES.md` — store metadata, reviewer notes, release process.

Builds + submissions go through **EAS Build** and **EAS Submit** for both iOS App Store and Google Play.

---

## Product rule: AI Mail Translation

**AI Dịch Thư Nhật Phase 1 is an internal prototype only. Do not add a Home / Settings entry point until Phase 2 / Phase 3 conditions are ready.**

The four `MailTranslate*` screens registered in `RootStackParamList` are scaffolding only — they use local sample data, not real AI. Exposing them as a user-visible feature would risk users uploading sensitive letters expecting real analysis, misplaced trust in the "AI confidence" labels, and Apple Review "deceptive functionality" flags.

Before adding any entry point, read **[`docs/feature-ai-mail-translate-decision-log.md`](docs/feature-ai-mail-translate-decision-log.md)** and verify that the 6 exposure conditions are all ✅:

1. Real AI / backend ready
2. Consent screen ready
3. Privacy Policy reviewed
4. Cost / rate-limit decided
5. Tested with anonymized real letters
6. App Store privacy / review risk checked

Full audit + Phase 2 implementation plan: [`docs/feature-translate-japanese-mail-audit.md`](docs/feature-translate-japanese-mail-audit.md). Cost model: [`docs/feature-mail-translate-cost-estimate.md`](docs/feature-mail-translate-cost-estimate.md).

---

## More docs

- [`docs/source-overview-current.md`](docs/source-overview-current.md) — architecture snapshot, modules, AI Mail status, known risks, next-work recommendations.
- [`docs/`](docs/) — design audits, content roadmaps, release notes, review docs.
