import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, ArrowLeft, Search } from "lucide-react";
import { useCart } from "../contexts/CartContext";

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
    name: "Espresso",
    description: "Cà phê espresso đậm đà, nguyên chất",
    price: "45.000đ",
    image:
      "https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc3Mjg0MzA0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cà phê",
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Espresso kết hợp sữa tươi và bọt sữa",
    price: "55.000đ",
    image:
      "https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNhcHB1Y2Npbm98ZW58MXx8fHwxNzcyODU3NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cà phê",
  },
  {
    id: 3,
    name: "Latte",
    description: "Cà phê latte mềm mại, thơm ngon",
    price: "55.000đ",
    image:
      "https://images.unsplash.com/photo-1645771321012-919d2e7aa858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBtb3JuaW5nfGVufDF8fHx8MTc3Mjg1NzI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    name: "Bánh ngọt",
    description: "Bánh ngọt tươi mỗi ngày",
    price: "40.000đ",
    image:
      "https://images.unsplash.com/photo-1548693563-25dc13e7b2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcGFzdHJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NzI3NTM3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bánh",
  },
  {
    id: 6,
    name: "Americano",
    description: "Espresso pha loãng với nước nóng",
    price: "50.000đ",
    image:
      "https://images.unsplash.com/photo-1627741162666-c588fc1689da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljfGVufDF8fHx8MTc3Mjc4OTQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cà phê",
  },
  {
    id: 7,
    name: "Mocha",
    description: "Cà phê kết hợp sô-cô-la thơm ngon",
    price: "60.000đ",
    image:
      "https://images.unsplash.com/photo-1645771321012-919d2e7aa858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBtb3JuaW5nfGVufDF8fHx8MTc3Mjg1NzI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cà phê",
  },
  {
    id: 8,
    name: "Trà đào cam sả",
    description: "Trà trái cây tươi mát",
    price: "50.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
  },
  {
    id: 9,
    name: "Trà sữa trân châu",
    description: "Trà sữa truyền thống với trân châu dai",
    price: "55.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Trà",
  },
  {
    id: 10,
    name: "Sinh tố bơ",
    description: "Sinh tố bơ béo ngậy",
    price: "50.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sinh tố",
  },
  {
    id: 11,
    name: "Sinh tố dâu",
    description: "Sinh tố dâu tươi mát lạnh",
    price: "45.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sinh tố",
  },
  {
    id: 12,
    name: "Bánh croissant",
    description: "Bánh croissant bơ Pháp",
    price: "35.000đ",
    image:
      "https://images.unsplash.com/photo-1548693563-25dc13e7b2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcGFzdHJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NzI3NTM3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bánh",
  },
  {
    id: 13,
    name: "Bánh mì sandwich",
    description: "Bánh mì sandwich thập cẩm",
    price: "45.000đ",
    image:
      "https://images.unsplash.com/photo-1548693563-25dc13e7b2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcGFzdHJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NzI3NTM3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bánh",
  },
  {
    id: 14,
    name: "Tiramisu",
    description: "Bánh Tiramisu Ý truyền thống",
    price: "55.000đ",
    image:
      "https://images.unsplash.com/photo-1548693563-25dc13e7b2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcGFzdHJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NzI3NTM3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Bánh",
  },
  {
    id: 15,
    name: "Nước cam ép",
    description: "Nước cam tươi ép 100%",
    price: "40.000đ",
    image:
      "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Nước ép",
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
                className="flex items-center space-x-2 text-gray-700 hover:text-green-700 transition-colors"
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <button
                    id={`add-btn-${item.id}`}
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
