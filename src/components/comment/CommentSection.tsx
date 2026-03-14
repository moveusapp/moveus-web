import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  CommentFragment,
  CommentOnPostDocument,
  CommentOnEventDocument,
  ReplyOnCommentDocument,
} from "@/graphql/graphql-types";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

function CommentSection({ comments, entityType, entityId }: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<CommentFragment | null>(null);

  const [commentOnPost, { loading: postLoading }] = useMutation(CommentOnPostDocument, {
    refetchQueries: ["GetEvent", "GetFeed"],
  });
  const [commentOnEvent, { loading: eventLoading }] = useMutation(CommentOnEventDocument, {
    refetchQueries: ["GetEvent"],
  });
  const [replyOnComment, { loading: replyLoading }] = useMutation(ReplyOnCommentDocument, {
    refetchQueries: ["GetEvent", "GetFeed"],
  });

  const loading = postLoading || eventLoading || replyLoading;

  const handleSubmit = useCallback(
    (text: string) => {
      if (replyingTo) {
        replyOnComment({ variables: { commentId: replyingTo.id!, text } })
          .then(() => setReplyingTo(null))
          .catch(() => {});
        return;
      }

      if (entityType === "post") {
        commentOnPost({ variables: { postId: entityId, text } }).catch(() => {});
      } else {
        commentOnEvent({ variables: { eventId: entityId, text } }).catch(() => {});
      }
    },
    [replyingTo, entityType, entityId, commentOnPost, commentOnEvent, replyOnComment],
  );

  const handleReply = useCallback((comment: CommentFragment) => {
    setReplyingTo(comment);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {comments.length > 0 && (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))}
        </div>
      )}
      <CommentInput
        onSubmit={handleSubmit}
        loading={loading}
        replyingTo={replyingTo?.user.username}
        onCancelReply={() => setReplyingTo(null)}
      />
    </div>
  );
}

export default CommentSection;

interface CommentSectionProps {
  comments: CommentFragment[];
  entityType: "post" | "event";
  entityId: number;
}
