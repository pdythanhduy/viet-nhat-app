import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';
import type { FuriganaToken } from './furigana';
import type { VietnameseSentenceTranslation } from './translate';

export type FuriganaReaderSession = {
  input: string;
  tokens: FuriganaToken[];
  translationLines: VietnameseSentenceTranslation[];
  savedAt: number;
};

type FuriganaReaderSessionRecord = {
  input: unknown;
  tokens: unknown;
  translationLines: unknown;
  savedAt: unknown;
};

function coerceTokens(value: unknown): FuriganaToken[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    const surface = typeof record.surface === 'string' ? record.surface : '';
    if (!surface) return [];
    const reading = record.reading === null || typeof record.reading === 'string' ? record.reading : null;
    return [{ surface, reading }];
  });
}

function coerceTranslationLines(value: unknown): VietnameseSentenceTranslation[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    const source = typeof record.source === 'string' ? record.source.trim() : '';
    const translation = typeof record.translation === 'string' ? record.translation.trim() : '';
    if (!source || !translation) return [];
    return [{ source, translation }];
  });
}

function parseSession(raw: string): FuriganaReaderSession | null {
  try {
    const parsed = JSON.parse(raw) as FuriganaReaderSessionRecord;
    const input = typeof parsed.input === 'string' ? parsed.input.trim() : '';
    if (!input) return null;
    return {
      input,
      tokens: coerceTokens(parsed.tokens),
      translationLines: coerceTranslationLines(parsed.translationLines),
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export async function loadFuriganaReaderSession(): Promise<FuriganaReaderSession | null> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.furiganaReaderSession);
    if (!raw) return null;
    return parseSession(raw);
  } catch {
    return null;
  }
}

export async function saveFuriganaReaderSession(session: FuriganaReaderSession): Promise<void> {
  try {
    const input = session.input.trim();
    if (!input) {
      await AsyncStorage.removeItem(StorageKeys.furiganaReaderSession);
      return;
    }

    await AsyncStorage.setItem(
      StorageKeys.furiganaReaderSession,
      JSON.stringify({
        input,
        tokens: session.tokens,
        translationLines: session.translationLines,
        savedAt: session.savedAt,
      })
    );
  } catch {
    // Best-effort persistence.
  }
}

export async function clearFuriganaReaderSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(StorageKeys.furiganaReaderSession);
  } catch {
    // Best-effort persistence.
  }
}
