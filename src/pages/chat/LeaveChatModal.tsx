import { HiXMark } from "react-icons/hi2";
import { useMutation } from "@apollo/client/react";
import { LeaveChatDocument } from "@/graphql/graphql-types";
import Button from "@/components/ui/Button";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useToast } from "@/context/toast-context";
import { formatError } from "@/utils/format-error";
import strings from "@/translations/strings";

interface LeaveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: number;
  onLeft: () => void;
}

function LeaveChatModal({ isOpen, onClose, chatId, onLeft }: LeaveChatModalProps) {
  const toast = useToast();
  const { dialogRef } = useHtmlDialog(isOpen);
  const [leaveChat, { loading }] = useMutation(LeaveChatDocument);

  const handleLeave = async () => {
    if (loading) return;
    try {
      const result = await leaveChat({ variables: { chatId } });
      if (result.data?.leaveChat?.success) {
        toast.success(strings.toast.leftChat);
        onLeft();
        onClose();
      }
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.chat.leaveChatTitle}
    >
      <div className="modal-box max-w-sm">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label={strings.common.close}
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-bold leading-tight">
          {strings.chat.leaveChatTitle}
        </h3>
        <p className="text-sm text-base-content/60 mt-2">
          {strings.chat.leaveChatBody}
        </p>

        <div className="flex gap-2 justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn btn-ghost rounded-2xl"
          >
            {strings.common.cancel}
          </button>
          <Button
            type="button"
            loading={loading}
            onClick={handleLeave}
            className="btn-error"
          >
            {strings.chat.leave}
          </Button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default LeaveChatModal;
