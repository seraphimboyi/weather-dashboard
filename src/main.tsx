import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "./styles/global.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <App />
  </>
);
