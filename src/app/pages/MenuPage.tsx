import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, ArrowLeft, Search, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";

import creamy_latte from "../../assets/images/creamy_latte.jpg";
import cappucino from "../../assets/images/cappucino.jpg";
import bac_xiu from "../../assets/images/bac_xiu.jpg";
import coffee from "../../assets/images/coffee.jpg";
import croissant from "../../assets/images/croissant.jpg";
import latte from "../../assets/images/latte.jpg";
import banh_xu_kem from "../../assets/images/banh_xu_kem.jpg";
import macaron from "../../assets/images/macaron.jpg";
import ca_phe_dua from "../../assets/images/ca_phe_dua.jpg";
import ca_phe_muoi from "../../assets/images/ca_phe_muoi.jpg";
import ca_phe_sua_da from "../../assets/images/ca_phe_sua_da.jpg";
import ca_phe_trung from "../../assets/images/ca_phe_trung.jpeg";
import cheesecake from "../../assets/images/cheesecake.jpg";
import tiramisu from "../../assets/images/tiramisu.jpg";
import donut from "../../assets/images/donut.jpg";
import muffin from "../../assets/images/muffin.jpg";
import sinh_to_bo from "../../assets/images/sinh_to_bo.jpg";
import sinh_to_dau from "../../assets/images/sinh_to_dau.jpg";
import tra_chanh from "../../assets/images/tra_chanh.jpg";
import tra_chanh_day from "../../assets/images/tra_chanh_day.jpg";
import tra_dao from "../../assets/images/tra_dao.jpg";
import tra_vai from "../../assets/images/tra_vai.jpg";
import tra_hoa_nhai from "../../assets/images/tra_hoa_nhai.jpg";
import tra_o_long from "../../assets/images/tra_o_long.jpg";
import brownie from "../../assets/images/brownie.jpg";
import nuoc_ep_chuoi from "../../assets/images/nuoc_ep_chuoi.jpg";
import nuoc_ep_cam from "../../assets/images/nuoc_ep_cam.png";
import nuoc_ep_dua from "../../assets/images/nuoc_ep_dua.jpeg";
import nuoc_ep_dua_hau from "../../assets/images/nuoc_ep_dua_hau.jpg";
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
      "Latte Kem Sữa hảo hạng với lớp kem sữa béo ngậy quyện cùng cà phê",
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
    description: "Matcha Latte Nhật Bản tinh túy với bột trà xanh matcha",
    price: "65.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Croissant",
    description: "Bánh sừng bò Pháp cao cấp với lớp vỏ giòn rụm",
    price: "20.000đ",
    image: croissant,
    category: "Bánh",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Bạc Xỉu",
    description: "Bạc Xỉu Sài Gòn truyền thống với lớp sữa đặc ngọt ngào",
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
    description: "Bánh su kem Pháp tinh xảo với lớp vỏ giòn tan",
    price: "15.000đ",
    image: banh_xu_kem,
    category: "Bánh",
    rating: 4.2,
  },
  {
    id: 9,
    name: "Macaron",
    description: "Macaron Pháp thanh lịch với hai lớp vỏ giòn",
    price: "15.000đ",
    image: macaron,
    category: "Bánh",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Sinh tố bơ",
    description: "Sinh tố bơ tươi ngon được làm từ trái bơ chín mọng",
    price: "40.000đ",
    image: sinh_to_bo,
    category: "Sinh tố",
    rating: 4.1,
  },
  {
    id: 11,
    name: "Sinh tố dâu",
    description:
      "Sinh tố dâu tươi mát lạnh được làm từ những trái dâu chín mọng",
    price: "45.000đ",
    image: sinh_to_dau,
    category: "Sinh tố",
    rating: 4.0,
  },
  {
    id: 12,
    name: "Bánh Donut",
    description: "Bánh Donut Mỹ ngọt ngào với lớp đường óng ả",
    price: "25.000đ",
    image: donut,
    category: "Bánh",
    rating: 4.4,
  },
  {
    id: 13,
    name: "Tiramisu",
    description: "Bánh Tiramisu Ý trứ danh với lớp bánh ladyfinger ngâm cà phê",
    price: "55.000đ",
    image: tiramisu,
    category: "Bánh",
    rating: 4.2,
  },
  {
    id: 14,
    name: "Cheesecake",
    description:
      "Bánh Cheesecake New York béo ngậy với lớp phô mai cream cheese",
    price: "55.000đ",
    image: cheesecake,
    category: "Bánh",
    rating: 4.6,
  },
  {
    id: 15,
    name: "Nước ép cam",
    description: "Nước cam tươi ép 100% từ những trái cam chín mọng",
    price: "40.000đ",
    image: nuoc_ep_cam,
    category: "Nước ép",
    rating: 4.1,
  },
  {
    id: 16,
    name: "Brownie",
    description: "Bánh Brownie Mỹ cháy lệ với sô cô la đắng nhẹ",
    price: "45.000đ",
    image: brownie,
    category: "Bánh",
    rating: 4.2,
  },
  {
    id: 17,
    name: "Muffin",
    description: "Muffin Anh mềm xốp với chocolate chip tan chảy",
    price: "35.000đ",
    image: muffin,
    category: "Bánh",
    rating: 3.9,
  },
  {
    id: 18,
    name: "Cà phê dừa",
    description: "Cà phê dừa Việt Nam độc đáo với cốt dừa tươi tự nhiên",
    price: "40.000đ",
    image: ca_phe_dua,
    category: "Cà phê",
    rating: 4.0,
  },
  {
    id: 19,
    name: "Cà phê muối",
    description: "Cà phê muối Đà Nẵng truyền thống với vị mặn nhẹ đặc trưng",
    price: "40.000đ",
    image: ca_phe_muoi,
    category: "Cà phê",
    rating: 3.9,
  },
  {
    id: 20,
    name: "Cà phê sữa đá",
    description: "Cà phê sữa đá Sài Gòn với sữa đặc ngọt ngào",
    price: "40.000đ",
    image: ca_phe_sua_da,
    category: "Cà phê",
    rating: 4.6,
  },
  {
    id: 21,
    name: "Cà phê trứng",
    description: "Cà phê trứng Hà Nội truyền thống với lòng đỏ trứng gà tươi",
    price: "50.000đ",
    image: ca_phe_trung,
    category: "Cà phê",
    rating: 4.1,
  },
  {
    id: 22,
    name: "Trà chanh",
    description: "Trà chanh thanh mát được làm từ chanh tươi nguyên chất",
    price: "20.000đ",
    image: tra_chanh,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 23,
    name: "Trà chanh dây",
    description: "Trà chanh dây tươi mát với vị ngọt dịu của chanh dây",
    price: "35.000đ",
    image: tra_chanh_day,
    category: "Trà",
    rating: 4.1,
  },
  {
    id: 24,
    name: "Trà đào",
    description: "Trà đào thơm lừng với những miếng đào ngọt ngào",
    price: "25.000đ",
    image: tra_dao,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 25,
    name: "Trà vải",
    description: "Trà vải tươi ngọt được làm từ những trái vải chín mọng",
    price: "30.000đ",
    image: tra_vai,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 26,
    name: "Trà hoa nhài",
    description: "Trà hoa nhài thanh tao với hương thơm hoa nhài tinh tế",
    price: "30.000đ",
    image: tra_hoa_nhai,
    category: "Trà",
    rating: 4.4,
  },
  {
    id: 27,
    name: "Trà ô long",
    description: "Trà ô long Quảng Đông trứ danh với hương thơm nồng nàn",
    price: "30.000đ",
    image: tra_o_long,
    category: "Trà",
    rating: 4.5,
  },
  {
    id: 28,
    name: "Nước ép chuối",
    description: "Nước ép chuối tươi mát với vị ngọt thanh và béo ngậy",
    price: "30.000đ",
    image: nuoc_ep_chuoi,
    category: "Nước ép",
    rating: 3.9,
  },
  {
    id: 29,
    name: "Nước ép dứa",
    description: "Nước ép dứa tươi mát với vị ngọt thanh và chua nhẹ",
    price: "40.000đ",
    image: nuoc_ep_dua,
    category: "Nước ép",
    rating: 3.9,
  },
  {
    id: 30,
    name: "Nước ép dưa hấu",
    description: "Nước ép dưa hấu tươi mát giải khát với vị ngọt thanh",
    price: "40.000đ",
    image: nuoc_ep_dua_hau,
    category: "Nước ép",
    rating: 4.1,
  },
];

export function MenuPage() {
  const { addToCart, setIsCartOpen, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Tất cả",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    // Brief notification
    const button = document.getElementById(`add-btn-${item.id}`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = "✓ Đã thêm!";
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-[3px] transition-colors"
              >
                <ArrowLeft size={24} />
                <span className="hidden sm:inline">Quay lại</span>
              </Link>
              <h1 className="text-2xl md:text-3xl text-green-700">
                Menu - Green Garden Café
              </h1>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors shadow-lg"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị{" "}
            <span className="font-semibold">{filteredItems.length}</span> sản
            phẩm
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 py-3"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      item.image.startsWith("http") ? item.image : item.image
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.rating >= 4.5 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl border border-red-400">
                      <span className="flex items-center space-x-1">
                        <span>🔥</span>
                        <span>HOT</span>
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg text-gray-800">{item.name}</h3>
                    <span className="text-green-600 whitespace-nowrap ml-2 text-lg">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <StarRating rating={item.rating} />
                  <button
                    id={`add-btn-${item.id}`}
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-[3px] transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-3"
                  >
                    <ShoppingCart size={18} />
                    <span>Thêm vào giỏ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Button - Mobile */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-colors z-30"
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>
    </div>
  );
}
