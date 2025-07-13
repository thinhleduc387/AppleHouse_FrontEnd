import { useState, memo } from "react";
import { useTranslation } from "react-i18next";

const ChatInput = ({ onSendMessage }) => {
  const { t } = useTranslation("chatBot");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("inputPlaceholder")}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-300"
        />
        <button
          type="submit"
          className="text-white bg-blue-500 dark:bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          {t("sendButton")}
        </button>
      </form>
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
        {t("aiDisclaimer")}
      </div>
    </div>
  );
};

export default memo(ChatInput);
