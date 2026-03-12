import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Cart } from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { RatingProvider } from "./contexts/RatingContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

export default function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <RatingProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Cart />
          </CartProvider>
        </RatingProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}
