import React, { memo, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import Banner from "../../../component/Banner";
import "./style.css";
import { getAllCategory } from "../../../config/api";
import ProductSection from "../../../component/RecommendSection/RecommendSection";

// Component cho section với hiệu ứng scroll
const AnimatedSection = ({ children, backgroundImage, className, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative min-h-[70vh] bg-cover bg-center mb-2 border-transparent border-2 ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto relative z-10 text-black pt-4 top-0">
        {children}
        <div className="flex justify-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNavigate}
            className="bg-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

const GridItem = ({
  title,
  description,
  buttonText,
  backgroundImage,
  position,
  link, // Thêm prop link
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative min-h-[50vh] bg-cover bg-center text-center py-8 px-4 border border-gray-200 diagonal-${position}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative z-10 pt-8">
        {title === "iPad Pro" || title === "AirPods 4" ? (
          <>
            <p className="text-xl text-white font-semibold mb-1">{title}</p>
            <p className="text-base text-white mb-4">{description}</p>
          </>
        ) : (
          <>
            <p className="text-xl text-black font-semibold mb-1">{title}</p>
            <p className="text-base text-black mb-4">{description}</p>
          </>
        )}

        <div className="flex justify-center mb-6 gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNavigate} // Thêm onClick
            className="bg-blue-700 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-800 transition"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  // Parallax effect cho banner
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // State để lưu response từ API
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  // Gọi API getAllCategory khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response);
        console.log("🚀 ~ getAllCategory response:", response);
      } catch (err) {
        setError(err.message);
        console.error("🚀 ~ Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Xử lý query params cho userId và accessToken
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("user");
    const accessToken = queryParams.get("token");

    if (userId && accessToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", userId);
    }
  }, []);

  return (
    <div className="bg-white">
      {/* Hiển thị error nếu có */}
      {error && (
        <div className="text-red-500 text-center py-4">
          Error fetching categories: {error}
        </div>
      )}

      {/* Banner với parallax */}
      <motion.div style={{ y }} className="relative">
        <Banner />
      </motion.div>

      <AnimatedSection
        backgroundImage="https://www.apple.com/v/home/ce/images/heroes/apple-watch-pride/hero_apple_watch_pride__ghqvc4dlapaq_medium_2x.jpg"
        className="bg-gray-100 text-center py-8 px-4"
        link="/apple-watch-54321" // Thêm link
      >
        <h2 className="font-sans text-3xl font-black mb-1">Apple Watch</h2>
        <p className="text-xl mb-4">
          Thể hiện bản sắc của bạn với <br />
          Dây Đeo Thể Thao Pride Edition mới.{" "}
        </p>
      </AnimatedSection>

      {/* Apple Watch Section */}
      <AnimatedSection
        backgroundImage="https://www.apple.com/vn/home/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_medium_2x.jpg"
        className="bg-gray-100 text-center py-8 px-4"
        link="/iphone-12345" // Thêm link
      >
        <div className="mb-1 flex justify-center items-center gap-1 text-3xl font-black">
          iPhone
        </div>
        <div className="text-xl mb-4">Giới thiệu dòng iPhone 16.</div>
      </AnimatedSection>

      {/* iPad Pro Section */}
      <AnimatedSection
        backgroundImage="https://www.apple.com/v/home/ce/images/heroes/mothers-day-2025/hero_md25__ca4cocy2qlv6_medium_2x.png"
        className="bg-black text-center py-8 px-4"
        link="/phu-kien-11223" // Thêm link
      >
        <h2 className="font-sans text-3xl font-black mb-1">Ngày Của Mẹ</h2>
        <p className="text-xl mb-4">Vẫn còn kịp để tìm món quà ưng ý cho Mẹ.</p>
      </AnimatedSection>

      {/* Grid Section với hiệu ứng stagger và cạnh chéo, nằm cùng hàng */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-0 relative"
      >
        <GridItem
          title="iPad Air"
          description="Nay siêu mạnh mẽ với chip M3."
          buttonText="Mua sắm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/ipad-air/promo_ipad_air__bfbxzvw65c02_large.jpg"
          position="start"
          link="/ipad-98765" // Thêm link
        />
        <GridItem
          title="MacBook Air"
          description="Mỏng hơn. Mạnh hơn. Màu vàng sang trọng tới từ M1."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/macbook-air/promo_macbook_air_avail__e8ksaudoisey_large.jpg"
          position="middle"
          link="/mac-67890" // Thêm link
        />
        <GridItem
          title="iPad Pro"
          description="Mỏng không tưởng. Mạnh không ngờ."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/ipad-pro/promo_ipadpro_avail__s271j89g8kii_large.jpg"
          position="middle"
          link="/ipad-98765" // Thêm link
        />
        <GridItem
          title="AirPods 4"
          description="Đẹp biểu tượng. Hay phi thường. Nay với tính năng Chủ Động Khử Tiếng Ồn."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/airpods-4/promo_airpods_4_avail__bl22kvpg6ez6_large.jpg"
          position="end"
          link="/phu-kien-11223" // Thêm link
        />
      </motion.section>
      <div>
        <ProductSection />
      </div>
    </div>
  );
};

export default memo(HomePage);
