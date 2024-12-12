import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import OptionsCard from "../OptionsCard";
import { updateQuantity } from "../../../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CartItem = ({ cartItem, setSelectedProducts }) => {
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
  const [selectedColor, setSelectedColor] = useState("256 GB");
  const [isChecked, setIsChecked] = useState(false);

  const userId = useSelector((state) => state.account?.user?._id);

  const handleIncreaseQuantity = () => {
    if (callUpdateQuantity(quantity, quantity + 1, product.skuId)) {
      setQuantity((prev) => prev + 1);

      setSelectedProducts((prev) =>
        prev.map((item) =>
          item.skuId === product.skuId
            ? { ...item, quantity: quantity + 1 }
            : item
        )
      );
    }
  };

  const handleDecreaseQuantity = () => {
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
      toast.error("Câp nhất số lượng thất bại");
    }
  };
  return (
    <div className="grid grid-cols-3 items-center gap-4">
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

        <div>
          <h3 className="text-base font-bold text-gray-800">{product.name}</h3>

          <div className="flex gap-4 mt-4">
            <div className="relative group">
              <button
                type="button"
                className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
              >
                {selectedColor.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2.5 fill-gray-500 inline ml-2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="group-hover:block hidden absolute rounded-md shadow-lg bg-white z-[1000] w-[400px] p-2">
                <OptionsCard
                  options={[
                    {
                      label: "Desert Titan",
                      src: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/iphone_16_pro_desert_titan_de8448c1fe.png",
                    },
                  ]}
                  selectedOption={selectedColor}
                  onSelectOption={(option) => setSelectedColor(option)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần giá và các nút (giảm số lượng, tăng số lượng và xóa) */}
      <div className="ml-auto flex flex-col md:flex-row items-center justify-between w-full md:w-auto space-y-4 md:space-y-0 md:space-x-7">
        {/* Chứa giá và giá gốc theo dạng cột */}
        <div className="flex flex-col items-end">
          {/* Giá hiện tại */}
          <span className="text-base font-bold text-gray-800">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>

          {/* Giá gốc nếu có */}
          {product.discountPrice && (
            <span className="text-xs text-gray-500 line-through">
              {product.discountPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-6 pr-2">
          <div className="flex items-center space-x-4 pr-2">
            {/* Nút giảm số lượng */}
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

            {/* Hiển thị số lượng */}
            <span className="text-base font-semibold text-gray-800 w-6 text-center">
              {quantity}
            </span>

            {/* Nút tăng số lượng */}
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
          {/* Nút xóa */}
          <button className="text-gray-600 hover:text-red-600">
            <RiDeleteBin6Line className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
