import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: false,
  isHidden: false,
  isExpanded: false,
  messages: [
    {
      role: "assistant",
      content:
        "Xin chào! Mình là trợ lý AI của shop. Mình có thể giúp gì cho bạn?",
      suggested_products: [],
    },
  ],
  isLoading: false,
  current_suggested_products: [],
};

const chatBotSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    toggleExpand: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    openExpand: (state) => {
      state.isExpanded = true;
    },
    setHiddenChatBot: (state, action) => {
      state.isHidden = action.payload;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
      state.isExpanded = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurentSuggestedProducts: (state, action) => {
      state.current_suggested_products = action.payload;
    },
  },
});

export const {
  toggleChat,
  toggleExpand,
  closeChat,
  addMessage,
  setLoading,
  setHiddenChatBot,
  setMessages,
  setCurentSuggestedProducts,
  openExpand,
} = chatBotSlice.actions;

export default chatBotSlice.reducer;
