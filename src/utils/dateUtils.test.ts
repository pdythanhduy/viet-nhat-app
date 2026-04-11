import { getDaysUntil } from './dateUtils';

describe('dateUtils', () => {
  it('returns positive days for future dates', () => {
    expect(getDaysUntil('2026-04-15', new Date('2026-04-10T18:30:00+09:00'))).toBe(5);
  });

  it('returns zero for the same calendar day', () => {
    expect(getDaysUntil('2026-04-10', new Date('2026-04-10T23:59:00+09:00'))).toBe(0);
  });

  it('returns negative days for past dates', () => {
    expect(getDaysUntil('2026-04-01', new Date('2026-04-10T08:00:00+09:00'))).toBe(-9);
  });
});
