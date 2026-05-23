import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { apolloClient } from "@/appolo/client";
import { useProfile } from "@/context/profile-context";
import { LogOutDocument } from "@/graphql/graphql-types";
import { clearStoredProfile } from "@/utils/auth";
import Button from "@/components/ui/Button";
import strings from "@/translations/strings";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

function LogoutModal({ open, onClose }: LogoutModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const [logout, { loading }] = useMutation(LogOutDocument);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onLogout = () => {
    logout()
      .then(() => {
        setProfile(null);
        clearStoredProfile();
        apolloClient.clearStore();
        navigate("/login");
      })
      .catch((_) => {});
  };

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {strings.settings.logoutModalTitle}
        </h3>
        <p className="py-4">{strings.settings.logoutModalBody}</p>
        <div className="modal-action">
          <div className="flex flex-row gap-2">
            <Button
              onClick={onClose}
              className={`btn btn-ghost ${loading ? "btn-disabled" : ""}`}
            >
              {strings.common.cancel}
            </Button>
            <Button
              onClick={onLogout}
              loading={loading}
              className="btn btn-primary"
            >
              {strings.settings.logoutConfirm}
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

export default LogoutModal;
