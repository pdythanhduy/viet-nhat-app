// Vietnamese lunar calendar + Vietnam clock, for the Home "Góc quê nhà"
// card. Pure and on-device: no network, no locale data.
//
// Lunar conversion follows Hồ Ngọc Đức's published algorithm
// (https://www.informatik.uni-leipzig.de/~duc/amlich/) computed for the
// Vietnam timezone (UTC+7). The Vietnamese calendar differs from the
// Chinese one in some years precisely because of that timezone, so the
// offset is not configurable here.

const VN_TZ = 7;
const JP_TZ = 9;

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
}

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function jdToDate(jd: number): { day: number; month: number; year: number } {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: b * 100 + d - 4800 + Math.floor(m / 10),
  };
}

function getNewMoonDay(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  const JdNew = Jd1 + C1 - deltat;
  return Math.floor(JdNew + 0.5 + VN_TZ / 24);
}

function getSunLongitude(jdn: number): number {
  const T = (jdn - 2451545.5 - VN_TZ / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor((L / Math.PI) * 6);
}

function getLunarMonth11(yy: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k);
  if (getSunLongitude(nm) >= 9) nm = getNewMoonDay(k - 1);
  return nm;
}

function getLeapMonthOffset(a11: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last: number;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i));
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i));
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(dd: number, mm: number, yy: number): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k);

  let a11 = getLunarMonth11(yy);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
}

export function lunarToSolar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap = false
): { day: number; month: number; year: number } | null {
  let a11: number;
  let b11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1);
    b11 = getLunarMonth11(lunarYear);
  } else {
    a11 = getLunarMonth11(lunarYear);
    b11 = getLunarMonth11(lunarYear + 1);
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (lunarLeap && lunarMonth !== leapMonth) return null;
    if (lunarLeap || off >= leapOff) off += 1;
  } else if (lunarLeap) {
    return null;
  }
  const monthStart = getNewMoonDay(k + off);
  return jdToDate(monthStart + lunarDay - 1);
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/** "Bính Ngọ" for lunar year 2026. */
export function getCanChiYear(lunarYear: number): string {
  return `${CAN[(lunarYear + 6) % 10]} ${CHI[(lunarYear + 8) % 12]}`;
}

const LUNAR_MONTH_NAMES = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'];

/** { day: "Mùng 7", month: "tháng Chín" } / { day: "Rằm", month: "tháng Sáu (nhuận)" }. */
export function formatLunarParts(lunar: LunarDate): { day: string; month: string } {
  return {
    day: lunar.day === 15 ? 'Rằm' : lunar.day <= 10 ? `Mùng ${lunar.day}` : `${lunar.day}`,
    month: `tháng ${LUNAR_MONTH_NAMES[lunar.month - 1]}${lunar.leap ? ' (nhuận)' : ''}`,
  };
}

/** "Mùng 7 tháng Chín" / "Rằm tháng Tám" / "23 tháng Chạp (nhuận)". */
export function formatLunarDate(lunar: LunarDate): string {
  const { day, month } = formatLunarParts(lunar);
  return `${day} ${month}`;
}

/** Calendar date + wall clock as seen at a fixed UTC offset. */
export function getZonedParts(now: Date, utcOffsetHours: number) {
  const shifted = new Date(now.getTime() + utcOffsetHours * 3600 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hours: shifted.getUTCHours(),
    minutes: shifted.getUTCMinutes(),
  };
}

export function formatClock(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/** Vietnam has no DST, Japan has no DST: the gap is always 2 hours. */
export const VN_BEHIND_JP_HOURS = JP_TZ - VN_TZ;

export function getVietnamClock(now: Date): string {
  const vn = getZonedParts(now, VN_TZ);
  return formatClock(vn.hours, vn.minutes);
}

/** A friendly hint for whether it's a good moment to call home. */
export function getCallHomeHint(now: Date): string {
  const { hours } = getZonedParts(now, VN_TZ);
  if (hours >= 22 || hours < 6) return 'Ở nhà đang khuya — nhắn tin thay vì gọi nhé';
  if (hours < 9) return 'Ở nhà mới sáng sớm';
  if (hours >= 11 && hours < 14) return 'Ở nhà đang giờ cơm trưa';
  if (hours >= 18 && hours < 22) return 'Giờ đẹp để gọi video về nhà';
  return 'Ở nhà đang giờ làm việc';
}

export interface VietOccasion {
  id: string;
  name: string;
  kind: 'lunar' | 'solar';
  month: number;
  day: number;
}

// Dates a Vietnamese family abroad actually marks. Lunar entries are
// converted per year; Tết is handled via its own countdown too.
export const VIET_OCCASIONS: ReadonlyArray<VietOccasion> = [
  { id: 'tet', name: 'Tết Nguyên Đán', kind: 'lunar', month: 1, day: 1 },
  { id: 'ram-thang-gieng', name: 'Rằm tháng Giêng', kind: 'lunar', month: 1, day: 15 },
  { id: 'phu-nu-quoc-te', name: 'Quốc tế Phụ nữ 8/3', kind: 'solar', month: 3, day: 8 },
  { id: 'gio-to', name: 'Giỗ Tổ Hùng Vương', kind: 'lunar', month: 3, day: 10 },
  { id: 'thong-nhat', name: 'Ngày Thống nhất 30/4', kind: 'solar', month: 4, day: 30 },
  { id: 'doan-ngo', name: 'Tết Đoan Ngọ', kind: 'lunar', month: 5, day: 5 },
  { id: 'vu-lan', name: 'Lễ Vu Lan', kind: 'lunar', month: 7, day: 15 },
  { id: 'quoc-khanh', name: 'Quốc khánh 2/9', kind: 'solar', month: 9, day: 2 },
  { id: 'trung-thu', name: 'Tết Trung Thu', kind: 'lunar', month: 8, day: 15 },
  { id: 'phu-nu-vn', name: 'Ngày Phụ nữ Việt Nam 20/10', kind: 'solar', month: 10, day: 20 },
  { id: 'nha-giao', name: 'Ngày Nhà giáo 20/11', kind: 'solar', month: 11, day: 20 },
  { id: 'ong-tao', name: 'Ông Công Ông Táo', kind: 'lunar', month: 12, day: 23 },
];

export interface UpcomingOccasion {
  id: string;
  name: string;
  daysLeft: number;
  solar: { day: number; month: number; year: number };
}

function occurrenceInYear(occasion: VietOccasion, year: number) {
  if (occasion.kind === 'solar') return { day: occasion.day, month: occasion.month, year };
  // A lunar date falls in solar `year` for lunar year `year`, except the
  // last lunar months which can spill into the next solar year — so try
  // both lunar years that can land in this solar year.
  const candidates = [lunarToSolar(occasion.day, occasion.month, year), lunarToSolar(occasion.day, occasion.month, year - 1)];
  return candidates.find((c) => c && c.year === year) ?? null;
}

/** Upcoming occasions within the next year, nearest first. Today counts (daysLeft 0). */
export function getUpcomingOccasions(now: Date, limit = 3): UpcomingOccasion[] {
  const today = getZonedParts(now, JP_TZ);
  const todayJd = jdFromDate(today.day, today.month, today.year);
  const found: UpcomingOccasion[] = [];
  for (const occasion of VIET_OCCASIONS) {
    for (const year of [today.year, today.year + 1]) {
      const solar = occurrenceInYear(occasion, year);
      if (!solar) continue;
      const daysLeft = jdFromDate(solar.day, solar.month, solar.year) - todayJd;
      if (daysLeft >= 0) {
        found.push({ id: occasion.id, name: occasion.name, daysLeft, solar });
        break;
      }
    }
  }
  return found.sort((a, b) => a.daysLeft - b.daysLeft).slice(0, limit);
}

export interface HomelandSnapshot {
  vietnamClock: string;
  callHint: string;
  lunarLabel: string;
  lunarDayLabel: string;
  lunarMonthLabel: string;
  lunarYearLabel: string;
  tetDaysLeft: number;
  tetYearLabel: string;
  nextOccasion: UpcomingOccasion | null;
}

export function getHomelandSnapshot(now: Date): HomelandSnapshot {
  // The user lives in Japan, so "today" is the Japanese calendar day.
  const jp = getZonedParts(now, JP_TZ);
  const lunar = solarToLunar(jp.day, jp.month, jp.year);
  const occasions = getUpcomingOccasions(now, VIET_OCCASIONS.length);
  const tet = occasions.find((o) => o.id === 'tet');
  const nextOther = occasions.find((o) => o.id !== 'tet') ?? null;
  const tetLunarYear = tet ? solarToLunar(tet.solar.day, tet.solar.month, tet.solar.year).year : lunar.year + 1;
  return {
    vietnamClock: getVietnamClock(now),
    callHint: getCallHomeHint(now),
    lunarLabel: formatLunarDate(lunar),
    lunarDayLabel: formatLunarParts(lunar).day,
    lunarMonthLabel: formatLunarParts(lunar).month,
    lunarYearLabel: `năm ${getCanChiYear(lunar.year)}`,
    tetDaysLeft: tet ? tet.daysLeft : 0,
    tetYearLabel: getCanChiYear(tetLunarYear),
    nextOccasion: nextOther,
  };
}
