import Tag from "@/components/misc/Tag";
import UserAvatar from "@/components/user/UserAvatar";
import { ActivityType, EventCardFragment } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime } from "@/utils/time-utils";
import {
  HiOutlineMapPin,
  HiCheckBadge,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import EventCapacityBar from "./EventCapacityBar";

function EventCard({ event }: EventCardProps) {
  const activity = Object.keys(ActivityType)[event.activity.id!];

  const organizerName = displayName(
    event.organizer?.user.username!,
    event.organizer?.user.firstName!,
    event.organizer?.user.lastName!,
  );

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-base-200 w-full rounded-2xl border border-base-300 motion-safe:hover:-translate-y-1 motion-safe:active:translate-y-0 transition-all duration-200 group p-2.5 flex flex-col gap-2"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-base-300">
        <img
          src="https://cdn.pixabay.com/photo/2020/02/01/20/43/youth-4811405_1280.jpg"
          alt={`${activity} event`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Tag className="bg-primary absolute top-2.5 left-2.5">{activity}</Tag>
      </div>

      {/* Title */}
      <h2 className="px-0.5 font-semibold text-lg text-base-content line-clamp-1 group-hover:text-primary duration-200">
        {event.title}
      </h2>

      {/* When & where */}
      <div className="px-0.5 flex flex-col gap-1 text-sm text-base-content/60">
        <div className="flex items-center gap-2">
          <HiOutlineCalendarDays size={16} className="shrink-0" />
          <span>{formatDate(event.startTime)} · {formatTime(event.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineMapPin size={16} className="shrink-0" />
          <span className="truncate">{event.location?.name || "Location TBD"}</span>
        </div>
      </div>

      {/* Footer: organizer + capacity */}
      <div className="px-0.5 flex items-center justify-between gap-3 pt-1.5 border-t border-base-300">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar userId={event.organizer?.user.id!} className="w-6 shrink-0" />
          <div className="min-w-0 flex items-center gap-1">
            <span className="text-xs text-base-content/50">Hosted by</span>
            <span className="text-sm font-medium text-base-content/70 truncate">{organizerName}</span>
            {event.organizer?.user.verified && (
              <HiCheckBadge size={16} className="text-primary shrink-0" />
            )}
          </div>
        </div>
        <EventCapacityBar
          maxParticipants={event.maxParticipants!}
          participantCount={event.participantCount!}
        />
      </div>
    </Link>
  );
}

interface EventCardProps {
  event: EventCardFragment;
}

export default EventCard;
