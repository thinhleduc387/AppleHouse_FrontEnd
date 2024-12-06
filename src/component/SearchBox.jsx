import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Nhập biểu tượng tìm kiếm

const Search = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchTerm); // Thực hiện tìm kiếm ở đây
  };

  const handleFocus = () => {
    setShowDropdown(true); // Hiển thị dropdown khi nhấp vào thanh tìm kiếm
  };

  const handleBlur = () => {
    // Đảm bảo dropdown chỉ ẩn khi người dùng không tương tác nữa (ví dụ, click ra ngoài)
    setShowDropdown(false);
  };

  return (
    <form className={`flex-1 items-center ${className}`} onSubmit={handleSearch}>
      <div className="relative w-full">
        <FaSearch className="absolute left-3 top-2.5 text-gray-500" /> {/* Biểu tượng tìm kiếm */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          onFocus={handleFocus} // Khi nhấp vào thanh tìm kiếm
          onBlur={handleBlur} // Khi rời khỏi thanh tìm kiếm
          className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none" // Thêm padding-left để tránh chồng lên biểu tượng
        />
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
            {/* Dropdown menu */}
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;
