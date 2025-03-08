import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Favorite from "../components/DashBoard/Favorite";

// 假資料：最愛城市列表
const mockFavorites = [
  { name: "台北", lat: 25.03, lon: 121.56 },
  { name: "東京", lat: 35.68, lon: 139.76 },
];

describe("Favorite 元件測試", () => {
  const mockOnSelectCity = jest.fn();
  const mockOnRemoveCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // 清除 mock
  });

  //  測試 Toggle 按鈕展開/收合
  test("點擊 ToggleButton 應該展開/收合列表", async () => {
    render(
      <Favorite
        favorites={mockFavorites}
        onSelectCity={mockOnSelectCity}
        onRemoveCity={mockOnRemoveCity}
      />
    );

    const toggleButton = screen.getByTestId("toggle-button"); // 透過 `data-testid` 選取
    expect(toggleButton).toHaveAttribute("aria-expanded", "false"); // 初始應為收合狀態

    //  點擊後應該展開
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    //  再次點擊應該收合
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });
  });
});
