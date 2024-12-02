import {
  AiOutlineEye,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineEdit, // Thêm icon edit
} from "react-icons/ai";
import { FaTruck, FaTag } from "react-icons/fa";
import { useState } from "react";
import { ROUTERS } from "../../utils/router"; // Đảm bảo đường dẫn đúng

const ProductItem = ({ productId, isEdit }) => {
  const [showTooltipFavorites, setShowTooltipFavorites] = useState(false);
  const [showTooltipQuickLook, setShowTooltipQuickLook] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm relative flex flex-col">
      <div className="h-56 w-full">
        {/* Sử dụng thẻ <a> với href để điều hướng */}
        <a href={ROUTERS.GUEST.PRODUCT_DETAIL(productId)}>
          <img
            className="mx-auto h-full"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
            alt=""
          />
        </a>
      </div>
      <div className="pt-6 flex-grow">
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onMouseEnter={() => setShowTooltipQuickLook(true)}
              onMouseLeave={() => setShowTooltipQuickLook(false)}
            >
              <span className="sr-only">Quick look</span>
              <AiOutlineEye className="h-5 w-5" />
              {showTooltipQuickLook && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Quick look
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              )}
            </button>

            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onMouseEnter={() => setShowTooltipFavorites(true)}
              onMouseLeave={() => setShowTooltipFavorites(false)}
            >
              <span className="sr-only">Add to Favorites</span>
              <AiOutlineHeart className="h-5 w-5" />
              {showTooltipFavorites && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Add to favorites
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Sử dụng thẻ <a> với href để điều hướng */}
        <a
          href={ROUTERS.GUEST.PRODUCT_DETAIL(productId)}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          Apple iMac 27, 1TB HDD, Retina 5K Display, M3 Max
        </a>

        <div className="mt-2 flex items-center gap-2">
          {/* Star Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} className="h-4 w-4 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900">5.0</p>
          <p className="text-sm font-medium text-gray-500">(455)</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <FaTruck className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-500">Fast Delivery</p>
          </li>
          <li className="flex items-center gap-2">
            <FaTag className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-500">Best Price</p>
          </li>
        </ul>

        {/* Điều kiện để hiển thị giá và nút "Add to cart" hay nút "Edit" */}
        {!isEdit && (
          <div className="mt-4 mb-5">
            <p className="text-sm text-slate-900">
              <span className="line-through">35.000.000</span>{" "}
              <span className="font-light underline">đ</span>{" "}
              <span className="text-red-600">-44%</span>
            </p>
            <p className="text-2xl font-bold text-slate-900">
              33.999.000{" "}
              <span className="text-xl font-bold text-slate-900 underline">
                đ
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Nút Add to Cart hoặc Edit */}
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex items-center text-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 min-w-36"
        >
          {isEdit ? (
            <>
              <AiOutlineEdit className="h-5 w-5 mr-2" />
              Edit
            </>
          ) : (
            <>
              <AiOutlineShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
