import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneOrderByTrackinNumber } from "../../../config/api";
import { toast } from "react-toastify";
import { formatDate, formatVND } from "../../../utils";
import {
  FaCheck,
  FaSpinner,
  FaTruck,
  FaBoxOpen,
  FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const OderGuestDetails = () => {
  const { t } = useTranslation("orderGuest");
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrder = async (trackingNum) => {
    if (!trackingNum) {
      setError(t("errorInvalidTrackingNumber"));
      setLoading(false);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await getOneOrderByTrackinNumber({
        trackingNumber: trackingNum,
      });
      if (response.status === 200) {
        setOrderDetails(response.metadata);
      } else {
        setOrderDetails(null);
        toast.error(response.message || t("errorOrderNotFound"));
        setError(response.message || t("errorOrderNotFound"));
      }
    } catch (err) {
      setOrderDetails(null);
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

  useEffect(() => {
    if (trackingNumber) {
      fetchOrder(trackingNumber);
    }
  }, [trackingNumber]);

  const statusConfig = {
    [t("statusPending")]: {
      icon: FaCheck,
      bgColor: "bg-green-100 dark:bg-green-900",
      borderColor: "border-green-600 dark:border-green-500",
      textColor: "text-green-600 dark:text-green-500",
    },
    [t("statusProcessing")]: {
      icon: FaSpinner,
      bgColor: "bg-green-100 dark:bg-green-900",
      borderColor: "border-green-600 dark:border-green-500",
      textColor: "text-green-600 dark:text-green-500",
    },
    [t("statusShipped")]: {
      icon: FaTruck,
      bgColor: "bg-green-100 dark:bg-green-900",
      borderColor: "border-green-600 dark:border-green-500",
      textColor: "text-green-600 dark:text-green-500",
    },
    [t("statusDelivered")]: {
      icon: FaBoxOpen,
      bgColor: "bg-green-100 dark:bg-green-900",
      borderColor: "border-green-600 dark:border-green-500",
      textColor: "text-green-600 dark:text-green-500",
    },
    [t("statusCancelled")]: {
      icon: FaTimes,
      bgColor: "bg-red-100 dark:bg-red-900",
      borderColor: "border-red-600 dark:border-red-500",
      textColor: "text-red-600 dark:text-red-500",
    },
  };

  const allStatuses = [
    t("statusPending"),
    t("statusProcessing"),
    t("statusShipped"),
    t("statusDelivered"),
  ];
  const statusMap = {
    pending: t("statusPending"),
    processing: t("statusProcessing"),
    shipped: t("statusShipped"),
    delivered: t("statusDelivered"),
    cancelled: t("statusCancelled"),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400 text-4xl" />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-gray-700 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {t("error")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {error || t("errorOrderNotFound")}
          </p>
          <button
            onClick={() => navigate("/order-guest")}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
          >
            {t("backToTrack")}
          </button>
        </div>
      </div>
    );
  }

  const currentStatus =
    statusMap[orderDetails.order_status] || t("statusCancelled");
  const currentStatusIndex = allStatuses.indexOf(currentStatus);
  const isCancelled = currentStatus === t("statusCancelled");

  const activities = allStatuses.map((status, index) => {
    const isActive = isCancelled ? false : index <= currentStatusIndex;
    return {
      status,
      isActive,
    };
  });

  if (isCancelled) {
    activities.push({
      status: t("statusCancelled"),
      isActive: true,
    });
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-8 p-6 md:p-10 rounded-xl bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 w-full md:w-[400px] flex flex-col p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          #{orderDetails.order_trackingNumber}
        </h1>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1 w-max">
          {currentStatus}
        </span>
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
            {t("orderProgress")}
          </h2>
          <div className="flex flex-col space-y-10 max-h-[600px] overflow-y-auto pr-2 relative">
            {activities.map((activity, index) => {
              const IconComponent = statusConfig[activity.status].icon;
              return (
                <div
                  key={index}
                  className="flex items-start relative min-h-[4rem]"
                >
                  {index < activities.length - 1 && (
                    <div
                      className={`absolute left-[1.4rem] top-12 w-1 h-14 ${
                        activity.isActive
                          ? "bg-green-600 dark:bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      } z-0`}
                    />
                  )}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                      activity.isActive
                        ? `${statusConfig[activity.status].bgColor} ${
                            statusConfig[activity.status].borderColor
                          } ${statusConfig[activity.status].textColor}`
                        : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-300"
                    } z-10`}
                  >
                    <IconComponent />
                  </div>
                  <div className="ml-4 mt-4 flex flex-col">
                    <p
                      className={`text-base ${
                        activity.isActive
                          ? `font-semibold ${
                              statusConfig[activity.status].textColor
                            }`
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {activity.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            {t("orderInfo")}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <span className="font-medium">{t("orderDate")}:</span>{" "}
              {formatDate(orderDetails.createdAt)}
            </p>
            {orderDetails.order_note && (
              <p>
                <span className="font-medium">{t("note")}:</span>{" "}
                {orderDetails.order_note}
              </p>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {t("products")}
          </h2>
          <table className="w-full text-base text-gray-700 dark:text-gray-200 border-collapse rounded-xl shadow-sm dark:shadow-gray-700 overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-6 text-left font-bold text-gray-800 dark:text-white">
                  {t("productColumn")}
                </th>
                <th className="p-6 text-center font-bold text-gray-800 dark:text-white">
                  {t("quantityColumn")}
                </th>
                <th className="p-6 text-center font-bold text-gray-800 dark:text-white">
                  {t("priceColumn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.order_products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="p-6 font-medium text-gray-700 dark:text-gray-200 w-3/5">
                    {product.name || `${t("productColumn")} ${index + 1}`}
                  </td>
                  <td className="p-6 text-center">{product.quantity || 1}</td>
                  <td className="p-6 text-center font-medium text-gray-700 dark:text-gray-200">
                    {formatVND(product.priceAfterDiscount || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-end text-sm text-gray-600 dark:text-gray-300 space-y-3 max-w-[350px] ml-auto">
          <div className="flex justify-between w-full">
            <span className="font-medium">{t("totalProductValue")}</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {formatVND(orderDetails.order_checkout.totalPrice)}
            </span>
          </div>
          {orderDetails.order_checkout.productDiscount > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">{t("productDiscount")}</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                -{formatVND(orderDetails.order_checkout.productDiscount)}
              </span>
            </div>
          )}
          {orderDetails.order_checkout.voucherDiscount > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">{t("voucherDiscount")}</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                -{formatVND(orderDetails.order_checkout.voucherDiscount)}
              </span>
            </div>
          )}
          {orderDetails.order_checkout.accLoyalPoint > 0 && (
            <div className="flex justify-between w-full">
              <span className="font-medium">{t("loyaltyPointsDiscount")}</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                -{formatVND(orderDetails.order_checkout.accLoyalPoint)}
              </span>
            </div>
          )}
          <div className="flex justify-between w-full">
            <span className="font-medium">{t("shippingFee")}</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {formatVND(orderDetails.order_checkout.feeShip)}
            </span>
          </div>
          <div className="flex justify-between w-full font-bold text-gray-800 dark:text-white border-t border-gray-300 dark:border-gray-600 pt-3 text-lg">
            <span>{t("totalCheckout")}</span>
            <span className="text-blue-600 dark:text-blue-400">
              {formatVND(orderDetails.order_checkout.totalCheckOut)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OderGuestDetails;
