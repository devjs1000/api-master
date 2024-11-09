import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/global.css";
import { Toaster } from "@/components/ui/toaster";
import Forms from "@/components/forms";
const root_el = document.getElementById("root") as HTMLElement;
const root = createRoot(root_el);

window.onbeforeunload = () => "Are you sure you want to leave?";

root.render(
  <StrictMode>
    <App />
    <Forms />
    <Toaster />
  </StrictMode>
);
