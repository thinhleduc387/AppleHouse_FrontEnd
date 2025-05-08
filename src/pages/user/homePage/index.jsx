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
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="max-w-md mx-auto relative z-10 text-white pt-4 top-0">
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
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 text-white pt-8">
        <p className="text-xs font-semibold mb-1">{title}</p>
        <p className="text-xs mb-4">{description}</p>
        {title === "Ngày Của Mẹ" ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-700 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-800 transition"
          >
            {buttonText}
          </motion.button>
        ) : (
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
              className="border border-blue-700 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              Mua
            </motion.button>
          </div>
        )}
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
        <div className="font-sans mb-1 flex justify-center items-center gap-1 text-base font-semibold">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.365 1.43c-1.14.05-2.5.77-3.31 1.75-1.43 1.7-1.2 4.3.3 5.7.9.9 2.3 1.3 3.5 1.1-.1-1.3.4-2.8 1.3-3.7.9-1 2.3-1.5 3.5-1.3-.1-1.3-.9-2.7-2.3-3.5-1.1-.6-2.3-.7-3-.05zM12 6.5c-3.3 0-6 2.7-6 6 0 3.3 2.7 6 6 6 3.3 0 6-2.7 6-6 0-3.3-2.7-6-6-6z"></path>
          </svg>
          WATCH
        </div>
        <div className="text-xs font-semibold mb-1">SERIES 10</div>
        <div className="text-xs mb-4">Mỏng hơn. Mãi đỉnh.</div>
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
            className="border border-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
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
        <h2 className="font-sans font-bold text-lg mb-1">iPad Pro</h2>
        <p className="text-xs mb-4">Mỏng không tưởng. Mạnh không ngờ.</p>
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
            className="border border-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
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
        <h2 className="font-sans font-bold text-lg mb-1">iPhone</h2>
        <p className="text-xs mb-4">Giới thiệu dòng iPhone 16.</p>
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
            className="border border-blue-600 text-white text-base font-semibold rounded-full px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Mua sắm iPhone
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
          title="Ngày Của Mẹ"
          description="Tìm món quà ý nghĩa cho Mẹ."
          buttonText="Mua sắm"
          backgroundImage="https://storage.googleapis.com/a1aa/image/7b7656f8-f374-46d9-ee8b-03daf4eacf38.jpg"
          position="start"
        />
        <GridItem
          title="MacBook Air"
          description="Mỏng hơn. Mạnh hơn. Màu vàng sang trọng tới từ M1."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://storage.googleapis.com/a1aa/image/b4ce208c-0f72-4da1-ae9a-462fe5444ace.jpg"
          position="middle"
        />
        <GridItem
          title="Mac làm được đó"
          description="Hãy xem chuyên sâu sử dụng Mac mỗi ngày."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://storage.googleapis.com/a1aa/image/05a03a1d-e8e4-4c33-1ea1-89f5f2fe66bb.jpg"
          position="middle"
        />
        <GridItem
          title="iPad Air"
          description="Nay sắc màu mới với chip M1."
          buttonText="Tìm hiểu thêm"
          backgroundImage="https://storage.googleapis.com/a1aa/image/bde467a3-bfff-43d2-98e5-df9385da026b.jpg"
          position="end"
        />
      </motion.section>
    </div>
  );
};

export default memo(HomePage);
