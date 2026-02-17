import { useProfile } from "@/context/profile-context";
import { EventFragment } from "@/graphql/generated";
import UserAvatar from "../images/UserAvatar";
import { displayName } from "@/utils/display-name";
import { Link } from "react-router-dom";
import { RiShareForwardBoxLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventInfoTab({ event }: EventInfoTabProps) {
  const { profile } = useProfile();
  const organizerUser = !event ? undefined : event.organizer!.user!;

  return (
    <div className="grow flex flex-col">
      {!event ? (
        <Skeleton className="main-text" height={36} style={{"width": "70%"}} />
      ) : (
        <h2 className="main-text">{event.title}</h2>
      )}
      {!event ? (
        <>
          <Skeleton count={4} />
          <Skeleton style={{"width": "50%"}}  />
        </>
      ) : (
        <p>{event.description}</p>
      )}

      <Link
        className="usertab mt-auto mb-8"
        to={
          !organizerUser
            ? ""
            : organizerUser!.id === profile?.id
              ? "/profile"
              : `/user/${organizerUser!.id}`
        }
      >
        <UserAvatar
          canChange={false}
          userId={!organizerUser ? -1 : organizerUser!.id!}
          className="inline-block"
        />
        <div className="inner">
          <div className="tags">
            <p>organizer</p>
          </div>
          {!organizerUser ? (
            <Skeleton width={200}/>
          ) : (
            <h4>
              {displayName(
                organizerUser!.username,
                organizerUser!.firstName,
                organizerUser!.lastName,
                profile?.username,
              )}
            </h4>
          )}
          {!organizerUser ? (
            <Skeleton width={70}/>
          ) : (
            <p className="username">@{organizerUser!.username}</p>
          )}
        </div>
      </Link>

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
          {!event ? (
            <Skeleton />
          ) : (
            <p>
              {event.startTime.getHours() < 10
                ? "0" + event.startTime.getHours()
                : event.startTime.getHours()}
              :
              {event.startTime.getMinutes() < 10
                ? "0" + event.startTime.getMinutes()
                : event.startTime.getMinutes()}
            </p>
          )}
        </div>
        <div className="event-detail col-span-2 justify-self-end">
          <p>end time</p>
          {!event ? (
            <Skeleton />
          ) : (
            <p>
              {event.endTime.getHours() < 10
                ? "0" + event.endTime.getHours()
                : event.endTime.getHours()}
              :
              {event.endTime.getMinutes() < 10
                ? "0" + event.endTime.getMinutes()
                : event.endTime.getMinutes()}
            </p>
          )}
        </div>
        <div className="event-detail col-span-3">
          <p>proficiency level</p>
          {!event ? (
            <Skeleton />
          ) : (
            <p>{event.skillLevel!.toLowerCase()}</p>
          )}
        </div>
        <div className="event-detail col-span-3 justify-self-center">
          <p>activity</p>
          {!event ? (
            <Skeleton />
          ) : (
            <p>{event.activity!.name!.toLowerCase()}</p>
          )}
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
