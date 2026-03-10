import { Card } from "./ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

import { Star } from "lucide-react";
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
  rating: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const roundedRating = rating >= 4.5 ? 5 : Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
      );
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return <div className="flex">{stars}</div>;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Latte Kem Sữa",
    description:
      "Latte Kem Sữa hảo hạng với lớp kem sữa béo ngậy quyện cùng cà phê đậm vị",
    price: "75.000đ",
    image: creamy_latte,
    category: "Cà phê",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Cappuccino",
    description:
      "Cappuccino Ý với espresso đậm vị, sữa nóng béo ngậy và lớp bọt sữa mịn",
    price: "55.000đ",
    image: cappucino,
    category: "Cà phê",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Latte",
    description:
      "Latte Ý thanh tao với cà phê đậm vị hòa quyện cùng sữa tươi béo ngậy",
    price: "45.000đ",
    image: latte,
    category: "Cà phê",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Matcha Latte",
    description:
      "Matcha Latte Nhật Bản tinh túy với bột matcha cao cấpcùng sữa tươi béo ngậy",
    price: "65.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Croissant",
    description:
      "Bánh sừng bò Pháp cao cấp với lớp vỏ giòn rụm và ruột bơ mềm xốp tan chảy trong miệng",
    price: "20.000đ",
    image: croissant,
    category: "Bánh",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Bạc Xỉu",
    description:
      "Bạc Xỉu Sài Gòn truyền thống với lớp sữa đặc ngọt ngào hòa quyện cùng sữa tươi và cà phê",
    price: "50.000đ",
    image: bac_xiu,
    category: "Cà phê",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Cà phê đen",
    description:
      "Cà phê đen Việt Nam nguyên chất được pha từ phin truyền thống",
    price: "25.000đ",
    image: coffee,
    category: "Cà phê",
    rating: 3.7,
  },
  {
    id: 8,
    name: "Bánh su kem",
    description:
      "Bánh su kem Pháp tinh xảo với lớp vỏ giòn tan và kem béo ngậy tan chảy trong miệng",
    price: "15.000đ",
    image: banh_xu_kem,
    category: "Bánh",
    rating: 4.2,
  },
  {
    id: 9,
    name: "Macaron",
    description:
      "Macaron Pháp thanh lịch với hai lớp vỏ giòn và nhân kem béo ngậy mềm mịn ở giữa",
    price: "15.000đ",
    image: macaron,
    category: "Bánh",
    rating: 4.7,
  },
];

export function Menu() {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    // Show a brief notification (optional)
    setIsCartOpen(true);
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800 bg-green-400 w-full py-4 text-center">
            Thực đơn
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Khám phá các món đồ uống và bánh ngọt đặc biệt của chúng tôi
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl text-gray-800">{item.name}</h3>
                  <span className="text-green-700 text-lg">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <StarRating rating={item.rating} />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingCart size={20} />
                  <span>Thêm vào giỏ</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
