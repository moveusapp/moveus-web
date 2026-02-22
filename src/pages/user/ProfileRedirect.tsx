import { useProfile } from "@/context/profile-context";
import { Navigate } from "react-router-dom";

function ProfileRedirect() {
  const { profile } = useProfile();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return <Navigate to={`/user/${profile.username}`} replace />;
}

export default ProfileRedirect;
