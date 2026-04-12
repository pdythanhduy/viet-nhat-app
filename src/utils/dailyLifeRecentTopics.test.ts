import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadRecentDailyLifeTopics,
  recordRecentDailyLifeTopic,
  saveRecentDailyLifeTopics,
} from './dailyLifeRecentTopics';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('dailyLifeRecentTopics', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('loads empty list by default', async () => {
    await expect(loadRecentDailyLifeTopics()).resolves.toEqual([]);
  });

  it('saves and loads recent topics', async () => {
    const items = [{ topicId: 'transportation', viewedAt: '2026-04-12T00:00:00.000Z' }];
    await saveRecentDailyLifeTopics(items);
    await expect(loadRecentDailyLifeTopics()).resolves.toEqual(items);
  });

  it('keeps newest unique topic first', async () => {
    await recordRecentDailyLifeTopic('apartment');
    await recordRecentDailyLifeTopic('transportation');
    await recordRecentDailyLifeTopic('apartment');

    const items = await loadRecentDailyLifeTopics();
    expect(items).toHaveLength(2);
    expect(items[0].topicId).toBe('apartment');
    expect(items[1].topicId).toBe('transportation');
  });
});
