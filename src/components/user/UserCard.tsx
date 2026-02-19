import { UserCardFragment } from "@/graphql/graphql-types";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";

function UserCard({ user, tags, isSelf }: UserCardProps) {
  return (
    <Link
      className="user-card mb-3"
      to={isSelf ? "/profile" : `/user/${user!.id}`}
    >
      <UserAvatar
        canChange={false}
        userId={user.id!}
        className="inline-block"
      />
      <div className="inner">
        <div className="tags">
          {tags?.map((tag) => {
            return <p key={`tag-${tag.text}`}>{tag.text}</p>;
          })}
        </div>
        <h4>
          {displayName(user.username, user.firstName, user.lastName, isSelf)}
        </h4>
        <p className="username">@{user.username}</p>
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
  color?: string;
}

export default UserCard;
