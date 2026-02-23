import UserAvatar from "@/components/user/UserAvatar";
import {
  DeleteEventDocument,
  GetEventDocument,
  JoinEventDocument,
  LeaveEventDocument,
  MemberRole,
} from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime } from "@/utils/time-utils";
import { useMutation, useQuery } from "@apollo/client/react";
import { HiOutlineShare, HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineMapPin, HiOutlineCalendarDays } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";

function EventPage() {
  const { eventId } = useParams();
  const { data, loading } = useQuery(GetEventDocument, {
    variables: { eventId: parseInt(eventId!) },
  });

  const [joinEvent, { loading: joinLoading }] = useMutation(JoinEventDocument);
  const [leaveEvent, { loading: leaveLoading }] =
    useMutation(LeaveEventDocument);
  const [deleteEvent] = useMutation(DeleteEventDocument);

  if (loading) {
    return <></>;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="flex flex-col items-center justify-center rounded-xl border border-base-300 bg-base-200 py-16">
          <p className="text-lg font-medium text-foreground">Event not found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This event may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const isFull = data.event?.members.length! >= data.event?.maxParticipants!;
  const spotsLeft = data.event?.maxParticipants! - data.event?.members.length!;
  const fillPercent =
    (data.event?.members.length! / data.event?.maxParticipants!) * 100;
  const organizerName = displayName(
    data.event?.organizer?.user.username!,
    data.event?.organizer?.user.firstName!,
    data.event?.organizer?.user.lastName!,
  );

  return (
    <div className="w-full mx-auto max-w-4xl p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground text-balance">
              {data.event?.title}
            </h1>
            <Link
              to={`/user/${data.event?.organizer?.user.username}`}
              className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              <UserAvatar
                userId={data.event?.organizer?.user.id!}
                className="flex w-7 h-7"
              />
              <span>
                Hosted by{" "}
                <span className="text-foreground font-medium">
                  {organizerName}
                </span>
              </span>
              <HiOutlineChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Details grid - responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-row gap-1 rounded-xl border border-base-300 bg-base-200 p-4">
              <HiOutlineCalendarDays className="h-4 w-4 text-primary mb-1" />
              <span className="text-sm font-medium text-foreground">
                {formatDate(data.event?.startTime)} •{" "}
                {formatTime(data.event?.startTime)}
              </span>
            </div>
            <div className="flex flex-row gap-1 rounded-xl border border-base-300 bg-base-200 p-4">
              <HiOutlineMapPin className="h-4 w-4 text-primary mb-1" />
              <span className="text-sm font-medium text-foreground truncate">
                Rijeka, Zabica 41000
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">
              About this event
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.event?.description}
            </p>
          </div>
        </div>
        {/* Sidebar - fixed width on desktop */}
        <div className="w-full lg:w-90 flex-shrink-0 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://cdn.pixabay.com/photo/2020/02/01/20/43/youth-4811405_1280.jpg"
              alt="Event"
              className="w-full video-cover"
              crossOrigin="anonymous"
            />
          </div>
          {/* Action card */}
          <div className="rounded-xl border border-base-300 bg-base-200 p-5 flex flex-col gap-4">
            {/* Capacity bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Capacity
                </span>
                <span className="text-sm text-muted-foreground">
                  {data.event?.maxParticipants
                    ? `${data.event?.members.length!} / ${data.event?.maxParticipants}`
                    : data.event?.members.length}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {isFull ? "This event is full" : `${spotsLeft} spots remaining`}
              </p>
            </div>

            {/* Join/Leave button */}
            {data.event?.role === MemberRole.Organizer ? (
              <div className="rounded-lg bg-primary/10 p-3 text-center text-sm font-medium text-primary">
                You are hosting this event
              </div>
            ) : [
                MemberRole.Participant,
                MemberRole.Moderator,
                MemberRole.Spectator,
              ].includes(data.event?.role!) ? (
              <button
                onClick={() =>
                  leaveEvent({ variables: { eventId: parseInt(eventId!) } })
                }
                disabled={leaveLoading}
                className="w-full rounded-lg border border-base-300 bg-base-200 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 disabled:opacity-50"
              >
                {leaveLoading ? "Leaving..." : "Leave Event"}
              </button>
            ) : (
              <button
                onClick={() =>
                  !isFull &&
                  joinEvent({ variables: { eventId: parseInt(eventId!) } })
                }
                disabled={isFull || joinLoading}
                className="btn btn-primary w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {joinLoading
                  ? "Joining..."
                  : isFull
                    ? "Event Full"
                    : "Join Event"}
              </button>
            )}

            <button className="btn flex items-center justify-center gap-2 rounded-lg border border-base-300 bg-base-200 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              <HiOutlineShare className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Participants on desktop - hidden on mobile */}
          <div className="hidden lg:block rounded-xl border border-base-300 bg-base-200 p-5">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">
              Participants ({data.event?.members.length})
            </h3>
            <div className="flex flex-col gap-2">
              {data.event?.members.map((member) => (
                <Link
                  to={`/user/${member.user.username}`}
                  key={member.user.id}
                  className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary"
                >
                  <UserAvatar userId={member.user.id!} className="w-8 h-8" />
                  <span className="text-sm font-medium text-foreground">
                    {displayName(
                      member.user.username,
                      member.user.firstName,
                      member.user.lastName,
                    )}
                  </span>
                  {member.user.id === data.event?.organizer?.user.id && (
                    <span className="ml-auto text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Organizer
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:hidden rounded-xl border border-base-300 bg-base-200 p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">
            Participants ({data.event?.members.length})
          </h3>
          <div className="flex flex-col gap-2">
            {data.event?.members.map((member) => (
              <Link
                to={`/user/${member.user.username}`}
                key={member.user.id}
                className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary"
              >
                <UserAvatar userId={member.user.id!} className="w-8 h-8" />
                <span className="text-sm font-medium text-foreground">
                  {displayName(
                    member.user.username,
                    member.user.firstName,
                    member.user.lastName,
                  )}
                </span>
                {member.user.id === data.event?.organizer?.user.id && (
                  <span className="ml-auto text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Organizer
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
