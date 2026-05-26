import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client/react";
import { ChatKind, CreateDirectChatDocument, MyChatsDocument, WsMyChatUpdateType } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import ChatCard, { ChatSummary, ChatSummaryMember } from "@/components/chat/ChatCard";
import ChatCardSkeleton from "@/components/chat/ChatCardSkeleton";
import ChatView from "@/pages/chat/ChatView";
import { HiOutlineChatBubbleLeftRight, HiOutlinePencilSquare } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import CreateGroupChatModal from "@/pages/chat/CreateGroupChatModal";
import strings from "@/translations/strings";

function ChatPage() {
  useDocumentTitle(strings.chat.documentTitle);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chatsMap, setChatsMap] = useState<Map<number, ChatSummary>>(new Map());
  const [hasReceivedData, setHasReceivedData] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);

  const [createDirectChat] = useMutation(CreateDirectChatDocument);

  const processEvent = useCallback(
    (event: WsMyChatUpdateType) => {
      setChatsMap((prev) => {
        const next = new Map(prev);
        const chatId = event.chatId;

        // New chat: add full chat data
        if (event.chat && event.chat.id != null) {
          const wsChat = event.chat;
          const members: ChatSummaryMember[] = (wsChat.members ?? [])
            .filter(Boolean)
            .map((m) => ({
              userId: m!.userId!,
              username: m!.username ?? "",
              firstName: m!.firstName ?? "",
              lastName: m!.lastName ?? "",
              nickname: m!.nickname ?? "",
              lastOpen: m!.lastOpen ? new Date(m!.lastOpen) : null,
            }));
          const lastMessage = wsChat.lastMessage
            ? {
                id: wsChat.lastMessage.id ?? null,
                userId: wsChat.lastMessage.userId ?? null,
                textContent: wsChat.lastMessage.textContent ?? null,
                timeSent: wsChat.lastMessage.timeSent ? new Date(wsChat.lastMessage.timeSent) : null,
                attachmentUrl: wsChat.lastMessage.attachmentUrl ?? null,
              }
            : null;
          next.set(wsChat.id!, {
            id: wsChat.id!,
            kind: (wsChat.kind as ChatKind) ?? ChatKind.Direct,
            groupName: wsChat.groupName ?? null,
            lastMessage,
            members,
          });
          return next;
        }

        if (chatId == null) return next;
        const existing = next.get(chatId);

        // Update last message
        if (event.lastMessage) {
          const msg = {
            id: event.lastMessage.id ?? null,
            userId: event.lastMessage.userId ?? null,
            textContent: event.lastMessage.textContent ?? null,
            timeSent: event.lastMessage.timeSent ? new Date(event.lastMessage.timeSent) : null,
            attachmentUrl: event.lastMessage.attachmentUrl ?? null,
          };
          if (existing) {
            next.set(chatId, { ...existing, lastMessage: msg });
          }
        }

        // Member updated (e.g. lastOpen change)
        if (event.member && existing) {
          const updatedUserId = event.member.userId!;
          const memberExists = existing.members.some((m) => m.userId === updatedUserId);
          if (memberExists) {
            const members = existing.members.map((m) =>
              m.userId === updatedUserId
                ? {
                    userId: updatedUserId,
                    username: event.member!.username ?? m.username,
                    firstName: event.member!.firstName ?? m.firstName,
                    lastName: event.member!.lastName ?? m.lastName,
                    nickname: event.member!.nickname ?? m.nickname,
                    lastOpen: event.member!.lastOpen ? new Date(event.member!.lastOpen) : m.lastOpen,
                  }
                : m,
            );
            next.set(chatId, { ...existing, members });
          }
        }

        // Member removed
        if (event.removedUserId != null && existing) {
          const members = existing.members.filter((m) => m.userId !== event.removedUserId);
          if (members.length === 0) {
            next.delete(chatId);
          } else {
            next.set(chatId, { ...existing, members });
          }
        }

        return next;
      });
    },
    [],
  );

  useSubscription(MyChatsDocument, {
    onData: ({ data: { data } }) => {
      if (!data?.myChats) return;
      setHasReceivedData(true);
      for (const event of data.myChats) {
        if (event) processEvent(event);
      }
    },
  });

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (!userId) return;

    createDirectChat({ variables: { userId: Number(userId) } })
      .then(({ data }) => {
        const chatId = data?.createDirectChat?.chat?.id;
        if (chatId) setSelectedChatId(chatId);
      })
      .catch((error) => {
        console.error("createDirectChat failed:", error);
      })
      .finally(() => {
        setSearchParams({}, { replace: true });
      });
  }, []);

  const chats = useMemo(() => {
    return [...chatsMap.values()]
      .filter((chat) => chat.members.length > 0)
      .sort((a, b) => {
        const aTime = a.lastMessage?.timeSent?.getTime() ?? 0;
        const bTime = b.lastMessage?.timeSent?.getTime() ?? 0;
        return bTime - aTime;
      });
  }, [chatsMap]);

  const hasChats = hasReceivedData && chats.length > 0;

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
              {strings.chat.pickAChat}
            </p>
          </div>
        )}
      </div>

      <aside
        className={`${
          selectedChatId ? "hidden lg:flex" : "flex"
        } flex-col w-full lg:w-[300px] xl:w-[340px] lg:flex-shrink-0 lg:border-l border-base-300 overflow-y-auto h-full`}
      >
        <PageHeader
          title={strings.chat.title}
          actions={
            <button
              type="button"
              onClick={() => setIsNewGroupOpen(true)}
              aria-label={strings.chat.newGroupAria}
              className="btn btn-sm btn-circle btn-ghost text-base-content/70 hover:text-primary"
            >
              <HiOutlinePencilSquare className="w-5 h-5" />
            </button>
          }
        />
        <div className="flex flex-col px-1 pt-2 pb-4">
          {!hasReceivedData ? (
            [...Array(8)].map((_, i) => (
              <ChatCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : hasChats ? (
            chats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                onSelect={setSelectedChatId}
                isActive={chat.id === selectedChatId}
              />
            ))
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-base-content/50">
                {strings.chat.noConversations}
              </p>
              <p className="text-xs text-base-content/35 mt-1">
                {strings.chat.findSomeoneToStart}
              </p>
            </div>
          )}
        </div>
      </aside>

      <CreateGroupChatModal
        isOpen={isNewGroupOpen}
        onClose={() => setIsNewGroupOpen(false)}
        onCreated={(chatId) => setSelectedChatId(chatId)}
      />
    </div>
  );
}

export default ChatPage;
