import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Container, Cards, Card, P, Date, Info } from "./styled";

type ForecastProps = {
  weatherData: WeatherApiResponse;
  isCelsius: boolean;
};

const Forecast: React.FC<ForecastProps> = ({ weatherData, isCelsius }) => {
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
              <P>{mapWeatherCode(weathercode[index + 1])}</P>
              <P>
                {convertTemp(temperature_2m_max[index + 1]).toFixed(1)} /{" "}
                {convertTemp(temperature_2m_min[index + 1]).toFixed(1)}°{" "}
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
