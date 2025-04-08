import React from "react";
import { formatVND } from "../../../utils/format";
import { changeOrderStatus } from "../../../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import hook for translation

const OrderTable = ({ listOrder, setListOrder }) => {
  const { t } = useTranslation("order"); // Initialize translation hook
  const navigate = useNavigate(); // Hook for navigation

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
    { value: "confirmed", label: t("confirmed"), color: "bg-green-500" },
    { value: "processing", label: t("processing"), color: "bg-yellow-500" },
    { value: "shipped", label: t("shipping"), color: "bg-blue-500" },
    { value: "cancelled", label: t("canceled"), color: "bg-red-500" },
    { value: "delivered", label: t("delivered"), color: "bg-purple-500" },
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await changeOrderStatus(orderId, newStatus);

      if (response.status === 200) {
        toast.success("Status updated successfully!");

        // Update order status in listOrder
        setListOrder((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, order_status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/detail/${orderId}`); // Navigate to detail page
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-tl-lg">{t("orderID")}</th>
            <th className="p-5 text-left">{t("customer")}</th>
            <th className="p-5 text-left">{t("payment")}</th>
            <th className="p-5 text-left">{t("status")}</th>
            <th className="p-5 text-left">{t("totalAmount")}</th>
            <th className="p-5 text-center rounded-tr-lg">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {listOrder.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="p-5 border-b text-mainColor font-semibold">
                {order._id}
              </td>
              <td className="p-5 border-b text-gray-700 font-semibold">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      order.order_userId.usr_avatar ||
                      "https://via.placeholder.com/50"
                    }
                    alt={order.order_userId.usr_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{order.order_userId.usr_name}</span>
                </div>
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
                        backgroundColor: "white", // Dropdown background color
                        color: "black", // Dropdown text color
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
                <div
                  onClick={() => handleViewDetails(order._id)} // Handle click to navigate
                  className="flex border cursor-pointer border-mainColor text-mainColor hover:bg-blue-100 rounded-full justify-center items-center gap-x-2 px-3 py-2"
                >
                  {t("details")}
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
