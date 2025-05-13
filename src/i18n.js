import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHeader from "./locales/en/user/header.json";
import viHeader from "./locales/vi/user/header.json";
import enProfileAdmin from "./locales/en/admin/profileAdmin.json";
import viProfileAdmin from "./locales/vi/admin/profileAdmin.json";
import enDashBoard from "./locales/en/admin/dashBoard.json";
import viDashBoard from "./locales/vi/admin/dashBoard.json";
import enTopProduct from "./locales/en/admin/topProduct.json";
import viTopProduct from "./locales/vi/admin/topProduct.json";
import enStock from "./locales/en/admin/stock.json";
import viStock from "./locales/vi/admin/stock.json";
import enCategory from "./locales/en/admin/category.json";
import viCategory from "./locales/vi/admin/category.json";
import enOrder from "./locales/en/admin/order.json";
import viOrder from "./locales/vi/admin/order.json";
import enComment from "./locales/en/admin/comment.json";
import viComment from "./locales/vi/admin/comment.json";
import enUserManagement from "./locales/en/admin/userManagement.json";
import viUserManagement from "./locales/vi/admin/userManagement.json";
import enVoucher from "./locales/en/admin/voucher.json";
import viVoucher from "./locales/vi/admin/voucher.json";
import enFlashSale from "./locales/en/admin/flashsale.json";
import viFlashSale from "./locales/vi/admin/flashsale.json";
import enFooter from "./locales/en/user/footer.json";
import viFooter from "./locales/vi/user/footer.json";
import enDetailProduct from "./locales/en/user/detailProduct.json";
import viDetailProduct from "./locales/vi/user/detailProduct.json";
import enCart from "./locales/en/user/cart.json"; // Import English cart.json
import viCart from "./locales/vi/user/cart.json"; // Import Vietnamese cart.json

const resources = {
  en: {
    header: enHeader,
    profileAdmin: enProfileAdmin,
    dashBoard: enDashBoard,
    topProduct: enTopProduct,
    stock: enStock,
    category: enCategory,
    order: enOrder,
    comment: enComment,
    userManagement: enUserManagement,
    voucher: enVoucher,
    flashsale: enFlashSale,
    footer: enFooter,
    detailProduct: enDetailProduct,
    cart: enCart, // Add cart namespace
  },
  vi: {
    header: viHeader,
    profileAdmin: viProfileAdmin,
    dashBoard: viDashBoard,
    topProduct: viTopProduct,
    stock: viStock,
    category: viCategory,
    order: viOrder,
    comment: viComment,
    userManagement: viUserManagement,
    voucher: viVoucher,
    flashsale: viFlashSale,
    footer: viFooter,
    detailProduct: viDetailProduct,
    cart: viCart, // Add cart namespace
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    ns: [
      "header",
      "profileAdmin",
      "dashBoard",
      "topProduct",
      "stock",
      "category",
      "order",
      "comment",
      "userManagement",
      "voucher",
      "flashsale",
      "footer",
      "detailProduct",
      "cart", // Add "cart" namespace
    ],
    defaultNS: "topProduct",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
