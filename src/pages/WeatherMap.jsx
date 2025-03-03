/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCoordinates } from "../middleware/data-api"; 
import { useWeather } from "../context/WeatherContext";
import { useMap } from "react-leaflet";


function MapUpdater({ coords }) {
    const map = useMap();

    useEffect(() => {
     if (coords.lat && coords.lng){
        map.setView([coords.lat, coords.lng], map.getZoom(), {anitame: true});
     }
    }, [coords, map]);
    
    return null;
}

export default function WeatherMap() { 
    const { city } = useWeather();
    const [coords, setCoords] = useState({ lat: 51.505, lng: -0.09 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If there is no city, return
        if (!city) return; 

        setLoading(true);

        getCoordinates(city)
        .then((newCoords) => {
            if (newCoords) {
                console.log("Coordinates:", newCoords);
                setCoords(newCoords);
                setLoading(false);
            }else {
                console.log("Failed to fetch coordinates.");
                setLoading(false);
            }
        })
        .catch((err) => console.error("Error fetching coordinates:", err.message));
        setLoading(false);
}, [city]);

if (loading) return <p>Loading map...</p>;

    // Check if coords is defined
    return  (
        <MapContainer center={[coords.lat, coords.lng]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <MapUpdater coords={coords} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coords.lat, coords.lng]}>
                <Popup>{city ? `Weather in ${city}` : "Weather location"}</Popup>
            </Marker>
        </MapContainer>
    // Message if coords is not defined    
   );
}
