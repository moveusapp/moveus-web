import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const DefaultLocation: LocationCoordinates = {
  lat: 45.8150,
  lng: 15.9819,
};
const DefaultZoom = 20;

function LocationPicker({
  location,
  setLocation,
  classname,
  width = "100%",
  height = 400,
}: LocationPickerInterface) {
  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng)
      setLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_API as string,
  });

  const [center, setCenter] = useState<LocationCoordinates | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition((postition) => {
        const { longitude, latitude } = postition.coords;
        setCenter({
          lat: latitude,
          lng: longitude
        })
    })
  }, [])

  return !isLoaded ? (
    <></>
  ) : (
    <GoogleMap
      center={center ?? DefaultLocation}
      zoom={DefaultZoom}
      mapContainerClassName={classname}
      mapContainerStyle={{ width, height }}
      onClick={handleClick}
    >
      <Marker position={location ?? center ?? DefaultLocation} />
    </GoogleMap>
  );
}

export default LocationPicker;

interface LocationPickerInterface {
  location: LocationCoordinates | null;
  setLocation: (location: LocationCoordinates) => void;
  classname?: string;
  width?: number | string;
  height?: number | string;
}
