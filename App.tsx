import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { rescheduleAll } from './src/utils/notifications';

export default function App() {
  React.useEffect(() => {
    rescheduleAll().catch(() => {
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
