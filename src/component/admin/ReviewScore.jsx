import Spring from "./Spring";
import Counter from "./Counter";
import { Star } from "lucide-react";

const ReviewsScore = ({ score = 0 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 text-yellow-400 relative"
            style={{
              clipPath: "inset(0 50% 0 0)",
            }}
          />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-200" />);
      }
    }
    return stars;
  };

  return (
    <Spring className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-row gap-1">{renderStars()}</div>
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
