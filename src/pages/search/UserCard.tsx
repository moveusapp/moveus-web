import { UserCardFragment } from "@/graphql/graphql-types";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";
import UserBadge from "@/components/user/UserBadge";

function UserCard({ user, tags, isSelf }: UserCardProps) {
  const name = displayName(
    user.username!,
    user.firstName,
    user.lastName,
    isSelf,
  );

  return (
    <Link
      key={user.id}
      to={`/user/${user?.username}`}
      className="group flex items-center gap-3 px-4 sm:px-5 py-4 transition-colors hover:bg-base-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50"
    >
      <UserAvatar imageUrl={user.avatarUrl} className="w-10 h-10 shrink-0" />
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors">
            {name}
          </span>
          <UserBadge badge={user.badge} size={16} />
        </div>
        <span className="text-xs text-base-content/70 truncate">
          @{user.username}
        </span>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-1 shrink-0">
          {tags.map((tag) => (
            <span key={`tag-${tag.text}`} className={`badge ${tag.className ?? ""}`}>
              {tag.text}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

interface UserCardProps {
  user: UserCardFragment;
  tags?: UserCardTag[];
  isSelf?: boolean;
}

interface UserCardTag {
  text: string;
  className?: string;
}

export default UserCard;
