import React, { useState, useRef, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ProductDescription = ({ description, onClickThongSo }) => {
  const { t } = useTranslation("detailProduct");
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const paragraphRef = useRef(null);

  const maxLines = 5;

  useEffect(() => {
    const checkNumberOfLines = () => {
      if (paragraphRef.current) {
        const lineHeight = parseInt(
          window.getComputedStyle(paragraphRef.current).lineHeight,
          10
        );
        const totalHeight = paragraphRef.current.scrollHeight;
        const lines = Math.floor(totalHeight / lineHeight);
        setShouldShowMore(lines > maxLines);
      }
    };

    checkNumberOfLines();
    window.addEventListener("resize", checkNumberOfLines);

    return () => {
      window.removeEventListener("resize", checkNumberOfLines);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("productInfo")}
        </h1>
        <a
          className="text-blue-500 dark:text-blue-400 cursor-pointer flex items-center hover:text-blue-700 dark:hover:text-blue-300"
          onClick={onClickThongSo}
        >
          <span className="text-sm md:text-base font-medium">
            {t("technicalSpecs")}
          </span>
          <MdNavigateNext className="text-xl" />
        </a>
      </div>

      <div
        className={`relative overflow-hidden ${
          !isExpanded ? "max-h-[20rem]" : ""
        }`}
      >
        <div
          ref={paragraphRef}
          dangerouslySetInnerHTML={{ __html: description }}
          className="prose max-w-none text-gray-800 dark:text-gray-100"
        />

        {!isExpanded && shouldShowMore && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent opacity-90 z-10 flex justify-center items-center">
            <button
              className="text-blue-500 dark:text-blue-400 bg-white dark:bg-gray-800 font-bold hover:underline border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 mt-5"
              onClick={toggleExpand}
            >
              {t("showMore")}
            </button>
          </div>
        )}
      </div>

      {isExpanded && shouldShowMore && (
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-500 dark:text-blue-400 font-bold hover:underline border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2"
            onClick={toggleExpand}
          >
            {t("collapse")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
