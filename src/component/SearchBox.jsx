import { useState, useCallback, useRef, useEffect, memo } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";
import { suggestionSearchProduct } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Search = ({ className }) => {
  const [textSearch, setTextSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { t } = useTranslation("header");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Hàm debounce để tìm kiếm
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await suggestionSearchProduct(term);
        if (response && response.status === 200) {
          const filteredSuggestions = response.metadata;
          setSuggestions(filteredSuggestions);
        } else {
          setSuggestions([]);
          toast.error(t("errorFetchingSuggestions"));
        }
      } catch (error) {
        setSuggestions([]);
        if (
          error.response?.status === 401 &&
          error.response?.data?.message?.includes("Unauthorized")
        ) {
          toast.error(t("sessionExpired"));
        } else {
          toast.error(
            error.response?.data?.message || t("errorFetchingSuggestions")
          );
        }
      }
    }, 300),
    [t]
  );

  const handleChange = (e) => {
    setTextSearch(e.target.value);
    setShowDropdown(true);
    debouncedSearch(e.target.value);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    setTextSearch(suggestion.name);
    setShowDropdown(false);
    navigate(`/tim-kiem?s=${suggestion.name}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && textSearch) {
      setShowDropdown(false);
      navigate(`/tim-kiem?s=${textSearch}`);
    }
  };

  return (
    <form
      className={`flex-1 items-center ${className}`}
      onSubmit={handleSearch}
    >
      <div className="relative w-full">
        <FaSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={textSearch}
          onChange={handleChange}
          placeholder={t("Enter the name of product you want to find")}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-300"
        />
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg dark:shadow-gray-700 z-10"
            id="suggest"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-100">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <Link
                      to={`/tim-kiem?s=${suggestion.name}`}
                      className="block cursor-pointer text-gray-700 dark:text-gray-100"
                    >
                      {suggestion.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  {t("noResults")}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default memo(Search);
