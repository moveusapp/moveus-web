import { useEffect, useMemo, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GetMyChatsDocument, GetUserChatDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import ChatCard from "@/components/chat/ChatCard";
import ChatCardSkeleton from "@/components/chat/ChatCardSkeleton";
import ChatView from "@/pages/chat/ChatView";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function ChatPage() {
  useDocumentTitle("Chats");

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const { loading, data, refetch: refetchChats } = useQuery(GetMyChatsDocument);

  const [getUserChat] = useLazyQuery(GetUserChatDocument);

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (!userId) return;

    getUserChat({ variables: { userId: Number(userId) } }).then(({ data }) => {
      if (data?.userChat?.id) {
        setSelectedChatId(data.userChat.id);
        refetchChats();
      }
      setSearchParams({}, { replace: true });
    });
  }, []);

  const chats = useMemo(() => {
    return [...(data?.myChats ?? [])]
      .filter((chat) => (chat?.members?.length ?? 0) > 0)
      .sort((a, b) => {
        const aTime = a?.lastMessage?.timeSent?.getTime() ?? 0;
        const bTime = b?.lastMessage?.timeSent?.getTime() ?? 0;
        return bTime - aTime;
      });
  }, [data]);

  const hasChats = data && chats.length > 0;

  return (
    <div className="flex h-full">
      <div
        className={`flex-1 min-w-0 flex-col ${
          selectedChatId ? "flex" : "hidden lg:flex"
        }`}
      >
        {selectedChatId ? (
          <ChatView key={selectedChatId} chatId={selectedChatId} onBack={() => setSelectedChatId(null)} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-base-content/40">
            <HiOutlineChatBubbleLeftRight className="text-5xl" />
            <p className="text-base font-medium">
              Pick a chat to start talking
            </p>
          </div>
        )}
      </div>

      <aside
        className={`${
          selectedChatId ? "hidden lg:flex" : "flex"
        } flex-col w-full lg:w-[300px] xl:w-[340px] lg:flex-shrink-0 lg:border-l border-base-300 overflow-y-auto h-full`}
      >
        <div className="p-4 pb-2">
          <h2 className="font-semibold text-lg">Messages</h2>
        </div>
        <div className="flex flex-col px-1 pb-4">
          {loading && !data ? (
            [...Array(8)].map((_, i) => (
              <ChatCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : hasChats ? (
            chats!.map((chat) => (
              <ChatCard
                key={chat!.id}
                chat={chat!}
                onSelect={setSelectedChatId}
                isActive={chat!.id === selectedChatId}
              />
            ))
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-base-content/50">
                No conversations yet
              </p>
              <p className="text-xs text-base-content/35 mt-1">
                Find someone to start a conversation
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default ChatPage;
