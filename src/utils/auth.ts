import { ContextProfileFragment } from "@/graphql/graphql-types";

const PROFILE_KEY = "profile";
const PENDING_EMAIL_KEY = "pending-verification-email";

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

export const getPendingVerificationEmail = (): string | null =>
  localStorage.getItem(PENDING_EMAIL_KEY);

export const setPendingVerificationEmail = (email: string) => {
  localStorage.setItem(PENDING_EMAIL_KEY, email);
};

export const clearPendingVerificationEmail = () => {
  localStorage.removeItem(PENDING_EMAIL_KEY);
};
