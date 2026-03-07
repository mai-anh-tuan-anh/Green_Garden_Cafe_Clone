import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { sendEmail } from "../utils/emailjs";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await sendEmail(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message sau 5 giây
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setError("Gửi tin nhắn thất bại. Vui lòng thử lại sau!");
      console.error("Email send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Chỉ cho phép nhập số và khoảng trắng
      const phoneValue = value.replace(/[^0-9\s]/g, "");
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800 bg-green-400 w-full py-4 text-center">
            Liên hệ
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Muốn biết thêm thông tin chi tiết về Green Garden Café, chúng tôi
            luôn sẵn sàng lắng nghe
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
              <CheckCircle size={20} />
              <span>
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ cố gắng phản hồi lại sớm
                nhất.
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-lg shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={11}
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors"
                  placeholder="0123 456 789"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email cá nhân *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Tin nhắn *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors resize-none"
                placeholder="Nội dung tin nhắn..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Gửi tin nhắn</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
