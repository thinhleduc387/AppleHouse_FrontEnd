import React from "react";

const VoucherDiscountSetup = ({ voucherData, setVoucherData }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Thiết lập mã giảm giá
      </h1>

      {/* Loại giảm giá | Mức giảm */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/3">
          Loại giảm giá | Mức giảm
        </label>
        <div className="flex items-center gap-4 w-full">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={voucherData.discount_type}
            onChange={(e) =>
              setVoucherData({ ...voucherData, discount_type: e.target.value })
            }
          >
            <option value="fixed_amount">Theo số tiền</option>
            <option value="percentage">Theo phần trăm</option>
          </select>
          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-mainColor"
            placeholder="Nhập mức giảm"
            value={voucherData.discount_value}
            onChange={(e) =>
              setVoucherData({
                ...voucherData,
                discount_value: e.target.value,
              })
            }
          />
          <span className="text-gray-700 text-xl font-medium">
            {voucherData.discount_type === "percentage" ? "%" : "₫"}
          </span>
        </div>
      </div>

      {/* Giá trị đơn hàng tối thiểu */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">
          Giá trị đơn hàng tối thiểu
        </label>
        <input
          type="number"
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-mainColor"
          placeholder="Nhập giá trị đơn hàng tối thiểu"
          value={voucherData.discount_min_order_value}
          onChange={(e) =>
            setVoucherData({
              ...voucherData,
              discount_min_order_value: e.target.value,
            })
          }
        />
      </div>

      {/* Tổng lượt sử dụng tối đa */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">
          Tổng lượt sử dụng tối đa
        </label>
        <div className="flex flex-col w-1/2 gap-2">
          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
            placeholder="Nhập tổng lượt sử dụng"
            value={voucherData.discount_max_uses}
            onChange={(e) =>
              setVoucherData({
                ...voucherData,
                discount_max_uses: e.target.value,
              })
            }
          />
          <p className="text-gray-500 text-sm">
            Tổng số mã giảm giá có thể sử dụng
          </p>
        </div>
      </div>

      {/* Lượt sử dụng tối đa / Người mua */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">
          Lượt sử dụng tối đa / Người mua
        </label>
        <input
          type="number"
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-mainColor"
          placeholder="Nhập lượt sử dụng tối đa / Người mua"
          value={voucherData.discount_max_uses_per_user}
          onChange={(e) =>
            setVoucherData({
              ...voucherData,
              discount_max_uses_per_user: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default VoucherDiscountSetup;
