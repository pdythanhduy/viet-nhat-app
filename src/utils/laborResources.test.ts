import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadLaborResourceStates,
  markLaborResourceViewed,
  toggleLaborResourcePinned,
  toggleLaborResourceSaved,
} from './laborResources';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('laborResources', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('saves and unsaves a labor resource', async () => {
    expect(await toggleLaborResourceSaved('labor-guide')).toBe(true);

    let states = await loadLaborResourceStates();
    expect(states[0]?.id).toBe('labor-guide');
    expect(states[0]?.savedAt).toBeTruthy();

    expect(await toggleLaborResourceSaved('labor-guide')).toBe(false);

    states = await loadLaborResourceStates();
    expect(states[0]?.savedAt).toBeUndefined();
  });

  it('pinning a labor resource also saves it', async () => {
    expect(await toggleLaborResourcePinned('labor-help')).toBe(true);

    const states = await loadLaborResourceStates();
    expect(states[0]?.savedAt).toBeTruthy();
    expect(states[0]?.pinnedAt).toBeTruthy();
  });

  it('tracks last viewed state', async () => {
    await markLaborResourceViewed('official-law');

    const states = await loadLaborResourceStates();
    expect(states[0]?.id).toBe('official-law');
    expect(states[0]?.lastViewedAt).toBeTruthy();
  });
});
