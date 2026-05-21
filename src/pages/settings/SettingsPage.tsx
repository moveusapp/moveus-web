import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import { ReactNode, useCallback } from "react";
import {
  PrivacyScope,
  PrivacySetting,
  LogOutDocument,
} from "@/graphql/graphql-types";
import {
  HiOutlineMapPin,
  HiOutlineCake,
  HiOutlineUserCircle,
  HiOutlineEnvelope,
  HiOutlineUserGroup,
  HiOutlineRectangleStack,
} from "react-icons/hi2";
import { apolloClient } from "@/appolo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import Button from "@/components/ui/Button";
import { clearStoredProfile } from "@/utils/auth";
import PageHeader from "@/components/layout/PageHeader";
import PrivacySettingRow from "./PrivacySettingRow";

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

function SettingsPage() {
  useDocumentTitle("Settings");

  const { profile, setProfile } = useProfile();

  const [logout, { loading: logoutLoading }] = useMutation(LogOutDocument);
  const navigate = useNavigate();

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

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Settings" />

      <div className="flex flex-col grow gap-2 m-4">
        <div className="mb-1">
          <p className="text-md font-medium">Privacy</p>
          <p className="text-sm text-base-content/70">
            Choose who can see each part of your profile.
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 divide-y divide-base-300 overflow-hidden">
          {privacySettingConfig.map((config) => (
            <PrivacySettingRow
              key={config.setting}
              setting={config.setting}
              scope={scopeFor(config.setting)}
              label={config.label}
              description={config.description}
              icon={config.icon}
            />
          ))}
        </div>

        <button
          className="btn btn-error btn-outline mt-auto"
          onClick={() =>
            (document.getElementById("logoutModal") as any).showModal()
          }
        >
          Logout
        </button>
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
