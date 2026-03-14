import Button from "@/components/ui/Button";
import UserAvatar from "@/components/user/UserAvatar";
import {
  ActivityType,
  DeleteEventDocument,
  GetEventDocument,
  JoinEventDocument,
  LeaveEventDocument,
  MemberRole,
} from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime } from "@/utils/time-utils";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  HiArrowUpTray,
  HiPlus,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineNewspaper,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import EventPageSkeleton from "./EventPageSkeleton";
import PostCard from "@/components/post/PostCard";
import CommentSection from "@/components/comment/CommentSection";
import CreatePostModal from "@/pages/event/CreatePostModal";

function EventPage() {
  const { eventId } = useParams();
  const { data, loading, refetch } = useQuery(GetEventDocument, {
    variables: { eventId: parseInt(eventId!) },
  });

  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const [joinEvent, { loading: joinLoading }] = useMutation(JoinEventDocument);
  const [leaveEvent, { loading: leaveLoading }] =
    useMutation(LeaveEventDocument);
  const [deleteEvent] = useMutation(DeleteEventDocument);

  if (loading) {
    return <EventPageSkeleton />;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-5xl px-4 w-full py-6">
        <div className="flex flex-col items-center justify-center rounded-xl border border-base-300 bg-base-200 py-16">
          <p className="text-lg font-medium text-foreground">Event not found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This event may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const isFull =
    data.event?.maxParticipants &&
    data.event?.members.length! >= data.event?.maxParticipants!;
  const organizerName = displayName(
    data.event?.organizer?.user.username!,
    data.event?.organizer?.user.firstName!,
    data.event?.organizer?.user.lastName!,
  );

  const canCreatePost = [MemberRole.Organizer, MemberRole.Moderator].includes(
    data.event?.role!,
  );

  const handlePostCreated = () => {
    refetch();
  };

  const activity = Object.keys(ActivityType)[data.event?.activity.id!];
  const postCount = data.event?.posts?.length ?? 0;
  const commentCount = data.event?.comments?.length ?? 0;

  return (
    <div className="w-full mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Activity + Title */}
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{activity}</p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-balance mt-1">
            {data.event?.title}
          </h1>

          {/* Organizer */}
          <Link
            to={`/user/${data.event?.organizer?.user.username}`}
            className="flex items-center gap-2 group text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <UserAvatar
              userId={data.event?.organizer?.user.id!}
              className="flex w-7 h-7"
            />
            <span>
              Hosted by{" "}
              <span className="text-foreground font-medium group-hover:text-primary">
                {organizerName}
              </span>
            </span>
          </Link>

          {/* Date/location row — mobile only */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground mt-3 lg:hidden">
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendarDays className="h-4 w-4 text-primary" />
              {formatDate(data.event?.startTime)} •{" "}
              {formatTime(data.event?.startTime)}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineMapPin className="h-4 w-4 text-primary" />
              Rijeka, Zabica 41000
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {data.event?.description}
          </p>

          {/* Sticky action bar — mobile only */}
          <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-base-100/80 backdrop-blur-lg border-b border-base-300 mt-4 flex items-center gap-3">
            {data.event?.role === MemberRole.Organizer ? (
              <div className="flex-1 rounded-2xl bg-primary/10 p-3 text-center text-sm font-medium text-primary">
                You are hosting this event
              </div>
            ) : [
                MemberRole.Participant,
                MemberRole.Moderator,
                MemberRole.Spectator,
              ].includes(data.event?.role!) ? (
              <Button
                onClick={() =>
                  leaveEvent({ variables: { eventId: parseInt(eventId!) } })
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
                  joinEvent({ variables: { eventId: parseInt(eventId!) } })
                }
                loading={joinLoading}
                disabled={!!isFull}
                className={`btn btn-primary flex-1 ${isFull ? "btn-disabled" : ""}`}
              >
                {isFull ? "Event Full" : "Join Event"}
              </Button>
            )}

            <button className="btn btn-square rounded-2xl" aria-label="Share event">
              <HiArrowUpTray className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-base-300 rounded-2xl border border-base-300 p-1 mt-4">
            <div className="flex flex-row gap-1 justify-between items-center" role="tablist">
              <button
                onClick={() => setActiveTab("posts")}
                role="tab"
                aria-selected={activeTab === "posts"}
                className={`hover:bg-base-200 transition-all p-2 rounded-2xl grow ${activeTab === "posts" ? "shadow-md bg-base-200" : ""}`}
              >
                <div className="flex flex-row gap-1 justify-center items-center">
                  <HiOutlineNewspaper
                    size={16}
                    className="text-base-content/70"
                  />
                  <p className="text-sm font-medium">Posts ({postCount})</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                role="tab"
                aria-selected={activeTab === "comments"}
                className={`hover:bg-base-200 transition-all p-2 rounded-2xl grow ${activeTab === "comments" ? "shadow-md bg-base-200" : ""}`}
              >
                <div className="flex flex-row gap-1 justify-center items-center">
                  <HiOutlineChatBubbleOvalLeft
                    size={16}
                    className="text-base-content/70"
                  />
                  <p className="text-sm font-medium">
                    Comments ({commentCount})
                  </p>
                </div>
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
                    className="btn btn-primary btn-sm gap-1 mb-4"
                  >
                    <HiPlus className="w-4 h-4" />
                    Create Post
                  </button>
                )}

                {data.event?.posts && data.event.posts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {data.event.posts.toReversed().map((post) => (
                      <PostCard key={post.id} post={post} hideEventLink />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-base-300 bg-base-200 p-8 text-center">
                    <p className="text-sm text-base-content/60">
                      No posts yet.{" "}
                      {canCreatePost && "Be the first to create one!"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-base-300 bg-base-200 p-5">
                <CommentSection
                  entityType="event"
                  entityId={parseInt(eventId!)}
                  comments={
                    (data.event?.comments ?? []).filter(Boolean) as any
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
            <div className="rounded-2xl overflow-hidden bg-base-300">
              <img
                src="https://cdn.pixabay.com/photo/2020/02/01/20/43/youth-4811405_1280.jpg"
                alt={`${data.event?.title} event thumbnail`}
                className="w-full aspect-video object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Action buttons — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {data.event?.role === MemberRole.Organizer ? (
                <div className="flex-1 rounded-2xl bg-primary/10 p-3 text-center text-sm font-medium text-primary">
                  You are hosting this event
                </div>
              ) : [
                  MemberRole.Participant,
                  MemberRole.Moderator,
                  MemberRole.Spectator,
                ].includes(data.event?.role!) ? (
                <Button
                  onClick={() =>
                    leaveEvent({ variables: { eventId: parseInt(eventId!) } })
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
                    joinEvent({ variables: { eventId: parseInt(eventId!) } })
                  }
                  loading={joinLoading}
                  disabled={!!isFull}
                className={`btn btn-primary flex-1 ${isFull ? "btn-disabled" : ""}`}
                >
                  {isFull ? "Event Full" : "Join Event"}
                </Button>
              )}

              <button className="btn btn-square rounded-2xl" aria-label="Share event">
                <HiArrowUpTray className="h-4 w-4" />
              </button>
            </div>

            {/* Date & Time card */}
            <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <HiOutlineCalendarDays className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground">
                {formatDate(data.event?.startTime)} • {formatTime(data.event?.startTime)}
              </p>
            </div>

            {/* Location card */}
            <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <HiOutlineMapPin className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Rijeka, Zabica 41000
                </p>
              </div>
            </div>

            {/* Participants card */}
            <div className="hidden lg:block rounded-2xl border border-base-300 bg-base-200 p-4">
              <p className="text-sm font-medium text-foreground">
                Participants ({data.event?.members.length}
                {data.event?.maxParticipants
                  ? `/${data.event.maxParticipants}`
                  : ""}
                )
              </p>
              <div className="avatar-group -space-x-4">
                {data.event?.members.slice(0, 5).map((member) => (
                  <UserAvatar
                    key={member.user.id}
                    userId={member.user.id!}
                    className="w-10 h-10"
                  />
                ))}
                {data.event?.members.length! > 5 && (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-xs">+{data.event?.members.length! - 5}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <CreatePostModal
        eventId={parseInt(eventId!)}
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        onSuccess={handlePostCreated}
      />
    </div>
  );
}

export default EventPage;
