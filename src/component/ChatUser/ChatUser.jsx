import { FiMessageSquare } from "react-icons/fi";
import ChatConversation from "../ChatUser/ChatConversation/ChatConversation";
import { useState } from "react";
import { getChatRoom } from "../../config/api";
import { useSelector } from "react-redux";

// roomId the same userId
const ChatUser = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.account?.user?._id);
  const defaultChat = {
    id: 1,
    userName: "her",
    avatar:
      "https://storage.googleapis.com/a1aa/image/46f1a736-5879-459c-05a1-98da2d7fedb9.jpg",
    lastMessage: {
      content: "ok",
      senderId: "user2",
      timestamp: "2025-06-17T22:07:00+07:00",
    },
  };

  const toggleChat = async () => {
    // const responseRoomId = await getChatRoom({ customerId: userId });

    // console.log(responseRoomId);

    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-50"
      >
        <FiMessageSquare className="w-[50px] h-[50px] text-blue-500" />
      </button>

      {isChatOpen && (
        <div className="absolute bottom-0 right-24 w-[320px] h-[480px] bg-white  shadow-xl z-10 flex flex-col rounded-lg transition-all duration-300 overflow-hidden">
          <ChatConversation chat={defaultChat} onClose={handleCloseChat} />
        </div>
      )}
    </>
  );
};

export default ChatUser;
