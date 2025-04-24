import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation("cart");
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="text-center">
          <div className="mb-4 text-yellow-500 dark:text-yellow-400">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {t("loginToContinue")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("loginPrompt")}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
            >
              {t("login")}
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
            >
              {t("later")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
