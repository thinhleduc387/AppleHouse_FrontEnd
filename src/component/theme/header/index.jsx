import { memo, useState, useEffect, useRef } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { IoCloseOutline } from "react-icons/io5";
import Search from "./component/SearchBox";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";

const Header = () => {
  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Contact", link: "/login" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full top-0 left-0 z-[40]">
        <div className="md:px-10 py-4 px-7 md:flex justify-between items-center bg-white relative">
          {/* Logo và Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <span className="font-bold text-3xl">AppleHouse</span>

            {/* Dropdown Menu */}
            <div
              className="relative ml-4"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              ref={dropdownRef}
            >
              <button className="flex items-center text-gray-700 font-bold justify-center px-4 py-2 h-full bg-gray-200 rounded-full hover:bg-gray-300 w-36">
                Danh mục
                <MdArrowDropDown />
              </button>
              {dropdownOpen && (
                <div className="bg-white text-base z-[45] list-none divide-y divide-gray-100 rounded-lg shadow my-0 w-44 absolute right-0">
                  <ul className="py-1">
                    <li>
                      <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                        Iphone
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                        Ipad
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                        Macbook
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 md:hidden cursor-pointer">
              <Bars3BottomRightIcon />
            </div>
          </div>

          {/* Search input */}
          <Search className="hidden md:flex md:ml-10" />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex pl-9 md:pl-0">
            {Links.map((link, index) => (
              <li key={index} className="font-extralight my-7 md:my-0 md:ml-8">
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            <li className="font-extrabold text-2xl my-7 md:my-0 md:ml-8">
              <a href="/favorites">
                <AiOutlineHeart />
              </a>
            </li>
            <li className="font-semibold text-2xl my-7 md:my-0 md:ml-8">
              <a href="/cart">
                <IoCartOutline />
              </a>
            </li>
            <li className="font-semibold text-2xl my-7 md:my-0 md:ml-8">
              <a href="/login">
                <AiOutlineUser />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar - Moved outside of header container */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[998]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div 
            className="fixed top-0 right-0 h-full w-60 bg-white z-[999] shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8">
              <IoCloseOutline
                onClick={() => setIsOpen(false)}
                className="text-3xl cursor-pointer"
              />
              <div className="flex flex-col gap-8 mt-8">
                {Links.map((link, index) => (
                  <a key={index} className="font-bold" href={link.link}>
                    {link.name}
                  </a>
                ))}
                <Search />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(Header);