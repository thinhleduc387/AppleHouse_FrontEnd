const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <img src="/chatbot.png" alt="AI" className="w-8 h-8" />
          <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
            <p>Xin chào! Mình là trợ lý AI của bạn tại Tiki...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;