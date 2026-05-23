import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { apolloClient } from "@/appolo/client";
import { useProfile } from "@/context/profile-context";
import { useToast } from "@/context/toast-context";
import { DeleteAccountDocument } from "@/graphql/graphql-types";
import { clearStoredProfile } from "@/utils/auth";
import { formatError } from "@/utils/format-error";
import Button from "@/components/ui/Button";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const toast = useToast();
  const [deleteAccount, { loading }] = useMutation(DeleteAccountDocument);
  const [confirmText, setConfirmText] = useState("");
  const confirmed = username.length > 0 && confirmText === username;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setConfirmText("");
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
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
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">
          {strings.settings.deleteAccountModalTitle}
        </h3>
        <p className="pt-3 text-sm text-base-content/80">
          {strings.settings.deleteAccountModalBody}
        </p>
        <label className="block mt-5">
          <span className="block text-sm text-base-content/80 mb-2">
            {strings.formatString(
              strings.settings.deleteAccountUsernamePrompt,
              {
                username: (
                  <span className="font-semibold text-base-content">
                    {username}
                  </span>
                ),
              },
            )}
          </span>
          <input
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={confirmText}
            onChange={(e) => setConfirmText(e.currentTarget.value)}
            placeholder={strings.settings.deleteAccountUsernamePlaceholder}
            disabled={loading}
            className="input input-bordered w-full rounded-2xl bg-base-100"
            aria-label={strings.settings.deleteAccountUsernamePlaceholder}
          />
        </label>
        <div className="modal-action">
          <div className="flex flex-row gap-2">
            <Button
              onClick={handleClose}
              className={`btn btn-ghost ${loading ? "btn-disabled" : ""}`}
            >
              {strings.common.cancel}
            </Button>
            <Button
              onClick={onDelete}
              loading={loading}
              disabled={!confirmed || loading}
              className="btn btn-error"
            >
              {strings.settings.deleteAccountConfirm}
            </Button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default DeleteAccountModal;
