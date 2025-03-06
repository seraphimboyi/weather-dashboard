import React from "react";
import { mapWeatherCode } from "../data";
import { WeatherApiResponse } from "../../../types/weatherApi";
import { Title, Container, Cards, Card, P, CardTitle, Info } from "./styled";

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
      <Title>未來 5 天天氣預報</Title>
      <Cards>
        {time.map((date, index) => (
          <Card key={date}>
            <CardTitle>日期: {date} </CardTitle>
            <Info>
              <P>天氣狀況: {mapWeatherCode(weathercode[index])}</P>
              <P>
                最高溫度: {convertTemp(temperature_2m_max[index]).toFixed(1)}°
                {isCelsius ? "C" : "F"}
              </P>
              <P>
                最低溫度: {convertTemp(temperature_2m_min[index]).toFixed(1)}°
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
