import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const DefaultLocation: LocationCoordinates = {
  lat: 45.35162319643463,
  lng: 14.107586146829604,
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

  return !isLoaded ? (
    <></>
  ) : (
    <GoogleMap
      center={DefaultLocation}
      zoom={DefaultZoom}
      mapContainerClassName={classname}
      mapContainerStyle={{ width, height }}
      onClick={handleClick}
    >
      <Marker position={location ?? DefaultLocation} />
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
