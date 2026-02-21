import Tag from "@/components/misc/Tag";
import Button from "@/components/ui/Button";
import FriendshipButton from "@/components/user/FriendshipButton";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import { GetUserDocument } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { formatDate, formatTime, getAge } from "@/utils/time-utils";
import { useQuery } from "@apollo/client/react";
import { HiOutlineChat, HiStar } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import EventCard from "../home/EventCard";

function UserView() {
  const { userId } = useParams();
  const { data, loading } = useQuery(GetUserDocument, {
    variables: { userId: parseInt(userId!) },
  });
  const { profile } = useProfile();

  if (loading) {
    return <></>;
  }

  const isSelf = profile?.id === data?.user?.id;
  const name = displayName(
    data!.user!.username!,
    data!.user!.firstName,
    data!.user!.lastName,
  );

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
            userId={parseInt(userId!)}
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
                <p>{data?.user?.bio}</p>
              )}
            </div>

            <div className="flex flex-row gap-1 mt-1">
              {data?.user?.dateOfBirth && <Tag text={`${getAge(data?.user?.dateOfBirth)} Years Old`} />}
              {data?.user?.gender && <Tag text={data?.user?.gender?.toLocaleLowerCase()!} />}
            </div>
          </div>

          {isSelf ? (
            <Button>Edit Profile</Button>
          ) : (
            <div className="flex flex-row gap-1">
              <Button>
                <HiOutlineChat size={18} />
              </Button>
              <FriendshipButton
                userId={data?.user?.id!}
                status={data?.user?.relationship?.status!}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
        <div className="flex flex-row gap-1 justify-center items-center">
          <HiStar size={18} className="text-accent" />
          <p className="font-medium">
            Organizes ({data?.user?.organizes?.length})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data?.user?.organizes?.map((event) => (
          <EventCard key={event?.id} event={event!} />
        ))}
      </div>
    </div>
  );
}

export default UserView;
