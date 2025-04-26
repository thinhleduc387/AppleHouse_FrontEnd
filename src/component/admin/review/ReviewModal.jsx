import React from "react";

const ReviewModal = ({
  isOpen,
  onClose,
  comment,
  replyMessage,
  onReplyChange,
  onSendReply,
  isReplyAll,
  selectedCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isReplyAll
            ? `Reply to ${selectedCount} Selected Reviews`
            : "Comment and Reply"}
        </h3>
        {!isReplyAll && (
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Comment:</p>
            <p className="text-gray-600">{comment}</p>
          </div>
        )}
        <div className="mb-4">
          <p className="text-gray-600 font-medium">Your Reply:</p>
          <textarea
            value={replyMessage}
            onChange={(e) => onReplyChange(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your reply here..."
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSendReply}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
