import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "@/pages/layout";
import { ErrorInfo } from "@/pages/(info)/error-info";
import { Home } from "./home";
import Project from "./project";
import { CorruptURL } from "./(info)/corrupt-url-info";
import Settings from "./settings";

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
      {
        path:"/settings",
        Component: Settings
      }
    ],
  },
  {
    path: "/project/:id",
    Component: Project,
  },
  {
    path: "/project",
    element: <CorruptURL url="/project" missing_params={["id"]} />,
  },
]);

export default router;
