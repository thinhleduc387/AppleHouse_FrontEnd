import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const VoucherCard = ({ voucher, onViewDetails, activeTab }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm font-medium">
              {voucher.discount_code}
            </span>
            <button
              onClick={() => onViewDetails(voucher)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
              title="Xem chi tiết"
            >
              <FaInfoCircle className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-semibold mt-2">
            Giảm{" "}
            {voucher.discount_type === "percentage"
              ? `${voucher.discount_value}%`
              : `${voucher.discount_value.toLocaleString()}đ`}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Đơn tối thiểu {voucher.discount_min_order_value.toLocaleString()}đ
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {voucher.discount_description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            HSD: {new Date(voucher.discount_end).toLocaleDateString("vi-VN")}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Còn lại: {voucher.discount_max_uses - voucher.discount_uses_count}{" "}
            lượt
          </p>
          <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            Sử dụng ngay
          </button>
        </div>
      </div>
      {activeTab === "history" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-700 mb-2">Lịch sử sử dụng:</h4>
          {voucher.usageHistory?.length > 0 ? (
            <ul className="space-y-2">
              {voucher.usageHistory.map((usage, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {/* Add usage history details */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Chưa có lịch sử sử dụng</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoucherCard;
