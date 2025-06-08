import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ProductSection from "./components/ProductSection";
import ChatHeader from "./components/ChatHeader";
import { getChatBotResponseV2 } from "../../config/api";
import {
  toggleChat,
  toggleExpand,
  closeChat,
  addMessage,
  setLoading,
  setMessages,
} from "../../redux/slices/chatBotSlice";

// Key để lưu vào localStorage
const STORAGE_KEY = "chat_history";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { isChatOpen, isExpanded, messages, isLoading, isHidden, productIds } =
    useSelector((state) => state.chatBot);

  // Khôi phục lịch sử từ localStorage khi component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          dispatch(setMessages(parsedHistory));
        }
      } catch (error) {
        console.error("Error parsing chat history:", error);
      }
    }
  }, [dispatch]);

  // Lưu lịch sử vào localStorage khi messages thay đổi
  useEffect(() => {
    // Giới hạn số lượng tin nhắn (ví dụ: 100 tin nhắn)
    const limitedMessages = messages.slice(-100);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedMessages));
    } catch (error) {
      console.error("Error saving chat history:", error);
      // Xử lý khi localStorage đầy
      if (error.name === "QuotaExceededError") {
        // Xóa lịch sử cũ và lưu lại
        const reducedMessages = messages.slice(-50);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedMessages));
      }
    }
  }, [messages]);

  const callApiChat = async (message) => {
    try {
      // Chuẩn bị chat_history từ messages
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const payload = {
        query: message,
        chat_history: chatHistory,
      };

      const response = await getChatBotResponseV2(payload);
      return response;
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  };

  const handleSendMessage = async (message) => {
    try {
      dispatch(setLoading(true));
      const userMessage = {
        role: "user",
        content: message,
      };
      dispatch(addMessage(userMessage));

      const response = await callApiChat(message);

      const botMessage = {
        role: "assistant",
        content: response?.response || "Không nhận được phản hồi từ server.",
        suggested_products: response?.suggested_products
          ? response?.suggested_products
          : [],
      };
      dispatch(addMessage(botMessage));
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(
        addMessage({
          role: "assistant",
          content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {!isHidden && (
        <>
          <button
            onClick={() => dispatch(toggleChat())}
            className="fixed bottom-6 right-6 bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-50"
          >
            <img
              src="/chatbot.png"
              alt="AI Chat"
              className="w-[50px] h-[50px]"
            />
          </button>

          {isChatOpen && (
            <div
              className={`fixed transition-all duration-300 ${
                isExpanded
                  ? "top-0 left-0 w-full h-full"
                  : "bottom-24 right-6 w-[90%] md:w-[600px] h-[85vh] md:h-[700px] mx-auto md:mx-0"
              } bg-white shadow-xl z-50 flex flex-col rounded-lg`}
            >
              <ChatHeader
                onExpand={() => dispatch(toggleExpand())}
                onClose={() => dispatch(closeChat())}
              />

              <div className="flex flex-1 overflow-hidden">
                <div
                  className={`flex flex-col ${
                    isExpanded ? "w-full md:w-1/2" : "w-full"
                  }`}
                >
                  <ChatMessages messages={messages} isLoading={isLoading} />
                  <ChatInput onSendMessage={handleSendMessage} />
                </div>

                {isExpanded && (
                  <div className="hidden md:block md:w-1/2">
                    <ProductSection />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatBox;
