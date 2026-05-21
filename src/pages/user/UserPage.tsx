import Button from "@/components/ui/Button";
import FollowButton from "@/components/user/FollowButton";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import {
  EventPhase,
  Gender,
  GetUserByUsernameDocument,
} from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { getAge } from "@/utils/time-utils";
import { useQuery } from "@apollo/client/react";
import {
  HiOutlineChat,
  HiOutlineStar,
  HiOutlineCalendar,
} from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import { Fragment, ReactNode, useState } from "react";
import UserPageSkeleton from "./UserPageSkeleton";
import EditProfileModal from "./EditProfileModal";
import useDocumentTitle from "@/hooks/use-document-title";

type EventLike = { startTime?: unknown; phase?: EventPhase } | null | undefined;

const PHASE_ORDER: Record<EventPhase, number> = {
  [EventPhase.InProgress]: 0,
  [EventPhase.Scheduled]: 1,
  [EventPhase.Finished]: 2,
  [EventPhase.Cancelled]: 3,
};

function sortByStartTimeDesc<T extends EventLike>(
  events: ReadonlyArray<T> | null | undefined,
): T[] {
  if (!events) return [];
  return [...events].sort((a, b) => {
    const aPhase = a?.phase ? PHASE_ORDER[a.phase] : Number.MAX_SAFE_INTEGER;
    const bPhase = b?.phase ? PHASE_ORDER[b.phase] : Number.MAX_SAFE_INTEGER;
    if (aPhase !== bPhase) return aPhase - bPhase;
    const aTime = a?.startTime ? new Date(a.startTime as string).getTime() : 0;
    const bTime = b?.startTime ? new Date(b.startTime as string).getTime() : 0;
    return aTime - bTime;
  });
}

const GENDER_LABELS: Partial<Record<Gender, string>> = {
  [Gender.Female]: "Female",
  [Gender.Male]: "Male",
  [Gender.NonBinary]: "Non-binary",
};

function UserPage() {
  const [activeTab, setActiveTab] = useState("attending");
  const [showEditModal, setShowEditModal] = useState(false);

  const { username } = useParams();
  const { data, loading, error } = useQuery(GetUserByUsernameDocument, {
    variables: { username: username! },
  });
  const { profile } = useProfile();

  useDocumentTitle(username);

  if (loading) {
    return <UserPageSkeleton />;
  }

  if (error) {
    return (
      <div className="m-4">
        <p>No user with username '{username}' found.</p>
      </div>
    );
  }

  const hasAttendingEvents = () =>
    data &&
    data.user &&
    data.user.attendingEvents &&
    data.user.attendingEvents.length > 0;
  const hasOrganizingEvents = () =>
    data &&
    data.user &&
    data.user.organizingEvents &&
    data.user.organizingEvents.length > 0;

  const isSelf = profile?.id === data?.user?.id;
  const user = data!.user!;
  const name = displayName(user.username!, user.firstName, user.lastName);

  const locationName = user.location?.city ?? user.location?.name ?? null;
  const age =
    user.dateOfBirth != null ? getAge(new Date(user.dateOfBirth)) : null;
  const genderLabel = user.gender ? GENDER_LABELS[user.gender] : undefined;

  const facts: ReactNode[] = [];
  if (locationName) facts.push(locationName);
  if (age != null) facts.push(`${age} years old`);
  if (genderLabel) facts.push(genderLabel);
  if (user.email)
    facts.push(
      <a
        key="email"
        href={`mailto:${user.email}`}
        className="hover:text-primary hover:underline"
      >
        {user.email}
      </a>,
    );

  const showFollowers =
    user.followerCount != null || user.followingCount != null;

  const isBioEmpty = () => {
    if (!data || loading) {
      return true;
    }

    if (!data.user?.bio || data.user?.bio.length <= 0) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col m-4 gap-2">
      <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
        <div className="flex flex-row gap-3">
          <UserAvatar
            userId={loading ? -1 : data?.user?.id!}
            className="flex-shrink-0 w-18 h-18"
          />

          <div className="flex flex-col grow justify-start mt-2 gap-1">
            <div className="flex flex-row gap-1 items-center">
              <h1 className="font-medium text-2xl">{name}</h1>
              {data?.user?.verified && (
                <HiCheckBadge size={24} className="text-primary" />
              )}
            </div>

            <p className="text-sm text-base-content/70">
              @{data?.user?.username}
            </p>

            <div className="text-sm text-base-content/90 mt-1">
              {isBioEmpty() ? (
                <p className="italic">No written bio.</p>
              ) : (
                <p>{user.bio}</p>
              )}
            </div>

            {facts.length > 0 && (
              <p className="text-sm text-base-content/70 mt-1">
                {facts.map((fact, i) => (
                  <Fragment key={i}>
                    {i > 0 && " · "}
                    {fact}
                  </Fragment>
                ))}
              </p>
            )}

            {showFollowers && (
              <p className="text-sm text-base-content/70 mt-1">
                {user.followerCount != null && (
                  <>
                    <span className="font-semibold text-base-content">
                      {user.followerCount}
                    </span>{" "}
                    Followers
                  </>
                )}
                {user.followerCount != null &&
                  user.followingCount != null &&
                  " · "}
                {user.followingCount != null && (
                  <>
                    <span className="font-semibold text-base-content">
                      {user.followingCount}
                    </span>{" "}
                    Following
                  </>
                )}
              </p>
            )}
          </div>

          {isSelf ? (
            <Button onClick={() => setShowEditModal(true)}>Edit Profile</Button>
          ) : (
            <div className="flex flex-row gap-1">
              {profile && (
                <>
                  <Link to={`/chat?userId=${data?.user!.id}`} className="btn">
                    <HiOutlineChat size={18} />
                  </Link>

                  <FollowButton
                    userId={data?.user?.id!}
                    isFollowing={data?.user?.isFollowing ?? false}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-base-300 rounded-2xl border border-base-300 p-1">
        <div className="flex flex-row gap-1 justify-between items-center">
          <button
            onClick={() => setActiveTab("attending")}
            className={`hover:bg-base-200 transition-all p-2 rounded-xl grow ${activeTab === "attending" ? "shadow-md bg-base-200" : ""}`}
          >
            <div className="flex flex-row gap-1 justify-center items-center">
              <HiOutlineCalendar size={16} className="text-base-content/70" />
              <p className="text-sm font-medium">
                Attending ({data?.user?.attendingEvents?.length})
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("organizing")}
            className={`hover:bg-base-200 transition-all p-2 rounded-xl grow ${activeTab === "organizing" ? "shadow-md bg-base-200" : ""}`}
          >
            <div className="flex flex-row gap-1 justify-center grow items-center">
              <HiOutlineStar size={16} className="text-base-content/70" />
              <p className="text-sm font-medium">
                Organizing ({data?.user?.organizingEvents?.length})
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        {activeTab === "attending" ? (
          hasAttendingEvents() ? (
            sortByStartTimeDesc(data?.user?.attendingEvents).map((event) => (
              <EventCard key={event?.id} event={event!} />
            ))
          ) : (
            <p className="text-sm text-base-content/70">
              Not attending any events.
            </p>
          )
        ) : hasOrganizingEvents() ? (
          sortByStartTimeDesc(data?.user?.organizingEvents).map((event) => (
            <EventCard key={event?.id} event={event!} />
          ))
        ) : (
          <p className="text-sm text-base-content/70">
            Not organizing any events.
          </p>
        )}
      </div>

      {isSelf && profile && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
        />
      )}
    </div>
  );
}

export default UserPage;
