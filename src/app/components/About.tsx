import interior from "../../assets/images/interior.png";
import { useDarkMode } from "../contexts/DarkModeContext";

export function About() {
  const { isDarkMode } = useDarkMode();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800 bg-green-400 w-full py-4 text-center">
            Về chúng tôi
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src={interior}
              alt="Cafe Interior"
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl mb-6 text-gray-800">
              Chào mừng đến với Green Garden Café
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Green Garden Café là không gian lý tưởng cho những ai yêu thích sự
              yên tĩnh và gần gũi với thiên nhiên. Với thiết kế sân vườn tràn
              ngập cây xanh, chúng tôi mang đến cho bạn trải nghiệm thư giãn
              tuyệt vời giữa lòng thành phố.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hương vị cà phê đặc biệt, được pha chế bởi những barista chuyên
              nghiệp, kết hợp với không khí trong lành từ khu vườn xanh mát sẽ
              làm hài lòng cả những vị khách khó tính nhất.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div
                className={`${isDarkMode ? "bg-gray-100" : "bg-green-100"} p-4 rounded-lg`}
              >
                <div className="text-3xl text-green-700 mb-2 font-semibold">
                  5+
                </div>
                <div className="text-gray-500">Năm kinh nghiệm</div>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-100" : "bg-green-100"} p-4 rounded-lg`}
              >
                <div className="text-3xl text-green-700 mb-2 font-semibold">
                  50+
                </div>
                <div className="text-gray-500">Loại đồ uống</div>
              </div>
              <div
                className={`${isDarkMode ? "bg-gray-100" : "bg-green-100"} p-4 rounded-lg`}
              >
                <div className="text-3xl text-green-700 mb-2 font-semibold">
                  1000+
                </div>
                <div className="text-gray-500">Khách hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
