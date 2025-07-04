import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  return (
    <div className="bg-white rounded-md p-4 shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
        <div className="flex items-center">
          <div>
            <p className="text-sm text-gray-800 font-bold">{order.date}</p>
            <p className="text-sm text-gray-600 font-medium">
              {order.items.length} sản phẩm
            </p>
          </div>
        </div>
        <div>
          <span className="w-2 h-2 text-center font-extrabold text-green-600 mr-2">•</span>
          <span className="text-sm text-green-600 font-bold">
            {order.status}
          </span>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-md border border-gray-300"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">
                Số lượng: <span className="font-medium">{item.quantity}</span>
              </p>
            </div>
            <div className="ml-auto text-sm font-semibold text-gray-800">
              {item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Thành tiền:{" "}
          <span className="text-lg font-bold text-red-500">
            {order.total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>
        {/* Button "Xem chi tiết" */}
        <Link
          to={`/profile/order-list/detail/${order.id}`}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
