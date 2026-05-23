import { useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";
import { EventFragment } from "@/graphql/graphql-types";
import ParticipantsList from "@/pages/event/ParticipantsList"
import strings from "@/translations/strings";

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventFragment;
}

function ParticipantsModal({ isOpen, onClose, event }: ParticipantsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const count = event.members?.length ?? 0;
  const subtitle = event.maxParticipants
    ? (strings.formatString(strings.event.page.spotsFilled, {
        count,
        max: event.maxParticipants,
      }) as string)
    : (strings.formatString(
        count === 1 ? strings.event.page.personCount : strings.event.page.peopleCount,
        { count },
      ) as string);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box flex max-h-[85vh] max-w-md flex-col p-0">
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <h3 className="text-xl font-bold text-balance">{strings.event.page.participants}</h3>
            <p className="mt-0.5 text-sm text-base-content/60">{subtitle}</p>
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
        <ParticipantsList event={event}/>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default ParticipantsModal;
