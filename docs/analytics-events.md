# Analytics Events Catalog

App: Cẩm Nang Việt Nhật
SDK: [Aptabase](https://aptabase.com/) (privacy-first, no PII)
Source: [src/utils/analytics.ts](../src/utils/analytics.ts)

## Setup

1. Create an Aptabase account (free tier covers ~20K events/month)
2. Create an app, copy the App Key (looks like `A-EU-xxxxxx` or `A-US-xxxxxx`)
3. Paste the key into `app.json` → `expo.extra.aptabaseAppKey`
4. Rebuild — events flow live. Without a key, events only `console.log` in dev.

The key is a public client-side identifier. Safe to commit to a public repo.

## Naming convention

- `<noun>_view` — screen view (`home_view`, `daily_ritual_view`)
- `<noun>_<verb>` — state transition (`ritual_started`, `ritual_completed`)
- `<subject>_opened|granted` — singular outcome (`notification_opened`)

Property values are limited to `string | number | boolean`. **Never log PII** (no
user input strings, no free-text content).

## Event catalog

### App lifecycle

| Event | Props | When fires | Why we measure |
|---|---|---|---|
| `app_open` | — | Cold start AND foreground from background | DAU baseline; sessions per user |
| `app_background` | — | App moves to background/inactive | Session length (paired with `app_open`) |

### Screen views

Only screens we want to measure adoption of. Other screens skipped on purpose.

| Event | Props | When fires |
|---|---|---|
| `home_view` | — | Auto via navigation listener when route name = `Home` |
| `daily_ritual_view` | — | DailyRitualScreen `useFocusEffect` |
| `guide_open` | `guide_id`, `category` | AdminDetailScreen mount |
| `mail_translate_open` | — | User taps the Mail discovery card on Home (intent signal — not refired on back-navigation) |

### Daily Ritual funnel

| Event | Props | When fires |
|---|---|---|
| `ritual_started` | — | User taps "Bắt đầu 3 câu quiz" |
| `quiz_answered` | `correct: boolean`, `question_index: number` | Each answer selection |
| `ritual_completed` | `score: number`, `total: number`, `new_streak: number` | After last question, after `markStudiedToday()` resolves |
| `streak_viewed` | `current_streak: number` | DailyRitualScreen loads streak data |

### Notifications

| Event | Props | When fires |
|---|---|---|
| `notification_permission_granted` | `kind: 'study' \| 'word' \| 'date'` | OS-prompt grant on first request only (not on already-granted re-checks) |
| `notification_opened` | `slot: 'morning' \| 'evening' \| 'unknown'` | User taps a daily ritual notification (App.tsx listener) |

### Mail Translate funnel

Phase 1 mock: events fire on the simulated flow with sample data. When Phase 2 wires real
camera + AI, the same event names will reflect real usage.

| Event | Props | When fires |
|---|---|---|
| `mail_image_uploaded` | — | User picks a sample mail in MailCaptureScreen |
| `mail_translated` | — | MailProcessingScreen finishes the simulated 2.4s delay |
| `mail_summary_viewed` | — | MailResultScreen renders a valid sample |

## How to add a new event

1. Add to `EventMap` in [src/utils/analytics.ts](../src/utils/analytics.ts) with typed props.
2. Add a row in this file under the right section.
3. Wire `track('event_name', { ...props })` at the call site.
4. Verify in dev: events log to console as `[analytics] event_name { ...props }`.

## Funnels worth watching after launch

**Daily Ritual conversion** (most important for v1.5.0):
1. `daily_ritual_view` → 100%
2. `ritual_started` → opt-in to do the quiz
3. `ritual_completed` → finished without bailing

If `daily_ritual_view → ritual_started` is low (<50%), the intro screen isn't selling the
quiz well. If `ritual_started → ritual_completed` is low, the quiz is too long or too hard.

**Mail Translate funnel** (Phase 1 sanity):
1. `mail_translate_open` → curiosity
2. `mail_image_uploaded` → tried a sample
3. `mail_summary_viewed` → finished the flow

Tells us whether users are interested enough in the mock to justify Phase 2 backend cost.

**Notification adoption**:
- Count `notification_permission_granted` events per cohort.
- Cross-reference with `notification_opened` to measure CTR.

## What we explicitly do NOT track

- Specific guide reads beyond ID (no time-on-screen, no scroll depth)
- Bookmark add/remove
- Search queries (privacy)
- Quiz answer text or content
- Any user-typed string
