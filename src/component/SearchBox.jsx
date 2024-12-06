import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Nhập biểu tượng tìm kiếm

const Search = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchTerm); // Thực hiện tìm kiếm ở đây
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
          className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none" // Thêm padding-left để tránh chồng lên biểu tượng
        />
      </div>
    </form>
  );
};

export default Search;
