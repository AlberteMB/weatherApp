import { createContext, useState, useContext } from "react";
// Adding prop-types for type checking


// Creating context
export const WeatherContext = createContext();

// eslint-disable-next-line react/prop-types
export function WeatherProvider  ({ children }) {
    const [city, setCity] = useState("Barcelona");

    return (
        // Passing city and setCity to children 
        <WeatherContext.Provider value={{ city, setCity }}>
        {/* Rendering children */}    
            {children}
        </WeatherContext.Provider>  
    );
};


  export function useWeather() {
    return useContext(WeatherContext);
  }