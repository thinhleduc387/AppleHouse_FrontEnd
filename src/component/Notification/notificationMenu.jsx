import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const formatNotificationDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Just now";
    }
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: vi,
    });
  } catch (error) {
    return "Just now";
  }
};

const NotificationMenu = ({ notifications, markAsRead }) => {
  return (
    <div className="absolute right-0 bg-white shadow-2xl rounded-lg w-96 max-h-[32rem] overflow-y-auto p-4 border border-gray-200 font-sans">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 border-b">
        <h3 className=" text-lg">Thông báo</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <ul className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={notification._id || index}
              className={`p-3 rounded-lg transition-all duration-200 ${
                !notification.isRead
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={
                      notification.metadata?.imageUrl ||
                      "/default-notification.png"
                    }
                    alt="Notification"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {!notification.isRead && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatNotificationDate(notification.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>

                  {notification.actionUrl && (
                    <a
                      href={notification.actionUrl}
                      className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Xem chi tiết →
                    </a>
                  )}

                  {notification.metadata && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs text-gray-600">
                      {notification.type.includes("ORDER") && (
                        <p>
                          Mã đơn hàng:{" "}
                          {notification.metadata.order?.orderNumber}
                        </p>
                      )}
                      {notification.type.includes("PROMOTION") && (
                        <p>
                          Mã giảm giá:{" "}
                          {notification.metadata.promotion?.promoCode}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
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
            <p className="text-gray-500">Chưa có thông báo nào</p>
          </div>
        )}
      </ul>

      {notifications.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Xem tất cả thông báo
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
