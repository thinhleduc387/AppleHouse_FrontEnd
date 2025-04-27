import React from "react";
import { MoreVertical, Star, Copy } from "lucide-react";
import { format } from "date-fns";

const ReviewList = ({
  reviews,
  selectedReviews,
  onSelectReview,
  onSelectAll,
  onReplyAll,
  onOpenPopup,
  onToggleDropdown,
  onAction,
  openDropdownId,
  setSort,
  loading, // Already passed from parent
}) => {
  const handleSortChange = (e) => {
    setSort(e.target.value.toLowerCase());
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Latest Accepted Reviews
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <select
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleSortChange}
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                selectedReviews.length === reviews.length && reviews.length > 0
              }
              onChange={onSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
          {selectedReviews.length > 0 && (
            <button
              onClick={onReplyAll}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              Reply All ({selectedReviews.length})
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                isSelected={selectedReviews.includes(review._id)}
                onSelect={() => onSelectReview(review._id)}
                onOpenPopup={onOpenPopup}
                onToggleDropdown={onToggleDropdown}
                onAction={onAction}
                isDropdownOpen={openDropdownId === review._id}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No reviews available.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({
  review,
  isSelected,
  onSelect,
  onOpenPopup,
  onToggleDropdown,
  onAction,
  isDropdownOpen,
}) => {
  const { comment_content, comment_productId, comment_userId } = review;
  const { usr_avatar, usr_email, usr_name } = comment_userId;
  return (
    <div className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Review content structure remains the same */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <img
            src={usr_avatar}
            alt={usr_name}
            className="w-12 h-12 rounded-full ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-medium text-gray-800">{usr_name}</h3>
            <p className="text-sm text-blue-500 hover:text-blue-600">
              {usr_email}
            </p>
          </div>
        </div>

        {/* Comment section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-gray-600 line-clamp-1">{comment_content}</p>
            <button
              onClick={() => onOpenPopup(comment_content, review._id)}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            ></button>
          </div>
        </div>

        {/* Rating and actions */}
        <ReviewActions
          review={review}
          onToggleDropdown={onToggleDropdown}
          onAction={onAction}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
    </div>
  );
};

const ReviewActions = ({
  review,
  onToggleDropdown,
  onAction,
  isDropdownOpen,
}) => {
  const { comment_rating, createdAt } = review;

  const date = format(new Date(createdAt), "MMM d, yyyy");
  const time = format(new Date(createdAt), "h:mm a");

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < comment_rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="text-sm text-gray-500 text-right">
        <div>{date}</div>
        <div>at {time}</div>
      </div>

      <div className="relative">
        <button
          onClick={() => onToggleDropdown(review._id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden">
            <button
              onClick={() => onAction("reply", review)}
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Reply
            </button>

            <button
              onClick={() => onAction("view", review)}
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              View details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
