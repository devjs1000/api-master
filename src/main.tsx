import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/global.css";
const root_el = document.getElementById("root") as HTMLElement;
const root = createRoot(root_el);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
