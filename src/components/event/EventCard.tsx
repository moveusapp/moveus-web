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
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import EventCapacityBar from "./EventCapacityBar";
import EventPhaseBadge from "./EventPhaseBadge";
import strings from "@/translations/strings";

function EventCard({ event, variant = "default" }: EventCardProps) {
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
      ? "text-base-content/60 group-hover/card:text-base-content/80"
      : "text-base-content group-hover/card:text-primary";

  const alt = strings.formatString(strings.event.thumbnailAlt, {
    title: event.title ?? "",
  }) as string;

  // Feed variant: a borderless row for the unified home feed. Separators come
  // from the parent container (`divide-y`). Stays media-led so it reads
  // unmistakably as an event next to text-led posts; the organizer header
  // matches the post author header so the feed scans consistently.
  if (variant === "feed") {
    // Capacity only earns a spot in the feed row once an event is filling up;
    // roomy events keep the row light. Full detail lives on the event page.
    const showCapacity =
      isScheduled &&
      !!event.maxParticipants &&
      event.participantCount! / event.maxParticipants >= 0.5;

    return (
      <article className="group relative px-4 sm:px-5 py-4">
        {/* Eyebrow: names the post type up front so an event reads as an event
            before the eye reaches the card below. Present tense, so it only
            shows while the event is still scheduled. */}
        {isScheduled && (
          <p className="flex items-center gap-1.5 mb-2 text-xs font-medium text-base-content/55">
            <HiOutlineMegaphone size={14} className="shrink-0 text-primary" aria-hidden />
            {strings.event.hosting}
          </p>
        )}

        {/* Organizer header — mirrors the post author header: avatar, then the
            display name (with badge) stacked over the @handle. */}
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/user/${event.organizer?.user.username}`}
            className="flex items-center gap-3 flex-1 min-w-0 group/author"
          >
            <UserAvatar
              imageUrl={event.organizer?.user.avatarUrl}
              className="w-10 h-10 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-base-content truncate group-hover/author:text-primary transition-colors">
                  {organizerName}
                </span>
                <UserBadge badge={event.organizer?.user.badge} size={16} />
              </div>
              <span className="text-xs text-base-content/70 truncate">
                @{event.organizer?.user.username}
              </span>
            </div>
          </Link>
          <span
            className={`shrink-0 badge badge-sm ${
              isInactive ? "badge-neutral" : "badge-primary"
            }`}
          >
            {activity}
          </span>
        </div>

        {/* The event renders as a self-contained object embedded in the row —
            media-led, then title and when/where — so it reads unmistakably as
            an event next to text-led posts. The row itself stays borderless;
            this contained card is the one bounded element in it. */}
        <Link
          to={`/event/${event.id}`}
          className="group/card mt-3 block overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="relative w-full aspect-video bg-base-300">
            <EventThumbnail
              imageUrl={event.imageUrl}
              alt={alt}
              className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 ${thumbnailFilter}`}
            />
            {!isScheduled && (
              <span className="absolute top-2.5 right-2.5">
                <EventPhaseBadge phase={event.phase} />
              </span>
            )}
          </div>

          <div className="p-3.5">
            <h2
              className={`font-semibold text-lg leading-snug line-clamp-2 transition-colors ${titleClass}`}
            >
              {event.title}
            </h2>

            <div
              className={`mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${
                isInactive ? "text-base-content/55" : "text-base-content/70"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineCalendarDays size={16} className="shrink-0" />
                {formatDate(event.startTime)} · {formatTime(event.startTime)}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <HiOutlineMapPin size={16} className="shrink-0" />
                <span className="truncate">
                  {event.location?.name || strings.event.locationTBD}
                </span>
              </span>
              {showCapacity && (
                <EventCapacityBar
                  maxParticipants={event.maxParticipants!}
                  participantCount={event.participantCount!}
                />
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-base-200 w-full rounded-2xl border border-base-300 hover:border-primary/20 transition-all duration-200 group/card p-4 flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-base-300">
        <EventThumbnail
          imageUrl={event.imageUrl}
          alt={alt}
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
      <h2 className={`font-semibold text-lg line-clamp-1 transition-colors duration-200 ${titleClass}`}>
        {event.title}
      </h2>

      {/* When & where */}
      <div
        className={`flex flex-col gap-1 text-sm ${
          isInactive ? "text-base-content/55" : "text-base-content/70"
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
      <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-base-300">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar imageUrl={event.organizer?.user.avatarUrl} className="w-6 h-6 shrink-0" />
          <div className="min-w-0 flex items-center gap-1">
            <span className="text-xs text-base-content/70">{strings.event.hostedBy}</span>
            <span className="text-xs font-medium text-base-content truncate">{organizerName}</span>
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
  variant?: "default" | "feed";
}

export default EventCard;
