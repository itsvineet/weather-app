import { useState } from "react";
import "./App.css";
import SearchLocation from "./components/SearchLocation";
import WeatherCard from "./components/WeatherCard";
import { getForcastData } from "./utils/weatherUtility";

function App() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [forecastData, setForecastData] = useState([]);

  const handleSubmit = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && e.target.value !== "") {
      setLoading(true);
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      console.log("ÁPIKEY", apiKey )
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setWeather(result);

        const forcast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const forcast_response = await fetch(forcast_url);
        if (!forcast_response.ok) {
          throw new Error(`Response status: ${forcast_response.status}`);
        }

        const forcast_result = await forcast_response.json();
        const data = getForcastData(forcast_result.list);
        setForecastData(data);

        setError(false);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(true);
        setWeather({});
        setForecastData({});
        setLoading(false);
      }
    }
  };

  return (
    <div class="App">
      <SearchLocation
        city={city}
        setCity={setCity}
        handleSubmit={handleSubmit}
      />
      <WeatherCard
        weather={weather}
        forecastData={forecastData}
        city={city}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
