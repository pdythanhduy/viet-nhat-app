import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

import { StorageKeys } from '../constants/storageKeys';
import { track } from './analytics';

// In-app review prompt (App Store / Play rating sheet).
//
// Asks only after the user has read a few different guides — i.e. they
// already got value — and only when they leave a guide, never while
// they are reading. The OS also rate-limits the sheet (iOS: 3x / year),
// so this is a "may show", not a guaranteed dialog.

export const REVIEW_MIN_DISTINCT_GUIDES = 3;
export const REVIEW_COOLDOWN_MS = 120 * 24 * 60 * 60 * 1000;
const MAX_TRACKED_GUIDES = 20;

interface ReviewPromptState {
  guideIds: string[];
  lastPromptAt?: number;
}

async function loadState(): Promise<ReviewPromptState> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.reviewPromptState);
    if (!raw) return { guideIds: [] };
    const parsed = JSON.parse(raw) as Partial<ReviewPromptState>;
    return {
      guideIds: Array.isArray(parsed.guideIds) ? parsed.guideIds.filter((id) => typeof id === 'string') : [],
      lastPromptAt: typeof parsed.lastPromptAt === 'number' ? parsed.lastPromptAt : undefined,
    };
  } catch {
    return { guideIds: [] };
  }
}

async function saveState(state: ReviewPromptState): Promise<void> {
  await AsyncStorage.setItem(StorageKeys.reviewPromptState, JSON.stringify(state));
}

export async function recordGuideReadForReview(guideId: string): Promise<void> {
  const state = await loadState();
  if (state.guideIds.includes(guideId)) return;
  state.guideIds = [...state.guideIds, guideId].slice(-MAX_TRACKED_GUIDES);
  await saveState(state);
}

export function shouldRequestReview(state: ReviewPromptState, now: number): boolean {
  if (state.guideIds.length < REVIEW_MIN_DISTINCT_GUIDES) return false;
  if (state.lastPromptAt !== undefined && now - state.lastPromptAt < REVIEW_COOLDOWN_MS) return false;
  return true;
}

export async function maybeRequestReview(now: number = Date.now()): Promise<void> {
  const state = await loadState();
  if (!shouldRequestReview(state, now)) return;

  if (!(await StoreReview.isAvailableAsync()) || !(await StoreReview.hasAction())) return;

  await saveState({ ...state, lastPromptAt: now });
  track('review_prompt_shown', { guides_read: state.guideIds.length });
  await StoreReview.requestReview();
}
