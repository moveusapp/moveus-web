import useDocumentTitle from "@/hooks/use-document-title";
import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import MainFooter from "@/components/misc/MainFooter";
import PageHeader, { HeaderAvatar } from "@/components/layout/PageHeader";
import { SearchItemsDocument } from "@/graphql/graphql-types";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import UserCard from "./UserCard";
import { useProfile } from "@/context/profile-context";
import PostCard from "@/components/post/PostCard";
import TabButtons from "@/components/ui/TabButtons";
import strings from "@/translations/strings";

type SearchTab = "all" | "events" | "people" | "posts";

function SearchPage() {
  useDocumentTitle(strings.search.documentTitle);

  const tabs: { value: SearchTab; label: string }[] = [
    { value: "all", label: strings.search.tabAll },
    { value: "events", label: strings.search.tabEvents },
    { value: "people", label: strings.search.tabPeople },
    { value: "posts", label: strings.search.tabPosts },
  ];

  const [activeTab, setActiveTab] = useState<SearchTab>("all");

  const [searchParams] = useSearchParams();
  const { profile } = useProfile();

  const [searchItems, { loading: searchLoading, data: searchData }] =
    useLazyQuery(SearchItemsDocument, {
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
    });

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      searchItems({ variables: { searchString: query } });
    }
  }, [searchParams]);

  const hasResults = () => {
    if (searchLoading) {
      return false;
    }

    if (!searchData || !searchData.search || searchData.search.length <= 0) {
      return false;
    }

    return true;
  };

  const canCreateCard = (type: string) => {
    if (activeTab === "all") return true;

    if (type === "EventType" && activeTab === "events") return true;
    if (type === "UserType" && activeTab === "people") return true;
    if (type === "PostType" && activeTab === "posts") return true;

    return false;
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col mx-auto grow">
        <PageHeader>
          <div className="flex items-center gap-3">
            <HeaderAvatar />
            <div className="grow min-w-0">
              <GlobalSearchWidget />
            </div>
          </div>
          <TabButtons
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="pt-3"
          />
        </PageHeader>
        <div className="flex flex-col items-center gap-2 w-full mx-auto p-4 max-w-[700px]">
          {searchLoading ? (
            <div className="loading loading-dots text-primary" />
          ) : (
            <>
              {hasResults() ? (
                <>
                  {searchData?.search?.map((item) => {
                    if (!canCreateCard(item?.__typename!)) {
                      return;
                    }
                    switch (item?.__typename) {
                      case "UserType":
                        return (
                          <UserCard
                            key={`user-${item.id}`}
                            user={item}
                            isSelf={item.id === profile?.id}
                          />
                        );

                      case "EventType":
                        return (
                          <EventCard key={`event-${item.id}`} event={item} />
                        );

                      case "PostType":
                        return <PostCard key={`post-${item.id}`} post={item} />;
                    }
                    return <></>;
                  })}
                </>
              ) : (
                <>
                  <p className="text-sm text-base-content/70">
                    {searchParams.get("q") &&
                      (strings.formatString(strings.search.noResults, {
                        query: searchParams.get("q") ?? "",
                      }) as string)}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <aside className="hidden lg:block lg:w-[280px] xl:w-[330px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex flex-col py-4 pr-4 gap-2">
          <UserProgressWidget />
          <UserActivityWidget />
          <MainFooter />
        </div>
      </aside>
    </div>
  );
}

export default SearchPage;
