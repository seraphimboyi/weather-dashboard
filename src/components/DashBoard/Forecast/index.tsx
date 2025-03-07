import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Container, Cards, Card, P, Date, Info } from "./styled";

type TypeForecastProps = {
  weatherData: WeatherApiResponse;
  isCelsius: boolean;
};

const Forecast: React.FC<TypeForecastProps> = ({ weatherData, isCelsius }) => {
  const {
    daily: { time, weathercode, temperature_2m_min, temperature_2m_max },
  } = weatherData;

  const convertTemp = (temp: number) =>
    isCelsius ? temp : (temp * 9) / 5 + 32;

  return (
    <Container>
      <Cards>
        {time.slice(1, 6).map((date, index) => (
          <Card key={date}>
            <Date>{date}</Date>
            <Info>
              <P>天氣狀況: {mapWeatherCode(weathercode[index + 1])}</P>
              <P>
                最高溫度:
                {convertTemp(temperature_2m_max[index + 1]).toFixed(1)}°
                {isCelsius ? "C" : "F"}
              </P>
              <P>
                最低溫度:
                {convertTemp(temperature_2m_min[index + 1]).toFixed(1)}°
                {isCelsius ? "C" : "F"}
              </P>
            </Info>
          </Card>
        ))}
      </Cards>
    </Container>
  );
};

export default Forecast;
