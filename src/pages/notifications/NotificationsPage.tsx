import { GetNotificationsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import NotificationCard from "@/components/notification/NotificationCard";
import NotificationCardSkeleton from "@/components/notification/NotificationCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import MainFooter from "@/components/misc/MainFooter";

function NotificationsPage() {
  useDocumentTitle("Notfications");

  const { data, loading } = useQuery(GetNotificationsDocument);

  const hasNotifications = () =>
    data && data.myNotifications && data.myNotifications.length > 0;

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col mx-auto grow h-full overflow-y-auto min-w-0">
        <PageHeader title="Notifications" />
        <div className="flex flex-col px-4 sm:px-6 pt-3 pb-6 gap-2">
          {loading ? (
            [...Array(10)].map((_, index) => (
              <NotificationCardSkeleton key={`notif-skeleton-${index}`} />
            ))
          ) : hasNotifications() ? (
            data?.myNotifications?.map((notification) => (
              <NotificationCard
                key={`notif-${notification?.id}`}
                notification={notification}
              />
            ))
          ) : (
            <p className="text-sm text-base-content/70">No notifications at this time.</p>
          )}
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
