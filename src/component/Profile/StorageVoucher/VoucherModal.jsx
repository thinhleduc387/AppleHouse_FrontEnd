import React, { memo } from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VoucherModal = ({ voucher, onClose }) => {
  const { t } = useTranslation("voucherUser");

  if (!voucher) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center z-50 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("voucherDetailsTitle")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-100">
                {t("discountLabel")}:{" "}
                {voucher.discount_type === "percentage"
                  ? `${voucher.discount_value}%`
                  : `${voucher.discount_value.toLocaleString()}đ`}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {t("minOrderLabel")}:{" "}
                {voucher.discount_min_order_value.toLocaleString()}đ
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {t("expiresLabel")}:{" "}
                {new Date(voucher.discount_end).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {t("remainingUsesLabel")}:{" "}
                {voucher.discount_max_uses - voucher.discount_uses_count}{" "}
                {t("remainingUsesLabel").toLowerCase()}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {voucher.discount_description}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            {t("closeButton")}
          </button>
          {voucher.discount_is_active && (
            <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
              {t("useNowButtonModal")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(VoucherModal);
