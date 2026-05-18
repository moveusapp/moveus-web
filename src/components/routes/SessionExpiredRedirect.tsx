import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onSessionExpired } from "@/utils/auth";

export function SessionExpiredRedirect() {
  const navigate = useNavigate();

  useEffect(
    () => onSessionExpired(() => navigate("/login", { replace: true })),
    [navigate],
  );

  return null;
}
