//import React from 'react';
import { Link } from 'react-router-dom'; 
import './style/styles.css'

export default Home;

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-message">¡Welcome to Weather Tracker!</h1>
      <p className="description">
      A simple and accurate app to track real-time weather conditions anywhere.
      </p>
      <div className="links-container">
        <Link to="/weather" className="link">
          Weather
        </Link>
        <Link to="/map" className="link">
          Map
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
      </div>
    </div>
  );
};
