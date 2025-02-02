import { useState } from "react";
import "./App.css";
import SearchLocation from "./components/SearchLocation";
import WeatherCard from "./components/WeatherCard";
import { getForcastData } from "./utils/weatherUtility"


function App() {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [forecastData, setForecastData] = useState([]);

  const handleSubmit = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && e.target.value !== "") {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setWeather(result);

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response2 = await fetch(url2);
        if (!response2.ok) {
          throw new Error(`Response status: ${response2.status}`);
        }

        const result2 = await response2.json();
        const data = getForcastData(result2.list);

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
