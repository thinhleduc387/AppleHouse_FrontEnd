import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteItemInCart, updateQuantity } from "../../config/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import OptionsCard from "../Product/OptionsCard";
import {
  fetchCart,
  removeFromLocalCart,
  updateLocalCartQuantity,
} from "../../redux/slice/cartSlice";
import { useTranslation } from "react-i18next"; // Import useTranslation

const CartItem = ({
  isSelectAll,
  cartItem,
  setSelectedProducts,
  setCartItems,
  setCartItemsSelected,
}) => {
  const { t } = useTranslation("cart"); // Sử dụng hook useTranslation để lấy hàm t
  const product = {
    skuId: cartItem.skuId,
    spuId: cartItem.spuId,
    name: cartItem.name,
    imageUrl: cartItem.thumb,
    price: cartItem.priceAfterDiscount,
    discountPrice: cartItem.originalPrice,
    loyalPoint: cartItem.loyalPoint,
    quantity: cartItem.quantity,
  };
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [selectedColor, setSelectedColor] = useState("256 GB");
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state) => state.account?.user?._id);

  useEffect(() => {
    setIsChecked(isSelectAll);
    if (isSelectAll) {
      setSelectedProducts((prev) => [
        ...prev.filter((item) => item.skuId !== cartItem.skuId),
        {
          skuId: cartItem.skuId,
          quantity: cartItem.quantity,
          spuId: cartItem.spuId,
          price: cartItem.price,
        },
      ]);
      setCartItemsSelected((prev) => [
        ...prev.filter((item) => item.skuId !== cartItem.skuId),
        cartItem,
      ]);
    } else {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.skuId !== cartItem.skuId)
      );
      setCartItemsSelected((prev) =>
        prev.filter((item) => item.skuId !== cartItem.skuId)
      );
    }
  }, [
    isSelectAll,
    cartItem.skuId,
    cartItem.quantity,
    setSelectedProducts,
    setCartItemsSelected,
  ]);

  const handleIncreaseQuantity = () => {
    if (userId) {
      if (callUpdateQuantity(quantity, quantity + 1, product.skuId)) {
        setQuantity((prev) => prev + 1);

        setSelectedProducts((prev) =>
          prev.map((item) =>
            item.skuId === product.skuId
              ? { ...item, quantity: quantity + 1 }
              : item
          )
        );

        setCartItemsSelected((prev) =>
          prev.map((item) =>
            item.skuId === product.skuId
              ? { ...item, quantity: quantity + 1 }
              : item
          )
        );
      }
    } else {
      setQuantity((prev) => {
        dispatch(
          updateLocalCartQuantity({ skuId: product.skuId, quantity: prev + 1 })
        );
        return prev + 1;
      });
    }
  };

  const handleDeleteCart = async () => {
    if (userId) {
      const response = await deleteItemInCart({ userId, skuId: product.skuId });
      if (response.metadata.modifiedCount !== 0) {
        toast.success(t("deleteSuccess")); // Dịch "Delete successful"
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.skuId !== product.skuId)
        );
        dispatch(fetchCart(userId));
        setIsModalOpen(false);
      }
    } else {
      dispatch(removeFromLocalCart({ skuId: product.skuId }));
      setIsModalOpen(false);
    }
  };

  const handleDecreaseQuantity = () => {
    if (userId) {
      if (quantity > 1) {
        if (callUpdateQuantity(quantity, quantity - 1, product.skuId))
          setQuantity((prev) => prev - 1);

        setSelectedProducts((prev) =>
          prev.map((item) =>
            item.skuId === product.skuId
              ? { ...item, quantity: quantity - 1 }
              : item
          )
        );
        setCartItemsSelected((prev) =>
          prev.map((item) =>
            item.skuId === product.skuId
              ? { ...item, quantity: quantity - 1 }
              : item
          )
        );
      } else {
        setIsModalOpen(true);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => {
          dispatch(
            updateLocalCartQuantity({
              skuId: product.skuId,
              quantity: prev - 1,
            })
          );
          return prev - 1;
        });
      } else {
        setIsModalOpen(true);
      }
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.skuId !== product.skuId)
      );
      setCartItemsSelected((prev) =>
        prev.filter((item) => item.skuId !== product.skuId)
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          skuId: product.skuId,
          quantity: quantity,
          spuId: product.spuId,
          price: product.price,
        },
      ]);
      setCartItemsSelected((prev) => [
        ...prev,
        { ...cartItem, quantity: quantity },
      ]);
    }
    setIsChecked(!isChecked);
  };

  const callUpdateQuantity = async (old_quantity, quantity, skuId) => {
    const response = await updateQuantity({
      userId,
      item_products: {
        old_quantity,
        quantity,
        skuId,
      },
    });

    if (response.status === 200) {
      return 1;
    } else {
      toast.error(t("updateQuantityFailed")); // Dịch "Câp nhật số lượng thất bại"
    }
  };

  return (
    <div className="grid grid-cols-3 items-center">
      <div className="col-span-2 flex items-center gap-4">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isChecked}
          className="w-4 h-4 cursor-pointer"
          onChange={handleCheckboxChange}
        />
        <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md border border-gray-300">
          <img
            src={product.imageUrl}
            className="w-full h-full object-contain"
            alt={product.name}
          />
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="lg:text-base md:text-sm text-xs font-bold text-gray-800">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto space-y-4 md:space-y-0 md:space-x-7">
        <div className="flex flex-col items-end">
          <span className="text-base font-bold text-gray-800">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>

          {product.discountPrice && (
            <span className="text-xs text-gray-500 line-through">
              {product.discountPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>

        <div className="flex items-center pr-2">
          <div className="flex items-center space-x-4 pr-2">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-red-500 hover:border-red-500"
              onClick={() => {
                handleDecreaseQuantity();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 12h14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2z" />
              </svg>
            </button>

            <span className="text-base font-semibold text-gray-800 w-6 text-center">
              {quantity}
            </span>

            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-green-500 hover:border-green-500"
              onClick={() => {
                handleIncreaseQuantity();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1z" />
              </svg>
            </button>
          </div>
          <button
            className="text-gray-600 hover:text-red-600"
            onClick={() => setIsModalOpen(true)}
          >
            <RiDeleteBin6Line className="w-6 h-6" />
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t("confirmDeleteProduct")}{" "}
                  {/* Dịch "Xác nhận xóa sản phẩm" */}
                </h3>
                <p className="text-sm text-gray-600 my-4">
                  {t("deleteConfirmationMessage")}{" "}
                  {/* Dịch "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?" */}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {t("cancel")} {/* Dịch "Hủy" */}
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={handleDeleteCart}
                  >
                    {t("delete")} {/* Dịch "Xóa" */}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
