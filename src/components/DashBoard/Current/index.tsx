import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Container, Info, Span, Button } from "./styled";

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
      <Info>
        <div>
          <Span>城市名稱:</Span> <p>{cityName || "未知城市"}</p>
        </div>
        <div>
          <Span>所在時區:</Span> <p>{timezone || "未知地區"}</p>
        </div>
        <div>
          <Span>當前溫度: </Span>
          <p>
            {temperature.toFixed(1)}° {isCelsius ? "C" : "F"}
          </p>
        </div>
        <div>
          <Span>天氣狀況:</Span>
          <p> {mapWeatherCode(weathercode)}</p>
        </div>
        <div>
          <Span>風速:</Span>
          <p>{windspeed_10m} km/h</p>
        </div>
        <div>
          <Span>濕度: </Span>
          <p>{relative_humidity_2m} %</p>
        </div>
      </Info>
      <Button onClick={() => addToFavorites(cityName, latitude, longitude)}>
        加入最愛
      </Button>
    </Container>
  );
};

export default Current;
