import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, Receipt, Calendar, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useRating } from "../contexts/RatingContext";

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: string;
  status: "completed" | "pending";
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    note: string;
  };
  userName: string;
}

interface ProductRating {
  productId: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
}

export function OrderHistoryPage() {
  const { user, isAuthenticated } = useAuth();
  const { addRating, getUserRatingForProduct } = useRating();
  const [orders, setOrders] = useState<Order[]>([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [ratingForm, setRatingForm] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      loadOrderHistory();
    }
  }, [isAuthenticated, user?.name]);

  const loadOrderHistory = () => {
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      const allOrders: Order[] = JSON.parse(savedOrders);
      // Lọc hóa đơn theo userName (tài khoản đã đăng nhập)
      const userOrders = allOrders.filter(
        (order) => order.userName === user?.name,
      );
      setOrders(
        userOrders.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      );
    }
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price.replace(/\D/g, ""));
    return new Intl.NumberFormat("vi-VN").format(num) + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRateProduct = (productId: number, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setShowRatingForm(true);
  };

  const submitRating = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !user) return;

    const newRating: ProductRating = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      rating: ratingForm.rating,
      comment: ratingForm.comment,
      date: new Date().toISOString(),
      userName: user.name,
    };

    addRating(newRating);

    setShowRatingForm(false);
    setSelectedProduct(null);
    setRatingForm({ rating: 5, comment: "" });
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Vui lòng đăng nhập
          </h1>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để xem lịch sử đơn hàng
          </p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center ml-4">
              <Receipt className="w-6 h-6 text-green-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-800">
                Lịch sử hóa đơn
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Chào, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Bạn có {orders.length} hóa đơn trong lịch sử
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có hóa đơn nào
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn chưa có đơn hàng nào trong lịch sử.
            </p>
            <Link
              to="/menu"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-flex items-center"
            >
              Đặt món ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b rounded-[3px]">
                  <div className="flex items-center justify-between bg-gray-200 p-5">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Mã hóa đơn</p>
                        <p className="font-semibold text-gray-900">
                          #{order.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày đặt</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Trạng thái</p>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Hoàn thành"
                            : "Đang xử lý"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tổng tiền</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Thông tin khách hàng
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="ml-2 text-gray-900">
                          {order.customerInfo.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Số điện thoại:</span>
                        <span className="ml-2 text-gray-900">
                          {order.customerInfo.phone}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="ml-2 text-gray-900">
                          {order.customerInfo.address}
                        </span>
                      </div>
                      {order.customerInfo.note && (
                        <div className="md:col-span-2">
                          <span className="text-gray-600">Ghi chú:</span>
                          <span className="ml-2 text-gray-900">
                            {order.customerInfo.note}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Chi tiết đơn hàng
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => {
                        const userRating = getUserRatingForProduct(
                          item.id,
                          user?.name || "",
                        );
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-500 text-sm w-8">
                                {item.quantity}x
                              </span>
                              <div>
                                <span className="text-gray-900">
                                  {item.name}
                                </span>
                                {userRating && (
                                  <div className="flex items-center text-xs text-yellow-600 mt-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="ml-1">
                                      Đã đánh giá {userRating.rating}★
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900 font-medium">
                                {formatPrice(item.price)}
                              </span>
                              {!userRating && order.status === "completed" && (
                                <button
                                  onClick={() =>
                                    handleRateProduct(item.id, item.name)
                                  }
                                  className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200"
                                >
                                  Đánh giá
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Lưu ý</h4>
              <p className="text-blue-700 text-sm">
                Lịch sử hóa đơn được lưu trên trình duyệt của bạn. Nếu bạn xóa
                dữ liệu trình duyệt, lịch sử hóa đơn sẽ bị mất. Hóa đơn chỉ được
                lưu khi bạn hoàn tất thanh toán.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showRatingForm && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-gray-900 bg-opacity-95 rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Đánh giá sản phẩm
            </h3>
            <p className="text-gray-300 mb-4">{selectedProduct.name}</p>

            <form onSubmit={submitRating} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Số sao
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRatingForm({ ...ratingForm, rating: star })
                      }
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingForm.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bình luận (không bắt buộc)
                </label>
                <textarea
                  value={ratingForm.comment}
                  onChange={(e) =>
                    setRatingForm({ ...ratingForm, comment: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600  text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRatingForm(false);
                    setSelectedProduct(null);
                    setRatingForm({ rating: 5, comment: "" });
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
    </div>
  );
}
