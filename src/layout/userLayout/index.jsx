import { memo } from "react";
import Header from "../../component/theme/header";
import Footer from "../../component/theme/footer";
import { Outlet } from "react-router-dom";
import ChatBox from "../../component/Chat/ChatBox";

const MasterLayout = ({ ...props }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Header />
      </div>
      <main className="flex-grow w-full mt-[90px] bg-[#f3f4f6]">
        <Outlet />
      </main>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
