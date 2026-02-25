import { Link } from "react-router-dom";
import { PostCardFragment } from "@/graphql/graphql-types";
import { timeAgo } from "@/utils/time-utils";
import UserAvatar from "../user/UserAvatar";
import { displayName } from "@/utils/display-name";
import { HiCheckBadge } from "react-icons/hi2";

function PostCard({ post }: PostCardProps) {
  const organizerName = displayName(
    post.event!.organizer!.user.username,
    post.event!.organizer!.user.firstName,
    post.event!.organizer!.user.lastName,
  );

  return (
    <article className="bg-base-200 w-full rounded-2xl border border-base-300 overflow-hidden hover:border-primary/20 transition-all">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/user/${post.event?.organizer?.user.username}`}
            className="flex items-center gap-3 flex-1 min-w-0 group"
          >
            <UserAvatar
              userId={post.event?.organizer?.user.id!}
              className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors">
                  {organizerName}
                </span>
                {post.event?.organizer?.user.verified && (
                  <HiCheckBadge className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <span className="text-xs text-base-content/60 truncate">
                @{post.event?.organizer?.user?.username}
              </span>
            </div>
          </Link>

          <span className="text-xs text-base-content/60 whitespace-nowrap flex-shrink-0">
            {timeAgo(post.timePosted)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-base-content leading-snug">
          {post.title}
        </h3>
        
        {post.content && (
          <p className="text-sm text-base-content/80 leading-relaxed">
            {post.content}
          </p>
        )}

        {post.id && (
          <img
            src={`${import.meta.env.VITE_BUCKET_URL}/post-pictures/${post.id}`}
            alt={post.title}
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="w-full rounded-xl object-contain"
          />
        )}

        {post.event && (
          <Link
            to={`/event/${post.event.id}`}
            className="flex items-center gap-2 text-xs text-primary hover:underline"
          >
            <span>Posted in: {post.event.title}</span>
          </Link>
        )}
      </div>
    </article>
  );
}

interface PostCardProps {
  post: PostCardFragment;
}

export default PostCard;