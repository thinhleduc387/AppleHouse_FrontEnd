import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../component/Profile/SideBar";
import RecommendSectionForProfile from "../../../component/RecommendSection/RecommendSectionInProfile";

const ProfilePage = () => {
  return (
    <div className="bg-[#f3f4f6] dark:bg-gray-900">
      <div className="block md:hidden">
        <Sidebar />
      </div>

      <div className="flex overflow-hidden mt-6">
        <div className="hidden md:block w-64 text-white dark:text-gray-100 h-fit z-1 sticky top-0">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="px-0 md:px-6 2xl:px-10 h-full bg-[#f3f4f6] dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="py-10 bg-[#f3f4f6] dark:bg-gray-900">
        <RecommendSectionForProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
