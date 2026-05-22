import { Link } from "react-router-dom";
import { EventFragment, MemberRole } from "@/graphql/graphql-types";
import { HiCheckBadge } from "react-icons/hi2";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";

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

function ParticipantsList({ event }: ParticipantsListProps) {
  const members = [...event.members].sort(
    (a, b) =>
      (ROLE_ORDER[a.role ?? ""] ?? 99) - (ROLE_ORDER[b.role ?? ""] ?? 99),
  );

  const count = members.length;

  if (count === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 pb-8 pt-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
          <HiOutlineUsers className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium text-foreground">No one yet</p>
        <p className="text-sm text-base-content/60">
          Be the first to join and get this event moving.
        </p>
      </div>
    );
  } else {
    return (
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
    );
  }
}

interface ParticipantsListProps {
  event: EventFragment;
}

export default ParticipantsList;
