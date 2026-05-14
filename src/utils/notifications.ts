import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';
import type { IoniconName } from '../types/content';
import { getDaysUntil } from './dateUtils';

// Expo Go SDK 53+ removed remote push notifications on Android.
// Detect Expo Go to skip push token registration; local scheduled notifications still work.
const isExpoGo = Constants.appOwnership === 'expo';

const DATES_STORAGE_KEY = StorageKeys.importantDates;
const REMINDER_DAYS = [90, 30, 7, 1];

export interface ImportantDate {
  id: string;
  label: string;
  date: string;
  icon: IoniconName;
  color: string;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync('reminders', {
    name: 'Nhắc nhở quan trọng',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#185FA5',
  });
}

export async function requestPermission(): Promise<boolean> {
  if (!Device.isDevice) return false;

  if (isExpoGo) {
    await ensureAndroidChannel();
    return true;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') {
    await ensureAndroidChannel();
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return false;

  await ensureAndroidChannel();
  return true;
}

export type NotificationPermissionState = 'granted' | 'denied' | 'undetermined' | 'unsupported';

export async function getNotificationPermissionStatus(): Promise<NotificationPermissionState> {
  if (!Device.isDevice) return 'unsupported';
  if (isExpoGo) return 'granted';
  try {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();
    if (status === 'granted') return 'granted';
    if (status === 'denied' && !canAskAgain) return 'denied';
    if (status === 'denied') return 'denied';
    return 'undetermined';
  } catch {
    return 'undetermined';
  }
}

export async function loadImportantDates(): Promise<ImportantDate[]> {
  try {
    const raw = await AsyncStorage.getItem(DATES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveImportantDates(dates: ImportantDate[]): Promise<void> {
  await AsyncStorage.setItem(DATES_STORAGE_KEY, JSON.stringify(dates));
}

function formatDaysLabel(days: number): string {
  if (days === 1) return 'ngày mai';
  if (days === 7) return '1 tuần nữa';
  if (days === 30) return '1 tháng nữa';
  return `${days} ngày nữa`;
}

async function cancelNotificationsForDate(dateId: string): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const toCancel = scheduled.filter((n) => n.identifier.startsWith(`date_${dateId}_`));
  await Promise.all(
    toCancel.map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
  );
}

export async function scheduleNotificationsForDate(item: ImportantDate): Promise<void> {
  await cancelNotificationsForDate(item.id);

  const permitted = await requestPermission();
  if (!permitted) return;

  for (const days of REMINDER_DAYS) {
    const triggerDate = new Date(item.date);
    triggerDate.setHours(8, 0, 0, 0);
    triggerDate.setDate(triggerDate.getDate() - days);

    if (triggerDate <= new Date()) continue;

    await Notifications.scheduleNotificationAsync({
      identifier: `date_${item.id}_${days}`,
      content: {
        title: `📅 ${item.label}`,
        body: `Còn ${formatDaysLabel(days)} - hãy chuẩn bị hồ sơ sớm.`,
        data: { dateId: item.id },
        ...(Platform.OS === 'android' && { channelId: 'reminders' }),
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
    });
  }
}

export async function rescheduleAll(): Promise<void> {
  const dates = await loadImportantDates();
  await Promise.all(dates.map((date) => scheduleNotificationsForDate(date)));
}

const JAPANESE_REMINDER_ID = 'japanese_study_reminder';

export async function scheduleJapaneseStudyReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(JAPANESE_REMINDER_ID).catch(() => undefined);
  const permitted = await requestPermission();
  if (!permitted) {
    throw new Error('notification-permission-denied');
  }

  await Notifications.scheduleNotificationAsync({
    identifier: JAPANESE_REMINDER_ID,
    content: {
      title: '🇯🇵 Luyện tiếng Nhật hôm nay chưa?',
      body: 'Chỉ cần 5 phút mỗi ngày để duy trì streak của bạn.',
      ...(Platform.OS === 'android' && { channelId: 'reminders' }),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });
}

export async function cancelJapaneseStudyReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(JAPANESE_REMINDER_ID).catch(() => undefined);
}

const WORD_OF_DAY_REMINDER_ID = 'word_of_day_reminder';

export async function scheduleWordOfDayReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(WORD_OF_DAY_REMINDER_ID).catch(() => undefined);
  const permitted = await requestPermission();
  if (!permitted) {
    throw new Error('notification-permission-denied');
  }

  await Notifications.scheduleNotificationAsync({
    identifier: WORD_OF_DAY_REMINDER_ID,
    content: {
      title: '🌸 Từ của hôm nay',
      body: 'Học một từ tiếng Nhật mỗi buổi sáng — mở app để xem từ hôm nay!',
      ...(Platform.OS === 'android' && { channelId: 'reminders' }),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 8,
      minute: 0,
    },
  });
}

export async function cancelWordOfDayReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(WORD_OF_DAY_REMINDER_ID).catch(() => undefined);
}

export async function syncDailyReminderSchedules(input: {
  studyReminderEnabled: boolean;
  wordReminderEnabled: boolean;
}): Promise<void> {
  if (input.studyReminderEnabled) {
    await scheduleJapaneseStudyReminder().catch(() => undefined);
  } else {
    await cancelJapaneseStudyReminder();
  }

  if (input.wordReminderEnabled) {
    await scheduleWordOfDayReminder().catch(() => undefined);
  } else {
    await cancelWordOfDayReminder();
  }
}

export async function deleteImportantDate(id: string): Promise<void> {
  await cancelNotificationsForDate(id);
  const dates = await loadImportantDates();
  await saveImportantDates(dates.filter((d) => d.id !== id));
}

export { getDaysUntil };
