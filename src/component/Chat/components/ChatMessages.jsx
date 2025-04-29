const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role !== "user" && (
              <img src="/chatbot.png" alt="AI" className="w-8 h-8" />
            )}
            <div
              className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
