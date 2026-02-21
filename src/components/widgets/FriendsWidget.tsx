import { GetMyFriendsDocument } from "@/graphql/graphql-types";
import { useQuery } from "@apollo/client/react";
import UserCard from "../user/UserCard";
import UserCardSkeleton from "../user/UserCardSkeleton";

function FriendsWidget() {
  const { data, loading } = useQuery(GetMyFriendsDocument);

  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral mb-3">
        Friends
      </h3>
      <div className="flex flex-col gap-2.5">
        {loading ? (
          [...Array(4)].map((_, index) => <UserCardSkeleton key={`user-skeleton-${index}`}/>)
        ) : (
          data!.friends!.map((friend) => 
            <UserCard key={`user-${friend?.user?.id}`} user={friend?.user!} />
          )
        )}
      </div>
    </div>
  );
}

export default FriendsWidget;
