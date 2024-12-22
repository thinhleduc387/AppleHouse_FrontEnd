import React, { useState } from "react";

const ProductComments = ({ productName, reviews, setReviews }) => {
  const [replyInput, setReplyInput] = useState(null);
  const [currentReply, setCurrentReply] = useState("");

  const handleReplyClick = (id) => {
    setReplyInput(id);
    setCurrentReply("");
  };

  const handleSaveReply = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              replies: [...review.replies, currentReply],
            }
          : review
      )
    );
    setReplyInput(null);
    setCurrentReply("");
  };

  return (
    <div className="w-2/3 ml-6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
        Đánh giá
      </h2>
      <p className="mb-4 text-gray-600">
        Hiển thị đánh giá cho sản phẩm:{" "}
        <span className="font-semibold text-gray-800">{productName}</span>
      </p>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-500">
                    {review.user.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {review.user}
                  </h4>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="text-yellow-500 text-sm">
                {"⭐".repeat(review.rating)}
              </div>
            </div>
            <p className="mt-2 text-gray-700 text-sm">{review.content}</p>

            {/* Replies */}
            {review.replies.map((reply, index) => (
              <div
                key={index}
                className="mt-4 ml-8 p-2 border rounded-lg bg-gray-100 text-sm"
              >
                <p>{reply}</p>
              </div>
            ))}

            {/* Reply Input */}
            {replyInput === review.id ? (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={currentReply}
                  onChange={(e) => setCurrentReply(e.target.value)}
                  placeholder="Trả lời đánh giá của người dùng"
                ></textarea>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setReplyInput(null)}
                  >
                    Trở lại
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleSaveReply(review.id)}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleReplyClick(review.id)}
                >
                  Phản hồi
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
