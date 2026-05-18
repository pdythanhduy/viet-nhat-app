jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadReminderHooks,
  saveReminderHooks,
  loadReminderPreferences,
  saveReminderPreferences,
  shouldFire,
  DEFAULT_PREFERENCES,
  type ReminderHook,
} from './reminderHooks';

const sampleHook: ReminderHook = {
  id: 'h1',
  kind: 'visa-renewal',
  triggerDate: '2026-08-01T00:00:00.000Z',
  enabled: true,
  createdAt: '2026-05-18T00:00:00.000Z',
  guideId: 'residence-card',
  label: 'Gia hạn visa tháng 8',
};

describe('reminderHooks storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns empty list when storage is empty', async () => {
    expect(await loadReminderHooks()).toEqual([]);
  });

  it('round-trips hooks through save+load', async () => {
    await saveReminderHooks([sampleHook]);
    const loaded = await loadReminderHooks();
    expect(loaded).toEqual([sampleHook]);
  });

  it('returns default preferences when none stored', async () => {
    expect(await loadReminderPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it('defaults are opt-OUT: globalEnabled false + all per-kind false', () => {
    expect(DEFAULT_PREFERENCES.globalEnabled).toBe(false);
    for (const v of Object.values(DEFAULT_PREFERENCES.perKindEnabled)) {
      expect(v).toBe(false);
    }
  });

  it('defaults cap monthly notifications at 4 (anti-spam)', () => {
    expect(DEFAULT_PREFERENCES.monthlyCap).toBe(4);
  });

  it('merges stored prefs with defaults (defensive against schema drift)', async () => {
    // Simulate an old-client persisted prefs object missing the
    // mynumber kind (added in a later schema version).
    await AsyncStorage.setItem(
      'reminder_preferences_v1',
      JSON.stringify({
        globalEnabled: true,
        perKindEnabled: {
          'visa-renewal': true,
          // tax-season, moving, insurance-renewal, mynumber all missing
        },
        monthlyCap: 2,
      })
    );
    const prefs = await loadReminderPreferences();
    expect(prefs.globalEnabled).toBe(true);
    expect(prefs.monthlyCap).toBe(2);
    expect(prefs.perKindEnabled['visa-renewal']).toBe(true);
    // Missing kinds should fall back to defaults (false)
    expect(prefs.perKindEnabled['tax-season']).toBe(false);
    expect(prefs.perKindEnabled['mynumber']).toBe(false);
  });

  it('survives corrupt JSON in storage', async () => {
    await AsyncStorage.setItem('reminder_hooks_v1', 'not-valid-json');
    expect(await loadReminderHooks()).toEqual([]);
    await AsyncStorage.setItem('reminder_preferences_v1', 'not-valid-json');
    expect(await loadReminderPreferences()).toEqual(DEFAULT_PREFERENCES);
  });
});

describe('shouldFire', () => {
  it('false when globalEnabled is false (master switch)', () => {
    const prefs = {
      ...DEFAULT_PREFERENCES,
      globalEnabled: false,
      perKindEnabled: { ...DEFAULT_PREFERENCES.perKindEnabled, 'visa-renewal': true },
    };
    expect(shouldFire(sampleHook, prefs)).toBe(false);
  });

  it('false when per-kind is disabled', () => {
    const prefs = {
      ...DEFAULT_PREFERENCES,
      globalEnabled: true,
      perKindEnabled: { ...DEFAULT_PREFERENCES.perKindEnabled, 'visa-renewal': false },
    };
    expect(shouldFire(sampleHook, prefs)).toBe(false);
  });

  it('false when the hook itself is disabled', () => {
    const prefs = {
      ...DEFAULT_PREFERENCES,
      globalEnabled: true,
      perKindEnabled: { ...DEFAULT_PREFERENCES.perKindEnabled, 'visa-renewal': true },
    };
    expect(shouldFire({ ...sampleHook, enabled: false }, prefs)).toBe(false);
  });

  it('true only when all three switches are on', () => {
    const prefs = {
      ...DEFAULT_PREFERENCES,
      globalEnabled: true,
      perKindEnabled: { ...DEFAULT_PREFERENCES.perKindEnabled, 'visa-renewal': true },
    };
    expect(shouldFire(sampleHook, prefs)).toBe(true);
  });
});
