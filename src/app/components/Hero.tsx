import { Coffee } from "lucide-react";
import { Link } from "react-router";

import hero from "../../assets/images/hero.jpg";
import logo from "../../assets/svg/logo.svg";
export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Garden Café"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Green Garden Café Logo"
            className="w-85 h-85 object-cover rounded-lg"
          />
        </div>
        <h1 className="text-5xl md:text-7xl mb-6">Green Garden Café</h1>
        <p className="text-xl md:text-2xl mb-8 text-white/80">
          Không gian xanh mát - Cà phê thơm ngon - Trải nghiệm tuyệt vời
        </p>
        <Link
          to="/menu"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border-2 border-green-600 cursor-pointer"
        >
          Xem Toàn Bộ Menu
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 !bg-white" />
        </div>
      </div>
    </section>
  );
}
