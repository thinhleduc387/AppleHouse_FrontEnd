import { Link } from "react-router-dom";
import CategorySection from "./CategorySection";
import { getAllCategory } from "../../../config/api";
import { useEffect, useState } from "react";

const ProductCategory = () => {
  // Khai báo state để lưu danh sách danh mục
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategory(); // Gọi hàm getCategory tại đây
  }, []);

  const getCategory = async () => {
    try {
      // Gọi API lấy danh mục
      const response = await getAllCategory();
      console.log(response.metadata);
      // Kiểm tra nếu phản hồi thành công
      if (response.status === 200 && response.metadata) {
        // Cập nhật danh sách CategoryList với dữ liệu trả về từ API
        const categories = response.metadata.map((category) => ({
          id: category._id, // Hoặc _id, tùy theo cấu trúc của response
          name: category.category_name,
          imageSrc: category.category_img, // Hoặc thuộc tính hình ảnh phù hợp
          link: `/products/${category.category_slug}`, // Giả sử slug là một thuộc tính trong API
        }));

        setCategoryList(categories); // Cập nhật state categoryList
      }
    } catch (error) {
      console.error("Get categories error:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      {/* Render danh sách các CategorySection */}
      {categoryList.map((category) => (
        <Link key={category.id} to={category.link}>
          <CategorySection
            categoryName={category.name}
            imageSrc={category.imageSrc}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductCategory;
