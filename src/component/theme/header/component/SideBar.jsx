import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"; // Import biểu tượng mũi tên
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { submenuItems, displayNames } from "../Data/MenuItems"; // Import dữ liệu

const SideBar = ({ isOpen, setIsOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[998] opacity-100`}
        onClick={() => {
          setIsOpen(false);
          setSelectedItem(null);
        }}
      />

      {/* Sidebar chính */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-[999] shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <IoCloseOutline
            onClick={() => {
              setIsOpen(false);
              setSelectedItem(null);
            }}
            className="text-3xl cursor-pointer"
          />

          <div className="flex flex-col gap-8 mt-8">
            {Object.keys(submenuItems).map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="flex items-center justify-between font-bold cursor-pointer hover:bg-gray-200 p-2 rounded transition-colors duration-300"
              >
                <span>{displayNames[item]}</span>
                <FaAngleRight className="text-gray-500" />{" "}
                {/* Biểu tượng mũi tên */}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 border-t">
            <a
              href="/favorites"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <AiOutlineHeart className="text-2xl" />
            </a>
            <a
              href="/cart"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <IoCartOutline className="text-2xl" />
            </a>
            <a
              href="/login"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <AiOutlineUser className="text-2xl" />
            </a>
          </div>

          {/* Căn giữa About và Contact */}
          <div className="flex justify-center gap-8 mt-4">
            <a
              className="font-bold transition-colors duration-300 hover:text-blue-500"
              href="/"
            >
              About
            </a>
            <a
              className="font-bold transition-colors duration-300 hover:text-blue-500"
              href="/login"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar con với animation */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-[1000] shadow-lg transform transition-transform duration-300 ${
          selectedItem ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <FaAngleLeft
            onClick={() => setSelectedItem(null)} // Quay lại
            className="text-3xl cursor-pointer"
          />
          {selectedItem && (
            <>
              <h2 className="font-bold text-lg mt-8 mb-4">
                {displayNames[selectedItem]}
              </h2>
              <div className="flex flex-col gap-4">
                {submenuItems[selectedItem].map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    href="#"
                    className="text-gray-700 hover:text-blue-500 transition-colors duration-300"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
