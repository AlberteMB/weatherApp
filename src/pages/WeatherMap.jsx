import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCoordinates } from "../middleware/data-api"; 
import { WeatherContext } from "../context/WeatherContext"; 

export default function WeatherMap() { 
    const { city } = useContext(WeatherContext);
    const [coords, setCoords] = useState({ lat: 51.505, lon: -0.09 });

    useEffect(() => {
        // If there is no city, return
        if (!city) return; 

        getCoordinates(city)
        .then((newCoords) => {
            if (newCoords && newCoords.lat && newCoords.lon) {
                console.log("Coordinates:", newCoords);
                setCoords(newCoords);
            }else {
                console.log("Failed to fetch coordinates.");
            }
        })
        .catch((err) => console.error("Error fetching coordinates:", err.message));
}, [city]);

    // Check if coords is defined
    return coords ? (
        <MapContainer center={[coords.lat, coords.lon]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coords.lat, coords.lon]}>
                <Popup>{city ? `Weather in ${city}` : "Weather location"}</Popup>
            </Marker>
        </MapContainer>
    // Message if coords is not defined    
   ) : <p>Loading map...</p>;
}
