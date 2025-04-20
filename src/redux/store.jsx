import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import flashSaleReducer from "./slices/flashSaleSlice";
import rbacReducer from "./slices/rbacSlice";
import chatBotReducer from "./slices/chatBotSlice";
const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    cart: cartReducer,
    flashSale: flashSaleReducer,
    rbac: rbacReducer,
    chatBot: chatBotReducer,
  },
});

export default store;
