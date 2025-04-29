import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập nội dung chat"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Gửi
        </button>
      </form>
      <div className="text-center text-xs text-gray-500 mt-2">
        Tích hợp trí tuệ nhân tạo, thông tin mang tính tham khảo
      </div>
    </div>
  );
};

export default ChatInput;
