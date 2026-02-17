import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "../hooks/use-document-title";
import BackButton from "@/components/routes/BackButton";
import { useCallback, useEffect, useState } from "react";
import {
  PrivacyScope,
  UpdateAllPrivacySettingsDocument,
  useLogOutMutation,
} from "@/graphql/generated";
import Dropdown from "@/components/input/Dropdown";
import { apolloClient } from "@/appolo/client";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { LOADER_COLOR } from "@/constants";

const privacyScopeOptions: Option<PrivacyScope>[] = [
  {
    name: "Only you",
    value: "NOONE",
  },
  {
    name: "Only friends",
    value: "FRIENDS",
  },
  {
    name: "Everyone",
    value: "EVERYONE",
  },
];

function SettingsPage() {
  useDocumentTitle("Settings");

  const { profile, setProfile } = useProfile();

  const [scope, setScope] = useState<PrivacyScope>(
    profile!.privacySettings[0].scope as PrivacyScope,
  );

  const [logout, { loading: logoutLoading }] = useLogOutMutation();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        navigate("/welcome");
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
          setProfile((p) => {
            const newPrivacySettings = p?.privacySettings.map((setting) => {
              return {
                ...setting,
                scope: newScope,
              };
            });
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
        <BackButton />
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
      {logoutLoading ? (
        <HashLoader color={LOADER_COLOR} className=" mt-auto mb-8 mx-auto" />
      ) : (
        <button className="mt-auto mb-8" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default SettingsPage;
