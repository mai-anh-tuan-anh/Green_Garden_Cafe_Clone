import { useState } from "react";
import { Link } from "react-router";
import {
  ShoppingCart,
  ArrowLeft,
  Search,
  Star,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useRating } from "../contexts/RatingContext";
import dao from "../../assets/images/dao.jpg";
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

const StarRating = ({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount?: number;
}) => {
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

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-600">
        {rating > 0
          ? `${rating} (${ratingCount || 0} đánh giá)`
          : "Chưa có đánh giá"}
      </span>
    </div>
  );
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
    name: "Cà Phê Đen",
    description:
      "Cà phê đen Việt Nam nguyên chất được pha từ phin truyền thống",
    price: "25.000đ",
    image: coffee,
    category: "Cà phê",
    rating: 3.7,
  },
  {
    id: 8,
    name: "Bánh Su Kem",
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
    name: "Sinh Tố Bơ",
    description: "Sinh tố bơ tươi ngon được làm từ trái bơ chín mọng",
    price: "40.000đ",
    image: sinh_to_bo,
    category: "Sinh tố",
    rating: 4.1,
  },
  {
    id: 11,
    name: "Sinh Tố Dâu",
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
    name: "Nước Ép Cam",
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
    name: "Cà Phê Dừa",
    description: "Cà phê dừa Việt Nam độc đáo với cốt dừa tươi tự nhiên",
    price: "40.000đ",
    image: ca_phe_dua,
    category: "Cà phê",
    rating: 4.0,
  },
  {
    id: 19,
    name: "Cà Phê Muối",
    description: "Cà phê muối Đà Nẵng truyền thống với vị mặn nhẹ đặc trưng",
    price: "40.000đ",
    image: ca_phe_muoi,
    category: "Cà phê",
    rating: 3.9,
  },
  {
    id: 20,
    name: "Cà Phê Sữa Đá",
    description: "Cà phê sữa đá Sài Gòn với sữa đặc ngọt ngào",
    price: "40.000đ",
    image: ca_phe_sua_da,
    category: "Cà phê",
    rating: 4.6,
  },
  {
    id: 21,
    name: "Cà Phê Trứng",
    description: "Cà phê trứng Hà Nội truyền thống với lòng đỏ trứng gà tươi",
    price: "50.000đ",
    image: ca_phe_trung,
    category: "Cà phê",
    rating: 4.1,
  },
  {
    id: 22,
    name: "Trà Chanh",
    description: "Trà chanh thanh mát được làm từ chanh tươi nguyên chất",
    price: "20.000đ",
    image: tra_chanh,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 23,
    name: "Trà Chanh Dây",
    description: "Trà chanh dây tươi mát với vị ngọt dịu của chanh dây",
    price: "35.000đ",
    image: tra_chanh_day,
    category: "Trà",
    rating: 4.1,
  },
  {
    id: 24,
    name: "Trà Đào",
    description: "Trà đào thơm lừng với những miếng đào ngọt ngào",
    price: "25.000đ",
    image: tra_dao,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 25,
    name: "Trà Vải",
    description: "Trà vải tươi ngọt được làm từ những trái vải chín mọng",
    price: "30.000đ",
    image: tra_vai,
    category: "Trà",
    rating: 3.9,
  },
  {
    id: 26,
    name: "Trà Hoa Nhài",
    description: "Trà hoa nhài thanh tao với hương thơm hoa nhài tinh tế",
    price: "30.000đ",
    image: tra_hoa_nhai,
    category: "Trà",
    rating: 4.4,
  },
  {
    id: 27,
    name: "Trà Ô Long",
    description: "Trà ô long Quảng Đông trứ danh với hương thơm nồng nàn",
    price: "30.000đ",
    image: tra_o_long,
    category: "Trà",
    rating: 4.5,
  },
  {
    id: 28,
    name: "Nước Ép Chuối",
    description: "Nước ép chuối tươi mát với vị ngọt thanh và béo ngậy",
    price: "30.000đ",
    image: nuoc_ep_chuoi,
    category: "Nước ép",
    rating: 3.9,
  },
  {
    id: 29,
    name: "Nước Ép Dứa",
    description: "Nước ép dứa tươi mát với vị ngọt thanh và chua nhẹ",
    price: "40.000đ",
    image: nuoc_ep_dua,
    category: "Nước ép",
    rating: 3.9,
  },
  {
    id: 30,
    name: "Nước Ép Dưa Hấu",
    description: "Nước ép dưa hấu tươi mát giải khát với vị ngọt thanh",
    price: "40.000đ",
    image: nuoc_ep_dua_hau,
    category: "Nước ép",
    rating: 4.1,
  },
  {
    id: 31,
    name: "1 Rổ Đào 45KG",
    description:
      "Nước ép đào tươi với vị ngọt  mát như nước suối trong nguồn chảy ra",
    price: "500.000đ",
    image: dao,
    category: "Đặc biệt",
    rating: 5,
  },
];

export function MenuPage() {
  const { addToCart, setIsCartOpen, getTotalItems } = useCart();
  const { isAdmin } = useAuth();
  const { getProductAverageRating, getProductRatingCount } = useRating();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cà phê",
    image: "",
    file: null as File | null,
  });

  const getMenuItemsWithRatings = () => {
    // Lấy sản phẩm tùy chỉnh từ localStorage
    const customProducts = JSON.parse(
      localStorage.getItem("customProducts") || "[]",
    );

    // Kết hợp sản phẩm mặc định và sản phẩm tùy chỉnh
    const allItems = [...menuItems, ...customProducts];

    return allItems.map((item) => ({
      ...item,
      rating: getProductAverageRating(item.id) || item.rating,
      ratingCount: getProductRatingCount(item.id),
    }));
  };

  const menuItemsWithRatings = getMenuItemsWithRatings();

  const categories = [
    "Tất cả",
    ...Array.from(new Set(menuItemsWithRatings.map((item) => item.category))),
  ];

  const filteredItems = menuItemsWithRatings.filter((item) => {
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

  const handleDeleteProduct = (id: number, name: string) => {
    setShowDeleteConfirm({ id, name });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData({ ...formData, image: imageUrl, file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelete = () => {
    if (showDeleteConfirm) {
      // Xóa từ localStorage nếu là sản phẩm tùy chỉnh
      const customProducts = JSON.parse(
        localStorage.getItem("customProducts") || "[]",
      );
      const updatedCustomProducts = customProducts.filter(
        (item: MenuItem) => item.id !== showDeleteConfirm.id,
      );
      localStorage.setItem(
        "customProducts",
        JSON.stringify(updatedCustomProducts),
      );

      setShowDeleteConfirm(null);

      // Reload trang để cập nhật danh sách
      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: MenuItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      image: formData.image || "/api/placeholder/300/200",
      rating: 5,
    };

    // Lưu vào localStorage
    const existingProducts = JSON.parse(
      localStorage.getItem("customProducts") || "[]",
    );
    existingProducts.push(newItem);
    localStorage.setItem("customProducts", JSON.stringify(existingProducts));

    // Reset form và đóng modal
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Cà phê",
      image: "",
      file: null,
    });
    setShowAddForm(false);

    // Reload trang để hiển thị sản phẩm mới
    window.location.reload();
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
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Hiển thị{" "}
            <span className="font-semibold">{filteredItems.length}</span> sản
            phẩm
          </p>
          {isAdmin() && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[3px] transition-colors"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Thêm sản phẩm</span>
            </button>
          )}
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
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 py-3 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                  {isAdmin() && (
                    <button
                      onClick={() => handleDeleteProduct(item.id, item.name)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg text-gray-800">{item.name}</h3>
                    <span className="text-green-600 whitespace-nowrap ml-2 text-lg">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow product-description">
                    {item.description}
                  </p>
                  <StarRating
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                  />
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

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-gray-900 bg-opacity-95 rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Thêm sản phẩm mới
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mô tả
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Nhập mô tả sản phẩm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Giá
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="50.000đ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Cà phê">Cà phê</option>
                  <option value="Trà">Trà</option>
                  <option value="Sinh tố">Sinh tố</option>
                  <option value="Nước ép">Nước ép</option>
                  <option value="Bánh ngọt">Bánh ngọt</option>
                  <option value="Đặc biệt">Đặc biệt</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Thêm sản phẩm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({
                      name: "",
                      description: "",
                      price: "",
                      category: "Cà phê",
                      image: "",
                      file: null,
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-gray-900 bg-opacity-95 rounded-lg max-w-sm w-full p-6 shadow-2xl border border-gray-700">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Xác nhận xóa sản phẩm
                </h3>
                <p className="text-gray-300 mb-4">
                  Bạn có chắc muốn xóa sản phẩm{" "}
                  <strong>"{showDeleteConfirm.name}"</strong> không?
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
