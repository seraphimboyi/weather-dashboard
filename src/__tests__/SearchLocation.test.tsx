import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchLocation from "../components/DashBoard/SearchLocation";
import fetchMock from "jest-fetch-mock";

// 啟用 jest-fetch-mock，用來模擬 fetch API
fetchMock.enableMocks();

describe("SearchLocation 元件測試", () => {
  // Mock props，用來監聽 props 的變化
  const setSearchQuery = jest.fn();
  const setLatitude = jest.fn();
  const setLongitude = jest.fn();
  const setCityName = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks(); // 在每次測試前重置 mock，確保每次測試都是獨立的
  });

  //  測試輸入框變化時 setSearchQuery 是否被正確呼叫
  test("輸入城市名稱時，setSearchQuery 應該被呼叫", () => {
    render(
      <SearchLocation
        searchQuery=""
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />
    );

    // 取得輸入框
    const input = screen.getByPlaceholderText("請輸入城市名稱 ex: Taipei");

    // 觸發輸入變化
    fireEvent.change(input, { target: { value: "Taipei" } });

    // 驗證 setSearchQuery 是否有被呼叫，且參數為 "Taipei"
    expect(setSearchQuery).toHaveBeenCalledWith("Taipei");
  });

  //  測試 API 回應後是否正確更新 setLocations
  test("模擬 API 回應，setLocations 應該更新", async () => {
    // 模擬 API 回應的地點數據
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            id: 1,
            name: "Taipei",
            country: "Taiwan",
            latitude: 25.03,
            longitude: 121.56,
          },
        ],
      })
    );

    render(
      <SearchLocation
        searchQuery="Taipei"
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />
    );

    // 等待 API 回應並驗證搜尋結果是否正確顯示在畫面上
    await waitFor(() => {
      expect(
        screen.getByText("Taipei, Taiwan (25.03, 121.56)")
      ).toBeInTheDocument();
    });
  });

  //  測試點擊建議列表時 setLatitude、setLongitude、setCityName 是否被正確呼叫
  test("點擊建議列表時，應該更新 setLatitude, setLongitude, setCityName", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            id: 1,
            name: "Taipei",
            country: "Taiwan",
            latitude: 25.03,
            longitude: 121.56,
          },
        ],
      })
    );

    render(
      <SearchLocation
        searchQuery="Taipei"
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />
    );

    // 等待 API 回應
    await waitFor(() => {
      expect(
        screen.getByText("Taipei, Taiwan (25.03, 121.56)")
      ).toBeInTheDocument();
    });

    // 取得建議列表中的第一個項目，並觸發點擊
    const listItem = screen.getByText("Taipei, Taiwan (25.03, 121.56)");
    fireEvent.click(listItem);

    // 確保點擊後，setLatitude、setLongitude、setCityName 分別被正確呼叫
    expect(setLatitude).toHaveBeenCalledWith(25.03);
    expect(setLongitude).toHaveBeenCalledWith(121.56);
    expect(setCityName).toHaveBeenCalledWith("Taipei");
  });

  //  測試 onBlur 觸發後，建議列表應該隱藏
  test("onBlur 觸發後，建議列表應該隱藏", async () => {
    render(
      <SearchLocation
        searchQuery="Taipei"
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />
    );

    // 取得輸入框
    const input = screen.getByPlaceholderText("請輸入城市名稱 ex: Taipei");

    // 觸發 focus，確保建議列表顯示
    fireEvent.focus(input);

    // 觸發 blur，測試建議列表是否消失
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.queryByText("Taipei")).not.toBeInTheDocument();
    });
  });

  //  測試 AbortController 是否成功取消 API 請求
  test("AbortController 測試：應該取消前一個 API 請求", async () => {
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              JSON.stringify({
                results: [
                  {
                    id: 1,
                    name: "Taipei",
                    country: "Taiwan",
                    latitude: 25.03,
                    longitude: 121.56,
                  },
                ],
              })
            );
          }, 500)
        )
    );

    render(
      <SearchLocation
        searchQuery="Taipei"
        setSearchQuery={setSearchQuery}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCityName={setCityName}
      />
    );

    // 等待 API 請求完成，並確保 API 只被呼叫了一次
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
