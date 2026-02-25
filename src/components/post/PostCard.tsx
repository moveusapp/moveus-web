import { Link } from "react-router-dom";
import { useState } from "react";
import { PostCardFragment } from "@/graphql/graphql-types";
import { timeAgo } from "@/utils/time-utils";
import UserAvatar from "../user/UserAvatar";
import { displayName } from "@/utils/display-name";
import { HiCheckBadge, HiXMark } from "react-icons/hi2";

function PostCard({ post }: PostCardProps) {
  const [showImageModal, setShowImageModal] = useState(false);

  const organizerName = displayName(
    post.event!.organizer!.user.username,
    post.event!.organizer!.user.firstName,
    post.event!.organizer!.user.lastName,
  );

  const imageUrl = post.id
    ? `${import.meta.env.VITE_BUCKET_URL}/post-pictures/${post.id}`
    : null;

  return (
    <>
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

          {imageUrl && (
            <button
              onClick={() => setShowImageModal(true)}
              className="block w-full rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onError={(e) => (e.currentTarget.style.display = "none")}
            >
              <img
                src={imageUrl}
                alt={post.title}
                onError={(e) =>
                  (e.currentTarget.parentElement!.style.display = "none")
                }
                className="w-full max-h-96 object-cover"
              />
            </button>
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

      {/* Image Modal */}
      {showImageModal && imageUrl && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-4xl p-0 bg-transparent shadow-none flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/80 hover:bg-base-100"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            {/* Full image */}
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[95vh] object-contain"
            />
          </div>

          {/* Backdrop - click to close */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowImageModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

interface PostCardProps {
  post: PostCardFragment;
}

export default PostCard;
