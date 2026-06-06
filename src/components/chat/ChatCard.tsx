import { useState } from "react";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { ChatKind, ChatMessageKind, UserBadge as UserBadgeType } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import { timeAgo } from "@/utils/time-utils";
import { displayName } from "@/utils/display-name";
import { RiCheckDoubleLine, RiCheckLine, RiGroupLine } from "react-icons/ri";
import strings from "@/translations/strings";
import { systemMessageLabel } from "@/pages/chat/system-message-label";

function StackedAvatar({
  imageUrl,
  className,
}: {
  imageUrl?: string | null;
  className: string;
}) {
  const [src, setSrc] = useState(imageUrl || defaultAvatar);
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
  avatarUrl?: string | null;
  badge?: UserBadgeType | null;
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
    kind: ChatMessageKind;
    targetUserId: number | null;
    textContent: string | null;
    timeSent: Date | null;
    attachmentUrl: string | null;
  } | null;
  members: ChatSummaryMember[];
}

function ChatCard({ chat, onSelect, isActive }: ChatCardProps) {
  const { profile } = useProfile();
  const myId = profile?.id ?? null;
  const others = chat.members.filter((m) => m.userId !== myId);
  const hasMessages = !!chat.lastMessage;
  const isGroup = chat.kind === ChatKind.Group;

  const chatName = () => {
    if (!isGroup) {
      return others.length > 0 ? memberName(others[0]) : strings.chat.emptyChat;
    }
    if (chat.groupName) return chat.groupName;
    const names = others.slice(0, 3).map(memberName);
    return others.length > 3
      ? `${names.join(", ")} +${others.length - 3}`
      : names.join(", ");
  };

  const isSystemLast =
    hasMessages && chat.lastMessage!.kind !== ChatMessageKind.Text;

  const readReceipt = () => {
    if (!hasMessages || isGroup || isSystemLast) return null;
    const other = others[0];
    if (!other) return null;
    if (chat.lastMessage!.userId === other.userId) return null;
    const sent = chat.lastMessage!.timeSent?.getTime() ?? 0;
    const opened = (other.lastOpen ?? new Date("1971-01-01")).getTime();
    return sent > opened ? (
      <RiCheckLine className="text-sm shrink-0 text-base-content/40" />
    ) : (
      <RiCheckDoubleLine className="text-sm shrink-0 text-primary" />
    );
  };

  const memberLookup = (id: number | null): string | null => {
    if (id == null) return null;
    const m = chat.members.find((x) => x.userId === id);
    return m ? memberName(m) : null;
  };
  const realLookup = (id: number | null): string | null => {
    if (id == null) return null;
    const m = chat.members.find((x) => x.userId === id);
    return m ? displayName(m.username, m.firstName, m.lastName) : null;
  };

  const preview = () => {
    if (!hasMessages) {
      return <span className="italic text-base-content/40">{strings.chat.sayHello}</span>;
    }
    const lm = chat.lastMessage!;
    if (lm.kind !== ChatMessageKind.Text) {
      const isNicknameChange = lm.kind === ChatMessageKind.NicknameChanged;
      const label = systemMessageLabel({
        kind: lm.kind,
        actorId: lm.userId ?? 0,
        targetId: lm.targetUserId,
        myId,
        actorName: isNicknameChange
          ? realLookup(lm.userId)
          : memberLookup(lm.userId),
        targetName: memberLookup(lm.targetUserId),
        newNickname: lm.textContent,
      });
      return <span className="italic">{label}</span>;
    }
    if (lm.attachmentUrl) {
      return <span className="italic">{strings.chat.sentAttachment}</span>;
    }
    if (lm.textContent) {
      return lm.textContent;
    }
    return null;
  };

  const avatar = () => {
    if (isGroup) {
      const stack = others.slice(0, 2);
      if (stack.length === 2) {
        return (
          <div className="relative w-10 h-10 shrink-0">
            <StackedAvatar
              imageUrl={stack[0].avatarUrl}
              className="w-7 h-7 top-0 left-0"
            />
            <StackedAvatar
              imageUrl={stack[1].avatarUrl}
              className="w-7 h-7 bottom-0 right-0"
            />
          </div>
        );
      }
      if (stack.length === 1) {
        return (
          <UserAvatar
            imageUrl={stack[0].avatarUrl}
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
    if (others.length > 0) {
      return (
        <UserAvatar
          imageUrl={others[0].avatarUrl}
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <p className="font-semibold text-sm truncate">{chatName()}</p>
            {!isGroup && <UserBadge badge={others[0]?.badge} />}
          </div>
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
