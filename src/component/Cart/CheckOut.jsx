import React, { useEffect, useState } from "react";
import { formatVND } from "../../utils";
import { getCheckout } from "../../config/api";
import { BsCoin } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";

const initCheckOutValue = {
  accLoyalPoint: 0, // Điểm khách hàng sẽ nhận được
  feeShip: 0,
  productDiscount: 0,
  totalCheckOut: 0,
  totalPrice: 0,
  voucherDiscount: 0,
  availableLoyalPoints: 0, // Điểm thưởng khả dụng mà khách hàng có thể sử dụng
};

const CheckOut = ({
  products_order,
  userId,
  onCheckout,
  onContinueShopping,
  isCheckout,
}) => {
  const [checkoutValue, setCheckOutValue] = useState(initCheckOutValue);
  const [promoCode, setPromoCode] = useState("");
  const [useLoyalPoints, setUseLoyalPoints] = useState(false); // Trạng thái sử dụng điểm thưởng
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [voucherList, setVoucherList] = useState([
    { id: 1, code: "DISCOUNT10", description: "Giảm 10% cho đơn hàng" },
    { id: 2, code: "FREESHIP", description: "Miễn phí vận chuyển" },
    {
      id: 3,
      code: "LOYALTY50",
      description: "Giảm 50k cho khách hàng thân thiết",
    },
  ]);

  useEffect(() => {
    const handleCheckOut = async () => {
      if (!products_order.length) {
        setCheckOutValue(initCheckOutValue);
        return;
      }
      try {
        const response = await getCheckout({ products_order, userId });
        if (response.status === 200) {
          setCheckOutValue(response.metadata.checkOut_order);
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error.message);
      }
    };

    handleCheckOut();
  }, [products_order, userId]);

  const handleApplyVoucher = (voucherCode) => {
    setPromoCode(voucherCode); // Gán voucher vào ô nhập mã
    setShowVoucherList(false); // Đóng danh sách voucher
    console.log("Selected voucher:", voucherCode);
  };

  return (
    <div className="bg-white rounded-md p-4 md:self-start sticky top-0 shadow-md">
      {/* Mục chọn hoặc nhập ưu đãi */}
      <div
        className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md cursor-pointer"
        onClick={() => setShowVoucherList((prev) => !prev)}
      >
        <span className="text-gray-800 text-sm font-medium flex items-center gap-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            %
          </span>
          Chọn hoặc nhập ưu đãi
        </span>
        <FaChevronRight className="text-gray-500" />
      </div>

      {/* Danh sách voucher */}
      {showVoucherList && (
        <div className="bg-gray-100 mt-2 p-4 rounded-md shadow-lg max-h-48 overflow-y-auto">
          <ul className="space-y-2">
            {voucherList.map((voucher) => (
              <li
                key={voucher.id}
                className="flex justify-between items-center bg-white p-3 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => handleApplyVoucher(voucher.code)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {voucher.code}
                  </p>
                  <p className="text-xs text-gray-600">{voucher.description}</p>
                </div>
                <button className="text-blue-500 text-sm font-semibold">
                  Áp dụng
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input mã khuyến mãi */}
      <div className="flex border border-blue-600 overflow-hidden rounded-md mt-4">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
        />
        <button
          type="button"
          onClick={() => handleApplyVoucher(promoCode)}
          className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
        >
          Apply
        </button>
      </div>

      {/* Mục sử dụng điểm thưởng */}
      <div className="flex items-center justify-between mt-6 border rounded-md px-4 py-3">
        <div className="flex items-center gap-3">
          <BsCoin size={24} color="#E5A624" />
          <span className="text-gray-600 text-sm font-medium">
            Sử dụng {checkoutValue.availableLoyalPoints} điểm (~
            {formatVND(checkoutValue.availableLoyalPoints * 1000)})
          </span>
        </div>
        <div
          className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            useLoyalPoints ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() => setUseLoyalPoints(!useLoyalPoints)}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              useLoyalPoints ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>

      {/* Chi tiết thanh toán */}
      <ul className="text-gray-800 mt-8 space-y-4">
        <li className="flex justify-between text-base">
          Giảm giá
          <span className="font-bold">
            {formatVND(checkoutValue.productDiscount)}
          </span>
        </li>
        <hr />
        <li className="flex justify-between text-base">
          Vận chuyển
          <span className="font-bold">{formatVND(checkoutValue.feeShip)}</span>
        </li>
        <hr />
        <li className="flex justify-between text-base">
          Điểm thành viên
          <span className="font-bold flex items-center">
            <BsCoin color="#e5a624" className="mr-2" />+
            <span className="ml-1">{checkoutValue.accLoyalPoint.toLocaleString("vi-VN")}</span>
          </span>
        </li>
        <hr />
        <li className="flex justify-between text-base font-bold">
          Tổng tiền
          <span>
            {formatVND(
              checkoutValue.totalCheckOut -
                (useLoyalPoints ? checkoutValue.availableLoyalPoints * 1000 : 0)
            )}
          </span>
        </li>
      </ul>

      {/* Nút hành động */}
      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={onCheckout}
          disabled={products_order.length === 0}
          className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md ${
            products_order.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isCheckout ? "Đặt hàng" : "Xác nhận đơn"}
        </button>
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
