import strings from "@/translations/strings";

// The backend returns the activity as its enum name (e.g. "RUNNING"), which
// matches the keys under enums.activityKind in the translation files.
export function getActivityLabel(
  activity: string | null | undefined,
): string {
  if (activity == null) return "";
  const labels = strings.enums.activityKind as unknown as Record<string, string>;
  return labels[activity] ?? activity;
}
