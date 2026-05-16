import { ESSENTIAL_PHRASES } from '../constants/content/japanese';
import { loadJapaneseAudioPreferences } from './audioPreferences';
import {
  buildDailyNotificationContent,
  DailyNotificationContent,
  getTodayPhrase,
} from './dailyRitualContent';
import { loadStreak } from './japaneseStreak';
import {
  cancelJapaneseStudyReminder,
  cancelWordOfDayReminder,
  scheduleJapaneseStudyReminder,
  scheduleWordOfDayReminder,
} from './notifications';

/** Loads streak + today's phrase and builds today's notification text. */
export async function getCurrentDailyReminderContent(): Promise<DailyNotificationContent> {
  const streak = await loadStreak();
  const phrase = getTodayPhrase(ESSENTIAL_PHRASES);
  return buildDailyNotificationContent(phrase, streak.currentStreak);
}

/**
 * Reads current prefs + today's phrase + streak, then re-syncs the two daily
 * reminders so their notification text reflects today's content. Safe to call
 * on every app launch and after any toggle change. Permission errors are
 * swallowed — caller already saw permission state on first schedule.
 */
export async function refreshDailyReminderContent(): Promise<void> {
  const [prefs, content] = await Promise.all([
    loadJapaneseAudioPreferences(),
    getCurrentDailyReminderContent(),
  ]);

  if (prefs.studyReminderEnabled) {
    await scheduleJapaneseStudyReminder({ title: content.studyTitle, body: content.studyBody }).catch(
      () => undefined
    );
  } else {
    await cancelJapaneseStudyReminder();
  }

  if (prefs.wordReminderEnabled) {
    await scheduleWordOfDayReminder({ title: content.wordTitle, body: content.wordBody }).catch(
      () => undefined
    );
  } else {
    await cancelWordOfDayReminder();
  }
}
