import { useState, useEffect } from "react";
//import axios from "axios";
import '../style/App.css'
import { getWeather, getForecast } from "../middleware/data-api";  

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
  
      const forecastData = await getForecast(city);
      setForecast(forecastData);
    } catch (err) { 
      setError(`Failed to fetch weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch default data on load if needed 

  return (
    <div>
      <h1>Weather Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="container-style">
          <h2>Current Weather in {weather.name}</h2>
          <p>
            Temperature:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {" "}
              {weather.main.temp}
            </span>
            °C
          </p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="container-style">
          <h2>5-Day Forecast</h2>
          {forecast.map((day, index) => (
            <div key={index}>
              <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>
                Temp:<b>{day.main.temp}</b> °C
              </p>
              <p>Condition: {day.weather[0].description}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


