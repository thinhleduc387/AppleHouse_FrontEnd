import React from "react";

const VoucherBasicInfo = ({ voucherData, setVoucherData, type }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Thông tin cơ bản
      </h1>

      {/* Loại mã */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/5">Loại mã</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-mainColor/10 text-mainColor font-semibold rounded-lg">
            {type === "all" ? "Voucher toàn Shop" : "Voucher sản phẩm"}
          </div>
        </div>
      </div>

      {/* Tên chương trình giảm giá */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">
          Tên chương trình giảm giá
        </label>
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-mainColor"
            placeholder="Nhập tên chương trình giảm giá"
            value={voucherData.discount_name}
            onChange={(e) =>
              setVoucherData({ ...voucherData, discount_name: e.target.value })
            }
          />
          <div className="flex justify-between text-sm text-gray-500">
            <p className="font-normal">
              Tên Voucher sẽ không được hiển thị cho Người mua
            </p>
            <p className="font-semibold">
              {voucherData.discount_name.length}/100
            </p>
          </div>
        </div>
      </div>

      {/* Mã voucher */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">Mã voucher</label>
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-mainColor"
            placeholder="Nhập mã voucher"
            value={voucherData.discount_code}
            maxLength={5}
            onChange={(e) =>
              setVoucherData({ ...voucherData, discount_code: e.target.value })
            }
          />
          <div className="flex justify-between text-sm text-gray-500">
            <p className="font-normal">
              Vui lòng chỉ nhập các kí tự chữ cái (A-Z), số (0-9); tối đa 5 kí
              tự.
            </p>
            <p className="font-semibold">{voucherData.discount_code.length}/5</p>
          </div>
        </div>
      </div>

      {/* Thời gian sử dụng mã */}
      <div className="flex items-center">
        <label className="font-bold text-gray-800 w-1/4">
          Thời gian sử dụng mã
        </label>
        <div className="flex items-center gap-4 w-full">
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={voucherData.discount_start}
            onChange={(e) =>
              setVoucherData({ ...voucherData, discount_start: e.target.value })
            }
          />
          <span className="text-gray-500">—</span>
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
            value={voucherData.discount_end}
            onChange={(e) =>
              setVoucherData({ ...voucherData, discount_end: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VoucherBasicInfo;
