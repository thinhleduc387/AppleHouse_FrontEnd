import { memo } from "react";
import { FiShare } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ChatHeader = ({ onExpand, onClose }) => {
  const { t } = useTranslation("chatBot");

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <img src="/chatbot.png" alt="AI" className="w-8 h-8" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t("aiAssistant")}
        </h3>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onExpand}
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <FiShare className="text-xl" />
        </button>
        <button
          onClick={onClose}
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <IoClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default memo(ChatHeader);
