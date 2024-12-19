import { useState } from "react";
import { formatVND } from "../../utils";
import { Link } from "react-router-dom";

const FlashSaleItem = ({ product }) => {
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">
        Sản phẩm không khả dụng
      </div>
    );
  }

  const { id, imageSrc, link, name, productPrice } = product;

  const calculateDiscount = () => {
    const { priceAfterDiscount, orignalPrice } = productPrice;
    const discount = ((orignalPrice - priceAfterDiscount) / orignalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <div className="rounded-lg border border-red-300 bg-white p-2 shadow-lg relative">
      <div className="h-56 flex flex-col items-center justify-center border border-[#a81f25] rounded-md p-2">
        <img className="max-h-40" src={imageSrc} alt={name} />
        <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide mt-2">
          {name}
        </h3>
      </div>
      <div className="pt-4 flex-grow">
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center justify-center bg-red-500 text-white w-full px-4 rounded-full">
            <span className="mr-2">🔥</span>
            <span className="font-medium">Đã bán 0/5 suất</span>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center">
          {productPrice.orignalPrice !== productPrice.priceAfterDiscount && (
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-red-600 mb-2">
                {formatVND(productPrice.priceAfterDiscount)}
              </p>
              <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <p className="line-through">
                  {formatVND(productPrice.orignalPrice)}
                </p>
                <p className="font-medium text-[#c0792c] bg-[#fce68b]">
                  {calculateDiscount()}%
                </p>
              </div>
            </div>
          )}

          {productPrice.orignalPrice === productPrice.priceAfterDiscount && (
            <p className="text-2xl font-bold text-gray-900 mt-4">
              {formatVND(productPrice.priceAfterDiscount)}
            </p>
          )}

          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center w-full h-fit rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sắp diễn ra
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleItem;
