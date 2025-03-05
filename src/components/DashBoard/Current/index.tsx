import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";

type TypeCurrentProps = {
  weatherData: WeatherApiResponse;
};

const Current: React.FC<TypeCurrentProps> = ({ weatherData }) => {
  const {
    timezone,
    current: {
      temperature_2m,
      weathercode,
      windspeed_10m,
      relative_humidity_2m,
    },
  } = weatherData;

  return (
    <div>
      <h2>即時天氣狀況</h2>
      <p>城市名稱: {timezone || "未知地區"}</p>
      <p>當前溫度: {temperature_2m}°C</p>
      <p>天氣狀況: {mapWeatherCode(weathercode)}</p>
      <p>風速: {windspeed_10m} km/h</p>
      <p>濕度: {relative_humidity_2m}%</p>
    </div>
  );
};

export default Current;
