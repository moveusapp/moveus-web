import { Link, useNavigate } from "react-router-dom";
import { KeyboardEvent, MouseEvent, useCallback, useState } from "react";
import {
  PostCardFragment,
  LikePostDocument,
  UnlikePostDocument,
} from "@/graphql/graphql-types";
import { timeAgo } from "@/utils/time-utils";
import UserAvatar from "../user/UserAvatar";
import { displayName } from "@/utils/display-name";
import UserBadge from "../user/UserBadge";
import { HiOutlineHeart, HiHeart, HiOutlineChatBubbleLeft } from "react-icons/hi2";
import ImageLightbox from "@/components/ui/ImageLightbox";
import strings from "@/translations/strings";
import { useLikeToggle } from "@/hooks/use-like-toggle";

function PostCard({ post, hideEventLink, clickable = true }: PostCardProps) {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);

  const { liked, likeCount, toggle: handleLike } = useLikeToggle({
    variables: { postId: post.id! },
    initialLiked: post.isLiked ?? false,
    initialCount: post.likes ?? 0,
    likeDoc: LikePostDocument,
    unlikeDoc: UnlikePostDocument,
  });

  const organizerName = displayName(
    post.author!.username,
    post.author!.firstName,
    post.author!.lastName,
  );

  const imageUrl = post.imageUrl ?? null;

  const commentCount = post.comments?.length ?? 0;

  const navigable = clickable && post.id != null;

  const openPost = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      // Let nested links, buttons and form controls handle their own clicks.
      if ((e.target as HTMLElement).closest("a, button, input, textarea, label")) {
        return;
      }
      navigate(`/post/${post.id}`);
    },
    [navigate, post.id],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        if ((e.target as HTMLElement).closest("a, button, input, textarea, label")) {
          return;
        }
        e.preventDefault();
        navigate(`/post/${post.id}`);
      }
    },
    [navigate, post.id],
  );

  return (
    <>
      <article
        role={navigable ? "link" : undefined}
        tabIndex={navigable ? 0 : undefined}
        onClick={navigable ? openPost : undefined}
        onKeyDown={navigable ? handleKeyDown : undefined}
        className={`bg-base-200 w-full rounded-2xl border border-base-300 overflow-hidden transition-all hover:border-primary/20 ${
          navigable
            ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            : ""
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/user/${post?.author?.username}`}
              className="flex items-center gap-3 flex-1 min-w-0 group"
            >
              <UserAvatar
                imageUrl={post?.author?.avatarUrl}
                className="w-10 h-10 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors">
                    {organizerName}
                  </span>
                  <UserBadge badge={post?.author?.badge} size={16} />
                </div>
                <span className="text-xs text-base-content/70 truncate">
                  @{post?.author?.username}
                </span>
              </div>
            </Link>

            <span className="text-xs text-base-content/70 whitespace-nowrap flex-shrink-0">
              {timeAgo(post.timePosted)}
            </span>
          </div>

          {post.content && (
            <p className="text-sm text-base-content/80 leading-relaxed break-words">
              {post.content}
            </p>
          )}

          {imageUrl && (
            <button
              onClick={() => setShowImageModal(true)}
              className="block w-full rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={imageUrl}
                alt={strings.post.postImageAlt}
                onError={(e) =>
                  (e.currentTarget.parentElement!.style.display = "none")
                }
                className="w-full max-h-96 object-cover"
              />
            </button>
          )}

          {!hideEventLink && post.event && (
            <Link
              to={`/event/${post.event.id}`}
              className="flex items-center gap-2 text-xs text-primary hover:underline"
            >
              <span>{strings.formatString(strings.post.postedIn, { title: post.event.title ?? "" })}</span>
            </Link>
          )}

          {/* Action bar — comments live on the post page */}
          <div className="flex items-center gap-4 pt-3 border-t border-base-300">
            <button
              onClick={handleLike}
              aria-label={liked ? strings.post.unlike : strings.post.like}
              aria-pressed={liked}
              className="flex items-center gap-1.5 py-1 -my-1 text-sm text-base-content/70 hover:text-error transition-colors"
            >
              {liked ? (
                <HiHeart className="w-5 h-5 text-error" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-base-content/70">
              <HiOutlineChatBubbleLeft className="w-5 h-5" />
              {commentCount > 0 && <span>{commentCount}</span>}
            </span>
          </div>
        </div>
      </article>

      <ImageLightbox
        open={showImageModal}
        src={imageUrl}
        alt={strings.post.postImageAlt}
        onClose={() => setShowImageModal(false)}
      />
    </>
  );
}

interface PostCardProps {
  post: PostCardFragment;
  hideEventLink?: boolean;
  clickable?: boolean;
}

export default PostCard;
