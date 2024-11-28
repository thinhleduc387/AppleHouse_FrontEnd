import Comment from "./Comment";

const CommentSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Comment />
        <Comment />
      </div>
      <button
        type="button"
        className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
      >
        Read all reviews
      </button>
    </div>
  );
};

export default CommentSection;
