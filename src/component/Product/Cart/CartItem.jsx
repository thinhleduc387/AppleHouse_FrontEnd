import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import OptionsCard from "../OptionsCard";
import { deleteItemInCart, updateQuantity } from "../../../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CartItem = ({ cartItem, setSelectedProducts, setCartItems }) => {
  const product = {
    skuId: cartItem.skuId,
    name: cartItem.name,
    imageUrl: cartItem.thumb,
    price: cartItem.originalPrice,
    discountPrice: cartItem.priceAfterDiscount,
    loyalPoint: cartItem.loyalPoint,
    quantity: cartItem.quantity,
  };

  const [quantity, setQuantity] = useState(product.quantity);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý modal

  const userId = useSelector((state) => state.account?.user?._id);

  const handleDeleteCart = async () => {
    const response = await deleteItemInCart({ userId, skuId: product.skuId });
    if (response.metadata.modifiedCount !== 0) {
      toast.success("Delete successful");
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.skuId !== product.skuId)
      );
      setIsModalOpen(false);
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.skuId !== product.skuId)
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          skuId: product.skuId,
          quantity: quantity,
        },
      ]);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="col-span-2 flex items-center gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          className="w-4 h-4 cursor-pointer"
          onChange={handleCheckboxChange}
        />
        <div className="w-24 h-24 bg-white p-2 rounded-md border border-gray-300">
          <img
            src={product.imageUrl}
            className="w-full h-full object-contain"
            alt={product.name}
          />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between w-full md:w-auto space-x-4">
        <span className="text-base font-bold text-gray-800">
          {product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <button
          className="text-gray-600 hover:text-red-600"
          onClick={() => setIsModalOpen(true)} // Hiển thị modal khi nhấn xóa
        >
          <RiDeleteBin6Line className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Xác Nhận */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              Xác nhận xóa sản phẩm
            </h3>
            <p className="text-sm text-gray-600 my-4">
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDeleteCart}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
