import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../constants/storageKeys';
import type { UserHousehold, UserLifeStage, UserProfile, UserVisaStatus } from '../types/profile';

export const VISA_STATUS_LABELS: Record<UserVisaStatus, string> = {
  student: 'Du học sinh',
  tokutei: 'Kỹ năng đặc định',
  engineer: 'Kỹ sư / văn phòng',
  trainee: 'Thực tập sinh',
  family: 'Visa gia đình',
  other: 'Diện khác',
};

export const LIFE_STAGE_LABELS: Record<UserLifeStage, string> = {
  'new-arrival': 'Mới sang Nhật',
  'settling-in': 'Đang ổn định cuộc sống',
  'changing-jobs': 'Đang đổi việc / có vấn đề công việc',
  'family-life': 'Đang sống cùng gia đình',
};

export const HOUSEHOLD_LABELS: Record<UserHousehold, string> = {
  alone: 'Sống một mình',
  'with-family': 'Sống cùng gia đình',
};

export async function loadUserProfile() {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.userProfile);
    if (!raw) return null;

    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export async function saveUserProfile(
  input: Omit<UserProfile, 'createdAt' | 'updatedAt'>,
  existing?: UserProfile | null
) {
  const now = new Date().toISOString();
  const profile: UserProfile = {
    ...input,
    prefecture: input.prefecture.trim(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await AsyncStorage.setItem(StorageKeys.userProfile, JSON.stringify(profile));
  await AsyncStorage.setItem(StorageKeys.userProfilePromptDismissed, 'true');
  return profile;
}

export async function loadUserProfilePromptDismissed() {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.userProfilePromptDismissed);
    return raw === 'true';
  } catch {
    return false;
  }
}

export async function dismissUserProfilePrompt() {
  await AsyncStorage.setItem(StorageKeys.userProfilePromptDismissed, 'true');
}

export async function resetUserProfilePrompt() {
  await AsyncStorage.removeItem(StorageKeys.userProfilePromptDismissed);
}

export function buildUserProfileSummary(profile: UserProfile) {
  const parts = [
    VISA_STATUS_LABELS[profile.visaStatus],
    LIFE_STAGE_LABELS[profile.lifeStage],
    HOUSEHOLD_LABELS[profile.household],
  ];

  if (profile.prefecture.trim()) {
    parts.push(`đang sống ở ${profile.prefecture.trim()}`);
  }

  return parts.join(' • ');
}

export function getUserProfileGreeting(profile: UserProfile) {
  const place = profile.prefecture.trim() ? ` tại ${profile.prefecture.trim()}` : '';
  return `${LIFE_STAGE_LABELS[profile.lifeStage]}${place}`;
}
