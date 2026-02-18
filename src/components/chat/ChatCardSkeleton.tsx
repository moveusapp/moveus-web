import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserAvatarSkeleton from "@/components/user/UserAvatarSkeleton";
import { randomInt } from "@/utils/math-utils";

function ChatCardSkeleton() {
  return (
    <div className="p-6 rounded-[15px] relative bg-block block w-full box-border">
      <span className="absolute top-6 right-6 text-[10px] font-medium">
        <Skeleton />
      </span>
      <div className="flex gap-4 font-medium relative items-center">
        <UserAvatarSkeleton />
        <div className="max-w-[55%] overflow-hidden">
          <Skeleton width={randomInt(170, 300)} />
          <Skeleton width={randomInt(130, 300)} />
        </div>
      </div>
    </div>
  );
}

export default ChatCardSkeleton;
