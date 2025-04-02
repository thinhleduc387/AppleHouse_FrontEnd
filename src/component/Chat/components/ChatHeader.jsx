import { FiShare } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const ChatHeader = ({ onExpand, onClose }) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/chatbot.png" alt="AI" className="w-8 h-8" />
        <h3 className="font-semibold">Trợ lý AI</h3>
      </div>
      <div className="flex gap-3">
        <button onClick={onExpand}>
          <FiShare className="text-xl" />
        </button>
        <button onClick={onClose}>
          <IoClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;