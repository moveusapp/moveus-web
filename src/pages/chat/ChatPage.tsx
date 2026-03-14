import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GetMyChatsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import ChatCard from "@/components/chat/ChatCard";
import ChatCardSkeleton from "@/components/chat/ChatCardSkeleton";
import ChatView from "@/pages/chat/ChatView";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { RiArrowLeftLine } from "react-icons/ri";

function ChatPage() {
  useDocumentTitle("Chats");

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const { loading, data } = useQuery(GetMyChatsDocument);

  const chats = useMemo(() => {
    if (loading) return null;
    return [...(data?.myChats ?? [])]
      .filter((chat) => (chat?.members?.length ?? 0) > 0)
      .sort((a, b) => {
        const aTime = a?.lastMessage?.timeSent?.getTime() ?? 0;
        const bTime = b?.lastMessage?.timeSent?.getTime() ?? 0;
        return bTime - aTime;
      });
  }, [data]);

  const hasChats = chats && chats.length > 0;

  return (
    <div className="flex h-full">
      {/* Center: conversation or empty state */}
      <div
        className={`flex-1 min-w-0 flex-col ${
          selectedChatId ? "flex" : "hidden lg:flex"
        }`}
      >
        {selectedChatId ? (
          <>
            <button
              className="lg:hidden flex items-center gap-2 p-4 pb-0 text-sm font-medium text-primary"
              onClick={() => setSelectedChatId(null)}
            >
              <RiArrowLeftLine className="text-lg" />
              Back
            </button>
            <ChatView key={selectedChatId} chatId={selectedChatId} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-base-content/40">
            <HiOutlineChatBubbleLeftRight className="text-5xl" />
            <p className="text-base font-medium">
              Pick a chat to start talking
            </p>
          </div>
        )}
      </div>

      {/* Right sidebar: chat list */}
      <aside
        className={`${
          selectedChatId ? "hidden lg:flex" : "flex"
        } flex-col w-full lg:w-[300px] xl:w-[340px] lg:flex-shrink-0 lg:border-l border-base-300 overflow-y-auto h-full`}
      >
        <div className="p-4 pb-2">
          <h2 className="font-semibold text-lg">Messages</h2>
        </div>
        <div className="flex flex-col px-1 pb-4">
          {loading ? (
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
                Add friends to start chatting
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default ChatPage;
