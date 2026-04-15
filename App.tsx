import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { loadJapaneseAudioPreferences } from './src/utils/audioPreferences';
import { rescheduleAll, syncDailyReminderSchedules } from './src/utils/notifications';

export default function App() {
  React.useEffect(() => {
    Promise.all([
      rescheduleAll(),
      loadJapaneseAudioPreferences().then((prefs) =>
        syncDailyReminderSchedules({
          studyReminderEnabled: prefs.studyReminderEnabled,
          wordReminderEnabled: prefs.wordReminderEnabled,
        })
      ),
    ]).catch(() => {
      // Notification setup is best-effort; the app should still open normally.
    });
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
