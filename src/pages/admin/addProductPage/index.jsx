import React, { useState } from "react";
import AddSPUInfo from "../../../component/admin/addProduct/AddSPUInfo";
import AddVariationsInfo from "../../../component/admin/addProduct/AddVariationsInfo";
import AddAttributesInfo from "../../../component/admin/addProduct/AddAttributesInfo";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "", // Lưu giá trị category
    description: "",
    tags: [],
    thumb: null,
  });

  // Hàm xử lý thay đổi chung cho input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", productData);
  };

  return (
    <div className="p-6">
      <AddSPUInfo
        productData={productData}
        handleChange={handleChange}
        setProductData={setProductData}
        handleSubmit={handleSubmit}
      />

      <div className="mt-10">
        <AddVariationsInfo />
      </div>

      <div className="mt-10">
        {/* Truyền category cho AddAttributesInfo */}
        <AddAttributesInfo category={productData.category} />
      </div>
    </div>
  );
};

export default AddProductPage;
