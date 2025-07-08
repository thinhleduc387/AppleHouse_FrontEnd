import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatSend from "./ChatSend";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import socket, {
  joinChatRoom,
  sendMessage,
  onNewMessage,
} from "../../../socket/index.js";
const initialMessages = [
  {
    id: 1,
    senderId: "user1",
    content: "He về chơi toi bên đi",
    timestamp: "2025-06-17T22:01:00+07:00",
    type: "text",
  },
  // Giả sử có 50 tin nhắn, chỉ giữ ví dụ đầu và cuối
  {
    id: 50,
    senderId: "user2",
    content: "Hẹn gặp tối nay, vui lắm đây!",
    timestamp: "2025-06-17T22:50:00+07:00",
    type: "text",
  },
];

const ChatConversation = ({ onClose, onBack }) => {
  const currentUserId = "user1";
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State cho modal ảnh
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const userId = useSelector((state) => state.account?.user?._id);

  const handleImageUpload = (event, urls = []) => {
    const files = Array.from(event.target.files || []);
    const imagePromises = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(imagePromises).then((fileUrls) => {
      setSelectedImages((prev) => [...prev, ...fileUrls, ...urls]);
    });

    fileInputRef.current.value = "";
  };

  const handleDeleteImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && selectedImages.length === 0) return;

    if (messageInput.trim()) {
      const textMsg = {
        roomId: userId,
        senderId: userId,
        content: messageInput.trim(),
        messageType: "text",
        imageUrl: null,
      };

      sendMessage(textMsg);
    }

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        const imageMsg = {
          roomId: userId,
          senderId: userId,
          content: "",
          imageUrl: image,
          messageType: "image",
        };

        sendMessage(imageMsg);
      });
    }

    setMessageInput("");
    setSelectedImages([]);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        const scrollContainer = messagesEndRef.current.parentElement;
        if (scrollContainer.scrollHeight > scrollContainer.clientHeight) {
          messagesEndRef.current.scrollIntoView({ behavior: "auto" });
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, selectedImages]);

  useEffect(() => {
    if (!userId) return;

    joinChatRoom(userId);

    onNewMessage((newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader onClose={onClose} onBack={onBack} />
      <ChatContent
        messages={messages}
        currentUserId={currentUserId}
        messagesEndRef={messagesEndRef}
        onImageClick={setSelectedImage}
      />
      <ChatSend
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        selectedImages={selectedImages}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={handleDeleteImage}
        handleSendMessage={handleSendMessage}
        fileInputRef={fileInputRef}
      />
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="Full-size image"
              className="max-w-full max-h-full object-contain rounded-xl"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/240?text=Error";
              }}
            />
            <button
              aria-label="Close image"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              onClick={() => setSelectedImage(null)}
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatConversation;
