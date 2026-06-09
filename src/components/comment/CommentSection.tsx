import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client/react";
import type { Reference } from "@apollo/client/cache";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

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
import { useProfile } from "@/context/profile-context";
import strings from "@/translations/strings";

function CommentSection({ comments, entityType, entityId }: CommentSectionProps) {
  const toast = useToast();
  const { profile } = useProfile();
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const [commentOnPost, { loading: postLoading }] = useMutation(CommentOnPostDocument);
  const [commentOnEvent, { loading: eventLoading }] = useMutation(CommentOnEventDocument);
  const [replyOnComment, { loading: replyLoading }] = useMutation(ReplyOnCommentDocument);

  const onError = useCallback(
    (err: unknown) => toast.error(formatError(err)),
    [toast],
  );

  const handleComment = useCallback(
    (text: string) => {
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
    [entityType, entityId, commentOnPost, commentOnEvent, onError],
  );

  const handleReply = useCallback(
    (parentId: number, text: string) => {
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
        .then(() => setActiveReplyId(null))
        .catch(onError);
    },
    [replyOnComment, onError],
  );

  const hasComments = comments.length > 0;

  return (
    <div className="flex flex-col gap-5">
      <CommentInput
        onSubmit={handleComment}
        loading={postLoading || eventLoading}
        avatarUrl={profile?.avatarUrl}
      />

      {hasComments ? (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserAvatar={profile?.avatarUrl}
              activeReplyId={activeReplyId}
              replyLoading={replyLoading}
              onStartReply={setActiveReplyId}
              onCancelReply={() => setActiveReplyId(null)}
              onSubmitReply={handleReply}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1.5 py-8 text-center">
          <HiOutlineChatBubbleOvalLeft className="h-7 w-7 text-base-content/40" />
          <p className="text-sm font-medium text-base-content/70">
            {strings.comment.noComments}
          </p>
          <p className="text-xs text-base-content/50">
            {strings.comment.beTheFirst}
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentSection;

interface CommentSectionProps {
  comments: CommentFragment[];
  entityType: "post" | "event";
  entityId: number;
}
