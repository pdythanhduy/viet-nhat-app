import * as Speech from 'expo-speech';
import { getSpeechRateValue, loadJapaneseAudioPreferences } from './audioPreferences';

type AudioState = {
  activeId: string | null;
  speaking: boolean;
};

type VoiceSupport =
  | { supported: true; voice?: string; language: string }
  | { supported: false; reason: 'missing-ja-voice' };

type JapaneseAudioResult =
  | { ok: true }
  | { ok: false; reason: 'missing-ja-voice' }
  | { ok: false; reason: 'speech-error'; message: string };

type Listener = (state: AudioState) => void;

const DEFAULT_SPEECH_CHUNK_LIMIT = 220;
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

function getSpeechChunkLimit(): number {
  const nativeLimit = Number.isFinite(Speech.maxSpeechInputLength)
    ? Speech.maxSpeechInputLength - 1
    : DEFAULT_SPEECH_CHUNK_LIMIT;
  return Math.max(40, Math.min(DEFAULT_SPEECH_CHUNK_LIMIT, nativeLimit));
}

export function splitJapaneseSpeechText(text: string, maxChars = getSpeechChunkLimit()): string[] {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const sentenceLikeParts =
    normalized.match(/[^\n。！？!?]+[。！？!?]?|\n+/g)?.filter((part) => part.trim()) ?? [normalized];
  const chunks: string[] = [];
  let current = '';

  const pushCurrent = () => {
    const trimmed = current.trim();
    if (trimmed) chunks.push(trimmed);
    current = '';
  };

  for (const part of sentenceLikeParts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.length > maxChars) {
      pushCurrent();
      for (let i = 0; i < trimmed.length; i += maxChars) {
        chunks.push(trimmed.slice(i, i + maxChars));
      }
      continue;
    }

    if (current && current.length + trimmed.length + 1 > maxChars) {
      pushCurrent();
    }
    current = current ? `${current} ${trimmed}` : trimmed;
  }
  pushCurrent();

  return chunks;
}

function getErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
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

export async function playJapaneseAudio(text: string, id: string): Promise<JapaneseAudioResult | undefined> {
  const chunks = splitJapaneseSpeechText(text);
  if (chunks.length === 0) return;

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

  let speechStartError: string | undefined;
  const failSpeechStart = (e: unknown) => {
    speechStartError = getErrorMessage(e);
    if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
  };

  const speakNext = (index: number) => {
    if (token !== playbackToken) return;

    if (index >= chunks.length) {
      if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
      return;
    }

    try {
      Speech.speak(chunks[index], {
        language: support.language,
        pitch: 1,
        rate: getSpeechRateValue(preferences.speechRate),
        volume: 1,
        useApplicationAudioSession: false,
        voice: support.voice,
        onDone: () => speakNext(index + 1),
        onStopped: () => {
          if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
        },
        onError: () => {
          if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
        },
      });
    } catch (e) {
      failSpeechStart(e);
    }
  };

  speakNext(0);
  if (speechStartError) {
    return {
      ok: false as const,
      reason: 'speech-error',
      message: speechStartError,
    };
  }
  return { ok: true as const };
}

export async function playJapaneseSequence(
  lines: Array<{ id: string; text: string }>,
  id: string
): Promise<JapaneseAudioResult | undefined> {
  const filtered = lines.flatMap((line) =>
    splitJapaneseSpeechText(line.text).map((chunk, index) => ({
      id: `${line.id}:${index}`,
      text: chunk,
    }))
  );
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

  let speechStartError: string | undefined;
  const failSpeechStart = (e: unknown) => {
    speechStartError = getErrorMessage(e);
    if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
  };

  const speakNext = (index: number) => {
    if (token !== playbackToken) return;

    if (index >= filtered.length) {
      setAudioState({ activeId: null, speaking: false });
      return;
    }

    try {
      Speech.speak(filtered[index].text, {
        language: support.language,
        pitch: 1,
        rate: getSpeechRateValue(preferences.speechRate),
        volume: 1,
        useApplicationAudioSession: false,
        voice: support.voice,
        onDone: () => speakNext(index + 1),
        onStopped: () => {
          if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
        },
        onError: () => {
          if (token === playbackToken) setAudioState({ activeId: null, speaking: false });
        },
      });
    } catch (e) {
      failSpeechStart(e);
    }
  };

  speakNext(0);
  if (speechStartError) {
    return {
      ok: false as const,
      reason: 'speech-error',
      message: speechStartError,
    };
  }
  return { ok: true as const };
}
