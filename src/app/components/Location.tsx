import { MapPin, Phone, Clock } from "lucide-react";

export function Location() {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800 bg-green-400 w-full py-4 text-center rounded-[3px]">
            Địa chỉ
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-xl">
            Ghé thăm chúng tôi để trải nghiệm không gian tuyệt vời
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start" data-aos="fade">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-xl h-[450px] relative hover:shadow-2xl transition-shadow duration-300">
            <iframe
              key="osm-map-iframe"
              src="https://www.openstreetmap.org/export/embed.html?bbox=105.7485,20.9875,105.7539,20.9915&layer=mapnik&marker=20.98943,105.75122"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Green Garden Café Location"
            />
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=AEON+Mall+Hà+Đông+Hà+Nội",
                  "_blank",
                )
              }
            ></div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MapPin className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Địa chỉ</h3>
                  <p className="text-gray-600">AEON Mall Hà Đông, Hà Nội</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">
                    Điện thoại / Đặt trước
                  </h3>
                  <p className="text-gray-600">0696 969 696</p>
                  <p className="text-gray-600">
                    Email: coffeehouse@greengarden.vn
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Giờ mở cửa</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Thứ 2 - Thứ 6: 7:00 - 20:00</p>
                    <p>Thứ 7 - Chủ nhật: 7:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl mb-3">Thông tin hữu ích</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Wifi miễn phí
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Bãi đỗ xe rộng rãi
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Không gian điều hòa
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Phù hợp cho nhóm và tổ chức sự kiện
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Chủ nhật giảm 25% cho toàn bộ menu
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
