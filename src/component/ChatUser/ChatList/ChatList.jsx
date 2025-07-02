import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatConversation from "../ChatConversation/ChatConversation";
import { motion, AnimatePresence } from "framer-motion";

// Dữ liệu mẫu
const chatListData = [
  {
    id: 1,
    userName: "her",
    avatar:
      "https://storage.googleapis.com/a1aa/image/46f1a736-5879-459c-05a1-98da2d7fedb9.jpg",
    lastMessage: {
      content: "ok",
      senderId: "user2",
      timestamp: "2025-06-17T22:07:00+07:00",
    },
  },
  {
    id: 2,
    userName: "John",
    avatar:
      "https://storage.googleapis.com/a1aa/image/46f1a736-5879-459c-05a1-98da2d7fedb9.jpg",
    lastMessage: {
      content: "Cảm ơn bạn đã tặng quà cho mình",
      senderId: "user1",
      timestamp: "2025-06-17T22:06:00+07:00",
    },
  },
  {
    id: 3,
    userName: "Alice",
    avatar:
      "https://storage.googleapis.com/a1aa/image/46f1a736-5879-459c-05a1-98da2d7fedb9.jpg",
    lastMessage: {
      content: "Hẹn gặp tối nay nhé!",
      senderId: "user2",
      timestamp: "2025-06-17T21:30:00+07:00",
    },
  },
];

const ChatList = ({ onClose }) => {
  const currentUserId = "user1";
  const [selectedChat, setSelectedChat] = useState(null);

  const formatTime = (timestamp) => {
    const now = new Date("2025-06-17T23:39:00+07:00");
    const messageTime = new Date(timestamp);
    const diffMs = now - messageTime;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      return `${diffDays} ngày trước`;
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const chatListVariants = {
    initial: { opacity: 0, x: -50 }, // ChatList hiện từ bên trái
    animate: { opacity: 1, x: 0 }, // Vị trí bình thường
    exit: { opacity: 0, x: -50 }, // ChatList thoát ra bên trái
  };

  const chatConversationVariants = {
    initial: { opacity: 0, x: 50 }, // ChatConversation hiện từ bên phải
    animate: { opacity: 1, x: 0 }, // Vị trí bình thường
    exit: { opacity: 0, x: 50 }, // ChatConversation thoát ra bên phải
  };

  return (
    <div className="w-[320px] h-[480px] bg-white rounded-md shadow-lg flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedChat ? (
          <motion.div
            key="chatList"
            variants={chatListVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
            <div className="px-4 py-3 border-b border-gray-300">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <FiSearch className="text-gray-600 text-lg" />
                <input
                  className="flex-1 bg-transparent text-black text-sm placeholder-gray-500 focus:outline-none"
                  placeholder="Tìm kiếm"
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {chatListData.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-3 py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleSelectChat(chat)}
                >
                  <img
                    alt={`Avatar of ${chat.userName}`}
                    className="w-8 h-8 rounded-full"
                    src={chat.avatar}
                    width="32"
                    height="32"
                  />
                  <div className="flex-1 flex flex-col max-w-full">
                    <div className="text-gray-800 text-base font-normal">
                      {chat.userName}
                    </div>
                    <div className="text-gray-600 text-sm truncate max-w-[150px]">
                      {chat.lastMessage.senderId === currentUserId
                        ? "Bạn: "
                        : ""}
                      {chat.lastMessage.content}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {formatTime(chat.lastMessage.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chatConversation"
            variants={chatConversationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
            <ChatConversation
              chat={selectedChat}
              onClose={onClose}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatList;
