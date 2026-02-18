import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserAvatarSkeleton from "../user/UserAvatarSkeleton";
import { randomInt } from "@/utils/math-utils";

function PostCardSkeleton() {
  return (
    <div className="rounded-[15px] box-border p-6 bg-block relative">
      <div className="user-card mt-auto mb-4">
        <UserAvatarSkeleton />
        <div className="inner">
          <Skeleton width={randomInt(160, 200)} />
          <Skeleton width={randomInt(160, 200)} />
        </div>
      </div>
      <Skeleton count={2}/>
      <Skeleton style={{ width: "50%" }}/>
    </div>
  );
}

export default PostCardSkeleton;
