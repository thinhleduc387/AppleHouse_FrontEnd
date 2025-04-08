import { memo } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const Footer = () => {
  const { t } = useTranslation("footer"); // Sử dụng hook useTranslation để lấy hàm t

  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mx-12 lg:mx-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Apple Shop</h2>
            <p className="mb-4">{t("university")}</p>{" "}
            {/* Dịch thông tin trường */}
            <p>
              {t("phone")}: 0912345678 - 0987654321 {/* Dịch "Phone number" */}
            </p>
            <p>
              {t("email")}: contact@gmail.com {/* Dịch "Email" */}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("quickLinks")}</h3>{" "}
            {/* Thêm key mới nếu cần */}
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("home")} {/* Dịch "Trang chủ" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("products")} {/* Dịch "Sản phẩm" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("promotions")} {/* Dịch "Khuyến mãi" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("contact")} {/* Dịch "Liên hệ" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("about")} {/* Dịch "Giới thiệu" */}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("customerSupport")}</h3>{" "}
            {/* Thêm key mới nếu cần */}
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("warrantyPolicy")} {/* Dịch "Chính sách bảo hành" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("returnPolicy")} {/* Dịch "Chính sách đổi trả" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("shippingPolicy")} {/* Dịch "Chính sách vận chuyển" */}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  {t("purchaseGuide")} {/* Dịch "Hướng dẫn mua hàng" */}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("connectWithUs")} {/* Dịch "Kết nối với chúng tôi" */}
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2024 Apple Shop. {t("allRightsReserved")}</p>{" "}
        {/* Thêm key mới nếu cần */}
      </div>
    </div>
  );
};

export default memo(Footer);
