import EventCard from "../../components/event/EventCard";
import RightRail from "@/components/layout/RightRail";
import useDocumentTitle from "@/hooks/use-document-title";
import useProfileLocation from "@/hooks/use-profile-location";
import { useQuery } from "@apollo/client/react";
import { GetMyFeedDocument } from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import { Link } from "react-router-dom";
import moveusIcon from "@/assets/logos/moveus-icon.svg";
import HomeReminders from "@/pages/home/HomeReminders";
import CreatePostComposer from "@/pages/home/CreatePostComposer";
import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import { useMemo } from "react";

function HomePage() {
  useDocumentTitle(strings.home.documentTitle);
  useProfileLocation();

  const { data, loading } = useQuery(GetMyFeedDocument, {
    variables: { start: 0, end: 50 },
  });

  // A fixed, representative mix of the two feed item shapes. Deterministic so
  // the placeholder doesn't reshuffle on every render.
  const skeletonTypes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        i % 3 === 1 ? "event" : "post",
      ),
    [],
  );

  return (
    <div className="flex flex-row">
      <div className="flex flex-col grow min-w-0">
        {/* Mobile-only top bar: the drawer trigger (avatar) lives here with the
            brand mark for wayfinding. Desktop needs no header since the left
            sidebar carries identity and nav. */}
        <PageHeader
          className="md:hidden"
          center={
            <Link to="/home" aria-label={strings.common.brand}>
              <img
                src={moveusIcon}
                alt={strings.common.brand}
                className="h-8 w-8"
              />
            </Link>
          }
        />
        <div className="w-full mx-auto max-w-[600px]">
          <div className="p-4 empty:hidden">
            <HomeReminders />
          </div>

          <div className="divide-y divide-base-300 border-t border-base-300">
            <CreatePostComposer />
            {loading ? (
              skeletonTypes.map((type, index) =>
                type === "event" ? (
                  <EventCardSkeleton key={`feed-skeleton-${index}`} variant="feed" />
                ) : (
                  <PostCardSkeleton key={`feed-skeleton-${index}`} variant="feed" />
                ),
              )
            ) : (
              <>
                {data?.myFeed?.map((item) => {
                  if (!item) return null;
                  if (item.__typename === "EventType") {
                    return (
                      <EventCard
                        key={`feed-event-${item.id}`}
                        event={item}
                        variant="feed"
                      />
                    );
                  }
                  if (item.__typename === "PostType") {
                    return (
                      <PostCard
                        key={`feed-post-${item.id}`}
                        post={item}
                        variant="feed"
                      />
                    );
                  }
                  return null;
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <RightRail />
    </div>
  );
}

export default HomePage;
