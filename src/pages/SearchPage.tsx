import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import UserImage from "@/components/images/UserImage";
import BackButton from "@/components/routes/BackButton";
import { LOADER_COLOR } from "@/constants";
import { useProfile } from "@/context/profile-context";
import { useSearchItemsLazyQuery } from "@/graphql/generated";
import useDocumentTitle, { setDocumentTitle } from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { FaCalendarDay, FaWindowRestore } from "react-icons/fa";

type ItemType = "User" | "Event" | "Post" | "All";

function SearchPage() {
  useDocumentTitle("Search");

  const { profile } = useProfile();

  const [searchString, setSearchString] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [itemType, setItemType] = useState("All" as ItemType);

  const [searchItems, { loading, data }] = useSearchItemsLazyQuery();

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setSearchString(value);
    },
    [setSearchString],
  );

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (loading) return;
      setDocumentTitle(`${searchString} - Search`);
      setLastSearch(searchString);
      searchItems({
        variables: { searchString },
      }).catch((e) => console.error(e));
    },
    [searchString, setLastSearch, loading, searchItems],
  );

  const items = useMemo(() => {
    const filterSelf = data?.searchResult?.filter(
      (item) => item?.__typename !== "UserType" || item.id !== profile?.id,
    );
    switch (itemType) {
      case "User":
        return filterSelf?.filter((item) => item?.__typename === "UserType");
      case "Event":
        return filterSelf?.filter((item) => item?.__typename === "EventType");
      case "Post":
        return filterSelf?.filter((item) => item?.__typename === "PostType");
      default:
        return filterSelf;
    }
  }, [data, itemType, profile?.id]);

  return (
    <div className="vertical gap-4">
      <div className="mt-8">
        <BackButton />
      </div>
      <form className="flex" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          value={searchString}
          onChange={handleSearchChange}
          placeholder="search for something"
          className="p-0! border-0! outline-0! placeholder:opacity-50 placeholder:text-foreground! placeholder:text-xl text-xl"
        />
        <button
          type="submit"
          className="text-3xl bg-transparent text-foreground w-auto"
        >
          <HiMagnifyingGlass />
        </button>
      </form>
      {lastSearch && <p>Results for '{lastSearch}'</p>}
      <div className="flex justify-between items-center">
        <p
          className={
            "cursor-pointer select-none font-medium " +
            (itemType === "All" && "text-block-accent")
          }
          onClick={() => setItemType("All")}
        >
          All
        </p>
        <p
          className={
            "cursor-pointer select-none font-medium " +
            (itemType === "User" && "text-block-accent")
          }
          onClick={() => setItemType("User")}
        >
          Users
        </p>
        <p
          className={
            "cursor-pointer select-none font-medium " +
            (itemType === "Event" && "text-block-accent")
          }
          onClick={() => setItemType("Event")}
        >
          Events
        </p>
        <p
          className={
            "cursor-pointer select-none font-medium " +
            (itemType === "Post" && "text-block-accent")
          }
          onClick={() => setItemType("Post")}
        >
          Posts
        </p>
      </div>
      {loading ? (
        <HashLoader color={LOADER_COLOR} className="mt-32 mx-auto" />
      ) : (
        <div className="vertical overflow-y-auto! gap-3 pb-8">
          {items?.map((item) => {
            switch (item?.__typename) {
              case "UserType":
                return (
                  <Link
                    to={`/user/${item.id}`}
                    key={`user-${item.id}`}
                    className="flex gap-4 bg-block p-6 rounded-[15px] items-center"
                  >
                    <UserImage
                      canChange={false}
                      userId={item.id!}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h5 className="font-medium text-lg">
                        {displayName(
                          item.username,
                          item.firstName,
                          item.lastName,
                        )}
                      </h5>
                      <p className="text-sm">@{item.username}</p>
                    </div>
                  </Link>
                );

              case "EventType":
                return (
                  <Link
                    to={`/event/${item.id}`}
                    key={`user-${item.id}`}
                    className="flex gap-4 bg-block p-6 rounded-[15px] items-center"
                  >
                    <FaCalendarDay className="text-4xl shrink-0 text-accent" />
                    <div className="flex-1 overflow-hidden">
                      <h5 className="font-medium text-lg">{item.title}</h5>
                      <p className="text-sm overflow-hidden text-nowrap">
                        {item.description ? (
                          item.description
                        ) : (
                          <i>no description</i>
                        )}
                      </p>
                    </div>
                  </Link>
                );

              case "PostType":
                return (
                  <Link
                    to={`/event/${item.event?.id}`}
                    key={`user-${item.id}`}
                    className="flex gap-4 bg-block p-6 rounded-[15px] items-center"
                  >
                    <FaWindowRestore className="text-4xl shrink-0 text-accent" />
                    <div className="flex-1 overflow-hidden">
                      <h5 className="font-medium text-lg">{item.title}</h5>
                      <p className="text-sm overflow-hidden text-nowrap">
                        {item.content ? item.content : <i>no content</i>}
                      </p>
                    </div>
                  </Link>
                );
            }
            return <></>;
          })}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
