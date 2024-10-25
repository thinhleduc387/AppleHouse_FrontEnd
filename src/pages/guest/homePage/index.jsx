import { memo } from "react";
import Banner from "../../../component/Banner";
import ProductCategory from "../../../component/Product/Category/ProductCategory";

const HomePage = () => {
  return (
    <>
      {/* Banner */}
      <div className="overflow-hidden  mb-8">
        <Banner />
      </div>

      {/* ProductCategory */}
      <div >
        <ProductCategory />
      </div>
    </>
  );
};

export default memo(HomePage);
