const CategorySection = ({ categoryName, imageSrc }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 pb-5 rounded-2xl drop-shadow-lg bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Phần chứa tiêu đề (categoryName) */}
      <div className="absolute top-2 left-2 pt-2 pl-2 pr-2">
        <p className="text-sm sm:text-base md:text-lg text-[#252B42] dark:text-gray-100 font-semibold tracking-wider">
          {categoryName}
        </p>
      </div>

      {/* Phần chứa hình ảnh */}
      <div className="flex justify-center mt-8 sm:mt-10 px-6">
        <img
          className="max-w-[144px] w-auto h-auto object-cover"
          src={imageSrc}
          alt={categoryName}
        />
      </div>
    </div>
  );
};

export default CategorySection;
