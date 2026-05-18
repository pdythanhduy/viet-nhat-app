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
  // Phase 2B: `source` distinguishes discovery surface from direct nav.
  // Lets us measure which surface (search / related / featured) actually
  // converts to guide opens.
  guide_open: {
    guide_id: string;
    category: string;
    source: 'search' | 'related' | 'featured' | 'direct' | 'recent_viewed';
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
  search_no_results: { q: string; q_length: number };

  // Retention R1: explicit save/unsave intent (distinct from `guide_open`).
  // Tells us which guides earn long-term saves vs which are one-and-done.
  // No PII — only the guide_id (already public-as-content).
  guide_save: { guide_id: string; category: string };
  guide_unsave: { guide_id: string; category: string };
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
    track('search_no_results', { q, q_length: q.length });
  }
}
export async function logHomeSearchPressed(): Promise<void> {}
export async function logHomeQuickActionPressed(_actionId: string): Promise<void> {}
export async function logAdminSituationPressed(_situationId: string): Promise<void> {}
