import { ContextProfileFragment } from "@/graphql/graphql-types";

const PROFILE_KEY = "profile";
const SESSION_EXPIRED = "moveus:session-expired";

export const getStoredProfile = (): ContextProfileFragment | null => {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  const profile = JSON.parse(raw) as ContextProfileFragment | null;
  if (!profile) return null;
  if (profile.dateOfBirth) profile.dateOfBirth = new Date(profile.dateOfBirth);
  if (profile.lastLogin) profile.lastLogin = new Date(profile.lastLogin);
  return profile;
};

export const setStoredProfile = (profile: ContextProfileFragment) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const clearStoredProfile = () => {
  localStorage.removeItem(PROFILE_KEY);
};

export const emitSessionExpired = () => {
  window.dispatchEvent(new Event(SESSION_EXPIRED));
};

export const onSessionExpired = (handler: () => void) => {
  window.addEventListener(SESSION_EXPIRED, handler);
  return () => window.removeEventListener(SESSION_EXPIRED, handler);
};
