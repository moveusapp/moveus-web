import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "../hooks/use-document-title";
import { useMemo } from "react";
import { useQuery } from "@apollo/client/react"
import { GetHomeEventsDocument } from "@/graphql/graphql-types";
import EventTab from "@/components/event/EventTab";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

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
    return <p>{`Error: ${error.message}`}</p>
  }

  return (
    <div className="vertical pb-8">
      <div className="main-text">
        Hello, {profile?.firstName ? profile.firstName : profile?.username}!
      </div>
      {loading ? (
        <Skeleton count={3} height={160} borderRadius={10}/>
      ) : upcoming.length + ongoing.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <div className="flex flex-col grow overflow-y-auto gap-4">
          {ongoing.map((e) => (
            <EventTab event={e!} key={e?.id} />
          ))}
          <p className="font-medium">Upcoming events: </p>
          {upcoming.map((e) => (
            <EventTab event={e!} key={e?.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
