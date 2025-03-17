import Searchsection from "./components/Searchsection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWEATHER from "./components/HourlyWeather";
import NoResultsDiv from "./components/NoResultsDiv";
import { useRef, useState, useEffect } from "react"; // Import useEffect
import { weatherCodes } from "./constants";

// Define API_KEY (assuming you're using Vite)
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [NoResults, setHasNoReslts] = useState(false);
  const searchInputRef = useRef(null);
  
  // Filter hourly data to get only the next 24 hours of forecasts
  const filterHourlyData = (hourlyData) => {
    const currHour = new Date();
    currHour.setMinutes(0, 0, 0);
    const currTime = currHour.getTime();
    const next24 = currTime + 24 * 60 * 60 * 1000;

    const next24hrsData = hourlyData.filter((item) => {
      const forecastTime = new Date(item.time).getTime();
      return forecastTime >= currTime && forecastTime <= next24;
    });

    setHourlyForecasts(next24hrsData);
  };

  // Fetch weather details from API
  const getweather = async (API_URL) => {
    setHasNoReslts(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data);

      // Extract current weather data
      const tempr = data.current.temp_c;
      const desc = data.current.condition.text;
      const city = data.location.name;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      setCurrentWeather({ tempr, desc, weatherIcon ,city});

      // Combine hourly forecast data from all available forecast days
      const combinedHourlyData = data.forecast.forecastday.reduce(
        (acc, day) => [...acc, ...day.hour],
        []
      );

      // Filter combined hourly data for the next 24 hours
      filterHourlyData(combinedHourlyData);
    } catch {
      setHasNoReslts(true);
    }
  };

  // Fetch default city (London) weather data on initial render
  useEffect(() => {
    const defaultCity = "London";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getweather(API_URL); // Use the correct function name
  }, []);

  return (
    <div className="container">
      {/* Search section */}
      <Searchsection getWeatherDetails={getweather} searchInputRef={searchInputRef}/>
      
      {/* Conditionally render based on NoResults state */}
      {NoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((item) => (
                <HourlyWEATHER key={item.time_epoch} data={item} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
