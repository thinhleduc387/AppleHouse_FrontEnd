import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatSend from "./ChatSend";

// Data mẫu
const messages = [
  {
    id: 1,
    senderId: "user1",
    content: "He về chơi toi bên đi",
    timestamp: "2025-06-17T22:01:00+07:00",
  },
  {
    id: 2,
    senderId: "user1",
    content: "Tối nay có đi chơi không?",
    timestamp: "2025-06-17T22:02:00+07:00",
  },
  {
    id: 3,
    senderId: "user1",
    content: "Vui hơn năm ngoái r",
    timestamp: "2025-06-17T22:03:00+07:00",
  },
  {
    id: 4,
    senderId: "user2",
    content: "siuuu",
    timestamp: "2025-06-17T22:04:00+07:00",
  },
  {
    id: 5,
    senderId: "user1",
    content: "Cảm ơn bạn đã tặng quà cho mình",
    timestamp: "2025-06-17T22:05:00+07:00",
  },
  {
    id: 6,
    senderId: "user1",
    content: "Cảm ơn bạn đã tặng quà cho mình",
    timestamp: "2025-06-17T22:06:00+07:00",
  },
  {
    id: 7,
    senderId: "user2",
    content: "ok",
    timestamp: "2025-06-17T22:07:00+07:00",
  },
];

const ChatConversation = ({ onMinimize, onClose, onBack }) => {
  const currentUserId = "user1";

  return (
    <div className="h-[480px] bg-white rounded-md shadow-lg flex flex-col">
      <ChatHeader onClose={onClose} onBack={onBack} />
      <ChatContent messages={messages} currentUserId={currentUserId} />
      <ChatSend />
    </div>
  );
};

export default ChatConversation;
