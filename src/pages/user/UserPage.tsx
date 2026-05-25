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
  HiOutlineLocationMarker,
  HiOutlineCake,
  HiOutlineUser,
} from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { IconType } from "react-icons";
import { Link, useParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import PostCard from "@/components/post/PostCard";
import TabButtons from "@/components/ui/TabButtons";
import EmptyState from "@/components/ui/EmptyState";
import { ReactNode, useState } from "react";
import UserPageSkeleton from "./UserPageSkeleton";
import EditProfileModal from "./EditProfileModal";
import useDocumentTitle from "@/hooks/use-document-title";
import strings from "@/translations/strings";

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

function genderLabel(g: Gender): string | undefined {
  const labels = strings.enums.gender as unknown as Record<string, string>;
  return labels[g];
}

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

  useDocumentTitle(username!);

  if (loading) {
    return <UserPageSkeleton />;
  }

  if (error) {
    return (
      <div className="m-4">
        <p>
          {strings.formatString(strings.profile.userNotFound, {
            username: username ?? "",
          })}
        </p>
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
  const gLabel = user.gender ? genderLabel(user.gender) : undefined;

  const facts: { icon: IconType; label: string }[] = [];
  if (locationName)
    facts.push({ icon: HiOutlineLocationMarker, label: locationName });
  if (age != null)
    facts.push({
      icon: HiOutlineCake,
      label: strings.formatString(strings.profile.yearsOld, { age }) as string,
    });
  if (gLabel) facts.push({ icon: HiOutlineUser, label: gLabel });

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
      label: tabLabel(HiOutlineNewspaper, strings.ui.posts, posts.length),
    },
    {
      value: "attending",
      label: tabLabel(
        HiOutlineCalendar,
        strings.profile.attendingTab,
        user.attendingEvents?.length ?? 0,
      ),
    },
    {
      value: "organizing",
      label: tabLabel(
        HiOutlineStar,
        strings.profile.organizingTab,
        user.organizingEvents?.length ?? 0,
      ),
    },
  ];

  return (
    <div className="flex flex-col m-4 gap-2">
      <div className="bg-base-200 rounded-2xl border border-base-300 p-5">
        <div className="flex flex-row items-center gap-4">
          <UserAvatar
            userId={user.id!}
            className="flex-shrink-0 w-20 h-20"
          />

          <div className="flex flex-col grow min-w-0 gap-0.5">
            <div className="flex flex-row gap-1.5 items-center">
              <h1 className="font-bold text-2xl truncate">{name}</h1>
              {user.verified && (
                <HiCheckBadge size={22} className="text-primary shrink-0" />
              )}
            </div>

            <p className="text-sm text-base-content/60 truncate">
              @{user.username}
            </p>
          </div>

          {isSelf ? (
            <Button
              className="flex-shrink-0 self-start"
              onClick={() => setShowEditModal(true)}
            >
              {strings.profile.editProfile}
            </Button>
          ) : (
            profile && (
              <div className="flex flex-row gap-2 flex-shrink-0 self-start">
                <Link
                  to={`/chat?userId=${user.id}`}
                  className="btn btn-square rounded-2xl"
                  aria-label={
                    strings.formatString(strings.profile.messageAria, {
                      name,
                    }) as string
                  }
                >
                  <HiOutlineChat size={18} />
                </Link>

                <FollowButton
                  userId={user.id!}
                  isFollowing={user.isFollowing ?? false}
                />
              </div>
            )
          )}
        </div>

        <p className="mt-4 max-w-prose text-sm leading-relaxed text-base-content/90">
          {isBioEmpty() ? (
            <span className="italic text-base-content/50">{strings.profile.noBio}</span>
          ) : (
            user.bio
          )}
        </p>

        {facts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {facts.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-sm text-base-content/70"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </div>
        )}

        {showFollowers && (
          <div className="mt-4 pt-4 border-t border-base-300 flex flex-row items-center gap-5 text-sm">
            {user.followerCount != null && (
              <span>
                <span className="font-bold text-base-content">
                  {user.followerCount}
                </span>{" "}
                <span className="text-base-content/60">{strings.profile.followers}</span>
              </span>
            )}
            {user.followingCount != null && (
              <span>
                <span className="font-bold text-base-content">
                  {user.followingCount}
                </span>{" "}
                <span className="text-base-content/60">{strings.profile.following}</span>
              </span>
            )}
          </div>
        )}
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
            title={
              isSelf
                ? strings.profile.noPostsSelf
                : (strings.formatString(strings.profile.noPostsOther, {
                    name,
                  }) as string)
            }
            description={
              isSelf
                ? strings.profile.noPostsSelfDesc
                : strings.profile.noPostsOtherDesc
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
            title={strings.profile.noCalendar}
            description={
              isSelf
                ? strings.profile.noAttendingSelfDesc
                : (strings.formatString(strings.profile.noAttendingOtherDesc, {
                    name,
                  }) as string)
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
            title={strings.profile.noOrganized}
            description={
              isSelf
                ? strings.profile.noOrganizingSelfDesc
                : (strings.formatString(strings.profile.noOrganizingOtherDesc, {
                    name,
                  }) as string)
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
