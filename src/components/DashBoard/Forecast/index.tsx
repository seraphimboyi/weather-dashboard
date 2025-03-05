import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";

type TypeForecastProps = {
  weatherData: WeatherApiResponse;
};

const Forecast: React.FC<TypeForecastProps> = ({ weatherData }) => {
  const {
    daily: { time, weathercode, temperature_2m_min, temperature_2m_max },
  } = weatherData;

  return (
    <div>
      <h2>未來 5 天天氣預報</h2>
      <ul>
        {time.map((date, index) => (
          <li key={date}>
            {date} - {mapWeatherCode(weathercode[index])}
            {temperature_2m_min[index]}°C ~ {temperature_2m_max[index]}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
