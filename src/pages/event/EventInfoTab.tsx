import { useProfile } from "@/context/profile-context";
import { EventFragment } from "@/graphql/graphql-types";
import { RiShareForwardBoxLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserCard from "@/components/user/UserCard";
import { formatTime } from "@/utils/time-utils";
import UserCardSkeleton from "@/components/user/UserCardSkeleton";

function EventInfoTab({ event }: EventInfoTabProps) {
  const { profile } = useProfile();
  const organizerUser = !event ? undefined : event.organizer!.user!;

  return (
    <div className="grow flex flex-col">
      {!event ? (
        <Skeleton className="main-text" height={36} style={{ width: "70%" }} />
      ) : (
        <h2 className="main-text">{event.title}</h2>
      )}

      <div className="grow">
        {!event ? (
          <>
            <Skeleton count={4} />
            <Skeleton style={{ width: "50%" }} />
          </>
        ) : (
          <p>{event.description}</p>
        )}
      </div>

      {!organizerUser ? (
        <UserCardSkeleton />
      ) : (
        <UserCard
          user={organizerUser!}
          tags={[{ text: "Organizer" }]}
          isSelf={profile?.id === organizerUser?.id}
        />
      )}

      <div className="grid grid-cols-9 grid-rows-2" style={{ rowGap: "8px" }}>
        <div className="event-detail col-span-5">
          <p>date</p>
          {!event ? (
            <Skeleton width={100} />
          ) : (
            <p>{event.startTime.toDateString()}</p>
          )}
        </div>
        <div className="event-detail col-span-2 justify-self-end">
          <p>start time</p>
          {!event ? <Skeleton /> : <p>{formatTime(event.startTime)}</p>}
        </div>
        <div className="event-detail col-span-2 justify-self-end">
          <p>end time</p>
          {!event ? <Skeleton /> : <p>{formatTime(event.endTime)}</p>}
        </div>
        <div className="event-detail col-span-3">
          <p>proficiency level</p>
          {!event ? <Skeleton /> : <p>{event.skillLevel!.toLowerCase()}</p>}
        </div>
        <div className="event-detail col-span-3 justify-self-center">
          <p>activity</p>
          {!event ? <Skeleton /> : <p>{event.activity!.name!.toLowerCase()}</p>}
        </div>
        <div className="event-detail col-span-3 justify-self-end">
          <p>location</p>
          <p className="text-nowrap">
            {!event ? (
              <Skeleton />
            ) : (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps?q=${event.location.latitude},${event.location.longitude}`}
              >
                View in Maps
                <RiShareForwardBoxLine className="ml-1 inline" />
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventInfoTab;

interface EventInfoTabProps {
  event?: EventFragment;
}
