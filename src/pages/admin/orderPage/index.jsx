import React from "react";
import OrderTable from "../../../component/admin/order/OrderTable";

const OrderPage = () => {
  const orders = [
    {
      orderId: "#123456",
      product: "Oculus Quest 2 VR Headset 64 GB",
      sku: "123456FR",
      category: "Electronics",
      payment: "$600 Fully paid",
      status: "COMPLETED",
      rate: 4,
      date: "2024-12-20",
    },
    {
      orderId: "#154844",
      product: "Levis Standard Issue Backpack Black",
      sku: "598741FR",
      category: "Fashion",
      payment: "$180 / $4000 Partially paid",
      status: "CONFIRMED",
      rate: 5,
      date: "2024-12-19",
    },
  ];

  const handleEditOrder = (orderId) => {
    console.log(`Edit order: ${orderId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">December 22, 2024 21:10 PM</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
            Data Refresh
          </button>
        </div>
      </div>

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
      <OrderTable orders={orders} handleEditOrder={handleEditOrder} />
    </div>
  );
};

export default OrderPage;
