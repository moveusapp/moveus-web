import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import useTheme from "@/hooks/use-theme";
import { ReactNode, useState } from "react";
import {
  AlterPrivacySettingDocument,
  ContextProfileFragment,
  PrivacyScope,
  PrivacySetting,
} from "@/graphql/graphql-types";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCake,
  HiOutlineMapPin,
  HiOutlineMoon,
  HiOutlineRectangleStack,
  HiOutlineTrash,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiLanguage,
} from "react-icons/hi2";
import { useMutation } from "@apollo/client/react";
import PageHeader from "@/components/layout/PageHeader";
import SettingsOption from "./SettingsOption";
import LogoutModal from "./LogoutModal";
import DeleteAccountModal from "./DeleteAccountModal";
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

  const [alterPrivacySetting] = useMutation(AlterPrivacySettingDocument);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
    {
      setting: PrivacySetting.Messages,
      description: strings.settings.messagesDesc,
      icon: <HiOutlineChatBubbleLeftRight />,
    },
  ];

  const scopeOptions = enumToOptions(PrivacyScope, "enums.privacyScope");

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
          {privacySettingConfig.map((config) => {
            const label =
              settingOptions.find((m) => m.value === config.setting)?.label ?? "";
            return (
            <SettingsOption
              key={config.setting}
              icon={config.icon}
              title={label}
              description={config.description}
              error={
                erroredSetting === config.setting
                  ? strings.settings.couldntSave
                  : undefined
              }
              controlLabel={
                strings.formatString(strings.settings.whoCanSee, {
                  field: label.toLowerCase(),
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
            );
          })}
        </div>

        <div className="mt-3 mb-1">
          <p className="text-md font-medium">{strings.settings.account}</p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          <SettingsOption
            icon={<HiOutlineArrowRightOnRectangle />}
            title={strings.settings.logOut}
            description={strings.settings.logOutDesc}
            control={{
              kind: "action",
              tone: "danger",
              onClick: () => setLogoutOpen(true),
            }}
          />
          <SettingsOption
            icon={<HiOutlineTrash />}
            title={strings.settings.deleteAccount}
            description={strings.settings.deleteAccountDesc}
            control={{
              kind: "action",
              tone: "danger",
              onClick: () => setDeleteOpen(true),
            }}
          />
        </div>
      </div>

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        username={profile?.username ?? ""}
      />
    </div>
  );
}

export default SettingsPage;
