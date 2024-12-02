import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import OptionsCard from "../OptionsCard";

const CartItem = () => {
  // Giả sử giá trị cho sản phẩm
  const product = {
    name: "Máy tính xách tay Macbook Air 13 2020 M1/8GB/256GB SSD Xám MGN63SA/A",
    imageUrl: "https://readymadeui.com/images/product14.webp",
    price: 1000000, // Giá sản phẩm
    discountPrice: 1200000, // Giá gốc trước khi giảm giá
  };
  const [selectedColor, setSelectedColor] = useState("256 GB");

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="col-span-2 flex items-center gap-4">
        <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
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
                    {
                      label: "Desert Desert ",
                      src: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/iphone_16_pro_desert_titan_de8448c1fe.png",
                    },
                    {
                      label: "Desert Desert 123",
                      src: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/iphone_16_pro_desert_titan_de8448c1fe.png",
                    },
                    {
                      label: "Desert Titan",
                      src: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/iphone_16_pro_desert_titan_de8448c1fe.png",
                    },
                    {
                      label: "Desert Titan",
                      src: "https://cdn2.fptshop.com.vn/unsafe/64x0/filters:quality(100)/iphone_16_pro_desert_titan_de8448c1fe.png",
                    },
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

        {/* Nút tăng giảm số lượng và nút xóa */}
        <div className="flex items-center space-x-6 pr-2">
          <button
            type="button"
            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-2.5 fill-current"
              viewBox="0 0 124 124"
            >
              <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
            </svg>

            <span className="mx-2.5">1</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-2.5 fill-current"
              viewBox="0 0 42 42"
            >
              <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
            </svg>
          </button>

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
