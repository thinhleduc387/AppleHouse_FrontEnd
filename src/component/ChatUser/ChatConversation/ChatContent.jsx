import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatContent = ({ messages, messagesEndRef, onImageClick }) => {
  const currentUserId = useSelector((state) => state.account?.user?._id);
  const containerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No messages yet
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
      style={{
        minHeight: 0,
        maxHeight: "calc(100% - 112px)",
        overflowY: "auto",
      }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          {message.messageType === "text" ? (
            <div
              className={`text-black text-sm px-4 py-2 max-w-[60%] break-words ${
                message.sender === currentUserId
                  ? "bg-blue-500 rounded-2xl rounded-br-none ml-20 text-white"
                  : "bg-gray-300 rounded-2xl mr-20"
              }`}
              style={{ width: "fit-content", minWidth: "48px" }}
            >
              <div>{message.content}</div>
            </div>
          ) : (
            <div
              className={`flex flex-col gap-2 max-w-[50%] ${
                message.sender === currentUserId ? "ml-20" : "mr-20"
              }`}
            >
              {message.imageUrl?.length > 0 ? (
                message.imageUrl.map((image_url, index) => (
                  <img
                    key={`${message.id}-image-${index}`}
                    src={image_url}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-auto rounded-xl cursor-pointer"
                    style={{ maxHeight: "160px" }}
                    loading="lazy"
                    onClick={() => onImageClick(image_url)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/160?text=Error";
                    }}
                  />
                ))
              ) : (
                <div className="text-red-500 text-sm">No images available</div>
              )}
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContent;
