import { ReactNode, useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  AlterPrivacySettingDocument,
  ContextProfileFragment,
  PrivacyScope,
  PrivacySetting,
} from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";

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

interface PrivacySettingRowProps {
  setting: PrivacySetting;
  scope: PrivacyScope;
  label: string;
  description: string;
  icon: ReactNode;
}

function PrivacySettingRow({
  setting,
  scope,
  label,
  description,
  icon,
}: PrivacySettingRowProps) {
  const { setProfile } = useProfile();
  const [alterPrivacySetting, { loading }] = useMutation(
    AlterPrivacySettingDocument,
  );
  const [error, setError] = useState(false);

  const handleChange = (newScope: PrivacyScope) => {
    if (newScope === scope) return;
    const previousScope = scope;
    setError(false);

    setProfile((p) =>
      p ? { ...p, privacySettings: withScope(p.privacySettings, setting, newScope) } : p,
    );

    alterPrivacySetting({ variables: { setting, scope: newScope } }).catch(() => {
      setError(true);
      setProfile((p) =>
        p
          ? { ...p, privacySettings: withScope(p.privacySettings, setting, previousScope) }
          : p,
      );
    });
  };

  return (
    <div className="flex flex-row items-center justify-between gap-3 p-4">
      <div className="flex flex-row items-center gap-3.5 min-w-0">
        <span aria-hidden className="shrink-0 text-xl text-base-content/40">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p
            className={`text-xs ${error ? "text-error" : "text-base-content/70"}`}
          >
            {error ? "Couldn't save that, try again." : description}
          </p>
        </div>
      </div>

      <select
        aria-label={`Who can see your ${label.toLowerCase()}`}
        className="select rounded-2xl bg-base-100 w-32 shrink-0"
        value={scope}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value as PrivacyScope)}
      >
        {scopeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PrivacySettingRow;
