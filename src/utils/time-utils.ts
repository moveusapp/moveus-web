import strings from "@/translations/strings";

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

  if (diffMs < 60_000) return strings.time.justNow;

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return ago(minutes, "minute", "minutes");

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return ago(hours, "hour", "hours");

  const days = Math.floor(hours / 24);
  if (days < 7) return ago(days, "day", "days");

  if (days < 30) return ago(Math.floor(days / 7), "week", "weeks");

  let months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (now.getDate() < date.getDate()) months -= 1;

  if (months < 12) return ago(months, "month", "months");

  return ago(Math.floor(months / 12), "year", "years");
}

function ago(count: number, singular: string, plural: string): string {
  const time = strings.time as unknown as Record<string, string>;
  const unit = count === 1 ? time[singular] : time[plural];
  return strings.formatString(strings.time.ago, { count, unit }) as string;
}

export function ensureDateObject(value: Date | string | number): Date {
  if (value instanceof Date) return value;
  return new Date(value);
}

/** Like `new Date(value)` but returns null for nullish input or invalid dates. */
export function parseDateOrNull(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const d = new Date(value as string);
  return isNaN(d.getTime()) ? null : d;
}

export function prependZero(number: number): string {
  if (number < 10) return "0" + number;
  return number + "";
}

export function formatDate(
  date: Date | string,
  locale: string = strings.getLanguage(),
): string {
  const d = date instanceof Date ? date : new Date(date);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  }).format(d);
}

export function formatLongDate(
  date: Date | string,
  locale: string = strings.getLanguage(),
): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatTime(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return `${prependZero(d.getHours())}:${prependZero(d.getMinutes())}`;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** YYYY-MM-DD — stable map key and HTML <input type="date"> value. */
export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${prependZero(date.getMonth() + 1)}-${prependZero(date.getDate())}`;
}

/** "today" / "tomorrow" / "yesterday", or null if outside that window. */
export function relativeLabel(date: Date, today: Date): string | null {
  const diffDays = Math.round(
    (startOfDay(date).getTime() - today.getTime()) / 86_400_000,
  );
  if (diffDays === 0) return strings.time.today;
  if (diffDays === 1) return strings.time.tomorrow;
  if (diffDays === -1) return strings.time.yesterday;
  return null;
}

