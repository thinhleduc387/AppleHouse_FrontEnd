import { memo, useState, useEffect } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import SideBar from "./component/SideBar";
import Search from "./component/SearchBox";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import DropdownMenu from "./component/DropdownMenu"; // Import DropdownMenu

const Header = () => {
  const Links = [
    { name: "About", link: "/" },
    { name: "Contact", link: "/login" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
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
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full top-0 left-0 z-[40]">
        <div className="lg:px-10 py-4 px-7 lg:flex justify-between items-center bg-[#f3f4f6] relative">
          {/* Logo và Menu */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <a href="/" className="font-bold text-3xl">
              AppleHouse
            </a>
            {/* Dropdown Menu */}
            <div className="hidden lg:block">
            <DropdownMenu  />{/* Gọi DropdownMenu */}
            </div>
            
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-7 h-7 lg:hidden cursor-pointer"
            >
              <Bars3BottomRightIcon />
            </div>
          </div>
          <div className="mt-4 lg:hidden">
            <Search />
          </div>
          {/* Search input */}
          <Search className="hidden lg:flex lg:ml-10" />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex pl-9 lg:pl-0 justify-end">
            {Links.map((link, index) => (
              <li key={index} className="font-extralight my-7 lg:my-0 lg:ml-8">
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            <li className="font-extrabold text-2xl my-7 lg:my-0 lg:ml-8">
              <a href="/favorites">
                <AiOutlineHeart />
              </a>
            </li>
            <li className="font-semibold text-2xl my-7 lg:my-0 lg:ml-8">
              <a href="/cart">
                <IoCartOutline />
              </a>
            </li>
            <li className="font-semibold text-2xl my-7 lg:my-0 lg:ml-8">
              <a href="/login">
                <AiOutlineUser />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar - Moved outside of header container */}
      {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default memo(Header);
