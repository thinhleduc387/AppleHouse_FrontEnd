import { useSelector } from "react-redux";

const ProductSection = () => {
  const { current_suggested_products } = useSelector((state) => state.chatBot);

  // Hàm render sao đánh giá
  const renderRating = (rating) => {
    const ratingNum = parseInt(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < ratingNum ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.098 9.384c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full border-l flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Sản phẩm liên quan</h3>
      </div>
      <div className="flex-1 p-4">
        {current_suggested_products && current_suggested_products.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {current_suggested_products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-64 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-32 object-contain rounded-md mb-2"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // Hình ảnh thay thế nếu lỗi
                  }}
                />
                <div>
                  <h4 className="font-medium text-gray-800 truncate">
                    {product.name}
                  </h4>
                  <div className="mt-1">{renderRating(product.rating)}</div>
                  <p className="mt-1 text-red-600 font-semibold">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              Các sản phẩm sẽ hiển thị ở đây khi được tìm thấy...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
