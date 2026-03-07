import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold text-green-700 hover:text-green-800 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Green Garden Café
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-green-700 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Giới thiệu
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-gray-700 hover:text-green-700 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-700 hover:text-green-700 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Hình ảnh
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-gray-700 hover:text-green-700 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Địa chỉ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-green-700 hover:scale-110 hover:text-shadow-lg transition-all duration-300 transform"
            >
              Liên hệ
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Hình ảnh
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Địa chỉ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Liên hệ
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
