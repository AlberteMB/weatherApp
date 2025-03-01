// Using useCallback because we want to memoize the function
import { useState, useCallback, useContext, useEffect } from "react";
//import axios from "axios";
import '../style/App.css'
import { getWeather, getForecast } from "../middleware/data-api";  
import { WeatherContext } from "../context/WeatherContext"; 

export default function Weather() {
  const { city, setCity } = useContext(WeatherContext);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
 
  const fetchWeatherData = useCallback(async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
  
      const forecastData = await getForecast(city);
      setForecast(forecastData);
    } catch (err) { 
      setError(`${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity, fetchWeatherData]);

  const handleSearch = () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setSelectedCity(city);
  };

  const selectFavoriteCity = (city) => {
    setSelectedCity(city);
    setCity(city); 
  };

  const handleFavorites = () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setFavoriteCities((prevFavorites) => {
      if (prevFavorites.includes(city)) {
        return prevFavorites.filter((favCity) => favCity !== city);
      }
      if (prevFavorites.length >= 5) {
        setError("You have reached the maximum number of favorite cities.");
        return prevFavorites;
      }
      return [...prevFavorites, city];
    });
  };
  return (
    <div>
      <h1>Weather Tracker</h1>
      <div style= {{ display: "flex", gap: "10px"}}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      
        <button onClick={handleFavorites} style={{ marginLeft: '10px' }}>
          {favoriteCities.includes(city) ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {favoriteCities.map((city, index) => (
          <button key={index} onClick={() => selectFavoriteCity(city)}>
            {city}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="container-style">
        <h2>Current Weather in {weather.name}</h2>
        <p>
          Temperature:{" "}
          <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>{Math.round(weather.main.temp)}</span> °C
        </p>
        <p>
          Min Temperature:{" "}
          <span style={{ fontWeight: "bold" }}>{Math.round(weather.main.temp_min)}</span> °C
        </p>
        <p>
          Max Temperature:{" "}
          <span style={{ fontWeight: "bold" }}>{Math.round(weather.main.temp_max)}</span> °C
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
                Temp:<b>{Math.round(day.main.temp)}</b> °C
              </p>
              <p>
                Min Temp:<b>{Math.round(day.main.temp_min)}</b> °C
              </p>
              <p>
                Max Temp:<b>{Math.round(day.main.temp_max)}</b> °C
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


