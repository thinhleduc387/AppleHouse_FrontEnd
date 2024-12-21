import React, { useEffect, useState } from "react";
import { getListVoucher } from "../../../config/api";
import { formatVND } from "../../../utils/format";
import { Link } from "react-router-dom";

const VoucherPage = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [voucherList, setVoucherList] = useState([]);

  const tabs = ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"];

  useEffect(() => {
    handleGetAllVoucher();
  }, []);

  const handleGetAllVoucher = async () => {
    try {
      const response = await getListVoucher();
      console.log("🚀 ~ handleGetAllVoucher ~ response:", response);
      setVoucherList(response.metadata);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const formatDateRange = (start, end) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedStart = new Date(start).toLocaleString("vi-VN", options);
    const formattedEnd = new Date(end).toLocaleString("vi-VN", options);
    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="flex flex-col w-full p-6 gap-8">
      {/* Phần Tạo Voucher */}
      <div className="bg-white rounded-lg shadow-md p-10">
        <h1 className="text-xl font-bold mb-6">Tạo Voucher</h1>
        <p className="text-gray-600 mb-8">
          Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ để
          thu hút người mua.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-lg mb-2">Voucher toàn Shop</h2>
            <p className="text-gray-500 mb-4">
              Voucher áp dụng cho tất cả sản phẩm trong Shop của bạn.
            </p>
            <Link
              to="/admin/voucher/create/specific"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Tạo
            </Link>
          </div>
          <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-lg mb-2">Voucher sản phẩm</h2>
            <p className="text-gray-500 mb-4">
              Voucher chỉ áp dụng cho những sản phẩm nhất định mà Shop chọn.
            </p>
            <Link
              to="/admin/voucher/create/all"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Tạo
            </Link>
          </div>
        </div>
      </div>

      {/* Phần Danh sách mã giảm giá */}
      <div className="bg-white rounded-lg shadow-md p-10">
        <h1 className="text-xl font-bold mb-6">Danh sách mã giảm giá</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b sticky left-0 bg-gray-100 z-10">
                  Tên Voucher | Mã voucher
                </th>
                <th className="px-4 py-2 border-b">Loại mã</th>
                <th className="px-4 py-2 border-b">Sản phẩm áp dụng</th>
                <th className="px-4 py-2 border-b">Giảm giá</th>
                <th className="px-4 py-2 border-b">Tổng lượt sử dụng tối đa</th>
                <th className="px-4 py-2 border-b">Đã dùng</th>
                <th className="px-4 py-2 border-b">
                  Thời gian lưu Mã giảm giá
                </th>
                <th className="px-4 py-2 border-b sticky right-0 bg-gray-100 z-10 w-40">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {voucherList.length > 0 ? (
                voucherList.map((voucher) => (
                  <tr key={voucher._id}>
                    <td className="px-4 py-2 border-b sticky left-0 bg-white z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 font-bold">
                          $
                        </div>
                        <div>
                          <p>{voucher.discount_name}</p>
                          <p className="text-sm text-gray-500">
                            Mã voucher: {voucher.discount_code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {voucher.discount_type === "fixed_amount"
                        ? "Giảm giá cụ thể"
                        : "Giảm giá theo phần trăm"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {voucher.discount_applies_to === "specific"
                        ? "Sản phẩm cụ thể"
                        : "Tất cả sản phẩm"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {voucher.discount_type === "percentage"
                        ? `${voucher.discount_value}%`
                        : formatVND(voucher.discount_value)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {voucher.discount_max_uses}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {voucher.discount_uses_count || 0}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {formatDateRange(
                        voucher.discount_start,
                        voucher.discount_end
                      )}
                    </td>
                    <td className="px-4 py-2 border-b sticky right-0 bg-white z-10 w-40">
                      <div className="flex flex-col space-y-1 text-blue-500">
                        <button className="hover:text-blue-700">
                          Chỉnh sửa
                        </button>
                        <button className="hover:text-blue-700">
                          Sao chép
                        </button>
                        <button className="hover:text-blue-700">Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-gray-500" colSpan="8">
                    Không có Voucher nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
