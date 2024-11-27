import { memo } from "react";
import Banner from "../../../component/Banner";
import ProductCategory from "../../../component/Product/Category/ProductCategory";
import DiscountProduct from "../../../component/Product/DiscountProduct";
import ProductSection from "../../../component/Product/ProductSection";

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="overflow-hidden">
        <Banner />
      </div>

      {/* ProductCategory */}
      <div>
        <ProductCategory />
      </div>

      {/* DiscountProduct */}
      <div>
        <DiscountProduct />
      </div>

      {/* ProductSection */}
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
