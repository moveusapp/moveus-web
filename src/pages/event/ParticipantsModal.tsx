import { Link } from "react-router-dom";
import { HiXMark, HiOutlineUsers } from "react-icons/hi2";
import { HiCheckBadge } from "react-icons/hi2";
import { EventFragment, MemberRole } from "@/graphql/graphql-types";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventFragment;
}

const ROLE_ORDER: Record<string, number> = {
  [MemberRole.Organizer]: 0,
  [MemberRole.Moderator]: 1,
  [MemberRole.Participant]: 2,
  [MemberRole.Spectator]: 3,
};

function roleBadge(role: string | null | undefined) {
  switch (role) {
    case MemberRole.Organizer:
      return <span className="badge badge-sm badge-primary shrink-0">Host</span>;
    case MemberRole.Moderator:
      return <span className="badge badge-sm shrink-0">Moderator</span>;
    case MemberRole.Spectator:
      return <span className="badge badge-sm shrink-0">Spectator</span>;
    default:
      return null;
  }
}

function ParticipantsModal({ isOpen, onClose, event }: ParticipantsModalProps) {
  if (!isOpen) return null;

  const members = [...event.members].sort(
    (a, b) =>
      (ROLE_ORDER[a.role ?? ""] ?? 99) - (ROLE_ORDER[b.role ?? ""] ?? 99),
  );

  const count = members.length;
  const subtitle = event.maxParticipants
    ? `${count} of ${event.maxParticipants} spots filled`
    : `${count} ${count === 1 ? "person" : "people"}`;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box flex max-h-[85vh] max-w-md flex-col p-0">
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <h3 className="text-xl font-bold text-balance">Participants</h3>
            <p className="mt-0.5 text-sm text-base-content/60">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label="Close"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        {count === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 pb-8 pt-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
              <HiOutlineUsers className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium text-foreground">No one yet</p>
            <p className="text-sm text-base-content/60">
              Be the first to join and get this event moving.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1 overflow-y-auto px-4 pb-5 pt-1">
            {members.map((member) => {
              const name = displayName(
                member.user.username,
                member.user.firstName,
                member.user.lastName,
              );
              return (
                <li key={member.user.id}>
                  <Link
                    to={`/user/${member.user.username}`}
                    className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-base-200"
                  >
                    <UserAvatar
                      userId={member.user.id!}
                      className="h-10 w-10 shrink-0"
                    />
                    <span className="flex min-w-0 flex-1 items-center gap-1.5">
                      <span className="truncate text-sm font-semibold">
                        {name}
                      </span>
                      {member.user.verified && (
                        <HiCheckBadge className="h-4 w-4 shrink-0 text-primary" />
                      )}
                    </span>
                    {roleBadge(member.role)}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default ParticipantsModal;
