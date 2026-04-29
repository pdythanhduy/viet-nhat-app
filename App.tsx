import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  BeVietnamPro_800ExtraBold,
} from '@expo-google-fonts/be-vietnam-pro';
import AppNavigator from './src/navigation/AppNavigator';
import { loadJapaneseAudioPreferences } from './src/utils/audioPreferences';
import { rescheduleAll, syncDailyReminderSchedules } from './src/utils/notifications';

export default function App() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
  });

  React.useEffect(() => {
    Promise.all([
      rescheduleAll(),
      loadJapaneseAudioPreferences().then((prefs) =>
        syncDailyReminderSchedules({
          studyReminderEnabled: prefs.studyReminderEnabled,
          wordReminderEnabled: prefs.wordReminderEnabled,
        })
      ),
    ]).catch(() => {});
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
