import React, { useEffect, useState } from "react";
import OrderTable from "../../../component/admin/order/OrderTable";
import { getAllOrder } from "../../../config/api";
import Loading from "../../../component/Loading";

const OrderPage = () => {
  const [listOrder, setListOrder] = useState([]); // State for orders
  const [isLoading, setIsLoading] = useState(false); // State for loading

  console.log("🚀 ~ OrderPage ~ listOrder:", listOrder);

  useEffect(() => {
    handleGetAllOrder();
  }, []);

  const handleGetAllOrder = async () => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      const response = await getAllOrder();
      console.log("🚀 ~ handleGetAllOrder ~ response:", response);

      if (response && response.metadata) {
        // Gán dữ liệu vào state
        setListOrder(response.metadata);
      } else {
        console.error("No orders found in response.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">December 22, 2024 21:10 PM</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            onClick={handleGetAllOrder}
          >
            Data Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : (
        <>
          {/* Sales Period Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Sales period:</span>
              <input
                type="date"
                className="ml-2 border border-gray-300 rounded-lg p-2 focus:outline-none"
              />
            </div>
            <select className="border border-gray-300 rounded-lg p-2">
              <option>All Products</option>
            </select>
            <select className="border border-gray-300 rounded-lg p-2">
              <option>Default sorting</option>
            </select>
          </div>

          {/* Orders Table */}
          <OrderTable listOrder={listOrder} setListOrder={setListOrder} />
        </>
      )}
    </div>
  );
};

export default OrderPage;
