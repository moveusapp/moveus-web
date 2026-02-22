import useDocumentTitle from "@/hooks/use-document-title";
import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UserProgressWidget from "@/components/widgets/UserProgressWidget";
import UserActivityWidget from "@/components/widgets/UserActivityWidget";
import MainFooter from "@/components/misc/MainFooter";
import { SearchItemsDocument } from "@/graphql/graphql-types";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../../components/event/EventCard";
import UserCard from "@/components/user/UserCard";
import { useProfile } from "@/context/profile-context";

function SearchPage() {
  useDocumentTitle("Explore");

  const tabs = ["All", "Events", "People", "Posts"];
  const [activeTab, setActiveTab] = useState("All");

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
    if (activeTab === "All") return true;

    if (type === "EventType" && activeTab == "Events") return true;
    if (type === "UserType" && activeTab == "People") return true;
    if (type === "PostType" && activeTab == "Posts") return true;

    return false;
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col mx-auto grow">
        <header className="sticky top-0 z-20 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
          <div className="m-4 mb-0">
            <GlobalSearchWidget />
          </div>
          <div className="flex px-4 pt-2 gap-1 justify-between overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap grow rounded-t-lg border-b-2 transition-all
                ${
                  activeTab === tab
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-neutral hover:text-base-content hover:bg-base-200"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>
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
                        return <></>;
                    }
                    return <></>;
                  })}
                </>
              ) : (
                <>
                  <p className="text-sm text-base-content/70">
                    {searchParams.get("q") &&
                      `No results for query '${searchParams.get("q")}'`}
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
