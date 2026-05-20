import defaultEventThumbnail from "@/assets/default-images/event-default-thumbnail.webp";
import Button from "@/components/ui/Button";
import UserAvatar from "@/components/user/UserAvatar";
import {
  ActivityKind,
  DeleteEventDocument,
  EventPhase,
  JoinEventDocument,
  LeaveEventDocument,
  MemberRole,
} from "@/graphql/graphql-types";
import EventPhaseBadge from "@/components/event/EventPhaseBadge";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime } from "@/utils/time-utils";
import { useMutation } from "@apollo/client/react";
import { useEvent } from "@/hooks/use-event";
import {
  HiArrowUpTray,
  HiPlus,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineNewspaper,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineChatBubbleLeftRight,
  HiCheckBadge,
  HiOutlinePencilSquare,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineStar,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import EventPageSkeleton from "./EventPageSkeleton";
import PostCard from "@/components/post/PostCard";
import CommentSection from "@/components/comment/CommentSection";
import CreatePostModal from "@/pages/event/CreatePostModal";

function EventPage() {
  const { eventId } = useParams();
  const { id, event, refetch, fallback } = useEvent({
    eventIdParam: eventId,
    loadingFallback: <EventPageSkeleton />,
  });

  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const [joinEvent, { loading: joinLoading }] = useMutation(JoinEventDocument);
  const [leaveEvent, { loading: leaveLoading }] =
    useMutation(LeaveEventDocument);
  const [deleteEvent] = useMutation(DeleteEventDocument);

  if (fallback) return fallback;
  if (!event) return null;

  const isFull =
    event.maxParticipants &&
    event.members.length! >= event.maxParticipants!;
  const organizerName = displayName(
    event.organizer?.user.username!,
    event.organizer?.user.firstName!,
    event.organizer?.user.lastName!,
  );

  const canCreatePost = [MemberRole.Organizer, MemberRole.Moderator].includes(
    event.role!,
  );

  const handlePostCreated = () => {
    refetch();
  };

  const activity = Object.keys(ActivityKind)[event.activity.id!];
  const postCount = event.posts?.length ?? 0;
  const commentCount = event.comments?.length ?? 0;

  const isCancelled = event.phase === EventPhase.Cancelled;
  const isFinished = event.phase === EventPhase.Finished;
  const isLocked = event.phase !== EventPhase.Scheduled;
  const lockedLabel = isCancelled
    ? "Event cancelled"
    : isFinished
      ? "Event ended"
      : "Event in progress";
  const titleClass = isCancelled
    ? "text-base-content/60 line-through decoration-error/50 decoration-2"
    : isFinished
      ? "text-base-content/80"
      : "text-foreground";

  // Attendees of a finished event can leave feedback.
  const canRate =
    isFinished &&
    [
      MemberRole.Participant,
      MemberRole.Moderator,
      MemberRole.Spectator,
    ].includes(event.role!);

  const locationName = event.location?.name;
  const mapsUrl =
    event.location?.latitude != null && event.location?.longitude != null
      ? `https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`
      : locationName
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`
        : null;

  return (
    <div className="w-full mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Activity + phase eyebrow */}
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{activity}</p>
            <EventPhaseBadge phase={event.phase} />
          </div>
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-balance mt-1 ${titleClass}`}>
            {event.title}
          </h1>

          {/* Organizer */}
          <Link
            to={`/user/${event.organizer?.user.username}`}
            className="flex items-center gap-2 group text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <UserAvatar
              userId={event.organizer?.user.id!}
              className="flex w-7 h-7"
            />
            <span className="flex items-center gap-1">
              Hosted by{" "}
              <span className="text-foreground font-medium group-hover:text-primary">
                {organizerName}
              </span>
              {event.organizer?.user.verified && (
                <HiCheckBadge size={16} className="text-primary shrink-0" />
              )}
            </span>
          </Link>

          {/* Date/location row — mobile only */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground mt-3 lg:hidden">
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendarDays className="h-4 w-4 text-primary" />
              {formatDate(event.startTime)} •{" "}
              {formatTime(event.startTime)}
            </span>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <HiOutlineMapPin className="h-4 w-4 text-primary" />
                <span className="underline-offset-2 hover:underline">
                  {locationName || "Location TBD"}
                </span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5">
                <HiOutlineMapPin className="h-4 w-4 text-primary" />
                Location TBD
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>

          {/* Sticky action bar — mobile only */}
          <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-base-100/80 backdrop-blur-lg border-b border-base-300 mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {canRate ? (
                <Link
                  to={`/event/${eventId}/feedback`}
                  className="btn btn-primary flex-1 rounded-2xl"
                >
                  <HiOutlineStar className="h-4 w-4" />
                  Leave Feedback
                </Link>
              ) : isLocked ? (
                <button
                  type="button"
                  disabled
                  className="btn btn-disabled flex-1 rounded-2xl"
                >
                  {lockedLabel}
                </button>
              ) : event.role === MemberRole.Organizer ? (
                <Link
                  to={`/event/${eventId}/edit`}
                  className="btn btn-primary flex-1 rounded-2xl"
                >
                  <HiOutlinePencilSquare className="h-4 w-4" />
                  Edit Event
                </Link>
              ) : [
                  MemberRole.Participant,
                  MemberRole.Moderator,
                  MemberRole.Spectator,
                ].includes(event.role!) ? (
                <Button
                  onClick={() =>
                    leaveEvent({ variables: { eventId: id } })
                  }
                  loading={leaveLoading}
                  className="btn btn-error btn-outline flex-1"
                >
                  Leave Event
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    !isFull &&
                    joinEvent({ variables: { eventId: id } })
                  }
                  loading={joinLoading}
                  disabled={!!isFull}
                  className={`btn btn-primary flex-1 ${isFull ? "btn-disabled" : ""}`}
                >
                  {isFull ? "Event Full" : "Join Event"}
                </Button>
              )}

              <button
                type="button"
                disabled={isLocked}
                className={`btn btn-square rounded-2xl ${isLocked ? "btn-disabled" : ""}`}
                aria-label="Share event"
              >
                <HiArrowUpTray className="h-4 w-4" />
              </button>
            </div>

            {event.role !== MemberRole.Organizer && (
              <Link
                to={`/chat?userId=${event.organizer?.user.id}`}
                className="btn btn-outline btn-primary w-full"
              >
                <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
                Message Organizer
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-base-300 rounded-2xl p-1 mt-4">
            <div className="flex flex-row gap-1 items-center" role="tablist">
              <button
                onClick={() => setActiveTab("posts")}
                role="tab"
                aria-selected={activeTab === "posts"}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl grow transition-colors duration-150 ${activeTab === "posts" ? "bg-base-100 shadow-sm" : "hover:bg-base-200"}`}
              >
                <HiOutlineNewspaper size={16} className="text-base-content/70" />
                <p className="text-sm font-medium">Posts ({postCount})</p>
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                role="tab"
                aria-selected={activeTab === "comments"}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl grow transition-colors duration-150 ${activeTab === "comments" ? "bg-base-100 shadow-sm" : "hover:bg-base-200"}`}
              >
                <HiOutlineChatBubbleOvalLeft size={16} className="text-base-content/70" />
                <p className="text-sm font-medium">Comments ({commentCount})</p>
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-4 pb-6" role="tabpanel">
            {activeTab === "posts" ? (
              <div>
                {canCreatePost && (
                  <button
                    onClick={() => setShowCreatePostModal(true)}
                    className="group mb-4 flex w-full items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 py-3 text-left transition-colors hover:bg-base-300"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content transition-transform duration-200 group-hover:scale-105">
                      <HiPlus className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-base-content/60 transition-colors group-hover:text-base-content">
                      Share an update...
                    </span>
                  </button>
                )}

                {event.posts && event.posts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {event.posts.toReversed().map((post) => (
                      <PostCard key={post.id} post={post} hideEventLink />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 rounded-2xl border border-base-300 bg-base-200 px-6 py-10 text-center">
                    <p className="text-sm font-medium text-foreground">
                      It's quiet here...
                    </p>
                    <p className="text-sm text-base-content/60">
                      {canCreatePost
                        ? "Share the first update with your group."
                        : "Posts from the organizer will show up here."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
                <CommentSection
                  entityType="event"
                  entityId={id}
                  comments={
                    (event.comments ?? []).filter(Boolean) as any
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-full lg:w-[340px] xl:w-[380px] lg:flex-shrink-0 order-first lg:order-last">
          <div className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-4">
            {/* Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden bg-base-300">
              <img
                src={defaultEventThumbnail}
                alt={event.title ?? ""}
                className={`w-full aspect-video object-cover transition-[filter] duration-300 ${
                  isCancelled
                    ? "grayscale brightness-75"
                    : isFinished
                      ? "grayscale-[60%] brightness-90"
                      : ""
                }`}
                crossOrigin="anonymous"
                loading="lazy"
              />
            </div>

            {/* Action buttons — desktop */}
            <div className="hidden lg:flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {canRate ? (
                  <Link
                    to={`/event/${eventId}/feedback`}
                    className="btn btn-primary flex-1 rounded-2xl"
                  >
                    <HiOutlineStar className="h-4 w-4" />
                    Leave Feedback
                  </Link>
                ) : isLocked ? (
                  <button
                    type="button"
                    disabled
                    className="btn btn-disabled flex-1 rounded-2xl"
                  >
                    {lockedLabel}
                  </button>
                ) : event.role === MemberRole.Organizer ? (
                  <Link
                    to={`/event/${eventId}/edit`}
                    className="btn btn-primary flex-1 rounded-2xl"
                  >
                    <HiOutlinePencilSquare className="h-4 w-4" />
                    Edit Event
                  </Link>
                ) : [
                    MemberRole.Participant,
                    MemberRole.Moderator,
                    MemberRole.Spectator,
                  ].includes(event.role!) ? (
                  <Button
                    onClick={() =>
                      leaveEvent({ variables: { eventId: id } })
                    }
                    loading={leaveLoading}
                    className="btn btn-error btn-outline flex-1"
                  >
                    Leave Event
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      !isFull &&
                      joinEvent({ variables: { eventId: id } })
                    }
                    loading={joinLoading}
                    disabled={!!isFull}
                    className={`btn btn-primary flex-1 ${isFull ? "btn-disabled" : ""}`}
                  >
                    {isFull ? "Event Full" : "Join Event"}
                  </Button>
                )}

                <button
                  type="button"
                  disabled={isLocked}
                  className={`btn btn-square rounded-2xl ${isLocked ? "btn-disabled" : ""}`}
                  aria-label="Share event"
                >
                  <HiArrowUpTray className="h-4 w-4" />
                </button>
              </div>

              {event.role !== MemberRole.Organizer && (
                <Link
                  to={`/chat?userId=${event.organizer?.user.id}`}
                  className="btn btn-outline btn-primary w-full"
                >
                  <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
                  Message Organizer
                </Link>
              )}
            </div>

            {/* Date & Time card */}
            <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <HiOutlineCalendarDays className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground">
                {formatDate(event.startTime)} • {formatTime(event.startTime)}
              </p>
            </div>

            {/* Location card */}
            <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <HiOutlineMapPin className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">
                {locationName || "Location TBD"}
              </p>
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Google Maps"
                  className="shrink-0 rounded-full p-1.5 -m-1.5 text-base-content/40 hover:text-primary hover:bg-base-300 transition-colors"
                >
                  <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Participants card */}
            <div className="hidden lg:block rounded-2xl border border-base-300 bg-base-200 p-4">
              <p className="text-sm font-medium text-foreground">
                Participants ({event.members.length}
                {event.maxParticipants
                  ? `/${event.maxParticipants}`
                  : ""}
                )
              </p>
              <div className="avatar-group -space-x-4 mt-3">
                {event.members.slice(0, 5).map((member) => (
                  <UserAvatar
                    key={member.user.id}
                    userId={member.user.id!}
                    className="w-10 h-10"
                  />
                ))}
                {event.members.length! > 5 && (
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                      <span className="text-xs font-medium">
                        +{event.members.length! - 5}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <CreatePostModal
        eventId={id}
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        onSuccess={handlePostCreated}
      />
    </div>
  );
}

export default EventPage;
