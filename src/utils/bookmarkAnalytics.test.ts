jest.mock('@aptabase/react-native', () => ({
  init: jest.fn(),
  trackEvent: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { trackEvent } from '@aptabase/react-native';
import { logBookmarkToggled } from './analytics';

// Phase R1 — pin the wiring between logBookmarkToggled and the
// guide_save / guide_unsave analytics events. The Aptabase trackEvent
// is mocked so we can spy on the exact event names + payloads emitted
// per toggle.

describe('logBookmarkToggled — guide_save / guide_unsave', () => {
  const mockedTrack = trackEvent as jest.Mock;

  beforeEach(() => {
    mockedTrack.mockClear();
  });

  it('does not crash on non-guide bookmark types', async () => {
    await expect(
      logBookmarkToggled('phrase', 'some-phrase', true, '')
    ).resolves.toBeUndefined();
    await expect(
      logBookmarkToggled('dialogue', 'some-dialogue', false, '')
    ).resolves.toBeUndefined();
    await expect(
      logBookmarkToggled('daily-life', 'some-topic', true, '')
    ).resolves.toBeUndefined();
  });

  it('handles missing category by defaulting to empty string', async () => {
    // Backward-compat path — old call site that didn't pass category
    await expect(
      logBookmarkToggled('guide', 'my-number-card', true)
    ).resolves.toBeUndefined();
  });

  it('discriminates between save (added) and unsave (removed)', async () => {
    // We can't observe Aptabase trackEvent directly in the unit env (the
    // track() helper short-circuits when getAptabaseKey() returns null),
    // but the console.log call path always fires in __DEV__:
    //   console.log('[analytics]', name, props ?? '')
    // So we spy on console.log and inspect args[1] (event name) and
    // args[2] (payload object) directly.
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await logBookmarkToggled('guide', 'visa-renewal', true, 'visa');
      await logBookmarkToggled('guide', 'visa-renewal', false, 'visa');

      const analyticsCalls = logSpy.mock.calls.filter((args) => args[0] === '[analytics]');
      const saveCall = analyticsCalls.find((args) => args[1] === 'guide_save');
      const unsaveCall = analyticsCalls.find((args) => args[1] === 'guide_unsave');

      expect(saveCall).toBeDefined();
      expect(unsaveCall).toBeDefined();
      expect(saveCall![2]).toEqual({ guide_id: 'visa-renewal', category: 'visa' });
      expect(unsaveCall![2]).toEqual({ guide_id: 'visa-renewal', category: 'visa' });
    } finally {
      logSpy.mockRestore();
    }
  });

  it('non-guide types do not emit guide_save or guide_unsave', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await logBookmarkToggled('phrase', 'p1', true, '');
      await logBookmarkToggled('daily-life', 'dl1', false, '');

      const analyticsCalls = logSpy.mock.calls.filter((args) => args[0] === '[analytics]');
      expect(analyticsCalls.some((args) => args[1] === 'guide_save')).toBe(false);
      expect(analyticsCalls.some((args) => args[1] === 'guide_unsave')).toBe(false);
    } finally {
      logSpy.mockRestore();
    }
  });
});
