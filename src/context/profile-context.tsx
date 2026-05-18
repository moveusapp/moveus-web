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
import { useApolloClient } from "@apollo/client/react";
import {
  clearStoredProfile,
  getStoredProfile,
  setStoredProfile,
  onSessionExpired,
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const apollo = useApolloClient();
  const [profile, setProfile] = useState<ContextProfileFragment | null>(
    () => getStoredProfile(),
  );

  const { data, refetch } = useQuery(GetMyProfileDocument, {
    skip: !profile,
    fetchPolicy: "network-only",
    // `all` so we still get `data` (with `myProfile: null`) when the backend
    // returns the response alongside an auth error — lets the effect below
    // clear the profile even if the global error link missed the signal.
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data === undefined) return;
    if (data.myProfile) {
      setProfile(data.myProfile);
    } else {
      // Server says we are no longer authenticated.
      setProfile(null);
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      setStoredProfile(profile);
    } else {
      clearStoredProfile();
    }
  }, [profile]);

  useEffect(() => {
    return onSessionExpired(() => {
      setProfile(null);
      clearStoredProfile();
      void apollo.clearStore();
    });
  }, [apollo]);

  // Re-validate the session whenever the tab regains focus or comes back
  // online — catches expirations that happen while the app is idle.
  useEffect(() => {
    const revalidate = () => {
      if (document.visibilityState === "visible" && getStoredProfile()) {
        void refetch();
      }
    };
    document.addEventListener("visibilitychange", revalidate);
    window.addEventListener("focus", revalidate);
    window.addEventListener("online", revalidate);
    return () => {
      document.removeEventListener("visibilitychange", revalidate);
      window.removeEventListener("focus", revalidate);
      window.removeEventListener("online", revalidate);
    };
  }, [refetch]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
