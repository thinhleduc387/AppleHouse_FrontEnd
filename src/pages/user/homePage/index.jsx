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
  // const [homePageData, setHomePageData] = useState([]);
  // const [categoryNames, setCategoryNames] = useState({});
  // const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const userId = queryParams.get("user");
  //   const accessToken = queryParams.get("token");
  //   if (userId && accessToken) {
  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("user_id", userId);
  //   }
  //   handleGetHomePageProduct();
  // }, []);
  // const handleGetHomePageProduct = async () => {
  //   try {
  //     const response = await getHomePageProduct();
  //     if (response && response.metadata) {
  //       // Định dạng lại sản phẩm
  //       const formattedData = response.metadata
  //         .map((category) => ({
  //           ...category,
  //           spusWithPrice: category.spusWithPrice.map((product) => ({
  //             id: product._id,
  //             name: product?.product_name,
  //             imageSrc: product?.product_thumb,
  //             productPrice: product?.product_price,
  //             link: `/products/${product?.product_slug}`,
  //             rating: product?.product_ratingAverage,
  //             tags: product?.product_tags,
  //           })),
  //         }))
  //         .filter((category) => category.spusWithPrice.length > 0);
  //       setHomePageData(formattedData);
  //       // Fetch category names and descriptions
  //       const categoryNamePromises = response.metadata.map((category) =>
  //         getCategoryById(category.category._id).then((res) => ({
  //           id: category.category._id,
  //           name: res?.metadata?.category_name || "Unnamed Category",
  //           description:
  //             res?.metadata?.category_description || "No description",
  //         }))
  //       );
  //       const names = await Promise.all(categoryNamePromises);
  //       const nameMap = names.reduce((acc, { id, name, description }) => {
  //         acc[id] = { name, description }; // Map category ID với name và description
  //         return acc;
  //       }, {});
  //       setCategoryNames(nameMap); // Update state với category names và descriptions
  //     } else {
  //       console.error("Failed to fetch home page data.");
  //     }
  //     console.log("🚀 ~ handleGetHomePageProduct ~ response:", response);
  //   } catch (error) {
  //     console.error("Error fetching home page data:", error);
  //   }
  // };
  // return (
  //   <div className="space-y-8">
  //     {/* Banner */}
  //     <div>
  //       <Banner />
  //     </div>
  //     {/* Product Categories */}
  //     <div>
  //       <ProductCategory />
  //     </div>
  //     {/* Flash Sale */}
  //     <div>
  //       <FlashSale />
  //     </div>
  //     {/* Discounted Products */}
  //     <div>
  //       <DiscountProduct />
  //     </div>
  //     {/* Recommended Sections */}
  //     {isAuthenticated ? (
  //       <div>
  //         <RecommendSection />
  //       </div>
  //     ) : (
  //       <div>
  //         <RecommendSectionTrending />
  //       </div>
  //     )}
  //     {/* Dynamic Product Sections */}
  //     {homePageData.map((category) => (
  //       <div key={category._id}>
  //         <ProductSection
  //           products={category.spusWithPrice}
  //           title={`${
  //             categoryNames[category.category._id]?.name || "Loading..."
  //           } - ${
  //             categoryNames[category.category._id]?.description ||
  //             "Loading description..."
  //           }`}
  //         />
  //       </div>
  //     ))}
  //     <div className="py-10"></div>
  //   </div>
  // );
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div>
        <Banner />
      </div>

      {/* Apple Watch Section */}
      <section className="bg-gray-100 text-center py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="font-sans text-black mb-1 flex justify-center items-center gap-1 text-base font-semibold">
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
          <div className="text-xs font-semibold text-gray-700 mb-1">
            SERIES 10
          </div>
          <div className="text-xs text-gray-700 mb-4">Mỏng hơn. Mãi đỉnh.</div>
          <div className="flex justify-center gap-3">
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-blue-600 text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-50 transition">
              Mua
            </button>
          </div>
        </div>
        <div className="mt-6">
          <img
            alt="Side view of a black Apple Watch Series 10 with a black strap on a light gray background"
            className="mx-auto max-w-full h-auto"
            src="https://storage.googleapis.com/a1aa/image/d913a0dc-2788-4f97-dc94-46662b0fa0ef.jpg"
            width="600"
            height="200"
          />
        </div>
      </section>

      {/* iPad Pro Section */}
      <section className="bg-black text-center py-8 px-4">
        <div className="max-w-md mx-auto text-white">
          <h2 className="font-sans font-bold text-lg mb-1">iPad Pro</h2>
          <p className="text-xs mb-4">Mỏng không tưởng. Mạnh không ngờ.</p>
          <div className="flex justify-center gap-3 mb-6">
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-blue-600 text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-900 hover:text-white transition">
              Mua
            </button>
          </div>
          <img
            alt="Side view of an iPad Pro with colorful screen edges on a black background"
            className="mx-auto max-w-full h-auto"
            src="https://storage.googleapis.com/a1aa/image/b42be2d9-2ff1-4edc-3340-5795c1856e29.jpg"
            width="600"
            height="200"
          />
        </div>
      </section>

      {/* iPhone Section */}
      <section className="bg-gray-100 text-center py-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="font-sans font-bold text-lg mb-1 text-black">
            iPhone
          </h2>
          <p className="text-xs mb-4 text-black">Giới thiệu dòng iPhone 16.</p>
          <div className="flex justify-center gap-3 mb-6">
            <button className="bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-700 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-600 text-blue-600 text-xs font-semibold rounded-full px-4 py-1 hover:bg-blue-50 hover:text-blue-900 transition">
              Mua sắm iPhone
            </button>
          </div>
          <img
            alt="Three iPhone 16 models in gold, blue, and white colors standing side by side on a light gray background"
            className="mx-auto max-w-full h-auto"
            src="https://storage.googleapis.com/a1aa/image/cd6614a6-b8bf-4b62-c2c8-2bce2afa55d5.jpg"
            width="600"
            height="200"
          />
        </div>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Ngày Của Mẹ */}
        <div className="bg-white text-center py-8 px-4 border border-gray-200">
          <img
            alt="Colorful Apple logo with confetti on white background"
            className="mx-auto max-w-full h-auto mb-4"
            src="https://storage.googleapis.com/a1aa/image/7b7656f8-f374-46d9-ee8b-03daf4eacf38.jpg"
            width="600"
            height="250"
          />
          <p className="text-sm font-semibold mb-1">Ngày Của Mẹ</p>
          <p className="text-xs mb-4">Tìm món quà ý nghĩa cho Mẹ.</p>
          <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
            Mua sắm
          </button>
        </div>

        {/* MacBook Air */}
        <div className="bg-[#d9e9f9] text-center py-8 px-4 border border-gray-200">
          <p className="text-xs font-semibold mb-1">MacBook Air</p>
          <p className="text-xs mb-4">
            Mỏng hơn. Mạnh hơn. Màu vàng sang trọng tới từ M1.
          </p>
          <div className="flex justify-center mb-6 gap-3">
            <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-700 text-blue-700 text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 transition">
              Mua
            </button>
          </div>
          <img
            alt="MacBook Air open side view on light blue background"
            className="mx-auto max-w-full h-auto"
            src="https://storage.googleapis.com/a1aa/image/b4ce208c-0f72-4da1-ae9a-462fe5444ace.jpg"
            width="600"
            height="250"
          />
        </div>

        {/* Mac làm được đó */}
        <div className="bg-white text-center py-8 px-4 border border-gray-200">
          <p className="text-xs font-semibold mb-1">
            Mac làm được đó.{" "}
            <span className="text-green-600 font-bold">Đa dạng.</span>
          </p>
          <p className="text-xs mb-4">
            Hãy xem chuyên sâu sử dụng Mac mỗi ngày.
          </p>
          <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
            Tìm hiểu thêm
          </button>
          <img
            alt="Multiple Mac devices with screens showing apps on light background"
            className="mx-auto max-w-full h-auto mt-6"
            src="https://storage.googleapis.com/a1aa/image/05a03a1d-e8e4-4c33-1ea1-89f5f2fe66bb.jpg"
            width="600"
            height="250"
          />
        </div>

        {/* iPad Air */}
        <div className="bg-[#d9e9f9] text-center py-8 px-4 border border-gray-200">
          <p className="text-xs font-semibold mb-1">iPad Air</p>
          <p className="text-xs mb-4">Nay sắc màu mới với chip M1.</p>
          <div className="flex justify-center mb-6 gap-3">
            <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-700 text-blue-700 text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 transition">
              Mua
            </button>
          </div>
          <img
            alt="iPad Air multiple colors fanned out on light blue background"
            className="mx-auto max-w-full h-auto"
            src="https://storage.googleapis.com/a1aa/image/bde467a3-bfff-43d2-98e5-df9385da026b.jpg"
            width="600"
            height="250"
          />
        </div>

        {/* Mac Studio */}
        <div className="bg-white text-center py-8 px-4 border border-gray-200">
          <img
            alt="Silhouette of a person with hand raised on dark background"
            className="mx-auto max-w-full h-auto mb-4"
            src="https://storage.googleapis.com/a1aa/image/2b75b2d3-12e0-4805-ce99-abe18b57234c.jpg"
            width="600"
            height="250"
          />
          <p className="text-sm font-semibold mb-1">Mac Studio</p>
          <p className="text-xs mb-4">
            M1 Max và M1 Ultra. Chọn sức mạnh của bạn bên trong.
          </p>
          <div className="flex justify-center gap-3">
            <button className="bg-blue-700 text-white text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-800 transition">
              Tìm hiểu thêm
            </button>
            <button className="border border-blue-700 text-blue-700 text-xs font-semibold rounded-full px-5 py-1.5 hover:bg-blue-50 transition">
              Mua
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(HomePage);
