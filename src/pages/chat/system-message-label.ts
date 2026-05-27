import { ChatMessageKind } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

export interface SystemActor {
  id: number;
  name: string;
}

export function systemMessageLabel(args: {
  kind: ChatMessageKind;
  actorId: number;
  targetId: number | null;
  myId: number | null;
  actorName: string | null;
  targetName: string | null;
  newNickname: string | null;
}): string {
  const {
    kind,
    actorId,
    targetId,
    myId,
    actorName,
    targetName,
    newNickname,
  } = args;
  const sys = strings.chat.system;
  const actor = actorName || sys.unknownActor;
  const target = targetName || sys.unknownActor;
  const nickname = newNickname || "";
  const actorIsMe = myId != null && actorId === myId;
  const targetIsMe = myId != null && targetId === myId;

  switch (kind) {
    case ChatMessageKind.NicknameChanged:
      return actorIsMe
        ? (strings.formatString(sys.nicknameChangedSelf, { nickname }) as string)
        : (strings.formatString(sys.nicknameChangedOther, {
            actor,
            nickname,
          }) as string);

    case ChatMessageKind.MemberAdded:
      if (actorIsMe) {
        return strings.formatString(sys.memberAddedSelf, { target }) as string;
      }
      if (targetIsMe) {
        return strings.formatString(sys.memberAddedYouAsTarget, {
          actor,
        }) as string;
      }
      return strings.formatString(sys.memberAddedOther, {
        actor,
        target,
      }) as string;

    case ChatMessageKind.MemberRemoved:
      if (actorIsMe) {
        return sys.memberRemovedSelf;
      }
      if (targetId != null && targetId !== actorId) {
        return strings.formatString(sys.memberRemovedTarget, {
          actor,
          target,
        }) as string;
      }
      return strings.formatString(sys.memberRemovedOther, { actor }) as string;

    case ChatMessageKind.Text:
    default:
      return "";
  }
}
