const CategorySection = ({ categoryName, imageSrc }) => {
  return (
    <div className="max-w-xs border border-gray-300 pb-5 rounded-2xl drop-shadow-lg bg-white relative overflow-hidden">
      {/* Phần chứa tiêu đề (categoryName) */}
      <div className="absolute top-2 left-2 pt-2 pl-2">
        <p className="text-xl text-[#252B42] font-semibold tracking-wider">{categoryName}</p>
      </div>

      {/* Phần chứa hình ảnh */}
      <div className="flex justify-center mt-16">
        <img
          className="w-[144px] h-[144px] object-cover"
          src={imageSrc}
          alt={categoryName}
        />
      </div>
    </div>
  );
};

export default CategorySection;
