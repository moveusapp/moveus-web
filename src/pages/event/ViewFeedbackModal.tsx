import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiXMark, HiOutlineStar } from "react-icons/hi2";
import { EventFragment } from "@/graphql/graphql-types";
import UserAvatar from "@/components/user/UserAvatar";
import { RatingBadge, ratingIndex } from "@/components/event/RatingFaces";
import { displayName } from "@/utils/display-name";
import strings from "@/translations/strings";

interface ViewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventFragment;
}

function ViewFeedbackModal({ isOpen, onClose, event }: ViewFeedbackModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const rated = event.members.filter((m) => ratingIndex(m.score) !== -1);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box flex max-h-[85vh] max-w-md flex-col p-0">
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <h3 className="text-xl font-bold text-balance">{strings.event.page.eventFeedback}</h3>
            <p className="mt-0.5 text-sm text-base-content/60">
              {strings.event.page.onlyYouCanSee}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label={strings.common.close}
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        {rated.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 pb-8 pt-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
              <HiOutlineStar className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium text-foreground">{strings.event.page.noFeedbackYet}</p>
            <p className="text-sm text-base-content/60">
              {strings.event.page.feedbackWillShow}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 overflow-y-auto px-6 pb-6 pt-1">
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
                    <UserAvatar userId={member.user.id!} className="h-8 w-8" />
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
                        {strings.event.page.noCommentLeft}
                      </p>
                    )}
                  </div>
                  <RatingBadge score={member.score} className="mt-0.5" />
                </li>
              );
            })}
          </ul>
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
