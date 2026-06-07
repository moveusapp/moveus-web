import { FormEvent, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@apollo/client/react";
import { EventRating, RateEventDocument } from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import FormError from "@/components/ui/FormError";
import RatingFaces from "@/components/event/RatingFaces";
import { formatError } from "@/utils/format-error";
import { useToast } from "@/context/toast-context";
import strings from "@/translations/strings";
import { useHtmlDialog } from "@/hooks/use-html-dialog";

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
  const toast = useToast();
  const { dialogRef } = useHtmlDialog(isOpen);
  const [score, setScore] = useState<EventRating | null>(initialScore);
  const [comment, setComment] = useState("");

  // The mutation returns the full rated event, so Apollo updates GetEvent via
  // normalization. We just need to remove the rated event from `unratedEvents`.
  const [rateEvent, { loading, error, reset }] = useMutation(RateEventDocument, {
    update(cache, { data }) {
      const ratedId = data?.rateEvent?.event?.id;
      if (ratedId == null) return;
      cache.modify({
        fields: {
          unratedEvents(existing: ReadonlyArray<{ __ref?: string }> = [], { readField }) {
            return existing.filter((ref) => readField("id", ref) !== ratedId);
          },
        },
      });
    },
  });

  // Reset the form each time the modal opens, seeding the tapped rating.
  useEffect(() => {
    if (isOpen) {
      setScore(initialScore);
      setComment("");
      reset();
    }
  }, [isOpen, initialScore, reset]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!score || loading) return;
    try {
      const result = await rateEvent({
        variables: { eventId, score, comment: comment.trim() },
      });
      if (result.data?.rateEvent?.event?.id) {
        onClose();
        toast.success(strings.toast.thanksForFeedback);
        onSubmitted?.();
      }
    } catch {
      // Errors surface inline via the FormError below the rating.
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose} aria-label={strings.formatString(strings.event.feedback.modalAria, { title: eventTitle }) as string}>
      <div className="modal-box max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label={strings.common.close}
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Rating — the focal ritual */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-base-content">{strings.event.feedback.howWasIt}</h3>
            <p className="mx-auto mt-1.5 max-w-xs text-sm text-base-content/60">
              {strings.event.feedback.helpsOrganizer}
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
              label={strings.event.feedback.addComment}
              placeholder={strings.event.feedback.commentPlaceholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={MAX_COMMENT}
              rows={4}
              disabled={loading}
            />
            <div className="flex justify-end" aria-hidden="true">
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
              title={strings.event.feedback.couldntSubmit}
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
              {strings.common.cancel}
            </button>
            <Button
              type="submit"
              loading={loading}
              disabled={!score}
              className={`btn-primary flex-1 ${!score ? "btn-disabled" : ""}`}
            >
              {strings.event.feedback.submit}
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
