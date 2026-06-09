import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiXMark } from "react-icons/hi2";
import { apolloClient } from "@/apollo/client";
import { useProfile } from "@/context/profile-context";
import { useToast } from "@/context/toast-context";
import { DeleteAccountDocument } from "@/graphql/graphql-types";
import { clearStoredProfile } from "@/utils/auth";
import { formatError } from "@/utils/format-error";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import strings from "@/translations/strings";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

function DeleteAccountModal({
  open,
  onClose,
  username,
}: DeleteAccountModalProps) {
  const { dialogRef } = useHtmlDialog(open);
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const toast = useToast();
  const [deleteAccount, { loading }] = useMutation(DeleteAccountDocument);
  const [confirmText, setConfirmText] = useState("");
  const confirmed = username.length > 0 && confirmText === username;

  useEffect(() => {
    if (open) setConfirmText("");
  }, [open]);

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  const onDelete = () => {
    if (!confirmed) return;
    deleteAccount()
      .then((result) => {
        if (!result.data?.deleteAccount?.success) {
          throw new Error("Delete account did not succeed");
        }
        setConfirmText("");
        setProfile(null);
        clearStoredProfile();
        apolloClient.clearStore();
        navigate("/login");
      })
      .catch((error) => {
        toast.error(formatError(error), strings.toast.accountNotDeleted);
      });
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={handleClose}
      aria-label={strings.settings.deleteAccountModalTitle}
    >
      <div className="modal-box max-w-md">
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label={strings.common.close}
        >
          <HiXMark className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-bold leading-tight text-error">
          {strings.settings.deleteAccountModalTitle}
        </h3>
        <p className="text-sm text-base-content/60 mt-2">
          {strings.settings.deleteAccountModalBody}
        </p>

        <label className="block mt-5">
          <span className="block text-sm text-base-content/80 mb-2">
            {strings.formatString(strings.settings.deleteAccountUsernamePrompt, {
              username: (
                <span className="font-semibold text-base-content">
                  {username}
                </span>
              ),
            })}
          </span>
          <TextInput
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={confirmText}
            onChange={(e) => setConfirmText(e.currentTarget.value)}
            placeholder={strings.settings.deleteAccountUsernamePlaceholder}
            disabled={loading}
            aria-label={strings.settings.deleteAccountUsernamePlaceholder}
          />
        </label>

        <div className="flex gap-2 justify-end mt-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="btn btn-ghost rounded-2xl"
          >
            {strings.common.cancel}
          </button>
          <Button
            type="button"
            loading={loading}
            disabled={!confirmed || loading}
            onClick={onDelete}
            className="btn-error"
          >
            {strings.settings.deleteAccountConfirm}
          </Button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default DeleteAccountModal;
