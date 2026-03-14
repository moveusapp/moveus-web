import { Fragment, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";

import { useQuery, useSubscription } from "@apollo/client/react";
import UserAvatar from "@/components/user/UserAvatar";
import SendMessage from "@/pages/chat/SendMessage";
import {
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

function ChatView({ chatId }: { chatId: number }) {
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

  const isGroup = members.length > 1;

  // Set document title based on members
  useEffect(() => {
    if (members.length === 0) return;
    if (members.length === 1) {
      const m = members[0]!;
      setDocumentTitle(
        displayName(m.user.username, m.user.firstName, m.user.lastName) +
          " - Chat",
      );
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
  }, [members]);

  const { data: messageSubData, loading: messageSubLoading } = useSubscription(
    ChatMessagesDocument,
    {
      variables: { chatId: chat?.id! },
      skip: !chat?.id,
    },
  );

  const { data: lastOpenData, loading: lastOpenLoading } = useSubscription(
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // For 1-on-1 chats, check if the single member has read a message
  const hasBeenRead = (message: WsChatMessageType) => {
    if (isGroup) return false; // skip read receipts for group chats
    const memberLastOpen = lastOpens.get(members[0]!.user.id!);
    if (!memberLastOpen) return false;
    return memberLastOpen.getTime() > message.timeSent!.getTime();
  };

  const getMemberForMessage = (userId: number) =>
    members.find((m) => m!.user.id === userId);

  const headerTitle = useMemo(() => {
    if (members.length === 0) return "";
    if (members.length === 1) {
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
  }, [members]);

  let lastDate = new Date("1971-01-01");

  const messageElements = messages.map((message) => {
    const dateElement =
      message.timeSent!.toDateString() !== lastDate.toDateString() ? (
        <p
          className="self-center text-sm font-medium"
          key={message.id + "date"}
        >
          {message.timeSent!.toDateString()}
        </p>
      ) : (
        <></>
      );
    lastDate = message.timeSent!;

    const isOtherUser = memberIds.has(message.userId!);

    return (
      <Fragment key={message.id}>
        {dateElement}
        {isOtherUser ? (
          <div className="flex gap-4">
            <UserAvatar
              userId={message.userId!}
              className="w-10 h-10 rounded-full"
            />
            <div className="relative p-[10px] pr-12 font-medium bg-block max-w-[75%] wrap-break-word rounded-[15px]">
              {isGroup && (
                <p className="text-xs text-primary mb-1">
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
                </p>
              )}
              <p>{message.textContent}</p>
              <span className="text-xs absolute right-[10px] bottom-[10px]">
                {`${prependZero(message.timeSent!.getHours())}:${prependZero(message.timeSent!.getMinutes())}`}
              </span>
              {message.attachmentUrl && (
                <img
                  src={message.attachmentUrl}
                  alt={message.id! + ""}
                  className="rounded-[15px] mt-2"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="relative p-[10px] font-medium bg-secondary text-background pr-16 self-end max-w-[75%] wrap-break-word rounded-[15px]">
            <p>{message.textContent}</p>
            <span className="text-xs absolute right-[10px] bottom-[10px]">
              {`${prependZero(message.timeSent!.getHours())}:${prependZero(message.timeSent!.getMinutes())}`}
              {hasBeenRead(message) ? (
                <RiCheckDoubleLine className="inline ml-[2px]" />
              ) : (
                <RiCheckLine
                  className={
                    "inline ml-[2px] " +
                    (message.id === null && "text-foreground")
                  }
                />
              )}
            </span>
            {message.attachmentUrl && (
              <img
                src={message.attachmentUrl}
                alt={message.id! + ""}
                className="rounded-[15px] mt-2"
              />
            )}
          </div>
        )}
      </Fragment>
    );
  });

  return (
    <div className="h-full flex flex-col">
      <nav className="flex-shrink-0 p-4">
        {members.length > 0 && (
          <h2 className="text-center text-2xl">{headerTitle}</h2>
        )}
      </nav>

      {loading || messageSubLoading || lastOpenLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="loading loading-dots text-primary" />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-4">
            {messageElements}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex-shrink-0 p-4">
            <SendMessage chatId={chat?.id!} addMessage={addNewMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatView;
