import React, { useState, useEffect } from "react";
import OrderItem from "../OrderItem";
import { getListOrder } from "../../../config/api";
import { useSelector } from "react-redux";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    { id: "Tất cả", icon: Package, color: "blue" },
    { id: "Đã xác nhận", icon: CheckCircle, color: "green" },
    { id: "Đang xử lý", icon: Clock, color: "yellow" },
    { id: "Đang giao", icon: Truck, color: "purple" },
    { id: "Hoàn tất", icon: CheckCircle, color: "green" },
    { id: "Đã hủy", icon: XCircle, color: "red" },
  ];

  const statusMap = {
    confirmed: "Đã xác nhận",
    processing: "Đang xử lý",
    shipped: "Đang giao",
    delivered: "Hoàn tất",
    cancelled: "Đã hủy",
  };

  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === "Tất cả"
        ? true
        : statusMap[order.order_status] === activeTab) &&
      (order.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery)
  );

  return (
    <div className=" ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Đơn hàng của tôi
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và theo dõi đơn hàng của bạn
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-x-auto">
          <div className="flex min-w-max border-b border-gray-200">
            {tabs.map(({ id, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-4 transition-colors relative
                  ${
                    activeTab === id
                      ? `text-${color}-600 font-medium`
                      : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    activeTab === id ? `text-${color}-600` : "text-gray-400"
                  }`}
                />
                <span>{id}</span>
                {activeTab === id && (
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-${color}-500`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6">
                  <div className="animate-pulse flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="w-24">
                      <div className="h-8 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className=" rounded-xl shadow-sm divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <div className="mb-2">
                  <OrderItem
                    key={order.id}
                    order={order}
                    statusMap={statusMap}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Không tìm thấy đơn hàng nào
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Không tìm thấy đơn hàng phù hợp với tìm kiếm của bạn"
                  : `Bạn chưa có đơn hàng nào ${
                      activeTab !== "Tất cả"
                        ? `trong trạng thái ${activeTab.toLowerCase()}`
                        : ""
                    }`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
