import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Current from "../components/DashBoard/Current";
import { WeatherApiResponse } from "../types/weatherApi";

// 假資料：模擬 API 回傳的天氣數據
const mockWeatherData: WeatherApiResponse = {
  latitude: 25.03,
  longitude: 121.56,
  timezone: "Asia/Taipei",
  generationtime_ms: 0.2,
  utc_offset_seconds: 28800,
  timezone_abbreviation: "CST",
  elevation: 10,
  current: {
    time: "2023-10-01T00:00:00Z",
    interval: 3600,
    temperature_2m: 28,
    weathercode: 1,
    windspeed_10m: 10,
    relative_humidity_2m: 80,
  },
  daily: {
    time: ["2023-10-01T00:00:00Z"],
    temperature_2m_max: [32],
    temperature_2m_min: [25],
    weathercode: [1],
  },
  current_units: {
    time: "",
    interval: "",
    temperature_2m: "",
    weathercode: "",
    windspeed_10m: "",
    relative_humidity_2m: "",
  },
  daily_units: {
    time: "",
    temperature_2m_max: "",
    temperature_2m_min: "",
    weathercode: "",
  },
};

describe("Current 元件測試", () => {
  const mockAddToFavorites = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // 確保每次測試時清空 mock
  });

  //  測試是否正確渲染天氣資訊
  test("應該正確顯示天氣資訊", () => {
    render(
      <Current
        weatherData={mockWeatherData}
        cityName="台北"
        isCelsius={true}
        addToFavorites={mockAddToFavorites}
      />
    );

    expect(screen.getByText("城市名稱:")).toBeInTheDocument();
    expect(screen.getByText("台北")).toBeInTheDocument();
    expect(screen.getByText("所在時區:")).toBeInTheDocument();
    expect(screen.getByText("Asia/Taipei")).toBeInTheDocument();
    expect(screen.getByText("當前溫度:")).toBeInTheDocument();
    expect(screen.getByText("28.0° C")).toBeInTheDocument();
    expect(screen.getByText("風速:")).toBeInTheDocument();
    expect(screen.getByText("10 km/h")).toBeInTheDocument();
    expect(screen.getByText("濕度:")).toBeInTheDocument();
    expect(screen.getByText("80 %")).toBeInTheDocument();
  });

  //  測試溫度單位是否正確轉換 (攝氏 ↔ 華氏)
  test("溫度應該根據 isCelsius 屬性顯示不同單位", () => {
    const { rerender } = render(
      <Current
        weatherData={mockWeatherData}
        cityName="台北"
        isCelsius={true}
        addToFavorites={mockAddToFavorites}
      />
    );

    // 初始為攝氏
    expect(screen.getByText("28.0° C")).toBeInTheDocument();

    // 重新渲染並測試華氏轉換
    rerender(
      <Current
        weatherData={mockWeatherData}
        cityName="台北"
        isCelsius={false}
        addToFavorites={mockAddToFavorites}
      />
    );

    expect(screen.getByText("82.4° F")).toBeInTheDocument();
  });

  //  測試「加入最愛」按鈕是否正確執行 `addToFavorites`
  test("點擊『加入最愛』應該執行 addToFavorites 回呼函式", () => {
    render(
      <Current
        weatherData={mockWeatherData}
        cityName="台北"
        isCelsius={true}
        addToFavorites={mockAddToFavorites}
      />
    );

    const button = screen.getByText("加入最愛");
    fireEvent.click(button);

    expect(mockAddToFavorites).toHaveBeenCalledTimes(1);
    expect(mockAddToFavorites).toHaveBeenCalledWith("台北", 25.03, 121.56);
  });
});
