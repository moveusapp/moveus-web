import Tag from "@/components/misc/Tag";
import UserAvatar from "@/components/user/UserAvatar";
import { Activity, EventCardFragment } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime, timeAgo } from "@/utils/time-utils";
import {
  HiOutlineMapPin,
  HiUsers,
  HiShare,
  HiCheckBadge,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import EventCapacityBar from "./EventCapacityBar";

function EventCard({ event }: EventCardProps) {
  const spotsPercent = (event.participantCount! / event.maxParticipants!) * 100;
  const almostFull = event.maxParticipants && spotsPercent >= 50;

  const activity = Object.keys(Activity)[event.activity.id!];

  const organizerName = displayName(
    event.organizer?.user.username!,
    event.organizer?.user.firstName!,
    event.organizer?.user.lastName!,
  );

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-base-200 w-full rounded-2xl overflow-hidden border border-base-300 hover:border-primary/25 transition-all group"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-base-300">
        <img
          src="https://cdn.pixabay.com/photo/2020/02/01/20/43/youth-4811405_1280.jpg"
          alt={`${activity} event`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />

        {/* Sport badge top-left */}
        <div className="flex flex-row absolute top-3 left-3 gap-1">
          <Tag className="bg-primary">{activity}</Tag>
          {almostFull && <Tag className="bg-error">Almost full</Tag>}
        </div>

        {/* Actions top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all shadow-lg"
            aria-label="Share event"
          >
            <HiShare size={16} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h2 className="mb-2 font-bold text-xl text-base-content line-clamp-1 group-hover:text-primary duration-200">
          {event.title}
        </h2>

        <p className="text-sm mb-2 leading-relaxed text-base-content/70 line-clamp-2">
          {event.description || "No description provided"}
        </p>

        <div className="flex flex-row mb-4 items-center gap-1">
          <UserAvatar userId={event.organizer?.user.id!} className="w-5" />
          <p className="text-sm text-base-content/70 m-0">Hosted by</p>
          <p className="text-sm m-0 font-medium">{organizerName}</p>
          {event.organizer?.user.verified && (
            <HiCheckBadge className="text-primary" />
          )}
        </div>

        {/* Details grid */}
        <div className="flex flex-row justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-base-content/80">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HiOutlineCalendarDays className="text-primary" />
            </div>
            <span className="truncate font-medium">
              {formatDate(event.startTime)} • {formatTime(event.startTime)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/80">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HiOutlineMapPin size={12} className="text-primary" />
            </div>
            <span className="font-medium truncate">Rijeka, Zabica 41000</span>
          </div>
        </div>

        <div className="border-t border-base-300 mb-4" />

        {/* Spots progress */}
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
