import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { createComment, getListCommentBySpuId } from "../../../config/api";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const userId = useSelector((state) => state.account?.user?._id);

  const handleSendNewComment = async (comment) => {
    const newComment = await createComment({
      productId,
      userId,
      content: comment,
    });
    if (newComment && newComment.metadata) {
      await handleGetListComment();
    } else {
      throw new Error("Không thể tạo bình luận");
    }
  };
  const handleGetListComment = async () => {
    const response = await getListCommentBySpuId({ productId });
    if (response.status === 200) {
      setComments(response.metadata);
    }
  };

  useEffect(() => {
    handleGetListComment();
  }, [productId]);

  return (
    <div className="space-y-10">
      <div>
        <NewComment onSend={handleSendNewComment} />
      </div>

      <div className="flex flex-col gap-4">
        {comments.length > 0 &&
          comments.map((comment, index) => <CommentItem comment={comment} />)}
        <button
          type="button"
          className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
        >
          Read all reviews
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
