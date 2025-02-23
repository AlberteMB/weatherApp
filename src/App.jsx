import { Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import About from './pages/About.jsx';
import Weather from './pages/Weather.jsx'
import Home from './pages/Home.jsx';
import Layout from './layout/Layout.jsx';
import NoPage from './pages/NoPage.jsx';
import Map from './pages/WeatherMap.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="map" element={<Map />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
};


