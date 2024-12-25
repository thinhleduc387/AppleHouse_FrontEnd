import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createCategory, getAllCategory } from "../../../config/api";
import CustomSelect from "../../../component/CustomSelect";
import { toast } from "react-toastify";

const CategoryCreate = () => {
  const [description, setDescription] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parentId: "",
  });
  console.log("🚀 ~ CategoryCreate ~ newCategory:", newCategory)

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["image"],
    ],
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  const handleGetCategory = async () => {
    try {
      const response = await getAllCategory(); // Fetch all categories from API
      if (response && response.metadata) {
        setAllCategory(response.metadata);
      } else {
        toast.error("Failed to fetch categories!");
        console.error("Failed to fetch categories: Invalid response.");
      }
    } catch (error) {
      toast.error("Error fetching categories!");
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (field, value) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory(newCategory); // Gửi yêu cầu API tạo danh mục mới
      if (response && response.status === 200) {
        console.log("🚀 ~ handleSubmit ~ response:", response)
        toast.success("Category created successfully!");
        // Reset form sau khi tạo thành công
        setNewCategory({ name: "", description: "", parentId: "" });
        setDescription("");
        await handleGetCategory(); // Cập nhật danh sách danh mục
      } else {
        toast.error("Failed to create category!");
      }
    } catch (error) {
      toast.error("Error creating category!");
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
        Create New Category
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name Input */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={newCategory.name}
            onChange={(e) => handleCategoryChange("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Parent Category Select */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="parentCategory"
          >
            Parent Category
          </label>
          <CustomSelect
            options={[
              { value: "", label: "None" }, // Option for no parent category
              ...allCategory.map((category) => ({
                value: category._id,
                label: category.category_name,
              })),
            ]}
            value={newCategory.parentId}
            onChange={(value) => handleCategoryChange("parentId", value)}
            placeholder="Select Parent Category"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="categoryDescription"
          >
            Description
          </label>
          <ReactQuill
            id="categoryDescription"
            value={description}
            onChange={(value) => {
              setDescription(value); // Cập nhật state riêng
              handleCategoryChange("description", value); // Đồng bộ với newCategory
            }}
            modules={modules}
            className="w-full max-h-screen overflow-y-auto border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter category description"
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;
