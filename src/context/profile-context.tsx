import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ContextProfileFragment,
  GetMyProfileDocument,
} from "@/graphql/graphql-types";
import { useQuery } from "@apollo/client/react";

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
    () => getProfileFromLS(),
  );

  const { data } = useQuery(GetMyProfileDocument, {
    skip: !localStorage.getItem("profile"),
    fetchPolicy: "cache-first"
  });

  useEffect(() => {
    if (data?.myProfile) {
      setProfile(data.myProfile);
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
