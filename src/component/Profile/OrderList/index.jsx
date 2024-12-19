import React, { useState, useEffect } from "react";
import OrderItem from "../OrderItem"; // Import component OrderItem

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả"); // Quản lý tab đang chọn

  // Giả lập dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 1,
          date: "28/08/2023",
          status: "Hoàn tất",
          type: "Nhận tại Shop",
          items: [
            {
              id: 101,
              name: "Miếng dán film trong mặt sau Máy Tính cắt thủ công YVS",
              quantity: 1,
              price: 120000,
              image: "https://via.placeholder.com/50",
            },
            {
              id: 102,
              name: 'Miếng Dán Màn Hình Máy Tính 18" YVS - mặt trước',
              quantity: 1,
              price: 150000,
              image: "https://via.placeholder.com/50",
            },
          ],
          total: 270000,
        },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="md:p-4 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Đơn hàng của tôi</h1>

      {/* Danh sách đơn hàng */}
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
