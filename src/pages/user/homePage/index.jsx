import React, { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Banner from "../../../component/Banner";

import "./style.css";

// Component cho section với hiệu ứng scroll
const AnimatedSection = ({ children, backgroundImage, className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative min-h-screen bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto relative z-10 text-black pt-4 top-0">
        {children}
      </div>
    </motion.section>
  );
};

// Component cho grid item với hiệu ứng stagger và cạnh chéo
const GridItem = ({
  title,
  description,
  buttonText,
  backgroundImage,
  position,
}) => {
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
            <p className="text-xl text-white  font-semibold mb-1">{title}</p>
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
            className="bg-blue-700 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-800 transition"
          >
            Tìm hiểu thêm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border border-blue-700 text-black text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            Mua
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

  return (
    <div>
      {/* Banner với parallax */}
      <motion.div style={{ y }} className="relative">
        <Banner />
      </motion.div>

      {/* Apple Watch Section */}
      <AnimatedSection
        backgroundImage="https://www.apple.com/vn/home/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_medium_2x.jpg"
        className="bg-gray-100 text-center py-8 px-4"
      >
        <div className="mb-1 flex justify-center items-center gap-1 text-3xl font-black">
          iPhone
        </div>
        <div className="text-xl mb-4">Giới thiệu dòng iPhone 16.</div>
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition"
          >
            Tìm hiểu thêm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border border-blue-600 text-black text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Mua
          </motion.button>
        </div>
      </AnimatedSection>

      {/* iPad Pro Section */}
      <AnimatedSection
        backgroundImage="https://www.apple.com/v/home/ce/images/heroes/mothers-day-2025/hero_md25__ca4cocy2qlv6_medium_2x.png"
        className="bg-black text-center py-8 px-4"
      >
        <h2 className="font-sans text-3xl font-black mb-1">Ngày Của Mẹ</h2>
        <p className="text-xl mb-4">Vẫn còn kịp để tìm món quà ưng ý cho Mẹ.</p>
        <div className="flex justify-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition"
          >
            Tìm hiểu thêm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border border-blue-600 text-black text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Mua
          </motion.button>
        </div>
      </AnimatedSection>

      {/* iPhone Section */}
      <AnimatedSection
        backgroundImage="https://www.apple.com/v/home/ce/images/heroes/apple-watch-pride/hero_apple_watch_pride__ghqvc4dlapaq_medium_2x.jpg"
        className="bg-gray-100 text-center py-8 px-4"
      >
        <h2 className="font-sans text-3xl font-black mb-1">Apple Watch</h2>
        <p className="text-xl mb-4">
          Thể hiện bản sắc của bạn với <br />
          Dây Đeo Thể Thao Pride Edition mới.{" "}
        </p>
        <div className="flex justify-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
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
          description="Nay siêu mạnh mẽ với chip M3. "
          buttonText="Mua sắm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/ipad-air/promo_ipad_air__bfbxzvw65c02_large.jpg"
          position="start"
        />
        <GridItem
          title="MacBook Air"
          description="Mỏng hơn. Mạnh hơn. Màu vàng sang trọng tới từ M1."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/macbook-air/promo_macbook_air_avail__e8ksaudoisey_large.jpg"
          position="middle"
        />
        <GridItem
          title="iPad Pro"
          description="Mỏng không tưởng. Mạnh không ngờ."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/ipad-pro/promo_ipadpro_avail__s271j89g8kii_large.jpg"
          position="middle"
        />
        <GridItem
          title="AirPods 4"
          description="Đẹp biểu tượng. Hay phi thường. Nay với tính năng Chủ Động Khử Tiếng Ồn."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://www.apple.com/v/home/ce/images/promos/airpods-4/promo_airpods_4_avail__bl22kvpg6ez6_large.jpg"
          position="end"
        />
      </motion.section>
    </div>
  );
};

export default memo(HomePage);
