jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

jest.mock('./analytics', () => ({ track: jest.fn() }));

jest.mock('expo-store-review', () => ({
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  hasAction: jest.fn().mockResolvedValue(true),
  requestReview: jest.fn().mockResolvedValue(undefined),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

import {
  REVIEW_COOLDOWN_MS,
  maybeRequestReview,
  recordGuideReadForReview,
  shouldRequestReview,
} from './reviewPrompt';

const NOW = 1_800_000_000_000;

describe('reviewPrompt', () => {
  beforeEach(() => jest.clearAllMocks());

  it('waits until 3 distinct guides were read', () => {
    expect(shouldRequestReview({ guideIds: ['a', 'b'] }, NOW)).toBe(false);
    expect(shouldRequestReview({ guideIds: ['a', 'b', 'c'] }, NOW)).toBe(true);
  });

  it('respects the cooldown after a prompt', () => {
    const ids = ['a', 'b', 'c'];
    expect(shouldRequestReview({ guideIds: ids, lastPromptAt: NOW - 1000 }, NOW)).toBe(false);
    expect(shouldRequestReview({ guideIds: ids, lastPromptAt: NOW - REVIEW_COOLDOWN_MS }, NOW)).toBe(true);
  });

  it('does not store the same guide twice', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ guideIds: ['a'] }));
    await recordGuideReadForReview('a');
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('requests a review and records the prompt time', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ guideIds: ['a', 'b', 'c'] }));
    await maybeRequestReview(NOW);
    expect(StoreReview.requestReview).toHaveBeenCalledTimes(1);
    expect(JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1])).toEqual({
      guideIds: ['a', 'b', 'c'],
      lastPromptAt: NOW,
    });
  });

  it('stays silent with too few guides', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ guideIds: ['a'] }));
    await maybeRequestReview(NOW);
    expect(StoreReview.requestReview).not.toHaveBeenCalled();
  });
});
