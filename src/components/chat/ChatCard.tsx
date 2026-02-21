import UserAvatar from "@/components/user/UserAvatar";
import { ChatFragment } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function ChatCard({ chat }: ChatCardProps) {
  return (
    <Link
      className="bg-base-200 rounded-2xl border border-base-300 p-4 hover:border-primary/25 transition-all"
      to={`/chat/${chat?.members[0]!.user.id}`}
    >
      <div className="flex gap-4 font-medium relative items-center">
        <UserAvatar
          userId={chat?.members[0]!.user.id!}
          className="w-12"
        />
        <div className="w-full overflow-hidden">
          <div className="flex flex-row justify-between">
            <p>
              {displayName(
                chat?.members[0]!.user.username!,
                chat?.members[0]!.user.firstName!,
                chat?.members[0]!.user.lastName!,
              )}
            </p>
          <span className="text-xs text-base-content/70">
            {!chat ? "" : timeAgo(chat?.lastMessage?.timeSent!)}
          </span>
          </div>
          <p className="text-xs">
            {chat?.lastMessage?.user.id !== chat?.members[0]!.user.id &&
              (chat!.lastMessage!.timeSent.getTime() >
              (
                chat?.members[0]!.lastOpen ?? new Date("1971-01-01")
              ).getTime() ? (
                <RiCheckLine className={"text-lg inline mr-1"} />
              ) : (
                <RiCheckDoubleLine className="text-lg inline mr-1" />
              ))}
            {chat?.lastMessage?.textContent ? (
              chat?.lastMessage?.textContent
            ) : (
              <i>'attachment'</i>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface ChatCardProps {
  chat: ChatFragment;
}

export default ChatCard;
