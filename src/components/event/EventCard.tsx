import EventThumbnail from "@/components/event/EventThumbnail";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import {
  EventCardFragment,
  EventPhase,
} from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime } from "@/utils/time-utils";
import { getActivityLabel } from "@/utils/activity-label";
import {
  HiOutlineMapPin,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import EventCapacityBar from "./EventCapacityBar";
import EventPhaseBadge from "./EventPhaseBadge";
import strings from "@/translations/strings";

function EventCard({ event }: EventCardProps) {
  const activity = getActivityLabel(event.activity);

  const organizerName = displayName(
    event.organizer?.user.username!,
    event.organizer?.user.firstName!,
    event.organizer?.user.lastName!,
  );

  const isScheduled = event.phase === EventPhase.Scheduled;
  const isCancelled = event.phase === EventPhase.Cancelled;
  const isFinished = event.phase === EventPhase.Finished;
  const isInactive = isCancelled || isFinished;

  const thumbnailFilter = isCancelled
    ? "grayscale brightness-75"
    : isFinished
      ? "grayscale-[60%] brightness-90"
      : "";

  const titleClass = isCancelled
    ? "text-base-content/50 line-through decoration-error/60 decoration-2"
    : isFinished
      ? "text-base-content/60 group-hover:text-base-content/80"
      : "text-base-content group-hover:text-primary";

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-base-200 w-full rounded-2xl border border-base-300 hover:border-primary/20 transition-all duration-200 group p-2.5 flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-base-300">
        <EventThumbnail
          imageUrl={event.imageUrl}
          alt={strings.formatString(strings.event.thumbnailAlt, { title: event.title ?? "" }) as string}
          className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 ${thumbnailFilter}`}
        />
        <span
          className={`badge badge-sm absolute top-2.5 left-2.5 ${
            isInactive ? "badge-neutral" : "badge-primary"
          }`}
        >
          {activity}
        </span>
        {!isScheduled && (
          <span className="absolute top-2.5 right-2.5">
            <EventPhaseBadge phase={event.phase} />
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`px-0.5 font-semibold text-lg line-clamp-1 transition-colors duration-200 ${titleClass}`}>
        {event.title}
      </h2>

      {/* When & where */}
      <div
        className={`px-0.5 flex flex-col gap-1 text-sm ${
          isInactive ? "text-base-content/45" : "text-base-content/60"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiOutlineCalendarDays size={16} className="shrink-0" />
          <span>{formatDate(event.startTime)} · {formatTime(event.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineMapPin size={16} className="shrink-0" />
          <span className="truncate">{event.location?.name || strings.event.locationTBD}</span>
        </div>
      </div>

      {/* Footer: organizer + capacity */}
      <div className="px-0.5 flex items-center justify-between gap-3 pt-1.5 border-t border-base-300">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar imageUrl={event.organizer?.user.profileImageUrl} className="w-6 h-6 shrink-0" />
          <div className="min-w-0 flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{strings.event.hostedBy}</span>
            <span className="text-xs font-medium text-foreground truncate">{organizerName}</span>
            <UserBadge badge={event.organizer?.user.badge} size={16} />
          </div>
        </div>
        {isScheduled && (
          <EventCapacityBar
            maxParticipants={event.maxParticipants!}
            participantCount={event.participantCount!}
          />
        )}
      </div>
    </Link>
  );
}

interface EventCardProps {
  event: EventCardFragment;
}

export default EventCard;
