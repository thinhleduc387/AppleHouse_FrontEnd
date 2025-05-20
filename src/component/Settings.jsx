import ThemeToggle from "./themeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const Settings = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <ThemeToggle />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Theme
          </span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <LanguageSwitcher />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Language
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
