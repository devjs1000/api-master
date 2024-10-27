import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "@/pages/layout";
import { ErrorInfo } from "@/pages/(info)/error-info";
import { Home } from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutPage,
    ErrorBoundary: ErrorInfo,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);

export default router;
