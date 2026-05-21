// Aptabase analytics — privacy-first, no PII collected.
//
// Naming convention (snake_case):
// - <noun>_view              — screen views (home_view, daily_ritual_view)
// - <noun>_<verb>            — state transitions (ritual_started, ritual_completed)
// - <subject>_opened|granted — singular outcome events (notification_opened)
//
// Rules:
// 1. Log decision-making events only. Do NOT spam every tap.
// 2. Property values must be string | number | boolean. No PII (no user input strings).
// 3. Add new events to EventMap below + document in docs/analytics-events.md.
// 4. Backward-compat: legacy logXxx() functions delegate to track() so existing
//    call sites keep working. Prefer track() for new code.

import Constants from 'expo-constants';
import { init as aptabaseInit, trackEvent } from '@aptabase/react-native';

type Primitive = string | number | boolean;
type Props = Record<string, Primitive>;

export type EventMap = {
  // App lifecycle
  app_open: void;
  app_background: void;

  // Screen views (only the screens we actually want to measure adoption of)
  home_view: void;
  daily_ritual_view: void;
  // Phase 2B + Phase 2C (v1.5.2): `source` distinguishes discovery
  // surface from direct nav. Bounded enum (never free text). Stays
  // in lockstep with `GuideOpenSource` in
  // `src/navigation/AppNavigator.tsx` — the compile-time contract in
  // `screens/home/HomeQuickActions.tsx` style would be ideal here too
  // but the natural definition site is the navigator, so we duplicate
  // the union here for explicitness and rely on `tsc` to catch drift
  // at every call site that passes `source` into navigation params.
  guide_open: {
    guide_id: string;
    category: string;
    source:
      | 'search'
      | 'related'
      | 'featured'
      | 'direct'
      | 'recent_viewed'
      | 'start_here'
      | 'quick_action'
      | 'saved'
      | 'external_share'
      | 'deep_link_placeholder';
  };
  mail_translate_open: void;

  // Daily Ritual — the funnel
  ritual_started: void;
  ritual_completed: { score: number; total: number; new_streak: number };
  quiz_answered: { correct: boolean; question_index: number };
  streak_viewed: { current_streak: number };

  // Notifications
  notification_permission_granted: { kind: 'study' | 'word' | 'date' };
  notification_opened: { slot: 'morning' | 'evening' | 'unknown' };

  // Mail Translate — the funnel
  mail_image_uploaded: void;
  mail_translated: void;
  mail_summary_viewed: void;

  // Search — Phase 2A preparation. Raw query NEVER sent: we forward only
  // a normalized + truncated form so aggregating popular searches stays
  // useful without leaking PII (names, addresses) typed into the box.
  // `q` is normalizeText(query).slice(0, 24) — ASCII-only, no diacritics.
  search_query: { q: string; q_length: number; result_count: number };
  // Legacy v1.5.0 zero-result counter. Kept firing in v1.5.2 for
  // back-compat with any external aggregations that already key on
  // this name. New analysis should prefer `search_zero_results` which
  // carries the dead-end-defense context (and matches grammatical
  // plural with this legacy event).
  search_no_results: { q: string; q_length: number };

  // Phase 2C (v1.5.2) — richer zero-result event. Fires alongside the
  // legacy `search_no_results` on the same trigger. Plural form
  // mirrors `search_no_results` for grammatical consistency.
  // `fallback_shown` tells us whether the dead-end defense layer
  // (featured + emergency CTA) actually rendered — false would mean
  // a UI regression. PII posture identical to search_query: only the
  // normalized 24-char form is forwarded.
  search_zero_results: { q: string; q_length: number; fallback_shown: boolean };

  // Phase 2C (v1.5.2) — search result tap. Paired with `search_query`
  // to compute conversion rate. `position` is the 0-indexed slot in
  // the result list (top-1 = 0). `result_type` distinguishes guide /
  // daily-life / japanese / jobs taps so we can see which content
  // type search actually surfaces. `q` mirrors the search_query for
  // join-by-q analysis; same PII contract.
  search_result_opened: {
    q: string;
    q_length: number;
    position: number;
    result_type: 'guide' | 'daily-life' | 'jobs' | 'japanese-phrase' | 'japanese-dialogue' | 'japanese-word';
  };

  // Phase 2C (v1.5.2) — search abandon signal. Fires when the user
  // typed a query (≥ 3 chars), did NOT open any result, did NOT
  // refine the query within the abandon window, and sat idle until
  // the timer fired. Past-participle form matches the outcome
  // convention used by `notification_opened`, `mail_translated`, etc.
  // The timer logic and window are documented in
  // docs/analytics-decision-map.md §search-abandon. Anti-spam: at
  // most ONE abandon event per resting query. The timer resets on
  // every keystroke, on app background, and on screen unmount.
  search_abandoned: { q: string; q_length: number; result_count: number; ms_since_query: number };

  // Phase 2C (v1.5.2) — dead-end recovery. Fires when the user
  // opened a featured guide FROM the zero-result fallback layer
  // (as opposed to the Home featured rail or the empty-state featured
  // rail). Distinct from `guide_open { source: 'featured' }` because
  // it specifically counts dead-end recoveries.
  fallback_guide_opened: { guide_id: string };

  // Phase 2C (v1.5.2) — Home layout signal. Fires once per Home
  // mount AFTER the heuristic has decided which variant to render.
  // `variant` lets us A/B compare retention metrics across the two
  // local layouts without any remote-config or experiment service.
  home_layout_variant: { variant: 'cold_start' | 'searcher'; search_count: number };

  // Retention R1: explicit save/unsave intent (distinct from `guide_open`).
  // Tells us which guides earn long-term saves vs which are one-and-done.
  // No PII — only the guide_id (already public-as-content).
  guide_save: { guide_id: string; category: string };
  guide_unsave: { guide_id: string; category: string };

  // Discovery — Phase A1. Generic "user reached EmergencyHub via a
  // surface that's not the bottom Emergency contacts list". `source`
  // tells us WHICH surface earned the open (home quick action, search
  // no-results CTA, etc.). The pre-existing tel: handler stays
  // un-tracked because it's a different intent (call a number).
  emergency_cta_open: {
    source: 'home_quick_action' | 'home_start_here' | 'search_empty' | 'search_no_results' | 'home_section_link';
  };

  // Discovery — Phase UX1 forward-compat. Fires when the user taps a
  // chip in the new "Bắt đầu ở đâu?" Home row. Tracks shortcut
  // selection so we can see whether the cold-start surface earns its
  // place vs. existing quick-actions.
  home_start_here_pressed: { shortcut_id: 'newcomer' | 'visa' | 'tax' | 'emergency' | 'jobs' };

  // v1.5.1 — Home search CTA tap. Distinct from `search_query`:
  // counts INTENT (user noticed and tapped the Home search CTA) even
  // when no query is then typed. Pair with `search_query` to measure
  // search-CTA abandonment (tap without type) — a known mobile UX gap.
  home_search_pressed: void;

  // v1.5.1 — Home "Tôi đang cần gì?" quick-action tap. `action_id` is
  // the situation chip pressed. The decision map's cold-start row
  // already calls out this event by name: "Compare home_start_here_pressed
  // vs. home_quick_action_pressed counts". Distinct from the
  // forward-compat home_start_here_pressed because the two rows answer
  // different intents (cold-start vs. specific situation).
  home_quick_action_pressed: {
    action_id:
      | 'newcomer'
      | 'visa-renewal'
      | 'moving'
      | 'official-mail'
      | 'tax-insurance'
      | 'lost-document'
      | 'emergency';
  };

  // Growth G1: native share completion. `completed: false` covers both
  // user cancellation and any platform-level Share throw. The OS share
  // sheet decides the destination — we do NOT track which app received
  // the share (no Zalo/Messenger/SMS attribution).
  guide_share: { guide_id: string; completed: boolean };
};

let initialized = false;

function getAptabaseKey(): string | null {
  const key = (Constants.expoConfig?.extra as Record<string, unknown> | undefined)?.aptabaseAppKey;
  return typeof key === 'string' && key.length > 0 ? key : null;
}

export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  const key = getAptabaseKey();
  if (!key) {
    // Loud in dev so contributors notice; silent in production so a missing/forgotten
    // key never crashes the app or floods user-facing logs. Set the key in
    // app.json -> expo.extra.aptabaseAppKey to start collecting events.
    if (__DEV__) {
      console.warn('[analytics] Aptabase key missing; events will only log locally');
    }
    return;
  }

  try {
    aptabaseInit(key);
    if (__DEV__) console.log('[analytics] Aptabase initialized');
  } catch (e) {
    if (__DEV__) console.warn('[analytics] init failed', e);
  }
}

/**
 * Type-safe event tracker. Compile-time guarantee that name + props match EventMap.
 */
export function track<K extends keyof EventMap>(
  name: K,
  ...rest: EventMap[K] extends void ? [] : [props: EventMap[K]]
): void {
  const props = rest[0] as Props | undefined;

  if (__DEV__) {
    console.log('[analytics]', name, props ?? '');
  }

  if (!initialized) return;
  if (!getAptabaseKey()) return;

  try {
    if (props) {
      trackEvent(name, props);
    } else {
      trackEvent(name);
    }
  } catch (e) {
    if (__DEV__) console.warn('[analytics] track failed', name, e);
  }
}

// ---------------------------------------------------------------------------
// Legacy wrappers — keep call sites working. Prefer track() in new code.
// ---------------------------------------------------------------------------

export async function logScreenView(screenName: string): Promise<void> {
  // Generic screen view from navigation listener — only forward 'Home' here to keep
  // event catalog clean. DailyRitual + Mail screens fire their own track() in
  // useFocusEffect to avoid double-counting.
  if (screenName === 'Home') track('home_view');
}

export async function logGuideOpened(
  guideId: string,
  _guideTitle: string,
  category: string,
  source: EventMap['guide_open']['source'] = 'direct'
): Promise<void> {
  track('guide_open', { guide_id: guideId, category, source });
}

export async function logQuizStarted(quizType: string): Promise<void> {
  if (quizType === 'daily_ritual') track('ritual_started');
  // Other quiz types (japanese_phrase, bjt) intentionally skipped — out of scope for v1.5.0 metrics
}

export async function logQuizCompleted(
  quizType: string,
  score: number,
  total: number
): Promise<void> {
  if (quizType === 'daily_ritual') {
    // Streak after completion is unknown here; emit 0 as placeholder.
    // DailyRitualScreen also calls track('ritual_completed') directly with the real streak.
    track('ritual_completed', { score, total, new_streak: 0 });
  }
}

// Retention R1: replaces the no-op `logBookmarkToggled` for guide-type
// bookmarks. Phrase/dialogue/daily-life bookmarks still fall through to
// silent no-op — they aren't in the v1.5.0 retention scope. The optional
// `category` lets the guide-detail caller forward `guide.category` so we
// can slice save patterns by category without re-keying analytics rows
// against the bundled guide map.
export async function logBookmarkToggled(
  type: string,
  id: string,
  added: boolean,
  category: string = ''
): Promise<void> {
  if (type !== 'guide') return;
  if (added) {
    track('guide_save', { guide_id: id, category });
  } else {
    track('guide_unsave', { guide_id: id, category });
  }
}
export async function logHtmlExported(_type: string): Promise<void> {}
export async function logJLPTQuizCompleted(_level: string, _score: number, _total: number): Promise<void> {}
export async function logWordSaved(_word: string, _meaning: string): Promise<void> {}
export async function logStoryStarted(_storyId: string, _level: string): Promise<void> {}
export async function logStoryCompleted(_storyId: string, _level: string): Promise<void> {}
// Phase 2A: forward a normalized + truncated form of the query so we can
// aggregate popular searches and failed searches without storing raw user
// input. Mirrors normalizeText() in src/utils/searchIndex.ts (we duplicate
// the tiny normalizer here to avoid a circular import).
//
// Exported for analytics.test.ts to pin the PII contract: NFD → strip
// diacritics → đ/Đ → d → lowercase → trim → cap at 24 chars. Any change
// here should also bump the unit tests.
export function normalizeQueryForAnalytics(query: string): string {
  return query
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    // Recompose so JP composed forms like ド (which NFD splits into
    // ト + U+3099) round-trip to their canonical NFC form. Without this
    // the analytics payload would carry a decomposed byte sequence that
    // looks identical visually but compares unequal to user input.
    .normalize('NFC')
    .trim()
    .slice(0, 24);
}

export async function logSearchPerformed(query: string, resultCount: number): Promise<void> {
  const q = normalizeQueryForAnalytics(query);
  if (!q) return;
  track('search_query', { q, q_length: q.length, result_count: resultCount });
  if (resultCount === 0) {
    // Legacy v1.5.0 counter. Kept firing for back-compat. The richer
    // `search_zero_results` event is fired separately by the screen
    // (via `logSearchZeroResults`) once it knows whether the fallback
    // defense layer actually rendered.
    track('search_no_results', { q, q_length: q.length });
  }
}

// Phase 2C convenience for SearchScreen: fires search_zero_results
// with the correct `fallback_shown` flag derived from the actual
// rendered state. Call this AFTER logSearchPerformed when the UI
// determines that the dead-end defense layer rendered.
export async function logSearchZeroResults(query: string, fallbackShown: boolean): Promise<void> {
  const q = normalizeQueryForAnalytics(query);
  if (!q) return;
  track('search_zero_results', { q, q_length: q.length, fallback_shown: fallbackShown });
}

// Phase 2C — fires when the user opens a result FROM a search input.
// `position` is the 0-indexed list slot. Paired with `search_query`
// for conversion analysis. Direct guide opens via deep-link / Home
// /etc. do NOT fire this — they fire `guide_open` with a non-search
// source instead.
export async function logSearchResultOpened(
  query: string,
  position: number,
  resultType: EventMap['search_result_opened']['result_type']
): Promise<void> {
  const q = normalizeQueryForAnalytics(query);
  if (!q) return;
  track('search_result_opened', { q, q_length: q.length, position, result_type: resultType });
}

// Phase 2C — fires after the abandon-window has elapsed since the
// user's last query refinement without any result open or further
// typing. The caller (SearchScreen) owns the timer; this wrapper
// only forwards the analytics call. See docs/analytics-decision-map.md
// §search-abandon for the heuristic.
export async function logSearchAbandoned(
  query: string,
  resultCount: number,
  msSinceQuery: number
): Promise<void> {
  const q = normalizeQueryForAnalytics(query);
  if (!q) return;
  track('search_abandoned', {
    q,
    q_length: q.length,
    result_count: resultCount,
    ms_since_query: msSinceQuery,
  });
}

// Phase 2C — fires when the user taps a featured guide FROM the
// zero-result fallback layer. Distinct from a regular featured-rail
// tap; this is a dead-end recovery, not a discovery.
export async function logFallbackGuideOpened(guideId: string): Promise<void> {
  track('fallback_guide_opened', { guide_id: guideId });
}

// Phase 2C — once-per-session gate for home_layout_variant.
//
// `useFocusEffect` in HomeScreen runs every time Home gains focus
// (Home → AdminDetail → back = 2 focus events). Without this gate,
// the same variant + count would emit on every back-navigation,
// padding Aptabase volume without informational gain.
//
// Module-level state resets on cold start (= JS engine restart),
// which is the right cadence: one variant emission per app session.
// If the variant actually flips MID-session (rare — requires the
// user to cross SEARCHER_THRESHOLD on the current SearchScreen and
// then return to Home), the flip is still captured on the next cold
// start when the heuristic re-reads storage.
let _homeLayoutVariantFiredThisSession = false;

export function _resetHomeLayoutVariantSessionForTests(): void {
  _homeLayoutVariantFiredThisSession = false;
}

// Pure-ish gate helper for tests + logHomeLayoutVariant. Returns
// true the FIRST time it's called per session; returns false on
// every subsequent call. Side-effect (the flag flip) is intentional
// — that's the gate.
export function _consumeHomeLayoutVariantSessionGate(): boolean {
  if (_homeLayoutVariantFiredThisSession) return false;
  _homeLayoutVariantFiredThisSession = true;
  return true;
}

// Phase 2C — fires once per app session AFTER the heuristic decided
// the layout. Lets us compare retention/discovery metrics across the
// two local variants without remote-config. The session gate ensures
// Home → AdminDetail → back-to-Home does NOT re-fire.
export async function logHomeLayoutVariant(
  variant: EventMap['home_layout_variant']['variant'],
  searchCount: number
): Promise<void> {
  if (!_consumeHomeLayoutVariantSessionGate()) return;
  track('home_layout_variant', { variant, search_count: searchCount });
}

// Phase A1: thin wrappers so call sites don't depend on the raw track()
// shape and can stay readable. Same pattern as logSearchPerformed.
export async function logEmergencyCtaOpened(
  source: EventMap['emergency_cta_open']['source']
): Promise<void> {
  track('emergency_cta_open', { source });
}

export async function logHomeStartHerePressed(
  shortcutId: EventMap['home_start_here_pressed']['shortcut_id']
): Promise<void> {
  track('home_start_here_pressed', { shortcut_id: shortcutId });
}
export async function logHomeSearchPressed(): Promise<void> {
  track('home_search_pressed');
}

export async function logHomeQuickActionPressed(
  actionId: EventMap['home_quick_action_pressed']['action_id']
): Promise<void> {
  track('home_quick_action_pressed', { action_id: actionId });
}
export async function logAdminSituationPressed(_situationId: string): Promise<void> {}
