import { Link } from "react-router-dom";
import { HiXMark, HiOutlineStar } from "react-icons/hi2";
import { EventFragment } from "@/graphql/graphql-types";
import UserAvatar from "@/components/user/UserAvatar";
import { RatingBadge, RATING_OPTIONS, ratingIndex } from "@/components/event/RatingFaces";
import { displayName } from "@/utils/display-name";

interface ViewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventFragment;
}

function ViewFeedbackModal({ isOpen, onClose, event }: ViewFeedbackModalProps) {
  if (!isOpen) return null;

  const rated = event.members.filter((m) => ratingIndex(m.score) !== -1);
  const avgIndex =
    rated.length > 0
      ? rated.reduce((sum, m) => sum + ratingIndex(m.score), 0) / rated.length
      : 0;
  const avgLabel = (avgIndex + 1).toFixed(1);
  const avgWord = RATING_OPTIONS[Math.round(avgIndex)]?.label;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box flex max-h-[85vh] max-w-md flex-col p-0">
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <h3 className="text-xl font-bold text-balance">Event feedback</h3>
            <p className="mt-0.5 text-sm text-base-content/60">
              Only you can see these ratings.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label="Close"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        {rated.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 pb-8 pt-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
              <HiOutlineStar className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium text-foreground">No feedback yet</p>
            <p className="text-sm text-base-content/60">
              Ratings from attendees will show up here once they weigh in.
            </p>
          </div>
        ) : (
          <>
            {/* Average */}
            <div className="mx-6 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <RatingBadge score={avgIndex} size="md" />
              <div className="min-w-0">
                <p className="text-lg font-bold leading-tight text-foreground">
                  {avgLabel}
                  <span className="text-sm font-medium text-base-content/50">
                    {" "}
                    / 5
                  </span>
                </p>
                <p className="text-sm text-base-content/60">
                  {avgWord} • {rated.length}{" "}
                  {rated.length === 1 ? "rating" : "ratings"}
                </p>
              </div>
            </div>

            {/* Per-attendee feedback */}
            <ul className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
              {rated.map((member) => {
                const name = displayName(
                  member.user.username,
                  member.user.firstName,
                  member.user.lastName,
                );
                return (
                  <li key={member.user.id} className="flex gap-3">
                    <Link
                      to={`/user/${member.user.username}`}
                      className="shrink-0"
                    >
                      <UserAvatar
                        userId={member.user.id!}
                        className="h-8 w-8"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/user/${member.user.username}`}
                        className="text-sm font-semibold transition-colors hover:text-primary"
                      >
                        {name}
                      </Link>
                      {member.comment ? (
                        <p className="mt-0.5 text-sm text-base-content/80">
                          {member.comment}
                        </p>
                      ) : (
                        <p className="mt-0.5 text-sm italic text-base-content/40">
                          No comment left
                        </p>
                      )}
                    </div>
                    <RatingBadge score={member.score} className="mt-0.5" />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default ViewFeedbackModal;
