import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { formatVND } from "../../../utils/format";
import { changeOrderStatus } from "../../../config/api";
import { toast } from "react-toastify";

const OrderTable = ({ listOrder, setListOrder }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      case "shipped":
        return "bg-blue-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "delivered":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const statusOptions = [
    { value: "confirmed", label: "Confirmed", color: "bg-green-500" },
    { value: "processing", label: "Processing", color: "bg-yellow-500" },
    { value: "shipped", label: "Shipped", color: "bg-blue-500" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
    { value: "delivered", label: "Delivered", color: "bg-purple-500" },
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await changeOrderStatus(orderId, newStatus);

      if (response.status === 200) {
        toast.success("Status updated successfully!");

        // Cập nhật trạng thái trong listOrder
        setListOrder((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, order_status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.log("🚀 ~ handleStatusChange ~ error:", error);
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-tl-lg">Order ID</th>
            <th className="p-5 text-left">Payment</th>
            <th className="p-5 text-left">Status</th>
            <th className="p-5 text-left">Total Amount</th>
            <th className="p-5 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOrder.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="p-5 border-b text-mainColor font-semibold">
                {order._id}
              </td>
              <td className="p-5 border-b text-gray-700 font-semibold">
                {order.order_payment.payment_method}
              </td>
              <td className="p-5 border-b text-left">
                <select
                  className={`px-3 py-1 text-sm rounded-full ${getStatusClass(
                    order.order_status
                  )}`}
                  value={order.order_status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      style={{
                        backgroundColor: "white", // Màu nền khi mở dropdown
                        color: "black", // Màu chữ khi mở dropdown
                      }}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-5 border-b text-gray-700 font-semibold">
                {formatVND(order.order_checkout.totalCheckOut)}
              </td>
              <td className="p-5 border-b text-center">
                <div className="flex justify-center items-center gap-x-2">
                  <AiOutlineEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
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
