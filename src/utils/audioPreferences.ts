import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../constants/storageKeys';

export type JapaneseSpeechRate = 'slow' | 'normal' | 'fast';

export interface JapaneseAudioPreferences {
  speechRate: JapaneseSpeechRate;
  autoPlayDialogue: boolean;
  autoPlayFlashcard: boolean;
}

const DEFAULT_PREFERENCES: JapaneseAudioPreferences = {
  speechRate: 'normal',
  autoPlayDialogue: false,
  autoPlayFlashcard: false,
};

export function getSpeechRateValue(rate: JapaneseSpeechRate) {
  if (rate === 'slow') return 0.78;
  if (rate === 'fast') return 1.02;
  return 0.92;
}

export async function loadJapaneseAudioPreferences() {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.japaneseAudioPreferences);
    if (!raw) return DEFAULT_PREFERENCES;

    const parsed = JSON.parse(raw) as Partial<JapaneseAudioPreferences>;
    return {
      speechRate:
        parsed.speechRate === 'slow' || parsed.speechRate === 'fast' || parsed.speechRate === 'normal'
          ? parsed.speechRate
          : DEFAULT_PREFERENCES.speechRate,
      autoPlayDialogue:
        typeof parsed.autoPlayDialogue === 'boolean'
          ? parsed.autoPlayDialogue
          : DEFAULT_PREFERENCES.autoPlayDialogue,
      autoPlayFlashcard:
        typeof parsed.autoPlayFlashcard === 'boolean'
          ? parsed.autoPlayFlashcard
          : DEFAULT_PREFERENCES.autoPlayFlashcard,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export async function saveJapaneseAudioPreferences(input: JapaneseAudioPreferences) {
  await AsyncStorage.setItem(StorageKeys.japaneseAudioPreferences, JSON.stringify(input));
  return input;
}
