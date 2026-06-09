import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiXMark } from "react-icons/hi2";
import { apolloClient } from "@/apollo/client";
import { useProfile } from "@/context/profile-context";
import { LogOutDocument } from "@/graphql/graphql-types";
import { clearStoredProfile } from "@/utils/auth";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import Button from "@/components/ui/Button";
import strings from "@/translations/strings";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

function LogoutModal({ open, onClose }: LogoutModalProps) {
  const { dialogRef } = useHtmlDialog(open);
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const [logout, { loading }] = useMutation(LogOutDocument);

  const onLogout = () => {
    logout()
      .then(() => {
        setProfile(null);
        clearStoredProfile();
        apolloClient.clearStore();
        navigate("/login");
      })
      .catch(() => {});
  };

  // Rendered through a portal to document.body so the fixed-position modal
  // isn't trapped by an ancestor that establishes a containing block (e.g. the
  // backdrop-blurred PageHeader the MobileMenuDrawer lives in), which would
  // otherwise position/animate it relative to that ancestor instead of the
  // viewport.
  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-label={strings.settings.logoutModalTitle}
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
          {strings.settings.logoutModalTitle}
        </h3>
        <p className="text-sm text-base-content/60 mt-2">
          {strings.settings.logoutModalBody}
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
            onClick={onLogout}
            className="btn-primary"
          >
            {strings.settings.logoutConfirm}
          </Button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>,
    document.body,
  );
}

export default LogoutModal;
