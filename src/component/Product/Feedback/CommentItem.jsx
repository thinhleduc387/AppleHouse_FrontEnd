import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, Reply, ChevronDown } from "lucide-react";
import {
  createComment,
  getListCommentBySpuId,
  toggleLikeComment,
} from "../../../config/api";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../../../utils";

const CommentItem = ({ comment, depth = 0 }) => {
  const userId = useSelector((state) => state.account?.user?._id);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [isLiked, setIsLiked] = useState(
    comment?.comment_user_likes?.includes(userId)
  );
  const [likeCount, setLikeCount] = useState(comment.comment_likes || 0);
  const [haveReplyComment, setHaveReplyComment] = useState(
    comment?.comment_right - comment?.comment_left > 1
  );

  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      const newReply = await createComment({
        productId: comment.comment_productId,
        parentCommentId: comment._id,
        userId: userId,
        content: replyText.trim(),
      });

      await handleGetListComment();
      setReplyText("");
      setShowReplyForm(false);
      setShowReplies(true);
      setHaveReplyComment(true);
    }
  };

  const handleGetListComment = async () => {
    setShowReplies(!showReplies);
    const response = await getListCommentBySpuId({
      productId: comment.comment_productId,
      parentCommentId: comment._id,
    });

    if (response.status === 200) {
      console.log("🚀 ~ handleGetListComment ~ response:", response);
      setReplies(response.metadata.comments);
    }
  };

  const handleLikeComment = async () => {
    try {
      const response = await toggleLikeComment(comment._id);

      if (response.status === 200) {
        setIsLiked(response.metadata.liked);
        setLikeCount(response.metadata.likeCount);
      }
    } catch (error) {
      console.error("Lỗi like comment:", error);
    }
  };

  const getIndentClass = (depth) => {
    switch (depth) {
      case 1:
        return "ml-6";
      case 2:
        return "ml-12";
      case 3:
        return "ml-18";
      case 4:
        return "ml-24";
      default:
        return depth > 4 ? "ml-30" : "";
    }
  };

  return (
    <div
      className={`flex flex-col ${getIndentClass(depth)} mt-3 animate-fadeIn`}
    >
      <div className="flex items-start space-x-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
        <img
          src={
            comment?.comment_userId?.usr_avatar ||
            "https://via.placeholder.com/40"
          }
          className="w-9 h-9 rounded-full border border-gray-200 object-cover flex-shrink-0 transition-transform duration-200 hover:scale-105"
          alt={comment?.comment_userId?.usr_name || "User"}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {comment?.isFromSystem
                ? "Hệ thống"
                : comment?.comment_userId?.usr_name || "Khách"}
            </h4>
            <span className="text-xs text-gray-400">•</span>
            <p className="text-xs text-gray-500">
              {formatTimeAgo(comment.createdAt)}
            </p>
          </div>

          {comment.comment_rating > 0 && (
            <div className="flex space-x-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < comment.comment_rating
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }`}
                  fill={i < comment.comment_rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          )}

          <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {comment?.comment_content || "Không có nội dung"}
          </p>

          <div className="flex items-center space-x-2 mt-3">
            <button
              onClick={handleLikeComment}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                isLiked
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label={isLiked ? "Unlike comment" : "Like comment"}
            >
              <ThumbsUp
                className={`w-3.5 h-3.5 mr-1 ${isLiked ? "fill-blue-700" : ""}`}
              />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
              aria-label="Reply to comment"
            >
              <Reply className="w-3.5 h-3.5 mr-1" />
              <span>Trả lời</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-4 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập phản hồi của bạn..."
                className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[80px] resize-none shadow-sm"
                aria-label="Reply text"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  aria-label="Cancel reply"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReplySubmit}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-300"
                  disabled={!replyText.trim()}
                  aria-label="Submit reply"
                >
                  Gửi
                </button>
              </div>
            </div>
          )}

          {haveReplyComment && (
            <button
              onClick={handleGetListComment}
              className="inline-flex items-center mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              aria-label={showReplies ? "Hide replies" : "Show replies"}
            >
              <ChevronDown
                className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                  showReplies ? "rotate-180" : ""
                }`}
              />
              {showReplies ? "Ẩn phản hồi" : "Xem phản hồi"}
            </button>
          )}
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div className="space-y-3 mt-2">
          {replies.map((reply, index) => (
            <CommentItem key={index} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
