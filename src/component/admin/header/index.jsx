import { memo } from "react";
import Search from "../../SearchBox";
import { IoIosArrowDropdown } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="w-full top-0 left-0 z-[40]">
        <div className="lg:px-10 py-4 px-7 lg:flex justify-between items-center bg-white shadow-md relative">
          {/* Mobile Search */}
          <div className="mt-4 lg:hidden">
            <Search />
          </div>

          {/* Desktop Search */}
          <Search className="hidden lg:flex lg:ml-10" />

          {/* Profile Section */}
          <div className="flex items-center px-6 space-x-4">
            {/* Profile Image */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" // Lớn hơn
            />

            <div className="ml-4 flex items-center">
              {/* Name and status */}
              <div>
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500 mt-0.5">Active free account</p>
              </div>

              {/* Down Arrow Icon */}
              <IoIosArrowDropdown className="w-10 h-10 text-gray-500 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
