import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, Reply, ChevronDown } from "lucide-react";
import {
  createComment,
  getListCommentBySpuId,
  toggleLikeComment,
} from "../../../config/api";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../../../utils";
import { useTranslation } from "react-i18next";

const CommentItem = ({ comment, depth = 0 }) => {
  const { t } = useTranslation("comment");
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
        return "ml-8";
      case 2:
        return "ml-16";
      case 3:
        return "ml-24";
      case 4:
        return "ml-32";
      default:
        return depth > 4 ? "ml-40" : "";
    }
  };

  return (
    <div
      className={`group flex flex-col ${getIndentClass(
        depth
      )} mt-4 animate-fadeIn`}
    >
      <div className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
        <img
          src={comment?.comment_userId?.usr_avatar}
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-sm object-cover flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
          alt={comment?.comment_userId?.usr_name}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {comment?.isFromSystem
                ? t("fromSystem")
                : comment?.comment_userId?.usr_name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {comment.createdAt === new Date().toISOString()
                ? t("justNow")
                : formatTimeAgo(comment.createdAt)}
            </p>
          </div>

          {comment.comment_rating > 0 && (
            <div className="flex space-x-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < comment.comment_rating
                      ? "text-yellow-400 dark:text-yellow-300"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill={i < comment.comment_rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          )}

          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {comment?.comment_content}
          </p>

          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={handleLikeComment}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isLiked
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
            >
              <ThumbsUp
                className={`w-4 h-4 mr-1.5 ${
                  isLiked ? "fill-blue-600 dark:fill-blue-400" : ""
                }`}
              />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Reply className="w-4 h-4 mr-1.5" />
              <span>{t("reply")}</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-4 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={t("enterYourReply")}
                className="w-full p-3 text-sm text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleReplySubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  {t("send")}
                </button>
              </div>
            </div>
          )}

          {haveReplyComment && (
            <button
              onClick={handleGetListComment}
              className="inline-flex items-center mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <ChevronDown
                className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                  showReplies ? "rotate-180" : ""
                }`}
              />
              {showReplies ? t("hide") : t("view")} {t("reply").toLowerCase()}
            </button>
          )}
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div className="space-y-4 mt-2">
          {replies.map((reply, index) => (
            <CommentItem key={index} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
