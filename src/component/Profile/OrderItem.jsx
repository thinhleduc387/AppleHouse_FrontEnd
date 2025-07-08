import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";
import { useTranslation } from "react-i18next";

const OrderItem = ({ order, statusMap }) => {
  const { t } = useTranslation("orderUser");
  const {
    order_checkout,
    order_payment,
    order_products,
    order_status,
    order_shipping,
    createdAt,
  } = order;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-md dark:shadow-gray-700 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3 mb-3">
        <div className="flex items-center">
          <div>
            <p className="text-sm text-gray-800 dark:text-gray-100 font-bold">
              {formatDate(createdAt)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {order_products.length} {t("products")}
            </p>
          </div>
        </div>
        <div>
          <span className="w-2 h-2 text-center font-extrabold text-green-600 dark:text-green-400 mr-2">
            •
          </span>
          <span className="text-sm text-green-600 dark:text-green-400 font-bold">
            {statusMap[order_status]}
          </span>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-3">
        {order_products.map((item, index) => (
          <div key={index} className="flex items-center">
            <img
              src={item.thumb}
              alt={item.name}
              className="w-16 h-16 rounded-md border border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {item.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("quantity")}:{" "}
                <span className="font-medium">{item.quantity}</span>
              </p>
            </div>
            <div className="ml-auto text-sm font-semibold text-gray-800 dark:text-gray-100">
              {item.priceAfterDiscount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("totalAmount")}:{" "}
          <span className="text-lg font-bold text-red-500 dark:text-red-400">
            {order_checkout.totalCheckOut.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>
        <Link
          to={`/profile/order-list/${order._id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline dark:hover:text-blue-300"
        >
          {t("viewDetails")}
        </Link>
      </div>
    </div>
  );
};

export default memo(OrderItem);
