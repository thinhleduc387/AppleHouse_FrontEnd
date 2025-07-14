import { useSelector } from "react-redux";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const ProductSection = () => {
  const { t } = useTranslation("chatBot");
  const { current_suggested_products } = useSelector((state) => state.chatBot);

  const renderRating = (rating) => {
    const ratingNum = parseInt(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < ratingNum
                ? "text-yellow-400 dark:text-yellow-300"
                : "text-gray-300 dark:text-gray-500"
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
    <div className="w-full border-l border-gray-200 dark:border-gray-600 flex flex-col transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {t("relatedProducts")}
        </h3>
      </div>
      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {current_suggested_products && current_suggested_products.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {current_suggested_products.map((product) => (
              <a href={`/products/${product.id}`}>
                <div
                  key={product.id}
                  className="flex-none w-64 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md dark:hover:shadow-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-32 object-contain rounded-md mb-2"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                      {product.name}
                    </h4>
                    <div className="mt-1">{renderRating(product.rating)}</div>
                    <p className="mt-1 text-red-600 dark:text-red-400 font-semibold">
                      {product.price}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              {t("noProductsFound")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductSection);
