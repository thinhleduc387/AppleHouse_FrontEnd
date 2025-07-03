import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOneOrderByTrackinNumber } from "../../../config/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function OrderSuccess() {
  const { t } = useTranslation("orderSuccess");
  const { trackingNumber } = useParams();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleGetOrder = async () => {
      if (!trackingNumber) {
        setError(t("errorInvalidTrackingNumber"));
        setLoading(false);
        return;
      }
      setError("");
      setLoading(true);
      try {
        const response = await getOneOrderByTrackinNumber({
          trackingNumber,
        });
        if (response.status === 200) {
          setOrder(response.metadata);
        } else {
          setOrder({});
          toast.error(response.message || t("errorOrderNotFound"));
          setError(response.message || t("errorOrderNotFound"));
        }
      } catch (err) {
        setOrder({});
        if (
          err.response?.status === 401 &&
          err.response?.data?.message?.includes("Refresh token expired")
        ) {
          localStorage.removeItem("user");
          navigate("/login");
          toast.error(t("sessionExpired"));
        } else {
          toast.error(err.response?.data?.message || t("errorGeneric"));
          setError(err.response?.data?.message || t("errorGeneric"));
        }
      } finally {
        setLoading(false);
      }
    };
    handleGetOrder();
  }, [trackingNumber, navigate, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Clock className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin" />
      </div>
    );
  }

  if (error || !order.order_trackingNumber) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm dark:shadow-gray-700 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {t("error")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {error || t("errorOrderNotFound")}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
          >
            {t("continueShopping")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            {t("orderSuccessTitle")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {t("orderSuccessMessage")}
          </p>
          {!isAuthenticated && (
            <p className="text-center text-red-600 dark:text-red-400">
              {t("emailNotification")}
            </p>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {t("orderIdLabel")} {order.order_trackingNumber}
              </h2>
            </div>
          </div>
          <div className="border-t border-b border-gray-300 dark:border-gray-600 py-4 mb-4">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">
                {t("statusLabel")}
              </span>
              <span className="text-green-500 dark:text-green-400 font-medium">
                {order.order_status
                  ? t(
                      `status${
                        order.order_status.charAt(0).toUpperCase() +
                        order.order_status.slice(1)
                      }`
                    )
                  : t("statusConfirmed")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                {t("estimatedTimeLabel")}
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {order.estimatedDeliveryTime
                  ? formatDate(order.estimatedDeliveryTime)
                  : t("estimatedTimeValue")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("continueShopping")}
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/profile/order-list")}
              className="flex items-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              {t("viewOrderDetails")}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
