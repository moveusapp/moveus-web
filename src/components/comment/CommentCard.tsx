import { Link } from "react-router-dom";
import {
  CommentFragment,
  LikeCommentDocument,
  UnlikeCommentDocument,
} from "@/graphql/graphql-types";
import UserAvatar from "@/components/user/UserAvatar";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import { HiOutlineHeart, HiHeart, HiOutlineChatBubbleLeft } from "react-icons/hi2";
import strings from "@/translations/strings";
import { useLikeToggle } from "@/hooks/use-like-toggle";

function CommentCard({ comment, onReply }: CommentCardProps) {
  const { liked, likeCount, toggle: handleLike } = useLikeToggle({
    variables: { commentId: comment.id! },
    initialLiked: comment.isLiked ?? false,
    initialCount: comment.likes ?? 0,
    likeDoc: LikeCommentDocument,
    unlikeDoc: UnlikeCommentDocument,
  });

  const name = displayName(
    comment.user.username,
    comment.user.firstName,
    comment.user.lastName,
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.username}`} className="flex-shrink-0">
          <UserAvatar userId={comment.user.id!} className="w-8 h-8" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              to={`/user/${comment.user.username}`}
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              {name}
            </Link>
            <span className="text-xs text-base-content/60">
              {timeAgo(comment.timePosted)}
            </span>
          </div>
          <p className="text-sm text-base-content/80 mt-0.5">{comment.text}</p>
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleLike}
              aria-label={liked ? strings.post.unlike : strings.post.like}
              className="flex items-center gap-1 text-xs text-base-content/60 hover:text-error transition-colors"
            >
              {liked ? (
                <HiHeart className="w-3.5 h-3.5 text-error" />
              ) : (
                <HiOutlineHeart className="w-3.5 h-3.5" />
              )}
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>
            {onReply && (
              <button
                onClick={() => onReply(comment)}
                aria-label={strings.comment.reply}
                className="flex items-center gap-1 text-xs text-base-content/60 hover:text-primary transition-colors"
              >
                <HiOutlineChatBubbleLeft className="w-3.5 h-3.5" />
                {strings.comment.reply}
              </button>
            )}
          </div>
        </div>
      </div>

      {comment.hasReplies && comment.replies.length > 0 && (
        <div className="ml-8 border-l-2 border-base-300 pl-3 flex flex-col gap-2 mt-1">
          {comment.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReplyCard({ reply }: { reply: CommentFragment["replies"][number] }) {
  const { liked, likeCount, toggle: handleLike } = useLikeToggle({
    variables: { commentId: reply.id! },
    initialLiked: reply.isLiked ?? false,
    initialCount: reply.likes ?? 0,
    likeDoc: LikeCommentDocument,
    unlikeDoc: UnlikeCommentDocument,
  });

  const name = displayName(reply.user.username, reply.user.firstName, reply.user.lastName);

  return (
    <div className="flex gap-3">
      <Link to={`/user/${reply.user.username}`} className="flex-shrink-0">
        <UserAvatar userId={reply.user.id!} className="w-6 h-6" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/user/${reply.user.username}`}
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            {name}
          </Link>
          <span className="text-xs text-base-content/60">
            {timeAgo(reply.timePosted)}
          </span>
        </div>
        <p className="text-sm text-base-content/80 mt-0.5">{reply.text}</p>
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={handleLike}
            aria-label={liked ? strings.post.unlike : strings.post.like}
            className="flex items-center gap-1 text-xs text-base-content/60 hover:text-error transition-colors"
          >
            {liked ? (
              <HiHeart className="w-3.5 h-3.5 text-error" />
            ) : (
              <HiOutlineHeart className="w-3.5 h-3.5" />
            )}
            {likeCount > 0 && <span>{likeCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;

interface CommentCardProps {
  comment: CommentFragment;
  onReply?: (comment: CommentFragment) => void;
}
