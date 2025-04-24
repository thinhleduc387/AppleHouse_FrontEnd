// src/components/ThemeToggle.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slice/themeSlice";

const ThemeToggle = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      {/* Nút Dark Mode (hiển thị khi theme là light) */}
      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className={`${
          theme === "light" ? "block" : "hidden"
        } font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200`}
        aria-label="Switch to dark mode"
      >
        <span className="group inline-flex shrink-0 justify-center items-center size-9">
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </span>
      </button>

      {/* Nút Light Mode (hiển thị khi theme là dark) */}
      <button
        type="button"
        onClick={() => dispatch(toggleTheme())}
        className={`${
          theme === "dark" ? "block" : "hidden"
        } font-medium text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700`}
        aria-label="Switch to light mode"
      >
        <span className="group inline-flex shrink-0 justify-center items-center size-9">
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
