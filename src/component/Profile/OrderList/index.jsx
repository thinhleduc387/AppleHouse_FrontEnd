import React, { useState, useEffect } from "react";
import OrderItem from "../OrderItem";
import { getListOrder } from "../../../config/api";
import { useSelector } from "react-redux";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> chatBox
  const userId = useSelector((state) => state.account?.user?._id);

  const fetchListOrder = async () => {
    try {
      setIsLoading(true);
      const response = await getListOrder({ userId, status: "all" });
      if (response.status === 200) {
        setOrders(response.metadata);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListOrder();
  }, [userId]);

  const tabs = [
    "Tất cả",
    "Đã xác nhận",
    "Đang xử lý",
    "Đang giao",
    "Hoàn tất",
    "Đã hủy",
  ];

  const statusMap = {
    confirmed: "Đã xác nhận",
    processing: "Đang xử lý",
    shipped: "Đang giao",
    delivered: "Hoàn tất",
    cancelled: "Đã hủy",
  };

  const filteredOrders =
    activeTab === "Tất cả"
      ? orders
      : orders.filter((order) => statusMap[order.order_status] === activeTab);

  return (
<<<<<<< HEAD
    <div className="md:p-4 min-h-screen bg-[#f3f4f6] dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Đơn hàng của tôi
      </h1>
      <div className="flex items-center justify-start bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-4 mb-4 rounded-lg">
=======
    <div className="md:p-4 min-h-1">
      <h1 className="text-xl font-semibold mb-4">Đơn hàng của tôi</h1>
      <div className="flex items-center justify-start bg-white border-b border-gray-200 pt-4 mb-4 rounded-lg">
>>>>>>> chatBox
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm text-center px-10 pb-2 ${
              activeTab === tab
                ? "text-red-500 dark:text-red-400 font-medium border-b-2 border-red-500 dark:border-red-400"
                : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} statusMap={statusMap} />
          ))
        ) : (
<<<<<<< HEAD
          <p className="text-gray-600 dark:text-gray-300">
            Không có đơn hàng nào.
          </p>
=======
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <img
              src="../../src/assets/no-order.png"
              alt="No Orders"
              className="w-48 h-48 mx-auto mb-6 opacity-75"
            />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Chưa có đơn hàng nào
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa có đơn hàng{" "}
              <span>
                <b>{activeTab.toLocaleLowerCase()}</b>
              </span>{" "}
              nào trong danh sách này
            </p>
          </div>
>>>>>>> chatBox
        )}
      </div>
    </div>
  );
};

export default OrderList;
