import {
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Music,
  Play,
} from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-2xl mb-4 text-green-400">Green Garden Café</h3>
            <p className="text-gray-400 mb-4">
              Không gian xanh mát, cà phê thơm ngon, nơi lý tưởng để thư giãn và
              tận hưởng những giây phút tuyệt vời giữa lòng thành phố.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/reel/2937931746345288?locale=vi_VN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-colors duration-300"
              >
                <Play size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@thtski/video/7610417156739697941?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition-colors duration-300"
              >
                <Music size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 text-green-400">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Giới thiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Hình ảnh
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4 text-green-400">Thông tin liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>AEON Mall Hà Đông, Hà Nội</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={20} className="flex-shrink-0" />
                <span>0696 969 696</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={20} className="flex-shrink-0" />
                <span>coffeehouse@greengarden.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 Green Garden Café by MATA_CHAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
