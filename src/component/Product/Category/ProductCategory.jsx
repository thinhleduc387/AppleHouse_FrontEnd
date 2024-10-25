import CategorySection from './CategorySection';

const ProductCategory = () => {
  // Khởi tạo danh sách các danh mục (CategoryList)
  const CategoryList = [
    {
      id: 1,
      name: "iPhone",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/IP_Desk.png",
    },
    {
      id: 2,
      name: "Mac",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Mac_Desk.png",
    },
    {
      id: 3,
      name: "iPad",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Ipad_Desk.png",
    },
    {
      id: 4,
      name: "Apple Watch",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Watch_Desk.png",
    },
    {
      id: 5,
      name: "Tai nghe, loa",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Speaker_Desk.png",
    },
    {
      id: 6,
      name: "Phụ kiện",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Phukien_Desk.png",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      {/* Render danh sách các CategorySection */}
      {CategoryList.map((category) => (
        <CategorySection
          key={category.id}
          categoryName={category.name}
          imageSrc={category.imageSrc}
        />
      ))}
    </div>
  );
};

export default ProductCategory;
