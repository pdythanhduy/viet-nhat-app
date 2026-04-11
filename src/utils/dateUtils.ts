export function getDaysUntil(isoDate: string, fromDate = new Date()): number {
  const target = new Date(isoDate);
  target.setHours(0, 0, 0, 0);

  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);

  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
