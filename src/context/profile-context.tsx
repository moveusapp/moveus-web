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
} from "@/utils/auth-storage";

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

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<ContextProfileFragment | null>(
    () => getStoredProfile(),
  );

  const { data } = useQuery(GetMyProfileDocument, {
    skip: !getStoredProfile(),
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.myProfile) {
      setProfile(data.myProfile);
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      setStoredProfile(profile);
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
