import { HiPlus, HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { GetEventQueryResult } from "@/graphql/graphql-types";
import PostCard from "@/components/post/PostCard";
import CommentSection from "@/components/comment/CommentSection";
import ParticipantsList from "@/pages/event/ParticipantsList";
import EmptyState from "@/components/ui/EmptyState";
import strings from "@/translations/strings";

type Event = NonNullable<GetEventQueryResult["event"]>;

export type EventTabId = "posts" | "comments" | "participants";

interface EventTabContentProps {
  tab: EventTabId;
  event: Event;
  eventId: number;
  canCreatePost: boolean;
  onCreatePost: () => void;
}

function EventTabContent({
  tab,
  event,
  eventId,
  canCreatePost,
  onCreatePost,
}: EventTabContentProps) {
  if (tab === "posts") {
    const posts = event.posts ?? [];
    const hasPosts = posts.length > 0;
    return (
      <div>
        {(canCreatePost || hasPosts) && (
          <div className="divide-y divide-base-300">
            {/* Composer is a flush feed row (square, like the home composer)
                led by the primary plus, so it reads as the first item of the
                feed and clearly invites a new update. */}
            {canCreatePost && (
              <button
                type="button"
                onClick={onCreatePost}
                className="group flex w-full items-center gap-3 px-4 sm:px-5 py-4 text-left transition-colors hover:bg-base-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition-transform duration-200 group-hover:scale-105">
                  <HiPlus className="h-5 w-5" />
                </span>
                <span className="flex-1 truncate text-sm text-base-content/70 transition-colors group-hover:text-base-content">
                  {strings.event.page.shareUpdate}
                </span>
              </button>
            )}

            {hasPosts &&
              [...posts].reverse().map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  hideEventLink
                  variant="feed"
                />
              ))}
          </div>
        )}

        {!hasPosts && (
          <EmptyState
            className={canCreatePost ? "mt-4" : ""}
            icon={<HiOutlineChatBubbleOvalLeft className="h-6 w-6" />}
            title={strings.event.page.quietHere}
            description={
              canCreatePost
                ? strings.event.page.shareFirst
                : strings.event.page.postsFromOrganizer
            }
          />
        )}
      </div>
    );
  }

  if (tab === "comments") {
    return (
      <CommentSection
        entityType="event"
        entityId={eventId}
        comments={(event.comments ?? []).filter(Boolean) as any}
      />
    );
  }

  return <ParticipantsList event={event} />;
}

export default EventTabContent;
