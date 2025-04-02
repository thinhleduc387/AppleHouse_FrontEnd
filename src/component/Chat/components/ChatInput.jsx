const ChatInput = () => {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập nội dung chat"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button className="text-blue-500 px-4">Gửi</button>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        Tích hợp trí tuệ nhân tạo, thông tin mang tính tham khảo
      </div>
    </div>
  );
};

export default ChatInput;