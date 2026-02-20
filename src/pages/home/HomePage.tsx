import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GetHomeEventsDocument } from "@/graphql/graphql-types";
import EventCard from "@/components/event/EventCard";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import strings from "@/translations/strings";

function HomePage() {
  useDocumentTitle("Home Page");

  const { profile } = useProfile();

  const { loading, error, data } = useQuery(GetHomeEventsDocument);

  const upcoming = useMemo(
    () => data?.futureJoinedEvents?.filter((e) => e !== null) || [],
    [data],
  );
  const ongoing = useMemo(
    () => data?.ongoingJoinedEvents?.filter((e) => e !== null) || [],
    [data],
  );

  if (error) {
    return <p>{`Error: ${error.message}`}</p>;
  }

  return (
    <div className="vertical pb-8">
      <div className="main-text">
        {strings.formatString(strings.hello, {
          name: profile?.firstName ? profile.firstName! : profile?.username!,
        })}
      </div>
      {loading ? (
        <div className="flex flex-col grow overflow-y-auto gap-4">
          {[...Array(3)].map((_, index) => (
            <EventCardSkeleton key={`event-skeleton-${index}`} />
          ))}
        </div>
      ) : upcoming.length + ongoing.length === 0 ? (
        <p>{strings.noUpcomingEvents}</p>
      ) : (
        <div className="flex flex-col grow overflow-y-auto gap-4">
          {ongoing.map((e) => (
            <EventCard event={e!} key={e?.id} />
          ))}
          {upcoming.map((e) => (
            <EventCard event={e!} key={e?.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
