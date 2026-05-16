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
import { navigate } from './src/navigation/navigationRef';
import { addDailyRitualNotificationListener, rescheduleAll } from './src/utils/notifications';
import { refreshDailyReminderContent } from './src/utils/dailyReminderSync';

export default function App() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
  });

  React.useEffect(() => {
    Promise.all([rescheduleAll(), refreshDailyReminderContent()]).catch(() => {});
  }, []);

  React.useEffect(() => {
    const subscription = addDailyRitualNotificationListener(() => {
      navigate('DailyRitual');
    });
    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
