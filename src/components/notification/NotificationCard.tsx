import { GetNotificationsQueryResult, NotificationKind } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { Link } from "react-router-dom";
import { HiBolt, HiFlag, HiXMark } from "react-icons/hi2";
import type { IconType } from "react-icons";
import UserAvatar from "../user/UserAvatar";
import strings from "@/translations/strings";

const cardChassis =
  "block bg-base-200 rounded-2xl border border-base-300 p-3 sm:p-4 " +
  "transition-colors duration-150 ease-out " +
  "hover:border-primary/30 hover:bg-base-200/60 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40";

type Tone = "accent" | "primary" | "warning";

const tileFillClasses: Record<Tone, string> = {
  accent: "bg-accent",
  primary: "bg-primary",
  warning: "bg-warning",
};

function EventIconTile({ Icon, tone }: { Icon: IconType; tone: Tone }) {
  return (
    <div
      className={
        "w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center " +
        "-rotate-6 " +
        tileFillClasses[tone]
      }
      aria-hidden="true"
    >
      <Icon className="w-5 h-5 text-white rotate-6" />
    </div>
  );
}

function NotificationCard({ notification }: NotificationCardProps) {
  const time = notification.time ? timeAgo(notification.time) : "";

  if (notification?.__typename === "UserNotificationType") {
    const name = displayName(
      notification.user?.username!,
      notification.user?.firstName!,
      notification.user?.lastName!,
    );

    switch (notification?.notificationType) {
      case NotificationKind.NewFollower:
        return (
          <Link
            key={notification.id}
            className={cardChassis}
            to={`/user/${notification.user?.username}`}
          >
            <div className="flex flex-row items-center gap-3">
              <UserAvatar imageUrl={notification.user?.avatarUrl} className="w-11 shrink-0" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 grow min-w-0">
                <p className="text-[14px] sm:text-[15px] leading-snug text-base-content/80 line-clamp-2 break-words">
                  <b className="font-bold text-base-content">{name}</b> {strings.notification.nowFollowing}
                </p>
                <span className="text-xs text-base-content/60 shrink-0 mt-1 sm:mt-0">{time}</span>
              </div>
            </div>
          </Link>
        );
      default:
        return <></>;
    }
  }

  if (notification?.__typename === "EventNotificationType") {
    const title = notification.event?.title;
    const eventId = notification.event?.id;

    const renderEventCard = (
      icon: IconType,
      tone: Tone,
      status: string,
      to: string = `/event/${eventId}`,
    ) => (
      <Link key={notification.id} className={cardChassis} to={to}>
        <div className="flex flex-row items-center gap-3">
          <EventIconTile Icon={icon} tone={tone} />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 grow min-w-0">
            <p className="text-[14px] sm:text-[15px] leading-snug text-base-content/80 line-clamp-2 break-words">
              <b className="font-bold text-base-content">{title}</b> {status}
            </p>
            <span className="text-xs text-base-content/60 shrink-0 mt-1 sm:mt-0">{time}</span>
          </div>
        </div>
      </Link>
    );

    switch (notification?.notificationType) {
      case NotificationKind.EventStarted:
        return renderEventCard(HiBolt, "accent", strings.notification.eventStartingNow);
      case NotificationKind.EventFinished:
        return renderEventCard(
          HiFlag,
          "primary",
          strings.notification.eventWrappedUp,
          `/event/${eventId}?feedback`,
        );
    case NotificationKind.EventCancelled:
      return renderEventCard(HiXMark, "warning", strings.notification.eventWasCancelled);
    default:
      return <></>;
  }
}

  return <></>;
}

type Notification = NonNullable<
  NonNullable<GetNotificationsQueryResult["myNotifications"]>[number]
>;

interface NotificationCardProps {
  notification: Notification;
}

export default NotificationCard;
