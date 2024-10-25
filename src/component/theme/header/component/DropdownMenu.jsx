import { useState, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { submenuItems, displayNames } from "../Data/MenuItems"; // Import dữ liệu

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false); // Đóng dropdown khi chuột rời khỏi
  };

  const handleMouseLeaveSubmenu = () => {
    setSelectedItem(null);
  };

  // Tính chiều dài của menu
  const getMenuHeight = () => {
    return Object.keys(submenuItems).length * 40; // Giả sử mỗi mục có chiều cao 40px
  };

  return (
    <div
      className="relative ml-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <button className="flex items-center text-gray-700 font-bold justify-center px-4 py-2 h-full bg-gray-200 rounded-full hover:bg-gray-300 w-36">
        Danh mục
        <MdArrowDropDown />
      </button>
      {dropdownOpen && (
        <div
          className="bg-white text-base z-[45] list-none rounded-l-lg custom-shadow-left w-44 absolute right-0"
          style={{ height: getMenuHeight() }}
        >
          <ul className="py-1">
            {Object.keys(submenuItems).map((item) => (
              <li
                key={item}
                onMouseEnter={() => setSelectedItem(item)} // Giữ submenu mở khi di chuột vào mục
                className="relative"
              >
                <a
                  href="#"
                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                >
                  {displayNames[item]}
                </a>
              </li>
            ))}
          </ul>
          {/* Hiển thị menu con ở vị trí cố định */}
          {selectedItem && (
            <div
              onMouseEnter={() => setSelectedItem(selectedItem)} // Giữ submenu mở khi di chuột vào submenu
              onMouseLeave={handleMouseLeaveSubmenu} // Đóng cả menu khi rời khỏi submenu
              className="bg-white rounded-r-lg custom-shadow-right absolute top-0 left-full w-max"
              style={{ height: getMenuHeight() }} // Đặt chiều dài cho submenu
            >
              <ul className="py-1 grid grid-cols-4 gap-2">
                {submenuItems[selectedItem].map((subItem) => (
                  <li key={subItem}>
                    <a
                      href="#"
                      className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                    >
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
