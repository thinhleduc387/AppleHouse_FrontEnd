import React from "react";

const RatingDistribution = ({ distribution }) => {
  return (
    <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Rating Distribution
      </h2>
      <div className="space-y-4">
        {distribution.map(({ stars, percentage }) => (
          <div key={stars} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium text-gray-700">
              {stars} stars
            </div>
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-gray-500">
              {percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;
