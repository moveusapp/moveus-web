import { NotificationEnum } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";
import { Link } from "react-router-dom";
import UserAvatar from "../user/UserAvatar";

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
          className="bg-base-200 rounded-2xl border border-base-300 p-4 hover:border-primary/25 transition-all"
          to={`/user/${notification.user?.username}`}
        >
          <div className="flex flex-row gap-2">
            <UserAvatar
              userId={notification.user?.username}
              className="w-12"
            />
            <div className="flex flex-col justify-between">
              <p><b>{name}</b> accepted your friend request.</p>
              <p className="text-base-content/70 text-sm">{time}</p>
            </div>
          </div>
        </Link>
      );
    case NotificationEnum.FriendRequest:
      return (
        <Link
          key={notification.id}
          className="bg-base-200 rounded-2xl border border-base-300 p-4 hover:border-primary/25"
          to={`/user/${notification.user?.username}`}
        >
          <div className="flex flex-row gap-2">
            <UserAvatar
              userId={notification.user?.username}
              className="w-12"
            />
            <div className="flex flex-col justify-between">
              <p><b>{name}</b> sent you a friend request.</p>
              <p className="text-base-content/70 text-sm">{time}</p>
            </div>
          </div>
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
