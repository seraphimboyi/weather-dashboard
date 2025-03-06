import { useEffect, useRef, useState } from "react";
import {
  type LocationResult,
  type WeatherApiResponse,
} from "../../types/weatherApi";
import Current from "./Current";
import Forecast from "./Forecast";
import SearchLocation from "./SearchLocation";
import { Container, Button } from "./styled";

const DashBoard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string>(""); 
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // 🔹 新增狀態來控制溫度單位

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 監聽使用者輸入，搜尋地點
  useEffect(() => {
    if (searchQuery.length < 2) {
      setLocations([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`
        );
        if (!response.ok) throw new Error("地點搜尋失敗");

        const data = await response.json();
        setLocations(data.results || []);
      } catch (error) {
        console.error("搜尋地點時發生錯誤:", error);
      }
    };

    fetchLocations();
  }, [searchQuery]);

  // 取得即時天氣 & 5 天天氣預報
  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto`
        );

        if (!response.ok) throw new Error("天氣查詢失敗");

        const data: WeatherApiResponse = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("取得天氣資料時發生錯誤:", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  return (
    <Container>
      <SearchLocation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />

      <Button onClick={toggleTemperatureUnit}>
        {isCelsius ? "切換為華氏 °F 顯示" : "切換為攝氏 °C 顯示"}
      </Button>

      {weatherData && (
        <>
          <Current
            weatherData={weatherData}
            cityName={cityName}
            isCelsius={isCelsius}
          />
          <Forecast weatherData={weatherData} isCelsius={isCelsius} />
        </>
      )}
    </Container>
  );
};

export default DashBoard;
