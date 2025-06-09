import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

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
        <h3 className="text-lg font-semibold text-gray-800">Thông báo</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <ul className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li
              key={notification._id || index}
              onClick={() => markAsRead(notification._id)}
              className={`relative p-3 rounded-lg transition-all duration-200 border cursor-pointer
                ${
                  !notification?.isRead
                    ? "bg-blue-50 border-blue-100 hover:bg-blue-100 hover:shadow-md"
                    : "bg-white border-gray-100 hover:bg-gray-50 hover:shadow-sm"
                }`}
            >
              <div className="flex items-start gap-2">
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      notification.metadata?.imageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/5738/5738102.png"
                    }
                    alt="Notification"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  {!notification.isRead && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {notification.title}
                    </p>
                    <span className="text-xs  flex-shrink-0">
                      {formatNotificationDate(notification.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1">
                    {notification.message}
                  </p>

                  {notification.actionUrl && (
                    <a
                      href={notification.actionUrl}
                      className="inline-flex items-center mt-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Xem chi tiết
                      <span className="ml-1">→</span>
                    </a>
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
        <Link to={"/profile/notifications"}>
          <div className="mt-4 text-center rounded-sm hover:bg-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Xem tất cả thông báo
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NotificationMenu;
