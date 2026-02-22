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

function HomePage() {
  useDocumentTitle("Home");

  const { data, loading } = useQuery(GetHomeEventsDocument);
  const { profile } = useProfile();
  const profileName = !profile?.firstName
    ? profile?.username!
    : profile.firstName!;

  const hasJoinedEvents = () => {
    return (
      !loading &&
      data &&
      data!.futureJoinedEvents &&
      data!.ongoingJoinedEvents &&
      (data!.futureJoinedEvents.length > 0 ||
        data!.ongoingJoinedEvents?.length > 0)
    );
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full mx-auto gap-3 p-4 max-w-[700px]">
        <h1 className="font-medium text-left text-2xl">
          {strings.formatString(strings.hello, { name: profileName })}
        </h1>
        {loading ? (
          [...Array(12)].map((_, index) => (
            <EventCardSkeleton key={`event-skeleton-${index}`} />
          ))
        ) : (
          <>
            {!hasJoinedEvents() ? (
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col items-center bg-base-200 rounded-2xl border border-base-300 p-4 gap-1">
                  <FaSadTear size={45} />
                  <p className="text-base-content/70">
                    You haven't joined any events!
                  </p>
                </div>
              </div>
            ) : (
              <>
                {data?.ongoingJoinedEvents?.map((event) => (
                  <EventCard key={`event-ongoing-${event?.id}`} event={event!} />
                ))}
                {data?.futureJoinedEvents?.map((event) => (
                  <EventCard key={`event-future-${event?.id}`} event={event!} />
                ))}
              </>
            )}

            <div className="border-t border-base-300 my-4" />
            <p className="text-md text-base-content/70">You might like...</p>
            
            {data?.myRecommendedEvents?.map((event) => (
              <EventCard key={`event-recommended-${event?.id}`} event={event!} />
            ))}
          </>
        )}
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
