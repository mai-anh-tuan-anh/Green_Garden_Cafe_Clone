import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./styles/components.css";
import "aos/dist/aos.css";

const AOSProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100,
      });
    });
  }, []);
  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <AOSProvider>
    <App />
  </AOSProvider>,
);
