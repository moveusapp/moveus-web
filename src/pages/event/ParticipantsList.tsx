import { Link } from "react-router-dom";
import { EventFragment, MemberRole } from "@/graphql/graphql-types";
import { HiCheckBadge } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";
import strings from "@/translations/strings";

const ROLE_ORDER: Record<MemberRole, number> = {
  [MemberRole.Organizer]: 0,
  [MemberRole.Moderator]: 1,
  [MemberRole.Participant]: 2,
  [MemberRole.Spectator]: 3,
};

function roleBadge(role: MemberRole | null | undefined) {
  switch (role) {
    case MemberRole.Organizer:
      return <span className="badge badge-sm badge-primary shrink-0">{strings.event.page.roleHost}</span>;
    case MemberRole.Moderator:
      return <span className="badge badge-sm shrink-0">{strings.event.page.roleModerator}</span>;
    case MemberRole.Spectator:
      return <span className="badge badge-sm shrink-0">{strings.event.page.roleSpectator}</span>;
    default:
      return null;
  }
}

function ParticipantsList({ event }: ParticipantsListProps) {
  const members = [...event.members].sort(
    (a, b) =>
      (a.role ? ROLE_ORDER[a.role] : 99) - (b.role ? ROLE_ORDER[b.role] : 99),
  );

  const count = members.length;

  if (count === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 pb-8 pt-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
          <HiOutlineUsers className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium text-foreground">{strings.event.page.noOneYet}</p>
        <p className="text-sm text-base-content/60">
          {strings.event.page.beFirstToJoin}
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
                  imageUrl={member.user.profileImageUrl}
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
