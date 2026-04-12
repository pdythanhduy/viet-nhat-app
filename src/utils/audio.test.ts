jest.mock('expo-speech', () => ({
  __esModule: true,
  getAvailableVoicesAsync: jest.fn(() =>
    Promise.resolve([{ identifier: 'ja-jp-1', language: 'ja-JP' }])
  ),
  speak: jest.fn((_text, options) => {
    options?.onDone?.();
  }),
  stop: jest.fn(() => Promise.resolve()),
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
  stopJapaneseAudio,
} from './audio';

describe('audio helpers', () => {
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

  it('detects japanese voice support', async () => {
    await expect(getJapaneseVoiceSupport()).resolves.toMatchObject({
      supported: true,
      language: 'ja-JP',
    });
  });
});
