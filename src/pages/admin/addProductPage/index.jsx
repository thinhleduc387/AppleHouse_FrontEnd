// src/pages/admin/AddProductPage.js

import React, { useState } from "react";
import AddSPUInfo from "../../../component/admin/addProduct/AddSPUInfo";
import AddVariationsInfo from "../../../component/admin/addProduct/AddVariationsInfo";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: [],
    description: "",
    tags: [],
    thumb: null,
  });
  console.log("🚀 ~ AddProductPage ~ productData:", productData)

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
    // Add API call or other logic to handle form submission
  };

  return (
    <div>
      <div>
        {/* Sử dụng ProductForm để hiển thị form tạo sản phẩm */}
        <AddSPUInfo
          productData={productData}
          handleChange={handleChange}
          setProductData={setProductData}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="mt-10">
        <AddVariationsInfo />
      </div>
    </div>
  );
};

export default AddProductPage;
