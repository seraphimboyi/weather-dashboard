import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import DashBoard from "../components/DashBoard/";
import fetchMock from "jest-fetch-mock";

// 啟用 jest-fetch-mock
fetchMock.enableMocks();

describe("DashBoard 元件測試", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // 重置 fetchMock，確保測試互不影響
    localStorage.clear(); // 清除 localStorage，避免影響最愛城市的測試
  });

  //  測試 DashBoard 頁面是否正確渲染主要元件
  test("應該正確渲染 DashBoard 主要元件", async () => {
    render(<DashBoard />);
    expect(
      screen.getByPlaceholderText("請輸入城市名稱 ex: Taipei")
    ).toBeInTheDocument();
    expect(screen.getByText("我的最愛城市")).toBeInTheDocument();
  });

  //  測試搜尋城市時，fetch API 是否被呼叫
  test("輸入城市名稱後應該觸發 API 請求", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        current: { temperature_2m: 25 },
        daily: { temperature_2m_max: [30], temperature_2m_min: [20] },
      })
    );

    render(<DashBoard />);
    const input = screen.getByPlaceholderText("請輸入城市名稱 ex: Taipei");
    fireEvent.change(input, { target: { value: "Taipei" } });

    // **等待 API 回應**
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
