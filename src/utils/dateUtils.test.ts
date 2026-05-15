import { getDaysUntil } from './dateUtils';

// Timezone convention for these tests:
//
// `getDaysUntil` parses the target ISO date string as UTC midnight (browser
// default) and normalizes both target and `fromDate` to LOCAL midnight via
// Date.setHours(0, 0, 0, 0). This matches real product behavior: end users
// are in Japan (JST), and "now" comes from their device clock.
//
// CI runs in UTC, so the `fromDate` value MUST be a moment that resolves to
// the SAME calendar day in both JST and UTC. Concretely: keep the JST clock
// time at >= 09:00 so the UTC representation stays on the same day. A morning
// JST time (e.g. 08:00+09:00 = 23:00Z previous day) caused PRs #11–#22 to
// fail CI's Verify check while passing locally on JST laptops.
//
// Pick `fromDate` times in the JST afternoon (12:00–22:00) to be TZ-stable.

describe('dateUtils', () => {
  it('returns positive days for future dates', () => {
    // 18:30 JST = 09:30 UTC — both April 10.
    expect(getDaysUntil('2026-04-15', new Date('2026-04-10T18:30:00+09:00'))).toBe(5);
  });

  it('returns zero for the same calendar day', () => {
    // 23:59 JST = 14:59 UTC — both April 10.
    expect(getDaysUntil('2026-04-10', new Date('2026-04-10T23:59:00+09:00'))).toBe(0);
  });

  it('returns negative days for past dates', () => {
    // 18:00 JST = 09:00 UTC — both April 10. (Previous value 08:00 JST = 23:00Z
    // April 9, which made setHours(0,0,0,0) snap to April 9 in UTC and yield -8
    // instead of -9 — see CI failures on PRs #11–#22.)
    expect(getDaysUntil('2026-04-01', new Date('2026-04-10T18:00:00+09:00'))).toBe(-9);
  });
});
