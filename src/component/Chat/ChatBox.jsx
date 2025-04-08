import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ProductSection from "./components/ProductSection";

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
              setIsChatOpen(false), setIsExpanded(false);
            }}
          />

          <div className="flex flex-1 overflow-hidden">
            <div
              className={`flex flex-col ${
                isExpanded ? "w-full md:w-1/2" : "w-full"
              }`}
            >
              <ChatMessages />
              <ChatInput />
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
