// components
import Counter from "./Counter";
import Spring from "./Spring";

const CustomersInfobox = ({
  color = "accent",
  label = "All",
  count = 0,
  icon: Icon,
  suffix,
}) => {
  return (
    <Spring className="flex flex-col justify-center items-center h-full p-4 sm:p-5 md:p-6">
      <div className="flex flex-col items-center space-y-3 sm:space-y-4">
        <div className={`flex justify-center text-${color}-500`}>
          {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />}
        </div>

        <div className="flex flex-col items-center text-center">
          <Counter
            className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1"
            num={count}
            suffix={suffix}
          />
          <h6 className="text-base sm:text-lg md:text-xl font-medium text-gray-500">
            {label}
          </h6>
        </div>
      </div>
    </Spring>
  );
};

export default CustomersInfobox;
