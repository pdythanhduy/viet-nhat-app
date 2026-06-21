jest.mock('expo-speech', () => ({
  __esModule: true,
  getAvailableVoicesAsync: jest.fn(() =>
    Promise.resolve([{ identifier: 'ja-jp-1', language: 'ja-JP' }])
  ),
  speak: jest.fn((_text, options) => {
    options?.onDone?.();
  }),
  stop: jest.fn(() => Promise.resolve()),
  maxSpeechInputLength: 300,
}));

jest.mock('./audioPreferences', () => ({
  __esModule: true,
  getSpeechRateValue: jest.fn(() => 0.92),
  loadJapaneseAudioPreferences: jest.fn(() =>
    Promise.resolve({ speechRate: 'normal', autoPlayDialogue: false, autoPlayFlashcard: false })
  ),
}));

import {
  getJapaneseVoiceSupport,
  getJapaneseAudioState,
  playJapaneseAudio,
  playJapaneseSequence,
  splitJapaneseSpeechText,
  stopJapaneseAudio,
} from './audio';
import * as Speech from 'expo-speech';

describe('audio helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts and completes speech cleanly', async () => {
    await playJapaneseAudio('在留カード', 'test-audio');
    expect(getJapaneseAudioState().speaking).toBe(false);
  });

  it('stops current speech', async () => {
    await stopJapaneseAudio();
    expect(getJapaneseAudioState()).toEqual({ activeId: null, speaking: false });
  });

  it('plays a sequence cleanly', async () => {
    await playJapaneseSequence(
      [
        { id: '1', text: 'おはようございます。' },
        { id: '2', text: 'ありがとうございます。' },
      ],
      'sequence-audio'
    );
    expect(getJapaneseAudioState().speaking).toBe(false);
  });

  it('splits long speech text into bounded chunks', () => {
    const chunks = splitJapaneseSpeechText('あ'.repeat(500), 120);

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join('')).toBe('あ'.repeat(500));
    expect(chunks.every((chunk) => chunk.length <= 120)).toBe(true);
  });

  it('plays long text as multiple speech chunks', async () => {
    await playJapaneseAudio('あ'.repeat(500), 'long-audio');

    expect(Speech.speak).toHaveBeenCalledTimes(3);
    expect(getJapaneseAudioState().speaking).toBe(false);
  });

  it('detects japanese voice support', async () => {
    await expect(getJapaneseVoiceSupport()).resolves.toMatchObject({
      supported: true,
      language: 'ja-JP',
    });
  });
});
