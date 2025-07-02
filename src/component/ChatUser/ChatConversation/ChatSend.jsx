import { FiImage } from "react-icons/fi";
import { useRef, useEffect } from "react";

const ChatSend = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const adjustHeight = () => {
      textarea.style.height = "auto"; // Reset chiều cao
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Giới hạn 120px
    };
    textarea.addEventListener("input", adjustHeight);
    adjustHeight(); // Gọi ngay để điều chỉnh chiều cao ban đầu
    return () => textarea.removeEventListener("input", adjustHeight);
  }, []);

  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border-t border-gray-300 text-gray-600 text-base flex-wrap"
      style={{
        minHeight: "56px",
        maxHeight: "176px", // 120px textarea + padding + border
        overflowY: "auto",
      }}
    >
      <button aria-label="Image upload" className="focus:outline-none text-lg">
        <FiImage />
      </button>
      <textarea
        ref={textareaRef}
        className="flex-1 min-w-[200px] bg-gray-100 rounded-[16px] px-4 py-2 text-black text-sm placeholder-gray-500 focus:outline-none resize-none"
        placeholder="Aa"
        rows="1"
        style={{
          minHeight: "40px",
          maxHeight: "120px",
        }}
      ></textarea>
      <button
        aria-label="Clap"
        className="focus:outline-none text-yellow-400 text-2xl"
      >
        👏
      </button>
    </div>
  );
};

export default ChatSend;
