import { memo, useEffect } from "react";
import Banner from "../../../component/Banner";
import ProductCategory from "../../../component/Product/Category/ProductCategory";
import DiscountProduct from "../../../component/Product/DiscountProduct";
import ProductSection from "../../../component/Product/ProductSection";
import FlashSale from "../../../component/Product/FlashSale";
import RecommendSection from "../../../component/RecommendSection/RecommendSection";
import { useSelector } from "react-redux";
import RecommendSectionTrending from "../../../component/RecommendSection/RecommendSectionTrending";
const HomePage = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("user");
    const accessToken = queryParams.get("token");

    if (userId && accessToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", userId);
    }
  }, [location]);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="">
        <Banner />
      </div>

      <div>
        <ProductCategory />
      </div>
      <div>
        <FlashSale />
      </div>
      <div>
        <DiscountProduct />
      </div>
      {isAuthenticated ? (
        <div>
          <RecommendSection />
        </div>
      ) : (
        <div>
          <RecommendSectionTrending />
        </div>
      )}
      <div>
        <ProductSection title={"Điện thoại xịn - Công nghệ hàng đầu"} />
      </div>
      <div>
        <ProductSection title={"Macbook ngon - Hiệu suất vượt trội"} />
      </div>
      <div>
        <ProductSection title={"iPad - Đa năng, tiện dụng cho mọi nhu cầu"} />
      </div>
      <div>
        <ProductSection title={"Đồng hồ thông minh - Phong cách và hiện đại"} />
      </div>
      <div>
        <ProductSection title={"Tai nghe cao cấp - Âm thanh chất lượng"} />
      </div>
    </div>
  );
};

export default memo(HomePage);
