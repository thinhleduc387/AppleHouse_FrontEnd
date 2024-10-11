import { memo, useState, useEffect } from "react";
import "./style.scss";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"; // Icon menu
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5"; // Icon đóng sidebar
import Search from "./component/SearchBox"; // Import Search component
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

const Header = () => {
  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Contact Us", link: "/login" }, // Thêm liên kết cho trang yêu thích
  ];

  const [isOpen, setIsOpen] = useState(false);

  // Kiểm tra kích thước màn hình để đóng navbar khi màn hình lớn
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false); // Đóng navbar khi màn hình >= 768px
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full top-0 left-0 z-50">
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center bg-white">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <span className="font-bold text-3xl">AppleHouse</span>

          {/* Icon menu (hiển thị khi màn hình nhỏ) */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 md:hidden cursor-pointer"
          >
            <Bars3BottomRightIcon />
          </div>
        </div>

        {/* Search input trong Navbar */}
        <Search className="hidden md:flex md:ml-10 max-w-xs" />

        {/* Sidebar cho menu di động */}
        <div
          className={clsx(
            "fixed h-full w-60 md:hidden top-0 right-0 transition-transform",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <section className="text-black bg-white absolute right-0 top-0 h-screen p-8 z-50 w-60 flex flex-col gap-8">
            <IoCloseOutline
              onClick={() => setIsOpen(false)}
              className="text-3xl cursor-pointer"
            />
            {Links.map((link, index) => (
              <a key={index} className="font-bold" href={link.link}>
                {link.name}
              </a>
            ))}

            {/* Search input trong Sidebar */}
            <Search />
          </section>
        </div>

        {/* Overlay khi sidebar mở */}
        {isOpen && (
          <div className="fixed inset-0 z-40" style={{ pointerEvents: "none" }}>
            <div
              className="h-full w-[calc(100%-15rem)] bg-black/50"
              onClick={() => setIsOpen(false)}
              style={{ pointerEvents: "auto" }}
            />
          </div>
        )}

        {/* Các link điều hướng trên màn hình lớn */}
        <ul className="hidden md:flex pl-9 md:pl-0">
          {Links.map((link, index) => (
            <li key={index} className="font-extralight my-7 md:my-0 md:ml-8">
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
          {/* Thêm biểu tượng trái tim làm liên kết */}
          <li className=" font-extrabold text-2xl my-7 md:my-0 md:ml-8 ml-0">
            <a href="/favorites">
            <AiOutlineHeart />

            </a>
          </li>
          <li className="font-semibold text-2xl my-7 md:my-0 md:ml-8 ml-0">
            <a href="/favorites">
            <IoCartOutline />
            </a>
          </li>
          <li className="font-semibold text-2xl my-7 md:my-0 md:ml-8 ml-0">
            <a href="/login">
            <AiOutlineUser />
            </a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default memo(Header);
