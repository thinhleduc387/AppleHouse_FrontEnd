import React from "react";
import { MoreVertical, Star, Copy } from "lucide-react";

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
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Latest Accepted Reviews
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Recent</option>
            <option>Oldest</option>
            <option>Highest Rating</option>
            <option>Lowest Rating</option>
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

      <div className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            isSelected={selectedReviews.includes(review.id)}
            onSelect={() => onSelectReview(review.id)}
            onOpenPopup={onOpenPopup}
            onToggleDropdown={onToggleDropdown}
            onAction={onAction}
            isDropdownOpen={openDropdownId === review.id}
          />
        ))}
      </div>
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
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
            alt={review.name}
            className="w-12 h-12 rounded-full ring-2 ring-gray-100"
          />
          <div>
            <h3 className="font-medium text-gray-800">{review.name}</h3>
            <p className="text-sm text-blue-500 hover:text-blue-600">
              {review.email}
            </p>
          </div>
        </div>

        {/* Comment section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-gray-600 line-clamp-1">{review.comment}</p>
            <button
              onClick={() => onOpenPopup(review.comment, review.id)}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <Copy className="w-4 h-4" />
            </button>
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
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="text-sm text-gray-500 text-right">
        <div>{review.date}</div>
        <div>at {review.time}</div>
      </div>

      <div className="relative">
        <button
          onClick={() => onToggleDropdown(review.id)}
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
              onClick={() => onAction("delete", review)}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
