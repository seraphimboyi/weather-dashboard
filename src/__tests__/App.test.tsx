import React from "react";

import { render, screen } from "@testing-library/react";
import App from "../App";

test("應該正確渲染 Hello World", () => {
  render(<App />);
  expect(screen.getByText("全球天氣查詢")).toBeInTheDocument();
});
