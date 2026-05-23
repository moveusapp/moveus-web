import { EventPhase } from "@/graphql/graphql-types";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import strings from "@/translations/strings";

interface EventPhaseBadgeProps {
  phase: EventPhase;
}

function EventPhaseBadge({ phase }: EventPhaseBadgeProps) {
  if (phase === EventPhase.Scheduled) return null;

  const shared = "badge badge-sm gap-1.5 font-semibold uppercase tracking-wide";

  if (phase === EventPhase.InProgress) {
    return (
      <span
        className={`${shared} badge-accent`}
        aria-label={strings.event.phaseLiveAria}
      >
        <LivePulseDot />
        {strings.event.phaseLive}
      </span>
    );
  }

  if (phase === EventPhase.Finished) {
    return (
      <span className={`${shared} badge-neutral`}>
        <HiOutlineCheck className="h-3 w-3" aria-hidden />
        {strings.event.phaseEnded}
      </span>
    );
  }

  return (
    <span className={`${shared} badge-error`}>
      <HiOutlineXMark className="h-3 w-3" aria-hidden />
      {strings.event.phaseCancelled}
    </span>
  );
}

function LivePulseDot() {
  return (
    <span className="relative inline-flex h-2 w-2" aria-hidden>
      <span className="absolute inset-0 rounded-full bg-accent-content/70 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-content" />
    </span>
  );
}

export default EventPhaseBadge;
