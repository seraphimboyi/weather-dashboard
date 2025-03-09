import { useEffect, useState } from "react";
import React from "react";
import { type WeatherApiResponse } from "../../types/weatherApi";
import Current from "./Current";
import Forecast from "./Forecast";
import SearchLocation from "./SearchLocation";
import Favorite from "./Favorite";
import Loading from "../Loading";
import { FavoriteItem } from "../../types/favoriteItem";
import {
  Container,
  Button,
  ButtonWrapper,
  ToastMessage,
  WeatherFiled,
  Title,
  NoDataMessage,
} from "./styled";

const DashBoard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string>("");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 初始化 LocalStorage 的最愛城市
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // 取得天氣資料
  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const fetchWeather = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto`
        );
        if (!response.ok) throw new Error("天氣查詢失敗");

        const data: WeatherApiResponse = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("取得天氣資料時發生錯誤:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  // 顯示 Toast 訊息
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // 監聽 `toastMessage`，在設定後 2.5 秒自動清除
  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => {
        setToastMessage("");
      }, 2500);

      return () => clearTimeout(timeout); // 清除計時器，防止重複觸發
    }
  }, [toastMessage]);

  // 加入最愛
  const addToFavorites = (city: string, lat: number, lon: number) => {
    if (
      favorites.some(
        (fav) => fav.name === city && fav.lat === lat && fav.lon === lon
      )
    ) {
      showToast(`已將 ${city} 加入過最愛囉`);
      return;
    }

    const newFavorites = [...favorites, { name: city, lat, lon }];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    showToast(`成功將 ${city} 加入最愛`);
  };

  return (
    <Container>
      {toastMessage && <ToastMessage>{toastMessage}</ToastMessage>}

      <Favorite
        favorites={favorites}
        onSelectCity={(fav) => {
          setLatitude(fav.lat);
          setLongitude(fav.lon);
          setCityName(fav.name);
          showToast(`載入 ${fav.name} 的天氣資訊`);
        }}
        onRemoveCity={(city, lat, lon) => {
          const newFavorites = favorites.filter(
            (fav) => !(fav.name === city && fav.lat === lat && fav.lon === lon)
          );
          setFavorites(newFavorites);
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          showToast(`已從最愛中移除 ${city}`);
        }}
      />

      <WeatherFiled>
        <SearchLocation
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setCityName={setCityName}
        />

        {weatherData && (
          <ButtonWrapper>
            <Button onClick={() => setIsCelsius(!isCelsius)}>
              {isCelsius ? "切換華氏" : "切換攝氏"}
            </Button>
          </ButtonWrapper>
        )}

        {isLoading && <Loading />}

        {!isLoading && weatherData ? (
          <>
            <Title>即時天氣狀況</Title>
            <Current
              weatherData={weatherData}
              cityName={cityName}
              isCelsius={isCelsius}
              addToFavorites={addToFavorites}
            />
            <Title>未來 5 天天氣預報</Title>
            <Forecast weatherData={weatherData} isCelsius={isCelsius} />
          </>
        ) : (
          !isLoading && (
            <NoDataMessage>
              尚未查詢任何城市的天氣資訊，
              <br />
              請輸入城市名稱進行查詢！
            </NoDataMessage>
          )
        )}
      </WeatherFiled>
    </Container>
  );
};

export default DashBoard;
