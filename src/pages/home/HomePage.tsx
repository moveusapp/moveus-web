import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import EventCard from "../../components/event/EventCard";
import MainFooter from "@/components/misc/MainFooter";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import { GetMyFeedDocument } from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import { useProfile } from "@/context/profile-context";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import FeedbackReminder from "@/pages/home/FeedbackReminder";
import CreatePostComposer from "@/pages/home/CreatePostComposer";
import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import { useMemo } from "react";

function HomePage() {
  useDocumentTitle(strings.home.documentTitle);

  const { data, loading } = useQuery(GetMyFeedDocument, {
    variables: { start: 0, end: 50 },
  });

  const skeletonTypes = useMemo(
    () => Array.from({ length: 12 }, () => (Math.random() < 0.5 ? "event" : "post")),
    [],
  );
  const { profile } = useProfile();
  const profileName = !profile?.firstName
    ? profile?.username!
    : profile.firstName!;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col grow min-w-0">
        <PageHeader
          title={strings.formatString(strings.home.greeting, { name: profileName }) as string}
        />
        <div className="flex flex-col w-full mx-auto gap-3 p-4 max-w-[700px]">
          <FeedbackReminder />
          <CreatePostComposer />
          {loading ? (
            skeletonTypes.map((type, index) =>
              type === "event" ? (
                <EventCardSkeleton key={`feed-skeleton-${index}`} />
              ) : (
                <PostCardSkeleton key={`feed-skeleton-${index}`} />
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
                    />
                  );
                }
                if (item.__typename === "PostType") {
                  return (
                    <PostCard
                      key={`feed-post-${item.id}`}
                      post={item}
                    />
                  );
                }
                return null;
              })}
            </>
          )}
        </div>
      </div>

      <aside className="hidden lg:block lg:w-[280px] xl:w-[330px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex flex-col py-4 pr-4 gap-2">
          <GlobalSearchWidget />
          <UserProgressWidget />
          <UserActivityWidget />
          <MainFooter />
        </div>
      </aside>
    </div>
  );
}

export default HomePage;
