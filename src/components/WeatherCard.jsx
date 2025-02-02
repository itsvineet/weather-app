import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { toDateFunction, getForcastData } from "../utils/weatherUtility";
import "../styles/weathercard.css";
import ForcastCard from "./ForcastCard";

function WeatherCard({ weather, forecastData, city, loading, error }) {
  const [isCelsius, setIsCelsius] = useState(true);
  
  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <>
      {loading && <CircularProgress />}
      {error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.name}, <span>{weather.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="current-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <span>
              {renderTemperature(weather.main.temp)}
              <sup className="deg" onClick={toggleTemperatureUnit}>
                {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
              </sup>
            </span>
          </div>
          <div className="weather-description">
            {weather.weather[0].description.toUpperCase()}
          </div>
          <div className="weather-info">
            <div>
              <p className="wind">{weather.wind.speed} m/s</p>
              <p>Wind speed</p>
            </div>
            <div>
              <p className="humidity">{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      )}
      {forecastData && forecastData.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast:</h3>
          <div className="forecast-container">
            {forecastData &&
              forecastData.slice(0, 5).map((day) => (
                // <div className="day" key={day.dt}>
                //   {/* <p className="day-name">{formatDay(day.dt_txt.split(" ")[0])}</p> */}
                //   {day.weather[0].icon && (
                //     <img
                //       className="day-icon"
                //       // src={day.weather[0].icon}
                //       src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                //       alt={day.weather[0].description}
                //     />
                //   )}
                //   <p className="day-temperature">
                //     {Math.round(day.main.temp_min)}° /{" "}
                //     <span>{Math.round(day.main.temp_max)}°</span>
                //   </p>
                // </div>
                <ForcastCard day={day} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;
