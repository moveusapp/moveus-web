import BackButton from "@/components/routes/BackButton";
import { GetNotificationsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import NotificationCard from "@/components/notification/NotificationCard";
import NotificationCardSkeleton from "@/components/notification/NotificationCardSkeleton";

function NotificationsPage() {
  useDocumentTitle("Notfications");

  const { data, loading } = useQuery(GetNotificationsDocument);

  return (
    <div className="vertical">
      <div className="my-8">
        <BackButton />
      </div>
      <div className="vertical overflow-y-auto gap-4">
        {loading
          ? [...Array(6)].map((_, index) => (
              <NotificationCardSkeleton key={`notif-skeleton-${index}`} />
            ))
          : data?.myNotifications?.map((notification) => (
              <NotificationCard
                key={`notif-${notification?.id}`}
                notification={notification}
              />
            ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
