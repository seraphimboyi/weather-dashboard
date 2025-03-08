import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading 元件測試", () => {
  test("應該正確渲染 Loading 元件", () => {
    render(<Loading />);

    // 確保 `Cloud` 元件存在
    expect(screen.getByTestId("cloud")).toBeInTheDocument();

    // 確保 `RainDrop` 被渲染 5 次
    const raindrops = screen.getAllByTestId("raindrop");
    expect(raindrops.length).toBe(5);
  });
});
