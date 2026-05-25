import { HiPlus } from "react-icons/hi2";
import { GetEventQueryResult } from "@/graphql/graphql-types";
import PostCard from "@/components/post/PostCard";
import CommentSection from "@/components/comment/CommentSection";
import ParticipantsList from "@/pages/event/ParticipantsList";
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
    return (
      <div>
        {canCreatePost && (
          <button
            onClick={onCreatePost}
            className="group mb-4 flex w-full items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 py-3 text-left transition-colors hover:bg-base-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content transition-transform duration-200 group-hover:scale-105">
              <HiPlus className="h-5 w-5" />
            </span>
            <span className="text-sm text-base-content/60 transition-colors group-hover:text-base-content">
              {strings.event.page.shareUpdate}
            </span>
          </button>
        )}

        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.toReversed().map((post) => (
              <PostCard key={post.id} post={post} hideEventLink />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-base-300 bg-base-200 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">
              {strings.event.page.quietHere}
            </p>
            <p className="text-sm text-base-content/60">
              {canCreatePost
                ? strings.event.page.shareFirst
                : strings.event.page.postsFromOrganizer}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (tab === "comments") {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
        <CommentSection
          entityType="event"
          entityId={eventId}
          comments={(event.comments ?? []).filter(Boolean) as any}
        />
      </div>
    );
  }

  return <ParticipantsList event={event} />;
}

export default EventTabContent;
