import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "@/pages/layout";
import { ErrorInfo } from "@/pages/(info)/error-info";
import { Home } from "./home";
import Project from "./project";
import { CorruptURL } from "./(info)/corrupt-url-info";
import Settings from "./settings";
import Api from "./project/api";
import Folder from "./project/folder";
import { ProjectEmpty } from "./project/empty";

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
        path: "/settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "/project/:id",
    Component: Project,
    children: [
      {
        path: "",
        Component: ProjectEmpty
      },
      {
        path: "file/:api",
        Component: Api,
      },
      {
        path: "folder/:folder",
        Component: Folder,
      },
    ],
  },
  // {
  //   path: "/project/:id",
  //   Component: Project,
  // },
  {
    path: "/project",
    element: <CorruptURL url="/project" missing_params={["id"]} />,
  },
]);

export default router;
