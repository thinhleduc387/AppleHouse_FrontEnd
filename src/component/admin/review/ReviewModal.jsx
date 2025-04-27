import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewModal = ({
  isOpen,
  onClose,
  selectedReview,
  replyMessage,
  onReplyChange,
  onSendReply,
  isReplyAll,
  selectedCount,
  isLoadingReply,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full mx-4 sm:max-w-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              {isReplyAll
                ? `Reply to ${selectedCount} Selected Reviews`
                : "Comment and Reply"}
            </h3>
            {!isReplyAll && (
              <div className="mb-5">
                <p className="text-gray-700 font-medium text-sm">Comment:</p>
                <p className="text-gray-600 mt-1 text-base bg-gray-50 p-3 rounded-lg">
                  {selectedReview?.comment_content}
                </p>
              </div>
            )}
            <div className="mb-6">
              <p className="text-gray-700 font-medium text-sm">Your Reply:</p>
              <textarea
                value={replyMessage}
                onChange={(e) => onReplyChange(e.target.value)}
                className="w-full h-36 p-4 mt- seta1 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 resize-none"
                placeholder="Write your reply here..."
                disabled={isLoadingReply} // Disable textarea during loading
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                disabled={isLoadingReply} // Disable Cancel button during loading
              >
                Cancel
              </button>
              <button
                onClick={onSendReply}
                className={`px-5 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isLoadingReply
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={isLoadingReply} // Disable Send Reply button during loading
              >
                {isLoadingReply ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  "Send Reply"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
