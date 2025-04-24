import { memo } from "react";
import Header from "../../component/theme/header";
import Footer from "../../component/theme/footer";
import { Outlet } from "react-router-dom";
import ChatBox from "../../component/Chat/ChatBox";

const MasterLayout = ({ ...props }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Header />
      </div>

      <main className="flex-grow w-full mt-[100px]">
        <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-28" {...props}>
          <Outlet />
        </div>
      </main>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
