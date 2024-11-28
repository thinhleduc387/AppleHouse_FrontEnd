import { AiFillLike } from "react-icons/ai";
import { GoReply } from "react-icons/go";

const CommentItem = () => {
  return (
    <div className="flex items-start">
      <img
        src="https://readymadeui.com/team-2.webp"
        className="w-12 h-12 rounded-full border-2 border-white"
        alt="Reviewer"
      />
      <div className="ml-3">
        <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
        <div className="flex space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 ${i < 3 ? "fill-blue-600" : "fill-[#CED5D8]"}`}
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          ))}
          <p className="text-xs !ml-2 font-semibold text-gray-800">
            2 mins ago
          </p>
        </div>
        <p className="text-sm mt-4 text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex space-x-4 mt-2">
          <button className="flex flex-row justify-center items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 border-2 rounded-full border-[#d1d5db]">
            <AiFillLike />0
          </button>
          <button className="flex flex-row justify-center items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600 border-2 rounded-full border-[#d1d5db]">
            <GoReply />Trả lời
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
