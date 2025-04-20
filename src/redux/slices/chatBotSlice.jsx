import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: false,
  isHidden: false,
  isExpanded: false,
  messages: [
    {
      role: "model",
      content:
        "Xin chào! Mình là trợ lý AI của shop. Mình có thể giúp gì cho bạn?",
    },
  ],
  isLoading: false,
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
    setHiddenChatBot: (state, action) => {
      console.log("🚀 ~ action.payload:", action.payload);
      state.isHidden = action.payload;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
      state.isExpanded = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
} = chatBotSlice.actions;
export default chatBotSlice.reducer;
