import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Container, Span, Button, P, City, Info } from "./styled";

type CurrentProps = {
  weatherData: WeatherApiResponse;
  cityName: string;
  isCelsius: boolean;
  addToFavorites: (city: string, lat: number, lon: number) => void;
};

const Current: React.FC<CurrentProps> = ({
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
      <City>
        <Span>城市名稱:</Span> <P>{cityName || "未知城市"}</P>
        <Span>所在時區:</Span> <P>{timezone || "未知地區"}</P>
      </City>
      <Info>
        <Span>當前溫度: </Span>
        <P>
          {temperature.toFixed(1)}° {isCelsius ? "C" : "F"}
        </P>
        <Span>天氣:</Span>
        <P> {mapWeatherCode(weathercode)}</P>
        <Span>風速:</Span>
        <P>{windspeed_10m} km/h</P>
        <Span>濕度: </Span>
        <P>{relative_humidity_2m} %</P>
      </Info>
      <Button onClick={() => addToFavorites(cityName, latitude, longitude)}>
        加入最愛
      </Button>
    </Container>
  );
};

export default Current;
