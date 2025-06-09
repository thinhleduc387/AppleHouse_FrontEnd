import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListNotification } from "../../../config/api";

const formatNotificationDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Vừa xong";
    }
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: vi,
    });
  } catch (error) {
    return "Vừa xong";
  }
};

const NotificationStorage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.account.user._id);

  const handleGetListNotification = async () => {
    setIsLoading(true);
    try {
      const response = await getListNotification({ userId, type: activeTab });
      if (response?.metadata?.length > 0) {
        setNotifications(response.metadata);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(
        notifications.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  useEffect(() => {
    handleGetListNotification();
  }, [userId, activeTab]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-8 mb-6 font-sans">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kho Thông báo</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Quản lý thông báo của bạn
            </p>
          </div>
          {notifications.some((notif) => !notif.isRead) && (
            <button
              className="text-blue-600 text-base font-semibold hover:underline hover:text-blue-800 transition-colors"
              onClick={markAllAsRead}
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-200">
          <button
            className={`pb-3 px-6 text-base font-semibold ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả
          </button>
          <button
            className={`pb-3 px-6 text-base font-semibold ${
              activeTab === "ORDER"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            onClick={() => setActiveTab("ORDER")}
          >
            Cập nhật đơn hàng
          </button>
          <button
            className={`pb-3 px-6 text-base font-semibold ${
              activeTab === "COUPON"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            onClick={() => setActiveTab("COUPON")}
          >
            Khuyến mãi
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-gray-200 rounded-full"></div>
              </div>
              <p className="ml-4 text-lg text-gray-600">Đang tải...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Chưa có thông báo nào</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => markAsRead(notification._id)}
                className={`relative p-6 rounded-xl transition-all duration-300 border cursor-pointer ${
                  !notification.isRead
                    ? "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:shadow-lg"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        notification.metadata?.imageUrl ||
                        "data:image/jpeg;base64,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"
                      }
                      alt="Notification"
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                    />
                    {!notification.isRead && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {formatNotificationDate(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-base text-gray-600 line-clamp-2">
                      {notification.message}
                    </p>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Xem chi tiết
                        <span className="ml-2">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationStorage;
