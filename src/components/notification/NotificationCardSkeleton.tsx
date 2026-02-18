import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NotificationCardSkeleton() {
  return (
    <div className="notification">
      <Skeleton />
      <Skeleton style={{ width: "65%" }}/>
    </div>
  );
}

export default NotificationCardSkeleton;
