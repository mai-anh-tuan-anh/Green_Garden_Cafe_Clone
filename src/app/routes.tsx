import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/menu",
    Component: MenuPage,
  },
]);
