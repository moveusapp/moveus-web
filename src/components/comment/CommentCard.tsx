import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CommentFragment,
  LikeCommentDocument,
  UnlikeCommentDocument,
} from "@/graphql/graphql-types";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import CommentInput from "./CommentInput";
import { displayName } from "@/utils/display-name";
import { timeAgo } from "@/utils/time-utils";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatBubbleLeft,
  HiChevronDown,
} from "react-icons/hi2";
import strings from "@/translations/strings";
import { useLikeToggle } from "@/hooks/use-like-toggle";

function CommentCard({
  comment,
  currentUserAvatar,
  activeReplyId,
  replyLoading,
  onStartReply,
  onCancelReply,
  onSubmitReply,
}: CommentCardProps) {
  const [prefill, setPrefill] = useState("");
  const [expanded, setExpanded] = useState(false);

  const { liked, likeCount, justLiked, toggle: handleLike } = useLikeToggle({
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

  const startReply = (mentionUsername?: string) => {
    setPrefill(mentionUsername ? `@${mentionUsername} ` : "");
    setExpanded(true);
    onStartReply(comment.id!);
  };

  const isReplying = activeReplyId === comment.id;
  const replyCount = comment.replies.length;
  const hasReplies = comment.hasReplies && replyCount > 0;
  const showThread = (expanded && hasReplies) || isReplying;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <Link to={`/user/${comment.user.username}`} className="flex-shrink-0">
          <UserAvatar imageUrl={comment.user.avatarUrl} className="h-9 w-9" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <Link
                to={`/user/${comment.user.username}`}
                className="truncate text-sm font-semibold transition-colors hover:text-primary"
              >
                {name}
              </Link>
              <UserBadge badge={comment.user.badge} />
            </div>
            <span className="shrink-0 text-xs text-base-content/60">
              {timeAgo(comment.timePosted)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line break-words text-sm text-base-content/80">
            {comment.text}
          </p>
          <div className="mt-1.5 flex items-center gap-4">
            <LikeButton
              liked={liked}
              likeCount={likeCount}
              justLiked={justLiked}
              onClick={handleLike}
            />
            <button
              onClick={() => startReply()}
              className="flex items-center gap-1 text-xs font-medium text-base-content/60 transition-colors hover:text-primary"
            >
              <HiOutlineChatBubbleLeft className="h-3.5 w-3.5" />
              {strings.comment.reply}
            </button>
          </div>
        </div>
      </div>

      {hasReplies && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="ml-12 flex w-fit items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/70"
        >
          <HiChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
          {expanded
            ? strings.comment.hideReplies
            : strings.formatString(
                replyCount === 1
                  ? strings.comment.viewReplies
                  : strings.comment.viewRepliesPlural,
                { count: replyCount },
              )}
        </button>
      )}

      {showThread && (
        <div className="ml-[1.875rem] flex flex-col gap-3 border-l border-base-300 pl-3.5">
          {expanded &&
            comment.replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                reply={reply}
                onReply={() => startReply(reply.user.username)}
              />
            ))}

          {isReplying && (
            <CommentInput
              key={prefill || "root"}
              variant="reply"
              autoFocus
              initialText={prefill}
              avatarUrl={currentUserAvatar}
              loading={replyLoading}
              onSubmit={(text) => onSubmitReply(comment.id!, text)}
              onCancel={onCancelReply}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ReplyCard({
  reply,
  onReply,
}: {
  reply: CommentFragment["replies"][number];
  onReply: () => void;
}) {
  const { liked, likeCount, justLiked, toggle: handleLike } = useLikeToggle({
    variables: { commentId: reply.id! },
    initialLiked: reply.isLiked ?? false,
    initialCount: reply.likes ?? 0,
    likeDoc: LikeCommentDocument,
    unlikeDoc: UnlikeCommentDocument,
  });

  const name = displayName(reply.user.username, reply.user.firstName, reply.user.lastName);

  return (
    <div className="flex gap-2.5">
      <Link to={`/user/${reply.user.username}`} className="flex-shrink-0">
        <UserAvatar imageUrl={reply.user.avatarUrl} className="h-7 w-7" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <Link
              to={`/user/${reply.user.username}`}
              className="truncate text-sm font-semibold transition-colors hover:text-primary"
            >
              {name}
            </Link>
            <UserBadge badge={reply.user.badge} />
          </div>
          <span className="shrink-0 text-xs text-base-content/60">
            {timeAgo(reply.timePosted)}
          </span>
        </div>
        <p className="mt-0.5 whitespace-pre-line break-words text-sm text-base-content/80">
          {reply.text}
        </p>
        <div className="mt-1.5 flex items-center gap-4">
          <LikeButton
            liked={liked}
            likeCount={likeCount}
            justLiked={justLiked}
            onClick={handleLike}
          />
          <button
            onClick={onReply}
            className="flex items-center gap-1 text-xs font-medium text-base-content/60 transition-colors hover:text-primary"
          >
            <HiOutlineChatBubbleLeft className="h-3.5 w-3.5" />
            {strings.comment.reply}
          </button>
        </div>
      </div>
    </div>
  );
}

function LikeButton({
  liked,
  likeCount,
  justLiked,
  onClick,
}: {
  liked: boolean;
  likeCount: number;
  justLiked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={liked ? strings.post.unlike : strings.post.like}
      aria-pressed={liked}
      className="flex items-center gap-1 text-xs font-medium text-base-content/60 transition-colors hover:text-error"
    >
      {liked ? (
        <HiHeart className={`h-3.5 w-3.5 text-error ${justLiked ? "animate-like-pop" : ""}`} />
      ) : (
        <HiOutlineHeart className="h-3.5 w-3.5" />
      )}
      {likeCount > 0 && <span className="tabular-nums">{likeCount}</span>}
    </button>
  );
}

export default CommentCard;

interface CommentCardProps {
  comment: CommentFragment;
  currentUserAvatar?: string | null;
  activeReplyId: number | null;
  replyLoading: boolean;
  onStartReply: (commentId: number) => void;
  onCancelReply: () => void;
  onSubmitReply: (parentId: number, text: string) => void;
}
