import { memo } from "react";
import { ChatMessageKind } from "@/graphql/graphql-types";
import { systemMessageLabel } from "@/pages/chat/system-message-label";
import type { LocalMessage } from "./use-chat-messages";
import type { BubbleMember } from "./MessageBubble";
import { displayName } from "@/utils/display-name";

interface SystemMessageProps {
  message: LocalMessage;
  actor: BubbleMember | null;
  target: BubbleMember | null;
  myId: number | null;
}

function realName(m: BubbleMember | null): string | null {
  if (!m) return null;
  return displayName(m.user.username, m.user.firstName, m.user.lastName);
}

function nicknameOrReal(m: BubbleMember | null): string | null {
  if (!m) return null;
  return m.nickname || realName(m);
}

function SystemMessage({ message, actor, target, myId }: SystemMessageProps) {
  // Nickname-change rows reference the user by their *previous* identity;
  // using the current (just-changed) nickname yields tautologies like
  // "Champ changed their nickname to Champ". Use real display name there.
  const isNicknameChange = message.kind === ChatMessageKind.NicknameChanged;
  const label = systemMessageLabel({
    kind: message.kind,
    actorId: message.userId,
    targetId: message.targetUserId,
    myId,
    actorName: isNicknameChange ? realName(actor) : nicknameOrReal(actor),
    targetName: nicknameOrReal(target),
    newNickname: message.textContent,
  });

  if (!label) return null;

  return (
    <div className="flex justify-center my-1.5">
      <span className="text-xs text-base-content/55 px-3 py-1 rounded-full">
        {label}
      </span>
    </div>
  );
}

export default memo(SystemMessage);
