import { useState, useEffect, useRef } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import SideBar from "./component/SideBar";
import Search from "../../SearchBox";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { PiBellSimpleRinging } from "react-icons/pi";
import ProfileNavBar from "../../Profile/ProfileNav";
import DropdownMenu from "./component/DropdownMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const Links = [
    { name: "About", link: "/" },
    { name: "Contact", link: "/profile" },
  ];

  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full top-0 left-0 z-[40] sticky ">
        <div className="lg:px-10 py-4 px-7 lg:flex justify-between items-center bg-[#f3f4f6] relative">
          {/* Logo and Menu */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <a href="/" className="font-bold text-3xl">
              AppleHouse
            </a>
            {/* Desktop Dropdown Menu */}
            <div className="hidden lg:block">
              <DropdownMenu />
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

          {/* Desktop Search */}
          <Search className="hidden lg:flex lg:ml-10" />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex pl-9 lg:pl-0 justify-end items-center space-x-8 ml-4">
            {Links.map((link, index) => (
              <li key={index} className="font-extralight my-7 lg:my-0">
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            <li className="font-extrabold text-2xl my-7 lg:my-0">
              <a href="/favorites">
                <AiOutlineHeart />
              </a>
            </li>
            <li className="font-semibold text-2xl my-7 lg:my-0">
              <Link href="/cart">
                <IoCartOutline />
              </Link>
            </li>
            <li className="font-extrabold text-2xl my-7 lg:my-0">
              <a href="/favorites">
                <PiBellSimpleRinging />
              </a>
            </li>
            {/* Profile Section with Dropdown */}
            <li className="my-7 lg:my-0 ">
              <ProfileNavBar userAvatar={userAvatar} userName={userName} />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
