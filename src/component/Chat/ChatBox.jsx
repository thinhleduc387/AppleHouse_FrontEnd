import { useState } from "react";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ProductSection from "./components/ProductSection";
import ChatHeader from "./components/chatheader";
import { getChatBotResponse } from "../../config/api";

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Xin chào! Mình là trợ lý AI của shop. Mình có thể giúp gì cho bạn?",
    },
  ]);
  console.log("🚀 ~ ChatBox ~ messages:", messages);
  const [isLoading, setIsLoading] = useState(false);

  const callApiChat = async (message) => {
    try {
      const response = await getChatBotResponse(message);
      console.log("🚀 ~ callApiChat ~ response?.metedata:", response?.metadata);
      return response?.metadata;
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  };

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      const response = await callApiChat(message);

      setMessages((prev) => [
        ...prev,
        { role: "model", content: response?.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-white rounded-full p-2 shadow-lg transition-all duration-300 z-50"
      >
        <img src="/chatbot.png" alt="AI Chat" className="w-[50px] h-[50px]" />
      </button>

      {isChatOpen && (
        <div
          className={`fixed transition-all duration-300 ${
            isExpanded
              ? "top-0 left-0 w-full h-full"
              : "bottom-24 right-6 w-[90%] md:w-[400px] h-[80vh] md:h-[600px] mx-auto md:mx-0"
          } bg-white shadow-xl z-50 flex flex-col rounded-lg`}
        >
          <ChatHeader
            onExpand={() => setIsExpanded(!isExpanded)}
            onClose={() => {
              setIsChatOpen(false);
              setIsExpanded(false);
            }}
          />

          <div className="flex flex-1 overflow-hidden">
            <div
              className={`flex flex-col ${
                isExpanded ? "w-full md:w-1/2" : "w-full"
              }`}
            >
              <ChatMessages messages={messages} />
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
  );
};

export default ChatBox;
