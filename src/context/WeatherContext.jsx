import { createContext, useState, useContext } from "react";
// Adding prop-types for type checking
import PropTypes from "prop-types";

// Creating context
export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState("");

    return (
        // Passing city and setCity to children 
        <WeatherContext.Provider value={{ city, setCity }}>
        {/* Rendering children */}    
            {children}
        </WeatherContext.Provider>  
    );
};
// Validation with prop-typess
WeatherProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export function useWeather() {
    return useContext(WeatherContext);
  }