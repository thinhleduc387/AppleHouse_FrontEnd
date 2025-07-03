import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FloatingInput from "../../../component/FloatingInput"; // Giả sử FloatingInput nằm cùng thư mục

const OrderGuest = () => {
  const { t } = useTranslation("orderGuest");
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderCode) {
      setError(t("errorInvalidTrackingNumber"));
      return;
    }
    setError("");
    navigate(`/order-guest/tracking/${orderCode}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 md:p-10 transition-colors duration-300">
      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg dark:shadow-gray-700">
          <div>
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
              {t("trackOrderTitle")}
            </h1>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-300">
              {t("trackOrderDescription")}
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <FloatingInput
                label={t("trackingNumberPlaceholder")}
                type="text"
                id="orderCode"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder={t("trackingNumberPlaceholder")}
                required
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              >
                {t("trackButton")}
              </button>
            </div>
            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderGuest;
