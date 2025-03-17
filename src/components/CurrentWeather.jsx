import React from "react";

const CurrentWeather = ({currentWeather}) => {
  return (
    <div className="current-weather">
      {currentWeather.city && <h1 style={{color:"white"}}>{currentWeather.city}</h1>}
      <img src={`icons/${currentWeather.weatherIcon}.svg`} className="weather-icon" />
      <h2 className="temparature">
        {currentWeather.tempr}<span>&deg;C</span>{" "}
      </h2>
      <p className="desc">{currentWeather.desc}</p>
     </div>
  );
};

export default CurrentWeather;
