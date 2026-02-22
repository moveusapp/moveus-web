import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GetMyChatsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import ChatCard from "../../components/chat/ChatCard";
import ChatCardSkeleton from "@/components/chat/ChatCardSkeleton";
import FriendsWidget from "@/components/widgets/FriendsWidget";
import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import MainFooter from "@/components/misc/MainFooter";

function ChatListPage() {
  useDocumentTitle("Chats");

  const { loading, data } = useQuery(GetMyChatsDocument);

  const chats = useMemo(() => {
    if (loading) {
      return null;
    }

    return data?.myChats
      ?.filter((c) => c?.lastMessage)
      .sort(
        (a, b) =>
          b!.lastMessage!.timeSent!.getTime() -
          a!.lastMessage!.timeSent!.getTime(),
      );
  }, [data]);

  const hasChats = () => chats && chats.length > 0;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full mx-auto gap-3 p-4">
        <h1 className="font-medium text-xl">Messages</h1>
        {loading ? (
          [...Array(10)].map((_, index) => (
            <ChatCardSkeleton key={`chat-skeleton-${index}`} />
          ))
        ) : hasChats() ? (
          chats?.map((chat, index) => (
            <ChatCard key={`chat-${index}`} chat={chat!} />
          ))
        ) : (
          <p className="text-sm text-base-content/70">No messages.</p>
        )}
      </div>
      <aside className="hidden lg:block lg:w-[280px] xl:w-[330px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="flex flex-col py-4 pr-4 gap-2">
          <GlobalSearchWidget />
          <FriendsWidget />
          <MainFooter />
        </div>
      </aside>
    </div>
  );
}

export default ChatListPage;
