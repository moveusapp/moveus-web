import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import EventCard from "../../components/event/EventCard";
import MainFooter from "@/components/misc/MainFooter";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import { GetHomeEventsDocument } from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import { useProfile } from "@/context/profile-context";
import { FaSadTear } from "react-icons/fa";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import FeedbackReminder from "@/pages/home/FeedbackReminder";
import CreatePostComposer from "@/pages/home/CreatePostComposer";

function HomePage() {
  useDocumentTitle("Home");

  const { data, loading } = useQuery(GetHomeEventsDocument);
  const { profile } = useProfile();
  const profileName = !profile?.firstName
    ? profile?.username!
    : profile.firstName!;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col grow min-w-0">
        <PageHeader
          title={strings.formatString(strings.hello, { name: profileName })}
        />
        <div className="flex flex-col w-full mx-auto gap-3 p-4 max-w-[700px]">
          <CreatePostComposer />
          <FeedbackReminder />
          {loading ? (
            [...Array(12)].map((_, index) => (
              <EventCardSkeleton key={`event-skeleton-${index}`} />
            ))
          ) : (
            <>
              {data?.myRecommendedEvents?.map((event) => (
                <EventCard
                  key={`event-recommended-${event?.id}`}
                  event={event!}
                />
              ))}
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
