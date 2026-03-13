import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Receipt,
  Moon,
  Sun,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Link, useLocation } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOrderHistoryText, setShowOrderHistoryText] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
        isScrolled ? "bg-gray-300 shadow-md" : "bg-gray-300 backdrop-blur-sm"
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

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Button */}
            {isAuthenticated() ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/order-history"
                  className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Lịch sử hóa đơn"
                >
                  <Receipt size={20} />
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full">
                  <User size={16} />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors cursor-pointer"
              >
                <User size={16} />
                <span>Đăng nhập</span>
              </Link>
            )}
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

            {/* Mobile Auth Button */}
            {isAuthenticated() ? (
              <div className="flex items-center space-x-1">
                <Link
                  to="/order-history"
                  className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Lịch sử hóa đơn"
                >
                  <Receipt size={18} />
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                title="Đăng nhập"
              >
                <User size={18} />
              </Link>
            )}

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
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

              {/* Mobile Auth Menu */}
              {isAuthenticated() && (
                <>
                  <div className="border-t pt-3">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Xin chào, {user?.name}
                    </div>
                    <Link
                      to="/order-history"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 hover:underline transition-colors rounded-md"
                    >
                      <Receipt
                        size={16}
                        onMouseEnter={() => setShowOrderHistoryText(true)}
                        onMouseLeave={() => setShowOrderHistoryText(false)}
                      />
                      <span
                        className={showOrderHistoryText ? "inline" : "hidden"}
                      >
                        Lịch sử hóa đơn
                      </span>
                    </Link>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-white hover:!bg-red-600 transition-colors rounded-md"
                    >
                      <LogOut size={16} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-gray-900 bg-opacity-95 rounded-lg max-w-sm w-full p-6 shadow-2xl border border-gray-700">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <LogOut size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Xác nhận đăng xuất
                </h3>
                <p className="text-gray-300 mb-4">
                  Bạn có chắc muốn đăng xuất khỏi tài khoản không?
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowLogoutConfirm(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
