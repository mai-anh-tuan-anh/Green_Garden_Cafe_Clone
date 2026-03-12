import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/menu",
    Component: MenuPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
  {
    path: "/order-history",
    Component: OrderHistoryPage,
  },
]);
