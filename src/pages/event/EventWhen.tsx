import { HiArrowLongRight } from "react-icons/hi2";
import strings from "@/translations/strings";
import { deriveEventState } from "./derive-event-state";

type When = ReturnType<typeof deriveEventState>["when"];

function EventWhen({ when }: { when: When }) {
  if (when.isMultiDay) {
    return (
      <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        <span className="whitespace-nowrap">
          {when.startDate} • {when.startTime}
        </span>
        <HiArrowLongRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-base-content/40"
        />
        <span className="sr-only">{strings.event.page.until}</span>
        <span className="whitespace-nowrap">
          {when.endDate} • {when.endTime}
        </span>
      </span>
    );
  }

  return (
    <span>
      {when.startDate} • {when.startTime}
      {when.hasEndTime && ` – ${when.endTime}`}
    </span>
  );
}

export default EventWhen;
