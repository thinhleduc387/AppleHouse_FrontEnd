import React, { memo, useEffect, useState } from "react";
import Banner from "../../../component/Banner";
import ProductCategory from "../../../component/Product/Category/ProductCategory";
import DiscountProduct from "../../../component/Product/DiscountProduct";
import ProductSection from "../../../component/Product/ProductSection";
import FlashSale from "../../../component/Product/FlashSale";
import RecommendSection from "../../../component/RecommendSection/RecommendSection";
import { useSelector } from "react-redux";
import RecommendSectionTrending from "../../../component/RecommendSection/RecommendSectionTrending";
import { getHomePageProduct } from "../../../config/api";

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("user");
    const accessToken = queryParams.get("token");

    if (userId && accessToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", userId);
    }

    handleGetHomePageProduct();
  }, []);

  const handleGetHomePageProduct = async () => {
    try {
      const response = await getHomePageProduct();
      console.log("🚀 ~ handleGetHomePageProduct ~ response:", response)
      if (response && response.metadata) {
        setHomePageData(response.metadata);
      } else {
        console.error("Failed to fetch home page data.");
      }
    } catch (error) {
      console.error("Error fetching home page data:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div>
        <Banner />
      </div>

      {/* Product Categories */}
      <div>
        <ProductCategory />
      </div>

      {/* Flash Sale */}
      <div>
        <FlashSale />
      </div>

      {/* Discounted Products */}
      <div>
        <DiscountProduct />
      </div>

      {/* Recommended Sections */}
      {isAuthenticated ? (
        <div>
          <RecommendSection />
        </div>
      ) : (
        <div>
          <RecommendSectionTrending />
        </div>
      )}

      {/* Dynamic Product Sections */}
      {homePageData &&
        homePageData.map((category) => (
          <div key={category._id}>
            <ProductSection
              products={category.bestSold}
              title={`${category.category.category_name} - ${category.category.category_description}`}
            />
          </div>
        ))}
    </div>
  );
};

export default memo(HomePage);
