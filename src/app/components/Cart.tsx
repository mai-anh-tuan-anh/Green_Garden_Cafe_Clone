import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const { user } = useAuth();

  const [orderForm, setOrderForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    note: "",
  });

  const [showCheckout, setShowCheckout] = useState(false);

  const handleOrderFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Chỉ cho phép nhập số và khoảng trắng
      const phoneValue = value.replace(/[^0-9\s]/g, "");
      setOrderForm({ ...orderForm, [name]: phoneValue });
    } else {
      setOrderForm({ ...orderForm, [name]: value });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Save order to localStorage
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: getTotalPrice().toLocaleString("vi-VN") + "đ",
      status: "completed" as const,
      customerInfo: {
        name: orderForm.name,
        phone: orderForm.phone,
        address: orderForm.address,
        note: orderForm.note,
      },
      userName: user?.name || "guest", // Thêm userName để biết tài khoản nào đã đặt
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orderHistory") || "[]",
    );
    existingOrders.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(existingOrders));

    alert(
      `Đặt hàng thành công!\n\nTên: ${orderForm.name}\nSĐT: ${orderForm.phone}\nĐịa chỉ: ${orderForm.address}\n\nTổng tiền: ${getTotalPrice().toLocaleString("vi-VN")}đ\n\nChúng tôi sẽ liên hệ với bạn sớm nhất!`,
    );
    clearCart();
    setOrderForm({ name: user?.name || "", phone: "", address: "", note: "" });
    setShowCheckout(false);
    setIsCartOpen(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-500 ease-out ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[60] flex flex-col transition-all duration-500 ease-out ${
          isCartOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-green-600" size={24} />
            <h2 className="text-2xl text-gray-800">Giỏ hàng</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={64} className="mb-4" />
              <p className="text-lg">Giỏ hàng trống</p>
            </div>
          ) : showCheckout ? (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <h3 className="text-xl text-gray-800 mb-4">
                Thông tin giao hàng
              </h3>

              <div>
                <label className="block text-gray-700 mb-2">Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={orderForm.name}
                  onChange={handleOrderFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={11}
                  pattern="[0-9]{10}"
                  value={orderForm.phone}
                  onChange={handleOrderFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="0123 456 789"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Địa chỉ giao hàng *
                </label>
                <textarea
                  name="address"
                  required
                  value={orderForm.address}
                  onChange={handleOrderFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 resize-none"
                  rows={3}
                  placeholder="Số nhà, tên đường, quận/huyện..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  name="note"
                  value={orderForm.note}
                  onChange={handleOrderFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 resize-none"
                  rows={2}
                  placeholder="Ghi chú đơn hàng (không bắt buộc)"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-700 mb-2">Hóa đơn của bạn</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        {formatPrice(
                          parseInt(item.price.replace(/\D/g, "")) *
                            item.quantity,
                        )}
                        đ
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between text-gray-800">
                  <span>Tổng cộng:</span>
                  <span className="text-lg">
                    {formatPrice(getTotalPrice())}đ
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Xác nhận đặt hàng
                </button>
              </div>
            </form>
          ) : (
            /* Cart Items List */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-green-600 mb-2">{item.price}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-100 rounded-full transition-colors h-fit cursor-pointer"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && !showCheckout && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-800">Tổng cộng:</span>
              <span className="text-green-600">
                {formatPrice(getTotalPrice())}đ
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg transition-colors shadow-lg cursor-pointer"
            >
              Tiến hành đặt hàng
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Xóa giỏ hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
}
