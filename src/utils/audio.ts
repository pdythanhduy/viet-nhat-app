import * as Speech from 'expo-speech';
import { getSpeechRateValue, loadJapaneseAudioPreferences } from './audioPreferences';

type AudioState = {
  activeId: string | null;
  speaking: boolean;
};

type VoiceSupport =
  | { supported: true; voice?: string; language: string }
  | { supported: false; reason: 'missing-ja-voice' };

type Listener = (state: AudioState) => void;

const listeners = new Set<Listener>();
let playbackToken = 0;
let voiceSupportCache: VoiceSupport | null = null;
let audioState: AudioState = {
  activeId: null,
  speaking: false,
};

function emit() {
  listeners.forEach((listener) => listener(audioState));
}

function setAudioState(next: AudioState) {
  audioState = next;
  emit();
}

export function subscribeJapaneseAudio(listener: Listener) {
  listeners.add(listener);
  listener(audioState);
  return () => {
    listeners.delete(listener);
  };
}

export function getJapaneseAudioState() {
  return audioState;
}

export async function getJapaneseVoiceSupport(): Promise<VoiceSupport> {
  if (voiceSupportCache) return voiceSupportCache;

  const voices = await Speech.getAvailableVoicesAsync().catch(() => []);
  const japaneseVoices = voices.filter((voice) => voice.language?.toLowerCase().startsWith('ja'));

  if (japaneseVoices.length === 0) {
    voiceSupportCache = { supported: false, reason: 'missing-ja-voice' };
    return voiceSupportCache;
  }

  const preferredVoice =
    japaneseVoices.find((voice) => voice.language?.toLowerCase() === 'ja-jp') ?? japaneseVoices[0];
  voiceSupportCache = {
    supported: true,
    voice: preferredVoice.identifier,
    language: preferredVoice.language,
  };
  return voiceSupportCache;
}

export async function stopJapaneseAudio() {
  playbackToken += 1;
  await Speech.stop();
  setAudioState({ activeId: null, speaking: false });
}

export async function playJapaneseAudio(text: string, id: string) {
  if (!text.trim()) return;

  if (audioState.speaking && audioState.activeId === id) {
    await stopJapaneseAudio();
    return;
  }

  if (audioState.speaking) {
    await Speech.stop();
  }

  playbackToken += 1;
  const token = playbackToken;
  const preferences = await loadJapaneseAudioPreferences();
  const support = await getJapaneseVoiceSupport();
  if (!support.supported) {
    setAudioState({ activeId: null, speaking: false });
    return { ok: false as const, reason: support.reason };
  }
  setAudioState({ activeId: id, speaking: true });

  Speech.speak(text, {
    language: support.language,
    pitch: 1,
    rate: getSpeechRateValue(preferences.speechRate),
    voice: support.voice,
    onDone: () => {
      if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
    },
    onStopped: () => {
      if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
    },
    onError: () => {
      if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
    },
  });
  return { ok: true as const };
}

export async function playJapaneseSequence(lines: Array<{ id: string; text: string }>, id: string) {
  const filtered = lines.filter((line) => line.text.trim());
  if (filtered.length === 0) return;

  if (audioState.speaking && audioState.activeId === id) {
    await stopJapaneseAudio();
    return;
  }

  if (audioState.speaking) {
    await Speech.stop();
  }

  playbackToken += 1;
  const token = playbackToken;
  const preferences = await loadJapaneseAudioPreferences();
  const support = await getJapaneseVoiceSupport();
  if (!support.supported) {
    setAudioState({ activeId: null, speaking: false });
    return { ok: false as const, reason: support.reason };
  }
  setAudioState({ activeId: id, speaking: true });

  const speakNext = (index: number) => {
    if (token !== playbackToken) return;

    if (index >= filtered.length) {
      setAudioState({ activeId: null, speaking: false });
      return;
    }

    Speech.speak(filtered[index].text, {
      language: support.language,
      pitch: 1,
      rate: getSpeechRateValue(preferences.speechRate),
      voice: support.voice,
      onDone: () => speakNext(index + 1),
      onStopped: () => {
        if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
      },
      onError: () => {
        if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
      },
    });
  };

  speakNext(0);
  return { ok: true as const };
}
