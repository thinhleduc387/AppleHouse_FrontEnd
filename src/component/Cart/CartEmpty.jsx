import React from "react";
import { useTranslation } from "react-i18next";

const CartEmpty = () => {
  const { t } = useTranslation("cart");

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 py-[18px] sm:w-full flex-col-reverse sm:px-4 md:px-8 lg:px-[100px] pc:rounded-4xl">
      <div className="flex flex-col items-center sm:text-center">
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {t("noItemsInCart")}
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4">
          {t("shopNowPrompt")}
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-600 dark:hover:bg-red-700 transition-colors sm:self-center"
        >
          {t("shopNow")}
        </a>
      </div>

      <div className="relative h-auto w-full max-w-[750px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[750px] mx-auto pc:mr-[-50px]">
        <img
          alt="Empty cart illustration"
          loading="lazy"
          decoding="async"
          src="https://fptshop.com.vn/img/empty_cart.png?w=1920&q=100"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default CartEmpty;
