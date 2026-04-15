jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getSpeechRateValue,
  loadJapaneseAudioPreferences,
} from './audioPreferences';

describe('audioPreferences', () => {
  it('returns defaults when storage is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    await expect(loadJapaneseAudioPreferences()).resolves.toEqual({
      speechRate: 'normal',
      autoPlayDialogue: false,
      autoPlayFlashcard: false,
      studyReminderEnabled: false,
      wordReminderEnabled: false,
    });
  });

  it('maps speech rates correctly', () => {
    expect(getSpeechRateValue('slow')).toBeLessThan(getSpeechRateValue('normal'));
    expect(getSpeechRateValue('fast')).toBeGreaterThan(getSpeechRateValue('normal'));
  });
});
