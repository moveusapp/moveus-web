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
import {
  getStoredProfile,
  setStoredProfile,
} from "@/utils/auth";

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
    throw new Error("useProfile must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<ContextProfileFragment | null>(
    () => getStoredProfile(),
  );

  // Cache-first: localStorage seeds the initial paint (see getStoredProfile),
  // then Apollo's cache is the source of truth. `network-only` here used to
  // re-fetch on every provider remount; that was wasteful since login/signup
  // mutations write the profile into the cache and subscriptions keep it warm.
  const { data } = useQuery(GetMyProfileDocument, {
    skip: !profile,
  });

  useEffect(() => {
    if (data?.myProfile) setProfile(data.myProfile);
  }, [data]);

  useEffect(() => {
    if (profile) setStoredProfile(profile);
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
