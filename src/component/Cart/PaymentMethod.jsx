import { useState } from "react";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PaymentMethod = ({ orderMethodPayment, setOrderMethodPayment }) => {
  const { t } = useTranslation("cart");

  // Handle selecting a payment method
  const handlePaymentSelect = (method) => {
    setOrderMethodPayment(method);
  };

  return (
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
          />
          <span
            className={`ml-3 ${
              orderMethodPayment === "STRIPE"
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
          />
          <span
            className={`ml-3 ${
              orderMethodPayment === "COD"
                ? "text-blue-800 dark:text-blue-300 font-medium"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {t("payWithCOD")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
