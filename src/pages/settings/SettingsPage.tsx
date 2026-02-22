import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import { useCallback, useEffect, useState } from "react";
import {
  PrivacyScope,
  UpdateAllPrivacySettingsDocument,
  LogOutDocument,
} from "@/graphql/graphql-types";
import Dropdown from "@/components/ui/Dropdown";
import { apolloClient } from "@/appolo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import Button from "@/components/ui/Button";

const privacyScopeOptions: Option<PrivacyScope>[] = [
  {
    name: "Only you",
    value: PrivacyScope.Noone,
  },
  {
    name: "Only friends",
    value: PrivacyScope.Friends,
  },
  {
    name: "Everyone",
    value: PrivacyScope.Everyone,
  },
];

function SettingsPage() {
  useDocumentTitle("Settings");

  const { profile, setProfile } = useProfile();

  const [scope, setScope] = useState<PrivacyScope>(
    profile!.privacySettings[0].scope as PrivacyScope,
  );

  const [logout, { loading: logoutLoading }] = useMutation(LogOutDocument);
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        setProfile(null);
        localStorage.clear();
        navigate("/login");
      })
      .catch((_) => {});
  }, [logout, navigate]);

  useEffect(() => {
    setScope(profile!.privacySettings[0].scope as PrivacyScope);
  }, [profile, setScope]);

  const handleSetScope = useCallback(
    (newScope: PrivacyScope) => {
      if (scope === newScope) return;
      apolloClient
        .mutate({
          mutation: UpdateAllPrivacySettingsDocument,
          variables: { scope: newScope },
        })
        .then(() => {
          setProfile((p: any) => {
            const newPrivacySettings = p?.privacySettings.map(
              (setting: any) => {
                return {
                  ...setting,
                  scope: newScope,
                };
              },
            );
            return {
              ...p,
              privacySettings: newPrivacySettings!,
            } as any;
          });
        })
        .catch((e) => {
          console.error(e);
        });
      setScope(newScope);
    },
    [scope, setScope, setProfile],
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center my-8 text-3xl gap-4">
        <h2>Settings</h2>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium">Privacy</h3>
          <p className="text-sm text-accent">Who can see your profile info.</p>
        </div>
        <Dropdown
          options={privacyScopeOptions}
          value={scope}
          setValue={handleSetScope}
          classname="text-nowrap shrink-0"
        />
      </div>
      <button
        className="mt-auto mb-8"
        onClick={() =>
          (document.getElementById("logoutModal") as any).showModal()
        }
      >
        Logout
      </button>
      <dialog id="logoutModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout?</h3>
          <p className="py-4">Are you sure you'd like to logout?</p>
          <div className="modal-action">
            <div className="flex flex-row gap-2">
              <form method="dialog">
                <Button
                  onClick={() =>
                    (document.getElementById("logoutModal") as any).close()
                  }
                  className={`btn w-22 ${logoutLoading ? "btn-disabled" : ""}`}
                >
                  Cancel
                </Button>
              </form>
              <Button
                onClick={onLogout}
                loading={logoutLoading}
                className="btn btn-primary w-22"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SettingsPage;
