import { Card } from "./ui/card";
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
    description: "Cà phê đậm đà hòa quyện cùng kem sữa béo mịn",
    price: "75.000đ",
    image: creamy_latte,
    category: "Cà phê",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso đậm vị hòa quyện cùng sữa nóng và bọt sữa béo nhẹ",
    price: "55.000đ",
    image: cappucino,
    category: "Cà phê",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Latte",
    description: "Cà phê latte mềm mại, hương vị nhẹ nhàng, béo mịn và dễ uống",
    price: "45.000đ",
    image: latte,
    category: "Cà phê",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Matcha Latte",
    description: "Trà xanh matcha Nhật Bản cao cấp",
    price: "55.000đ - 65.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Croissant",
    description: "Bánh mì bơ kiểu Pháp với lớp vỏ giòn và ruột mềm xốp",
    price: "20.000đ - 40.000đ x 1 cái",
    image: croissant,
    category: "Bánh",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Bạc Xỉu",
    description: "Sữa đặc và sữa tươi kết hợp cùng một chút cà phê đậm vị",
    price: "35.000đ - 50.000đ",
    image: bac_xiu,
    category: "Cà phê",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Cà phê",
    description: "Cà phê pha phin truyền thống",
    price: "25.000đ - 30.000đ",
    image: coffee,
    category: "Cà phê",
    rating: 3.7,
  },
  {
    id: 8,
    name: "Bánh su kem",
    description: "Bánh su kem truyền thống",
    price: "25.000đ x 3 cái",
    image: banh_xu_kem,
    category: "Bánh",
    rating: 4.2,
  },
  {
    id: 9,
    name: "Macaron",
    description:
      "Bánh mì bơ truyền thống kiểu Pháp với lớp vỏ giòn và ruột mềm xốp",
    price: "15.000đ - 25.000đ x 1 cái",
    image: macaron,
    category: "Bánh",
    rating: 4.7,
  },
];

export function Menu() {
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
          {menuItems.map((item) => (
            <Card
              key={item.id}
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
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
