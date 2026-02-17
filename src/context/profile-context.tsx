import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ContextProfileFragment,
  FetchProfileDocument,
} from "@/graphql/generated";
import { apolloClient } from "@/appolo/client";

type ProfileContextType = {
  profile: ContextProfileFragment | null;
  setProfile: React.Dispatch<
    React.SetStateAction<ContextProfileFragment | null>
  >;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const getProfileFromLS = () => {
  const profile: ContextProfileFragment = JSON.parse(
    localStorage.getItem("profile") ?? "null",
  );
  if (!profile) return null;
  if (profile.dateOfBirth) profile.dateOfBirth = new Date(profile.dateOfBirth);
  if (profile.lastLogin) profile.lastLogin = new Date(profile.lastLogin);
  return profile;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<ContextProfileFragment | null>(
    getProfileFromLS(),
  );

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile, setProfile]);

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      apolloClient
        .query({
          query: FetchProfileDocument,
        })
        .then((result) => {
          setProfile(result.data.myProfile);
        })
        .catch((_) => {
          setProfile(null);
        });
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
