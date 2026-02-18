import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserAvatarSkeleton() {
  return (
    <Skeleton borderRadius={100} width={50} height={50}/>
  )
}

export default UserAvatarSkeleton;
