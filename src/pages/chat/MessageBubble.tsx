import { memo } from "react";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";
import { formatTime } from "@/utils/time-utils";
import type { LocalMessage } from "./use-chat-messages";

export type BubbleMember = {
  nickname?: string | null;
  user: {
    id?: number | null;
    username: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string | null;
  };
};

interface MessageBubbleProps {
  message: LocalMessage;
  isOwn: boolean;
  showAuthor: boolean;
  author: BubbleMember | null;
  hasBeenRead: boolean;
}

function MessageBubble({
  message,
  isOwn,
  showAuthor,
  author,
  hasBeenRead,
}: MessageBubbleProps) {
  const alignment = isOwn ? "chat-end" : "chat-start";
  const bubbleClass = isOwn
    ? "chat-bubble-primary"
    : "bg-base-200 text-base-content";
  const roundedClass = isOwn
    ? "rounded-tl-2xl! rounded-tr-2xl! rounded-bl-2xl!"
    : "rounded-tl-2xl! rounded-tr-2xl! rounded-br-2xl!";

  return (
    <div className={`chat ${alignment}`}>
      {!isOwn && (
        <div className="chat-image">
          <UserAvatar
            imageUrl={author?.user.profileImageUrl}
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      {showAuthor && author && (
        <div className="chat-header text-xs font-medium mb-0.5">
          {author.nickname ||
            displayName(
              author.user.username,
              author.user.firstName,
              author.user.lastName,
            )}
        </div>
      )}
      <div className={`chat-bubble wrap-break-word ${roundedClass} ${bubbleClass}`}>
        {message.textContent && <p>{message.textContent}</p>}
        {message.attachmentUrl && (
          <img
            src={message.attachmentUrl}
            alt=""
            className="rounded-xl max-w-xs mt-1"
          />
        )}
      </div>
      <div className="chat-footer text-xs text-base-content/40 mt-0.5 flex items-center gap-1">
        <span>{formatTime(message.timeSent)}</span>
        {isOwn && <StatusIcon message={message} hasBeenRead={hasBeenRead} />}
      </div>
    </div>
  );
}

function StatusIcon({
  message,
  hasBeenRead,
}: {
  message: LocalMessage;
  hasBeenRead: boolean;
}) {
  if (message.status === "sending") {
    return (
      <RiCheckLine
        aria-hidden
        className="inline text-base-content/30 transition-opacity duration-150"
      />
    );
  }
  if (hasBeenRead) {
    return (
      <RiCheckDoubleLine
        aria-hidden
        className="inline text-primary transition-opacity duration-150"
      />
    );
  }
  return (
    <RiCheckLine
      aria-hidden
      className="inline transition-opacity duration-150"
    />
  );
}

export default memo(MessageBubble);
