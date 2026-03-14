import UserAvatar from "@/components/user/UserAvatar";
import { ChatFragment } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { RiCheckDoubleLine, RiCheckLine, RiGroupLine } from "react-icons/ri";

function ChatCard({ chat, onSelect, isActive }: ChatCardProps) {
  const members = chat.members.filter(Boolean);
  const hasMessages = !!chat?.lastMessage;
  const isGroup = members.length > 1;

  const chatName = () => {
    if (members.length === 0) return "Empty chat";
    if (members.length === 1) {
      const m = members[0]!;
      return displayName(m.user.username!, m.user.firstName!, m.user.lastName!);
    }
    const names = members
      .slice(0, 3)
      .map((m) => m!.user.firstName || m!.user.username);
    return members.length > 3
      ? `${names.join(", ")} +${members.length - 3}`
      : names.join(", ");
  };

  const readReceipt = () => {
    if (!hasMessages || isGroup) return null;
    const member = members[0]!;
    if (chat.lastMessage!.user.id === member.user.id) return null;
    const sent = chat.lastMessage!.timeSent.getTime();
    const opened = (member.lastOpen ?? new Date("1971-01-01")).getTime();
    return sent > opened ? (
      <RiCheckLine className="text-sm shrink-0 text-base-content/40" />
    ) : (
      <RiCheckDoubleLine className="text-sm shrink-0 text-primary" />
    );
  };

  const preview = () => {
    if (!hasMessages) {
      return <span className="italic text-base-content/40">Say hello!</span>;
    }
    if (chat.lastMessage!.textContent) {
      return chat.lastMessage!.textContent;
    }
    return <span className="italic">Sent an attachment</span>;
  };

  const avatar = () => {
    if (isGroup) {
      return (
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
          <RiGroupLine className="text-lg text-primary" />
        </div>
      );
    }
    if (members.length === 1) {
      return (
        <UserAvatar
          userId={members[0]!.user.id!}
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
      onClick={() => onSelect?.(chat.id!)}
    >
      {avatar()}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-semibold text-sm truncate">{chatName()}</p>
          {hasMessages && (
            <span className="text-[11px] text-base-content/50 shrink-0">
              {timeAgo(chat.lastMessage!.timeSent!)}
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
  chat: ChatFragment;
  onSelect?: (chatId: number) => void;
  isActive?: boolean;
}

export default ChatCard;
