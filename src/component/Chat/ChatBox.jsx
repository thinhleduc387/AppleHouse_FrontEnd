import { useEffect, memo } from "react";
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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const STORAGE_KEY = "chat_history";

const ChatBox = () => {
  const { t } = useTranslation("chatBot");
  const dispatch = useDispatch();
  const { isChatOpen, isExpanded, messages, isLoading, isHidden, productIds } =
    useSelector((state) => state.chatBot);

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

  useEffect(() => {
    const limitedMessages = messages.slice(-100);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedMessages));
    } catch (error) {
      console.error("Error saving chat history:", error);
      if (error.name === "QuotaExceededError") {
        const reducedMessages = messages.slice(-50);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedMessages));
      }
    }
  }, [messages]);

  const callApiChat = async (message) => {
    try {
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
      if (
        error.response?.status === 401 &&
        error.response?.data?.message?.includes("Unauthorized")
      ) {
        toast.error(t("sessionExpired"));
      } else {
        toast.error(error.response?.data?.message || t("errorChat"));
      }
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
        content: response?.response || t("errorMessage"),
        suggested_products: response?.suggested_products
          ? response?.suggested_products
          : [],
      };
      dispatch(addMessage(botMessage));
    } catch (error) {
      dispatch(
        addMessage({
          role: "assistant",
          content: t("errorMessage"),
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
            className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg dark:shadow-gray-700 transition-colors duration-300 z-50"
          >
            <img
              src="/chatbot.png"
              alt="AI Chat"
              className="w-[50px] h-[50px]"
            />
          </button>

          {isChatOpen && (
            <div
              className={`transition-all duration-300 ${
                isExpanded
                  ? "fixed top-0 left-0 w-screen h-screen z-[100] bg-white dark:bg-gray-800"
                  : "absolute bottom-0 right-24 w-[90%] md:w-[600px] h-[85vh] md:h-[700px] mx-auto md:mx-0 z-50 rounded-lg bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700"
              } flex flex-col transition-colors duration-300`}
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

export default memo(ChatBox);
