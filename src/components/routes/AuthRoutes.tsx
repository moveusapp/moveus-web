import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "@/context/profile-context";

export function AuthRoutes() {
  const { profile } = useProfile();

  return !profile ? <Outlet /> : <Navigate to="/home" replace />;
}
