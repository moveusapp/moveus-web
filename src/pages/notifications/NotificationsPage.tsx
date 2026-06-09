import { GetNotificationsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useQuery } from "@apollo/client/react";
import NotificationCard from "@/components/notification/NotificationCard";
import NotificationCardSkeleton from "@/components/notification/NotificationCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import RightRail from "@/components/layout/RightRail";
import strings from "@/translations/strings";

function NotificationsPage() {
  useDocumentTitle(strings.notification.documentTitle);

  const { data, loading } = useQuery(GetNotificationsDocument);

  const hasNotifications = () =>
    data && data.myNotifications && data.myNotifications.length > 0;

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col mx-auto grow h-full overflow-y-auto min-w-0">
        <PageHeader title={strings.notification.title} />
        <div className="w-full mx-auto max-w-[600px]">
          {loading ? (
            <div className="divide-y divide-base-300">
              {[...Array(10)].map((_, index) => (
                <NotificationCardSkeleton key={`notif-skeleton-${index}`} />
              ))}
            </div>
          ) : hasNotifications() ? (
            <div className="divide-y divide-base-300">
              {data?.myNotifications?.filter((n): n is NonNullable<typeof n> => n != null).map((notification) => (
                <NotificationCard
                  key={`notif-${notification.id}`}
                  notification={notification}
                />
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm text-base-content/70">{strings.notification.none}</p>
          )}
        </div>
      </div>
      <RightRail />
    </div>
  );
}

export default NotificationsPage;
