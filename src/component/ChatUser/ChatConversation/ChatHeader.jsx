import { FiArrowLeft, FiX } from "react-icons/fi";

const ChatHeader = ({ onClose, onBack }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300">
      <button
        aria-label="Back"
        className="focus:outline-none text-gray-600 text-lg"
        onClick={onBack}
      >
        <FiArrowLeft />
      </button>
      <img
        alt="User profile picture, gray circle with user icon"
        className="w-8 h-8 rounded-full"
        src="https://storage.googleapis.com/a1aa/image/46f1a736-5879-459c-05a1-98da2d7fedb9.jpg"
        width="32"
        height="32"
      />
      <div className="flex flex-col leading-tight">
        <div className="text-gray-800 text-base font-normal">her</div>
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
