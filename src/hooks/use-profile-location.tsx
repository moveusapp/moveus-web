import { useEffect, useRef } from "react";
import { apolloClient } from "@/appolo/client";
import { useProfile } from "@/context/profile-context";
import { UpdateLocationDocument } from "@/graphql/generated";

function useProfileLocation() {
  const { profile } = useProfile();
  const prevUserId = useRef<number>(null);
  const watchId =
    useRef<ReturnType<typeof navigator.geolocation.watchPosition>>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const profileId = profile ? profile.id! : null;

    if (profileId === prevUserId.current) return;

    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    prevUserId.current = profileId;

    if (profileId === null) return;

    watchId.current = navigator.geolocation.watchPosition(
      (postition) => {
        const { longitude, latitude } = postition.coords;
        apolloClient
          .mutate({
            mutation: UpdateLocationDocument,
            variables: { longitude, latitude },
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
            break;
        }
      },
    );
  }, [profile, prevUserId]);
}

export default useProfileLocation;
