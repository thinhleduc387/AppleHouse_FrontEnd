import { FaCheck } from "react-icons/fa6";

const OptionsCard = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {options.map((option, index) => (
        <a
          key={index}
          className={`relative px-4 py-2 border rounded-lg cursor-pointer ${
            selectedOption.label === option.label ? "border-mainColor" : "border-gray-300"
          }`}
          onClick={() => onSelectOption(option)}
        >
          {option.src && (
            <img
              src={option.src}
              alt={option.label || "Option Image"}
              className="w-16 h-16 mb-2"
            />
          )}
          <span className="text-lg font-bold text-gray-800">{option.label}</span>
          {selectedOption.label === option.label && (
            <span
              className="absolute top-0 right-0 w-8 h-8 bg-mainColor flex items-center justify-center rounded-tr-lg"
              style={{
                clipPath: "polygon(100% 0, 0% 0, 100% 100%)",
                transform: "translate(1px, -1px)",
              }}
            >
              <FaCheck
                className="text-white text-xs"
                style={{ transform: "translate(5px, -5px)" }}
              />
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default OptionsCard;
