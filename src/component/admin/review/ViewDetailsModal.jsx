import React from "react";
import { FaTimes } from "react-icons/fa";
import CommentItem from "../../Product/Feedback/CommentItem";

const ViewDetailsModal = ({ isOpen, onClose, selectedReview }) => {
  if (!isOpen) return null;
  const { comment_productId: product, comment_userId } = selectedReview || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">View Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {selectedReview && product ? (
            <>
              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Product Details
                </h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={
                      product?.product_thumb ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product?.product_name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {product?.product_name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Product ID: {product?._id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Review</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <CommentItem comment={selectedReview} />
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-8">Loading details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
