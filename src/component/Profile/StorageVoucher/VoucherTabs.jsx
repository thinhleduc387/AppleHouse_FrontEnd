import React from "react";
import { FaCheck, FaClock, FaCalendarAlt, FaHistory } from "react-icons/fa";

const VoucherTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "available", icon: FaCheck, label: "Có thể sử dụng" },
    { id: "upcoming", icon: FaCalendarAlt, label: "Sắp tới" },
    { id: "expired", icon: FaClock, label: "Đã hết hạn" },
    { id: "history", icon: FaHistory, label: "Đã dùng" },
  ];

  return (
    <div className="flex space-x-4 mb-6 border-b">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`pb-3 px-4 ${
            activeTab === id
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          <Icon className="inline mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default VoucherTabs;
