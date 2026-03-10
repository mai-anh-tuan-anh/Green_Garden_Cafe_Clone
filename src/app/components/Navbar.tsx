import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link, useLocation } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-200 shadow-md" : "bg-gray-200/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-green-700 hover:text-green-800 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform cursor-pointer"
            >
              Green Garden Café
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
                >
                  Giới thiệu
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
                >
                  Hình ảnh
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
                >
                  Địa chỉ
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
                >
                  Liên hệ
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-gray-700 hover:text-green-700 hover:bg-white hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform px-3 py-2 rounded-md cursor-pointer"
              >
                Trang chủ
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {location.pathname === "/" ? (
                <>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                  >
                    Giới thiệu
                  </button>
                  <button
                    onClick={() => scrollToSection("menu")}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                  >
                    Menu
                  </button>
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                  >
                    Hình ảnh
                  </button>
                  <button
                    onClick={() => scrollToSection("location")}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                  >
                    Địa chỉ
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                  >
                    Liên hệ
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
                >
                  Trang chủ
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
