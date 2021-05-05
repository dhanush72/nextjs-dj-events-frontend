import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import GeoCode from "react-geocode";

const EventMap = ({ event }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    with: "100%",
    height: "500px",
    zoom: 12,
  });

  GeoCode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    GeoCode.fromAddress(event.address).then(
      (res) => {
        const { lat, lang } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lang);
        setViewport({ ...viewport, latitude: lat, longitude: lang });
        setLoading(false);
      },
      (error) => console.log(error)
    );
  }, []);

  if (loading) return false;

  console.log(lat, lag);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={event.id} latitude={lat} longitude={lng}>
        <Image src={"/images/pin.svg"} width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
};

export default EventMap;
