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
  HiOutlineNewspaper,
} from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { IconType } from "react-icons";
import { Link, useParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import PostCard from "@/components/post/PostCard";
import TabButtons from "@/components/ui/TabButtons";
import EmptyState from "@/components/ui/EmptyState";
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

type ProfileTab = "posts" | "attending" | "organizing";

function tabLabel(Icon: IconType, text: string, count: number): ReactNode {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon size={16} className="opacity-70" />
      <span>{text}</span>
      <span className="text-xs opacity-50 tabular-nums">{count}</span>
    </span>
  );
}

function UserPage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
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

  const posts = [...(user.posts ?? [])]
    .filter((post): post is NonNullable<typeof post> => post != null)
    .sort(
      (a, b) =>
        new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime(),
    );

  const tabs: { value: ProfileTab; label: ReactNode }[] = [
    {
      value: "posts",
      label: tabLabel(HiOutlineNewspaper, "Posts", posts.length),
    },
    {
      value: "attending",
      label: tabLabel(
        HiOutlineCalendar,
        "Attending",
        user.attendingEvents?.length ?? 0,
      ),
    },
    {
      value: "organizing",
      label: tabLabel(
        HiOutlineStar,
        "Organizing",
        user.organizingEvents?.length ?? 0,
      ),
    },
  ];

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

      <div className="border-b border-base-300">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === "posts" &&
        (posts.length > 0 ? (
          <div className="columns-1 md:columns-2 gap-3">
            {posts.map((post) => (
              <div key={post.id} className="mb-3 break-inside-avoid">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<HiOutlineNewspaper className="h-5 w-5" />}
            title={isSelf ? "No posts yet" : `${name} hasn't posted yet`}
            description={
              isSelf
                ? "Share a moment from a workout or event. Your posts land here."
                : "When they share something, it'll show up here."
            }
          />
        ))}

      {activeTab === "attending" &&
        (hasAttendingEvents() ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {sortByStartTimeDesc(user.attendingEvents).map((event) => (
              <EventCard key={event?.id} event={event!} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<HiOutlineCalendar className="h-5 w-5" />}
            title="Nothing on the calendar"
            description={
              isSelf
                ? "Find a local event and join in. It'll show up here."
                : `${name} isn't attending any events right now.`
            }
          />
        ))}

      {activeTab === "organizing" &&
        (hasOrganizingEvents() ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {sortByStartTimeDesc(user.organizingEvents).map((event) => (
              <EventCard key={event?.id} event={event!} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<HiOutlineStar className="h-5 w-5" />}
            title="No events organized yet"
            description={
              isSelf
                ? "Host your own event and bring people together. It'll show up here."
                : `${name} isn't organizing any events right now.`
            }
          />
        ))}

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
