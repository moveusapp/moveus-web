const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

function getAge(dob: Date): number {
  const nowMS = new Date().getTime();
  const dobMS = dob.getTime();
  const d = nowMS - dobMS;
  return Math.trunc(d / MS_IN_YEAR);
}

function timeAgo(inputDate: Date | string): string {
  const date = new Date(inputDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 5) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

function prependZero(number: number): string {
  if (number < 10) return "0" + number;
  return number + "";
}

export { getAge, timeAgo, prependZero };
