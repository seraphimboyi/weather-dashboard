import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Container, Ul, Li, Button } from "./styled";

type TypeCurrentProps = {
  weatherData: WeatherApiResponse;
  cityName: string;
  isCelsius: boolean;
  addToFavorites: (city: string, lat: number, lon: number) => void;
};

const Current: React.FC<TypeCurrentProps> = ({
  weatherData,
  cityName,
  isCelsius,
  addToFavorites,
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

  const latitude = weatherData.latitude ?? null;
  const longitude = weatherData.longitude ?? null;

  const temperature = isCelsius
    ? temperature_2m
    : (temperature_2m * 9) / 5 + 32;

  return (
    <Container>
      <Ul>
        <Li>城市名稱: {cityName || "未知城市"}</Li>
        <Li>所在時區: {timezone || "未知地區"}</Li>
        <Li>
          當前溫度: {temperature.toFixed(1)}°{isCelsius ? "C" : "F"}
        </Li>
        <Li>天氣狀況: {mapWeatherCode(weathercode)}</Li>
        <Li>風速: {windspeed_10m} km/h</Li>
        <Li>濕度: {relative_humidity_2m}%</Li>
      </Ul>
      <Button onClick={() => addToFavorites(cityName, latitude, longitude)}>
        加入最愛
      </Button>
    </Container>
  );
};

export default Current;
