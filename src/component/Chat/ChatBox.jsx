import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ProductSection from "./components/ProductSection";
import ChatHeader from "./components/chatheader";
import { getChatBotResponse } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleChat,
  toggleExpand,
  closeChat,
  addMessage,
  setLoading,
} from "../../redux/slices/chatBotSlice";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { isChatOpen, isExpanded, messages, isLoading, isHidden } = useSelector(
    (state) => state.chatBot
  );

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
      dispatch(setLoading(true));
      dispatch(addMessage({ role: "user", content: message }));

      const response = await callApiChat(message);
      dispatch(addMessage({ role: "model", content: response?.reply }));
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(
        addMessage({
          role: "model",
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
                  : "bottom-24 right-6 w-[90%] md:w-[400px] h-[80vh] md:h-[600px] mx-auto md:mx-0"
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
