import React, { useState } from "react";

const RatingStat = () => {
  const [rating, setRating] = useState(0); // Lưu trữ rating của người dùng
  const [hoverRating, setHoverRating] = useState(0); // Lưu trữ rating khi hover

  const handleRatingChange = (score) => {
    setRating(score); // Cập nhật giá trị rating khi người dùng chọn sao
  };

  const handleMouseEnter = (score) => {
    setHoverRating(score); // Hiển thị sao khi hover vào
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Reset sao khi hover ra ngoài
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn mức đánh giá.");
      return;
    }
    alert(`Bạn đã đánh giá sản phẩm ${rating} sao!`);
  };

  return (
    <div className="flex flex-col mt-8">
      <h3 className="text-xl font-bold text-gray-800">Đánh giá (10)</h3>
      <div className="space-y-3 mt-3">
        {[{ score: 5, percent: "66%" }, { score: 4, percent: "33%" }, { score: 3, percent: "16%" }, { score: 2, percent: "8%" }, { score: 1, percent: "6%" }].map(
          (ratingData, index) => (
            <div className="flex items-center" key={index}>
              <p className="text-sm text-gray-800 font-bold">{ratingData.score}.0</p>
              <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <div className="bg-gray-400 rounded w-full h-2 ml-3">
                <div className={`h-full rounded bg-blue-600`} style={{ width: ratingData.percent }}></div>
              </div>
              <p className="text-sm text-gray-800 font-bold ml-3">{ratingData.percent}</p>
            </div>
          )
        )}
      </div>

      {/* Rating Stars & Submit Button */}
      <div className="flex items-center mt-6 space-x-6">
        <div className="flex justify-between w-full"> {/* Bọc sao và chữ vào div và sử dụng justify-between */}
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-800 mr-3">Đánh giá của bạn:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${rating >= star || hoverRating >= star ? "fill-yellow-500" : "fill-gray-400"}`} // Phóng to sao
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => handleMouseEnter(star)} // Khi hover vào sao
                onMouseLeave={handleMouseLeave} // Khi hover ra ngoài
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927C9.366 2.017 10.634 2.017 10.951 2.927l1.696 3.432 3.79.553c.669.097.935.92.451 1.391l-2.737 2.664.645 3.766c.116.677-.598 1.213-1.219.891l-3.389-1.781-3.388 1.781c-.62.322-1.335-.214-1.219-.891l.645-3.766-2.737-2.664c-.484-.471-.218-1.294.451-1.391l3.79-.553 1.696-3.432z" />
              </svg>
            ))}
          </div>

          {/* Nút Gửi đánh giá */}
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingStat;
