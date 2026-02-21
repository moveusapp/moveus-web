import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import useProfileLocation from "@/hooks/use-profile-location";

export function ProtectedRoutes() {
  useProfileLocation();

  const { profile } = useProfile();

  return profile ? <Outlet /> : <Navigate to="/login" replace />;
}
