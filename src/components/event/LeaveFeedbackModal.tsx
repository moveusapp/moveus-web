import { FormEvent, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@apollo/client/react";
import { EventRating, RateEventDocument } from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import FormError from "@/components/ui/FormError";
import RatingFaces from "@/components/event/RatingFaces";
import { formatError } from "@/utils/format-error";

const MAX_COMMENT = 500;
const COMMENT_WARN_AT = MAX_COMMENT - 50;

interface LeaveFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  eventTitle: string;
  /** Pre-selects a rating when the modal opens (e.g. tapped from the home banner). */
  initialScore?: EventRating | null;
  onSubmitted?: () => void;
}

function LeaveFeedbackModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
  initialScore = null,
  onSubmitted,
}: LeaveFeedbackModalProps) {
  const [score, setScore] = useState<EventRating | null>(initialScore);
  const [comment, setComment] = useState("");

  const [rateEvent, { loading, error, reset }] = useMutation(RateEventDocument, {
    refetchQueries: ["GetEvent", "GetUnratedEvents"],
  });

  // Reset the form each time the modal opens, seeding the tapped rating.
  useEffect(() => {
    if (isOpen) {
      setScore(initialScore);
      setComment("");
      reset();
    }
  }, [isOpen, initialScore, reset]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!score || loading) return;
    try {
      const result = await rateEvent({
        variables: { eventId, score, comment: comment.trim() },
      });
      if (result.data?.rateEvent?.event?.id) {
        onClose();
        onSubmitted?.();
      }
    } catch (err) {
      console.error("Error rating event:", err);
    }
  };

  return (
    <dialog open className="modal modal-open" aria-label={`Rate ${eventTitle}`}>
      <div className="modal-box max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label="Close"
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Rating — the focal ritual */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">How was it?</h3>
            <p className="mx-auto mt-1.5 max-w-xs text-sm text-base-content/60">
              Your rating helps the organizer make the next one even better.
            </p>
            <div className="mt-5">
              <RatingFaces
                value={score}
                onChange={setScore}
                disabled={loading}
              />
            </div>
          </div>

          {/* Optional note */}
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
            <div className="mt-1.5 flex h-4 justify-end" aria-hidden="true">
              {comment.length > 0 && (
                <span
                  className={`text-xs tabular-nums ${
                    comment.length >= COMMENT_WARN_AT
                      ? "text-warning"
                      : "text-base-content/45"
                  }`}
                >
                  {comment.length}/{MAX_COMMENT}
                </span>
              )}
            </div>
          </div>

          {error && (
            <FormError
              title="Couldn't submit your feedback"
              message={formatError(error)}
            />
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-ghost flex-1 rounded-2xl"
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={loading}
              disabled={!score}
              className={`btn-primary flex-1 ${!score ? "btn-disabled" : ""}`}
            >
              Submit feedback
            </Button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default LeaveFeedbackModal;
