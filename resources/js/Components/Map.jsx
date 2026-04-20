import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useMemo } from "react";

const defaultCenter = {
  lat: 47.918873,
  lng: 106.917701,
};

export default function Map({
  markers = [],
  selectedId = null,
  onMarkerClick,
  onMapClick,
}) {
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    id: "script-loader",
    libraries: ["places"], 
})

  const center = useMemo(() => {
    if (markers.length > 0) {
      return {
        lat: Number(markers[0].lat),
        lng: Number(markers[0].lng),
      };
    }
    return defaultCenter;
  }, [markers]);

  useEffect(() => {
    if (!isLoaded || !map || !markers.length || !window.google) return;

    const bounds = new window.google.maps.LatLngBounds();

    markers.forEach((m) => {
      bounds.extend({
        lat: Number(m.lat),
        lng: Number(m.lng),
      });
    });

    map.fitBounds(bounds);
  }, [isLoaded, map, markers]);

  if (loadError) {
    return <div>Google Map ачааллахад алдаа гарлаа.</div>;
  }

  if (!isLoaded) {
    return <div>Газрын зураг ачааллаж байна...</div>;
  }

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      onLoad={(mapInstance) => setMap(mapInstance)}
      onClick={(e) => {
        if (!onMapClick || !e.latLng) return;
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }}
    >
      {markers.map((m) => (
        <Marker
          key={m.id ?? `${m.lat}-${m.lng}`}
          position={{
            lat: Number(m.lat),
            lng: Number(m.lng),
          }}
          onClick={() => onMarkerClick?.(m.id)}
          icon={{
            url:
              selectedId === m.id
                ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}
    </GoogleMap>
  );
}