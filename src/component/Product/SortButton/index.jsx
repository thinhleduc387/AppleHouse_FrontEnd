import React from "react";
import { AiOutlineSortAscending, AiOutlineRight } from "react-icons/ai";
import { SortOptions } from "./sortOption";
import { useTranslation } from "react-i18next";

const SortButton = ({
  isSortDropdownOpen,
  toggleSortDropdown,
  selectedOption,
  setSelectedOption,
}) => {
  const { t } = useTranslation("product");

  const handleOptionSelect = (key) => {
    setSelectedOption(key);
    toggleSortDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSortDropdown}
        type="button"
        className="flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
      >
        <AiOutlineSortAscending className="mr-2 h-4 w-4" />
        {t("sortLabel")} {t(SortOptions[selectedOption])}
        <AiOutlineRight
          className={`ml-2 h-4 w-4 transition-transform ${
            isSortDropdownOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isSortDropdownOpen && (
        <div
          id="sortDropdown"
          className="absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 p-4"
        >
          <div className="flex flex-col space-y-1">
            {Object.entries(SortOptions).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleOptionSelect(key)}
                className="text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t(label)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SortButton);
