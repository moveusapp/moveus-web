import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client/react";
import type { Reference } from "@apollo/client/cache";

// Apollo's Modifier type accepts `Reference | readonly Reference[] | undefined`,
// but for a normalized list field we only ever see the array case.
const appendRef =
  (ref: Reference) =>
  (existing: readonly Reference[] | Reference = []): readonly Reference[] =>
    Array.isArray(existing) ? [...existing, ref] : [ref];
import {
  CommentFragment,
  CommentFragmentDoc,
  CommentOnPostDocument,
  CommentOnEventDocument,
  ReplyOnCommentDocument,
} from "@/graphql/graphql-types";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { formatError } from "@/utils/format-error";
import { useToast } from "@/context/toast-context";

function CommentSection({ comments, entityType, entityId }: CommentSectionProps) {
  const toast = useToast();
  const [replyingTo, setReplyingTo] = useState<CommentFragment | null>(null);

  const [commentOnPost, { loading: postLoading }] = useMutation(CommentOnPostDocument);
  const [commentOnEvent, { loading: eventLoading }] = useMutation(CommentOnEventDocument);
  const [replyOnComment, { loading: replyLoading }] = useMutation(ReplyOnCommentDocument);

  const loading = postLoading || eventLoading || replyLoading;

  const handleSubmit = useCallback(
    (text: string) => {
      const onError = (err: unknown) => toast.error(formatError(err));

      if (replyingTo) {
        const parentId = replyingTo.id!;
        replyOnComment({
          variables: { commentId: parentId, text },
          update(cache, { data }) {
            const reply = data?.replyOnComment?.comment;
            if (!reply) return;
            const ref = cache.writeFragment({
              data: reply,
              fragment: CommentFragmentDoc,
              fragmentName: "Comment",
            });
            if (!ref) return;
            cache.modify({
              id: cache.identify({ __typename: "CommentType", id: parentId }),
              fields: {
                hasReplies: () => true,
                replies: appendRef(ref),
              },
            });
          },
        })
          .then(() => setReplyingTo(null))
          .catch(onError);
        return;
      }

      if (entityType === "post") {
        commentOnPost({
          variables: { postId: entityId, text },
          update(cache, { data }) {
            const comment = data?.commentOnPost?.comment;
            if (!comment) return;
            const ref = cache.writeFragment({
              data: comment,
              fragment: CommentFragmentDoc,
              fragmentName: "Comment",
            });
            if (!ref) return;
            cache.modify({
              id: cache.identify({ __typename: "PostType", id: entityId }),
              fields: { comments: appendRef(ref) },
            });
          },
        }).catch(onError);
      } else {
        commentOnEvent({
          variables: { eventId: entityId, text },
          update(cache, { data }) {
            const comment = data?.commentOnEvent?.comment;
            if (!comment) return;
            const ref = cache.writeFragment({
              data: comment,
              fragment: CommentFragmentDoc,
              fragmentName: "Comment",
            });
            if (!ref) return;
            cache.modify({
              id: cache.identify({ __typename: "EventType", id: entityId }),
              fields: { comments: appendRef(ref) },
            });
          },
        }).catch(onError);
      }
    },
    [replyingTo, entityType, entityId, commentOnPost, commentOnEvent, replyOnComment, toast],
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
