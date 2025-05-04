import React, { memo, useEffect, useState } from "react";
import Banner from "../../../component/Banner";
import ProductCategory from "../../../component/Product/Category/ProductCategory";
import DiscountProduct from "../../../component/Product/DiscountProduct";
import ProductSection from "../../../component/Product/ProductSection";
import FlashSale from "../../../component/Product/FlashSale";
import RecommendSection from "../../../component/RecommendSection/RecommendSection";
import { useSelector } from "react-redux";
import RecommendSectionTrending from "../../../component/RecommendSection/RecommendSectionTrending";
import { getCategoryById, getHomePageProduct } from "../../../config/api";

const HomePage = () => {
  return (
    <div className="">
      {/* Banner */}
      <div>
        <Banner />
      </div>

      {/* Apple Watch Section */}
      <section
        className="bg-gray-100 text-center py-8 px-4 bg-cover bg-center relative min-h-screen"
        style={{
          backgroundImage: `url(https://www.iclarified.com/images/news/94911/453964/453964-640.avif)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-md mx-auto relative z-10 text-white">
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
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-50 hover:text-blue-600 transition">
              Mua
            </button>
          </div>
        </div>
      </section>

      {/* iPad Pro Section */}
      <section
        className="bg-black text-center py-8 px-4 bg-cover bg-center relative min-h-screen"
        style={{
          backgroundImage: `url(https://storage.googleapis.com/a1aa/image/b42be2d9-2ff1-4edc-3340-5795c1856e29.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-md mx-auto relative z-10 text-white">
          <h2 className="font-sans font-bold text-lg mb-1">iPad Pro</h2>
          <p className="text-xs mb-4">Mỏng không tưởng. Mạnh không ngờ.</p>
          <div className="flex justify-center gap-3 mb-6">
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-50 hover:text-blue-600 transition">
              Mua
            </button>
          </div>
        </div>
      </section>

      {/* iPhone Section */}
      <section
        className="bg-gray-100 text-center py-8 px-4 bg-cover bg-center relative min-h-screen"
        style={{
          backgroundImage: `url(https://storage.googleapis.com/a1aa/image/cd6614a6-b8bf-4b62-c2c8-2bce2afa55d5.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-md mx-auto relative z-10 text-white">
          <h2 className="font-sans font-bold text-lg mb-1">iPhone</h2>
          <p className="text-xs mb-4">Giới thiệu dòng iPhone 16.</p>
          <div className="flex justify-center gap-3 mb-6">
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-50 hover:text-blue-600 transition">
              Mua sắm iPhone
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Ngày Của Mẹ */}
        <div
          className="bg-white text-center py-8 px-4 border border-gray-200 bg-cover bg-center relative min-h-screen"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/a1aa/image/7b7656f8-f374-46d9-ee8b-03daf4eacf38.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10">
            <p className="text-sm font-semibold mb-1 text-white">Ngày Của Mẹ</p>
            <p className="text-xs mb-4 text-white">
              Tìm món quà ý nghĩa cho Mẹ.
            </p>
            <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
              Mua sắm
            </button>
          </div>
        </div>

        {/* MacBook Air */}
        <div
          className="bg-[#d9e9f9] text-center py-8 px-4 border border-gray-200 bg-cover bg-center relative min-h-screen"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/a1aa/image/b4ce208c-0f72-4da1-ae9a-462fe5444ace.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 text-white">
            <p className="text-xs font-semibold mb-1">MacBook Air</p>
            <p className="text-xs mb-4">
              Mỏng hơn. Mạnh hơn. Màu vàng sang trọng tới từ M1.
            </p>
            <div className="flex justify-center mb-6 gap-3">
              <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
                Tìm hiểu thêm
              </button>
              <button className="border border-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 hover:text-blue-700 transition">
                Mua
              </button>
            </div>
          </div>
        </div>

        {/* Mac làm được đó */}
        <div
          className="bg-white text-center py-8 px-4 border border-gray-200 bg-cover bg-center relative min-h-screen"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/a1aa/image/05a03a1d-e8e4-4c33-1ea1-89f5f2fe66bb.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 text-white">
            <p className="text-xs font-semibold mb-1">
              Mac làm được đó.{" "}
              <span className="text-green-400 font-bold">Đa dạng.</span>
            </p>
            <p className="text-xs mb-4">
              Hãy xem chuyên sâu sử dụng Mac mỗi ngày.
            </p>
            <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* iPad Air */}
        <div
          className="bg-[#d9e9f9] text-center py-8 px-4 border border-gray-200 bg-cover bg-center relative min-h-screen"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/a1aa/image/bde467a3-bfff-43d2-98e5-df9385da026b.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 text-white">
            <p className="text-xs font-semibold mb-1">iPad Air</p>
            <p className="text-xs mb-4">Nay sắc màu mới với chip M1.</p>
            <div className="flex justify-center mb-6 gap-3">
              <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
                Tìm hiểu thêm
              </button>
              <button className="border border-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 hover:text-blue-700 transition">
                Mua
              </button>
            </div>
          </div>
        </div>

        {/* Mac Studio */}
        <div
          className="bg-white text-center py-8 px-4 border border-gray-200 bg-cover bg-center relative min-h-screen"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/a1aa/image/2b75b2d3-12e0-4805-ce99-abe18b57234c.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 text-white">
            <p className="text-sm font-semibold mb-1">Mac Studio</p>
            <p className="text-xs mb-4">
              M1 Max và M1 Ultra. Chọn sức mạnh của bạn bên trong.
            </p>
            <div className="flex justify-center gap-3">
              <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
                Tìm hiểu thêm
              </button>
              <button className="border border-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 hover:text-blue-700 transition">
                Mua
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(HomePage);
