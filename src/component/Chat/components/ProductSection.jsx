const ProductSection = () => {
  return (
    <div className="w-1/2 border-l flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Sản phẩm liên quan</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <p className="text-gray-500">
            Các sản phẩm sẽ hiển thị ở đây khi được tìm thấy...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;