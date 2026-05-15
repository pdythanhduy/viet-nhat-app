// All app dates are interpreted as JST (Asia/Tokyo) calendar days, so the
// result is the same regardless of the runtime timezone (JST locally, UTC on
// CI). Previously `setHours(0, 0, 0, 0)` floored to the runner's local
// midnight, which made the same call return different values on JST vs UTC.
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toJstCalendarDayStart(ms: number): number {
  return Math.floor((ms + JST_OFFSET_MS) / MS_PER_DAY) * MS_PER_DAY - JST_OFFSET_MS;
}

export function getDaysUntil(isoDate: string, fromDate = new Date()): number {
  const target = new Date(`${isoDate}T00:00:00+09:00`).getTime();
  const today = toJstCalendarDayStart(fromDate.getTime());
  return Math.round((target - today) / MS_PER_DAY);
}
