import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  const changeLanguage = () => {
    i18n.changeLanguage(isVietnamese ? "en" : "vi");
  };

  return (
    <button
      onClick={changeLanguage}
      className="w-10 h-10 rounded-full hover:scale-110 transition-transform overflow-hidden"
      title={isVietnamese ? "Switch to English" : "Chuyển sang Tiếng Việt"}
      aria-label={isVietnamese ? "Switch to English" : "Switch to Vietnamese"}
    >
      {isVietnamese ? (
        <svg
          className="w-full h-full"
          viewBox="0 0 60 30"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="30" fill="#DA251D" />
          <path
            d="M30 18L18 24L24 16L12 12L27 12L30 4L33 12L48 12L36 16L42 24L30 18Z" // Ngôi sao rộng hơn
            fill="#FFFF00"
          />
        </svg>
      ) : (
        <svg
          className="w-full h-full"
          viewBox="0 0 60 30"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0L60 30M60 0L0 30" stroke="white" strokeWidth="6" />
          <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
          <path d="M30 0V30M0 15H60" stroke="white" strokeWidth="10" />
          <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )}
    </button>
  );
}

export default LanguageSwitcher;
