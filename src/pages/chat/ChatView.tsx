import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HiArrowLeft,
  HiUserGroup,
  HiOutlineChatBubbleOvalLeftEllipsis,
} from "react-icons/hi2";
import { useQuery, useSubscription } from "@apollo/client/react";
import UserAvatar from "@/components/user/UserAvatar";
import SendMessageComposer from "@/pages/chat/SendMessageComposer";
import MessageBubble, { BubbleMember } from "@/pages/chat/MessageBubble";
import { useChatMessages } from "@/pages/chat/use-chat-messages";
import {
  ChatKind,
  GetChatDocument,
  LastOpenDocument,
} from "@/graphql/graphql-types";
import { setDocumentTitle } from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import { ensureDateObject } from "@/utils/time-utils";
import strings from "@/translations/strings";

const NEAR_BOTTOM_PX = 80;

function ChatView({ chatId, onBack }: { chatId: number; onBack?: () => void }) {
  const { profile } = useProfile();
  const { data, loading: chatLoading } = useQuery(GetChatDocument, {
    variables: { chatId },
  });

  const chat = data?.chat;
  const members = useMemo(
    () => (chat?.members ?? []).filter(Boolean) as BubbleMember[],
    [chat?.members],
  );
  const memberById = useMemo(() => {
    const map = new Map<number, BubbleMember>();
    for (const m of members) {
      if (m.user.id != null) map.set(m.user.id, m);
    }
    return map;
  }, [members]);
  const isGroup = chat?.kind === ChatKind.Group;
  const otherMember = useMemo(
    () =>
      isGroup
        ? null
        : members.find((m) => m.user.id !== profile?.id) ?? members[0] ?? null,
    [members, isGroup, profile?.id],
  );

  const { messages, send } = useChatMessages(chat?.id ?? undefined);

  const [lastOpens, setLastOpens] = useState<Map<number, Date>>(new Map());
  useSubscription(LastOpenDocument, {
    variables: { chatId: chat?.id ?? 0 },
    skip: !chat?.id,
    onData: ({ data: { data: payload } }) => {
      if (!payload?.chatLastOpen) return;
      setLastOpens((prev) => {
        const next = new Map(prev);
        for (const entry of payload.chatLastOpen!) {
          if (entry?.userId != null && memberById.has(entry.userId)) {
            next.set(entry.userId, ensureDateObject(entry.lastOpen));
          }
        }
        return next;
      });
    },
  });

  useEffect(() => {
    if (!chat) return;
    if (isGroup) {
      if (chat.groupName) {
        setDocumentTitle(`${chat.groupName}${strings.chat.chatTitleSuffix}`);
        return;
      }
      const names = members
        .slice(0, 3)
        .map((m) => m.user.firstName || m.user.username);
      const label =
        members.length > 3
          ? `${names.join(", ")} +${members.length - 3}`
          : names.join(", ");
      setDocumentTitle(`${label}${strings.chat.chatTitleSuffix}`);
      return;
    }
    if (otherMember) {
      const m = otherMember;
      setDocumentTitle(
        `${displayName(m.user.username, m.user.firstName, m.user.lastName)}${strings.chat.chatTitleSuffix}`,
      );
    }
  }, [chat, otherMember, isGroup]);

  const headerTitle = useMemo(() => {
    if (isGroup && chat?.groupName) return chat.groupName;
    if (members.length === 0) return "";
    if (!isGroup) {
      const m = otherMember ?? members[0];
      return displayName(m.user.username, m.user.firstName, m.user.lastName);
    }
    const names = members
      .slice(0, 4)
      .map((m) =>
        displayName(m.user.username, m.user.firstName, m.user.lastName),
      );
    return members.length > 4
      ? `${names.join(", ")} +${members.length - 4}`
      : names.join(", ");
  }, [members, otherMember, isGroup, chat?.groupName]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nearBottomRef = useRef(true);
  const previousTailKeyRef = useRef<string | null>(null);

  const tailKey = messages[messages.length - 1]?.clientKey ?? null;
  const tailUserId = messages[messages.length - 1]?.userId ?? null;

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    const end = messagesEndRef.current;
    if (!container || !end) return;

    const tailChanged = tailKey !== previousTailKeyRef.current;
    const ownJustSent =
      tailChanged && tailUserId !== null && tailUserId === profile?.id;
    const firstLoad = previousTailKeyRef.current === null;

    previousTailKeyRef.current = tailKey;

    if (!tailChanged && !firstLoad) return;
    if (firstLoad || ownJustSent || nearBottomRef.current) {
      end.scrollIntoView({ block: "end" });
    }
  }, [tailKey, tailUserId, profile?.id]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const distance =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      nearBottomRef.current = distance <= NEAR_BOTTOM_PX;
    };
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [chat?.id]);

  const hasBeenRead = (timeSent: Date): boolean => {
    if (isGroup) return false;
    if (!otherMember?.user.id) return false;
    const open = lastOpens.get(otherMember.user.id);
    return !!open && open.getTime() > timeSent.getTime();
  };

  let lastDateString = "";
  const messageElements = messages.map((message) => {
    const dateString = message.timeSent.toDateString();
    const showDate = dateString !== lastDateString;
    lastDateString = dateString;

    const isOwn = message.userId === profile?.id;
    const author = !isOwn ? memberById.get(message.userId) ?? null : null;

    return (
      <Fragment key={message.clientKey}>
        {showDate && (
          <div className="divider text-base-content/50 text-xs font-medium">
            {dateString}
          </div>
        )}
        <MessageBubble
          message={message}
          isOwn={isOwn}
          showAuthor={isGroup && !isOwn}
          author={author}
          hasBeenRead={isOwn ? hasBeenRead(message.timeSent) : false}
        />
      </Fragment>
    );
  });

  const showEmptyState =
    !chatLoading && messages.length === 0 && chat?.lastMessage == null;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <nav className="flex-shrink-0 bg-base-200 border-b border-base-300 p-4">
        {members.length > 0 && (
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                className="btn btn-ghost btn-sm btn-circle lg:hidden"
                onClick={onBack}
                aria-label={strings.common.back}
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
                userId={(otherMember ?? members[0]).user.id!}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <h2 className="font-semibold text-base leading-tight">
                {headerTitle}
              </h2>
              {isGroup && (
                <p className="text-xs text-base-content/50">
                  {strings.formatString(strings.chat.members, {
                    count: members.length,
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      {chatLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="loading loading-dots text-primary" />
        </div>
      ) : (
        <>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2"
          >
            {showEmptyState ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6 py-10 text-base-content/40">
                <HiOutlineChatBubbleOvalLeftEllipsis className="text-5xl" />
                <p className="text-base font-medium text-base-content/60">
                  {isGroup
                    ? strings.chat.emptyChatHeadingGroup
                    : strings.formatString(strings.chat.emptyChatHeading1on1, {
                        name:
                          otherMember?.user.firstName ||
                          otherMember?.user.username ||
                          "",
                      })}
                </p>
                <p className="text-sm text-base-content/40 max-w-xs leading-snug">
                  {isGroup
                    ? strings.chat.emptyChatSubtitleGroup
                    : strings.chat.emptyChatSubtitle1on1}
                </p>
              </div>
            ) : (
              messageElements
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex-shrink-0 p-3">
            <SendMessageComposer onSend={send} />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatView;
