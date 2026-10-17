import {
  formatLunarDate,
  getCallHomeHint,
  getCanChiYear,
  getHomelandSnapshot,
  getUpcomingOccasions,
  getVietnamClock,
  lunarToSolar,
  solarToLunar,
} from './vietCalendar';

describe('vietCalendar', () => {
  it('finds Tết Nguyên Đán on the published dates', () => {
    expect(lunarToSolar(1, 1, 2024)).toEqual({ day: 10, month: 2, year: 2024 });
    expect(lunarToSolar(1, 1, 2025)).toEqual({ day: 29, month: 1, year: 2025 });
    expect(lunarToSolar(1, 1, 2026)).toEqual({ day: 17, month: 2, year: 2026 });
    expect(lunarToSolar(1, 1, 2027)).toEqual({ day: 6, month: 2, year: 2027 });
  });

  it('finds Tết Trung Thu on the published dates', () => {
    expect(lunarToSolar(15, 8, 2024)).toEqual({ day: 17, month: 9, year: 2024 });
    expect(lunarToSolar(15, 8, 2025)).toEqual({ day: 6, month: 10, year: 2025 });
    expect(lunarToSolar(15, 8, 2026)).toEqual({ day: 25, month: 9, year: 2026 });
  });

  it('handles the leap sixth month of 2025', () => {
    expect(solarToLunar(25, 7, 2025)).toEqual({ day: 1, month: 6, year: 2025, leap: true });
    expect(lunarToSolar(1, 6, 2025, true)).toEqual({ day: 25, month: 7, year: 2025 });
    expect(lunarToSolar(1, 5, 2025, true)).toBeNull();
  });

  it('round-trips solar → lunar → solar', () => {
    for (const [d, m, y] of [[1, 1, 2026], [17, 10, 2026], [31, 12, 2027], [15, 6, 2025]]) {
      const lunar = solarToLunar(d, m, y);
      expect(lunarToSolar(lunar.day, lunar.month, lunar.year, lunar.leap)).toEqual({ day: d, month: m, year: y });
    }
  });

  it('names can-chi years', () => {
    expect(getCanChiYear(2025)).toBe('Ất Tỵ');
    expect(getCanChiYear(2026)).toBe('Bính Ngọ');
    expect(getCanChiYear(2027)).toBe('Đinh Mùi');
  });

  it('formats lunar dates the way Vietnamese families say them', () => {
    expect(formatLunarDate({ day: 8, month: 9, year: 2026, leap: false })).toBe('Mùng 8 tháng Chín');
    expect(formatLunarDate({ day: 15, month: 1, year: 2026, leap: false })).toBe('Rằm tháng Giêng');
    expect(formatLunarDate({ day: 23, month: 12, year: 2026, leap: false })).toBe('23 tháng Chạp');
    expect(formatLunarDate({ day: 2, month: 6, year: 2025, leap: true })).toBe('Mùng 2 tháng Sáu (nhuận)');
  });

  it('shows Vietnam time two hours behind Japan', () => {
    // 14:30 in Japan
    expect(getVietnamClock(new Date('2026-10-17T05:30:00Z'))).toBe('12:30');
    // 01:10 in Japan → 23:10 the previous evening in Vietnam
    expect(getVietnamClock(new Date('2026-10-16T16:10:00Z'))).toBe('23:10');
  });

  it('suggests messaging instead of calling late at night in Vietnam', () => {
    expect(getCallHomeHint(new Date('2026-10-16T16:10:00Z'))).toMatch(/khuya/);
    expect(getCallHomeHint(new Date('2026-10-17T12:00:00Z'))).toMatch(/gọi video/);
  });

  it('lists upcoming occasions nearest first, crossing into the next year', () => {
    const upcoming = getUpcomingOccasions(new Date('2026-12-30T05:00:00Z'), 2);
    expect(upcoming.map((o) => o.id)).toEqual(['ong-tao', 'tet']);
    expect(upcoming[1].solar).toEqual({ day: 6, month: 2, year: 2027 });
    expect(upcoming[1].daysLeft).toBe(38);
  });

  it('counts an occasion happening today as 0 days away', () => {
    const upcoming = getUpcomingOccasions(new Date('2026-10-20T01:00:00Z'), 1);
    expect(upcoming[0]).toMatchObject({ id: 'phu-nu-vn', daysLeft: 0 });
  });

  it('builds a Home snapshot from the Japanese calendar day', () => {
    const snapshot = getHomelandSnapshot(new Date('2026-10-17T05:30:00Z'));
    expect(snapshot).toMatchObject({
      vietnamClock: '12:30',
      lunarLabel: 'Mùng 8 tháng Chín',
      lunarDayLabel: 'Mùng 8',
      lunarMonthLabel: 'tháng Chín',
      lunarYearLabel: 'năm Bính Ngọ',
      tetDaysLeft: 112,
      tetYearLabel: 'Đinh Mùi',
    });
    expect(snapshot.nextOccasion?.id).toBe('phu-nu-vn');
  });
});
