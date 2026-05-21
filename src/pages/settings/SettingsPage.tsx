import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import useTheme from "@/hooks/use-theme";
import { ReactNode, useCallback, useState } from "react";
import {
  AlterPrivacySettingDocument,
  ContextProfileFragment,
  LogOutDocument,
  PrivacyScope,
  PrivacySetting,
} from "@/graphql/graphql-types";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCake,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineMoon,
  HiOutlineRectangleStack,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { apolloClient } from "@/appolo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import Button from "@/components/ui/Button";
import { clearStoredProfile } from "@/utils/auth";
import PageHeader from "@/components/layout/PageHeader";
import SettingsOption from "./SettingsOption";

const privacySettingConfig: {
  setting: PrivacySetting;
  label: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    setting: PrivacySetting.Location,
    label: "Location",
    description: "Your location and travel distance.",
    icon: <HiOutlineMapPin />,
  },
  {
    setting: PrivacySetting.Age,
    label: "Age",
    description: "Your age shown on your profile.",
    icon: <HiOutlineCake />,
  },
  {
    setting: PrivacySetting.Gender,
    label: "Gender",
    description: "Your gender shown on your profile.",
    icon: <HiOutlineUserCircle />,
  },
  {
    setting: PrivacySetting.Email,
    label: "Email",
    description: "Your email address.",
    icon: <HiOutlineEnvelope />,
  },
  {
    setting: PrivacySetting.Followers,
    label: "Followers",
    description: "Your followers and following lists.",
    icon: <HiOutlineUserGroup />,
  },
  {
    setting: PrivacySetting.Posts,
    label: "Posts",
    description: "Posts you have shared.",
    icon: <HiOutlineRectangleStack />,
  },
];

const scopeOptions: { value: PrivacyScope; label: string }[] = [
  { value: PrivacyScope.Everyone, label: "Everyone" },
  { value: PrivacyScope.Followers, label: "Followers" },
  { value: PrivacyScope.Mutuals, label: "Mutuals" },
  { value: PrivacyScope.Noone, label: "Only you" },
];

type PrivacySettings = ContextProfileFragment["privacySettings"];

function withScope(
  list: PrivacySettings,
  setting: PrivacySetting,
  scope: PrivacyScope,
): PrivacySettings {
  if (list.some((p) => p.setting === setting)) {
    return list.map((p) => (p.setting === setting ? { ...p, scope } : p));
  }
  return [...list, { __typename: "PrivacySettingType", setting, scope }];
}

function SettingsPage() {
  useDocumentTitle("Settings");

  const { profile, setProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [logout, { loading: logoutLoading }] = useMutation(LogOutDocument);
  const [alterPrivacySetting] = useMutation(AlterPrivacySettingDocument);
  const [pendingSetting, setPendingSetting] = useState<PrivacySetting | null>(
    null,
  );
  const [erroredSetting, setErroredSetting] = useState<PrivacySetting | null>(
    null,
  );

  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        setProfile(null);
        clearStoredProfile();
        apolloClient.clearStore();
        navigate("/login");
      })
      .catch((_) => {});
  }, [logout, navigate, setProfile]);

  const scopeFor = (setting: PrivacySetting): PrivacyScope =>
    profile?.privacySettings.find((p) => p.setting === setting)?.scope ??
    PrivacyScope.Everyone;

  const handlePrivacyChange = (setting: PrivacySetting, value: string) => {
    const newScope = value as PrivacyScope;
    const previousScope = scopeFor(setting);
    if (newScope === previousScope) return;

    setErroredSetting(null);
    setPendingSetting(setting);
    setProfile((p) =>
      p
        ? { ...p, privacySettings: withScope(p.privacySettings, setting, newScope) }
        : p,
    );

    alterPrivacySetting({ variables: { setting, scope: newScope } })
      .catch(() => {
        setErroredSetting(setting);
        setProfile((p) =>
          p
            ? {
                ...p,
                privacySettings: withScope(
                  p.privacySettings,
                  setting,
                  previousScope,
                ),
              }
            : p,
        );
      })
      .finally(() => setPendingSetting(null));
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <PageHeader title="Settings" />

      <div className="flex flex-col grow gap-2 m-4">
        <div className="mb-1">
          <p className="text-md font-medium">Appearance</p>
          <p className="text-sm text-base-content/70">
            Customize how MoveUs looks on this device.
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          <SettingsOption
            icon={<HiOutlineMoon />}
            title="Dark mode"
            description="Easier on the eyes in low light."
            control={{
              kind: "toggle",
              checked: theme === "dark",
              onChange: () => toggleTheme(),
            }}
          />
        </div>

        <div className="mt-3 mb-1">
          <p className="text-md font-medium">Privacy</p>
          <p className="text-sm text-base-content/70">
            Choose who can see each part of your profile.
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          {privacySettingConfig.map((config) => (
            <SettingsOption
              key={config.setting}
              icon={config.icon}
              title={config.label}
              description={config.description}
              error={
                erroredSetting === config.setting
                  ? "Couldn't save that, try again."
                  : undefined
              }
              controlLabel={`Who can see your ${config.label.toLowerCase()}`}
              control={{
                kind: "dropdown",
                value: scopeFor(config.setting),
                options: scopeOptions,
                disabled: pendingSetting === config.setting,
                onChange: (value) => handlePrivacyChange(config.setting, value),
              }}
            />
          ))}
        </div>

        <div className="mt-3 mb-1">
          <p className="text-md font-medium">Account</p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden">
          <SettingsOption
            icon={<HiOutlineArrowRightOnRectangle />}
            title="Log out"
            description="You'll need to sign in again next time."
            control={{
              kind: "action",
              tone: "danger",
              onClick: () =>
                (document.getElementById("logoutModal") as any).showModal(),
            }}
          />
        </div>
      </div>

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
                  className={`btn btn-ghost w-22 ${logoutLoading ? "btn-disabled" : ""}`}
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
