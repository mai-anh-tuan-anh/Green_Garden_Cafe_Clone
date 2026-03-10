import { X, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

import creamy_latte from "../../assets/images/creamy_latte.jpg";
import cappucino from "../../assets/images/cappucino.jpg";
import bac_xiu from "../../assets/images/bac_xiu.jpg";
import coffee from "../../assets/images/coffee.jpg";
import croissant from "../../assets/images/croissant.jpg";
import latte from "../../assets/images/latte.jpg";
import banh_xu_kem from "../../assets/images/banh_xu_kem.jpg";
import macaron from "../../assets/images/macaron.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Latte Kem Sữa",
    description: "Cà phê đậm đà hòa quyện cùng kem sữa béo mịn",
    price: "75.000đ",
    image: creamy_latte,
    category: "Cà phê",
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso đậm vị hòa quyện cùng sữa nóng và bọt sữa béo nhẹ",
    price: "55.000đ",
    image: cappucino,
    category: "Cà phê",
  },
  {
    id: 3,
    name: "Latte",
    description: "Cà phê latte mềm mại, hương vị nhẹ nhàng, béo mịn và dễ uống",
    price: "45.000đ",
    image: latte,
    category: "Cà phê",
  },
  {
    id: 4,
    name: "Matcha Latte",
    description: "Trà xanh matcha Nhật Bản cao cấp",
    price: "65.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
  },
  {
    id: 5,
    name: "Croissant",
    description: "Bánh mì bơ kiểu Pháp với lớp vỏ giòn và ruột mềm xốp",
    price: "20.000đ",
    image: croissant,
    category: "Bánh",
  },
  {
    id: 6,
    name: "Bạc Xỉu",
    description: "Sữa đặc và sữa tươi kết hợp cùng một chút cà phê đậm vị",
    price: "50.000đ",
    image: bac_xiu,
    category: "Cà phê",
  },
  {
    id: 7,
    name: "Cà phê",
    description: "Cà phê pha phin truyền thống",
    price: "25.000đ",
    image: coffee,
    category: "Cà phê",
  },
  {
    id: 8,
    name: "Bánh su kem",
    description: "Bánh su kem truyền thống",
    price: "15.000đ",
    image: banh_xu_kem,
    category: "Bánh",
  },
  {
    id: 9,
    name: "Macaron",
    description:
      "Bánh mì bơ truyền thống kiểu Pháp với lớp vỏ giòn và ruột mềm xốp",
    price: "15.000đ",
    image: macaron,
    category: "Bánh",
  },
];

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    // Brief notification
    const button = document.getElementById(`add-to-cart-${item.id}`);
    if (button) {
      button.textContent = "✓ Đã thêm!";
      setTimeout(() => {
        button.textContent = "Thêm vào giỏ";
      }, 1000);
    }
  };

  if (!isOpen) return null;

  // Group items by category
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category)),
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div>
            <h2 className="text-3xl mb-1">Menu đầy đủ</h2>
            <p className="text-green-100">
              {menuItems.length} sản phẩm đang có sẵn
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-2xl text-gray-800 mb-4 pb-2 border-b-2 border-green-200">
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg text-gray-800">{item.name}</h4>
                          <span className="text-green-600 whitespace-nowrap ml-2">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <button
                          id={`add-to-cart-${item.id}`}
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm cursor-pointer"
                        >
                          <ShoppingCart size={16} />
                          <span>Thêm vào giỏ</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                setIsCartOpen(true);
                onClose();
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <ShoppingCart size={20} />
              <span>Xem giỏ hàng</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
