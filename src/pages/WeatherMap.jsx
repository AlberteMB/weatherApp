import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCoordinates } from "../middleware/data-api"; 
import PropTypes from "prop-types";


export default function WeatherMap({ city }) { 
    const [coords, setCoords] = useState({ lat: 51.505, lon: -0.09 });

    useEffect(() => {
        // If there is no city, return
        if (!city) return; 

        getCoordinates(city)
            .then((newCoords) => setCoords(newCoords))
            .catch((err) => console.error(err.message));
    // Execute when city changes
    }, [city]); 

    return (
        <MapContainer center={[coords.lat, coords.lon]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coords.lat, coords.lon]}>
                <Popup>{city ? `Weather in ${city}` : "Weather location"}</Popup>
            </Marker>
        </MapContainer>
    );
}

WeatherMap.propTypes = {
    // city must be a string
    city: PropTypes.string.isRequired, 
  };
