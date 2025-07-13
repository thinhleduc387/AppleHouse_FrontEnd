import React, { memo } from "react";
import { FaCheck, FaClock, FaCalendarAlt, FaHistory } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VoucherTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation("voucherUser");
  const tabs = [
    { id: "available", icon: FaCheck, label: t("availableTab") },
    { id: "upcoming", icon: FaCalendarAlt, label: t("upcomingTab") },
    { id: "expired", icon: FaClock, label: t("expiredTab") },
    { id: "history", icon: FaHistory, label: t("historyTab") },
  ];

  return (
    <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-600">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`pb-3 px-4 ${
            activeTab === id
              ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          } transition-colors duration-300`}
        >
          <Icon
            className={`inline mr-2 ${
              activeTab === id
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
          {label}
        </button>
      ))}
    </div>
  );
};

export default memo(VoucherTabs);
