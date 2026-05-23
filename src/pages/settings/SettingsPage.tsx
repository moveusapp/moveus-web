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
  HiOutlineMapPin,
  HiOutlineMoon,
  HiOutlineRectangleStack,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiLanguage,
} from "react-icons/hi2";
import { apolloClient } from "@/appolo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import Button from "@/components/ui/Button";
import { clearStoredProfile } from "@/utils/auth";
import PageHeader from "@/components/layout/PageHeader";
import SettingsOption from "./SettingsOption";
import strings from "@/translations/strings";
import { Locale } from "@/translations/strings";
import { enumToOptions } from "@/utils/enum-to-options";
import { useLanguage } from "@/context/language-context";

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
  useDocumentTitle(strings.settings.documentTitle);

  const { profile, setProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const [logout, { loading: logoutLoading }] = useMutation(LogOutDocument);
  const [alterPrivacySetting] = useMutation(AlterPrivacySettingDocument);
  const [pendingSetting, setPendingSetting] = useState<PrivacySetting | null>(
    null,
  );
  const [erroredSetting, setErroredSetting] = useState<PrivacySetting | null>(
    null,
  );
  const settingOptions = enumToOptions(PrivacySetting, "enums.privacySetting");

  const privacySettingConfig: {
    setting: PrivacySetting;
    description: string;
    icon: ReactNode;
  }[] = [
    {
      setting: PrivacySetting.Location,
      description: strings.settings.locationDesc,
      icon: <HiOutlineMapPin />,
    },
    {
      setting: PrivacySetting.Age,
      description: strings.settings.ageDesc,
      icon: <HiOutlineCake />,
    },
    {
      setting: PrivacySetting.Gender,
      description: strings.settings.genderDesc,
      icon: <HiOutlineUserCircle />,
    },
    {
      setting: PrivacySetting.Followers,
      description: strings.settings.followersDesc,
      icon: <HiOutlineUserGroup />,
    },
    {
      setting: PrivacySetting.Posts,
      description: strings.settings.postsDesc,
      icon: <HiOutlineRectangleStack />,
    },
  ];

  const scopeOptions: { value: PrivacyScope; label: string }[] = [
    { value: PrivacyScope.Everyone, label: strings.settings.scopeEveryone },
    { value: PrivacyScope.Followers, label: strings.settings.scopeFollowers },
    { value: PrivacyScope.Mutuals, label: strings.settings.scopeMutuals },
    { value: PrivacyScope.Noone, label: strings.settings.scopeOnlyYou },
  ];

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
      <PageHeader title={strings.settings.title} />

      <div className="flex flex-col grow gap-2 m-4">
        <div className="mb-1">
          <p className="text-md font-medium">{strings.settings.appearance}</p>
          <p className="text-sm text-base-content/70">
            {strings.settings.appearanceDesc}
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          <SettingsOption
            icon={<HiOutlineMoon />}
            title={strings.settings.darkMode}
            description={strings.settings.darkModeDesc}
            control={{
              kind: "toggle",
              checked: theme === "dark",
              onChange: () => toggleTheme(),
            }}
          />
          <SettingsOption
            icon={<HiLanguage />}
            title={strings.settings.language}
            description={strings.settings.langaugeDesc}
            control={{
              kind: "dropdown",
              value: language,
              options: enumToOptions(Locale, "enums.locale"),
              onChange: (value) => setLanguage(value as Locale),
            }}
          />
        </div>

        <div className="mt-3 mb-1">
          <p className="text-md font-medium">{strings.settings.privacy}</p>
          <p className="text-sm text-base-content/70">
            {strings.settings.privacyDesc}
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          {privacySettingConfig.map((config) => (
            <SettingsOption
              key={config.setting}
              icon={config.icon}
              title={settingOptions.find((m) => m.value === config.setting).label}
              description={config.description}
              error={
                erroredSetting === config.setting
                  ? strings.settings.couldntSave
                  : undefined
              }
              controlLabel={
                strings.formatString(strings.settings.whoCanSee, {
                  field: settingOptions.find((m) => m.value === config.setting).label.toLowerCase(),
                }) as string
              }
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
          <p className="text-md font-medium">{strings.settings.account}</p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden">
          <SettingsOption
            icon={<HiOutlineArrowRightOnRectangle />}
            title={strings.settings.logOut}
            description={strings.settings.logOutDesc}
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
          <h3 className="font-bold text-lg">{strings.settings.logoutModalTitle}</h3>
          <p className="py-4">{strings.settings.logoutModalBody}</p>
          <div className="modal-action">
            <div className="flex flex-row gap-2">
              <form method="dialog">
                <Button
                  onClick={() =>
                    (document.getElementById("logoutModal") as any).close()
                  }
                  className={`btn btn-ghost ${logoutLoading ? "btn-disabled" : ""}`}
                >
                  {strings.common.cancel}
                </Button>
              </form>
              <Button
                onClick={onLogout}
                loading={logoutLoading}
                className="btn btn-primary"
              >
                {strings.settings.logoutConfirm}
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SettingsPage;
