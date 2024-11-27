import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OptionsCard from "../../../component/Product/OptionsCard"; // Import OptionsCard

const DetailProduct = ({ productId }) => {
  const [selectedCapacity, setSelectedCapacity] = useState("256 GB");
  const [selectedColor, setSelectedColor] = useState("256 GB");

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-lg relative">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
                alt="iPhone 16 Pro Max"
                className="w-3/4 rounded object-cover mx-auto"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {[
                "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
                "https://readymadeui.com/images/laptop3.webp",
                "https://readymadeui.com/images/laptop4.webp",
                "https://readymadeui.com/images/laptop5.webp",
              ].map((src, index) => (
                <div
                  key={index}
                  className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Product ${index + 1}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-red-600 text-white rounded-full w-12 h-6 flex items-center justify-center">
              Mới
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
              iPhone 16 Pro Max 256GB
            </h2>

            <div className="flex items-center space-x-2 mt-4">
              <span className="text-gray-600">No.00911049</span>
              <span className="text-gray-600">|</span>
              <span className="text-mainColor cursor-pointer">2 đánh giá</span>
              <span className="text-gray-600">|</span>
              <span className="text-mainColor cursor-pointer">
                193 bình luận
              </span>
            </div>

            {/* Dung lượng */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Dung lượng</h3>
              <OptionsCard
                options={[{ label: "256GB" }, { label: "512GB" }]}
                selectedOption={selectedCapacity}
                onSelectOption={(option) => setSelectedCapacity(option)}
              />
            </div>

            {/* Màu sắc */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Màu sắc</h3>
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

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">$1200</p>
              <p className="text-gray-400 text-base">
                <strike>$1500</strike>{" "}
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {["black", "gray-300", "gray-100", "blue-400"].map(
                  (color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-10 h-10 bg-${color} border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all`}
                    ></button>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">
            Product information
          </h3>
          <ul className="mt-4 space-y-6 text-gray-800">
            <li className="text-sm">
              TYPE <span className="ml-4 float-right">LAPTOP</span>
            </li>
            <li className="text-sm">
              RAM <span className="ml-4 float-right">16 GB</span>
            </li>
            <li className="text-sm">
              SSD <span className="ml-4 float-right">1000 GB</span>
            </li>
            <li className="text-sm">
              PROCESSOR TYPE{" "}
              <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
            </li>
            <li className="text-sm">
              PROCESSOR SPEED{" "}
              <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
            </li>
            <li className="text-sm">
              DISPLAY SIZE INCH <span className="ml-4 float-right">16.0</span>
            </li>
            <li className="text-sm">
              DISPLAY SIZE CM <span className="ml-4 float-right">40.64 cm</span>
            </li>
            <li className="text-sm">
              DISPLAY TYPE{" "}
              <span className="ml-4 float-right">
                OLED, TOUCHSCREEN, 120 Hz
              </span>
            </li>
            <li className="text-sm">
              DISPLAY RESOLUTION{" "}
              <span className="ml-4 float-right">2880x1620</span>
            </li>
          </ul>
        </div>

        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-4">
            <div className="space-y-3">
              {[
                { score: 5, percent: "66%" },
                { score: 4, percent: "33%" },
                { score: 3, percent: "16%" },
                { score: 2, percent: "8%" },
                { score: 1, percent: "6%" },
              ].map((rating, index) => (
                <div className="flex items-center" key={index}>
                  <p className="text-sm text-gray-800 font-bold">
                    {rating.score}.0
                  </p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div
                      className={`h-full rounded bg-blue-600`}
                      style={{ width: rating.percent }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">
                    {rating.percent}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-start">
                <img
                  src="https://readymadeui.com/team-2.webp"
                  className="w-12 h-12 rounded-full border-2 border-white"
                  alt="Reviewer"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 ${
                          i < 3 ? "fill-blue-600" : "fill-[#CED5D8]"
                        }`}
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    ))}
                    <p className="text-xs !ml-2 font-semibold text-gray-800">
                      2 mins ago
                    </p>
                  </div>
                  <p className="text-sm mt-4 text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                    eiusmod tempor incidunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
              >
                Read all reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
