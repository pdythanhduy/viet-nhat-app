# Cẩm Nang Việt Nhật — Source Overview (Current)

**Snapshot date:** 2026-05-15
**App version:** 1.3.3 (see `app.json`)
**Default branch:** `main`

A bird's-eye view of what's in the repo right now and where things live. Designed to be read in 5 minutes by a new contributor (or future-me) before touching code.

---

## 1. Architecture summary

- **Single React Native (Expo) app** — no separate web/native split, no monorepo, no backend repo.
- **TypeScript everywhere** under `src/`.
- **Content-heavy**: most "data" is statically authored TypeScript files under `src/constants/content/**`, not API-fetched. Bundle size is intentional — offline-first.
- **Local persistence** via `AsyncStorage` for bookmarks, profile, reading progress, important-date schedules.
- **No production backend** at the moment. `@supabase/supabase-js` is a dependency but used only in narrow sync paths; the app works fully offline.
- **Navigation** is one Native Stack at the root, with a Bottom Tab nested at `MainTabs`.
- **Pre-commit hook** (`scripts/setup-git-hooks.js`) runs encoding audit + BJT QA + typecheck before each commit.

## 2. Main navigation structure

Defined in `src/navigation/AppNavigator.tsx`.

```
RootStack (Native Stack)
├── MainTabs (Bottom Tab)
│   ├── Home          → HomeScreen
│   ├── Admin         → AdminScreen
│   ├── Jobs          → JobsScreen
│   ├── Japanese      → JapaneseScreen
│   └── Saved         → SavedScreen
├── AdminDetail / DailyLife / DailyLifeDetail
├── BJT*  (Vocabulary / Keigo / Scenarios / DocumentMock / BusinessToolkit /
│           LanguageAssets / JobDocs / ReadingPassages / Flashcards /
│           UltimateStudyPlan / MockExamsV2 / Quiz / MockTest / Review)
├── Japanese*  (Practice / Quiz / Kana / KanaQuiz)
├── Feedback / LaborGuide / LaborHelp
├── JourneyChecklist / EmergencyHub / Search
├── Settings / ImportantDates
├── Story*  (Hub / Reading / VocabDashboard)
└── MailTranslate*  (Intro / Capture / Processing / Result)   ← internal only
```

Tabs are intentionally only 5 (Home / Admin / Jobs / Japanese / Saved). Everything else is reachable via push navigation.

## 3. Main product modules

| Module | Source location | Content size |
|---|---|---|
| Home | `src/screens/HomeScreen.tsx`, `homeScreenContent.ts`, `homeScreenData.ts` | Many sections — see [Known risks](#7-known-risks) |
| Admin guides | `src/screens/Admin*`, `src/constants/content/adminGuides/` | **128 guides** |
| Daily Life | `src/screens/DailyLife*`, `src/constants/content/dailyLife/` | 30+ topics |
| Jobs / Labor | `src/screens/Jobs*`, `LaborGuide`, `LaborHelp` | Job-hunt + labor-rights paths |
| Japanese learning | `src/screens/Japanese*`, `JapaneseKana*` + `src/constants/content/japanese/` | Phrases, words, grammar, kana |
| BJT | `src/screens/BJT*` + `src/constants/content/bjt.ts` + `docs/bjt/document/partitioned/*.json` | Vocab + keigo + scenarios + 106-question mock test |
| Stories | `src/screens/Story*` + `src/constants/content/stories/` | Reading + handwritten + vocab |
| Saved / Bookmarks | `SavedScreen` + `src/utils/bookmarks.ts` | Cross-type bookmark store |
| Important dates | `ImportantDatesScreen` + `src/utils/notifications.ts` | Local notification scheduling |
| Search | `SearchScreen` + `src/utils/searchIndex.ts` | Text index over guides + daily life + Japanese |
| Settings | `SettingsScreen` + `src/utils/userProfile.ts` | Profile, fonts, notification toggles |
| **AI Mail Translation** | `src/screens/MailTranslate*Screen.tsx` + `src/constants/aiMailSamples.ts` | **Internal prototype — see §5** |

## 4. Data / content areas

All authored content lives under `src/constants/content/`:

```
src/constants/content/
├── adminGuides/
│   ├── guides/*.ts          (128 guides, each ~100–400 LOC)
│   ├── index.ts             (exports ADMIN_GUIDES)
│   └── meta.ts
├── dailyLife/
│   ├── topics/*.ts
│   ├── index.ts             (exports DAILY_LIFE_TOPICS)
│   └── meta.ts
├── japanese/
│   ├── phrases/*.ts         (per-scenario phrase sets)
│   ├── words.ts
│   └── grammar.ts
├── stories/
│   └── seeds.ts, handwritten.ts, helpers.ts
├── emergency.ts, jobs.ts, bjt.ts
└── adminGuideForms.ts
```

Plus reference data at `src/constants/aiMailSamples.ts` (3 mock mail samples — internal use only).

## 5. AI Mail current status

| Item | Status |
|---|---|
| Phase 1 mock UI (4 screens + 3 sample data) | ✅ **Merged into main** via PR [#6](https://github.com/pdythanhduy/viet-nhat-app/pull/6) |
| Home / Settings entry point | ❌ **Not added** |
| PR #7 (Home entry-point card) | 🚫 **Closed, not merged** — intentional |
| PR #8 (decision log doc) | ✅ **Merged** ([`docs/feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md)) |
| Real AI / backend | ❌ Not started — gated by 6 exposure conditions in the decision log |
| User-reachable from production | ❌ **No** — screens are registered in the navigator but not linked from any visible UI |

**Bottom line:** four `MailTranslate*` screens exist in the codebase as Phase 2 scaffolding. They use local mock samples (NHK / 住民税 / scam-suspect) and never call a real AI service. They are unreachable from the UI shipped to users.

Reading order for anyone touching this area:
1. [`docs/feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) — the product rule + 6 gate conditions
2. [`docs/feature-translate-japanese-mail-audit.md`](feature-translate-japanese-mail-audit.md) — full Phase 0 audit (privacy, schema, Apple Review risk, MVP scope)
3. [`docs/feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md) — cost model + monetization

## 6. Quality scripts

| Command | What it does |
|---|---|
| `npm run typecheck` | `tsc --noEmit` — must PASS before commit |
| `npm run test:ci` | `jest --runInBand` |
| `npm run verify` | typecheck + test:ci + content audits (full gate) |
| `npm run verify:precommit` | typecheck + content audits — pre-commit hook |
| `npm run content:audit-encoding` | Encoding sweep over content TS + JSON |
| `npm run bjt:qa-checklist:gate` | BJT QA, 0-warning gate |
| `npm run content:qa-admin-guides` | Jest QA on admin guides + database |

Pre-commit hook (`scripts/setup-git-hooks.js`) runs `verify:precommit` automatically.

## 7. Release / build setup

- **`app.json`** — Expo config: name `Cẩm Nang Việt Nhật`, slug `viet-nhat-app`, bundle ID `com.thanhduy.camnangvietnhat`, plugins (`expo-font`, `expo-notifications`).
- **`eas.json`** — EAS Build / Submit profiles. Production builds go to both App Store and Play Store.
- **Store-listing docs:**
  - `PLAY_APP_CONTENT_DRAFT.md`, `PLAY_DATA_SAFETY_DRAFT.md`, `PLAY_STORE_LISTING.md`, `PLAY_CONSOLE_CHECKLIST.md`
  - `STORE_ASSETS_CHECKLIST.md`, `STORE_METADATA_DRAFT.md`
  - `APP_REVIEW_NOTES.md` (Apple reviewer notes)
  - `PRIVACY_POLICY.md`, `TERMS_OF_USE.md`
  - `RELEASE_CHECKLIST.md`, `CHANGELOG.md`

## 8. Known risks

| Risk | Detail | Suggested mitigation |
|---|---|---|
| **HomeScreen has many responsibilities** | `HomeScreen.tsx` is ~1500 LOC and orchestrates ~14 sections (alerts, profile hero, priority cards, ready guides, recent items, bookmarks, categories, onboarding, law updates, family-visa, emergencies). Hard to change one section safely. | Don't add more sections without extracting first. Consider splitting into composed sub-components when the next big change lands. |
| **AI Mail is internal-only** | Easy to accidentally surface — a single `navigation.navigate('MailTranslateIntro')` from any button would expose it. | Read the decision log + 6 conditions before any change near `MailTranslate*` routes. |
| **Many modules, scope creep risk** | Home / Admin / Jobs / Japanese / BJT / Stories / Saved / ImportantDates / Search / Settings — easy to add yet another flagship feature instead of polishing existing ones. | Prefer polishing existing modules to adding new feature groups. Use the audit pattern (`docs/feature-*-audit.md`) before any new big feature. |
| **README + decision log need maintenance** | This doc and the README will go stale when modules are renamed / removed. | Update both when a module is added / renamed / removed in `RootStackParamList`. |
| **Content drift between bundled TS and source-of-truth** | Most admin guides hardcode government URLs, fees, deadlines — these change. | Re-run `npm run content:audit-encoding` + the source-verification pass referenced in MEMORY routinely; bump `app.json` version on each content correction batch. |
| **Pre-commit hook is local-only** | The verify gate runs locally before commit; CI doesn't (yet) enforce the same gate. | Treat the hook as best-effort. Keep it green so contributors don't disable it. |

## 9. Recommended next work

In priority order, after current sprint:

1. **Polish Home UX** — extract one or two HomeScreen sub-sections to make iteration safer, tighten copy on the situation chips, verify the personalized actions flow with a fresh profile.
2. **Audit top admin guides** — pick the 10 highest-traffic guides and verify each against current government URLs / fee tables (continuing the source-verification pass from 2026-05-15).
3. **Improve search / retention** — measure which Search queries return zero results and either route them or add content. Audit `utils/searchIndex.ts` for missing aliases.
4. **Improve important dates / checklist** — make the notifications setup smoother on Android (boot-completed permission), add one-tap "track this deadline" from key admin guides.
5. **Later: Phase 2 foundation for AI Mail** — only after unblocking the 6 exposure conditions in the decision log. Start with a real-cost API quote and the Privacy Policy v2 legal review (independent of any code change).

Anything outside this list is welcome but should not displace these.

---

## Related docs

- [`README.md`](../README.md) — entry-level project overview
- [`docs/feature-ai-mail-translate-decision-log.md`](feature-ai-mail-translate-decision-log.md) — AI Mail product rule
- [`docs/feature-translate-japanese-mail-audit.md`](feature-translate-japanese-mail-audit.md) — AI Mail Phase 0 audit
- [`docs/feature-mail-translate-cost-estimate.md`](feature-mail-translate-cost-estimate.md) — AI Mail cost model
- [`docs/full-content-backlog-45-guides.md`](full-content-backlog-45-guides.md) — content backlog source of truth
- [`CHANGELOG.md`](../CHANGELOG.md) — release history
