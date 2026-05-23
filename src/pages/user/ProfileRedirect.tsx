import { useProfile } from "@/context/profile-context";
import { Navigate } from "react-router-dom";
import strings from "@/translations/strings";

function ProfileRedirect() {
  const { profile } = useProfile();

  if (!profile) {
    return <div>{strings.profile.loading}</div>;
  }

  return <Navigate to={`/user/${profile.username}`} replace />;
}

export default ProfileRedirect;
