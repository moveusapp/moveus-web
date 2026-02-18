import { randomInt } from "@/utils/math-utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserAvatarSkeleton from "./UserAvatarSkeleton";

function UserCardSkeleton() {
  return (
    <div className="user-card mb-3">
      <UserAvatarSkeleton />
      <div className="inner">
        <Skeleton width={randomInt(170, 300)} />
        <Skeleton width={70} />
      </div>
    </div>
  );
}

export default UserCardSkeleton;
