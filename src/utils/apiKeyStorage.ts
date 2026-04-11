import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { StorageKeys } from '../constants/storageKeys';

export const API_KEY_STORAGE = StorageKeys.claudeApiKey;

async function canUseSecureStore() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function loadClaudeApiKey(): Promise<string | null> {
  if (await canUseSecureStore()) {
    const secureKey = await SecureStore.getItemAsync(API_KEY_STORAGE);
    if (secureKey) return secureKey;

    const legacyKey = await AsyncStorage.getItem(API_KEY_STORAGE);
    if (legacyKey) {
      await SecureStore.setItemAsync(API_KEY_STORAGE, legacyKey);
      await AsyncStorage.removeItem(API_KEY_STORAGE);
      return legacyKey;
    }
    return null;
  }

  return AsyncStorage.getItem(API_KEY_STORAGE);
}

export async function saveClaudeApiKey(apiKey: string): Promise<void> {
  if (await canUseSecureStore()) {
    await SecureStore.setItemAsync(API_KEY_STORAGE, apiKey);
    await AsyncStorage.removeItem(API_KEY_STORAGE);
    return;
  }

  await AsyncStorage.setItem(API_KEY_STORAGE, apiKey);
}

export async function deleteClaudeApiKey(): Promise<void> {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(API_KEY_STORAGE);
  }

  await AsyncStorage.removeItem(API_KEY_STORAGE);
}
