import { NotificationEnum } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";
import { Link } from "react-router-dom";
import UserAvatar from "../user/UserAvatar";

function NotificationCard({ notification }: NotificationCardProps) {
  const time = `${notification.time!.toDateString().slice(4, 10).trim()}, ${prependZero(notification.time!.getHours())}:${prependZero(notification.time!.getMinutes())}`;

  if (notification?.__typename === "UserNotificationType") {
    const name = displayName(
      notification.user?.username!,
      notification.user?.firstName!,
      notification.user?.lastName!,
    );

    switch (notification?.notificationType) {
      case NotificationEnum.NewFollower:
        return (
          <Link
            key={notification.id}
            className="bg-base-200 rounded-2xl border border-base-300 p-4 hover:border-primary/25 transition-all"
            to={`/user/${notification.user?.username}`}
          >
            <div className="flex flex-row gap-2">
              <UserAvatar
                userId={notification.user?.id}
                className="w-12"
              />
              <div className="flex flex-col justify-between">
                <p><b>{name}</b> started following you.</p>
                <p className="text-base-content/70 text-sm">{time}</p>
              </div>
            </div>
          </Link>
        );
      default:
        return <></>;
    }
  }

  if (notification?.__typename === "EventNotificationType") {
    switch (notification?.notificationType) {
      case NotificationEnum.EventFinished:
        return (
          <Link
            key={notification.id}
            className="bg-base-200 rounded-2xl border border-base-300 p-4 hover:border-primary/25 transition-all"
            to={`/event/${notification.event?.id}`}
          >
            <div className="flex flex-row gap-2">
              <div className="flex flex-col justify-between">
                <p><b>{notification.event?.title}</b> has finished.</p>
                <p className="text-base-content/70 text-sm">{time}</p>
              </div>
            </div>
          </Link>
        );
      default:
        return <></>;
    }
  }

  return <></>;
}

interface NotificationCardProps {
  notification: any;
}

export default NotificationCard;
