import { FiX } from "react-icons/fi";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300">
      <img
        alt="User profile picture, gray circle with user icon"
        className="w-8 h-8 rounded-full"
        src="https://static.vecteezy.com/system/resources/thumbnails/019/194/935/small_2x/global-admin-icon-color-outline-vector.jpg"
        width="32"
        height="32"
      />
      <div className="flex flex-col leading-tight">
        <div className="text-gray-800 text-base font-normal">Admin</div>
      </div>
      <div className="ml-auto flex items-center gap-4 text-gray-600 text-lg">
        <button
          aria-label="Close"
          className="focus:outline-none"
          onClick={onClose}
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
