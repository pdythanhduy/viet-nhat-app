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
| `guide_open` | `guide_id`, `category`, `source` | AdminDetailScreen mount. `source` ∈ `search` / `related` / `featured` / `direct` / `recent_viewed` (Phase 2B + retention surface — measures which discovery surface converted) |
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

### Retention funnel (Phase R1)

| Event | Props | When fires |
|---|---|---|
| `guide_save` | `guide_id`, `category` | User taps the bookmark/save icon on `AdminDetailScreen` and the guide goes from unsaved → saved |
| `guide_unsave` | `guide_id`, `category` | Same icon when the guide goes from saved → unsaved |

These are decision-quality retention signals: which guides earn long-term saves (vs which are one-and-done reads). The pair is preferred over a single `guide_bookmark { added: bool }` event because retention dashboards aggregate cleaner on event-name granularity than on a bool property.

Non-guide bookmarks (phrases, dialogues, daily-life topics) silently no-op — they aren't in the v1.5.0 retention scope.

### Search funnel (Phase 2A+2B)

The raw query is **never** sent. We forward `q = normalizeText(query).slice(0, 24)`
— ASCII-only, lowercased, no diacritics. Aggregating across users surfaces popular
keywords without storing identifying input mid-typing.

| Event | Props | When fires |
|---|---|---|
| `search_query` | `q`, `q_length`, `result_count` | User types ≥ 3 chars in SearchScreen input |
| `search_no_results` | `q`, `q_length` | Same trigger as `search_query` when `result_count === 0`. **Legacy v1.5.0** — kept firing for dashboard back-compat; new analyses use `search_zero_results` |
| `search_zero_results` | `q`, `q_length`, `fallback_shown` | Phase 2C. Fires alongside `search_no_results` when SearchScreen renders the dead-end defense layer. `fallback_shown = false` from a non-UI caller would flag a regression |
| `search_result_opened` | `q`, `q_length`, `position`, `result_type` | Phase 2C. User taps a result FROM a search input. `position` is 0-indexed (top-1 = 0). Pairs with `search_query` for conversion analysis |
| `search_abandoned` | `q`, `q_length`, `result_count`, `ms_since_query` | Phase 2C. Fires when the abandon-window (10s) elapses since the user's last keystroke without any result tap or further typing. At most ONE per resting query — see `docs/analytics-decision-map.md` §search-abandon heuristic |
| `fallback_guide_opened` | `guide_id` | Phase 2C. Fires when the user opens a guide FROM the zero-result fallback layer (distinct from a regular featured-rail tap) |
| `home_layout_variant` | `variant ∈ cold_start / searcher`, `search_count` | Phase 2C. Fires **once per app session** (gated by a module-level boolean reset on cold start) AFTER the searcher-signal heuristic decides the layout. Home → AdminDetail → back-to-Home does NOT re-fire. Lets analytics compare retention across the two local variants without remote-config |

Funnel to watch after launch:

1. `search_query` count → discovery interest baseline
2. `search_no_results` rate → ranking + content gap signal (each failed query is a
   keyword candidate or a missing guide)
3. `guide_open` with `source === 'search'` → the conversion event

Cross-reference `guide_open.source` distribution to see whether search, related,
or featured is the strongest discovery surface. If `featured` dominates, the
+6 priority boost is doing real work; if `related` dominates, related-guides
deserves UI emphasis; if `search` dominates, keep tuning ranking.

### Discovery & emergency (Phase A1)

| Event | Props | When fires |
|---|---|---|
| `emergency_cta_open` | `source` ∈ `home_quick_action` / `home_start_here` / `search_empty` / `search_no_results` / `home_section_link` | User reaches EmergencyHub via a discovery surface. The bottom-of-Home `tel:` phone-tap path is intentionally NOT tracked (different intent — call vs. browse) |
| `home_start_here_pressed` | `shortcut_id` ∈ `newcomer` / `visa` / `tax` / `emergency` / `jobs` | User taps a chip in the "Bắt đầu ở đâu?" Home row. Wired in v1.5.1 — see [`product-state-v1.5.1-prep.md`](product-state-v1.5.1-prep.md) §analytics |
| `home_search_pressed` | — | User taps the Home search CTA. Fires on tap intent, BEFORE any typing — pair with `search_query` to measure tap-without-type abandonment (v1.5.1) |
| `home_quick_action_pressed` | `action_id` ∈ `newcomer` / `visa-renewal` / `moving` / `official-mail` / `tax-insurance` / `lost-document` / `emergency` | User taps a card in the "Tôi đang cần gì?" quick-actions grid. Distinct from `home_start_here_pressed` — different row, different intent (specific situation vs cold-start). v1.5.1 |

### Growth (Phase G1)

| Event | Props | When fires |
|---|---|---|
| `guide_share` | `guide_id`, `completed` | User taps the share icon on `AdminDetailScreen` and the OS share sheet returns. `completed: true` when the share went through (regardless of destination — we don't know if it went to Zalo / Messenger / SMS / copy). `completed: false` on user cancel or platform throw |

The destination app is intentionally NOT tracked — the OS owns that information, and forwarding it would expand the privacy surface for no product benefit.

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
- **Raw** search queries (we DO forward a 24-char normalized form — see Search funnel above)
- Quiz answer text or content
- Any user-typed string beyond the 24-char normalized search slice
