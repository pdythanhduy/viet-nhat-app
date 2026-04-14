import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearGuideChecklistProgress,
  loadGuideChecklistProgress,
  saveGuideChecklistProgress,
  toggleGuideChecklistItem,
} from './guideChecklistProgress';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('guideChecklistProgress', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('saves and loads checklist progress per guide', async () => {
    await saveGuideChecklistProgress('health-insurance', ['Thẻ cư trú']);
    await saveGuideChecklistProgress('bank-account', ['Số điện thoại Nhật']);

    await expect(loadGuideChecklistProgress('health-insurance')).resolves.toEqual(['Thẻ cư trú']);
    await expect(loadGuideChecklistProgress('bank-account')).resolves.toEqual(['Số điện thoại Nhật']);
  });

  it('toggles checklist items', async () => {
    await expect(toggleGuideChecklistItem('my-number', 'Thẻ cư trú')).resolves.toEqual(['Thẻ cư trú']);
    await expect(toggleGuideChecklistItem('my-number', 'Ảnh thẻ')).resolves.toEqual([
      'Thẻ cư trú',
      'Ảnh thẻ',
    ]);
    await expect(toggleGuideChecklistItem('my-number', 'Thẻ cư trú')).resolves.toEqual(['Ảnh thẻ']);
  });

  it('clears one guide without touching others', async () => {
    await saveGuideChecklistProgress('my-number', ['Thẻ cư trú']);
    await saveGuideChecklistProgress('bank-account', ['Thẻ cư trú']);

    await clearGuideChecklistProgress('my-number');

    await expect(loadGuideChecklistProgress('my-number')).resolves.toEqual([]);
    await expect(loadGuideChecklistProgress('bank-account')).resolves.toEqual(['Thẻ cư trú']);
  });
  it('swallows storage errors in save and clear helpers', async () => {
    const getItemSpy = jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('boom'));
    await expect(saveGuideChecklistProgress('my-number', ['Th蘯ｻ cﾆｰ trﾃｺ'])).resolves.toBeUndefined();
    getItemSpy.mockRestore();

    await saveGuideChecklistProgress('my-number', ['Th蘯ｻ cﾆｰ trﾃｺ']);

    const setItemSpy = jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('boom'));
    await expect(clearGuideChecklistProgress('my-number')).resolves.toBeUndefined();
    setItemSpy.mockRestore();
  });
});
