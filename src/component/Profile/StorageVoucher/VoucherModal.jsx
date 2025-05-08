import React from "react";
import { FaTimes } from "react-icons/fa";

const VoucherModal = ({ voucher, onClose }) => {
  if (!voucher) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Chi tiết Voucher
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* ... rest of the modal content ... */}
            {/* Copy the existing modal content here */}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Đóng
          </button>
          {voucher.discount_is_active && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sử dụng ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
