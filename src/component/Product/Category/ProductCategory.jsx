import { Link } from "react-router-dom";
import CategorySection from './CategorySection';

const ProductCategory = () => {
  // Khởi tạo danh sách các danh mục (CategoryList)
  const CategoryList = [
    {
      id: 1,
      name: "iPhone",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/IP_Desk.png",
      link: "/products/iphone", // Đường dẫn cứng cho iPhone
    },
    {
      id: 2,
      name: "Mac",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Mac_Desk.png",
      link: "/products/mac", // Đường dẫn cứng cho Mac
    },
    {
      id: 3,
      name: "iPad",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Ipad_Desk.png",
      link: "/products/ipad", // Đường dẫn cứng cho iPad
    },
    {
      id: 4,
      name: "Apple Watch",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Watch_Desk.png",
      link: "/products/apple-watch", // Đường dẫn cứng cho Apple Watch
    },
    {
      id: 5,
      name: "Tai nghe, loa",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Speaker_Desk.png",
      link: "/products/audio", // Đường dẫn cứng cho Tai nghe và loa
    },
    {
      id: 6,
      name: "Phụ kiện",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Phukien_Desk.png",
      link: "/products/accessories", // Đường dẫn cứng cho Phụ kiện
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      {/* Render danh sách các CategorySection */}
      {CategoryList.map((category) => (
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
