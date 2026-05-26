import { useState } from "react";
import UserAvatar from "@/components/user/UserAvatar";
import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { ChatKind } from "@/graphql/graphql-types";
import { timeAgo } from "@/utils/time-utils";
import { displayName } from "@/utils/display-name";
import { RiCheckDoubleLine, RiCheckLine, RiGroupLine } from "react-icons/ri";
import strings from "@/translations/strings";

function StackedAvatar({ userId, className }: { userId: number; className: string }) {
  const [src, setSrc] = useState(
    `${import.meta.env.VITE_BUCKET_URL}/profile-pictures/${userId}`,
  );
  return (
    <div className={`avatar absolute ${className}`}>
      <div className="rounded-full ring-2 ring-base-100 bg-base-100">
        <img
          src={src}
          alt={strings.user.avatarAlt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setSrc(defaultAvatar)}
        />
      </div>
    </div>
  );
}

export interface ChatSummaryMember {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  nickname: string;
  lastOpen: Date | null;
}

function memberName(m: ChatSummaryMember): string {
  return m.nickname || displayName(m.username, m.firstName, m.lastName);
}

export interface ChatSummary {
  id: number;
  kind: ChatKind;
  groupName: string | null;
  lastMessage: {
    id: number | null;
    userId: number | null;
    textContent: string | null;
    timeSent: Date | null;
    attachmentUrl: string | null;
  } | null;
  members: ChatSummaryMember[];
}

function ChatCard({ chat, onSelect, isActive }: ChatCardProps) {
  const members = chat.members;
  const hasMessages = !!chat.lastMessage;
  const isGroup = chat.kind === ChatKind.Group;

  const chatName = () => {
    if (!isGroup) {
      return members.length > 0 ? memberName(members[0]) : strings.chat.emptyChat;
    }
    if (chat.groupName) return chat.groupName;
    const names = members.slice(0, 3).map(memberName);
    return members.length > 3
      ? `${names.join(", ")} +${members.length - 3}`
      : names.join(", ");
  };

  const readReceipt = () => {
    if (!hasMessages || isGroup) return null;
    const member = members[0];
    if (chat.lastMessage!.userId === member.userId) return null;
    const sent = chat.lastMessage!.timeSent?.getTime() ?? 0;
    const opened = (member.lastOpen ?? new Date("1971-01-01")).getTime();
    return sent > opened ? (
      <RiCheckLine className="text-sm shrink-0 text-base-content/40" />
    ) : (
      <RiCheckDoubleLine className="text-sm shrink-0 text-primary" />
    );
  };

  const preview = () => {
    if (!hasMessages) {
      return <span className="italic text-base-content/40">{strings.chat.sayHello}</span>;
    }
    if (chat.lastMessage!.textContent) {
      return chat.lastMessage!.textContent;
    }
    return <span className="italic">{strings.chat.sentAttachment}</span>;
  };

  const avatar = () => {
    if (isGroup) {
      const stack = members.slice(0, 2);
      if (stack.length === 2) {
        return (
          <div className="relative w-10 h-10 shrink-0">
            <StackedAvatar
              userId={stack[0].userId}
              className="w-7 h-7 top-0 left-0"
            />
            <StackedAvatar
              userId={stack[1].userId}
              className="w-7 h-7 bottom-0 right-0"
            />
          </div>
        );
      }
      if (stack.length === 1) {
        return (
          <UserAvatar
            userId={stack[0].userId}
            className="w-10 h-10 shrink-0"
          />
        );
      }
      return (
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
          <RiGroupLine className="text-lg text-primary" />
        </div>
      );
    }
    if (members.length > 0) {
      return (
        <UserAvatar
          userId={members[0].userId}
          className="w-10 h-10 shrink-0"
        />
      );
    }
    return (
      <div className="w-10 h-10 shrink-0 rounded-full bg-base-300 flex items-center justify-center">
        <RiGroupLine className="text-lg text-base-content/40" />
      </div>
    );
  };

  return (
    <button
      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
        isActive ? "bg-primary/10" : "hover:bg-base-200"
      }`}
      onClick={() => onSelect?.(chat.id)}
    >
      {avatar()}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-semibold text-sm truncate">{chatName()}</p>
          {hasMessages && chat.lastMessage!.timeSent && (
            <span className="text-[11px] text-base-content/50 shrink-0">
              {timeAgo(chat.lastMessage!.timeSent)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-base-content/60 mt-0.5">
          {readReceipt()}
          <p className="truncate">{preview()}</p>
        </div>
      </div>
    </button>
  );
}

interface ChatCardProps {
  chat: ChatSummary;
  onSelect?: (chatId: number) => void;
  isActive?: boolean;
}

export default ChatCard;
