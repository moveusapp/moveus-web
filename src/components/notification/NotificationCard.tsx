import { NotificationEnum } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";
import { Link } from "react-router-dom";

function NotificationCard({ notification }: NotificationCardProps) {
  if (notification?.__typename !== "UserNotificationType") return <></>;

  const name = displayName(
    notification.user?.username!,
    notification.user?.firstName!,
    notification.user?.lastName!,
  );

  const time = `${notification.time!.toDateString().slice(4, 10).trim()}, ${prependZero(notification.time!.getHours())}:${prependZero(notification.time!.getHours())}`;

  switch (notification?.notificationType) {
    case NotificationEnum.FriendAccepted:
      return (
        <Link
          key={notification.id}
          className="notification"
          to={`/user/${notification.user?.id}`}
        >
          <div>
            <h3>New friend!</h3>
            <p>{time}</p>
          </div>
          <p>{name} accepted your friend request.</p>
        </Link>
      );
    case NotificationEnum.FriendRequest:
      return (
        <Link
          key={notification.id}
          className="notification"
          to={`/user/${notification.user?.id}`}
        >
          <div>
            <h3>New friend request!</h3>
            <p>{time}</p>
          </div>
          <p>{name} sent you friend request.</p>
        </Link>
      );
    default:
      return <></>;
  }
}

interface NotificationCardProps {
  notification: any;
}

export default NotificationCard;
