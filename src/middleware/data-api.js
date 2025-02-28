import axios from "axios";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const handleAxiosError = (error, customMessage) => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(`${customMessage}: ${error.response.data.message}`);
  } else {
    throw new Error(`${customMessage}: ${error.message}`);
  }
};

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`// &units=metric for Celsius
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to fetch weather data");
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data.list.filter((_, i) => i % 8 === 0);
  } catch (error) {
    handleAxiosError(error, "Failed to fetch forecast data");
  }
};

export const getCoordinates = async (city) => {
  if (!city) throw new Error("City is required to fetch coordinates.");

  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return { lat: response.data.coord.lat, lon: response.data.coord.lon };
  } catch (error) {
    handleAxiosError(error, "Failed to fetch coordinates");
  }
};