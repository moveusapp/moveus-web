import { Fragment, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { HiArrowLeft, HiUserGroup } from "react-icons/hi2";

import { useQuery, useSubscription } from "@apollo/client/react";
import UserAvatar from "@/components/user/UserAvatar";
import SendMessage from "@/pages/chat/SendMessage";
import {
  ChatKind,
  ChatMessagesDocument,
  GetChatDocument,
  LastOpenDocument,
  WsChatMessageType,
} from "@/graphql/graphql-types";
import { setDocumentTitle } from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";

const ensureDateObject = (value: any): Date => {
  if (value instanceof Date) return value;
  return new Date(value);
};

function ChatView({ chatId, onBack }: { chatId: number; onBack?: () => void }) {
  const { data, loading } = useQuery(GetChatDocument, {
    variables: { chatId },
  });

  const [messages, setMessages] = useState<WsChatMessageType[]>([]);
  const [lastOpens, setLastOpens] = useState<Map<number, Date>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = useMemo(() => data?.chat, [data]);

  const members = useMemo(() => {
    if (!chat?.members) return [];
    return chat.members.filter(Boolean);
  }, [chat]);

  const memberIds = useMemo(
    () => new Set(members.map((m) => m!.user.id)),
    [members],
  );

  const isGroup = chat?.kind === ChatKind.Group;

  // Set document title based on chat type and members
  useEffect(() => {
    if (!chat) return;
    if (isGroup) {
      if (chat.groupName) {
        setDocumentTitle(chat.groupName + " - Chat");
      } else {
        const names = members
          .slice(0, 3)
          .map((m) => m!.user.firstName || m!.user.username);
        const label =
          members.length > 3
            ? `${names.join(", ")} +${members.length - 3}`
            : names.join(", ");
        setDocumentTitle(label + " - Chat");
      }
    } else if (members.length > 0) {
      const m = members[0]!;
      setDocumentTitle(
        displayName(m.user.username, m.user.firstName, m.user.lastName) +
          " - Chat",
      );
    }
  }, [chat, members, isGroup]);

  const { data: messageSubData } = useSubscription(
    ChatMessagesDocument,
    {
      variables: { chatId: chat?.id! },
      skip: !chat?.id,
    },
  );

  const { data: lastOpenData } = useSubscription(
    LastOpenDocument,
    {
      variables: { chatId: chat?.id! },
      skip: !chat?.id,
    },
  );

  const addNewMessage = useCallback(
    (message: WsChatMessageType) => {
      setMessages((p) => [
        ...p,
        {
          ...message,
          timeSent: ensureDateObject(message.timeSent),
        },
      ]);
    },
    [setMessages],
  );

  useEffect(() => {
    if (Array.isArray(messageSubData?.chatMessages)) {
      setMessages((p) => [
        ...p.filter((m) => m.id !== null),
        ...(messageSubData!.chatMessages as any).map((msg: any) => ({
          ...msg,
          timeSent: ensureDateObject(msg.timeSent),
        })),
      ]);
    }
  }, [messageSubData, setMessages]);

  useEffect(() => {
    if (lastOpenData?.chatLastOpen) {
      setLastOpens((prev) => {
        const next = new Map(prev);
        for (const entry of lastOpenData.chatLastOpen!) {
          if (entry?.userId && memberIds.has(entry.userId)) {
            next.set(entry.userId, ensureDateObject(entry.lastOpen));
          }
        }
        return next;
      });
    }
  }, [lastOpenData, memberIds]);

  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    const behavior = hasScrolledRef.current ? "smooth" : "instant";
    messagesEndRef.current.scrollIntoView({ behavior });
    hasScrolledRef.current = true;
  }, [messages, loading]);

  // For 1-on-1 chats, check if the single member has read a message
  const hasBeenRead = (message: WsChatMessageType) => {
    if (isGroup) return false;
    const memberLastOpen = lastOpens.get(members[0]!.user.id!);
    if (!memberLastOpen) return false;
    return memberLastOpen.getTime() > message.timeSent!.getTime();
  };

  const getMemberForMessage = (userId: number) =>
    members.find((m) => m!.user.id === userId);

  const headerTitle = useMemo(() => {
    if (isGroup && chat?.groupName) return chat.groupName;
    if (members.length === 0) return "";
    if (!isGroup) {
      const m = members[0]!;
      return displayName(m.user.username, m.user.firstName, m.user.lastName);
    }
    const names = members
      .slice(0, 4)
      .map((m) =>
        displayName(m!.user.username, m!.user.firstName, m!.user.lastName),
      );
    return members.length > 4
      ? `${names.join(", ")} +${members.length - 4}`
      : names.join(", ");
  }, [members, isGroup, chat?.groupName]);

  const formatTime = (date: Date) =>
    `${prependZero(date.getHours())}:${prependZero(date.getMinutes())}`;

  let lastDate = new Date("1971-01-01");

  const messageElements = messages.map((message) => {
    const showDate =
      message.timeSent!.toDateString() !== lastDate.toDateString();
    lastDate = message.timeSent!;

    const isOtherUser = memberIds.has(message.userId!);
    const chatAlignment = isOtherUser ? "chat-start" : "chat-end";

    return (
      <Fragment key={message.id}>
        {showDate && (
          <div className="divider text-base-content/50 text-xs font-medium">
            {message.timeSent!.toDateString()}
          </div>
        )}
        <div className={`chat ${chatAlignment}`}>
          {isOtherUser && (
            <div className="chat-image">
              <UserAvatar
                userId={message.userId!}
                className="w-8 h-8 rounded-full"
              />
            </div>
          )}
          {isGroup && isOtherUser && (
            <div className="chat-header text-xs font-medium mb-0.5">
              {(() => {
                const m = getMemberForMessage(message.userId!);
                return m
                  ? displayName(
                      m.user.username,
                      m.user.firstName,
                      m.user.lastName,
                    )
                  : "";
              })()}
            </div>
          )}
          <div
            className={`chat-bubble wrap-break-word ${
              isOtherUser
                ? "bg-base-200 text-base-content"
                : "chat-bubble-primary"
            }`}
          >
            {message.textContent && <p>{message.textContent}</p>}
            {message.attachmentUrl && (
              <img
                src={message.attachmentUrl}
                alt=""
                className="rounded-xl max-w-xs mt-1"
              />
            )}
          </div>
          <div className="chat-footer text-xs text-base-content/40 mt-0.5">
            <span>{formatTime(message.timeSent!)}</span>
            {!isOtherUser &&
              (hasBeenRead(message) ? (
                <RiCheckDoubleLine className="inline ml-1 text-primary" />
              ) : (
                <RiCheckLine
                  className={`inline ml-1 ${
                    message.id === null ? "text-base-content/30" : ""
                  }`}
                />
              ))}
          </div>
        </div>
      </Fragment>
    );
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <nav className="flex-shrink-0 bg-base-200 border-b border-base-300 p-4">
        {members.length > 0 && (
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                className="btn btn-ghost btn-sm btn-circle lg:hidden"
                onClick={onBack}
              >
                <HiArrowLeft className="text-lg" />
              </button>
            )}
            {isGroup ? (
              <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                <HiUserGroup className="text-lg text-base-content/60" />
              </div>
            ) : (
              <UserAvatar
                userId={members[0]!.user.id!}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h2 className="font-semibold text-base leading-tight">
                {headerTitle}
              </h2>
              {isGroup && (
                <p className="text-xs text-base-content/50">
                  {members.length} members
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      {loading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="loading loading-dots text-primary" />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messageElements}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex-shrink-0 p-3">
            <SendMessage chatId={chat?.id!} addMessage={addNewMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatView;
