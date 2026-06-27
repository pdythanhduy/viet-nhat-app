import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
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
import { initAnalytics, track } from './src/utils/analytics';
import { loadFlags } from './src/services/featureFlags';
import { loadProgress as loadN2Progress } from './src/services/n2Progress';
import { migrateN2CacheKeys } from './src/services/n2DayContent';

export default function App() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
  });

  React.useEffect(() => {
    initAnalytics();
    track('app_open');
    void loadFlags();
    void loadN2Progress();
    void migrateN2CacheKeys();
    Promise.all([rescheduleAll(), refreshDailyReminderContent()]).catch(() => {});
  }, []);

  React.useEffect(() => {
    let lastState: AppStateStatus = AppState.currentState;
    const subscription = AppState.addEventListener('change', (next) => {
      if (lastState === 'active' && (next === 'background' || next === 'inactive')) {
        track('app_background');
      } else if (
        (lastState === 'background' || lastState === 'inactive') &&
        next === 'active'
      ) {
        track('app_open');
      }
      lastState = next;
    });
    return () => subscription.remove();
  }, []);

  React.useEffect(() => {
    const subscription = addDailyRitualNotificationListener((slot) => {
      track('notification_opened', { slot });
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
