import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  PostCardFragment,
  LikePostDocument,
  UnlikePostDocument,
} from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import { timeAgo } from "@/utils/time-utils";
import UserAvatar from "../user/UserAvatar";
import { displayName } from "@/utils/display-name";
import { HiCheckBadge, HiXMark } from "react-icons/hi2";
import { HiOutlineHeart, HiHeart, HiOutlineChatBubbleLeft } from "react-icons/hi2";
import CommentSection from "@/components/comment/CommentSection";

function PostCard({ post, hideEventLink }: PostCardProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes ?? 0);

  const [likePost] = useMutation(LikePostDocument);
  const [unlikePost] = useMutation(UnlikePostDocument);

  const organizerName = displayName(
    post.author!.username,
    post.author!.firstName,
    post.author!.lastName,
  );

  const imageUrl = post.id
    ? `${import.meta.env.VITE_BUCKET_URL}/post-pictures/${post.id}`
    : null;

  const commentCount = post.comments?.length ?? 0;

  const handleLike = useCallback(() => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
      unlikePost({ variables: { postId: post.id! } }).catch(() => {
        setLiked(true);
        setLikeCount((c) => c + 1);
      });
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      likePost({ variables: { postId: post.id! } }).catch(() => {
        setLiked(false);
        setLikeCount((c) => c - 1);
      });
    }
  }, [liked, post.id, likePost, unlikePost]);

  return (
    <>
      <article className="bg-base-200 w-full rounded-2xl border border-base-300 overflow-hidden hover:border-primary/20 transition-all">
        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/user/${post?.author?.username}`}
              className="flex items-center gap-3 flex-1 min-w-0 group"
            >
              <UserAvatar
                userId={post?.author?.id!}
                className="w-10 h-10 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors">
                    {organizerName}
                  </span>
                  {post?.author?.verified && (
                    <HiCheckBadge className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
                <span className="text-xs text-base-content/60 truncate">
                  @{post?.author?.username}
                </span>
              </div>
            </Link>

            <span className="text-xs text-base-content/60 whitespace-nowrap flex-shrink-0">
              {timeAgo(post.timePosted)}
            </span>
          </div>

          {post.content && (
            <p className="text-sm text-base-content/80 leading-relaxed">
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
                alt="Post image"
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
              <span>Posted in: {post.event.title}</span>
            </Link>
          )}

          {/* Action bar */}
          <div className="flex items-center gap-4 pt-3 border-t border-base-300">
            <button
              onClick={handleLike}
              aria-label={liked ? "Unlike" : "Like"}
              className="flex items-center gap-1.5 text-sm text-base-content/60 hover:text-error transition-colors"
            >
              {liked ? (
                <HiHeart className="w-5 h-5 text-error" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              aria-label={showComments ? "Hide comments" : "Show comments"}
              className="flex items-center gap-1.5 text-sm text-base-content/60 hover:text-primary transition-colors"
            >
              <HiOutlineChatBubbleLeft className="w-5 h-5" />
              {commentCount > 0 && <span>{commentCount}</span>}
            </button>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="pt-2 border-t border-base-300">
              <CommentSection
                entityType="post"
                entityId={post.id!}
                comments={(post.comments ?? []).filter(Boolean) as any}
              />
            </div>
          )}
        </div>
      </article>

      {/* Image Modal */}
      {showImageModal && imageUrl && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-4xl p-0 bg-transparent shadow-none flex items-center justify-center">
            <button
              onClick={() => setShowImageModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/80 hover:bg-base-100"
              aria-label="Close"
            >
              <HiXMark className="w-5 h-5" />
            </button>
            <img
              src={imageUrl}
              alt="Post image"
              className="w-full h-auto max-h-[95vh] object-contain"
            />
          </div>
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
  hideEventLink?: boolean;
}

export default PostCard;
