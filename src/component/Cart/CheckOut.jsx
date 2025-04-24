import React, { useEffect, useState } from "react";
import { formatVND } from "../../utils";
import { createOrder, getCheckout } from "../../config/api";
import { BsCoin } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import VoucherSideBar from "./VoucherSidebar";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
  "pk_test_51QIm5tAz954xg8ieJMNAloyxbeBbsLt9YaVak4sFrSh93vs4vTJfNlWbbA0wcOWXZSK2vVvw2bqewWpPbiC8WSaK00xz976rWR"
);

const initCheckOutValue = {
  accLoyalPoint: 0,
  feeShip: 0,
  productDiscount: 0,
  totalCheckOut: 0,
  totalPrice: 0,
  voucherDiscount: 0,
  availableLoyalPoints: 0,
};

const CheckOut = ({
  products_order,
  userId,
  onCheckout,
  onContinueShopping,
  isCheckout,
  orderMethodPayment,
  orderAddress,
  orderNote,
}) => {
  const { t } = useTranslation("cart");
  const navigate = useNavigate();
  const [checkoutValue, setCheckOutValue] = useState(initCheckOutValue);
  const [isProcessing, setIsProcessing] = useState(false);
  const accLoyalPoint = useSelector((state) => state.account?.user?.loyalPoint);
  const [useLoyalPoints, setUseLoyalPoints] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const cartId = useSelector((state) => state.cart._id);
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

  useEffect(() => {
    const handleCheckOut = async () => {
      if (!products_order.length) {
        setCheckOutValue(initCheckOutValue);
        return;
      }
      try {
        const response = await getCheckout({
          products_order,
          userId,
          shop_discount: selectedVoucher,
          isUseLoyalPoint: useLoyalPoints,
        });
        if (response.status === 200) {
          setCheckOutValue(response.metadata.checkOut_order);
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error.message);
      }
    };

    handleCheckOut();
  }, [products_order, userId, selectedVoucher, useLoyalPoints]);

  const handleCheckout = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const response = await createOrder({
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

      if (!sessionId) {
        navigate(`/order/order-success/${order._id}`);
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
      toast.error(error.message || t("paymentError"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-4 md:self-start shadow-md top-20">
      {products_order.length > 0 && (
        <div
          className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="text-gray-800 dark:text-gray-100 text-sm font-medium flex items-center gap-2">
            <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-full text-xs">
              %
            </span>
            {t("selectOrEnterOffer")}
          </span>
          <FaChevronRight className="text-gray-500 dark:text-gray-400" />
        </div>
      )}

      {products_order.length > 0 && (
        <div className="flex items-center justify-between mt-6 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3">
          <div className="flex items-center gap-3">
            <BsCoin size={24} color="#E5A624" />
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
              {t("usePoints", {
                points: accLoyalPoint,
                amount: formatVND(accLoyalPoint),
              })}
            </span>
          </div>
          <div
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
              useLoyalPoints
                ? "bg-blue-600 dark:bg-blue-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setUseLoyalPoints(!useLoyalPoints)}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300 ${
                useLoyalPoints ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      )}

      <ul className="text-gray-800 dark:text-gray-100 mt-6 space-y-4">
        <li className="flex justify-between text-base">
          {t("totalPrice")}
          <span className="font-bold">
            {formatVND(checkoutValue.totalPrice)}
          </span>
        </li>
        <hr className="border-gray-200 dark:border-gray-700" />
        <li className="flex justify-between text-base">
          {t("productDiscount")}
          <span className="font-bold">
            {formatVND(checkoutValue.productDiscount)}
          </span>
        </li>
        <hr className="border-gray-200 dark:border-gray-700" />
        <li className="flex justify-between text-base">
          {t("voucherDiscount")}
          <span className="font-bold">
            {formatVND(checkoutValue.voucherDiscount)}
          </span>
        </li>
        <hr className="border-gray-200 dark:border-gray-700" />
        <li className="flex justify-between text-base">
          {t("shippingFee")}
          <span className="font-bold">{formatVND(checkoutValue.feeShip)}</span>
        </li>
        <hr className="border-gray-200 dark:border-gray-700" />
        <li className="flex justify-between text-base">
          {t("loyaltyPoints")}
          <span className="font-bold flex items-center">
            <BsCoin color="#e5a624" className="mr-2" />+
            <span className="ml-1">
              {checkoutValue.accLoyalPoint.toLocaleString("vi-VN")}
            </span>
          </span>
        </li>
        <hr className="border-gray-200 dark:border-gray-700" />
        <li className="flex justify-between text-base">
          {t("amountToPay")}
          <span className="text-red-500 dark:text-red-400 font-bold">
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
                ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            }`}
          >
            {isProcessing ? t("processing") : t("placeOrder")}
          </button>
        ) : (
          <button
            type="button"
            onClick={onCheckout}
            disabled={products_order.length === 0}
            className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md ${
              products_order.length === 0
                ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            }`}
          >
            {t("confirmOrder")}
          </button>
        )}
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {t("continueShopping")}
        </button>
      </div>

      <VoucherSideBar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        products_order={products_order}
        selectedVoucher={selectedVoucher}
        setSelectedVoucher={setSelectedVoucher}
        isUseLoyalPoint={useLoyalPoints}
      />
    </div>
  );
};

export default CheckOut;
