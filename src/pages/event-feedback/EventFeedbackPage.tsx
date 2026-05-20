import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiOutlineFlag } from "react-icons/hi2";
import {
  EventPhase,
  EventRating,
  MemberRole,
  RateEventDocument,
} from "@/graphql/graphql-types";
import { useEvent } from "@/hooks/use-event";
import useDocumentTitle from "@/hooks/use-document-title";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import FormError from "@/components/ui/FormError";
import { formatError } from "@/utils/format-error";
import { formatDate } from "@/utils/time-utils";
import RatingFaces from "./RatingFaces";

const ATTENDEE_ROLES = [
  MemberRole.Participant,
  MemberRole.Moderator,
  MemberRole.Spectator,
];

const MAX_COMMENT = 500;
const pageWrap = "w-full mx-auto max-w-xl px-4 py-6";

function FeedbackSkeleton() {
  return (
    <>
      <PageHeader title={<span className="skeleton block h-7 w-52 max-w-full" />}>
        <div className="pb-3">
          <div className="skeleton h-4 w-36" />
        </div>
      </PageHeader>
      <div className={`${pageWrap} flex flex-col gap-6`}>
        <div className="flex flex-col gap-3">
          <div className="skeleton h-5 w-40" />
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton aspect-square rounded-2xl" />
            ))}
          </div>
        </div>
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-12 rounded-2xl" />
      </div>
    </>
  );
}

function EventFeedbackPage() {
  useDocumentTitle("Rate this event");

  const { eventId } = useParams();
  const navigate = useNavigate();

  const { id, event, fallback } = useEvent({
    eventIdParam: eventId,
    loadingFallback: <FeedbackSkeleton />,
  });

  const [score, setScore] = useState<EventRating | null>(null);
  const [comment, setComment] = useState("");

  const [rateEvent, { loading, error }] = useMutation(RateEventDocument);

  if (fallback) return fallback;
  if (!event) return null;

  // Feedback is only meaningful for finished events the user attended.
  const eligible =
    event.phase === EventPhase.Finished &&
    ATTENDEE_ROLES.includes(event.role!);
  if (!eligible) return <Navigate to={`/event/${id}`} replace />;

  const handleSubmit = async () => {
    if (!score) return;
    try {
      const result = await rateEvent({
        variables: { eventId: id, score, comment: comment.trim() },
      });
      if (result.data?.rateEvent?.event?.id) {
        navigate(`/event/${id}`);
      }
    } catch (err) {
      console.error("Error rating event:", err);
    }
  };

  return (
    <>
      <PageHeader title={`Rate ${event.title}`}>
        <div className="pb-3 flex items-center gap-1.5 text-sm text-base-content/60">
          <HiOutlineFlag className="h-4 w-4 shrink-0 text-primary" />
          Wrapped up {formatDate(event.endTime)}
        </div>
      </PageHeader>

      <div className={`${pageWrap} flex flex-col gap-6`}>
        {/* Score */}
        <div>
          <h3 className="text-base font-semibold text-foreground">
            How was it?
          </h3>
          <p className="mt-0.5 mb-4 text-sm text-base-content/60">
            Your rating helps the organizer and future participants.
          </p>
          <RatingFaces value={score} onChange={setScore} disabled={loading} />
        </div>

        {/* Comment */}
        <div>
          <TextArea
            label="Add a comment (optional)"
            placeholder="What stood out? Anything the organizer should know?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={MAX_COMMENT}
            rows={4}
            disabled={loading}
          />
          <p className="mt-1 pr-1 text-right text-xs text-base-content/45">
            {comment.length}/{MAX_COMMENT}
          </p>
        </div>

        {error && (
          <FormError
            title="Couldn't submit your feedback"
            message={formatError(error)}
          />
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/event/${id}`}
            className="btn btn-ghost flex-1 rounded-2xl"
          >
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!score}
            className={`btn-primary flex-1 ${!score ? "btn-disabled" : ""}`}
          >
            Submit feedback
          </Button>
        </div>
      </div>
    </>
  );
}

export default EventFeedbackPage;
