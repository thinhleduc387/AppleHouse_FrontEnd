import React from "react";
import { FiX } from "react-icons/fi";

const ChatContent = ({
  messages,
  currentUserId,
  messagesEndRef,
  onImageClick,
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-3 space-y-1 flex flex-col justify-end"
      style={{
        minHeight: 0,
        maxHeight: "calc(100% - 112px)", // ChatHeader ~56px, ChatSend ~56px
        overflowY: "auto !important",
      }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          {message.type === "text" ? (
            <div
              className={`text-black text-sm px-4 py-2 max-w-[60%] break-words ${
                message.senderId === currentUserId
                  ? "bg-blue-500 rounded-2xl rounded-br-none ml-20 text-white"
                  : "bg-gray-300 rounded-2xl mr-20"
              }`}
              style={
                message.senderId !== currentUserId
                  ? { width: "fit-content", minWidth: "48px" }
                  : {}
              }
            >
              <div>{message.content}</div>
            </div>
          ) : (
            <img
              src={message.content}
              alt="Uploaded image"
              className={`max-w-[50%] h-auto rounded-xl cursor-pointer ${
                message.senderId === currentUserId ? "ml-20" : "mr-20"
              }`}
              style={{ maxHeight: "160px" }}
              onClick={() => onImageClick(message.content)}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/160?text=Error";
              }}
            />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContent;
