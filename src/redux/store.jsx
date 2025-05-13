import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import flashSaleReducer from "./slices/flashSaleSlice";
import rbacReducer from "./slices/rbacSlice";
import chatBotReducer from "./slices/chatBotSlice";
import checkoutReducer from "./slices/checkoutSlice";
import accountReducer from "./slice/accountSlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import flashSaleReducer from "./slice/flashSaleSlice";
import rbacReducer from "./slice/rbacSlice";
import themeReducer from "./slice/themeSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    cart: cartReducer,
    flashSale: flashSaleReducer,
    rbac: rbacReducer,
    chatBot: chatBotReducer,
    checkout: checkoutReducer,
    theme: themeReducer,
  },
});

export default store;
