import UserAvatar from "@/components/user/UserAvatar";
import { ChatFragment } from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function ChatCard({ chat }: ChatCardProps) {
  return (
    <Link
      className="p-6 rounded-[15px] relative bg-block block w-full box-border"
      to={`/chat/${chat?.members[0]!.user.id}`}
    >
      <span className="absolute top-6 right-6 text-[10px] font-medium">
        {!chat ? "" : timeAgo(chat?.lastMessage?.timeSent!)}
      </span>
      <div className="flex gap-4 font-medium relative items-center">
        <UserAvatar
          canChange={false}
          userId={chat?.members[0]!.user.id!}
          className="w-10 h-10 rounded-full"
        />
        <div className="max-w-[55%] overflow-hidden">
          <h5>
            {displayName(
              chat?.members[0]!.user.username!,
              chat?.members[0]!.user.firstName!,
              chat?.members[0]!.user.lastName!,
            )}
          </h5>
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
