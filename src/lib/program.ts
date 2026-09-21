export function getProgramDay(startDate: Date, durationDays = 90) {
  const now = new Date();
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diff = Math.floor((now.getTime() - start.getTime()) / 86_400_000) + 1;
  return Math.min(Math.max(diff, 1), durationDays);
}

export function getProgramPercent(currentDay: number, totalDays = 90) {
  return Math.min(100, Math.max(0, Math.round((currentDay / totalDays) * 100)));
}
