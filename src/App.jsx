import { Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import About from './pages/About.jsx';
import Weather from './pages/Weather.jsx'
import Home from './pages/Home.jsx';
import Layout from './layout/Layout.jsx';
import NoPage from './pages/NoPage.jsx';
import WeatherMap from './pages/WeatherMap.jsx';
import { WeatherProvider } from "./context/WeatherContext.jsx";

export default function App() {
  return (
    
    <WeatherProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="weatherMap" element={<WeatherMap />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </WeatherProvider>
    
  );
};


