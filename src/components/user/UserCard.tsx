import { UserCardFragment } from "@/graphql/graphql-types";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";
import Tag from "@/components/misc/Tag";
import { HiCheckBadge } from "react-icons/hi2";

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
      className="bg-base-200 w-full rounded-2xl border border-base-300 p-4 hover:border-primary/25 transition-all"
      to={`/user/${user?.id}`}
    >
      <div className="flex flex-row gap-2">
        <UserAvatar userId={user?.id!} className="w-12" />
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-1">
              <b>{name}</b>
              {user.verified && <HiCheckBadge className="text-primary" />}
            </div>
            <div className="flex flex-row gap-1">
              {tags?.map((tag) => (
                <Tag
                  key={`tag-${tag.text}`}
                  text={tag.text}
                  className={tag.className}
                />
              ))}
            </div>
          </div>
          <p className="text-base-content/70 text-sm">@{user.username}</p>
        </div>
      </div>
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
