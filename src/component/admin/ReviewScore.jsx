// components
import Spring from "./Spring";
import Counter from "./Counter";
import { Star } from "lucide-react";

const ReviewsScore = ({ score = 0 }) => {
  return (
    <Spring className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-row gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 3 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>

        <Counter
          className="text-3xl font-bold text-gray-800"
          num={score}
          decimals={1}
        />
        <span className="text-xl font-medium text-gray-500">Review score</span>
      </div>
    </Spring>
  );
};

export default ReviewsScore;
