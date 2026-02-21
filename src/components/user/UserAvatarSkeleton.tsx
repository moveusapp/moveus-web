import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserAvatarSkeleton({ className }: UserAvatarSkeletonProps) {
  return (
    <Skeleton className={className} borderRadius={100} width={50} height={50} />
  );
}

interface UserAvatarSkeletonProps {
  className?: string;
}

export default UserAvatarSkeleton;
