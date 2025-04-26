const RatingStars = ({
  rating = 0,
  readOnly = true,
  maxStars = 5,
  ...props
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const StarIcon = ({ filled, half = false }) => (
    <svg
      className={`w-4 h-4 ${
        filled
          ? "text-yellow-300"
          : half
          ? "text-yellow-300"
          : "text-gray-300 dark:text-gray-500"
      } ms-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      style={half ? { clipPath: "inset(0 50% 0 0)" } : {}}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  return (
    <div className="flex items-center" {...props}>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <StarIcon key={`full-${index}`} filled={true} />
        ))}
      {hasHalfStar && <StarIcon key="half" half={true} />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <StarIcon key={`empty-${index}`} filled={false} />
        ))}
    </div>
  );
};

export default RatingStars;
