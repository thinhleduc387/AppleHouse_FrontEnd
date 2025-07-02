import React, { useState, useRef } from "react";
import { FiSearch, FiArrowLeft, FiX, FiImage, FiSend } from "react-icons/fi";

// Sample data
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

const ChatPage = () => {
  const currentUserId = "user1";
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: "user1",
      content: "He về chơi thú vị bên đi",
      timestamp: "2025-06-17T22:01:00+07:00",
      type: "text",
    },
    {
      id: 2,
      senderId: "user1",
      content: "Tối nay có đi chơi không?",
      timestamp: "2025-06-17T22:02:00+07:00",
      type: "text",
    },
    {
      id: 3,
      senderId: "user1",
      content: "Vui hơn năm ngoái rồi",
      timestamp: "2025-06-17T22:03:00+07:00",
      type: "text",
    },
    {
      id: 4,
      senderId: "user2",
      content: "siêu vui!",
      timestamp: "2025-06-17T22:04:00+07:00",
      type: "text",
    },
    {
      id: 5,
      senderId: "user1",
      content: "Cảm ơn bạn đã tặng quà cho mình!",
      timestamp: "2025-06-17T22:05:00+07:00",
      type: "text",
    },
    {
      id: 6,
      senderId: "user1",
      content: "Cảm ơn bạn lần nữa nhé!",
      timestamp: "2025-06-17T22:06:00+07:00",
      type: "text",
    },
    {
      id: 7,
      senderId: "user2",
      content: "ok",
      timestamp: "2025-06-17T22:07:00+07:00",
      type: "text",
    },
  ]);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffMs = now - messageTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60)
      return diffMinutes === 0 ? "Vừa xong" : `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(imagePromises).then((images) => {
      setSelectedImages((prev) => [...prev, ...images]);
    });

    fileInputRef.current.value = "";
  };

  const handleDeleteImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSendMessage = () => {
    const newMessages = [];

    if (messageInput.trim()) {
      newMessages.push({
        id: messages.length + newMessages.length + 1,
        senderId: currentUserId,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
        type: "text",
      });
    }

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        newMessages.push({
          id: messages.length + newMessages.length + 1,
          senderId: currentUserId,
          content: image,
          timestamp: new Date().toISOString(),
          type: "image",
        });
      });
    }

    if (newMessages.length > 0) {
      setMessages([...messages, ...newMessages]);
      setMessageInput("");
      setSelectedImages([]);
    }
  };

  const selectedChat = chatListData.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex h-[100vh] bg-gray-100 overflow-hidden">
      {/* Chat List */}
      <div className="w-[320px] bg-white shadow-lg flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <FiSearch className="text-gray-500" />
            <input
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              placeholder="Tìm kiếm"
              type="text"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          {chatListData.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedChatId === chat.id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <img
                alt={`Avatar of ${chat.userName}`}
                className="w-8 h-8 rounded-full"
                src={chat.avatar}
                width="32"
                height="32"
              />
              <div className="flex-1 flex flex-col max-w-[calc(100%-80px)]">
                <div className="text-gray-800 text-sm font-medium truncate">
                  {chat.userName}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {chat.lastMessage.senderId === currentUserId ? "Bạn: " : ""}
                  {chat.lastMessage.content}
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                {formatTime(chat.lastMessage.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Conversation */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 shrink-0">
          <button aria-label="Back" className="text-gray-500 md:hidden">
            <FiArrowLeft size={20} />
          </button>
          <img
            alt="User profile picture"
            className="w-8 h-8 rounded-full"
            src={selectedChat.avatar}
            width="32"
            height="32"
          />
          <div className="flex flex-col">
            <span className="text-gray-800 text-sm font-medium">
              {selectedChat.userName}
            </span>
          </div>
          <div className="ml-auto">
            <button aria-label="Close" className="text-gray-500">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[60%] break-words ${
                  message.senderId === currentUserId
                    ? "bg-blue-500 rounded-2xl rounded-br-none ml-4 text-white"
                    : "bg-gray-200 rounded-2xl mr-4"
                } p-2`}
                style={
                  message.senderId !== currentUserId
                    ? { width: "fit-content", minWidth: "48px" }
                    : {}
                }
              >
                {message.type === "text" ? (
                  <div className="text-sm">{message.content}</div>
                ) : (
                  <img
                    src={message.content}
                    alt="Uploaded image"
                    className="max-w-full h-auto rounded-xl"
                    style={{ maxHeight: "200px" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        {selectedImages.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 shrink-0">
            <div className="max-w-full bg-blue-100 rounded-2xl rounded-br-none p-2">
              <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview image ${index + 1}`}
                      className="h-16 w-auto rounded-lg object-cover"
                      style={{ minWidth: "64px" }}
                    />
                    <button
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 shrink-0">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            aria-label="Image upload"
            className="text-gray-500"
            onClick={() => fileInputRef.current.click()}
          >
            <FiImage size={20} />
          </button>
          <textarea
            className="flex-1 min-w-0 bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            placeholder="Aa"
            rows="1"
            style={{ minHeight: "40px", maxHeight: "120px" }}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          ></textarea>
          <button
            aria-label="Send"
            className="text-gray-500"
            onClick={handleSendMessage}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
