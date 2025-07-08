import React, { useState, useEffect } from "react";
import { memo } from "react";
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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const OrderList = () => {
  const { t } = useTranslation("orderUser");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(t("all"));
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = useSelector((state) => state.account?.user?._id);

  const fetchListOrder = async () => {
    try {
      setIsLoading(true);
      const response = await getListOrder({ userId, status: "all" });
      if (response.status === 200) {
        setOrders(response.metadata);
      } else {
        toast.error(response.message || t("errorFetchOrders"));
        setOrders([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("errorGeneric"));
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchListOrder();
    }
  }, [userId]);

  const tabs = [
    { id: t("all"), icon: Package, color: "blue" },
    { id: t("confirmed"), icon: CheckCircle, color: "green" },
    { id: t("processing"), icon: Clock, color: "yellow" },
    { id: t("shipped"), icon: Truck, color: "purple" },
    { id: t("delivered"), icon: CheckCircle, color: "green" },
    { id: t("cancelled"), icon: XCircle, color: "red" },
  ];

  const statusMap = {
    confirmed: t("confirmed"),
    processing: t("processing"),
    shipped: t("shipped"),
    delivered: t("delivered"),
    cancelled: t("cancelled"),
  };

  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === t("all")
        ? true
        : statusMap[order.order_status] === activeTab) &&
      (order.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery)
  );

  return (
    <div className="bg-[#f3f4f6] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 p-6 mb-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {t("myOrders")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("manageOrders")}
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchOrders")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 mb-6 overflow-x-auto">
          <div className="flex min-w-max border-b border-gray-200 dark:border-gray-600">
            {tabs.map(({ id, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-4 transition-colors relative
                  ${
                    activeTab === id
                      ? `text-${color}-600 dark:text-${color}-400 font-medium`
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    activeTab === id
                      ? `text-${color}-600 dark:text-${color}-400`
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span>{id}</span>
                {activeTab === id && (
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-${color}-500 dark:bg-${color}-400`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6">
                  <div className="animate-pulse flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    </div>
                    <div className="w-24">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <div className="mb-2" key={order._id}>
                  <OrderItem order={order} statusMap={statusMap} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t("noOrdersFound")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? t("noOrdersMatchingSearch")
                  : t("noOrdersInStatus", {
                      status: activeTab.toLowerCase(),
                    })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(OrderList);
