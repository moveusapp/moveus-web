import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import BackButton from "@/components/routes/BackButton";
import { LOADER_COLOR } from "@/constants";
import { useGetNotficationsQuery } from "@/graphql/generated";
import useDocumentTitle from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";

function NotificationsPage() {
  useDocumentTitle("Notfications");

  const { data, loading } = useGetNotficationsQuery();

  return (
    <div className="vertical">
      <div className="my-8">
        <BackButton />
      </div>
      {loading ? (
        <div className="grow flex justify-center items-center">
          <HashLoader color={LOADER_COLOR} />
        </div>
      ) : (
        <div className="vertical overflow-y-auto gap-4">
          {data?.myNotifications?.map((notification) => {
            if (!(notification?.__typename === "UserNotificationType"))
              return <></>;
            const name = displayName(
              notification.user?.username!,
              notification.user?.firstName!,
              notification.user?.lastName!,
            );
            const time = `${notification.time!.toDateString().slice(4, 10).trim()}, ${prependZero(notification.time!.getHours())}:${prependZero(notification.time!.getHours())}`;
            switch (notification?.notificationType) {
              case "FRIEND_ACCEPTED":
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
              case "FRIEND_REQUEST":
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
          })}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
