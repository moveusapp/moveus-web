import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import SendMessage from "@/pages/chat/SendMessage";
import { LOADER_COLOR } from "@/constants";
import {
  ChatMessagesDocument,
  GetUserChatDocument,
  LastOpenDocument,
  WsChatMessageType,
} from "@/graphql/graphql-types";
import { setDocumentTitle } from "@/hooks/use-document-title";
import { displayName } from "@/utils/display-name";
import { prependZero } from "@/utils/time-utils";
import { useQuery, useSubscription } from "@apollo/client/react";

function ChatPage() {
  const { userId } = useParams();
  const { data, loading } = useQuery(GetUserChatDocument, {
    variables: { userId: parseInt(userId!) },
    skip: !userId,
  });

  const [messages, setMessages] = useState<WsChatMessageType[]>([]);
  const [lastOpen, setLastOpen] = useState(new Date("1971-01-01"));

  const chat = useMemo(() => {
    return data?.userChat;
  }, [data]);

  const member = useMemo(() => {
    if (chat?.members) {
      const member = chat.members[0];
      setDocumentTitle(
        displayName(
          member?.user.username!,
          member?.user.firstName!,
          member?.user.lastName!,
        ) + " - Chat",
      );
      return member;
    }
  }, [chat]);

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
      setMessages((p) => [...p, message]);
    },
    [setMessages],
  );

  useEffect(() => {
    if (Array.isArray(messageSubData?.chatMessages)) {
      setMessages((p) => [
        ...p.filter((m) => m.id !== null),
        ...(messageSubData!.chatMessages as any),
      ]);
    }
  }, [messageSubData, setMessages]);

  useEffect(() => {
    if (
      lastOpenData?.chatLastOpen &&
      lastOpenData.chatLastOpen[0]?.userId === member?.user.id
    ) {
      setLastOpen(lastOpenData.chatLastOpen[0]?.lastOpen!);
    }
  }, [lastOpenData, setLastOpen, member]);

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
    return (
      <Fragment key={message.id}>
        {dateElement}
        {message.userId === member?.user.id ? (
          <div className="flex gap-4">
            <UserAvatar
              userId={message.userId!}
              className="w-10 h-10 rounded-full"
            />
            <div className="relative p-[10px] pr-12 font-medium bg-block max-w-[75%] wrap-break-word rounded-[15px]">
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
              {lastOpen.getTime() > message.timeSent!.getTime() ? (
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
        {member && (
          <h2 className="text-center text-2xl">
            {displayName(
              member.user.username,
              member.user.firstName,
              member.user.lastName,
            )}
          </h2>
        )}
      </nav>

      {loading || messageSubLoading || lastOpenLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="loading loading-dots text-primary"/>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-4">
            {messageElements}
          </div>
          <div className="flex-shrink-0 p-4">
            <SendMessage chatId={chat?.id!} addMessage={addNewMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPage;
