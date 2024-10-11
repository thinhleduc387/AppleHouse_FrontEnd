import { useState } from "react";

const Search = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchTerm); // Thực hiện tìm kiếm ở đây
  };

  return (
    <form className={`flex items-center w-full ${className}`} onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
      />
    </form>
  );
};

export default Search;
