const FloatingInput = ({
  label,
  type,
  id,
  placeholder,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-white bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 peer transition-colors duration-300"
        placeholder={placeholder}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
