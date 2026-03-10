import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Cart } from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Cart />
    </CartProvider>
  );
}
