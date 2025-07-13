import React, { memo } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VoucherCard = ({ voucher, onViewDetails, activeTab }) => {
  const { t } = useTranslation("voucherUser");

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 hover:shadow-md dark:hover:shadow-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-medium">
              {voucher.discount_code}
            </span>
            <button
              onClick={() => onViewDetails(voucher)}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              title={t("viewDetailsTooltip")}
            >
              <FaInfoCircle className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-100">
            {t("discountLabel")}{" "}
            {voucher.discount_type === "percentage"
              ? `${voucher.discount_value}%`
              : `${voucher.discount_value.toLocaleString()}đ`}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {t("minOrderLabel")}{" "}
            {voucher.discount_min_order_value.toLocaleString()}đ
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {voucher.discount_description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("expiresLabel")}:{" "}
            {new Date(voucher.discount_end).toLocaleDateString("vi-VN")}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {t("remainingUsesLabel")}:{" "}
            {voucher.discount_max_uses - voucher.discount_uses_count}{" "}
            {t("remainingUsesLabel").toLowerCase()}
          </p>
          <button className="mt-2 px-4 py-1 bg-blue-500 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300 text-sm">
            {t("useNowButton")}
          </button>
        </div>
      </div>
      {activeTab === "history" && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
          <h4 className="font-medium text-gray-700 dark:text-gray-100 mb-2">
            {t("usageHistoryTitle")}:
          </h4>
          {voucher.usageHistory?.length > 0 ? (
            <ul className="space-y-2">
              {voucher.usageHistory.map((usage, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  {/* Add usage history details */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("noUsageHistory")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(VoucherCard);
