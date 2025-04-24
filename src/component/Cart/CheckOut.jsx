import React, { useEffect, useState } from "react";
import { formatVND } from "../../utils";
import { createOrder, getCheckout } from "../../config/api";
import { BsCoin } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import VoucherSideBar from "./VoucherSidebar";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setHiddenChatBot } from "../../redux/slices/chatBotSlice";
import { setCheckoutValue } from "../../redux/slices/checkoutSlice";

const stripePromise = loadStripe(
  "pk_test_51QIm5tAz954xg8ieJMNAloyxbeBbsLt9YaVak4sFrSh93vs4vTJfNlWbbA0wcOWXZSK2vVvw2bqewWpPbiC8WSaK00xz976rWR"
);

const CheckOut = ({
  products_order,
  userId,
  onCheckout,
  onContinueShopping,
  isCheckout,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkoutValue, guestInformation } = useSelector(
    (state) => state.checkout
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const accLoyalPoint = useSelector((state) => state.account?.user?.loyalPoint);
  const [useLoyalPoints, setUseLoyalPoints] = useState(false);
  const selectedVoucher = useSelector(
    (state) => state.checkout.selectedVoucher
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const cartId = useSelector((state) => state.cart._id);
  const { orderMethodPayment, orderAddress, orderNote } = useSelector(
    (state) => state.checkout
  );
  const data = {
    cartId,
    userId,
    products_order,
    shop_discount: selectedVoucher,
    user_address: orderAddress,
    payment_method: orderMethodPayment,
    isUseLoyalPoint: useLoyalPoints,
    orderNote,
  };
  console.log("🚀 ~ data:", data);

  const toggleOpenSideBar = (value) => {
    setSidebarOpen(value);
    dispatch(setHiddenChatBot(value));
  };

  useEffect(() => {
    const handleCheckOut = async () => {
      try {
        const response = await getCheckout({
          products_order,
          userId,
          shop_discount: selectedVoucher,
          isUseLoyalPoint: useLoyalPoints,
        });
        if (response.status === 200) {
          dispatch(setCheckoutValue(response.metadata.checkOut_order));
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error.message);
      }
    };

    handleCheckOut();
  }, [products_order, userId, selectedVoucher, useLoyalPoints]);

  const handleCheckout = async () => {
    if (isProcessing) return;

    if (!orderAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    try {
      setIsProcessing(true);

      // Tạo order
      const response = await createOrder({
        guestInformation,
        cartId,
        userId,
        products_order,
        shop_discount: selectedVoucher,
        user_payment: null,
        user_address: orderAddress,
        payment_method: orderMethodPayment,
        isUseLoyalPoint: useLoyalPoints,
        orderNote,
      });

      const { sessionId, order } = response.metadata;

      if (!sessionId && order) {
        // xóa hàng ở local storage
        if (!userId) {
          let cart = JSON.parse(localStorage.getItem("cart"));
          const purchasedSkuIds = order.order_products.map(
            (item) => item.skuId
          );
          const updatedCart = cart.filter(
            (item) => !purchasedSkuIds.includes(item.skuId)
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }

        navigate(`/order/order-success/${order?.order_trackingNumber}`);
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-4 md:self-start shadow-md top-20">
      {products_order.length > 0 && (
        <div
          className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md cursor-pointer"
          onClick={() => toggleOpenSideBar(true)}
        >
          <span className="text-gray-800 text-sm font-medium flex items-center gap-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              %
            </span>
            Chọn hoặc nhập ưu đãi
          </span>
          <FaChevronRight className="text-gray-500" />
        </div>
      )}

      {products_order.length > 0 && (
        <div className="flex items-center justify-between mt-6 border rounded-md px-4 py-3">
          <div className="flex items-center gap-3">
            <BsCoin size={24} color="#E5A624" />
            <span className="text-gray-600 text-sm font-medium">
              Sử dụng {accLoyalPoint} điểm (~
              {formatVND(accLoyalPoint)})
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
            />
          </div>
        </div>
      )}

      <ul className="text-gray-800 mt-6 space-y-4">
        <li className="flex justify-between text-base">
          Tổng tiền
          <span className="font-bold">
            {formatVND(checkoutValue.totalPrice)}
          </span>
        </li>
        <hr />
        <li className="flex justify-between text-base">
          Khuyến mãi sản phẩm
          <span className="font-bold">
            {formatVND(checkoutValue.productDiscount)}
          </span>
        </li>
        <hr />
        <li className="flex justify-between text-base">
          Khuyến mãi voucher
          <span className="font-bold">
            {formatVND(checkoutValue.voucherDiscount)}
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
            <span className="ml-1">
              {checkoutValue.accLoyalPoint.toLocaleString("vi-VN")}
            </span>
          </span>
        </li>
        <hr />
        <li className="flex justify-between text-base ">
          Cần thanh toán
          <span className="text-red-500 font-bold">
            {formatVND(checkoutValue.totalCheckOut)}
          </span>
        </li>
      </ul>

      <div className="mt-8 space-y-2">
        {isCheckout ? (
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isProcessing || products_order.length === 0}
            className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md ${
              isProcessing || products_order.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        ) : (
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
            Xác nhận đơn
          </button>
        )}
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Tiếp tục mua sắm
        </button>
      </div>

      <VoucherSideBar
        isOpen={isSidebarOpen}
        setIsOpen={toggleOpenSideBar}
        products_order={products_order}
        isUseLoyalPoint={useLoyalPoints}
      />
    </div>
  );
};

export default CheckOut;
