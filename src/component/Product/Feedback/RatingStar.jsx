import React, { useEffect, useState } from "react";
import { checkPurchase, createComment } from "../../../config/api";
import { useSelector } from "react-redux";

const RatingStar = ({ spuId = null }) => {
  const [hasPurchased, setHasPurchased] = useState(false);

  const handleCheckPurchase = async () => {
    const response = await checkPurchase({ userId, spuId });
    setHasPurchased(response.metadata);
  };
  const userId = useSelector((state) => state.account?.user?._id);

  useEffect(() => {
    handleCheckPurchase();
  }, []);

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Đánh giá <span className="text-blue-600">(10)</span>
        </h3>
        {!hasPurchased && (
          <span className="text-sm text-gray-500 italic">
            *Chỉ khách hàng đã mua mới có thể đánh giá
          </span>
        )}
      </div>

      <div className="space-y-4">
        {[
          { score: 5, percent: "66%" },
          { score: 4, percent: "33%" },
          { score: 3, percent: "16%" },
          { score: 2, percent: "8%" },
          { score: 1, percent: "6%" },
        ].map((ratingData, index) => (
          <div className="flex items-center group" key={index}>
            <p className="w-8 text-sm font-bold text-gray-800">
              {ratingData.score}.0
            </p>
            <svg
              className="w-5 fill-blue-600 transform group-hover:scale-110 transition-transform"
              viewBox="0 0 14 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <div className="flex-1 mx-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: ratingData.percent }}
                ></div>
              </div>
            </div>
            <p className="w-12 text-sm font-bold text-gray-800">
              {ratingData.percent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingStar;
