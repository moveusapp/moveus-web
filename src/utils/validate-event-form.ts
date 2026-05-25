import type { EventFormValues } from "@/components/event/EventForm";
import strings from "@/translations/strings";

/**
 * Returns the first user-facing error message, or null if the form is valid.
 * Pure — does not touch any React state.
 */
export function validateEventForm(
  values: EventFormValues,
  isCreate: boolean,
): string | null {
  if (!values.title.trim()) return strings.event.validation.needTitle;
  if (!values.startDate || !values.startTime)
    return strings.event.validation.needStart;
  if (isCreate) {
    if (!values.activity) return strings.event.validation.needActivity;
    if (!values.skillLevel) return strings.event.validation.needSkill;
    if (!values.location?.name.trim())
      return strings.event.validation.needLocation;
  }
  return null;
}
