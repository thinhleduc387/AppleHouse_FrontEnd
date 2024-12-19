import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../../config/api";

const CategorySelect = ({ productData, setProductData }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await getAllCategory();
      if (response.status === 200 && response.metadata) {
        const categories = response.metadata.map((category) => ({
          id: category._id,
          name: category.category_name,
          subItems: category.children || [],
        }));
        setCategoryList(categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: [value],
    }));
  };
  return (
    <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-gray-700 font-medium mb-2"
      >
        Category
      </label>
      <select
        id="category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Chọn category</option>
        {categoryList.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
        <option value="Khác">Khác</option>
      </select>

      {productData.category === "Khác" && (
        <div className="mt-2">
          <label
            htmlFor="customCategory"
            className="block text-gray-700 font-medium mb-2"
          >
            Nhập category khác
          </label>
          <input
            type="text"
            id="customCategory"
            name="customCategory"
            value={productData.customCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập category mới"
          />
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
