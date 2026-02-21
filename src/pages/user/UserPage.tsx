import Button from "@/components/ui/Button";
import FriendshipButton from "@/components/user/FriendshipButton";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import { GetUserDocument } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { useQuery } from "@apollo/client/react";
import {
  HiOutlineChat,
  HiOutlineStar,
  HiOutlineCalendar,
} from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import { useState } from "react";
import UserPageSkeleton from "./UserPageSkeleton";

function UserPage() {
  const tabs = ["attending", "organizing"];
  const [activeTab, setActiveTab] = useState("attending");

  const { userId } = useParams();
  const { data, loading } = useQuery(GetUserDocument, {
    variables: { userId: parseInt(userId!) },
  });
  const { profile } = useProfile();

  if (loading) {
    return <UserPageSkeleton />;
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

      <div className="bg-base-300 rounded-2xl border border-base-300 p-1">
        <div className="flex flex-row gap-1 justify-between items-center">
          <button
            onClick={() => setActiveTab("attending")}
            className={`hover:bg-base-200 transition-all p-2 rounded-2xl grow ${activeTab === "attending" ? "shadow-md bg-base-200" : ""}`}
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
            className={`hover:bg-base-200 transition-all p-2 rounded-2xl grow ${activeTab === "organizing" ? "shadow-md bg-base-200" : ""}`}
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
        {activeTab === "attending"
          ? data?.user?.attendingEvents?.map((event) => (
              <EventCard key={event?.id} event={event!} />
            ))
          : data?.user?.organizingEvents?.map((event) => (
              <EventCard key={event?.id} event={event!} />
            ))}
      </div>
    </div>
  );
}

export default UserPage;
