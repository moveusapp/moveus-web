import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetMyChatsDocument,
  GetMyFriendsDocument,
} from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import UserCard from "@/components/user/UserCard";
import ChatCard from "../../components/chat/ChatCard";
import UserCardSkeleton from "@/components/user/UserCardSkeleton";
import ChatCardSkeleton from "@/components/chat/ChatCardSkeleton";

type ChatsPageTab = "chats" | "friends";

function ChatListPage() {
  useDocumentTitle("Chats");

  const [tab, setTab] = useState<ChatsPageTab>("chats");

  const { loading: chatsLoading, data: chatsData } =
    useQuery(GetMyChatsDocument);

  const { loading: friendsLoading, data: friendsData } =
    useQuery(GetMyFriendsDocument);

  const chats = useMemo(() => {
    if (chatsLoading) {
      return Array(4).fill(undefined);
    }

    return chatsData?.myChats
      ?.filter((c) => c?.lastMessage)
      .sort(
        (a, b) =>
          b!.lastMessage!.timeSent!.getTime() -
          a!.lastMessage!.timeSent!.getTime(),
      );
  }, [chatsData]);

  return (
    <div className="vertical">
      <div className="flex border-b border-foreground border-solid text-center justify-between py-2 mb-8">
        <p
          onClick={() => setTab("chats")}
          className={
            (tab === "chats" ? "text-block-accent" : "") +
            " w-full cursor-pointer font-medium text-lg"
          }
        >
          chats
        </p>
        <p
          onClick={() => setTab("friends")}
          className={
            (tab === "friends" ? "text-block-accent" : "") +
            " w-full cursor-pointer font-medium text-lg"
          }
        >
          friends
        </p>
      </div>
      {tab === "chats" ? (
        <div className="overflow-auto pb-8 flex-1 flex flex-col gap-3">
          {chatsLoading
            ? [...Array(4)].map((_, index) => <ChatCardSkeleton key={`chat-skeleton-${index}`} />)
            : chats?.map((chat, index) => (
                <ChatCard key={`chat-${index}`} chat={chat} />
              ))}
        </div>
      ) : (
        <div className="overflow-auto pb-8 flex-1 flex flex-col gap-8">
          {friendsLoading
            ? [...Array(4)].map((_, index) => (
                <UserCardSkeleton key={`friend-skeleton-${index}`} />
              ))
            : friendsData?.friends?.map((friend) => (
                <UserCard
                  key={`friend-${friend!.user!.id}`}
                  user={friend!.user!}
                  isSelf={false}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export default ChatListPage;
