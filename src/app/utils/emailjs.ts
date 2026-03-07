import emailjs from "@emailjs/browser";

// Cấu hình EmailJS - CẦN CẬP NHẬT CÁC GIÁ TRỊ NÀY
const SERVICE_ID = "service_placeholder";
const TEMPLATE_ID = "template_placeholder";
const PUBLIC_KEY = "public_key_placeholder";

export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    // Mock function - Chỉ để test UI
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập delay 2 giây

    // Bỏ comment phần dưới khi đã có thông tin EmailJS thật
    /*
    // Kiểm tra xem đã cấu hình EmailJS chưa
    if (SERVICE_ID === 'service_placeholder' || 
        TEMPLATE_ID === 'template_placeholder' || 
        PUBLIC_KEY === 'public_key_placeholder') {
      throw new Error('EmailJS chưa được cấu hình. Vui lòng cập nhật SERVICE_ID, TEMPLATE_ID và PUBLIC_KEY trong file emailjs.ts');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_name: 'Green Garden Café',
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return response;
    */

    return { status: "success", text: "Mock email sent" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
