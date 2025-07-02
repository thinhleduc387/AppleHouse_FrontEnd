import { FiMessageSquare } from "react-icons/fi";
import ChatList from "./ChatList/ChatList";
import { useState } from "react";

const ChatUser = () => {
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };
  const handleCloseChat = () => {
    setIsChatListOpen(false);
  };
  return (
    <>
      <button
        onClick={toggleChatList}
        className="bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-50"
      >
        <FiMessageSquare className="w-[50px] h-[50px] text-blue-500" />
      </button>

      {isChatListOpen && (
        <div className="absolute bottom-0 right-24 w-[320px] h-[480px] bg-white dark:bg-gray-800 shadow-xl z-10 flex flex-col rounded-lg transition-all duration-300">
          <ChatList onClose={handleCloseChat} />
        </div>
      )}
    </>
  );
};

export default ChatUser;
