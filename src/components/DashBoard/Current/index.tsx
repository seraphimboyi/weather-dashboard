import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Title, Container, Ul, Li } from "./styled";

type TypeCurrentProps = {
  weatherData: WeatherApiResponse;
  cityName: string;
  isCelsius: boolean; // 🔹 新增屬性來控制溫度顯示
};

const Current: React.FC<TypeCurrentProps> = ({
  weatherData,
  cityName,
  isCelsius,
}) => {
  const {
    timezone,
    current: {
      temperature_2m,
      weathercode,
      windspeed_10m,
      relative_humidity_2m,
    },
  } = weatherData;

  const temperature = isCelsius
    ? temperature_2m
    : (temperature_2m * 9) / 5 + 32;

  return (
    <Container>
      <Title>即時天氣狀況</Title>
      <Ul>
        <Li>時區: {timezone || "未知地區"}</Li>
        <Li>城市名稱: {cityName || "未知城市"}</Li>
        <Li>
          當前溫度: {temperature.toFixed(1)}°{isCelsius ? "C" : "F"}
        </Li>
        <Li>天氣狀況: {mapWeatherCode(weathercode)}</Li>
        <Li>風速: {windspeed_10m} km/h</Li>
        <Li>濕度: {relative_humidity_2m}%</Li>
      </Ul>
    </Container>
  );
};

export default Current;
