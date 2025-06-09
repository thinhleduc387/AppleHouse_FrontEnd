import React, { useState } from "react";

const NotificationModal = ({
  userId,
  notificationData,
  setNotificationData,
  onClose,
  onSend,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationData({
      ...notificationData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      await onSend(userId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
        <input
          type="text"
          name="title"
          value={notificationData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="message"
          value={notificationData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="sendViaEmail"
            checked={notificationData.sendViaEmail || false}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Send via Email</label>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
