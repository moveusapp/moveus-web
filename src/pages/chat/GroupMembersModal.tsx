import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import strings from "@/translations/strings";
import type { BubbleMember } from "@/pages/chat/MessageBubble";

interface GroupMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string | null;
  members: BubbleMember[];
}

function GroupMembersModal({
  isOpen,
  onClose,
  groupName,
  members,
}: GroupMembersModalProps) {
  const { dialogRef } = useHtmlDialog(isOpen);
  const { profile } = useProfile();

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.chat.membersTitle}
    >
      <div className="modal-box max-w-md p-0 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-base-content/8">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold leading-tight truncate">
              {groupName || strings.chat.membersTitle}
            </h3>
            <p className="text-xs text-base-content/55 mt-0.5">
              {strings.formatString(strings.chat.members, {
                count: members.length,
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label={strings.common.close}
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex-1 min-h-0 overflow-y-auto px-3 py-2">
          {members.map((m) => {
            const isSelf = m.user.id != null && m.user.id === profile?.id;
            const baseName =
              m.nickname ||
              displayName(m.user.username, m.user.firstName, m.user.lastName);
            const name = `${baseName}${isSelf ? " (You)" : ""}`;
            const row = (
              <div className="w-full flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-base-200 transition-colors">
                <UserAvatar imageUrl={m.user.avatarUrl} className="w-10 h-10 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <p className="font-semibold text-sm truncate">{name}</p>
                    <UserBadge badge={m.user.badge} />
                  </div>
                  <p className="text-xs text-base-content/55 truncate">
                    @{m.user.username}
                  </p>
                </div>
              </div>
            );
            return (
              <li key={m.user.id}>
                {isSelf || m.user.id == null ? (
                  row
                ) : (
                  <Link
                    to={`/user/${m.user.username}`}
                    onClick={onClose}
                    className="block"
                  >
                    {row}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default GroupMembersModal;
