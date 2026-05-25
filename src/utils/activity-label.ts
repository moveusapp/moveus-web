import { ActivityKind } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

export function getActivityLabel(activityId: number | null | undefined): string {
  const value = activityId != null ? Object.values(ActivityKind)[activityId] : undefined;
  if (value == null) return "";
  const labels = strings.enums.activityKind as unknown as Record<string, string>;
  return labels[value] ?? value;
}
