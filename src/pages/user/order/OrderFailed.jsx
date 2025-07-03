import React from "react";
import { XCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrderFailed() {
  const { t } = useTranslation("orderFailed");
  const navigate = useNavigate();

  const goBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4">
        {/* Main Error Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <XCircle className="w-16 h-16 text-red-500 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              {t("paymentFailedTitle")}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300">
              {t("paymentFailedMessage")}
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">
                  {t("paymentErrorTitle")}
                </h3>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-b border-gray-300 dark:border-gray-600 py-4 mb-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">
              {t("orderInfo")}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("orderIdLabel")}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  #123456
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("totalLabel")}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  1,180,000₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  {t("paymentMethodLabel")}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  Thẻ tín dụng
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={goBackToCart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("backToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
