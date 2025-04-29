<<<<<<< HEAD
import { useState } from "react";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PaymentMethod = ({ orderMethodPayment, setOrderMethodPayment }) => {
  const { t } = useTranslation("cart");

  // Handle selecting a payment method
=======
import { FaMoneyBillWaveAlt, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOrderMethodPayment } from "../../redux/slices/checkoutSlice";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const orderMethodPayment = useSelector(
    (state) => state.checkout.orderMethodPayment
  );

>>>>>>> chatBox
  const handlePaymentSelect = (method) => {
    dispatch(setOrderMethodPayment(method));
  };

  return (
<<<<<<< HEAD
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t("selectPaymentMethod")}
      </h3>

      {/* Payment options */}
      <div className="mt-4 space-y-3">
        {/* Credit Card Option */}
        <div
          className={`flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
            orderMethodPayment === "STRIPE"
              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/50"
              : "border-gray-300 dark:border-gray-700"
          }`}
          onClick={() => handlePaymentSelect("STRIPE")}
        >
          <FaMoneyBillWaveAlt
            className={`w-6 h-6 ${
              orderMethodPayment === "STRIPE"
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
=======
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2 bg-red-50 rounded-full">
          <FaCreditCard className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Phương thức thanh toán
          </h2>
          <p className="text-sm text-gray-500">
            Chọn phương thức thanh toán phù hợp với bạn
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Stripe Payment */}
        <label className="relative block">
          <input
            type="radio"
            className="hidden"
            checked={orderMethodPayment === "STRIPE"}
            onChange={() => handlePaymentSelect("STRIPE")}
>>>>>>> chatBox
          />
          <div
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              orderMethodPayment === "STRIPE"
<<<<<<< HEAD
                ? "text-blue-800 dark:text-blue-300 font-medium"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {t("payWithStripe")}
          </span>
        </div>

        {/* COD Option */}
        <div
          className={`flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
            orderMethodPayment === "COD"
              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/50"
              : "border-gray-300 dark:border-gray-700"
          }`}
          onClick={() => handlePaymentSelect("COD")}
        >
          <FaMoneyBillWaveAlt
            className={`w-6 h-6 ${
              orderMethodPayment === "COD"
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
=======
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <FaCreditCard className={`w-5 h-5 text-blue-600`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Thanh toán bằng Stripe
                </p>
                <p className="text-sm text-gray-500">
                  Thanh toán an toàn qua cổng Stripe
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                orderMethodPayment === "STRIPE"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {orderMethodPayment === "STRIPE" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </div>
        </label>

        {/* COD Payment */}
        <label className="relative block">
          <input
            type="radio"
            className="hidden"
            checked={orderMethodPayment === "COD"}
            onChange={() => handlePaymentSelect("COD")}
>>>>>>> chatBox
          />
          <div
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              orderMethodPayment === "COD"
<<<<<<< HEAD
                ? "text-blue-800 dark:text-blue-300 font-medium"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {t("payWithCOD")}
          </span>
        </div>
=======
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <FaMoneyBillWaveAlt className={`w-5 h-5 text-green-600`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Thanh toán khi nhận hàng
                </p>
                <p className="text-sm text-gray-500">
                  Thanh toán bằng tiền mặt khi nhận hàng
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                orderMethodPayment === "COD"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {orderMethodPayment === "COD" && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </div>
        </label>
>>>>>>> chatBox
      </div>
    </div>
  );
};

export default PaymentMethod;
