import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const OrderTable = ({ orders, handleEditOrder }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // dd/mm/yyyy
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-tl-lg">Order ID</th>
            <th className="p-5 text-left">Product</th>
            <th className="p-5 text-left">SKU</th>
            <th className="p-5 text-left">Category</th>
            <th className="p-5 text-left">Payment</th>
            <th className="p-5 text-left hidden lg:table-cell">Status</th>
            <th className="p-5 text-left hidden lg:table-cell">Rating</th>
            <th className="p-5 text-left">Date</th>
            <th className="p-5 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="hover:bg-gray-50">
              <td className="p-5 border-b text-mainColor font-semibold">
                {order.orderId}
              </td>
              <td className="p-5 border-b text-gray-700">{order.product}</td>
              <td className="p-5 border-b text-gray-600">{order.sku}</td>
              <td className="p-5 border-b text-gray-600">{order.category}</td>
              <td className="p-5 border-b text-gray-700 font-semibold">
                {order.payment}
              </td>
              <td className="p-5 border-b text-center hidden lg:table-cell">
                <span
                  className={`px-3 py-1 text-sm rounded-full text-white ${
                    order.status === "COMPLETED"
                      ? "bg-green-500"
                      : order.status === "CONFIRMED"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-5 border-b text-center hidden lg:table-cell">
                {"⭐".repeat(order.rate) + "☆".repeat(5 - order.rate)}
              </td>
              <td className="p-5 border-b text-gray-700 font-semibold">
                {formatDate(order.date)}
              </td>
              <td className="p-5 border-b text-center">
                <div className="flex justify-center items-center gap-x-2">
                  <AiOutlineEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => handleEditOrder(order.orderId)}
                  />
                  <AiOutlineDelete className="text-red-500 cursor-pointer hover:text-red-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
