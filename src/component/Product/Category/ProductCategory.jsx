import CategorySection from './CategorySection';

const ProductCategory = () => {
  // Khởi tạo danh sách các danh mục (CategoryList)
  const CategoryList = [
    {
      id: 1,
      name: "iPhone",
      imageSrc: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/iphone_16_f27848b783.png",
    },
    {
      id: 2,
      name: "Mac",
      imageSrc: "https://cdnv2.tgdd.vn/webmwg/2024/tz/images/desktop/Mac_Desk.png",
    },
    {
      id: 3,
      name: "iPad",
      imageSrc: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/2024_5_10_638509511714852916_ipad-pro-13-inch-m4-2024-wifi-cellular-dd.jpg",
    },
    {
      id: 4,
      name: "Apple Watch",
      imageSrc: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/apple_watch_se_gps_44mm_midnight_aluminium_case_ink_sport_loop_1_284e0aed88.png",
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
    <div className="grid grid-cols-6 gap-4">
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
