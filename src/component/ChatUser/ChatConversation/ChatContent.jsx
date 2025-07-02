const ChatContent = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-black text-sm px-4 py-2 max-w-[60%] break-words ${
              message.senderId === currentUserId
                ? "bg-blue-500 rounded-full rounded-br-none ml-20 text-white"
                : "bg-gray-300 rounded-full mr-20"
            }`}
            style={
              message.senderId !== currentUserId
                ? { width: "fit-content", minWidth: "48px" }
                : {}
            }
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContent;
