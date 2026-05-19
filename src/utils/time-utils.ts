const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

export function getAge(dob: Date): number {
  const nowMS = new Date().getTime();
  const dobMS = dob.getTime();
  const d = nowMS - dobMS;
  return Math.trunc(d / MS_IN_YEAR);
}

export function timeAgo(inputDate: Date | string): string {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 60_000) return "just now";

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return plural(minutes, "minute");

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return plural(hours, "hour");

  const days = Math.floor(hours / 24);
  if (days < 7) return plural(days, "day");

  if (days < 30) return plural(Math.floor(days / 7), "week");

  let months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (now.getDate() < date.getDate()) months -= 1;

  if (months < 12) return plural(months, "month");

  return plural(Math.floor(months / 12), "year");
}

function plural(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}

export function prependZero(number: number): string {
  if (number < 10) return "0" + number;
  return number + "";
}

export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const d = date instanceof Date ? date : new Date(date);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(d);
}

export function formatTime(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return `${prependZero(d.getHours())}:${prependZero(d.getMinutes())}`;
}

