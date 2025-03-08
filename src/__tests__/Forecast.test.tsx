import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "../components/DashBoard/Forecast";
import { WeatherApiResponse } from "../types/weatherApi";
import { mapWeatherCode } from "../components/DashBoard/data";

// 假資料：模擬 API 回傳的天氣數據
const mockWeatherData: WeatherApiResponse = {
  latitude: 25.03,
  longitude: 121.56,
  timezone: "Asia/Taipei",
  current: {
    temperature_2m: 28,
    weathercode: 1,
    windspeed_10m: 10,
    relative_humidity_2m: 80,
    time: "",
    interval: 0,
  },
  daily: {
    time: [
      "2025-03-08",
      "2025-03-09",
      "2025-03-10",
      "2025-03-11",
      "2025-03-12",
      "2025-03-13",
    ],
    weathercode: [1, 2, 3, 45, 48, 55], // 模擬不同的天氣狀況
    temperature_2m_max: [30, 28, 25, 27, 26, 29],
    temperature_2m_min: [20, 18, 17, 19, 16, 21],
  },
  generationtime_ms: 0,
  utc_offset_seconds: 0,
  timezone_abbreviation: "",
  elevation: 0,
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

describe("Forecast 元件測試", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 確保每次測試時清空 mock
  });

  // ✅ 測試是否正確渲染 5 天的天氣資訊
  test("應該正確顯示未來 5 天的天氣資訊", () => {
    render(<Forecast weatherData={mockWeatherData} isCelsius={true} />);

    // 確保渲染 5 天的天氣資訊
    expect(screen.getByText("2025-03-09")).toBeInTheDocument();
    expect(screen.getByText("2025-03-10")).toBeInTheDocument();
    expect(screen.getByText("2025-03-11")).toBeInTheDocument();
    expect(screen.getByText("2025-03-12")).toBeInTheDocument();
    expect(screen.getByText("2025-03-13")).toBeInTheDocument();
  });

  // ✅ 測試溫度單位是否正確轉換 (攝氏 ↔ 華氏)
  test("溫度應該根據 isCelsius 顯示不同單位", () => {
    const { rerender } = render(
      <Forecast weatherData={mockWeatherData} isCelsius={true} />
    );

    // 初始為攝氏
    expect(screen.getByText("28.0 / 18.0° C")).toBeInTheDocument();

    // 測試華氏轉換
    rerender(<Forecast weatherData={mockWeatherData} isCelsius={false} />);

    expect(screen.getByText("82.4 / 64.4° F")).toBeInTheDocument();
  });

  // ✅ 測試 `mapWeatherCode` 是否正確轉換天氣狀況
  test("應該根據 weathercode 顯示正確的天氣描述", () => {
    render(<Forecast weatherData={mockWeatherData} isCelsius={true} />);

    expect(screen.getByText(mapWeatherCode(2))).toBeInTheDocument(); // 測試第 2 天的天氣
    expect(screen.getByText(mapWeatherCode(3))).toBeInTheDocument(); // 測試第 3 天的天氣
    expect(screen.getByText(mapWeatherCode(45))).toBeInTheDocument(); // 測試第 4 天的天氣
    expect(screen.getByText(mapWeatherCode(48))).toBeInTheDocument(); // 測試第 5 天的天氣
  });
});
