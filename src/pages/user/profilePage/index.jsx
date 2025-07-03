import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../component/Profile/SideBar";

const ProfilePage = () => {
  return (
    <div className="bg-[#f3f4f6] dark:bg-gray-900 mx-[100px] transition-colors duration-300">
      <div className="block md:hidden">
        <Sidebar />
      </div>

      <div className="flex overflow-hidden mt-6">
        <div className="hidden md:block w-64 bg-gray-800 dark:bg-gray-800 text-white dark:text-gray-100 h-fit z-1 sticky top-0">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="px-0 md:px-6 2xl:px-10 h-full bg-[#f3f4f6] dark:bg-gray-900 transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default React.memo(ProfilePage);
