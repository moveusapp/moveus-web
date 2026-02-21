import { GetNotificationsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import NotificationCard from "@/components/notification/NotificationCard";
import NotificationCardSkeleton from "@/components/notification/NotificationCardSkeleton";
import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import MainFooter from "@/components/misc/MainFooter";

function NotificationsPage() {
  useDocumentTitle("Notfications");

  const { data, loading } = useQuery(GetNotificationsDocument);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col mx-auto grow">
        <div className="flex flex-col m-4 gap-2">
          <h1 className="font-medium text-xl">Notifications</h1>
          {loading
            ? [...Array(10)].map((_, index) => (
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
      <aside className="hidden lg:block lg:w-[280px] xl:w-[330px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex flex-col py-4 pr-4 gap-2">
          <GlobalSearchWidget />
          <UserProgressWidget />
          <UserActivityWidget />
          <MainFooter />
        </div>
      </aside>
    </div>
  );
}

export default NotificationsPage;
