import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guestInformation: {
    name: "",
    phone: "",
    email: "",
  },
  checkoutValue: {
    accLoyalPoint: 0,
    feeShip: 0,
    productDiscount: 0,
    totalCheckOut: 0,
    totalPrice: 0,
    voucherDiscount: 0,
    availableLoyalPoints: 0,
  },
  selectedVoucher: [],
  orderAddress: {},
  orderMethodPayment: "STRIPE",
  orderNote: "",
  useLoyalPoints: false,
  isProcessing: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrderAddress: (state, action) => {
      state.orderAddress = action.payload;
    },
    setOrderMethodPayment: (state, action) => {
      state.orderMethodPayment = action.payload;
    },
    setOrderNotes: (state, action) => {
      state.orderNote = action.payload;
    },
    setCheckoutValue: (state, action) => {
      state.checkoutValue = action.payload;
    },
    setSelectedVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    setUseLoyalPoints: (state, action) => {
      state.useLoyalPoints = action.payload;
    },
    setIsProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setGuestInformation: (state, action) => {
      state.guestInformation = action.payload;
    },
  },
});

export const {
  setOrderAddress,
  setOrderMethodPayment,
  setOrderNotes,
  setCheckoutValue,
  setSelectedVoucher,
  setUseLoyalPoints,
  setIsProcessing,
  setGuestInformation,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
