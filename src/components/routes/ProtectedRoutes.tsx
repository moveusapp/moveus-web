import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "@/context/profile-context";

export function ProtectedRoutes() {
  const { profile } = useProfile();

  return profile ? <Outlet /> : <Navigate to="/login" replace />;
}
